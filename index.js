const gameInfo=document.querySelector(".gameInfo");
const boxes=document.querySelectorAll(".box");
const gamebtn=document.querySelector(".btn");

let currentPlayer;
let gameGrid;
// array for store of winning position
const winningPosition=[
 [0,1,2],
 [3,4,5],
 [6,7,8],
 [0,3,6],
 [1,4,7],
 [2,5,8],
 [0,4,8],
 [2,4,6]
];

function CheckGameOver(){
  //winning position
  let answer="";
  winningPosition.forEach((position)=>{
    // all box should be non0empty and exactly same in value
    if((gameGrid[position[0]] !=="" || gameGrid[position[1]]!="" || gameGrid[position[2]]!="") 
    &&(gameGrid[position[0]]===gameGrid[position[1]])&& (gameGrid[position[1]]===gameGrid[position[2]])) {

         //check if winner is x
         if(gameGrid[position[0]]==="X")
            answer="X";
        else
            answer="0";

            boxes.forEach((box)=>{
                
              box.style.pointerEvents="none";
            })

            // we have a winner X OR 0 IS WINNER
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
    }
  });

//   now we have a winner
if(answer!=""){
    gameInfo.innerText=`Winner Player - ${answer}`;
      gamebtn.classList.add("active");
    return;
}


// when there is no winner then is tie
let fillcount=0;
gameGrid.forEach((box)=>{
    if(box!=="")
       fillcount++;
});

// board is filler, game is tie
if(fillcount===9){
    gameInfo.innerText= "Game Tied !";
    gamebtn.classList.add("active");
}



}
function swapturn(){
    if(currentPlayer==="X"){
        currentPlayer="0";
    }
    else{
        currentPlayer="X";
    }
    //ui update
    gameInfo.innerText=`Current Player-${currentPlayer}`;
}
function handleClick(index){
    if(gameGrid[index]===""){
        //for your UI
        boxes[index].innerText=currentPlayer;
        //for your inner logic
        gameGrid[index]=currentPlayer;

        boxes[index].style.pointerEvents="none"

        //it turn one by one of player
        swapturn();
        //check krlo koi jeet toh ni gya
        CheckGameOver();
    }
}

function InitGame(){
    currentPlayer='X';
    // in starting my box is empty
    gameGrid=["","","","","","","","",""];

    //UI UPDATE AFTER CLICK ON NEW GAME BUTTON
    boxes.forEach((box,index)=>{
        box.innerText="";
        boxes[index].style.pointerEvents="all"
           // one more thing is missing , initlliaze boz with css property again
           box.classList=`box box${index+1}`;
    })
    gamebtn.classList.remove("active");
    gameInfo.innerText=`Current Player-${currentPlayer}`
}
InitGame();

//for clicking the particular box
boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleClick(index);
    })
})

// when click on new game button then its make all thething empty
gamebtn.addEventListener("click",InitGame)