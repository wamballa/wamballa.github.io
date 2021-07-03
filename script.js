var mode = 'clock';
var countDownTime = '2020-07-19T00:00:00';
var burnProtect = 1;

var lastmode = '';
var lastWidth;
var lastHour;

function showTime() {
    var timer = 1000;

    // Just hardcode a future date for testing

    var now = new Date();
    var ms = now.getMilliseconds();

    if (mode != lastmode) {
        lastmode = mode;
        lastViewWidth = 0;
    }

    if (mode == 'clock') {

        var h = now.getHours();
        //h = getLocalHour(h);
        var m = now.getMinutes();
        var s = now.getSeconds();

        h = (h < 10) ? "0" + h : h;
        m = (m < 10) ? "0" + m : m;
        s = (s < 10) ? "0" + s : s;
        //if (burnProtect) {
        //    var offset = Math.sin(m / 60 * 2 * Math.PI) * 6 + 47;
            //$('#TextContainer').css('top', offset + '%');
        //}
    }
    
    document.getElementById("hour").innerText = h;
    document.getElementById("min").innerText = m;
    document.getElementById("sec").innerText = s;

    // Trying to do something clever here to ensure we update the time roughly within
    // 100ms of the turn of the second

    if (ms < 990) {
        timer = 1000 - ms;
    }
    else {
        timer = 10;
    }

    setTimeout(showTime, timer);
    resizeText();
}

function getLocalHour( h ){

    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (timezone == "Europe/Zurich"){
        return h;
    }
    if (timezone == "Europe/London"){
        return h;
    }

}

function resizeText() {
    
    var viewWidth = document.getElementById("TextContainer").offsetWidth;

    if (viewWidth == lastWidth)
    {
        return;
    }
    lastWidth = viewWidth;

    let textSize = document.getElementById("TextCell").offsetWidth;
    let textWidth = window.getComputedStyle(document.documentElement).getPropertyValue('font-size');

    //textSize = textSize.substring(0,)

    console.log("viewWidth  = "+viewWidth);
    console.log("textSize  = "+textSize);
    console.log("textWidth = "+textWidth);
    // let temp = viewWidth - parseInt(textWidth,10);
    // console.log("viewWidth - textWidth = "+temp );

    if (Math.abs(viewWidth - parseInt(textWidth,10)) / viewWidth > 0.1) {
    
        console.log("Resize");
        let newTextSize = viewWidth / parseInt(textWidth,10) * textSize * 0.02;

        document.documentElement.style.setProperty('font-size', newTextSize + 'px');
        // document.documentElement.style.setProperty('visibility', 'visible');
    }

    
    /*
    var viewWidth = $('#TextContainer').width();

    if (viewWidth == lastViewWidth) {
        return;
    }

    lastViewWidth = viewWidth;

    var textSize = $('#TextCell').css('font-size');
    var textWidth = $('#TextCell').width();
    textSize = textSize.substring(0, textSize.length - 2);

    if (Math.abs(viewWidth - textWidth) / viewWidth > 0.1) {
        var newTextSize = viewWidth / textWidth * textSize * 0.95;
        $('#TextCell').css('font-size', newTextSize + 'px');
        $('#TextCell').css('visibility', 'visible');
    }
    */
}
