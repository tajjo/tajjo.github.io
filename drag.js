let numberElements = document.querySelectorAll('.number-box');
let startY;
let isDragging = false;
let currentElement = null;

const days = ['월', '화', '수', '목', '금', '토', '일'];
const ampm = ['AM', 'PM'];

function handleDragStart(clientY, element) {
    startY = clientY;
    isDragging = true;
    currentElement = element;
    currentElement.style.cursor = 'grabbing';
}

function handleDragEnd() {
    if (isDragging) {
        isDragging = false;
        currentElement.style.cursor = 'grab';
        currentElement = null;
    }
}

function handleDragMove(clientY) {
    if (isDragging && currentElement) {
        let deltaY = clientY - startY;

        if (currentElement.id === 'day') {
            updateDay(deltaY);
        } else if (currentElement.id === 'ampm') {
            updateAmPm(deltaY);
        } else if (currentElement.id === 'hour') {
            updateHour(deltaY);
        } else if (currentElement.id === 'minute') {
            updateMinute(deltaY);
        }
        
        startY = clientY; // Reset startY to current position after each update
    }
}

function updateDay(deltaY) {
    let currentIndex = days.indexOf(currentElement.textContent);
    const sensitivity = 50 / days.length; // 드래그 감도 조절
    if (deltaY < -sensitivity) {
        currentIndex = (currentIndex + 1) % days.length;
    } else if (deltaY > sensitivity) {
        currentIndex = (currentIndex - 1 + days.length) % days.length;
    }
    currentElement.textContent = days[currentIndex];
}

function updateAmPm(deltaY) {
    let currentIndex = ampm.indexOf(currentElement.textContent);
    const sensitivity = 50 / ampm.length; // 드래그 감도 조절
    if (deltaY < -sensitivity) {
        currentIndex = (currentIndex + 1) % ampm.length;
    } else if (deltaY > sensitivity) {
        currentIndex = (currentIndex - 1 + ampm.length) % ampm.length;
    }
    currentElement.textContent = ampm[currentIndex];
}

function updateHour(deltaY) {
    let number = parseInt(currentElement.textContent);
    const sensitivity = 50 / 12; // 드래그 감도 조절 (시간은 12시간 기준)
    if (deltaY < -sensitivity) {
        number = (number + 1) % 13; // 12를 넘으면 0으로 순환
    } else if (deltaY > sensitivity) {
        number = (number - 1 + 13) % 13; // 0보다 작아지면 12로 순환
    }
    currentElement.textContent = number.toString().padStart(2, '0'); // 두 자리 숫자로 표시
}

function updateMinute(deltaY) {
    let number = parseInt(currentElement.textContent);
    const sensitivity = 50 / 60; // 드래그 감도 조절 (분은 60분 기준)
    if (deltaY < -sensitivity) {
        number = (number + 1) % 60; // 59를 넘으면 0으로 순환
    } else if (deltaY > sensitivity) {
        number = (number - 1 + 60) % 60; // 0보다 작아지면 59로 순환
    }
    currentElement.textContent = number.toString().padStart(2, '0'); // 두 자리 숫자로 표시
}

numberElements.forEach(element => {
    // Mouse events
    element.addEventListener('mousedown', function(event) {
        handleDragStart(event.clientY, element);
        event.preventDefault(); // Prevent text selection
    });

    // Touch events
    element.addEventListener('touchstart', function(event) {
        handleDragStart(event.touches[0].clientY, element);
        event.preventDefault(); // Prevent default touch behavior
    });
});

// Mouse events
document.addEventListener('mouseup', function() {
    handleDragEnd();
});

document.addEventListener('mousemove', function(event) {
    handleDragMove(event.clientY);
});

// Touch events
document.addEventListener('touchend', function() {
    handleDragEnd();
});

document.addEventListener('touchmove', function(event) {
    handleDragMove(event.touches[0].clientY);
    event.preventDefault(); // Prevent default touch behavior
});
