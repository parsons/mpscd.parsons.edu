# Quick Jekyll plugin: convert uploaded images to `.webp`, max `2000px`, with ImageMagick

module Jekyll
	class ConvertToWebp < Generator
		safe true
		priority :low

		def generate(site)
			src_dir = File.join(site.source, '_uploads')
			dest_dir = File.join(site.dest, 'uploads')
			FileUtils.mkdir_p(dest_dir)

			Dir.glob(File.join(src_dir, '*.{jpg,jpeg,png,gif,JPG,JPEG,PNG,GIF}')).each do |img|
				filename = File.basename(img)
				name = File.basename(img, '.*')
				ext = File.extname(img).downcase
				dest = File.join(dest_dir, "#{name}.webp")

				if File.exist?(dest)
					Jekyll.logger.info "Skipped", "#{dest}, already exists"
					next
				if ext == '.gif'
					system("magick", img, "-coalesce", "-resize", "2000x2000>", "-quality", "85", "-define", "webp:lossless=false", dest)
				else
					system("magick", img, "-resize", "2000x2000>", "-quality", "85", "-define", "webp:lossless=false", dest)
				end
				Jekyll.logger.info "Converted", "#{img} → #{dest}"
			end
		end
	end
end
