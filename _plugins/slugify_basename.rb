module Jekyll
	module SlugifyBasename
		def slugify_basename(input)
			require 'cgi'

			decoded = CGI.unescape(input)
			filename = File.basename(decoded, File.extname(decoded))

			Jekyll::Utils.slugify(filename)
		end
	end
end

Liquid::Template.register_filter(Jekyll::SlugifyBasename)
