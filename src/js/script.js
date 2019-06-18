const navigationList = document.getElementById("navigation-list");

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
        // navigationItems.classList.remove("navigation__link--active");
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