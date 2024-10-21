import DrawerInitiator from '../utils/drawer-initiator';
import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';

class App {
  constructor({ button, drawer, content }) {
    this._button = button;
    this._drawer = drawer;
    this._content = content;

    this._initialAppShell();
  }

  _initialAppShell() {
    DrawerInitiator.init({
      button: this._button,
      drawer: this._drawer,
      content: this._content,
    });
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];

    try {
      // Render halaman yang sesuai
      this._content.innerHTML = await page.render();
      await page.afterRender();

      // Fitur skip to content
      const skipLinkElem = document.querySelector('.skip-link');
      if (skipLinkElem) {
        skipLinkElem.addEventListener('click', (event) => {
          event.preventDefault();
          const mainContent = document.querySelector('#mainContent');
          if (mainContent) {
            mainContent.focus();
          }
        });
      }
    } catch (error) {
      // Error handling: tampilkan pesan kesalahan atau arahkan ke halaman utama
      console.error(error);
      this._content.innerHTML = '<h2>Halaman tidak ditemukan atau terjadi kesalahan!</h2>';
      // Jika ingin mengarahkan pengguna ke halaman utama setelah error
      setTimeout(() => {
        window.location.href = '#/home';
      }, 3000);
    }
  }
}

export default App;
