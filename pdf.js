/**
 * LearnStream AI - High-Quality PDF & Printable Notes Generator
 * Formats structured AI notes and mock test diagnostics into a clean,
 * executive academic report suitable for PDF download and printing.
 */

const PDFExporter = {
  exportNotesToPDF(note) {
    if (!note) return;

    // Create a printable iframe/window with clean executive academic typography
    const printWindow = window.open("", "_blank", "width=850,height=900");
    if (!printWindow) {
      alert("Please allow popups to download or print your PDF study notes.");
      return;
    }

    const formulasHtml = (note.keyFormulae || [])
      .map(
        f => `
      <div class="formula-card">
        <div class="formula-name">${f.name}</div>
        <div class="formula-latex"><code>${f.latex}</code></div>
      </div>
    `
      )
      .join("");

    const sectionsHtml = (note.sections || [])
      .map(
        s => `
      <div class="note-section">
        <h3>${s.heading}</h3>
        <p>${s.content.replace(/\n/g, "<br/>")}</p>
      </div>
    `
      )
      .join("");

    const flashcardsHtml = (note.flashcards || [])
      .map(
        fc => `
      <div class="fc-item">
        <div class="fc-q"><strong>Q:</strong> ${fc.front}</div>
        <div class="fc-a"><strong>A:</strong> ${fc.back}</div>
      </div>
    `
      )
      .join("");

    const docHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>LearnStream AI - ${note.topic} Study Notes</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
        <style>
          @page {
            size: A4;
            margin: 20mm;
          }
          body {
            font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
            color: #0f172a;
            background: #ffffff;
            line-height: 1.6;
            margin: 0;
            padding: 24px;
          }
          .header {
            border-bottom: 2px solid #4f46e5;
            padding-bottom: 16px;
            margin-bottom: 24px;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
          }
          .brand {
            font-family: 'Outfit', sans-serif;
            font-size: 24px;
            font-weight: 700;
            color: #4f46e5;
            letter-spacing: -0.5px;
          }
          .badge {
            display: inline-block;
            background: #eef2ff;
            color: #4338ca;
            padding: 4px 10px;
            border-radius: 999px;
            font-size: 11px;
            font-weight: 600;
            margin-top: 4px;
          }
          .meta-info {
            text-align: right;
            font-size: 12px;
            color: #64748b;
          }
          h1 {
            font-family: 'Outfit', sans-serif;
            font-size: 26px;
            color: #1e1b4b;
            margin: 0 0 12px 0;
            line-height: 1.25;
          }
          .executive-summary {
            background: #f8fafc;
            border-left: 4px solid #6366f1;
            padding: 14px 18px;
            border-radius: 0 8px 8px 0;
            margin-bottom: 24px;
            font-size: 14px;
            color: #334155;
          }
          h2 {
            font-family: 'Outfit', sans-serif;
            font-size: 18px;
            color: #312e81;
            border-bottom: 1px solid #e2e8f0;
            padding-bottom: 6px;
            margin-top: 28px;
          }
          .formula-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
            margin-bottom: 24px;
          }
          .formula-card {
            background: #f1f5f9;
            padding: 12px;
            border-radius: 8px;
            border: 1px solid #e2e8f0;
          }
          .formula-name {
            font-size: 12px;
            font-weight: 600;
            color: #475569;
            margin-bottom: 4px;
          }
          .formula-latex {
            font-family: 'JetBrains Mono', monospace;
            font-size: 13px;
            color: #0f172a;
            background: #ffffff;
            padding: 6px 8px;
            border-radius: 4px;
            overflow-x: auto;
          }
          .note-section {
            margin-bottom: 20px;
          }
          .note-section h3 {
            font-size: 15px;
            color: #1e293b;
            margin: 0 0 8px 0;
          }
          .note-section p {
            font-size: 13.5px;
            color: #334155;
            margin: 0;
          }
          .fc-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 10px;
          }
          .fc-item {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            padding: 10px 14px;
            border-radius: 6px;
            font-size: 13px;
          }
          .fc-q {
            color: #1e293b;
            margin-bottom: 4px;
          }
          .fc-a {
            color: #059669;
          }
          .footer {
            margin-top: 40px;
            border-top: 1px solid #e2e8f0;
            padding-top: 12px;
            font-size: 11px;
            color: #94a3b8;
            display: flex;
            justify-content: space-between;
          }
          .print-action-bar {
            position: fixed;
            top: 16px;
            right: 16px;
            background: #ffffff;
            padding: 8px 16px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            border-radius: 999px;
            display: flex;
            gap: 8px;
            z-index: 1000;
          }
          .print-btn {
            background: #4f46e5;
            color: #ffffff;
            border: none;
            padding: 8px 16px;
            border-radius: 999px;
            font-size: 13px;
            font-weight: 600;
            cursor: pointer;
          }
          @media print {
            .print-action-bar { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="print-action-bar">
          <button class="print-btn" onclick="window.print()">🖨️ Print / Save as PDF</button>
        </div>

        <div class="header">
          <div>
            <div class="brand">LearnStream AI</div>
            <div class="badge">Verified AI Study Syllabus</div>
          </div>
          <div class="meta-info">
            <div><strong>Generated:</strong> ${new Date().toLocaleDateString()}</div>
            <div><strong>Topic Discipline:</strong> ${note.subject ? note.subject.toUpperCase() : "GENERAL"}</div>
            <div><strong>Estimated Time:</strong> ${note.readTime || "5 min read"}</div>
          </div>
        </div>

        <h1>${note.topic}</h1>

        <div class="executive-summary">
          <strong>Executive Summary:</strong><br/>
          ${note.summary}
        </div>

        ${
          formulasHtml
            ? `
          <h2>Core Mathematical & Algorithmic Formulations</h2>
          <div class="formula-grid">${formulasHtml}</div>
        `
            : ""
        }

        <h2>Deep-Dive Concept Explanations</h2>
        ${sectionsHtml}

        ${
          flashcardsHtml
            ? `
          <h2>Active Recall & Spaced Repetition Cards</h2>
          <div class="fc-grid">${flashcardsHtml}</div>
        `
            : ""
        }

        <div class="footer">
          <div>LearnStream AI • Precision Learning for Ambitious Minds</div>
          <div>Page 1 of 1</div>
        </div>

        <script>
          // Automatically trigger print dialog after styles render
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 600);
          };
        </script>
      </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(docHtml);
    printWindow.document.close();
  },

  exportTestReport(testTitle, score, maxScore, percentage, timeSpent, reviewList) {
    const printWindow = window.open("", "_blank", "width=850,height=900");
    if (!printWindow) {
      alert("Please allow popups to download or print your test report.");
      return;
    }

    const questionsHtml = reviewList
      .map(
        (item, index) => `
      <div style="margin-bottom: 16px; padding: 12px; border: 1px solid #e2e8f0; border-radius: 8px; background: ${
        item.isCorrect ? "#f0fdf4" : "#fef2f2"
      }">
        <div style="font-weight: 600; color: #1e293b; margin-bottom: 6px;">Q${index + 1}: ${item.question}</div>
        <div style="font-size: 13px; color: ${item.isCorrect ? "#166534" : "#991b1b"}">
          <strong>Your Answer:</strong> ${item.selectedAnswer || "Not Answered"} (${item.isCorrect ? "Correct" : "Incorrect"})
        </div>
        ${!item.isCorrect ? `<div style="font-size: 13px; color: #166534;"><strong>Correct Answer:</strong> ${item.correctAnswer}</div>` : ""}
        <div style="font-size: 12px; color: #475569; margin-top: 6px; border-top: 1px dashed #cbd5e1; padding-top: 4px;">
          <strong>AI Explanation:</strong> ${item.explanation}
        </div>
      </div>
    `
      )
      .join("");

    const reportHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>LearnStream AI - Diagnostic Report: ${testTitle}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 32px; color: #0f172a; }
          .header { border-bottom: 2px solid #6366f1; padding-bottom: 12px; margin-bottom: 20px; }
          .title { font-size: 22px; font-weight: bold; color: #1e1b4b; }
          .score-banner { display: flex; gap: 20px; background: #f8fafc; padding: 16px; border-radius: 8px; margin-bottom: 24px; }
          .metric { flex: 1; text-align: center; }
          .metric-val { font-size: 24px; font-weight: bold; color: #4f46e5; }
          .metric-lbl { font-size: 12px; color: #64748b; }
        </style>
      </head>
      <body>
        <div class="header">
          <div style="color: #6366f1; font-weight: bold; font-size: 16px;">LearnStream AI • Examination Diagnostic Report</div>
          <div class="title">${testTitle}</div>
          <div style="font-size: 12px; color: #64748b;">Completed on ${new Date().toLocaleString()}</div>
        </div>

        <div class="score-banner">
          <div class="metric"><div class="metric-val">${score} / ${maxScore}</div><div class="metric-lbl">Total Score</div></div>
          <div class="metric"><div class="metric-val">${Math.round(percentage)}%</div><div class="metric-lbl">Accuracy</div></div>
          <div class="metric"><div class="metric-val">${timeSpent}</div><div class="metric-lbl">Time Elapsed</div></div>
          <div class="metric"><div class="metric-val">${percentage >= 70 ? "PASSED" : "REVIEW NEEDED"}</div><div class="metric-lbl">Result Status</div></div>
        </div>

        <h3>Question-by-Question Breakdown</h3>
        ${questionsHtml}

        <script>
          window.onload = function() { setTimeout(function() { window.print(); }, 500); };
        </script>
      </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(reportHtml);
    printWindow.document.close();
  }
};

window.PDFExporter = PDFExporter;
