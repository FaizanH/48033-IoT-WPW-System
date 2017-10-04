<!-- Toggle button to close the sidebar navigation -->
document.getElementById("myBtn").addEventListener("click", toggleNav);
function toggleNav(x){
    navSize = document.getElementById("Sidenav").offsetWidth;
    if (navSize == 0) {
      return openNav(x);
    }
    return closeNav(x);
}
/* Set the width of the side navigation to 250px */
function openNav(x) {
    document.getElementById("Sidenav").style.width = "100%";
    x.classList.toggle("change");
}
/* Set the width of the side navigation to 0 */
function closeNav(x) {
    document.getElementById("Sidenav").style.width = "0";
    x.classList.toggle("change");
}
