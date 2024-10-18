function appendToDisplay(value) {
  document.getElementById("display").value += Number(value);
}
function clearDisplay() {
  document.getElementById("display").value = "";
}
function calculate() {
  console.log(typeof document.getElementById("display").value);
  try {
    document.getElementById("display").value = Number(
      document.getElementById("display").value
    );
  } catch (error) {
    document.getElementById("display").value = "Error";
  }
}
function backspace() {
  let currentValue = document.getElementById("display").value;
  document.getElementById("display").value = currentValue.slice(0, -1);
}
