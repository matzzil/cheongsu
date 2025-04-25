
let members = [];
let expenses = [];

function updateStats() {
  document.getElementById('total-members').innerText = members.length;
  document.getElementById('attended-members').innerText = members.filter(m => m.attended).length;
  const totalFees = members.reduce((sum, m) => sum + (m.fee || 0), 0);
  document.getElementById('total-fees').innerText = totalFees;
}

function renderMembers() {
  const list = document.getElementById('members');
  list.innerHTML = '';
  members.forEach((m, i) => {
    const li = document.createElement('li');
    li.innerHTML = \`\${m.name} (\${m.contact || '연락처 없음'}) 
      <button onclick="toggleAttendance(\${i})">\${m.attended ? '출석취소' : '출석'}</button>
      <button onclick="deleteMember(\${i})">삭제</button>\`;
    list.appendChild(li);
  });
  updateStats();
}

function addMember() {
  const name = document.getElementById('name').value.trim();
  const contact = document.getElementById('contact').value.trim();
  if (!name) return alert('이름을 입력하세요');
  members.push({ name, contact, attended: false, fee: 0 });
  document.getElementById('name').value = '';
  document.getElementById('contact').value = '';
  renderMembers();
}

function deleteMember(index) {
  if (confirm('삭제하시겠습니까?')) {
    members.splice(index, 1);
    renderMembers();
  }
}

function toggleAttendance(index) {
  members[index].attended = !members[index].attended;
  renderMembers();
}

function renderExpenses() {
  const list = document.getElementById('expense-list');
  list.innerHTML = '';
  expenses.forEach((e, i) => {
    const li = document.createElement('li');
    li.innerHTML = \`\${e.desc}: \${e.amount}원
      <button onclick="deleteExpense(\${i})">삭제</button>\`;
    list.appendChild(li);
  });
}

function addExpense() {
  const desc = document.getElementById('expense-desc').value.trim();
  const amount = parseInt(document.getElementById('expense-amount').value);
  if (!desc || isNaN(amount)) return alert('항목과 금액을 입력하세요');
  expenses.push({ desc, amount });
  document.getElementById('expense-desc').value = '';
  document.getElementById('expense-amount').value = '';
  renderExpenses();
}

function deleteExpense(index) {
  if (confirm('삭제하시겠습니까?')) {
    expenses.splice(index, 1);
    renderExpenses();
  }
}

renderMembers();
renderExpenses();
