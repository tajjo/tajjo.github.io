const temp_days = ['월', '화', '수', '목', '금', '토', '일'];
let dayIndex = 0;
let temp_ampmIndex = 0;
let hour = 1;
let minute = 0;

document.getElementById('img1').addEventListener('click', () => {
    tempDay = document.getElementById('day').textContent;
    dayIndex = temp_days.indexOf(tempDay);
    dayIndex = (dayIndex + 1) % temp_days.length;
    document.getElementById('day').textContent = temp_days[dayIndex];
});

document.getElementById('img5').addEventListener('click', () => {
    tempDay = document.getElementById('day').textContent;
    dayIndex = temp_days.indexOf(tempDay);
    dayIndex = (dayIndex - 1 + temp_days.length) % temp_days.length;
    document.getElementById('day').textContent = temp_days[dayIndex];
});

function toggleAmpm() {
    const ampmElement = document.getElementById('ampm');
    if (ampmElement.textContent === 'AM') {
        ampmElement.textContent = 'PM';
    } else {
        ampmElement.textContent = 'AM';
    }
}

document.getElementById('img2').addEventListener('click', toggleAmpm);
document.getElementById('img6').addEventListener('click', toggleAmpm);

document.getElementById('img3').addEventListener('click', () => {
    hour = parseInt(document.getElementById('hour').textContent,10);
    hour = (hour % 12) + 1;
    document.getElementById('hour').textContent = hour.toString().padStart(2, '0');
});

document.getElementById('img7').addEventListener('click', () => {
    hour = parseInt(document.getElementById('hour').textContent,10);
    hour = (hour - 1 < 1) ? 12 : hour - 1;
    document.getElementById('hour').textContent = hour.toString().padStart(2, '0');
});

document.getElementById('img4').addEventListener('click', () => {
    minute = parseInt(document.getElementById('minute').textContent,10);
    minute = (minute + 1) % 60;
    document.getElementById('minute').textContent = minute.toString().padStart(2, '0');
});

document.getElementById('img8').addEventListener('click', () => {
    minute = parseInt(document.getElementById('minute').textContent,10);
    minute = (minute - 1 < 0) ? 59 : minute - 1;
    document.getElementById('minute').textContent = minute.toString().padStart(2, '0');
});