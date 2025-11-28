// 读写 localStorage
const STORAGE_KEY = 'beerDebt';

function getData() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
}
function setData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// 渲染列表
function render() {
  const data = getData();
  const listEl = document.getElementById('list');
  listEl.innerHTML = '';
  for (const [name, count] of Object.entries(data)) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <span>${name}：${count} 瓶</span>
      <div>
        <button class="plus" onclick="change('${name}',1)">+1</button>
        <button class="minus" onclick="change('${name}',-1)">-1</button>
        <button class="del" onclick="delPerson('${name}')">删除</button>
      </div>`;
    listEl.appendChild(card);
  }
}

// 增/删/改
function addPerson() {
  const name = document.getElementById('nameInput').value.trim();
  if (!name) return alert('填个名字呗');
  const data = getData();
  if (data[name] !== undefined) return alert('已存在');
  data[name] = 0;
  setData(data);
  document.getElementById('nameInput').value = '';
  render();
}
function delPerson(name) {
  if (!confirm(`确定删除 ${name}？`)) return;
  const data = getData();
  delete data[name];
  setData(data);
  render();
}
function change(name, delta) {
  const data = getData();
  data[name] = Math.max(0, (data[name] || 0) + delta); // 不允许负数
  setData(data);
  render();
}

// 首次加载
render();