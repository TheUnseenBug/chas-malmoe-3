//Visar värdet i display och adderar strängar genom +=
function appendToDisplay(value) {
  document.getElementById("display").value += value;
}

//Sätter värdet i display till en tom sträng
function clearDisplay() {
  document.getElementById("display").value = "";
}

//Black magic dont touch
//Omvandlar strängar till nummer och operatörer. Så tex "ett plus två" omvandlas till "1 + 2".
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
