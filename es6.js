const colors = ['green', 'yellow', 'red', 'orange', 'purple', 'blue', 'brown', 'black']

class Mastermind
{
    getNextColor(prev_color){
        this.index = this.cols.indexOf(prev_color)
        this.index = this.index >= this.cols.length-1 ? 0: this.index + 1
        let next_color = this.cols[this.index]
        return next_color
    }

    generateCombination(){
        if (this.mode=='hard')
        {
            for (let i=0; i<4; i++)
            {
                this.combs.push(this.cols[this.getRandom()])
            } 
        }
    }

    countPoints(user_colors){
        let [a, b, c, d] = user_colors
        for (let i = 0; i<4; i++)
        {
            switch(this.combs.indexOf(user_colors[i]))
            {
                case -1:
                    break;
                case i:
                    this.points += 4
                    break;
                default:
                    this.points += 1
            }
        }
        alert(this.points)
        alert(this.combs)
    }

    getRandom(){
        let min = 0
        let max = this.cols.length-1
        return Math.floor(Math.random()*(max - min +1) + min)
    }

    constructor(new_mode)
    {
        this.points = 0
        this.mode = new_mode
        this.cols = colors
        this.combs = []
        this.index = -1
        if (new_mode=='hard') {this.cols.push('cadetblue')}
        this.generateCombination()
    }
}


document.addEventListener("DOMContentLoaded", ()=>{
    let mode = location.href.search('mode=')
    window.attempt = 1
    if (mode!=-1)
    {
        window.mastermind = new Mastermind(location.href.substr(mode+5))
    }
    submit.onclick = ()=>{
        let chosen_colors = getColors()
        window.mastermind.countPoints(chosen_colors)
        window.attempt++
    };
    let circles = document.querySelectorAll(".circle")
    for (c of circles)
    {
        c.onclick = function(){
        let current_color = window.mastermind.getNextColor('default')
        alert(current_color)
    };
    }
    
});

function getColors(){
    let row = document.querySelector('#row_' + window.attempt)
    let result = []
    for(circle of row.children)
    {
        result.push(circle.className.substr(7))
    }
    return result
}

function draw(){

}