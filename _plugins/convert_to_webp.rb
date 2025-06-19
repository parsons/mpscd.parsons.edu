# “Quick” Jekyll plugin: converts uploaded images to `.webp` with ImageMagick, filter returns the attributes.
module Jekyll
	UPLOADS_DESTINATION = 'uploads'.freeze
	UPLOADS_SOURCE = '_uploads'.freeze

	# Store image dimensions for the filter.
	IMAGE_DIMENSIONS = {}

	def self.slug_ext(filename, ext)
		"#{Jekyll::Utils.slugify(File.basename(filename, '.*'))}.#{ext}"
	end

	# Get dimensions from the files on build.
	class CollectImageDimensions < Generator
		def generate(site)
			require 'shellwords'

			Dir.glob(File.join(site.source, UPLOADS_SOURCE, '*.{gif,jpeg,jpg,png}')).each do |filename|
				width, height = `identify -format '%w %h' #{Shellwords.escape(filename)}[0]`.strip.split.map(&:to_i)
				Jekyll::IMAGE_DIMENSIONS[File.basename(filename)] = { 'width' => width, 'height' => height }
				Jekyll.logger.info 'Measured', "#{File.basename(filename)}"
			end
		end
	end

	# Use `post_write` so the files are copied _after_ Jekyll does its thing.
	Jekyll::Hooks.register :site, :post_write do |site|
		require 'shellwords'

		uploads_path = File.join(site.dest, UPLOADS_DESTINATION)

		FileUtils.mkdir_p(uploads_path)

		# Toss naïve Jekyll-copied ones.
		FileUtils.rm_f(Dir.glob(File.join(uploads_path, '*')) - Dir.glob(File.join(uploads_path, '*.webp')))

		# Debug: log convert version and WebP support at the start of the hook
		convert_version = `convert -version 2>&1`
		webp_support = `convert -list format 2>&1 | grep -i webp`
		Jekyll.logger.info 'Convert version', convert_version
		Jekyll.logger.info 'WebP support', webp_support

		Dir.glob(File.join(site.source, UPLOADS_SOURCE, '*.{gif,jpeg,jpg,png}')).each do |filename|
			webp_file = File.join(uploads_path, Jekyll.slug_ext(filename, 'webp'))

			# Debug: check if input file exists and is readable
			unless File.exist?(filename) && File.readable?(filename)
				Jekyll.logger.error 'Input file missing or unreadable', filename
				next
			end

			if File.extname(filename) == '.gif'
				# Recompressing GIFs loses timing; just pass those on through.
				FileUtils.cp(filename, File.join(uploads_path, Jekyll.slug_ext(filename, 'gif')))
				Jekyll.logger.info 'Moved', "#{File.basename(filename)}, animated GIF"
			elsif File.exist?(webp_file)
				# Speed up local builds.
				Jekyll.logger.info 'Skipped', "#{File.basename(webp_file)}, already exists"
				next
			else
				output = `convert #{Shellwords.escape(filename)} -resize 2000x2000> -quality 90 -define webp:lossless=false #{Shellwords.escape(webp_file)} 2>&1`

				if $?.success?
					Jekyll.logger.info 'Converted', "#{File.basename(webp_file)}"
				else
					Jekyll.logger.error 'Convert failed', output
				end
			end
		end
	end

	module GetWebpData
		def getWebpData(filename)
			require 'cgi'

			filename = File.basename(CGI.unescape(filename))
			dimensions = Jekyll::IMAGE_DIMENSIONS[filename]

			src_path = File.join(Jekyll::UPLOADS_DESTINATION, Jekyll.slug_ext(filename, File.extname(filename) == '.gif' ? 'gif' : 'webp'))
			dimension_attr = dimensions ? "width=\"#{dimensions['width']}\" height=\"#{dimensions['height']}\"" : ''

			# Return the attributes to the template.
			"data-src=\"/#{src_path}\" #{dimension_attr}"
		end
	end
end

Liquid::Template.register_filter(Jekyll::GetWebpData)
