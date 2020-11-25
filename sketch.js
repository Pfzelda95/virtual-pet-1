var database;
var dog, dogHappy;
var footStock, foodS;
var dog;

function preload(){
  dogImg = loadImage("sprites/Dog.png");
  dogHappyImg = loadImage("sprites/happyDog.png");
  }

function setup(){
  database = firebase.database();
  console.log(database);
  createCanvas(1500,999);
  dog = createSprite(500,400,0.005,0.0005);
  
  dog.addImage(dogImg)
  
  foodStock = database.ref('food');
  foodStock.on("value",readStock);
 

 }

function draw(){
      background(46,139,87);
      if(keyDown(UP_ARROW)){
        writeStock(foodS);
        dog.addImage(dogHappyImg)
      }  
     drawSprites();
     textStyle("BOLD")
     textSize(50); 
     text(foodS+" pieces of meat are left",1000,400);
     
}

function readStock(data) {
  foodS = data.val();
}

function writeStock(x) {
  if(x<=0){
    x = 0;
    dog.addImage(dogImg)
  }
  else{
    x = x-1;
  }
  database.ref('/').update({
    food : x
  })
}
