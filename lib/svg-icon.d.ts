declare module '@jamescoyle/svg-icon' {
	export class SvgIcon extends HTMLElement {
		static get observedAttributes(): string[];
		constructor();
		attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
		connectedCallback(): void;
	}
}