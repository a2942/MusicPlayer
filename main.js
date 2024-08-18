//helper functions
function $(element) {
    return document.querySelector(element);
}
function log(message) {
    return console.log(message);
}

var logcolor1 = ('background-color: #116622; color: white; border-radius: 4px 0px 0px 4px; padding: 4px;');
var logcolor2 = ('background-color: #005656; color: white; border-radius: 0px 4px 4px 0px; padding: 4px;');

if ('MediaMetadata' in window) {
    // 支持 MediaMetadata API
    var mmda = 0;
    console.log(`%clog:%c浏览器支持媒体控件`, logcolor1, logcolor2);
    console.log(`%clog:%cThe browser supports the MediaMetadata API`, logcolor1, logcolor2);
    console.log(`%clog:%c您可以愉快的使用媒体控件方便的操作此播放器啦！`, logcolor1, logcolor2);
    console.log(`%clog:%cYou can enjoy using the media controls to operate this player conveniently!`, logcolor1, logcolor2);
} else {
    // 不支持 MediaMetadata API
    var mmda = 1;
    console.log(`%clog:%c浏览器不支持媒体控件`, logcolor1, logcolor2);
    console.log(`%clog:%cThe MediaMetadata API is not supported by browsers`, logcolor1, logcolor2);
    console.error('您的浏览器内核已被区别对待，因为不支持媒体控件代码导致妨碍javascript继续运行');
    console.error("Your browser kernel has been treated differently because it doesn't support media control code, which prevents JavaScript from running");
}

//object refrences
const next = $('#next');
const playToggle = $('#play-pause');
const prev = $('#prev');
const volumeslider = $('#volumeslider');
const seekslider = $('#seekslider');
const curtimeText = $('#curtimetext');
const durtimeText = $('#durtimetext');
const playlistStatus = $('#playlist-status');
const title = $('#title');
var background = document.querySelector(".background");

var ImgGet = 0 ;
console.log("你可以'ImgGet = 0/1'来切换图像加载模式，为了保证流畅性，默认为0");
console.log("You can 'ImgGet = 0/1' to toggle the image loading mode, which is set to 0 by default for smoothness");
// 提前设定图像资源的 URL
// Set the URL of the image resource in advance
const imageUrl = 'http://a2942.net:5902/tp/1-1/';
// Base64 编码的感叹号图像
// Base64-encoded exclamation point image
const fallbackImageBase64 = 'data:image/png;base64,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';
// 此图像不存在版权问题，因为此图像是由我构建而成，且图像分发是自由的，您无需担心因此受到法律风险
// There are no copyright issues with this image because it was built by me and the image distribution is free, so you don't have to worry about legal risks

//audio object
let audio = new Audio();
let dir = "./sounds/";
let ext = "";
let playlist_index = 0;
audio.src = dir + playlist[playlist_index] + ext;

//play or pause music
function PlayPause() {
    playToggle.classList.toggle("fa-pause-circle");
    if (!audio.paused) {
        audio.pause();

        if ( mmda = 0 ) {navigator.mediaSession.playbackState = 'paused';}
    }
    else {
        audio.play();

        if ( mmda = 0 ) {navigator.mediaSession.playbackState = 'playing';}
    }
}
playToggle.addEventListener('click', PlayPause);
if ( mmda = 0 ) {
    navigator.mediaSession.setActionHandler('play', PlayPause);
    navigator.mediaSession.setActionHandler('pause', PlayPause);
}

//manual seeking
seekslider.addEventListener('input', () => {
    audio.currentTime = audio.duration * (seekslider.value / 100);
})
//volume control
function setVolume() {
    audio.volume = volumeslider.value / 100;
}
setVolume();
volumeslider.addEventListener('input', setVolume);

//updating seektime duration
function seekTimeUpdate() {
    const newTime = audio.currentTime * (100 / audio.duration);
    seekslider.value = newTime;

    //generating current time and song duration
    var curmin = Math.floor(audio.currentTime / 60);
    var cursec = Math.floor(audio.currentTime - (curmin * 60));
    var durmin = Math.floor(audio.duration / 60);
    var dursec = Math.floor(audio.duration - (durmin * 60));

    //adding zero if less than 10
    curmin = (curmin < 10) ? "0" + curmin : curmin;
    cursec = (cursec < 10) ? "0" + cursec : cursec;
    durmin = (durmin < 10) ? "0" + durmin : durmin;
    dursec = (dursec < 10) ? "0" + dursec : dursec;

    //populating time box
    curtimeText.textContent = curmin + ":" + cursec;
    durtimeText.textContent = durmin + ":" + dursec;

    //displaying playlist status
    playlistStatus.textContent = /*dir + */playlist[playlist_index]/* + ext */;
    title.textContent = playlist[playlist_index] + "- Music Player" ;

}
audio.addEventListener('timeupdate', seekTimeUpdate);


//autoplay song when ends
function playAudio() {
    audio.src = dir + playlist[playlist_index] + ext;
    audio.currentTime = 0;
    audio.play();
    // 开始处理图像
    processImage();
}
function autoPlay() {

    if (playlist_index == (playlist.length - 1)) {
        playlist_index = 0;
        playAudio();
    }
    else {
        playlist_index++;
        playAudio();
    }
}
audio.addEventListener('ended', autoPlay);

//check playing or not and add class to it play/pause
function checkPlayPause() {
    if (audio.paused) {
        playToggle.classList.toggle("fa-pause-circle");
    }
}



//changing songs next and prev

//on next
function nextSong() {
    checkPlayPause();
    if (playlist_index == (playlist.length - 1)) {
        playlist_index = 0;
        playAudio();
    }
    else {
        playlist_index++;
        playAudio();
    }
}
next.addEventListener('click', nextSong);
if ( mmda = 0 ) { navigator.mediaSession.setActionHandler('nexttrack', nextSong); }

//on prev
var count = playlist.length;
function prevSong() {
    checkPlayPause();
    if (playlist_index == 0) {
        playAudio();
    }
    else {
        playlist_index--;
        playAudio();
    }
}
prev.addEventListener('click', prevSong);
if ( mmda = 0 ) { navigator.mediaSession.setActionHandler('previoustrack', prevSong); }

VerlyRange("seekslider", "#655ecf");
VerlyRange("volumeslider", "#eb3992");


function VerlyRange(id, color) {
    let DOMSlider = document.getElementById(id);
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    let width = DOMSlider.scrollWidth;
    let height = width / 2;
    canvas.width = width;
    canvas.height = height;
    canvas.style.pointerEvents = 'none';
    canvas.style.transform = 'translate(0, -15px)';
    DOMSlider.parentElement.appendChild(canvas);

    const gravity = new Vector(0, 0.3);

    // iteration, canvas, ctx
    let verly = new Verly(50, canvas, ctx);
    let rope = generateRope();

    // generic function to apply reset of rope when resizing
    function generateRope() {
        let rope = verly.createRope(0, 0, width / 20, 17, 0);
        let lastIndex = rope.points.length - 1;
        // rope extra tweaks
        rope.setGravity(gravity);
        rope.pin(lastIndex);

        // overwrite render function
        rope.renderSticks = () => {
            for (let i = 0; i < rope.sticks.length; i++) {
                let stick = rope.sticks[i];
                ctx.beginPath();
                ctx.strokeStyle = color;
                ctx.lineWidth = 10;
                ctx.lineCap = 'round';
                ctx.moveTo(stick.startPoint.pos.x, stick.startPoint.pos.y);
                ctx.lineTo(stick.endPoint.pos.x, stick.endPoint.pos.y);
                ctx.stroke();
                ctx.closePath();
            }
        }
        return rope;
    }

    // handle resize 
    window.addEventListener('resize', function () {
        width = DOMSlider.scrollWidth
        height = width / 2;
        canvas.width = verly.WIDTH = width;
        canvas.height = verly.HEIGHT = height;

        rope = generateRope();

        setRopePosition();
    });

    // rope end point position
    function setRopePosition() {
        let ratio = (DOMSlider.value - DOMSlider.min) / (DOMSlider.max - DOMSlider.min);
        // floating point correction
        if (ratio < 0.5) ratio += 0.01;
        if (ratio < 0.3) ratio += 0.01;
        if (ratio > 0.6) ratio -= 0.01;
        if (ratio > 0.8) ratio -= 0.02;
        rope.points[rope.points.length - 1].pos.x = (ratio * width);
    }
    setRopePosition();
    DOMSlider.addEventListener('input', setRopePosition);

    function animate() {
        ctx.clearRect(0, 0, width, height);

        verly.update();
        rope.renderSticks();
        setRopePosition();
        requestAnimationFrame(animate);
    }
    animate();
}

// 用于下载图像并将其转换为 Base64
function downloadImageAndConvertToBase64(imageUrl) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous'; // 处理跨域问题
        
        img.onload = () => {
            // 创建画布
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            
            // 绘制图像到画布
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            
            // 将图像转换为 Base64 编码
            const base64Image = canvas.toDataURL('image/png');
            resolve(base64Image);
        };
        
        img.onerror = () => {
            // console.error('Failed to load image:', imageUrl);
            // 返回备用的 Base64 图像
            resolve(fallbackImageBase64);
        };
        
        img.src = imageUrl; // 开始加载图像
    });
}
// 使用下载的图像处理其他操作
async function processImage() {
    try {
        if (ImgGet != 0){
            base64Image = await downloadImageAndConvertToBase64(imageUrl);
        } else {
            base64Image = imageUrl + "?" + Date.now();
        }
        // 设置背景图像为转换后的 Base64
        background.style.backgroundImage = `url(${base64Image})`;
        background.style.backgroundRepeat = 'no-repeat';
        background.style.backgroundSize = 'cover';
        
        // 在这里可以将 Base64 数据传递给其他处理函数
        // console.log('Downloaded Base64 Image:', base64Image);
        
        // 如果需要与 Media Session 交互
        if ('mediaSession' in navigator) {
            navigator.mediaSession.metadata = new MediaMetadata({
                title: playlist[playlist_index],
                artist: playlist[playlist_index],
                album: playlist[playlist_index],
                artwork: [
                    { src: base64Image, sizes: '300x300', type: 'image/png' }
                ]
            });
        }
    } catch (error) {
        console.error('Error processing image:', error);
    }
}
// 开始处理图像
processImage();
