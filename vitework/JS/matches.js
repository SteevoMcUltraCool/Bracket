let mommy = ["DocumentElementObject"];
let alpha = ["", "A", "B", "C", "D", "E", "F", "G", "H"];
let reverseAlpha = { A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8 };
let Matches = {};
class match { //match is a game played between 4 players where the top 2 advance. intended subclass: championship match
  constructor(matchID, leftOrRight, round, game, players) {//makes a match item and adds it to the mommy. appends it to Matches as Matches[matchI] 
    this.name = matchID; //R1G1
    this.round = round;
    this.game = game;
    this.players = players || [];
    this.element = document.createElement("div");
    this.element.setAttribute("id", matchID);
    this.element.setAttribute("class", `match ${leftOrRight}`);
    this.header = document.createElement("h5");
    this.header.innerHTML = `Round ${round} Game ${game}`;
    this.element.appendChild(this.header);
    Matches[this.name] = this;
    for (let i = 1; i <= 4; i++) {
      let str = `Player${i}Div`;
      this[str] = document.createElement("div");
      this[str].setAttribute("id", `${matchID}DIV${i}`);
      if (round == 1) {
        this[str].innerHTML = `${game}${i}: `;
        this[str].input = document.createElement("input");
        this[str].input.setAttribute("id", `${matchID}${i}`);
        this[str].appendChild(this[str].input);
        this.button = document.createElement("button");
        this.button.innerHTML = "Ok";
        console.log(this[str].input);
        let eta = this
        this.button.addEventListener("click", function (x,y) {
          console.log(str, eta)
          eta.setPlayer(i, eta[str].input.value);
        },);
        this[str].appendChild(this[str].input);
        this[str].appendChild(this.button);
        if (i == 4) {
          this[str].style.setProperty("border-bottom", "none");
        }
      } else {
        this[str].innerHTML = `${game}${i}: ${this.players[i] || ""}`;
      }
      this.element.appendChild(this[str]);
    }
    mommy.appendChild(this.element);
  } 

  setPlayer(num, player) { //sets the match.player[num]. If player is a player object, we goochie. otherwise, makes a player object with this origin.
    if (typeof player == "string") {
      this[`Player${num}Div`].innerHTML = `${this.game}${num}: ${player}`;
      this.players[num] = new Player(player, `${this.game}${num}`);
    } else {
      this[`Player${num}Div`].innerHTML = `${
        this.game
      }${num}: ${player.toString()}`;
      this.players[num] = player;
    }
  }
  setWinners(first, second) { //advances the players to their next match. NOT WORKING. intended outcome: winner stays on their path (should work), looser jumps to across board
    first.sendTo(
      `R${this.round + 1} G${Alpha[Math.ceil(reverseAlpha[this.game] / 2)]}`,
      1
    );
    let secondRound =
      Math.ceil(
        reverseAlpha[this.game] + 8 / 2 ** this.round + (this.round - 1)
      ) %
      (8 / 2 ** this.round);
    if (secondRound == 0) {
      secondRound = 8 / 2 ** this.round;
    }
    second.sendTo(`R${this.round + 1} G${Alpha[secondRound]}`, 2);
  } 
}
class Player { // makes a player class
  constructor(name, origin) { 
    this.name = name;
    this.origin = origin;
  }
  toString() { //gets the name of the players
    return this.name;
  }
  sendTo(match, seed) { //sends a player to an open spot in an avaiable match based on their seed. each match past round one should have 2 players with seed==1 and 2 players with seed==2
    if (seed == 1) {
      if (match.players[1]) {
        return match.setPlayer(2, this);
      }
      return match.setPlayer(1, this);
    } else {
      if (match.players[3]) {
        return match.setPlayer(4, this);
      }
      return match.setPlayer(3, this);
    }
  }
}
function setMommy(DOMME) { //sets mommy locally
  mommy = DOMME;
}

export let Match = match,
  mom = setMommy;
