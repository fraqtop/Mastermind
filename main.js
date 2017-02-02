const colors = ['green', 'yellow', 'red', 'orange', 'purple', 'blue', 'brown', 'black']

document.addEventListener("DOMContentLoaded", ()=>{
    let mode = location.href.search('mode=')
    window.attempt = 1
    if (mode!=-1)
    {
        window.mastermind = new Mastermind(location.href.substr(mode+5), colors)
        submit.onclick = ()=>{
            let chosen_colors = getColors()
            let attempt_points = window.mastermind.countPoints(chosen_colors)
            points.innerHTML = window.mastermind.points
            if (window.mastermind.checkForWin(attempt_points))
            {submit.style.display = "none"}
            else
            {
                window.attempt++
                document.querySelector("#attempt").innerHTML = window.attempt
                draw()
            }
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

function tickTimer(){
    window.mastermind.secondsElapsed++
    time.innerHTML = window.mastermind.secondsElapsed
}