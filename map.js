// 미리 정의된 위치 좌표 비율
const locations = {
    '멀티미디어관': { x: 0.4657696571231987, y: 0.0414233924823507 },
    '외국어대학': { x: 0.6663736095714996, y: 0.09026903262736119 },
    '공과대학': { x: 0.8180497687397271, y: 0.30030528525090633 },
    '체육대학': { x: 0.7764611444516647, y: 0.5054569738599504 },
    '예술디자인대학': { x: 0.49023355376323535, y: 0.7448006105705018 },
    '전자정보대학': { x: 0.15263178013072895, y: 0.7814348406792597 },
    '국제대학': { x: 0.12572149382668857, y: 0.42486166762068306 },
    '학생회관': { x: 0.25048736669087573, y: 0.2294791070406411 },
    '생명과학대학': { x: 0.5098046710752647, y: 0.44439992367868725 }
};

function initializeSVGInteractions() {
    var svgElement = document.getElementById('map-svg');
    var locationResult = document.getElementById('location-result');

    function findClosestLocation(xRatio, yRatio) {
        let closestLocation = null;
        let minDistance = Infinity;

        for (const [name, coords] of Object.entries(locations)) {
            const distance = Math.sqrt(Math.pow(coords.x - xRatio, 2) + Math.pow(coords.y - yRatio, 2));
            if (distance < minDistance) {
                closestLocation = name;
                minDistance = distance;
            }
        }
        return closestLocation;
    }

    svgElement.addEventListener('click', function(event) {
        var rect = svgElement.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;

        var xRatio = x / rect.width;
        var yRatio = y / rect.height;

        var closestLocation = findClosestLocation(xRatio, yRatio);
        locationResult.innerText = `선택된 위치: ${closestLocation}`;
        console.log('클릭된 좌표 비율:', xRatio, yRatio, '가장 가까운 위치:', closestLocation);
    });

    svgElement.addEventListener('touchstart', function(event) {
        var touch = event.touches[0];
        var rect = svgElement.getBoundingClientRect();
        var x = touch.clientX - rect.left;
        var y = touch.clientY - rect.top;

        var xRatio = x / rect.width;
        var yRatio = y / rect.height;

        var closestLocation = findClosestLocation(xRatio, yRatio);
        locationResult.innerText = `선택된 위치: ${closestLocation}`;
        console.log('터치된 좌표 비율:', xRatio, yRatio, '가장 가까운 위치:', closestLocation);
    });
}

// 함수 실행
initializeSVGInteractions();


function initializeMapClickHandlers() {
    var mapContainer = document.getElementById('map-container');
    var pointerImage = document.getElementById('pointer-img');

    function movePointerImage(x, y) {
        pointerImage.style.left = x + 'px';
        pointerImage.style.top = y + 'px';
        pointerImage.style.display = 'block';
    }

    mapContainer.addEventListener('click', function(event) {
        var rect = mapContainer.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;

        movePointerImage(x, y);
    });

    mapContainer.addEventListener('touchstart', function(event) {
        var touch = event.touches[0];
        var rect = mapContainer.getBoundingClientRect();
        var x = touch.clientX - rect.left;
        var y = touch.clientY - rect.top;

        movePointerImage(x, y);
    });
}

// 함수 실행
initializeMapClickHandlers();