import { Component , OnInit } from '@angular/core';

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
    this.isOverallWon = false;
    this.player = 'X';

    this.posXOfSquareToHighlight = 1;
    this.posYOfSquareToHighlight = 1;
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
    this.posXOfSquareToHighlight = objectPosOfSquareToHightlight.posX;
    this.posYOfSquareToHighlight = objectPosOfSquareToHightlight.posY;

    console.log("pos X OfSquareToHighlight : " + this.posXOfSquareToHighlight);
    console.log("pos Y OfSquareToHighlight : " + this.posYOfSquareToHighlight);
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
