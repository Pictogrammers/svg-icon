const types = {
	mdi: {
		size: '24px',
		viewbox: '0 0 24 24',
	},
	'simple-icons': {
		size: '24px',
		viewbox: '0 0 24 24',
	},
	default: {
		size: '1em',
		viewbox: '0 0 100 100',
	},
}

class SvgIcon extends HTMLElement {
	static get observedAttributes() {
		return ['path', 'type', 'size', 'width', 'height', 'viewbox', 'flip', 'rotate']
	}

	get _defaults() {
		return types[this.getAttribute('type')] || types.default
	}

	constructor(...args) {
		const self = super(...args)

		self.attachShadow({ mode: 'open' })

		this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
		this.path = document.createElementNS('http://www.w3.org/2000/svg', 'path')

		const style = document.createElement('style')

		style.textContent = `
			:host {
				display: inline-grid;
				place-items: center;
			}

			svg {
				transform: rotate(var(--icon-r, 0deg)) scale(var(--icon-sx, 1), var(--icon-sy, 1)); 
			}

			path {
				fill: currentColor;
			}
		`

		this.svg.append(this.path)

		self.shadowRoot.append(style, this.svg)

		return self
	}

	connectedCallback() {
		this.setPath()
		this.setWidth()
		this.setHeight()
		this.setViewbox()
		this.setFlip()
		this.setRotate()
	}

	attributeChangedCallback(name, oldValue, newValue) {
		switch (name) {
			case 'path':
				this.setPath()
				break
			case 'type':
				this.setWidth()
				this.setHeight()
				this.setViewbox()
				break
			case 'size':
				this.setWidth()
				this.setHeight()
				break
			case 'width':
				this.setWidth()
				break
			case 'height':
				this.setHeight()
				break
			case 'viewbox':
				this.setViewbox()
				break
			case 'flip':
				this.setFlip()
				break
			case 'rotate':
				this.setRotate()
				break
		}
	}

	setPath() {
		const path = this.getAttribute('path')

		this.svg.setAttribute('d', path)
	}

	setWidth() {
		const width = this.getAttribute('width') ?? this.getAttribute('size') ?? this._defaults.width ?? this._defaults.size

		this.svg.setAttribute('width', isNaN(width) ? width : width + 'px')
	}

	setHeight() {
		const height = this.getAttribute('height') ?? this.getAttribute('size') ?? this._defaults.height ?? this._defaults.size

		this.svg.setAttribute('height', isNaN(height) ? height : height + 'px')
	}

	setViewbox() {
		const viewBox = this.getAttribute('viewbox') ?? this._defaults.viewbox

		this.svg.setAttribute('viewBox', viewBox)
	}

	setFlip() {
		const flip = this.getAttribute('flip')?.toLowerCase()
		const flipX = ['both', 'horizontal'].includes(flip) ? '-1' : '1'
		const flipY = ['both', 'vertical'].includes(flip) ? '-1' : '1'

		this.svg.style.setProperty('--icon-sx', flipX)
		this.svg.style.setProperty('--icon-sy', flipY)
	}

	setRotate() {
		const rotate = this.getAttribute('rotate') ?? 0

		this.svg.style.setProperty('--icon-r', isNaN(rotate) ? rotate : rotate + 'deg')
	}
}

customElements.define('svg-icon', SvgIcon)
