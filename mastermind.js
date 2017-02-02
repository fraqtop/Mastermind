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
        let attempt_points = [0, 0, 0, 0]
        let index
        for (let i = 0; i<4; i++)
        {
            index = -1
            do{
                index = this.combs.indexOf(user_colors[i], index+1)
                attempt_points[index] += index == i ? 3: 1
            } while (index != -1)
        }
        attempt_points = attempt_points.map(function(elem){
            return elem>3 ? 3: elem
        });
        let result = attempt_points.reduce((prev, next)=>prev + next)
        this.points += result
        alert(this.combs)
        alert(attempt_points)
        return result
    }

    getRandom(){
        let min = 0
        let max = this.cols.length-1
        return Math.floor(Math.random()*(max - min +1) + min)
    }

    getClone(){
        return this.row_pattern.cloneNode(true)
    }

    checkForWin(attempt_points){
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

    constructor(new_mode, colors)
    {
        this.secondsElapsed = 0
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