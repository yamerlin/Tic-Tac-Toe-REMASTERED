import { Component , OnInit } from '@angular/core';
import { flush } from '@angular/core/testing';
import { UntypedFormBuilder } from '@angular/forms';

@Component({
  selector: 'app-big-board',
  templateUrl: './big-board.component.html',
  styleUrl: './big-board.component.css'
})
export class BigBoardComponent implements OnInit {

  overallWinner: string;
  grilleOfBoardWon: any[][];
  square: any[][];
  isOverallWon: boolean;
  player: string;
  posXOfSquareToHighlight: number;
  posYOfSquareToHighlight: number;
  indexLigne: number;
  indexColonne: number;

  arrayOfFullBoard: number[][];

  posX: number;
  posY: number;

  constructor(){
    this.overallWinner = "null";
    this.grilleOfBoardWon = [
      [0,0,0],
      [0,0,0],
      [0,0,0]
    ];
    this.square = [
      [0,0,0],
      [0,0,0],
      [0,0,0]
    ];
    this.arrayOfFullBoard = [
      [0,0,0],
      [0,0,0],
      [0,0,0]
    ];
    this.isOverallWon = false;
    this.player = 'X';

    this.posXOfSquareToHighlight = 1;
    this.posYOfSquareToHighlight = 1;

    this.indexLigne = 0;
    this.indexColonne = 0;

    this.posX = 0;
    this.posY = 0;
  }

  ngOnInit(): void {
    this.newGame;
  }

  newGame(){
    this.overallWinner = "null";
    this.grilleOfBoardWon = [
      [0,0,0],
      [0,0,0],
      [0,0,0]
    ];
    this.square = [
      [0,0,0],
      [0,0,0],
      [0,0,0]
    ];
    this.arrayOfFullBoard = [
      [0,0,0],
      [0,0,0],
      [0,0,0]
    ];
    this.isOverallWon = false;
    this.player = 'X';
  }

  /*
  seeBigSquare(){
    for(let i = 0; i<3; i++){
      for(let j = 0; j<3; j++){
        console.log(this.grilleOfBoardWon[i][j]);
      }
    }
  }*/

  /*
  seeFullBoard(){
    for(let i = 0; i<3; i++){
      for(let j = 0; j<3; j++){
        console.log(this.arrayOfFullBoard[i][j]);
      }
    }
  }*/

  boardGotWonFunction(pos: Pos){
    if(pos.joueur == "X"){
      this.grilleOfBoardWon[pos.posX][pos.posY] = 1;
    }
    else{
      this.grilleOfBoardWon[pos.posX][pos.posY] = 2;
    }

    console.log("Victoire en position X = " + pos.posX + " Y = " + pos.posY + " par le joueur " + pos.joueur);

    if(!this.isOverallWon){
      this.calculateWinner();
    }
  }

  hightlightSquare(objectPosOfSquareToHightlight: PosOfSquareToHightlight){
    let x = objectPosOfSquareToHightlight.posX;
    let y = objectPosOfSquareToHightlight.posY;

    while(this.arrayOfFullBoard[x][y] == 1 && !this.isArrayOfFullBoardCompleted()){
      y = y + 1;
      if(y > 2 ){
        y = 0;
        x = x+1;
      }

      if(x > 2){
        x = 0;
      }
    }

    this.posXOfSquareToHighlight = x;
    this.posYOfSquareToHighlight = y;

    console.log("pos X OfSquareToHighlight : " + this.posXOfSquareToHighlight);
    console.log("pos Y OfSquareToHighlight : " + this.posYOfSquareToHighlight);
  }

  isArrayOfFullBoardCompleted(){
    let completed: boolean = true;

    for(let i = 0; i<3; i++){
      for(let j = 0; j<3; j++){
        if(this.arrayOfFullBoard[i][j] == 0){
          completed = false;
        }
      }
    }

    return completed;
  }

  putDataInArrayOfFullBoard(objectBoardFull: BoardFull){
    this.arrayOfFullBoard[objectBoardFull.posX][objectBoardFull.posY] = 1;
    console.log(objectBoardFull.posX);
    console.log(objectBoardFull.posY);
    console.log("Data rentrééé !!!");

    //let objectPosOfSquareToHightlight: PosOfSquareToHightlight = new PosOfSquareToHightlight(objectBoardFull.posX /*pas bonnn*/, objectBoardFull.posY);
    //this.hightlightSquare(objectPosOfSquareToHightlight);
  }

  changePlayer(){
    if(this.player == "X"){
      this.player = "O";
    }
    else{
      this.player = "X";
    }
  }

  calculateWinner(){
    //VERIFICATION EN LIGNE
    if(
      this.grilleOfBoardWon[0][0] * this.grilleOfBoardWon[0][1] * this.grilleOfBoardWon[0][2] == 1 ||
      this.grilleOfBoardWon[1][0] * this.grilleOfBoardWon[1][1] * this.grilleOfBoardWon[1][2] == 1 ||
      this.grilleOfBoardWon[2][0] * this.grilleOfBoardWon[2][1] * this.grilleOfBoardWon[2][2] == 1 
    )
    {
      console.log("Victoire du joueur X en ligne !");
      this.overallWinner = "Victoire du joueur X en ligne !";
      this.isOverallWon = true;
    }

    if(
      this.grilleOfBoardWon[0][0] * this.grilleOfBoardWon[0][1] * this.grilleOfBoardWon[0][2] == 8 ||
      this.grilleOfBoardWon[1][0] * this.grilleOfBoardWon[1][1] * this.grilleOfBoardWon[1][2] == 8 ||
      this.grilleOfBoardWon[2][0] * this.grilleOfBoardWon[2][1] * this.grilleOfBoardWon[2][2] == 8 
    )
    {
      console.log("Victoire du joueur O en ligne !");
      this.overallWinner = "Victoire du joueur O en ligne !";
      this.isOverallWon = true;
    }

    //VERIFICATION EN COLONNE
    if(
      this.grilleOfBoardWon[0][0] * this.grilleOfBoardWon[1][0] * this.grilleOfBoardWon[2][0] == 1 ||
      this.grilleOfBoardWon[0][1] * this.grilleOfBoardWon[1][1] * this.grilleOfBoardWon[2][1] == 1 ||
      this.grilleOfBoardWon[0][2] * this.grilleOfBoardWon[1][2] * this.grilleOfBoardWon[2][2] == 1
    )
    {
      console.log("Victoire du joueur X en colonne !");
      this.overallWinner = "Victoire du joueur X en colonne !";
      this.isOverallWon = true;
    }
    if(
      this.grilleOfBoardWon[0][0] * this.grilleOfBoardWon[1][0] * this.grilleOfBoardWon[2][0] == 8 ||
      this.grilleOfBoardWon[0][1] * this.grilleOfBoardWon[1][1] * this.grilleOfBoardWon[2][1] == 8 ||
      this.grilleOfBoardWon[0][2] * this.grilleOfBoardWon[1][2] * this.grilleOfBoardWon[2][2] == 8
    )
    {
      console.log("Victoire du joueur O en colonne !");
      this.overallWinner = "Victoire du joueur O en colonne !";
      this.isOverallWon = true;
    }

    //VERIFICATION EN DIAGONALE
    if(
      this.grilleOfBoardWon[0][0] * this.grilleOfBoardWon[1][1] * this.grilleOfBoardWon[2][2] == 1 ||
      this.grilleOfBoardWon[2][0] * this.grilleOfBoardWon[1][1] * this.grilleOfBoardWon[0][2] == 1
    )
    {
      console.log("Victoire du joueur X en diagonale !");
      this.overallWinner = "Victoire du joueur X en diagonale !";
      this.isOverallWon = true;
    }
    if(
      this.grilleOfBoardWon[0][0] * this.grilleOfBoardWon[1][1] * this.grilleOfBoardWon[2][2] == 8 ||
      this.grilleOfBoardWon[2][0] * this.grilleOfBoardWon[1][1] * this.grilleOfBoardWon[0][2] == 8
    )
    {
      console.log("Victoire du joueur O en diagonale !");
      this.overallWinner = "Victoire du joueur O en diagonale !";
      this.isOverallWon = true;
    }
  }
}


class Pos{
  posX: number;
  posY: number;
  joueur: string;

  constructor(posX: number, posY: number, joueur: string){
    this.posX = posX;
    this.posY = posY;
    this.joueur = "";
  }
}

class PosOfSquareToHightlight{
  posX: number;
  posY: number;

  constructor(posX: number, posY: number){
    this.posX = posX;
    this.posY = posY;
  }
}

class BoardFull{
  posX: number;
  posY: number;
  isBoardFull: boolean;

  constructor(posX:number, posY: number, isBoardFull: boolean){
    this.posX = posX;
    this.posY = posY;
    this.isBoardFull = isBoardFull;
  }
}
