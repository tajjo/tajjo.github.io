document.addEventListener('DOMContentLoaded', () => {
    const dayElement = document.getElementById('day');
    const hourElement = document.getElementById('hour');
    const minuteElement = document.getElementById('minute');

    function updateClock() {
        const now = new Date();
        const days = ['일', '월', '화', '수', '목', '금', '토'];
        const day = days[now.getDay()];
        const hours = now.getHours();
        const minutes = now.getMinutes();

        const displayHours = hours % 12 || 12; // Convert to 12-hour format
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const displayMinutes = minutes < 10 ? '0' + minutes : minutes;

        dayElement.textContent = day;
        hourElement.textContent = ampm + ' ' + displayHours  ;
        minuteElement.textContent = displayMinutes;
    }

    updateClock(); // Initial call to set the time immediately
});

function selectButton(button) {
    // 모든 버튼의 선택 해제
    const buttons = document.querySelectorAll('.button');
    buttons.forEach(btn => btn.classList.remove('selected'));
    
    // 클릭한 버튼만 선택
    button.classList.add('selected');
}


function selectText(element) {
    // 모든 텍스트 버튼의 선택 해제
    const textButtons = document.querySelectorAll('.text-button');
    textButtons.forEach(btn => btn.classList.remove('selected'));
    
    // 클릭한 텍스트 버튼만 선택
    element.classList.add('selected');
}