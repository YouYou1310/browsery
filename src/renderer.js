const view = document.getElementById('view');
const address = document.getElementById('address');
const form = document.getElementById('address-form');
const welcomeForm = document.getElementById('welcome-form');
const welcomeInput = document.getElementById('welcome-input');
const statusText = document.getElementById('status-text');

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

welcomeForm.addEventListener('submit', (event) => {
  event.preventDefault();
  navigate(welcomeInput.value);
});

document.getElementById('back').addEventListener('click', () => {
  if (view.canGoBack()) view.goBack();
});

document.getElementById('forward').addEventListener('click', () => {
  if (view.canGoForward()) view.goForward();
});

document.getElementById('reload').addEventListener('click', () => view.reload());
document.getElementById('home').addEventListener('click', () => view.loadURL(HOME));

view.addEventListener('did-start-loading', () => {
  statusText.textContent = '読み込み中…';
});

view.addEventListener('did-stop-loading', () => {
  statusText.textContent = '準備完了';
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

view.addEventListener('did-fail-load', (event) => {
  if (event.errorCode === -3) return;
  statusText.textContent = `読み込みエラー: ${event.errorDescription}`;
});

address.value = HOME;
