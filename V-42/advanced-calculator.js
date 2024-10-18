function appendToDisplay(value) {
  document.getElementById("display").value += value;
}
function clearDisplay() {
  document.getElementById("display").value = "";
}

function calc(value) {
  return new Function("return " + value)();
}

function calculate() {
  try {
    document.getElementById("display").value = calc(
      document.getElementById("display").value
    );
  } catch (error) {
    document.getElementById("display").value = "Error";
  }
}
