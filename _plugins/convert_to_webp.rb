# Quick Jekyll plugin: convert uploaded images to `.webp`, max `2000px`, with ImageMagick

module Jekyll
	UPLOADS_DESTINATION = 'uploads'.freeze
	UPLOADS_SOURCE = '_uploads'.freeze

	def self.webp_slug(basename)
		"#{Jekyll::Utils.slugify(File.basename(basename, '.*'))}.webp"
	end

	class ConvertToWebp < Generator
		@@dimensions = {}

		def generate(site)
			require 'shellwords'

			dimensions = {}

			FileUtils.mkdir_p(File.join(site.dest, UPLOADS_DESTINATION))

			Dir.glob(File.join(site.source, UPLOADS_SOURCE, "*.{gif,jpeg,jpg,png}")).each do |img|
				webp = File.join(site.dest, UPLOADS_DESTINATION, Jekyll.webp_slug(img))

				width, height = `identify -format "%w %h" #{Shellwords.escape(img)}[0]`.strip.split.map(&:to_i)
				dimensions[File.basename(img)] = { 'width' => width, 'height' => height }

				if File.extname(img) == ".gif"
					FileUtils.cp(img, File.join(site.dest, UPLOADS_DESTINATION, File.basename(img)))
					Jekyll.logger.info "Moved", "#{File.basename(img)}, animated GIF"
				elsif File.exist?(webp)
					Jekyll.logger.info("Skipped", "#{File.basename(webp)}, already exists")
					next
				else
					system("magick", img, "-resize", "2000x2000>", "-quality", "90", "-define", "webp:lossless=false", webp)
					Jekyll.logger.info "Converted", "#{File.basename(webp)}"
				end
			end

			@@dimensions = dimensions
		end
	end

	module WebpData
		def getWebpData(input)
			require 'cgi'

			filename = File.basename(CGI.unescape(input))
			dimensions = Jekyll::ConvertToWebp.class_variable_get(:@@dimensions)[filename]

			if File.extname(filename) == ".gif"
				path = File.join(Jekyll::UPLOADS_DESTINATION, filename)
			else
				path = File.join(Jekyll::UPLOADS_DESTINATION, Jekyll.webp_slug(filename))
			end

			if dimensions
				"data-src=\"#{path}\" width=\"#{dimensions['width']}\" height=\"#{dimensions['height']}\""
			else
				"data-src=\"#{path}\""
			end
		end
	end
end

Liquid::Template.register_filter(Jekyll::WebpData)
