const elements = {
  button: document.querySelector("#check-api"),
  statusPill: document.querySelector("#status-pill"),
  statusLabel: document.querySelector("#status-label"),
  location: document.querySelector("#location-value"),
  response: document.querySelector("#response-value"),
  request: document.querySelector("#request-value"),
  note: document.querySelector("#runtime-note"),
  year: document.querySelector("#year"),
};

const setStatus = (state, label) => {
  elements.statusPill.dataset.state = state;
  elements.statusLabel.textContent = label;
};

const checkEdgeFunction = async () => {
  const startedAt = performance.now();

  elements.button.disabled = true;
  setStatus("loading", "Checking");
  elements.response.textContent = "Pending";
  elements.note.textContent = "Contacting /api/status…";

  try {
    const response = await fetch("/api/status", {
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Request failed with ${response.status}`);
    }

    const payload = await response.json();
    const elapsed = Math.round(performance.now() - startedAt);

    elements.location.textContent = payload.location ?? "Cloudflare edge";
    elements.response.textContent = `${elapsed} ms`;
    elements.request.textContent = payload.requestId ?? "Available";
    elements.note.textContent = `Healthy at ${new Date(payload.timestamp).toLocaleTimeString()}.`;
    setStatus("success", "Online");
  } catch (error) {
    elements.response.textContent = "Unavailable";
    elements.request.textContent = "—";
    elements.note.textContent =
      location.hostname === "localhost" || location.hostname === "127.0.0.1"
        ? "Static preview active. The Function runs with Cloudflare Pages development or deployment."
        : "The edge endpoint could not be reached. Try again in a moment.";
    setStatus("error", "Offline");
    console.error(error);
  } finally {
    elements.button.disabled = false;
  }
};

elements.button.addEventListener("click", checkEdgeFunction);
elements.year.textContent = new Date().getFullYear();
