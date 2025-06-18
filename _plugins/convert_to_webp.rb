# Quick Jekyll plugin: convert uploaded images to `.webp`, max `2000px`, with ImageMagick

module Jekyll
	class ConvertToWebp < Generator
		@@dimensions = {}

		def generate(site)
			require 'shellwords'

			uploads_source = File.join(site.source, '_uploads')
			uploads_destination = File.join(site.dest, 'uploads')
			dimensions = {}

			FileUtils.mkdir_p(uploads_destination)

			Dir.glob(File.join(uploads_source, '*.{gif,jpg,jpeg,png}')).each do |img|
				webp = File.join(uploads_destination, "#{Jekyll::Utils.slugify(File.basename(img, '.*'))}.webp")

				width, height = `identify -format "%w %h" #{Shellwords.escape(img)}[0]`.strip.split.map(&:to_i)
				dimensions[File.basename(img)] = { 'width' => width, 'height' => height }

				next Jekyll.logger.info("Skipped", "#{webp}, already exists") if File.exist?(webp)

				if File.extname(img) == ".gif"
					FileUtils.cp(img, File.join(uploads_destination, File.basename(img)))
				else
					system("magick", img, "-resize", "2000x2000>", "-quality", "90", "-define", "webp:lossless=false", webp)
				end

				Jekyll.logger.info "Converted", "#{img} → #{webp}"
			end

			@@dimensions = dimensions
		end
	end

	module WebpData
		def getWebpData(input)
			require 'cgi'

			filename = File.basename(CGI.unescape(input))

			if File.extname(filename) == ".gif"
				path = "/uploads/#{filename}"
			else
				path = "/uploads/#{Jekyll::Utils.slugify(File.basename(filename, '.*'))}.webp"
			end

			dims = Jekyll::ConvertToWebp.class_variable_get(:@@dimensions)[filename]

			if dims
				"data-src=\"#{path}\" width=\"#{dims['width']}\" height=\"#{dims['height']}\""
			else
				"data-src=\"#{path}\""
			end
		end
	end
end

Liquid::Template.register_filter(Jekyll::WebpData)
