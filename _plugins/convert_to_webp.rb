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

			Dir.glob(File.join(site.source, UPLOADS_SOURCE, '*.{gif,jpeg,jpg,png}')).each do |img|
				webp = File.join(site.dest, UPLOADS_DESTINATION, Jekyll.slug_ext(img, 'webp'))

				# Get dimensions from the files as we go through.
				width, height = `identify -format '%w %h' #{Shellwords.escape(img)}[0]`.strip.split.map(&:to_i)
				Jekyll::IMAGE_DIMENSIONS[File.basename(img)] = { 'width' => width, 'height' => height }

				if File.extname(img) == '.gif'
					# Recompressing GIFs loses timing; just pass those on through.
					FileUtils.cp(img, File.join(site.dest, UPLOADS_DESTINATION, Jekyll.slug_ext(img, 'gif')))
					Jekyll.logger.info 'Moved', "#{File.basename(img)}, animated GIF"
					# Speed up local builds.
				elsif File.exist?(webp)
					Jekyll.logger.info 'Skipped', "#{File.basename(webp)}, already exists"
					next
				else
					# Otherwise ImageMagick gives us a new asset.
					system('magick', img, '-resize', '2000x2000>', '-quality', '90', '-define', 'webp:lossless=false', webp)
					Jekyll.logger.info 'Converted', "#{File.basename(webp)}"
				end
			end
		end
	end

	module GetWebpData
		def getWebpData(input)
			require 'cgi'

			filename = File.basename(CGI.unescape(input))
			dimensions = Jekyll::IMAGE_DIMENSIONS[filename]

			src_path = File.join(Jekyll::UPLOADS_DESTINATION, Jekyll.slug_ext(filename, File.extname(filename) == '.gif' ? 'gif' : 'webp'))
			dimension_attr = dimensions ? "width=\"#{dimensions['width']}\" height=\"#{dimensions['height']}\"" : ''

			# Return the attributes to the template.
			"data-src=\"/#{src_path}\" #{dimension_attr}"
		end
	end
end

Liquid::Template.register_filter(Jekyll::GetWebpData)
