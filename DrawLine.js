$(document).ready(function () {
    var canvas = document.querySelector('#paint');
    var ctx = canvas.getContext('2d');

    /* draw backgound image */
    var img = new Image();
    img.onload = function () {
        // Draw image.
        //ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
    img.src = "drawline.png";

    /* Drawing on Paint App */
    ctx.lineWidth = 5;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'blue';
    ctx.fillStyle = 'blue';

    /*draw button*/
    $("#draw").bind("click", function () {
        ctx.globalCompositeOperation = 'source-over';
    });

    /*erase button*/
    $("#erase").bind("click", function () {
        ctx.globalCompositeOperation = 'destination-out';
    });

    //是否支持触摸
    var touchable = 'createTouch' in document;
    if (touchable) {
        canvas.addEventListener('touchstart', onTouchStart, false);
        canvas.addEventListener('touchmove', onTouchMove, false);
    }
    else {
        alert("you web blowser cannot support touch !");
    }


    //上一次触摸坐标
    var lastX;
    var lastY;

    //ctx.lineWidth = 10;//画笔粗细
    //ctx.strokeStyle = "#FF0000";//画笔颜色

    //触摸开始事件
    function onTouchStart(event) {
        event.preventDefault();
        lastX = event.touches[0].pageX - event.currentTarget.offsetLeft;
        lastY = event.touches[0].pageY - event.currentTarget.offsetTop;
        drawRound(lastX, lastY);

    }


    //触摸滑动事件
    function onTouchMove(event) {
        try {
            event.preventDefault();
            drawLine(lastX, lastY, event.touches[0].pageX - event.currentTarget.offsetLeft, event.touches[0].pageY - event.currentTarget.offsetTop);
            lastX = event.touches[0].pageX - event.currentTarget.offsetLeft;
            lastY = event.touches[0].pageY - event.currentTarget.offsetTop;
        }
        catch (err) {
            alert(err.description);
        }

    }

    function getActualPointFromEvent(event) {
        var target = event.currentTarget;

    }

    function getElementOffset(element){
        var t = $(element).offset();
        if (t) {
            if (!isNaN(document.body.clientTop)) {
                t.top += document.body.clientTop;
            }
            if (!isNaN(document.body.clientLeft)) {
                t.left += document.body.clientLeft;
            }
        }
        else {
            t = { top: 0, left: 0 };
        }
        return t;
    }

    //画圆
    function drawRound(x, y) {
        if (isInBoard(x,y)) {
            //ctx.fillStyle = "#FF0000";
            ctx.beginPath();
            ctx.arc(x, y, 2.5, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();
        }
    }
    //画线
    function drawLine(startX, startY, endX, endY) {
        if (isInBoard(endX, endY)) {
            ctx.beginPath();
            //ctx.lineCap = "round";
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.stroke();
        }
    }

    function isInBoard(x, y) {
        //console.info("x:" + x + " y:" + y);
        //return true;
        return ((x > 50) && (x < 420) && (y > 300) && (y < 580));
    }
});