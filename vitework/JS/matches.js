let mommy = ["DocumentElementObject"];
let alpha = ["", "A", "B", "C", "D", "E", "F", "G", "H"];
let reverseAlpha = { A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8 };
let Matches = {};
class match {
  constructor(matchID, leftOrRight, round, game, players) {
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
        this.button.addEventListener("click", function (x) {
          this.setPlayer(i, this[str].input.value);
        });
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

  setPlayer(num, player) {
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
  setWinners(first, second) {
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
class Player {
  constructor(name, origin) {
    this.name = name;
    this.origin = origin;
  }
  toString() {
    return this.name;
  }
  sendTo(match, seed) {
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
function setMommy(DOMME) {
  mommy = DOMME;
}

export let Match = match,
  mom = setMommy;
