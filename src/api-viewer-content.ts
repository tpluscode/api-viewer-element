import { LitElement, html, customElement, css, property } from 'lit-element';
import { ElementInfo } from './lib/types.js';
import { EMPTY_ELEMENTS, EMPTY_ELEMENT } from './lib/constants.js';
import './api-viewer-docs.js';
import './api-viewer-header.js';
import './api-viewer-marked.js';
import './api-viewer-select.js';

@customElement('api-viewer-content')
export class ApiViewerContent extends LitElement {
  @property({ attribute: false }) elements: ElementInfo[] = EMPTY_ELEMENTS;

  @property({ type: Number }) selected = 0;

  static get styles() {
    return css`
      :host {
        display: block;
      }

      .description {
        padding: 0.75rem;
        border-bottom: solid 1px var(--ave-border-color);
      }
    `;
  }

  protected render() {
    const { elements, selected } = this;
    const tags = elements.map((tag: ElementInfo) => tag.name);

    const element = EMPTY_ELEMENT;
    if (elements[selected]) {
      Object.assign(element, elements[selected]);
    }

    const {
      name,
      description,
      properties,
      attributes,
      slots,
      events
    } = element;

    return html`
      <api-viewer-header .heading="${name}">
        <api-viewer-select
          .options="${tags}"
          .selected="${selected}"
          @selected-changed="${this._onSelect}"
        ></api-viewer-select>
      </api-viewer-header>
      <api-viewer-marked
        .content="${description}"
        class="description"
      ></api-viewer-marked>
      <api-viewer-docs
        .name="${name}"
        .props="${properties}"
        .attrs="${attributes}"
        .events="${events}"
        .slots="${slots}"
      ></api-viewer-docs>
    `;
  }

  private _onSelect(e: CustomEvent) {
    const { selected } = e.detail;
    this.selected = this.elements.findIndex(el => el.name === selected);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'api-viewer-content': ApiViewerContent;
  }
}
