# “Quick” Jekyll plugin: converts uploaded images to `.webp` with ImageMagick, filter returns the attributes.
module Jekyll
	UPLOADS_DESTINATION = 'uploads'.freeze
	UPLOADS_SOURCE = '_uploads'.freeze

	# Store image dimensions for the filter.
	IMAGE_DIMENSIONS = {}

	def self.slug_ext(filename, ext)
		"#{Jekyll::Utils.slugify(File.basename(filename, '.*'))}.#{ext}"
	end

	class ConvertToWebp < Generator
		def generate(site)
			require 'shellwords'

			FileUtils.mkdir_p(File.join(site.dest, UPLOADS_DESTINATION))

			Dir.glob(File.join(site.source, UPLOADS_SOURCE, '*.{gif,jpeg,jpg,png}')).each do |filename|
				# Get dimensions from the files as we go through.
				width, height = `identify -format '%w %h' #{Shellwords.escape(filename)}[0]`.strip.split.map(&:to_i)
				Jekyll::IMAGE_DIMENSIONS[File.basename(filename)] = { 'width' => width, 'height' => height }

				webp_file = File.join(site.dest, UPLOADS_DESTINATION, Jekyll.slug_ext(filename, 'webp'))

				if File.extname(filename) == '.gif'
					# Recompressing GIFs loses timing; just pass those on through.
					FileUtils.cp(filename, File.join(site.dest, UPLOADS_DESTINATION, Jekyll.slug_ext(filename, 'gif')))
					Jekyll.logger.info 'Moved', "#{File.basename(filename)}, animated GIF"
					# Speed up local builds.
				elsif File.exist?(webp_file)
					Jekyll.logger.info 'Skipped', "#{File.basename(webp_file)}, already exists"
					next
				else
					# Otherwise ImageMagick gives us a new asset.
					system('magick', filename, '-resize', '2000x2000>', '-quality', '90', '-define', 'webp:lossless=false', webp_file)
					Jekyll.logger.info 'Converted', "#{File.basename(webp_file)}"
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
