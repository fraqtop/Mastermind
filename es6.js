const colors = ['green', 'yellow', 'red', 'orange', 'purple', 'blue', 'brown', 'black']

class Mastermind
{
    gen_combination(){
        if (this.mode=='hard')
        {
            for (let i=0; i<4; i++)
            {
                this.combs.push(this.cols[this.getRandom()])
            } 
        }
    }
    getRandom(){
        let min = 0
        let max = this.cols.length-1
        return Math.floor(Math.random()*(max - min +1) + min)
    }
    constructor(new_mode)
    {
        this.mode = new_mode
        this.cols = colors
        this.combs = []
        if (new_mode=='hard') {this.cols.push('cadetblue')}
        this.gen_combination()
    }
}

document.addEventListener("DOMContentLoaded", ()=>{
    let mode = location.href.search('mode=')
    if (mode!=-1)
    {
        window.mastermind = new Mastermind(location.href.substr(mode+5))
    }
});