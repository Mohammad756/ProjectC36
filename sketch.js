var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feedTheDog;
var feed;
var lastFed=1;
//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  feedTheDog=createButton("Feed The Dog");
  feedTheDog.position(700,95);
  feedTheDog.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  
 
  //write code to display text lastFed time here
  fill(255);
  textSize(20);

  if(lastFed>=12){
  text("Last Feed : "+lastFed,350,30);
  }else{
    text("Last Feed : 12 AM",300,30)
  }
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
  var feedRef = database.ref("/");
  foodS--;
  hour(lastFed);
  feedRef.update({
    feedTime : lastFed,
    Food:foodS
  })
  

}

//function to add food in stock
function addFoods(){
  foodS++;

  database.ref('/').update({
    Food:foodS
  })
}

function readLastFeed(){
  var lastRef=database.ref("/");
  lastRef.on("value",function(data){
    lastFed=data.val();
  });
}
