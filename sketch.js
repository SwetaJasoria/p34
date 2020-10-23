var dog, dogImg, dogImg1;
var database;
var foodS, foodStock;

function preload()
{
   dogImg = loadImage("Dog.png");
   dogImg1 = loadImage("happy dog.png");
}

function setup() 
{
  createCanvas(500, 500);

  database = firebase.database();

  dog = createSprite(250, 300, 150, 150);
  dog.addImage(dogImg);
  dog.scale = 0.15;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
}

function draw() 
{
  background(46,139,87);
 
  if(keyWentDown(UP_ARROW))
  {
    writeStock(foodS);
    dog.addImage(dogImg1);
  }

  drawSprites();

  textSize(20); 
  fill(255,255,254);
  stroke("black");
  text("Food remaining : " + foodS, 170, 200);

  textSize(13);
  text("Note: Press UP_ARROW Key To Feed Drago Milk!", 110, 30);
}

function readStock(data)
{
  foodS = data.val();
}

function writeStock(x)
{
  if(x <= 0)
  {
    x = 0;
  }
  else
  {
    x = x - 1;
  } 

  database.ref('/').update({
    Food: x
  })
}