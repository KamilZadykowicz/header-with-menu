const navigationList = document.getElementById("navigation-list");
const basketDrop = document.getElementById("basketDrop");
const basketBtn = document.getElementById("basketBtn");
const headerInput = document.getElementById("headerInput");
const headerLabel = document.getElementById("headerLabel");
var hideBasketTimeout;

document.getElementById("navigation-btn-open").onclick = function() {
    navigationList.classList.remove("navigation__list--hidden");
    navigationList.classList.add("navigation__list--active");
}

document.getElementById("navigation-btn-close").onclick = function() {
    navigationList.classList.remove("navigation__list--active");
    navigationList.classList.add("navigation__list--hidden");
}

var navigation = document.getElementById("navigation-list");
var navigationItems = navigation.getElementsByClassName("navigation__link");
for(var i=0; i<navigationItems.length; i++) {
    navigationItems[i].addEventListener("click", function() {
        removeActiveClass("navigation__link--active");
        this.classList.add("navigation__link--active");
        navigationList.classList.remove("navigation__list--active");
        navigationList.classList.add("navigation__list--hidden");
    })
}

function removeActiveClass(activeClass) {
    for (var j = 0; j < navigationItems.length; j++) {
        navigationItems[j].classList.remove(activeClass);
    }
}

basketBtn.onclick = function() {
    basketDrop.classList.toggle("basketDrop--show");
}

basketDrop.onmouseleave = function() {
    hideBasketTimeout = setTimeout(function(){
        basketDrop.classList.remove("basketDrop--show")
    },1000)
}
basketDrop.onmouseover = function() {
    clearTimeout(hideBasketTimeout);
}

function isInputEmpty() {
    if(headerInput.value == "") {
        headerLabel.classList.remove("headerbar__label--move");
    }
    else {
        headerLabel.classList.add("headerbar__label--move");
    }
}

headerInput.onchange = function() {
    isInputEmpty();
}