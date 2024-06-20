let temp_result;
let result_button = 0;
function loadAndFindRooms(dayValue, buildingCode, timeValue, sortType) {
    const csvFile = 'https://raw.githubusercontent.com/tajjo/tajjo.github.io/main/final.csv';
    loadCSV(csvFile, function(data) {
        const availableRooms = findAvailableRooms(data, dayValue, buildingCode, timeValue);
        let results = findNextAvailableTime(availableRooms, timeValue, data[0]);

        // 정렬 조건에 따라 results 정렬
        switch (sortType) {
            case 0:
                results.sort((a, b) => a.room.localeCompare(b.room)); // room 기준 오름차순
                break;
            case 1:
                results.sort((a, b) => {
                    if (a.nextAvailableTime === '오후 6시') return -1;
                    if (b.nextAvailableTime === '오후 6시') return 1;
                    return b.nextAvailableTime.localeCompare(a.nextAvailableTime); // nextAvailableTime 기준 내림차순
                });
                break;
            case 2:
                results.sort((a, b) => b.utilize - a.utilize); // utlize 기준 내림차순
                break;
            case 3:
                results.sort((a, b) => b.size - a.size); // size 기준 내림차순
                break;
        }

        // console.log('Available Rooms:', availableRooms);
        // console.log('Next Available Times:', results);
        displayResults(results);
        temp_result = results;
    });
}

// CSV 데이터를 파싱하는 함수
function loadCSV(file, callback) {
    fetch(file)
        .then(response => response.text())
        .then(text => {
            const rows = text.split('\n').map(row => row.split(','));
            callback(rows);
        })
        .catch(error => console.error('Error loading CSV:', error));
}

// 지정된 조건에 따라 사용 가능한 방들을 찾는 함수
function findAvailableRooms(data, day, building, time) {
    const timeColumn = time.toString();
    const availableRooms = [];

    for (let i = 1; i < data.length; i++) {
        const row = data[i];
        const rowDay = parseInt(row[0], 10);
        const rowBuilding = row[1];
        const rowTimeValue = row[data[0].indexOf(timeColumn)];

        if (rowDay === day && rowBuilding === building && rowTimeValue === '0') {
            availableRooms.push(row);
        }
    }

    return availableRooms;
}

// 지정된 조건에 맞는 다음 가능한 시간을 찾는 함수
function findNextAvailableTime(data, timeValue, header) {
    const results = [];

    const timeIndex = header.indexOf(timeValue.toString());
    const nextColumns = header.slice(timeIndex + 1);

    data.forEach(row => {
        const room = row[4]; // 방 이름이 있는 열 인덱스가 4
        const utlize= row[2]; // 이용률이 있는 열 인덱스가 2
        const size = row[3]; // 크기가 있는 열 인덱스가 3  
        let nextAvailableTime = 'N/A';

        for (let i = timeIndex + 1; i < row.length; i++) {
            if (row[i] === '1') {
                nextAvailableTime = header[i];
                break;
            }
        }

        // 다음 가능한 시간을 사람이 이해할 수 있는 형식으로 변환
        result_nextAvailableTime = convertTimeFormat(nextAvailableTime);

        results.push({ room, nextAvailableTime, utlize,size,result_nextAvailableTime });
    });

    return results;
}

// 시간을 사람이 이해할 수 있는 형식으로 변환하는 함수
function convertTimeFormat(timeValue) {
    if (timeValue === 'N/A') {
        return '오늘은 이제부터 비어요';
    }

    const [hour, fractional] = timeValue.split('.').map(Number);
    let minutes = 0;

    switch (fractional) {
        case 1:
            minutes = 15;
            break;
        case 2:
            minutes = 30;
            break;
        case 3:
            minutes = 45;
            break;
        default:
            minutes = 0;
    }

    const period = hour >= 12 ? '오후' : '오전';
    const displayHour = hour % 12 || 12;
    const displayMinutes = minutes ? `${minutes}분` : '정각';

    return `${period} ${displayHour}시 ${displayMinutes}까지 사용가능`;
}

// 결과를 동적으로 표시하는 함수
function displayResults(roomAvailability) {
    // .container 요소 선택
    const container = document.querySelector('.container');

    // 기존 동적 콘텐츠 제거
    container.querySelectorAll('.dynamic_content').forEach(element => element.remove());

    // 출력 및 동적으로 요소 추가
    roomAvailability.forEach(({ room, result_nextAvailableTime }) => {
        const content = `${room}호   👉     ${result_nextAvailableTime}`;
        
        // 새로운 div 요소 생성
        const newBox = document.createElement('div');
        newBox.className = 'box dynamic_content';
        newBox.textContent = content;
        
        // .container 요소에 추가
        container.appendChild(newBox);
    });
}

// 예시 사용
document.querySelectorAll('.text-container, .button-container, .selector-time, .selector-map, .sub-rectangle').forEach(element => {
    element.addEventListener('click', function() {
        // 요일 값 읽기 및 숫자로 변환
        const dayElement = document.querySelector('.day.number-box#day');
        const dayText = dayElement ? dayElement.textContent.trim() : '';
        const dayMap = {
            '월': 1,
            '화': 2,
            '수': 3,
            '목': 4,
            '금': 5
        };
        const dayValue = dayMap[dayText] || 0; // 알 수 없는 요일은 0으로 처리

        // 시간 값 읽기
        const ampmElement = document.querySelector('.ampm.number-box#ampm');
        const hourElement = document.querySelector('.hour.number-box#hour');
        const minuteElement = document.querySelector('.minute.number-box#minute');
        
        const ampm = ampmElement ? ampmElement.textContent.trim() : '';
        let hour = hourElement ? parseInt(hourElement.textContent.trim(), 10) : 0;
        const minute = minuteElement ? parseInt(minuteElement.textContent.trim(), 10) : 0;
        
        // 시간 계산 (24시간제로 변환)
        if (ampm === 'PM' && hour < 12) {
            hour += 12;
        } else if (ampm === 'AM' && hour === 12) {
            hour = 0; // 오전 12시는 0시로 변환
        }
        
        // 분을 15분 단위로 소수점 변환
        let fractionalMinute = 0;
        if (minute >= 0 && minute <= 14) {
            fractionalMinute = 0;
        } else if (minute >= 15 && minute <= 29) {
            fractionalMinute = 0.1;
        } else if (minute >= 30 && minute <= 44) {
            fractionalMinute = 0.2;
        } else if (minute >= 45 && minute <= 59) {
            fractionalMinute = 0.3;
        }

        // 최종 시간 값 계산
        const finalTimeValue = Math.max(hour + fractionalMinute, 9);
        
        // location-result 요소의 텍스트 값 읽기 및 변환
        const locationElement = document.querySelector('#location-result');
        const locationText = locationElement ? locationElement.textContent.trim() : '';
        let locationCode = '';

        if (locationText.includes('외국어') || locationText.includes('for')) {
            locationCode += 'fore ';
        }
        if (locationText.includes('공과') || locationText.includes('공')) {
            locationCode += 'eng ';
        }
        if (locationText.includes('전자') || locationText.includes('sw')) {
            locationCode += 'sw ';
        }
        

        locationCode = locationCode.trim(); // 앞뒤 공백 제거
        // result_button 변수 선언


        // 버튼 클릭 이벤트 리스너 추가
        document.getElementById('buttonMinSteps').addEventListener('click', () => handleButtonClick(0));
        document.getElementById('buttonMaxTime').addEventListener('click', () => handleButtonClick(1));
        document.getElementById('buttonUtility').addEventListener('click', () => handleButtonClick(2));
        document.getElementById('buttonSpaceSize').addEventListener('click', () => handleButtonClick(3));

        // 버튼 클릭 핸들러 함수
        function handleButtonClick(buttonIndex) {
            result_button = buttonIndex;
            // console.log(result_button);
        }


        // loadAndFindRooms 함수 호출
        loadAndFindRooms(dayValue, locationCode, finalTimeValue,result_button);
        
        // 결과 값 출력 (디버그 용도)
        // console.log(`요일 값: ${dayValue}, 시간 값: ${finalTimeValue}, 위치 코드: ${locationCode}, 정렬 값: ${result_button}`);
    });
});
