const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const backgroundImage = new Image();
backgroundImage.src = "https://ul.h3z.jp/yH2Lgr64.png"; // 背景画像のパス

const moveImage = new Image();
moveImage.src = "https://ul.h3z.jp/dJnme7sk.png"; // 動かす画像のパス

// 8つの動かす画像の初期位置を細かく設定
const imageObjects = [
  { x: 315, y: 62, width: 0, height: 0 },
  { x: 225, y: 98, width: 0, height: 0 },
  { x: 165, y: 190, width: 0, height: 0 },
  { x: 165, y: 300, width: 0, height: 0 },
  { x: 320, y: 380, width: 0, height: 0 },
  { x: 320, y: 465, width: 0, height: 0 },
  { x: 382, y: 242, width: 0, height: 0 },
  { x: 498, y: 242, width: 0, height: 0 },
];

let isDragging = false;

// 背景画像の読み込み後に中央配置（サイズ変更なし）
backgroundImage.onload = () => {
  backgroundImage.x = (canvas.width - backgroundImage.width) / 2;
  backgroundImage.y = (canvas.height - backgroundImage.height) / 2;
  backgroundImage.width = canvas.width;
  backgroundImage.height = canvas.height;
  draw();
};

moveImage.onload = () => {
  const aspectRatio = moveImage.width / moveImage.height;
  const newWidth = moveImage.width;
  const newHeight = newWidth / aspectRatio;

  imageObjects.forEach(img => {
    img.width = newWidth;
    img.height = newHeight;
  });

  draw();
};

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(backgroundImage, backgroundImage.x, backgroundImage.y, backgroundImage.width, backgroundImage.height);
  imageObjects.forEach(img => {
    ctx.drawImage(moveImage, img.x, img.y, img.width, img.height);
  });
}

canvas.addEventListener("mousedown", startDrag);
canvas.addEventListener("mousemove", drag);
canvas.addEventListener("mouseup", endDrag);

function startDrag(e) {
  e.preventDefault();
  const { clientX, clientY } = e;
  const offsetX = clientX - canvas.offsetLeft;
  const offsetY = clientY - canvas.offsetTop;

  imageObjects.forEach((img) => {
    if (offsetX >= img.x && offsetX <= img.x + img.width &&
        offsetY >= img.y && offsetY <= img.y + img.height) {
      isDragging = img;
    }
  });
}

function drag(e) {
  e.preventDefault();
  if (isDragging) {
    const { clientX, clientY } = e;
    const offsetX = clientX - canvas.offsetLeft;
    const offsetY = clientY - canvas.offsetTop;
    isDragging.x = offsetX - isDragging.width / 2;
    isDragging.y = offsetY - isDragging.height / 2;
    draw();
  }
}

function endDrag() {
  isDragging = false;
}
