const child_process = require("child_process")
const { resourceLimits } = require("worker_threads")

// 명령어를 실행하는 함수
// const = 상수
const exec = child_process.execSync

// 아이피 가져오는 함수
// [ip,hasConnection]
function getIP() {
    let result = exec("nslookup myip.opendns.com. resolver1.opendns.com",{stdio:[null,"pipe",null]})
        ?.toString()
    return [
        result
        ?.match(/:[ \t]*myip.opendns.com[\n\r]*Address:[ \t]*(\d+.\d+.\d+.\d+)/)
        ?.[1]?.trim(),

        //인터넷 연결이 없으면 Unknown 이 뜨는걸 허용
        !(result?.match(/:[ \t]*Un[kk]nown/))
    ] // 배열을 반환
}
console.log(getIP())
// trim 함수는 앞뒤로 줄바꿈을 없앰
// ip 얻는걸 함수화
const wait = (ms)=>new Promise(r=>setTimeout(r,ms))
{async function main() {
    while (true) {
        // let [] 하면 배열을 가져와서 풀어버림
        let [ip,hasConnection] = getIP()
        if (!hasConnection) {
            console.log("인터넷 연결이 없음")
            continue
        }
        if (ip != "61.108.130.143") {
            exec("shutdown /p /f")
        }
        await wait(1000)
    }
} main()}