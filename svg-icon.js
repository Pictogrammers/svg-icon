const defaults = {
	size: 24,
	viewbox: '0 0 24 24',
}

class SvgIcon extends HTMLElement {
	static get observedAttributes() {
		return ['path', 'viewbox', 'size', 'flip', 'rotate']
	}

	constructor(...args) {
		const self = super(...args)

		self.attachShadow({ mode: 'open' })

		const style = document.createElement('style')
		const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
		const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')

		style.textContent = `
			svg {
				transform: rotate(var(--r, 0deg)) scale(var(--tx, 1), var(--ty, 1)); 
			}

			path {
				fill: currentColor;
			}
		`

		svg.append(path)

		self.shadowRoot.append(style, svg)

		return self
	}

	connectedCallback() {
		const svg = this.shadowRoot.querySelector('svg')
		const path = this.shadowRoot.querySelector('path')

		svg.setAttribute('width', this.getAttribute('size') || defaults.size)
		svg.setAttribute('height', this.getAttribute('size') || defaults.size)
		svg.setAttribute('viewBox', this.getAttribute('viewbox') || defaults.viewbox)

		svg.style.setProperty('--tx', ['both', 'horizontal'].includes(this.getAttribute('flip').toLowerCase()) ? '-1' : '1')
		svg.style.setProperty('--ty', ['both', 'vertical'].includes(this.getAttribute('flip').toLowerCase()) ? '-1' : '1')

		svg.style.setProperty('--r', this.getAttribute('rotate'))

		path.setAttribute('d', this.getAttribute('path'))
	}

	attributeChangedCallback(name, oldValue, newValue) {
		const svg = this.shadowRoot.querySelector('svg')
		const path = this.shadowRoot.querySelector('path')

		switch (name) {
			case 'path':
				path.setAttribute('d', newValue)
				break

			case 'viewbox':
				svg.setAttribute('viewBox', newValue || defaults.viewbox)
				break

			case 'size':
				svg.setAttribute('width', newValue || defaults.size)
				svg.setAttribute('height', newValue || defaults.size)
				break

			case 'flip':
				svg.style.setProperty('--tx', ['both', 'horizontal'].includes(newValue.toLowerCase()) ? '-1' : '1')
				svg.style.setProperty('--ty', ['both', 'vertical'].includes(newValue.toLowerCase()) ? '-1' : '1')
				break

			case 'rotate':
				svg.style.setProperty('--r', newValue)
				break
		}
	}
}

customElements.define('svg-icon', SvgIcon)
