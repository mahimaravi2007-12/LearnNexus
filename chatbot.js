/**
 * LearnStream AI - Conversational Tutor Copilot
 * Context-aware AI pedagogical tutor supporting streaming markdown responses,
 * quick suggestion pills, code highlights, and interactive action triggers.
 */

class AICopilot {
  constructor() {
    this.messages = [
      {
        sender: "bot",
        text: "👋 Hello Alex! I am your **LearnStream AI Copilot**. Whether you need an intuitive analogy, a mathematical proof, practice questions, or a study schedule breakdown, I'm here 24/7. What are we mastering today?"
      }
    ];
    this.isStreaming = false;
  }

  init() {
    this.renderMessages("copilot-messages-container");
    this.renderMessages("floating-copilot-messages");
  }

  sendMessage(userQuery, targetContainerId = "copilot-messages-container") {
    if (!userQuery || !userQuery.trim() || this.isStreaming) return;
    const cleanText = userQuery.trim();

    // Add user message
    this.messages.push({ sender: "user", text: cleanText });
    this.renderMessages(targetContainerId);

    if (window.soundEngine) window.soundEngine.playClick();

    // Generate smart response based on knowledge base
    this.generateResponse(cleanText, targetContainerId);
  }

  generateResponse(query, targetContainerId) {
    this.isStreaming = true;
    const qLower = query.toLowerCase();

    let responseMarkdown = "";

    if (qLower.includes("backprop") || qLower.includes("neural") || qLower.includes("gradient")) {
      responseMarkdown = `### 🧠 Neural Networks & Backpropagation Explained\n\n` +
        `Think of training a neural network like tuning a complex radio with **thousands of tiny dials** (weights):\n\n` +
        `1. **Forward Pass:** You feed music signals into the radio and listen to the output. If it sounds noisy (high error $E$), you measure how far off it is using a **Loss Function**:\n` +
        `   $$L = \\frac{1}{2}(y - \\hat{y})^2$$\n` +
        `2. **Backward Pass (The Chain Rule):** Backprop works backwards from the speaker to the antenna, calculating exactly which knob contributed most to the static:\n` +
        `   $$\\frac{\\partial L}{\\partial W^{[l]}} = \\delta^{[l]} (a^{[l-1]})^T$$\n` +
        `3. **Weight Update:** We nudge each dial in the exact opposite direction of the slope using learning rate $\\alpha$.\n\n` +
        `💡 *Pro Tip:* Use **ReLU** instead of **Sigmoid** to avoid vanishing gradients in deep architectures!`;
    } else if (qLower.includes("transformer") || qLower.includes("attention") || qLower.includes("gpt")) {
      responseMarkdown = `### ⚡ Transformer Self-Attention In Depth\n\n` +
        `Standard RNNs process words one by one like a conveyor belt. **Transformers process the entire book simultaneously.**\n\n` +
        `Each token is projected into three distinct vectors:\n` +
        `- **Query ($Q$):** What am I searching for?\n` +
        `- **Key ($K$):** What attributes do I possess?\n` +
        `- **Value ($V$):** What informative content do I hold?\n\n` +
        `The universal scaled dot-product attention equation is:\n` +
        `$$\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right) V$$\n\n` +
        `Multi-head attention lets the model simultaneously attend to grammar, semantic context, and pronoun references in distinct subspace representations!`;
    } else if (qLower.includes("dijkstra") || qLower.includes("graph") || qLower.includes("a*") || qLower.includes("shortest path")) {
      responseMarkdown = `### 🗺️ Dijkstra vs. A* Pathfinding\n\n` +
        `Here is the primary difference in algorithmic strategy:\n\n` +
        `\`\`\`python\n# Dijkstra: Explores equally in all directions (greedy BFS with min-heap)\nimport heapq\n\ndef dijkstra(graph, start):\n    distances = {node: float('inf') for node in graph}\n    distances[start] = 0\n    pq = [(0, start)]\n    \n    while pq:\n        curr_dist, u = heapq.heappop(pq)\n        if curr_dist > distances[u]: continue\n        for v, weight in graph[u].items():\n            if distances[u] + weight < distances[v]:\n                distances[v] = distances[u] + weight\n                heapq.heappush(pq, (distances[v], v))\n    return distances\n\`\`\`\n\n` +
        `**A* Search** adds a heuristic $h(n)$ to prioritize directions pointing directly at your target, drastically slashing expanded node count!`;
    } else if (qLower.includes("quantum") || qLower.includes("qubit") || qLower.includes("entangle")) {
      responseMarkdown = `### ⚛️ Quantum Superposition & Qubits\n\n` +
        `A classical bit is an on/off light switch ($0$ or $1$).\n` +
        `A **Qubit** is a point on a sphere surface (The **Bloch Sphere**):\n` +
        `$$|\\psi\\rangle = \\cos(\\theta/2)|0\\rangle + e^{i\\phi}\\sin(\\theta/2)|1\\rangle$$\n\n` +
        `When two qubits enter a **Bell State**, their probabilities become physically intertwined. Measuring one immediately dictates the other, regardless of spatial distance.`;
    } else if (qLower.includes("event loop") || qLower.includes("javascript") || qLower.includes("promise")) {
      responseMarkdown = `### 🔄 JavaScript Event Loop Priority Order\n\n` +
        `The browser runtime evaluates code in this strict sequence:\n` +
        `1. **Synchronous Call Stack:** Executes right now until completely empty.\n` +
        `2. **Microtask Queue:** \`Promise.then()\`, \`queueMicrotask()\`, \`MutationObserver\`. **All pending microtasks drain before any macrotask starts!**\n` +
        `3. **Render Pipeline:** Styles, layout, paint (if interval hit).\n` +
        `4. **Macrotask (Task Queue):** \`setTimeout\`, \`setInterval\`, I/O callbacks.\n\n` +
        `⚠️ *Caution:* A recursive microtask will starve the UI and freeze browser rendering completely!`;
    } else {
      responseMarkdown = `### 💡 Analysis on: "${query}"\n\n` +
        `Here is the conceptual breakdown synthesized by LearnStream AI:\n\n` +
        `- **Core Principle:** This concept forms a vital building block in contemporary computational science and quantitative modeling.\n` +
        `- **Key Takeaway:** Always ground theoretical formulations in demonstrable small-scale implementations before scaling up complexity.\n` +
        `- **Recommended Next Step:** Check out the Auto Notes tab to generate a full cheat-sheet or launch an AI Quiz to test your active recall!`;
    }

    // Stream the markdown into the chat UI
    this.streamTextIntoChat(responseMarkdown, targetContainerId);
  }

  streamTextIntoChat(markdownText, containerId) {
    const botMsgIndex = this.messages.length;
    this.messages.push({ sender: "bot", text: "" });

    let current = "";
    let i = 0;
    const chunkSize = 4; // characters per tick for smooth swift stream

    const interval = setInterval(() => {
      if (i < markdownText.length) {
        current += markdownText.slice(i, i + chunkSize);
        i += chunkSize;
        this.messages[botMsgIndex].text = current;
        this.renderMessages(containerId, true);
      } else {
        clearInterval(interval);
        this.messages[botMsgIndex].text = markdownText;
        this.isStreaming = false;
        this.renderMessages(containerId, false);
      }
    }, 20);
  }

  formatMarkdown(raw) {
    let out = raw
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // Math block $$...$$
    out = out.replace(/\$\$(.*?)\$\$/g, '<div class="latex-math-block">$1</div>');
    // Inline math $...$
    out = out.replace(/\$(.*?)\$/g, '<span class="latex-math-inline">$1</span>');

    // Code blocks ```lang ... ```
    out = out.replace(/```([a-z]*)\n([\s\S]*?)```/g, (match, lang, code) => {
      return `<pre class="code-block-wrapper"><div class="code-header"><span>${lang || "code"}</span><button class="copy-btn" onclick="navigator.clipboard.writeText(this.parentElement.nextElementSibling.textContent); this.textContent='Copied!'; setTimeout(()=>this.textContent='Copy', 1500);">Copy</button></div><code>${code}</code></pre>`;
    });

    // Inline code `...`
    out = out.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');

    // Headers
    out = out.replace(/^### (.*$)/gim, '<h4 class="chat-h4">$1</h4>');
    out = out.replace(/^## (.*$)/gim, '<h3 class="chat-h3">$1</h3>');

    // Bold & italic
    out = out.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    out = out.replace(/\*(.*?)\*/g, "<em>$1</em>");

    // Bullet points
    out = out.replace(/^\- (.*$)/gim, '<li class="chat-li">$1</li>');

    // Line breaks
    out = out.replace(/\n\n/g, '<div class="chat-gap"></div>');
    out = out.replace(/\n/g, "<br/>");

    return out;
  }

  renderMessages(containerId, isStreaming = false) {
    const el = document.getElementById(containerId);
    if (!el) return;

    el.innerHTML = this.messages
      .map((msg, idx) => {
        const isUser = msg.sender === "user";
        const formatted = this.formatMarkdown(msg.text);
        const showCursor = isStreaming && idx === this.messages.length - 1 && !isUser;

        return `
        <div class="chat-bubble-row ${isUser ? "user-row" : "bot-row"}">
          ${
            !isUser
              ? `<div class="chat-avatar bot-avatar"><i class="fas fa-brain"></i></div>`
              : `<div class="chat-avatar user-avatar"><i class="fas fa-user"></i></div>`
          }
          <div class="chat-bubble ${isUser ? "user-bubble" : "bot-bubble"}">
            ${formatted}
            ${showCursor ? '<span class="streaming-cursor"></span>' : ""}
          </div>
        </div>
      `;
      })
      .join("");

    // Auto-scroll to bottom
    el.scrollTop = el.scrollHeight;
  }

  clearChat(containerId = "copilot-messages-container") {
    this.messages = [
      {
        sender: "bot",
        text: "✨ Chat cleared. What concept or problem shall we tackle next?"
      }
    ];
    this.renderMessages(containerId);
  }
}

window.aiCopilot = new AICopilot();
