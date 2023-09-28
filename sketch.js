var states = [
[[100,100,255], function(){return "Click to start."}],
[[255,100,100], function(){return "Click when the screen is green."}],
[[100,100,255], function(){return "Too soon!"}],
[[100,255,100], function(){return "Click!"}],
[[100,100,255], function(time){return "Your reaction time: "+str(time)+" seconds."}]
];

var waitDuration = [3000,10000];

var currentState = 0;
var startTime;
var endTime;
var reactionTime;

function mousePressed() {
  switch (currentState) {
    case 0:
      currentState = 1;
      startTime = millis();
      endTime = startTime+random(waitDuration[0], waitDuration[1]);
      break;
    case 1:
      currentState = 2;
      break;
    case 2:
      currentState = 1;
      startTime = millis();
      endTime = startTime+random(waitDuration[0], waitDuration[1]);
      break;
    case 3:
      currentState = 4;
      reactionTime = round((millis()-endTime)*10)/10000;
      break;
    case 4:
      currentState = 1;
      startTime = millis();
      endTime = startTime+random(waitDuration[0], waitDuration[1]);
      break;
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  if (currentState==1 && millis()>=endTime) {
    currentState = 3;
  }
  let bgCol = states[currentState][0];
  background(bgCol[0], bgCol[1], bgCol[2]);
  noStroke();
  fill(255);
  textSize(40);
  textAlign(CENTER, CENTER);
  text(states[currentState][1](reactionTime), width/2, height/2);
}
