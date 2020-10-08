const types = {
	mdi: {
		size: 24,
		viewbox: '0 0 24 24',
	},
	'simple-icons': {
		size: 24,
		viewbox: '0 0 24 24',
	},
	default: {
		size: 0,
		viewbox: '0 0 0 0',
	},
}

class SvgIcon extends HTMLElement {
	static get observedAttributes() {
		return ['type', 'path', 'size', 'viewbox', 'flip', 'rotate']
	}

	get defaults() {
		return types[this.getAttribute('type')] || types.default
	}

	get size() {
		return this.getAttribute('size') || this.defaults.size
	}

	get viewbox() {
		return this.getAttribute('viewbox') || this.defaults.viewbox
	}

	get flip() {
		const flip = this.getAttribute('flip').toLowerCase()
		return {
			x: ['both', 'horizontal'].includes(flip) ? '-1' : '1',
			y: ['both', 'vertical'].includes(flip) ? '-1' : '1',
		}
	}

	get rotate() {
		const rotate = this.getAttribute('rotate')

		if (!isNaN(rotate)) return rotate + 'deg'
		return rotate
	}

	constructor(...args) {
		const self = super(...args)

		self.attachShadow({ mode: 'open' })

		const style = document.createElement('style')
		const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
		const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')

		style.textContent = `
			svg {
				transform: rotate(var(--r, 0deg)) scale(var(--sx, 1), var(--sy, 1)); 
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

		const flip = this.getAttribute('flip').toLowerCase()

		svg.setAttribute('width', this.size)
		svg.setAttribute('height', this.size)
		svg.setAttribute('viewBox', this.viewbox)

		svg.style.setProperty('--sx', this.flip.x)
		svg.style.setProperty('--sy', this.flip.y)
		svg.style.setProperty('--r', this.rotate)

		path.setAttribute('d', this.getAttribute('path'))
	}

	attributeChangedCallback(name, oldValue, newValue) {
		const svg = this.shadowRoot.querySelector('svg')
		const path = this.shadowRoot.querySelector('path')

		switch (name) {
			case 'type':
				// update all values that icon type affects
				svg.setAttribute('width', this.size)
				svg.setAttribute('height', this.size)
				svg.setAttribute('viewBox', this.viewbox)
				break

			case 'path':
				path.setAttribute('d', newValue)
				break

			case 'size':
				svg.setAttribute('width', this.size)
				svg.setAttribute('height', this.size)
				break

			case 'viewbox':
				svg.setAttribute('viewBox', this.viewbox)
				break

			case 'flip':
				svg.style.setProperty('--sx', this.flip.x)
				svg.style.setProperty('--sy', this.flip.y)
				break

			case 'rotate':
				svg.style.setProperty('--r', this.rotate)
				break
		}
	}
}

customElements.define('svg-icon', SvgIcon)
