# Quick Jekyll plugin: convert uploaded images to `.webp`, max `2000px`, with ImageMagick

module Jekyll
	class ConvertToWebp < Generator
		def generate(site)
			uploads_source = File.join(site.source, '_uploads')
			uploads_destination = File.join(site.dest, 'uploads')
			FileUtils.mkdir_p(uploads_destination)

			Dir.glob(File.join(uploads_source, '*.{gif,jpg,jpeg,png}')).each do |img|
				webp = File.join(uploads_destination, "#{Jekyll::Utils.slugify(File.basename(img, '.*'))}.webp")

				next Jekyll.logger.info("Skipped", "#{webp}, already exists") if File.exist?(webp)

				if File.extname(img) == ".gif"
					system("magick", img, "-coalesce", "-resize", "2000x2000>", "-quality", "85", "-define", "webp:lossless=false", webp)
				else
					system("magick", img, "-resize", "2000x2000>", "-quality", "85", "-define", "webp:lossless=false", webp)
				end

				Jekyll.logger.info "Converted", "#{img} → #{webp}"
			end
		end
	end

	module WebpPathFilter
		def webp_path(input)
			require 'cgi'

			decoded = CGI.unescape(input)
			filename = File.basename(decoded, File.extname(decoded))
			slug = Jekyll::Utils.slugify(filename)

			"/uploads/#{slug}.webp"
		end
	end
end

Liquid::Template.register_filter(Jekyll::WebpPathFilter)
