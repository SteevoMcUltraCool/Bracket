let mommy = {"DocumentElementObject"}
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
  
  }
  setMommy(DOMME){
    mommy = DOMME
  } 
}
export let Match = match
