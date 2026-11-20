const OTbutton = document.getElementById("other-button");

  OTbutton.addEventListener("click", () => {
    OTbutton.classList.add("fly-left");

    setTimeout(() => {
      window.location.href = "../PAGES/SRC/REPAIRS/other_device.html";
    }, 363);
});

const HMbutton = document.getElementById("home-button");

  HMbutton.addEventListener("click", () => {
    HMbutton.classList.add("fly-right");

    setTimeout(() => {
      // window.location.href = "../PAGES/SRC/REPAIRS/home_device.html";
      window.location.href = "../SRC/ITEMS/error.html";
    }, 363);
});