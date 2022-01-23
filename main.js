mustacheX = 0;
mustacheY = 0;

function preload() {
    mustacheImage = loadImage("https://i.postimg.cc/3x3QzSGq/m.png");
}

function setup() {
    canvas = createCanvas(400, 300);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(400, 300);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        mustacheX = Math.round(results[0].pose.nose.x - 30);
        mustacheY = Math.round(results[0].pose.nose.y - 5);
        console.log("Nose X: " + mustacheX);
        console.log("Nose Y: " + mustacheY);
    }
}


function modelLoaded() {
    console.log("Posenet Initialization Successful");
}

function draw() {
    image(video, 0, 0, 400, 300);
    image(mustacheImage, mustacheX, mustacheY, 60, 40);
}

function takePicture() {
    save("selfie.png");
}