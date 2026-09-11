import '@material/web/button/icon-button.js';
import { argbFromHex, themeFromSourceColor, applyTheme } from '@material/material-color-utilities';

const view = document.getElementById('view');
const address = document.getElementById('address');
const form = document.getElementById('address-form');

const HOME = 'https://www.google.com';

function navigate(input) {
  const value = input.trim();
  if (!value) return;

  let url;
  try {
    if (/^[a-z][a-z\d+.-]*:\/\//i.test(value)) {
      url = value;
    } else if (/^(localhost|127\.0\.0\.1)(:\d+)?([/?#].*)?$/i.test(value) ||
               /^[\w.-]+\.[a-z]{2,}([/:?#].*)?$/i.test(value)) {
      url = `https://${value}`;
    } else {
      url = `https://www.google.com/search?q=${encodeURIComponent(value)}`;
    }
  } catch {
    return;
  }

  view.src = url;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  navigate(address.value);
});

document.getElementById('back').addEventListener('click', () => {
  if (view.canGoBack()) view.goBack();
});

document.getElementById('forward').addEventListener('click', () => {
  if (view.canGoForward()) view.goForward();
});

document.getElementById('reload').addEventListener('click', () => view.reload());
document.getElementById('home').addEventListener('click', () => view.loadURL(HOME));

view.addEventListener('did-stop-loading', () => {
  address.value = view.getURL();
});

view.addEventListener('did-navigate', () => {
  address.value = view.getURL();
});

view.addEventListener('did-navigate-in-page', () => {
  address.value = view.getURL();
});

view.addEventListener('page-title-updated', (event) => {
  document.title = event.title ? `${event.title} - Browsery` : 'Browsery';
});

address.value = HOME;

const sourceColor = argbFromHex('#6750A4');
const theme = themeFromSourceColor(sourceColor);
applyTheme(theme, { target: document.documentElement, dark: false });

document.documentElement.style.setProperty('--md-sys-color-surface', '#fffbfe');
document.documentElement.style.setProperty('--md-sys-color-surface-container', '#f3edf7');
document.documentElement.style.setProperty('--md-sys-color-on-surface', '#1d1b20');
