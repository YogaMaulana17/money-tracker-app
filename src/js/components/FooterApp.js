import { html } from 'lit';
import LitWithoutShadowDom from './base/LitWithoutShadowDom';

class FooterApp extends LitWithoutShadowDom {
  render() {
    return html`
      <p class="text-center text-white mb-0">
        Made with <i class="bi bi-heart-fill text-primary"></i> by Dicoding Indonesia
      </p>
    `;
  }
}

customElements.define('footer-app', FooterApp);
