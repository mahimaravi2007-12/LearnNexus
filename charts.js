/**
 * LearnStream AI - High-Performance Canvas Chart Engine
 * Renders glowing Radar Charts, Weekly Study Trajectory Bar Charts,
 * and Circular Diagnostic Donut Gauges with high-DPI crispness.
 */

const ChartEngine = {
  isDarkMode() {
    return document.documentElement.getAttribute("data-theme") !== "light";
  },

  setupCanvas(canvas) {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const width = rect.width || canvas.width;
    const height = rect.height || canvas.height;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);
    return { ctx, width, height };
  },

  // 1. Radar / Spider Mastery Chart
  renderRadarChart(canvasId, labels, studentScores, cohortScores) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const { ctx, width, height } = this.setupCanvas(canvas);
    const dark = this.isDarkMode();

    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) - 36;
    const totalAxes = labels.length;
    const angleStep = (Math.PI * 2) / totalAxes;

    ctx.clearRect(0, 0, width, height);

    // Draw concentric polygon webs
    const gridLevels = 5;
    for (let level = 1; level <= gridLevels; level++) {
      const r = (radius / gridLevels) * level;
      ctx.beginPath();
      for (let i = 0; i < totalAxes; i++) {
        const angle = i * angleStep - Math.PI / 2;
        const x = centerX + Math.cos(angle) * r;
        const y = centerY + Math.sin(angle) * r;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = dark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.06)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Draw level number
      if (level % 2 === 0) {
        ctx.fillStyle = dark ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.3)";
        ctx.font = "10px sans-serif";
        ctx.fillText(`${level * 20}%`, centerX + 4, centerY - r + 10);
      }
    }

    // Draw radial spoke lines & labels
    for (let i = 0; i < totalAxes; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.strokeStyle = dark ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.08)";
      ctx.stroke();

      // Text position
      const labelX = centerX + Math.cos(angle) * (radius + 20);
      const labelY = centerY + Math.sin(angle) * (radius + 20);

      ctx.fillStyle = dark ? "#cbd5e1" : "#334155";
      ctx.font = "bold 11px 'Plus Jakarta Sans', sans-serif";
      ctx.textAlign = Math.abs(Math.cos(angle)) < 0.2 ? "center" : Math.cos(angle) > 0 ? "left" : "right";
      ctx.textBaseline = "middle";
      ctx.fillText(labels[i], labelX, labelY);
    }

    // Draw Cohort Average Polygon
    if (cohortScores) {
      ctx.beginPath();
      for (let i = 0; i < totalAxes; i++) {
        const val = cohortScores[i] / 100;
        const angle = i * angleStep - Math.PI / 2;
        const x = centerX + Math.cos(angle) * (radius * val);
        const y = centerY + Math.sin(angle) * (radius * val);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fillStyle = dark ? "rgba(148, 163, 184, 0.12)" : "rgba(100, 116, 139, 0.1)";
      ctx.fill();
      ctx.strokeStyle = "rgba(148, 163, 184, 0.5)";
      ctx.setLineDash([4, 4]);
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Draw Student Polygon
    ctx.beginPath();
    for (let i = 0; i < totalAxes; i++) {
      const val = studentScores[i] / 100;
      const angle = i * angleStep - Math.PI / 2;
      const x = centerX + Math.cos(angle) * (radius * val);
      const y = centerY + Math.sin(angle) * (radius * val);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();

    // Student fill gradient
    const grad = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, radius);
    grad.addColorStop(0, "rgba(99, 102, 241, 0.45)");
    grad.addColorStop(1, "rgba(168, 85, 247, 0.2)");
    ctx.fillStyle = grad;
    ctx.fill();

    ctx.strokeStyle = "#818cf8";
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Data points
    for (let i = 0; i < totalAxes; i++) {
      const val = studentScores[i] / 100;
      const angle = i * angleStep - Math.PI / 2;
      const x = centerX + Math.cos(angle) * (radius * val);
      const y = centerY + Math.sin(angle) * (radius * val);

      ctx.beginPath();
      ctx.arc(x, y, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = "#a855f7";
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  },

  // 2. Weekly Study Hours Bar Chart
  renderBarChart(canvasId, weeklyHours) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const { ctx, width, height } = this.setupCanvas(canvas);
    const dark = this.isDarkMode();

    const padding = { top: 24, right: 20, bottom: 32, left: 36 };
    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;

    ctx.clearRect(0, 0, width, height);

    const maxVal = 5.0; // scale up to 5 hours max
    const barCount = weeklyHours.length;
    const slotW = chartW / barCount;
    const barW = Math.min(slotW * 0.45, 28);

    // Draw horizontal guidelines
    const stepLines = 4;
    for (let i = 0; i <= stepLines; i++) {
      const val = (maxVal / stepLines) * i;
      const y = padding.top + chartH - (val / maxVal) * chartH;

      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(padding.left + chartW, y);
      ctx.strokeStyle = dark ? "rgba(255, 255, 255, 0.06)" : "rgba(0, 0, 0, 0.05)";
      ctx.stroke();

      ctx.fillStyle = dark ? "rgba(255, 255, 255, 0.4)" : "rgba(0, 0, 0, 0.4)";
      ctx.font = "10px 'Plus Jakarta Sans', sans-serif";
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      ctx.fillText(`${val.toFixed(1)}h`, padding.left - 6, y);
    }

    // Draw bars
    weeklyHours.forEach((item, idx) => {
      const x = padding.left + idx * slotW + (slotW - barW) / 2;
      const barH = (item.hours / maxVal) * chartH;
      const y = padding.top + chartH - barH;

      // Rounded bar top
      const r = Math.min(barW / 2, 6);
      ctx.beginPath();
      ctx.moveTo(x, y + barH);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.lineTo(x + barW - r, y);
      ctx.quadraticCurveTo(x + barW, y, x + barW, y + r);
      ctx.lineTo(x + barW, y + barH);
      ctx.closePath();

      // Gradient
      const grad = ctx.createLinearGradient(0, y, 0, y + barH);
      if (item.hours >= item.goal) {
        grad.addColorStop(0, "#06b6d4");
        grad.addColorStop(1, "#3b82f6");
      } else {
        grad.addColorStop(0, "#818cf8");
        grad.addColorStop(1, "#6366f1");
      }
      ctx.fillStyle = grad;
      ctx.fill();

      // Top value label
      ctx.fillStyle = dark ? "#f8fafc" : "#1e293b";
      ctx.font = "bold 10px 'Plus Jakarta Sans', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(`${item.hours}h`, x + barW / 2, y - 6);

      // Day label
      ctx.fillStyle = dark ? "#94a3b8" : "#64748b";
      ctx.font = "500 11px 'Plus Jakarta Sans', sans-serif";
      ctx.fillText(item.day, x + barW / 2, height - padding.bottom + 16);
    });

    // Draw Average Target Goal Dashed Line (2.0 hours)
    const goalY = padding.top + chartH - (2.0 / maxVal) * chartH;
    ctx.beginPath();
    ctx.setLineDash([5, 4]);
    ctx.moveTo(padding.left, goalY);
    ctx.lineTo(padding.left + chartW, goalY);
    ctx.strokeStyle = "#10b981";
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.setLineDash([]);
  },

  // 3. Circular Donut Gauge for Test Performance / Accuracy
  renderDonutGauge(canvasId, percentage, labelText, customColor = null) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const { ctx, width, height } = this.setupCanvas(canvas);
    const dark = this.isDarkMode();

    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) - 16;
    const lineWidth = 14;

    ctx.clearRect(0, 0, width, height);

    // Background track ring
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.strokeStyle = dark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.06)";
    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round";
    ctx.stroke();

    // Progress arc
    const startAngle = -Math.PI / 2;
    const progressAngle = startAngle + (Math.PI * 2 * (percentage / 100));

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, progressAngle);

    let strokeColor = customColor;
    if (!strokeColor) {
      if (percentage >= 80) strokeColor = "#10b981";
      else if (percentage >= 60) strokeColor = "#6366f1";
      else strokeColor = "#f59e0b";
    }

    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round";
    ctx.stroke();

    // Inner Percentage Text
    ctx.fillStyle = dark ? "#f8fafc" : "#0f172a";
    ctx.font = "bold 26px 'Outfit', sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`${Math.round(percentage)}%`, centerX, centerY - (labelText ? 6 : 0));

    if (labelText) {
      ctx.fillStyle = dark ? "#94a3b8" : "#64748b";
      ctx.font = "500 11px 'Plus Jakarta Sans', sans-serif";
      ctx.fillText(labelText, centerX, centerY + 18);
    }
  }
};

window.ChartEngine = ChartEngine;
