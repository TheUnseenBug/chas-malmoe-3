let on = false;
function onOff(value) {
  on = value;
  console.log(on);
}
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
//Visar värdet i display och adderar strängar genom +=
function appendToDisplay(value) {
  document.getElementById("display").value += value;
}

//Sätter värdet i display till en tom sträng
function clearDisplay() {
  document.getElementById("display").value = "";
}
//calc skapar en ny funktion som har inputs return och kallar den, den nya funktionen har då värdet return + value som nu t.ex. är return 5 + 5.
function calc(value) {
  return new Function("return " + value)();
}

//Räknar ut svaret med hjälp av calc funktionen
function calculate() {
  try {
    document.getElementById("display").value = calc(
      document.getElementById("display").value
    );
  } catch (error) {
    document.getElementById("display").value = "Error";
  }
}

//Tar bort sista värdet i string
function backspace() {
  document.getElementById("display").value = document
    .getElementById("display")
    .value.slice(0, -1);
}

while (on === true) {}
