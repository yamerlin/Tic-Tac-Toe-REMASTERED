import { Component, Input, Output, EventEmitter} from '@angular/core';
import { BigBoardComponent } from '../big-board/big-board.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent {
  @Input() posX: number;
  @Input() posY: number;

  @Input() isOverallWonChild: boolean;
  @Input() clickable: boolean; //pouvoir cliquer seulement si c'est une case rouge
  @Input() posXClickable: number;
  @Input() posYClickable: number;

  @Output() boardWonEmitter: EventEmitter<Pos> = new EventEmitter();
  @Output() posOfSquareToHightlight: EventEmitter<PosOfSquareToHightlight> = new EventEmitter();
  @Output() boardFullEmitter: EventEmitter<BoardFull> = new EventEmitter();
  @Output() squareArrayEmitter: EventEmitter<any[][]> = new EventEmitter();
  @Output() playerChangeEmitter: EventEmitter<boolean> = new EventEmitter();

  pos: Pos;
  objectPosOfSquareToHightlight: PosOfSquareToHightlight;

  @Input() player: string;

  square: any[][];
  xIsNext: boolean;
  winner: string;
  isWon: boolean;
  @Input() isSquareFull: boolean;

  xLittleSquare: number;
  yLittleSquare: number;

  posXOfSquareToHighlight: number;
  posYOfSquareToHighlight: number;
  
  constructor(){
    this.posX = 0;
    this.posY = 0;
    this.xLittleSquare = 0;
    this.yLittleSquare = 0;
    this.posXOfSquareToHighlight=0;
    this.posYOfSquareToHighlight=0;
    this.isSquareFull = false;
    this.clickable = false;
    this.posXClickable = 0;
    this.posYClickable = 0;

    this.square = [
      [0,0,0],
      [0,0,0],
      [0,0,0]
    ];

    this.xIsNext = true;
    this.winner = "null";
    this.isWon = false;
    this.isOverallWonChild = false;
    this.player = 'X';
    this.pos = new Pos(this.posX, this.posY, this.player);
    this.objectPosOfSquareToHightlight = new PosOfSquareToHightlight(this.posXOfSquareToHighlight, this.posYOfSquareToHighlight);
  }

  //JOUEUR X SYMBOLISE PAR 1
  //JOUEUR O SYMBOLISE PAR 2

  makeMove(ligne: number, colonne: number){

    console.log("Position dans le grand carré : ");
    console.log("X = " + this.posX + " Y = " + this.posY);
    console.log("");
    console.log("Position dans le petit carré : ");
    console.log("X = "+ this.xLittleSquare + " Y = " + this.yLittleSquare);
    console.log("");

    if(!this.isWon && !this.isOverallWonChild && this.clickable){

      if(this.square[ligne][colonne] == 0){

        if(this.player == "X"){
          this.square[ligne][colonne] = 1;
        }
        else{
          this.square[ligne][colonne] = 2;
        }

        this.calculatePosForNextMove();
        this.playerChangeEmitter.emit(true);
      }

      if(!this.isOverallWonChild){
        this.calculateWinner();
      }

      this.functIsBoardFull();

    }
  }

  getPosLittleSquare(x: number, y:number){
    this.xLittleSquare = x;
    this.yLittleSquare = y;
  }

  calculatePosForNextMove(){
    this.objectPosOfSquareToHightlight.posX = this.xLittleSquare;
    this.objectPosOfSquareToHightlight.posY = this.yLittleSquare;

    this.posOfSquareToHightlight.emit(this.objectPosOfSquareToHightlight);
  }

  functIsBoardFull(){
    let freeSpace: boolean;
    freeSpace = false;

    for(let x=0; x<3; x++){
      for(let y=0; y<3; y++){
        if(this.square[x][y] == 0){
          freeSpace = true;
        }
      }
    }

    if(this.isWon){
      freeSpace = false;
    }

    if(freeSpace == false){
      let objectBoardFull: BoardFull;
      objectBoardFull = new BoardFull(this.posX, this.posY, true);

      console.log("Full board emit !!!!!");
      this.boardFullEmitter.emit(objectBoardFull);
    }
  }

  calculateWinner(){
    //VERIFICATION EN LIGNE
    if(
      this.square[0][0] * this.square[0][1] * this.square[0][2] == 1 ||
      this.square[1][0] * this.square[1][1] * this.square[1][2] == 1 ||
      this.square[2][0] * this.square[2][1] * this.square[2][2] == 1 
    )
    {
      console.log("Victoire du joueur X en ligne !");
      this.winner = "X";
      this.isWon = true;

      this.pos.posX = this.posX
      this.pos.posY = this.posY
      this.pos.joueur = "X"
      this.boardWonEmitter.emit(this.pos);
    }

    if(
      this.square[0][0] * this.square[0][1] * this.square[0][2] == 8 ||
      this.square[1][0] * this.square[1][1] * this.square[1][2] == 8 ||
      this.square[2][0] * this.square[2][1] * this.square[2][2] == 8 
    )
    {
      console.log("Victoire du joueur O en ligne !");
      this.winner = "O";
      this.isWon = true;

      this.pos.posX = this.posX
      this.pos.posY = this.posY
      this.pos.joueur = "O"
      this.boardWonEmitter.emit(this.pos);
    }

    //VERIFICATION EN COLONNE
    if(
      this.square[0][0] * this.square[1][0] * this.square[2][0] == 1 ||
      this.square[0][1] * this.square[1][1] * this.square[2][1] == 1 ||
      this.square[0][2] * this.square[1][2] * this.square[2][2] == 1
    )
    {
      console.log("Victoire du joueur X en colonne !");
      this.winner = "X";
      this.isWon = true;

      this.pos.posX = this.posX
      this.pos.posY = this.posY
      this.pos.joueur = "X"
      this.boardWonEmitter.emit(this.pos);
    }
    if(
      this.square[0][0] * this.square[1][0] * this.square[2][0] == 8 ||
      this.square[0][1] * this.square[1][1] * this.square[2][1] == 8 ||
      this.square[0][2] * this.square[1][2] * this.square[2][2] == 8
    )
    {
      console.log("Victoire du joueur O en colonne !");
      this.winner = "O";
      this.isWon = true;

      this.pos.posX = this.posX
      this.pos.posY = this.posY
      this.pos.joueur = "O"
      this.boardWonEmitter.emit(this.pos);
    }

    //VERIFICATION EN DIAGONALE
    if(
      this.square[0][0] * this.square[1][1] * this.square[2][2] == 1 ||
      this.square[2][0] * this.square[1][1] * this.square[0][2] == 1
    )
    {
      console.log("Victoire du joueur X en diagonale !");
      this.winner = "X";
      this.isWon = true;

      this.pos.posX = this.posX
      this.pos.posY = this.posY
      this.pos.joueur = "X"
      this.boardWonEmitter.emit(this.pos);
    }
    if(
      this.square[0][0] * this.square[1][1] * this.square[2][2] == 8 ||
      this.square[2][0] * this.square[1][1] * this.square[0][2] == 8
    )
    {
      console.log("Victoire du joueur O en diagonale !");
      this.winner = "O";
      this.isWon = true;

      this.pos.posX = this.posX
      this.pos.posY = this.posY
      this.pos.joueur = "O"
      this.boardWonEmitter.emit(this.pos);
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
