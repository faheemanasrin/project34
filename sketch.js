var dog, happyDog;
var database, foods, foodStock;
var dogimage;


function preload()
{
	dogimage=loadImage("images/dogImg.png")
  happyDog=loadImage("images/dogImg1.png")
}

function setup() {
	createCanvas(500, 500);
  database=firebase.database();
    dog=createSprite(250,300,10,10);
    dog.addImage(dogimage);
    dog.scale=0.2;
  foodStock=database.ref("food");
  foodStock.on("value",readStock);



}


function draw() {  
background(46,139,87);

if(keyWentDown(UP_ARROW)){
  writeStock(foods);
  dog.addImage(happyDog);
}



  drawSprites();
fill("white");
text("PRESS UP_ARROW KEY TO FEED THE DOG",150,10);
textSize(15);
text("food remaining:"+foods,150,80);

}



function readStock(data){
    foods=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }
    database.ref("/").update({
    food:x
  })
}