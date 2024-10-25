function calculator() {
  // här skapar vi variabeln result som vi sparar resultaten av uträkningarna i.

  let continueCalulating = true;
  let history = [];

  while (continueCalulating) {
    let result;
    //Vi samlar in data num1, num2, och vilken operatör som ska användas från användaren genom prompt och använder Number() funktionen för att datan från propmt ska omvandlas till typen Number.
    const num1 = Number(window.prompt("Ange ett nummer", ""));
    const operator = window.prompt(
      "Vilken operator vill du använda? Du kan använda +, -, *, /, %, (^)",
      ""
    );
    const num2 = Number(window.prompt("Ange ytterligare ett nummer", ""));
    //Har kollar vi så att num1 och num2 verkligen är nummer om de inte är det stoppar funktionen och användaren får en alert. Om dem är det körs en switch case med operatorn som väljer vilket case.
    if (isNaN(num1) || isNaN(num2)) {
      continueCalulating = confirm(
        "Du angav ett ogiltigt nummer. Vill du försöka igen?"
      );
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
            num2 === 0
              ? "Det går ej att dividera med 0."
              : (result = num1 / num2);
          break;

        case "%":
          result = num1 % num2;
          break;
        case "(^)":
          result = num1 ** num2;
          break;

        default:
          result = `felaktigt. \nAnge någon operatör av  * ,  + ,  - ,  /, %, (^)`;
          break;
      }

      // Save the calculation to history
      history.push(`${num1} ${operator} ${num2} = ${result}`);
      // Limit history to last 10 calculations
      if (history.length > 10) {
        history.shift();
      }

      console.log(history);

      //En alert som ger resultatet till användaren genom en alert.
      continueCalulating = confirm(
        `${num1} ${operator} ${num2} = ${result}. \nVill du fortsätta räkna kul och spännande uträkningar?`
      );
    }
    return result;
  }
}

//Kallar funktionen så den faktiskt körs
calculator();
