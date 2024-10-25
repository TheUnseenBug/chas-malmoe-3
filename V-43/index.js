let operator = "";
let numbers = "0";
function setOperator(value) {
  document.getElementById("display").value += value;
  operator = value;
}

//Visar värdet i display och adderar strängar genom +=
function appendToDisplay(value) {
  document.getElementById("display").value += value;
  numbers = document.getElementById("display").value;
}
console.log(document.getElementById("display").value.at(-1));

//Tar bort sista värdet i string
function backspace() {
  if (document.getElementById("display").value.at(-1)) {
  }
  document.getElementById("display").value = document
    .getElementById("display")
    .value.slice(0, -1);
}

//Sätter värdet i display till en tom sträng
function clearDisplay() {
  document.getElementById("display").value = "";
}

function calculator() {
  // här skapar vi variabeln result som vi sparar resultaten av uträkningarna i.
  let result;
  //Vi samlar in data num1, num2, och vilken operatör som ska användas från användaren genom prompt och använder Number() funktionen för att datan från propmt ska omvandlas till typen Number.
  // const num1 = Number(window.prompt("Ange ett nummer", ""));
  // const operator = window.prompt(
  //   "Vilken operator vill du använda? Du kan använda +, -, *, /, %, (^)",
  //   ""
  // );
  // const num2 = Number(window.prompt("Ange ytterligare ett nummer", ""));
  //Har kollar vi så att num1 och num2 verkligen är nummer om de inte är det stoppar funktionen och användaren får en alert. Om dem är det körs en switch case med operatorn som väljer vilket case.
  if (isNaN(num1) || isNaN(num2)) {
    // window.alert(
    //  "Du angav ej ett giltigt nummer, ladda om sidan och påbörja på nytt."
    //;
    return;
  } else {
    switch (operator) {
      case "+":
        result = num1 + num2;
        break;
      case "-":
        result = num1 - num2;
        break;

      case "*":
        result = num1 * num2;
        break;
      //Här har vi en if sats för att garantera att användaren inte dividerar med 0
      case "/":
        result =
          num2 === 0 ? "Det går ej att dividera med 0" : (result = num1 / num2);
        break;

      case "%":
        result = num1 % num2;
        break;
      case "(^)":
        result = num1 ** num2;
        break;

      default:
        result = `felaktigt, Ange någon operatör av  * ,  + ,  - ,  /, %, (^)`;
        break;
    }
    //En alert som ger resultatet till användaren genom en alert.
    window.alert(
      ` Första nummret du gav är ${num1}, operatorn du angav är ${operator}, sista nummret du gett är ${num2}. Ditt resultat blev ${result}. `
    );
  }
  //Loggar resultatet
  console.log(
    ` Första nummret du gav är ${num1}, operatorn du angav är ${operator}, sista nummret du gett är ${num2}. Ditt resultat blev ${result}. `
  );
  return result;
}
//Kallar på funktionen om man klickar på "ON" knappen
const on = false;
while ((on = true)) {
  calculator();
}
