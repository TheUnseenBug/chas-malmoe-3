let on = false;
let history = [];
function onOff(value) {
  on = value;
  console.log(on);
}

function calculator(appendToDisplay) {
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
      const expression = document.getElementById("display").value;
      const result = calc(expression);
      document.getElementById("display").value = result;
      
      // Save the calculation to history
      history.push(`${expression} = ${result}`);

      // Limit history to last 10 calculations (optional)
      if (history.length > 10) {
        history.shift();
      }
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
}

while (on === true) {
  calculator();
}
