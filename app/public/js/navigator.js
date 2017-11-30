/* Each page div id. */

var pages = ["home", "profile", "market", "footer"]

/* Display element with id and hide other elements. */

function displayAndHide(id) {
    document.getElementById(id).style.display = "block"
    for (var i = 0; i < pages.length; i++) {
        if(id !== pages[i]) {
            document.getElementById(pages[i]).style.display = "none"
        }
    }
}

/* Apply click listeners to each part of the navbar. */

$("#homeNav").click(function () {
    displayAndHide("home")
})

$("#cryptoFolioNav").click(function () {
    displayAndHide("home")
})

$("#profileNav").click(function () {
    displayAndHide("profile")
    // C3 chart glitches when hiding divs, so this is here to counter the glitch.
    if (user.walletValue == 0)
        emptyChart()
    else
        generateChart(user)
})

$("#marketNav").click(function () {
    displayAndHide("market")
})

$("#footerNav").click(function () {
    displayAndHide("footer")
})
