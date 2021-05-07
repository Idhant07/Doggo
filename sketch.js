//Create variables here
var dog, happyDog, database, foodS, foodStock;
var sedDoge;

function preload()
{
	happyDog = loadImage("images/dogImg1.png")
  sedDoge = loadImage("images/dogImg.png")
}

function setup() {
	createCanvas(800, 700);
  database = firebase.database()

  dog = createSprite(400, 350, 100, 100)
  dog.addImage(sedDoge)
  dog.scale = 0.5
  foodStock = database.ref('Food')
  foodStock.on('value', readStock)
}


function draw() {  
  
  background(46, 139, 87)


  if(keyWentDown(UP_ARROW)){
   writeStock(foodS)
   dog.addImage(happyDog)
  }

  drawSprites();
  //add styles here
 fill("black")
 textSize(20)
 text("Note: Press UP Arrow Key to feed Drago Milk", 200, 50)
 text("Food Remaining:"+ foodS, 300, 150)
}

function readStock(data){

foodS = data.val()
}

function writeStock(x){
  if(x<=0){
  x = 0
  }
  else{
    x = x - 1
  }
  database.ref('/').update({
    Food: x
  })
}

