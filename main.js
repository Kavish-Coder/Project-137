status="";

objects=[];
function setup() {
    canvas=createCanvas(380,320);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,320);
    video.hide();
}

function draw() {
    image(video,0, 0, 480, 380);
    if(status != "") {
        objectDetector.detect(video, gotResult);
        r=random(255);
        g=random(255);
        b=random(255);
        for(i=0; i<objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            document.getElementById("number_of_objects").innerHTML = "The Number Of Objects Detected Are: " + objects.length;
            fill(r, g, b);
            percent=floor(objects[i].confidence*100);
            text(objects[i].label + " " + percent + "%", objects[i].x+15, objects[i].y+15);
            noFill();
            stroke(g, r, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height); 
        }
    }
}

function start() {
    objectDetector=ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    input_value=document.getElementById("object").value;
}

function modelLoaded() {
    console.log("Model Loaded!");
    status=true;
}

function gotResult(error, results) {
    if(error) {
        console.log(error);
    }
    console.log(results);
    objects=results;
}