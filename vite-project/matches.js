let mommy = {"DocumentElementObject"}
let alpha= ["","A","B","C","D","E","F","G","H"]
let reverseAlpha = {A:1,B:2,C:3,D:4,E:5,F:6,G:7,H:8}

class match {
  constructor(matchID, leftOrRight, round, game, players){
    this.name = `R${round}G${game}`
    this.round = round
    this.game = game
    this.players = players || []
    this.element = document.createElement("div")
    this.element.setAttribute("id",mID)
    this.element.setAttribute("class", `match ${leftOrRight}`)
    this.header = document.createElement("div")
    this.header.innerHTML = ""
    this.element.appendChild(this.header)
    for (let i == 1; i <=4; i++){
      let str = `Player${i}Div`
      this[str] = document.createElement("div")
      this[str].setAttribute("id",`${matchID}DIV${i}`)
      if (round==1) {
        this[str].innerHTML = `${game}${i}: `
        this[str].input = document.createElement("input")
        this.input.setAttribute("id",`${matchID}${i}`)
        this[str].appendChild(this.input)
        this.button = document.createElement("button")
        this.button.innerHTML = "Ok"
        this.button.addEventListener("click", function(){
          this.setPlayer(i, this.input.value)
        })
        this[str].appendChild(this.input)
      }else{
        this[str].innerHTML = `${game}${i}: ${this.players[i] || ""}`
      }
      this.element.appendChild(this[str])
    }
    mommy.appendChild(this.element)
  }
  setMommy(DOMME){
    mommy = DOMME
  } 
  setPlayer(num, player){
    if (typeof(player) == "string") {
      this[`Player${num}Div`].innerHTML = `${this.game}${num}: ${player}`
      this.players[num] = new Player(player, `${this.game}${num}`)
    }else{
      this[`Player${num}Div`].innerHTML = `${this.game}${num}: ${player.toString()}`
      this.players[num] = player
    }
  }
  setWinners(first, second){
    first.sendTo(`R${this.round + 1} G${Alpha[Math.ceil(reverseAlpha[this.game]/2])]}`,1)
    let secondRound = Math.ceil(reverseAlpha[this.game] + (8/(2**this.round))) % (8/(2**this.round))
    if (secondRound == 0) {secondRound = (8/(2**this.round))}
    second.sendTo(`R${this.round + 1} G${Alpha[])]}`,1)
  }
}
class Player {
  constructor(name,origin) {
    this.name = name
    this.origin = origin
  }
  toString(){
    return this.name
  }
}
export let Match = match
