document.addEventListener('DOMContentLoaded', () => {
    const dayElement = document.getElementById('day');
    const ampmElement = document.getElementById('ampm');
    const hourElement = document.getElementById('hour');
    const minuteElement = document.getElementById('minute');

    function updateClock() {
        const now = new Date();
        const days = ['일', '월', '화', '수', '목', '금'];
        const day = days[now.getDay()];
        const hours = now.getHours();
        const minutes = now.getMinutes();

        const displayHours = hours % 12 || 12; // Convert to 12-hour format
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const displayMinutes = minutes < 10 ? '0' + minutes : minutes;

        dayElement.textContent = day;
        ampmElement.textContent = ampm;
        hourElement.textContent = displayHours  ;
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
    var explanationText;
    switch (button.id) {
        case 'buttonMinSteps':
            explanationText = ' " 1층을 기준으로 가장 가까운 강의실부터 나열합니다. "';
            break;
        case 'buttonMaxTime':
            explanationText = ' " 설정한 시점 기준 가장 오래 쓸 수 있는 강의실부터 나열합니다. "';
            break;
        case 'buttonUtility':
            explanationText = ' " 가장 편의 장비가 많은 강의실부터 나열합니다. "';
            break;
        case 'buttonSpaceSize':
            explanationText = ' " 가장 넓은 강의실부터 나열합니다. "';
            break;
    }
    document.getElementById('explanation').innerText = explanationText;
}


function selectText(element) {
    // 모든 텍스트 버튼의 선택 해제
    const textButtons = document.querySelectorAll('.text-button');
    textButtons.forEach(btn => btn.classList.remove('selected'));
    
    // 클릭한 텍스트 버튼만 선택
    element.classList.add('selected');
}

function openSidebar() {
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('sidebar').classList.add('open');
}

function closeSidebar() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('sidebar').classList.remove('open');
}



// 새로고침 함수
function refreshPage() {
    location.reload();
}

// 로고 클릭 이벤트 리스너 추가
document.getElementById('mainLogo').addEventListener('click', refreshPage);




// 기본 선택 함수
window.onload = function() {
    document.getElementById('buttonMinSteps').classList.add('selected');
    document.getElementById('textButtonClassroom').classList.add('selected');
}