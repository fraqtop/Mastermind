class Mastermind
{
    getNextColor(prev_color){
        let color_index;
        color_index = this.cols.indexOf(prev_color);
        color_index = color_index >= this.cols.length-1 ? 0: color_index + 1;
        return this.cols[color_index];
    }

    generateCombination(){
        if (this.mode=='hard')
        {
            for (let i=0; i<4; i++)
            {
                this.combs.push(this.cols[this.getRandom()]);
            } 
        }
        else
        {
            let used_colors = [];
            let random_value = this.getRandom();
            for (let i=0; i<4; i++)
            {
                while(used_colors.indexOf(random_value) != -1)
                {
                    random_value = this.getRandom();
                }
                used_colors.push(random_value);
                this.combs.push(this.cols[random_value]);
            }
        }
    }

    countPoints(user_colors){
        let attempt_points = [0, 0, 0, 0];
        let index;
        for (let i = 0; i<4; i++)
        {
            index = -1;
            do{
                index = this.combs.indexOf(user_colors[i], index+1);
                attempt_points[index] += index == i ? this.pointsForRightPlace: 1
            } while (index != -1)
        }
        attempt_points = attempt_points.map(function(elem){
            if (elem != 0) {
                return elem>=this.pointsForRightPlace ? this.pointsForRightPlace: 1
            }
            return elem;
        }, this);
        let result = [0, 0];
        for (let cell of attempt_points)
        {
            if (cell!=0)
            {
                result[0]++;
                if (cell == this.pointsForRightPlace)
                {
                    result[1]++;
                }
            }
        }
        this.points += attempt_points.reduce((prev, next)=>prev + next);
        return result;
    }

    getRandom(){
        let min = 0;
        let max = this.cols.length-1;
        return Math.floor(Math.random()*(max - min +1) + min);
    }

    getClone(){
        return this.row_pattern.cloneNode(true);
    }

    checkForWin(attempt_points){
        if (attempt_points[1] == 4)
        {
            return true;
        }
        return false;
    }

    getResult(attempt, time){
        return this.points * Math.pow(attempt, 2) * time;
    }

    checkForRecord(points){
        let ajax = new XMLHttpRequest();
        ajax.open('GET', `highscore.php?score=${points}`, false);
        ajax.send();
        return ajax.responseText;
    }

    constructor(new_mode, colors) {
        this.points = 0;
        this.mode = new_mode;
        this.cols = colors;
        this.combs = [];
        this.pointsForRightPlace = this.mode == "hard" ? 3 : 4;
        if (new_mode=='hard') {this.cols.push('cadetblue')}
        this.generateCombination();
        this.row_pattern = document.querySelector("#row_1").cloneNode(true);
    }
}