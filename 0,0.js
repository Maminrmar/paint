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
    /*const src = getBoardFromXY(
        destPosition.x,
        destPosition.y,
        destBoard[0]?.length || 0,
        destBoard.length
    );*/
    //const diff = diffBoards(src, destBoard);
    const df="";

    $.ajax(
{
         url: "https://2204-212-46-38-113.ngrok.io/paint/api.php"
        ,type : "POST"
        ,data:{
            "get":true
        }
        , success: function(result){
            df=result;
        }
    }
);    
    const diff = JSON.parse(diff);
    const randomized = df.sort(() => Math.random() - 0.5)[0];

    if (randomized) {
        showDialog(
            `${diff.length} differences ramaining<br> setting (${
                randomized.x + destPosition.x
            } , ${
                randomized.y + destPosition.y
            }) to <span style="width:10px;height:10px; border:1px solid #222222;background-color:${RGBToHtmlColor(
                rplaceHexToRGB(PALETTE[randomized.expectedCell])
            )};display:inline-block"></span>`
        );

        console.log(`${diff.length} differences changed`);
        console.log(
            `setting (${randomized.x + destPosition.x} , ${
                randomized.y + destPosition.y
            }) to ${randomized.expectedCell}`
        );

        setPixelColor(
            randomized.x + destPosition.x,
            randomized.y + destPosition.y,
            randomized.expectedCell
        );
    } else {
        showDialog("All Done! protecting...");
    }
}
function RGBToHtmlColor(rgb) {
    return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.alpha / 255})`;
}
function rplaceHexToRGB(hexColor) {
    return {
        alpha: (hexColor >> 24) & 0xff,
        b: (hexColor >> 16) & 0xff,
        g: (hexColor >> 8) & 0xff,
        r: (hexColor >> 0) & 0xff,
    };
}
function showDialog(text) {
    const dialog = document.createElement("div");
    dialog.style.position = "fixed";
    dialog.style.top = "10px";
    dialog.style.left = "10px";
    dialog.style.width = "200px";
    dialog.style.background = "rgba(0,0,0,0.8)";
    dialog.style.color = "white";
    dialog.style.fontSize = "14px";
    dialog.style.textAlign = "center";
    dialog.style.padding = "10px";
    dialog.style.borderRadius = "10px";
    dialog.style.boxShadow = "0px 0px 10px black";
    dialog.style.zIndex = "30";
    dialog.innerHTML = text;
    document.body.appendChild(dialog);
    setTimeout(() => {
        document.body.removeChild(dialog);
    }, 8000);
}
setInterval(() => !onCooldown && doSingle(), 2000);
doSingle();
