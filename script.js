const SERVER_URL = 'https://httpbin.org/post';

document.addEventListener('DOMContentLoaded', () => {
  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a').forEach(link => {
    if (link.getAttribute('href') === current) link.classList.add('active');
  });

  document.querySelectorAll('form[data-remote]').forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const statusEl = document.getElementById(form.dataset.status);
      statusEl.textContent = '⏳ Отправка...';
      statusEl.style.color = 'yellow';
      try {
        await fetch(SERVER_URL, { method: 'POST', body: new FormData(form) });
        statusEl.textContent = '✅ Успешно отправлено на сервер!';
        statusEl.style.color = 'lime';
        form.reset();
      } catch (err) {
        statusEl.textContent = '⚠️ Ошибка сервера';
        statusEl.style.color = 'red';
      }
    });
  });
});

// ЗАДАНИЕ 1
function readPassportFromDOM() {
  // document.getElementsByTagName('p')[2].childNodes[1].innerText
  const surname = document.getElementsByTagName('p')[0].childNodes[1].innerText;
  const name = document.getElementsByTagName('p')[1].childNodes[1].innerText;
  const year = document.getElementsByTagName('p')[2].childNodes[1].innerText;

  const output = document.getElementById('dom-output');
  output.innerHTML = `
    <p>Считано из DOM:</p>
    <p>Фамилия: <span style="color:#00f0ff">${surname}</span></p>
    <p>Имя: <span style="color:#00f0ff">${name}</span></p>
    <p>Год: <span style="color:#00f0ff">${year}</span></p>
  `;
  output.style.display = 'block';

  const data = new FormData();
  data.append('task', 'DOM_JS');
  data.append('surname', surname);
  data.append('name', name);
  data.append('year', year);
  fetch(SERVER_URL, { method: 'POST', body: data });
}

//  Латиница
const TRANSLIT = {'А':'A','Б':'B','В':'V','Г':'G','Д':'D','Е':'E','Ё':'E','Ж':'Zh','З':'Z','И':'I','Й':'Y','К':'K','Л':'L','М':'M','Н':'N','О':'O','П':'P','Р':'R','С':'S','Т':'T','У':'U','Ф':'F','Х':'Kh','Ц':'Ts','Ч':'Ch','Ш':'Sh','Щ':'Shch','Ъ':'','Ы':'Y','Ь':'','Э':'E','Ю':'Yu','Я':'Ya','а':'a','б':'b','в':'v','г':'g','д':'d','е':'e','ё':'e','ж':'zh','з':'z','и':'i','й':'y','к':'k','л':'l','м':'m','н':'n','о':'o','п':'p','р':'r','с':'s','т':'t','у':'u','ф':'f','х':'kh','ц':'ts','ч':'ch','ш':'sh','щ':'shch','ъ':'','ы':'y','ь':'','э':'e','ю':'yu','я':'ya'};

function changeCyrillicToLatin() {
  const paragraphs = document.getElementsByTagName('p');
  // Фамилия, Имя, Год
  for (let i = 0; i < 3; i++) {
    const node = paragraphs[i].childNodes[1];
    if (!node.dataset.original) node.dataset.original = node.innerText;
    node.innerText = node.dataset.original.split('').map(char => TRANSLIT[char] !== undefined ? TRANSLIT[char] : char).join('');
  }
  document.getElementById('latin-status').innerText = "Транслитерация выполнена!";
  document.getElementById('latin-status').style.color = "lime";
}

// 1004
function solveAlgorithm(event) {
  event.preventDefault();
  const S = parseFloat(document.getElementById('task-S').value);
  const R = parseFloat(document.getElementById('task-R').value);
  const K = parseFloat(document.getElementById('task-K').value);

  const side = Math.sqrt(S);
  const passage = (side / 2) - R;
  const possible = passage >= K;
  const text = possible ? "ДА, арену можно поместить." : "НЕТ, арену нельзя поместить.";

  const resBox = document.getElementById('algo-result');
  resBox.innerHTML = `<p style="font-size:1.2rem; color:${possible ? 'lime' : 'red'};">${text}</p>
                      <p>Сторона зала: ${side.toFixed(2)} м. Проход: ${passage.toFixed(2)} м (нужно ${K} м)</p>`;
  resBox.style.display = 'block';

  const data = new FormData();
  data.append('task', '1004');
  // Формулировкая:
  data.append('formulation', 'Можно ли в квадратном зале площадью S поместить круглую арену радиусом R так, чтобы от стены до сцены был проход не менее K?');
  data.append('S', S); data.append('R', R); data.append('K', K);
  data.append('result', text);
  fetch(SERVER_URL, { method: 'POST', body: data });
}