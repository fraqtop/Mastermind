const colors = ['green', 'yellow', 'red', 'orange', 'purple', 'blue', 'brown', 'black'];

document.addEventListener("DOMContentLoaded", ()=>{
    let mode = location.href.search('mode=');
    window.attempt = 1;
    if (mode!=-1)
    {
        window.mastermind = new Mastermind(location.href.substr(mode+5), colors);
        submit.onclick = ()=>{
            if (window.attempt == 1) {
                window.seconds_elapsed = 0;
                window.timer_id = setInterval(tickTimer, 1000)
            }
            let chosen_colors = getColors();
            let attempt_points = window.mastermind.countPoints(chosen_colors);
            points.innerHTML = window.mastermind.points;
            if (window.mastermind.checkForWin(attempt_points)) {
                clearInterval(window.timer_id);
                submit.style.display = "none";
                let result = window.mastermind.getResult(window.attempt, window.seconds_elapsed);
                showResult(result);
            }
            
            else {
                window.attempt++;
                document.querySelector("#attempt").innerHTML = window.attempt;
                draw(attempt_points)
            }
        };
    }
});

function changeColor(DOMobject){
    let old_color = DOMobject.className.substr(7);
    let new_color = window.mastermind.getNextColor(old_color);
    DOMobject.className = `circle ${new_color}`;
}

function getColors(){
    let row = document.querySelector(`#row_${window.attempt}`);
    let result = [];
    for(circle of row.querySelectorAll(".circle"))
    {
        result.push(circle.className.substr(7));
    }
    return result
}

function draw(attempt_points){
    let new_line = window.mastermind.getClone();
    new_line.id = `row_${window.attempt}`;
    document.querySelector(`#row_${window.attempt-1}`).children[0].innerHTML = attempt_points;
    document.body.insertBefore(new_line, submit);
}

function tickTimer(){
    window.seconds_elapsed++;
    time.innerHTML = window.seconds_elapsed;
}

function showResult(result){
    let is_record = window.mastermind.checkForRecord(result);
    overlay.className = "active";
    modal.children[0].innerHTML = `you got ${result} points`;
    modal.style.display = "block";
    if (is_record) {
        let record_form = document.getElementsByTagName('form')[0];
        record_form.style.display = "block";
        record_form.children[0].value = result;
    }
    else{
        window.location.href = 'highscore.php';
    }
}