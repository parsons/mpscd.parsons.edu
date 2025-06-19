// Lazy-loadin’ with `IntersectionObserver`, since native doesn’t work here.

document.addEventListener('DOMContentLoaded', () => {
	const lazyObserver = new IntersectionObserver((entries, observer) => {
		entries.forEach(({ isIntersecting, target }) => {
			isIntersecting
				? (target.src = target.dataset.src,
					target.removeAttribute('data-src'),
					observer.unobserve(target))
				: null
		})
	})

	document.querySelectorAll('img[data-src]').forEach(img => lazyObserver.observe(img))
})
