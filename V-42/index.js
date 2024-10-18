function calculator() {
  let result;
  const num1 = Number(window.prompt("Ange ett nummer", ""));
  const operator = window.prompt(
    "Vilken operator vill du använda? Du kan använda +, -, *, /, %",
    ""
  );
  const num2 = Number(window.prompt("Ange ytterligare ett nummer", ""));
  if (isNaN(num1) || isNaN(num2)) {
    window.alert(
      "Du angav ej ett giltigt nummer, ladda om sidan och påbörja på nytt."
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

      case "/":
        if (num1 || num2 === 0) {
          result = "Det går ej att dividera med 0";
        } else {
          result = num1 / num2;
        }
        break;

      case "%":
        result = num1 % num2;
        break;

      default:
        result = `felaktigt, Ange någon operatör av  * ,  + ,  - ,  /, %`;
        break;
    }

    window.alert(
      ` Första nummret du gav är ${num1}, operatorn du angav är ${operator}, sista nummret du gett är ${num2}. Ditt resultat blev ${result}. `
    );
  }
  console.log(
    ` Första nummret du gav är ${num1}, operatorn du angav är ${operator}, sista nummret du gett är ${num2}. Ditt resultat blev ${result}. `
  );
  return result;
}
calculator();
