const backgroundSelect = document.getElementById('background-select');
const body = document.body;
backgroundSelect.addEventListener('change', () => {
    body.style.backgroundImage = `url('${backgroundSelect.value}')`;
});

const galleryImages = [
    'https://hips.hearstapps.com/hmg-prod/images/monday-motivation-martin-luther-king-jr-66612936d9297.png?crop=1.00xw:0.667xh;0,0.176xh&resize=980:*',
    'https://media-cldnry.s-nbcnews.com/image/upload/t_fit-760w,f_auto,q_auto:best/rockcms/2024-11/inspirational-quotes-swl-241121-01-1ec968.jpg',
    'https://cdn-fkmoj.nitrocdn.com/xvpOGZRTxJUhXKufpOYIruQcRqtvAAQX/assets/images/optimized/rev-4e1f421/media.briantracy.com/blog/wp-content/uploads/2024/01/23111610/Quote-11.png',
    'https://images-cdn.ubuy.com.sa/634d1bc3aef3511fe6018e7b-motivational-quote-wall-art-decal-do.jpg'
];
let currentImageIndex = 0;
const galleryImage = document.getElementById('gallery-image');
document.getElementById('prev-btn').addEventListener('click', () => {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    galleryImage.src = galleryImages[currentImageIndex];
});
document.getElementById('next-btn').addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    galleryImage.src = galleryImages[currentImageIndex];
});
setInterval(() => {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    galleryImage.src = galleryImages[currentImageIndex];
}, 3000);

let currentDate = new Date();
const calendarGrid = document.querySelector('.calendar-grid');
const currentMonthYear = document.getElementById('current-month-year');
function renderCalendar() {
    const today = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    currentMonthYear.textContent = `${firstDay.toLocaleString('default', { month: 'long' })} ${year}`;
    calendarGrid.innerHTML = `<div class="day">Sun</div><div class="day">Mon</div><div class="day">Tue</div><div class="day">Wed</div><div class="day">Thu</div><div class="day">Fri</div><div class="day">Sat</div>`;
    for (let i = 0; i < startingDay; i++) calendarGrid.appendChild(document.createElement('div'));
    for (let day = 1; day <= daysInMonth; day++) {
        const dayDiv = document.createElement('div');
        dayDiv.textContent = day;
        if (year === today.getFullYear() && month === today.getMonth() && day === today.getDate()) {
            dayDiv.classList.add('current-day');
        }
        calendarGrid.appendChild(dayDiv);
    }
}
document.getElementById('prev-month').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});
document.getElementById('next-month').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});
renderCalendar();

const todoInput = document.getElementById('todo-input');
const addTodoButton = document.getElementById('add-todo');
const todoList = document.getElementById('todo-list');
addTodoButton.addEventListener('click', () => {
    const task = todoInput.value.trim();
    if (task) {
        const li = document.createElement('li');
        li.innerHTML = `<span>${task}</span><input type="checkbox"><button class="remove-btn">&times;</button>`;
        todoList.appendChild(li);
        todoInput.value = '';
    } else alert('Please enter a task!');
});
todoList.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-btn')) e.target.parentElement.remove();
    if (e.target.type === 'checkbox') e.target.parentElement.classList.toggle('completed');
});

let calcDisplay = document.getElementById('calc-display');
function appendToDisplay(value) { calcDisplay.value += value; }
function clearDisplay() { calcDisplay.value = ''; }
function calculate() {
    try { calcDisplay.value = eval(calcDisplay.value); } 
    catch { calcDisplay.value = 'Error'; }
}

let timer;
let timeLeft = 1500;
const timerDisplay = document.getElementById('timer');
document.getElementById('start-timer').addEventListener('click', () => {
    if(!timer) timer = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        if(timeLeft > 0) timeLeft--;
        else clearInterval(timer);
    }, 1000);
});
document.getElementById('reset-timer').addEventListener('click', () => {
    clearInterval(timer);
    timer = null;
    timeLeft = 1500;
    timerDisplay.textContent = '25:00';
});

document.getElementById('calculate-calories').addEventListener('click', () => {
    const minutes = document.getElementById('workout-time').value;
    document.getElementById('calories-burnt').textContent = Math.floor(minutes * 5);
});

let totalExpenses = 0;
document.getElementById('add-expense').addEventListener('click', () => {
    const name = document.getElementById('expense-name').value;
    const amount = parseFloat(document.getElementById('expense-amount').value);
    if(name && amount) {
        const entry = document.createElement('div');
        entry.innerHTML = `${name}: $${amount.toFixed(2)}<button class="remove-btn">&times;</button>`;
        document.getElementById('expense-list').appendChild(entry);
        totalExpenses += amount;
        document.getElementById('total-expenses').textContent = totalExpenses.toFixed(2);
        document.getElementById('expense-name').value = '';
        document.getElementById('expense-amount').value = '';
    } else alert('Please fill both fields!');
});
document.getElementById('expense-list').addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-btn')) {
        const amount = parseFloat(e.target.parentElement.textContent.match(/\d+\.\d+/)[0]);
        totalExpenses -= amount;
        document.getElementById('total-expenses').textContent = totalExpenses.toFixed(2);
        e.target.parentElement.remove();
    }
});