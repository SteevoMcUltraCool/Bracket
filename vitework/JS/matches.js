let mommy = ["DocumentElementObject"];
let alpha = ["", "A", "B", "C", "D", "E", "F", "G", "H"];
let reverseAlpha = { A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8 };
var Matches = {};
var MatchArray = [];
class match {
  //match is a game played between 4 players where the top 2 advance. intended subclass: championship match
  constructor(matchID, leftOrRight, round, game, players) {
    //makes a match item and adds it to the mommy. appends it to Matches as Matches[matchI]
    this.name = matchID; //R1G1
    this.round = round;
    this.game = game;
    this.LR = leftOrRight;
    this.players = players || [];
    this.element = document.createElement("div");
    this.element.setAttribute("id", matchID);
    this.element.setAttribute("class", `match ${leftOrRight}`);
    this.header = document.createElement("h5");
    this.header.innerHTML = `Round ${round} Game ${game}`;
    this.confirmBu = document.createElement("button");
    this.element.appendChild(this.header);
    let eta = this;
    this.confirmBu.addEventListener("click", function () {
      let winners = eta.getWinners();
      if (leftOrRight != "center") {
        eta.setWinners(winners[0], winners[1]);
        eta.confirmBu.remove();
      } else {
        eta.setChampions(winners[0], winners[1], winners[2]);
        eta.confirmBu.remove();
      }
    });
    this.confirmBu.innerHTML = "⇆";
    this.confirmBu.setAttribute("class", "confirmbu");
    this.header.appendChild(this.confirmBu);
    Matches[this.name] = this;
    MatchArray.push(this.toArray());
    for (let i = 1; i <= 4; i++) {
      let str = `Player${i}Div`;
      this[str] = document.createElement("div");
      this[str].setAttribute("id", `${matchID}DIV${i}`);
      if (round == 1 && !this.players[i]) {
        this[str].innerHTML = `${game}${i}: `;
        this[str].input = document.createElement("input");
        this[str].input.setAttribute("id", `${matchID}${i}`);
        this[str].appendChild(this[str].input);
        this.button = document.createElement("button");
        this.button.innerHTML = "Go!";
        this.button.addEventListener("click", function (x, y) {
          eta.setPlayer(i, eta[str].input.value);
        });
        this[str].appendChild(this[str].input);
        this[str].appendChild(this.button);
      } else {
        this[str].innerHTML = `${game}${i}: ${this.players[i] || ""}`;
        this[str].input = document.createElement("input");
        this[str].input.setAttribute("type", "number");
        this[str].input.setAttribute("min", "1");
        this[str].input.setAttribute("max", "4");
        this[str].input.style.maxWidth = "24px";
        this[str].appendChild(this[str].input);
      }
      if (i == 4) {
        this[str].style.setProperty("border-bottom", "none");
      }
      this.element.appendChild(this[str]);
    }
    mommy.appendChild(this.element);
  }
  toArray() {
    return [this.name, this.LR, this.round, this.game, this.players];
  }
  setPlayer(num, player) {
    //sets the match.player[num]. If player is a player object, we goochie. otherwise, makes a player object with this origin.
    let str = `Player${num}Div`;
    if (typeof player == "string") {
      this[str].innerHTML = `${this.game}${num}: ${player}`;
      this.players[num] = new Player(player, `${this.game}${num}`);
      //
      this[str].input = document.createElement("input");
      this[str].input.setAttribute("type", "number");
      this[str].input.setAttribute("min", "1");
      this[str].input.setAttribute("max", "4");
      this[str].input.style.maxWidth = "24px";
      this[str].appendChild(this[str].input);
      //
    } else {
      this[`Player${num}Div`].innerHTML = `${
        this.game
      }${num}: ${player.toString()}`;
      this.players[num] = player;
      //
      this[str].input = document.createElement("input");
      this[str].input.setAttribute("type", "number");
      this[str].input.setAttribute("min", "1");
      this[str].input.setAttribute("max", "4");
      this[str].input.style.maxWidth = "24px";
      this[str].appendChild(this[str].input);
      //
    }
  }
  setWinners(first, second) {
    //advances the players to their next match. NOT WORKING. intended outcome: winner stays on their path (should work), looser jumps to across board
    first.sendTo(
      `R${this.round + 1}G${alpha[Math.ceil(reverseAlpha[this.game] / 2)]}`,
      1
    );
    let secondRound =
      (Math.ceil(reverseAlpha[this.game] / 2) + (3 - this.round)) %
      (8 / 2 ** this.round);
    if (secondRound == 0) {
      secondRound = 8 / 2 ** this.round;
    }
    console.log(secondRound);
    second.sendTo(`R${this.round + 1}G${alpha[secondRound]}`, 2);
  }
  getWinners() {
    let first;
    let second;
    let third;
    for (let i = 1; i <= 4; i++) {
      let str = `Player${i}Div`;
      if (Number(this[str].input.value) == 1) {
        first = this.players[i];
      }
      if (Number(this[str].input.value) == 2) {
        second = this.players[i];
      }
      if (Number(this[str].input.value) == 3) {
        third = this.players[i];
      }
    }
    return [first, second, third];
  }
  setChampions(first, second, third) {
    this.firstMedal = document.createElement("div");
    this.firstMedal.setAttribute("class", "medal");
    this.firstMedal.setAttribute("id", "first");
    let bounds = this.element.getBoundingClientRect();
    this.firstMedal.style.top = `${bounds.top + bounds.height / 2}px`;
    this.firstMedal.style.left = `${bounds.left + 22}px`;
    this.firstMedal.innerHTML = `
                      <p><span><img src="/goldmedal.gif"></span> ${first.toString()}</p>
                      `;

    this.secondMedal = document.createElement("div");
    this.secondMedal.setAttribute("class", "medal");
    this.secondMedal.setAttribute("id", "second");
    this.secondMedal.style.top = `${bounds.top + bounds.height / 2}px`;
    this.secondMedal.style.left = `${bounds.left + 22}px`;
    this.secondMedal.innerHTML = `
                                        <p><span><img src="/silvermedal.gif"></span> ${second.toString()}</p>
                                        `;

    this.thirdMedal = document.createElement("div");
    this.thirdMedal.setAttribute("class", "medal");
    this.thirdMedal.setAttribute("id", "third");
    this.thirdMedal.style.top = `${bounds.top + bounds.height / 2}px`;
    this.thirdMedal.style.left = `${bounds.left + 22}px`;
    this.thirdMedal.innerHTML = `
                                <p><span><img src="/bronzemedal.gif"></span> ${third.toString()}</p>
                                                                              `;
    setTimeout(
      function (eta) {
        mommy.appendChild(eta.thirdMedal);
        eta.thirdMedal.style.top = `${window.innerHeight - 125}px`;
      },
      225,
      this
    );
    setTimeout(
      function (eta) {
        mommy.appendChild(eta.secondMedal);
        eta.secondMedal.style.top = `${window.innerHeight - 275}px`;
      },
      1500,
      this
    );
    setTimeout(
      function (eta) {
        mommy.appendChild(eta.firstMedal);
        eta.firstMedal.style.top = `${window.innerHeight - 425}px`;
      },
      2875,
      this
    );
  }
}
class Player {
  // makes a player class
  constructor(name, origin) {
    this.name = name;
    this.origin = origin;
  }
  toString() {
    //gets the name of the players
    return this.name;
  }
  sendTo(match, seed) {
    //sends a player to an open spot in an avaiable match based on their seed. each match past round one should have 2 players with seed==1 and 2 players with seed==2
    match = Matches[match];
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
  //sets mommy locally
  mommy = DOMME;
}

export let Match = match,
  mom = setMommy;
