Webcam.set({
    width: 350,
    height: 300,
    dest_width: 400,
    dest_height: 310,
    image_format: 'png',
    png_quality: 90
});

Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML="<img id='capturedimage' src="+data_uri+">";
    });
}
console.log("ml5 version: ", ml5.version);

classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/r3VF2I0MT/model.json',modelLoaded);

function modelLoaded(){
    console.log("model is loaded");
}

function speak(){
    var synth=window.speechSynthesis;
    speak_data_1="The first prediction is "+prediction_1;
    speak_data_2="And the second prediction is "+prediction_2;
    var utterThis=new SpeechSynthesisUtterance(speak_data_1,speak_data_2);
    synth.speak(utterThis);
}

function identify_gesture(){
    img=document.getElementById("capturedimage");
    classifier.classify(img,gotresult);
}

function gotresult(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        document.getElementById("result_gesture_name").innerHTML=results[0].label;
        document.getElementById("result_gesture_name2").innerHTML=results[1].label;
        prediction_1=results[0].label;
        prediction_2=results[1].label;
        speak();
        if(results[0].label=="Ok sign"){
            document.getElementById("update_gesture").innerHTML="&#128076;";
        }
        if(results[0].label=="Thumbs up sign"){
            document.getElementById("update_gesture").innerHTML="&#128077;";
        }
        if(results[0].label=="Victory sign"){
            document.getElementById("update_gesture").innerHTML="&#9996;";
        }
        if(results[0].label=="Fist sign"){
            document.getElementById("update_gesture").innerHTML="&#9994;";
        }
        if(results[0].label=="Clap sign"){
            document.getElementById("update_gesture").innerHTML="&#128079;";
        }
        if(results[0].label=="Yo sign"){
            document.getElementById("update_gesture").innerHTML="&#129304;";
        }
    }
    if(results[1].label=="Ok sign"){
        document.getElementById("update_gesture2").innerHTML="&#128076;";
    }
    if(results[1].label=="Thumbs up sign"){
        document.getElementById("update_gesture2").innerHTML="&#128077;";
    }
    if(results[1].label=="Victory sign"){
        document.getElementById("update_gesture2").innerHTML="&&#9996;";
    }
    if(results[1].label=="Fist sign"){
        document.getElementById("update_gesture2").innerHTML="&#9994;";
    }
    if(results[1].label=="Clap sign"){
        document.getElementById("update_gesture2").innerHTML="&#128079;";
    }
    if(results[1].label=="Yo sign"){
        document.getElementById("update_gesture2").innerHTML="&#129304;";
    }
}