let result1=[];
let result2=[];
let result3="";

const API_KEY = '301ce55e90da3e3956f6c8a5c9eb2281';  // 여기에 실제 API 키를 입력하세요
// 건물 위치 데이터
const buildings = [
    { name: "공과대학", lat: 37.246415, lon: 127.080799 },
    { name: "외국어대학", lat: 37.245248, lon: 127.077722 },
    { name: "체육대학", lat: 37.244354, lon: 127.080590 },
    { name: "국제대학", lat: 37.239753, lon: 127.081330 },
    { name: "전자정보대학", lat: 37.239705, lon: 127.083443 },
    { name: "예술디자인대학", lat: 37.241546, lon: 127.084500 }
];

// 두 좌표 간의 거리를 계산하는 함수 (Haversine formula 사용)
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // 지구의 반경 (킬로미터 단위)
    var dLat = deg2rad(lat2 - lat1); 
    var dLon = deg2rad(lon2 - lon1); 
    var a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
    var distance = R * c; // 거리 (킬로미터 단위)
    return distance;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

// 가장 가까운 건물을 찾기
function success(latitude, longitude) {
    let closestBuilding = null;
    let shortestDistance = Number.MAX_VALUE;

    buildings.forEach(building => {
        let distance = getDistanceFromLatLonInKm(latitude, longitude, building.lat, building.lon);
        if (distance < shortestDistance) {
            shortestDistance = distance;
            closestBuilding = building;
        }
    });

    return  closestBuilding.name;
}


function getCurrentLocation() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    const closestBuilding = success(latitude, longitude);
                    resolve([latitude, longitude, closestBuilding]);
                },
                () => {
                    reject("Unable to retrieve your location.");
                }
            );
        } else {
            reject("Geolocation is not supported by this browser.");
        }
    });
}




function getWeather(lat, lon) {
    return new Promise((resolve, reject) => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
        .then(res => res.json())
        .then(data => {
            const name = data.name;
            const temp = data.main.temp;
            const weathers = data.weather[data.weather.length - 1];
            resolve([name, temp, weathers.main]);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            reject(error);
        });
    });
}

// HTML 요소 참조
const displayElement = document.getElementById('display');  // 이 줄에서 display 요소에 접근합니다


// 타이핑 효과 함수
function typeEffect(text, callback) {
    let index = 0;
    function type() {
        if (index < text.length) {
            displayElement.textContent += text[index];
            index++;
            setTimeout(type, 50); // 더 빠르게 타이핑
        } else {
            setTimeout(callback, 10000); // 5초 이상 대기
        }
    }
    type();
}

// 문구 지우기 효과
function deleteEffect(callback) {
    function deleteText() {
        if (displayElement.textContent.length > 0) {
            displayElement.textContent = displayElement.textContent.slice(0, -1);
            setTimeout(deleteText, 25); // 더 빠르게 지우기
        } else {
            setTimeout(callback, 500); // 지운 후 0.5초 대기
        }
    }
    deleteText();
}

// 애니메이션 함수
function animateText() {
    let index = 0;

    function loop() {
        // 업데이트된 result1과 result2을 참조하여 텍스트 배열 생성
        const textArray = [
            `${result1[0]}, ${result1[1]}°C, ${result1[2]}    `,
            `${result2[0]}, ${result2[1]}°C, ${result2[2]}    `
        ];

        typeEffect(textArray[index], () => {
            deleteEffect(() => {
                index = (index + 1) % textArray.length;
                loop();
            });
        });
    }

    loop();
}


// 경희대 고정
getWeather(37.243299, 127.079566)
    .then(fixed_weatherData => {
        fixed_weatherData[0]="경희대학교";
        console.log("Weather data array:", fixed_weatherData);
        result1=fixed_weatherData;
    })
    .catch(error => {
        console.error("Error:", error);
    });



// 사용 예시
getCurrentLocation()
    .then(location => {
        console.log("Location array:", location);
        result3=location[2];
        var init_locationResult = document.getElementById('location-result');
        init_locationResult.innerText = `선택된 위치: ${result3}`;
        getWeather(location[0], location[1])
            .then(weatherData => {
                console.log("Weather data array:", weatherData);
                result2=weatherData;
                animateText();
            })
            .catch(error => {
                console.error("Error:", error);
            });
    })
    .catch(error => {
        console.error(error);
    });

// 초기 데이터 업데이트 및 주기적 업데이트 설정
