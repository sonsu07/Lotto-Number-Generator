// 배열 중복 검사
function isDuplicate(arr) {
    arr.some(function(x) {
        return arr.indexOf(x) !== arr.lastIndexOf(x);
    });
}

// 순방향 정렬
function compare(a, b) {
    return a - b;
}

// 클립보드에 복사
function copyToClipboard(arr) {
    navigator.clipboard.writeText(arr)
        .then(() => {
            console.log('Arr copied to clipboard...');
        })
        .catch(() => {
            console.log('Something went wrong');
        });
}

// copy 버튼 클릭
function copyBtnOnClick(arr) {
    document.querySelector('.copy-btn').addEventListener('click', e => {
        copyToClipboard(arr)
    })
}

// 1 ~ 45 까지의 수를 담은 리스트 생성
function createNumList() {
    const numList = [];
    for (let i = 1; i <=45; i++) {
        numList.push(i);
    }
    return numList; // [ 1 ~ 45 ]
}

// 로또 번호 생성
function createLottoArr() {
    const numList = createNumList(); // 1 ~ 45까지의 수를 담은 리스트 변수화.
    const result = []; // 중복 제거 전
    let resultDelDup = []; // 중복 제거

    let randomNum = null;
    let num = null;
    for (let i = 0; i < 12; i++) {
        randomNum = Math.floor(Math.random() * numList.length); // 1 ~ 45까지의 랜덤숫자 생성
        num = numList[randomNum]; // 1 ~ 45까지의 수를 담은 배열에서 랜덤숫자를 가져옴.
        result.push(num) // 중복 제거 전 배열에 삽입.
        resultDelDup = [...new Set(result)]; // 배열 중복 제거

        // 중복이 나와서 배열 길이가 줄어들더라도 총 길이가 6이 되도록.
        // 그리고 정렬하여 리턴
        if (resultDelDup.length === 6) return resultDelDup.sort(compare);
    }
}


//  로또 번호 출력
function printLottoNum() {
    let myLotto = createLottoArr();
    for (let i = 0; i < myLotto.length; i++) { // createLottoArr 함수에서 리턴된 배열의 길이만큼 반복
        window.localStorage.setItem(`key${i}`, myLotto[i]); // 로컬 스토리지에 리턴된 배열을 하나씩 저장
    }

    const arr = []; // 클립보드 배열
    for (let i = 0; i < 6; i++) {
        let lottoNum = window.localStorage.getItem(`key${i}`); // 로컬스토리지에서 배열 요소 추출

        let lottoBall = document.querySelectorAll('.lottoBall');
        lottoBall[i].querySelector('p').innerHTML = lottoNum; // 볼 그림에 출력

        // 숫자 카피란에 출력력
        let textCopy = document.querySelector('.text-copy').querySelectorAll('p');
       textCopy[i].innerHTML = lottoNum;

       // 클립보드 배열에 삽입
         arr.push(lottoNum);
    }

    copyBtnOnClick(arr); // copy 버튼 클릭시 클립보드에 복사
}

// 추천번호 클릭시 로또번호 재출력버튼
function reloadBtn() {
    localStorage.clear(); // 로컬스토리지 초기화
    let reloadBtn = document.querySelector('.reload');
    reloadBtn.addEventListener('click', e => {
        return printLottoNum();
    })
}

printLottoNum();
reloadBtn();


