let list = document.getElementsByClassName("questions__list");
let btn = document.getElementsByClassName("questions__list__btn");


function accordion() {
    let listClass = this.parentNode.className;
    console.log(listClass)
    for(let i = 0; i < list.length;  i++) {
        list[i].className = "questions__list close";
    }
    if(listClass === "questions__list close") {
        this.parentNode.className = "questions__list open";
    }
}

for(let i = 0; i < btn.length; i++) {
    btn[i].addEventListener("click", accordion);
    console.log(btn[i]);
}

