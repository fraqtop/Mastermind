let myfunc = (x,y,z) =>  x+y+z

let data = [6, 7, 8]
let DATA = [10, 10, 10]
let obj = {"name": "Johnny", "age": 23}
let {name, age} = obj
let str =  `Hello, my name is ${name}`

document.addEventListener("DOMContentLoaded", ()=>{
    generate_gif()
});

function generate_gif()
{
    let black_area = document.querySelector(".represent")
    let gif = document.createElement("img")
    gif.src = "circle.gif"
    for (let i=0; i<10; i++)
    {
        black_area.appendChild(gif)
    }
}