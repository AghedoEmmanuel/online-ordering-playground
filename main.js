import { loadPyodide } from "https://cdn.jsdelivr.net/pyodide/v0.26.2/full/pyodide.mjs";

const codeEl = document.getElementById("code");
const runBtn = document.getElementById("run");
const outEl = document.getElementById("output");

function write(line) {
  outEl.textContent += line + "\n";
}

outEl.textContent = "Loading Pyodide...\n";

const pyodide = await loadPyodide({
  stdout: (s) => write(s),
  stderr: (s) => write(s),
});

write("Ready.\n");

runBtn.addEventListener("click", async () => {
  outEl.textContent = "";
  try {
    await pyodide.runPythonAsync(codeEl.value);
  } catch (err) {
    write(String(err));
  }
});