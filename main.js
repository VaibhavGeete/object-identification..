img="";
status="";
Objects=[];


function preload()
{
    img=loadImage("dog_cat.jpg");
}

function setup()
{
    canvas=createCanvas(400,400);
    canvas.center();
    objectDetected=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="indetifying objects";
    video=createCapture(VIDEO);
    video.size(400,400);
    video.hide();
}

function modelLoaded()
{
    console.log("model loaded");
    status=true;
    objectDetected.detect(video,gotResults);
    
}

function gotResults(error,results)
{
    if(error)
    {
        console.log(error);
    }

    console.log(results);
    Objects=results;
}

function draw()
{
    image(video,0,0,400,400);
 if(status!="")
 {
     r=random(255);
     g=random(255);
     b=random(255);

     

     document.getElementById("status").innerHTML="status:object detected";
     for(i=0; i<Objects.length; i++)
     {
         percent=floor(Objects[i].confidence*100);
         fill(r,g,b);
         text(Objects[i].label+" "+percent+"%",Objects[i].x,Objects[i].y);

        noFill();
        stroke(r,g,b);
        rect(Objects[i].x,Objects[i].y,Objects[i].width,Objects[i].height);

  document.getElementById("number_of_objects").innerHTML="number of objects detected:"+Objects.length;    
} 
 }
}