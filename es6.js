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
        let attempt_points = 0
        for (let i = 0; i<4; i++)
        {
            switch(this.combs.indexOf(user_colors[i]))
            {
                case -1:
                    break;
                case i:
                    attempt_points += 3
                    break;
                default:
                    attempt_points += 1
            }
        }
        this.points += attempt_points
        alert(this.combs)
        return attempt_points
    }

    getRandom(){
        let min = 0
        let max = this.cols.length-1
        return Math.floor(Math.random()*(max - min +1) + min)
    }

    getClone(){
        return this.row_pattern.cloneNode(true)
    }

    check_for_win(attempt_points){
        if (this.mode == 'hard')
        {
            if (attempt_points == 12 & window.attempt<=10)
            { return true }
            return false
        }
        if (this.mode == 'default')
        {
            if (attempt_points == 16 & window.attempt<=12)
            { return true }
            return false
        }
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
        this.row_pattern = document.querySelector("#row_1").cloneNode(true)
    }
}


document.addEventListener("DOMContentLoaded", ()=>{
    let mode = location.href.search('mode=')
    window.attempt = 1
    if (mode!=-1)
    {
        window.mastermind = new Mastermind(location.href.substr(mode+5))
        submit.onclick = ()=>{
            let chosen_colors = getColors()
            let attempt_points = window.mastermind.countPoints(chosen_colors)
            if (window.mastermind.check_for_win(attempt_points))
            {submit.style.display = "none"}
            window.attempt++
            attempt.innerHTML = window.attempt
            points.innerHTML = window.mastermind.points
            draw()
        };
    }
});

function changeColor(DOMobject){
    let old_color = DOMobject.className.substr(7)
    let new_color = window.mastermind.getNextColor(old_color)
    DOMobject.className = `circle ${new_color}`
}

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
    let new_line = window.mastermind.getClone()
    new_line.id = "row_" + window.attempt
    document.body.insertBefore(new_line, submit)
}