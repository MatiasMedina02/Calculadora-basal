const calculatorForm = document.querySelector("#calculator_form");
const inputWeight = document.querySelector(".weight");
const error = document.querySelector(".error");
const containerResults = document.querySelector("#container_results");

inputWeight.addEventListener("input", event => {
  let inputValue = event.target.value;

  inputValue = inputValue.replace(/\D/g, '').slice(0, 3);

  inputWeight.value = inputValue;
  error.textContent = "";
});

calculatorForm.addEventListener("submit", event => {
  event.preventDefault();

  containerResults.innerHTML = "";

  const weight = inputWeight.value;

  if (!weight) error.textContent = "Debe completar todos los datos";

  if (weight > 0 && weight <= 30) {
    calculateHollidaySegar(weight);
  }

  if (weight > 30) {
    calculateBodySurface(weight);
  }

  inputWeight.value = "";
});

// Method Holliday-Segar
const calculateHollidaySegar = weight => {
  const result = firstMethod(weight);
  const dayMaintenance = Math.ceil(result / 24);
  const dayFlux = Math.ceil(dayMaintenance * 1.5);

  createResultElement(`- Volumen diario: ${result} cc`);
  createResultElement(`- Mantenimiento: ${dayMaintenance} cc/hr`);
  createResultElement(`- m+m/2: ${dayFlux} cc/hr`);
};

// Method Body Surface
const calculateBodySurface = weight => {
  const result = ((weight * 4) + 7) / (weight + 90);
  const bodySurface1 = Math.ceil(result * 1500);
  const bodySurface2 = Math.ceil(result * 2000);

  createResultElement(`- Volumen diario 1: ${bodySurface1} cc`);
  createResultElement(`- Volumen diario 2: ${bodySurface2} cc`);
};

const firstMethod = weight => {
  let volume;

  if (weight <= 10) {
    volume = weight * 100;
  } else if (weight <= 20) {
    volume = 10 * 100 + (weight - 10) * 50;
  } else {
    volume = 10 * 100 + 10 * 50 + (weight - 20) * 20;
  }

  return volume;
};

const createResultElement = text => {
  const element = document.createElement("p");
  element.textContent = text;
  element.classList = "result";
  containerResults.appendChild(element);
}