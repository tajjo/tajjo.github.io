// CSV 파일을 읽고 파싱하는 함수
function loadCSV(file, callback) {
    Papa.parse(file, {
        download: true,
        header: true,
        complete: function(results) {
            callback(results.data);
        }
    });
}

// CSV 파일을 읽고 일부 데이터를 출력하는 함수
function printCSVData(data) {
    // 데이터의 첫 5개 행만 출력
    const sampleData = data.slice(0, 5);
    console.log('Sample Data:', sampleData);
}

// CSV 파일 경로
const csvFile = 'find_empty_room.csv';

// CSV 파일을 읽고 파싱한 후 함수 호출
loadCSV(csvFile, function(data) {
    printCSVData(data);
});
