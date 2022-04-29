let destPosition = { x: 1000, y: 1000 };
var jQueryScript = document.createElement('script');  
jQueryScript.setAttribute('src','https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js');
document.head.appendChild(jQueryScript);
function getPixelColor(x, y) {
    return board[y * WIDTH + x]
}

function setPixelColor(setx, sety, setc) {
    x = setx; y = sety; PEN = setc;
    put();
}

function getBoardFromXY(x, y, width, heigh) {
    let board = [];
    for (let i = 0; i < heigh; i++) {
        board[i] = [];
        for (let j = 0; j < width; j++) {
            board[i][j] = getPixelColor(x + j, y + i);
        }
    }
    return board;
}

function diffBoards(source, dest) {
    const diff = [];
    dest.forEach((row, y) => {
        row.forEach((expectedCell, x) => {
            if (expectedCell !== source[y][x]) {
                diff.push({ x, y, expectedCell,currentCell: source[y][x]});
            }
        });
    });
    return diff;
}
function put() {
    if (CD > Date.now()) return
    canvselect.style.background = ''; palette.style.transform = 'translateY(100%)'; colors.children[PEN].classList.remove('sel'); pok.classList.remove('enabled')
    set(Math.floor(x), Math.floor(y), PEN)
    canvselect.children[0].style.display = 'block'; canvselect.style.outline = ''; canvselect.style.boxShadow = ''
    audios.cooldownStart.run()
    CD = Date.now() + (localStorage.vip ? (localStorage.vip[0] == '!' ? 0 : COOLDOWN / 2) : COOLDOWN)
    let a = new DataView(new Uint8Array(6).buffer)
    a.setUint8(0, 4)
    a.setUint32(1, Math.floor(x) + Math.floor(y) * WIDTH)
    a.setUint8(5, PEN)
    console.log(`setting ${Math.floor(x)}, ${Math.floor(y)} to ${PEN}`);
    PEN = -1

    ws.send(a)
}

function doSingle() {
    //const src = getBoardFromXY(destPosition.x, destPosition.y, destBoard[0]?.length || 0, destBoard.length)
    const diff = "";
    $.ajax(
        {url: "https://2204-212-46-38-113.ngrok.io/paint/api.php"
        ,type : "POST"
        ,data:{
            "get":true
        }
        , success: function(result){
    gd = result;
  }}
  );
  const diff = JSON.parse(gd)
    const randomized = diff.sort(() => Math.random() - 0.5)[0];
    if (randomized) {
        setPixelColor(randomized.x + destPosition.x, randomized.y + destPosition.y, randomized.expectedCell);
    }
    console.log(diff.length,"difference changed");
}
setInterval(()=>!onCooldown && doSingle(),2000)
doSingle();
