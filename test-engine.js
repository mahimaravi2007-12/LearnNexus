/**
 * LearnStream AI - High-Stakes Online Mock Examination Simulator
 * Handles timed test execution, question palette navigation, flagging,
 * state persistence, and automatic diagnostic reporting.
 */

class MockTestEngine {
  constructor() {
    this.currentTest = null;
    this.currentIndex = 0;
    this.userAnswers = {}; // { questionId: selectedOptionIndex }
    this.flaggedQuestions = new Set();
    this.visitedQuestions = new Set();
    this.timerInterval = null;
    this.remainingSeconds = 0;
    this.totalSeconds = 0;
    this.isCompleted = false;
    this.startTime = null;
    this.endTime = null;
  }

  loadTest(testId) {
    const test = window.LEARN_STREAM_DATA.mockTests.find(t => t.id === testId);
    if (!test) return false;

    this.currentTest = JSON.parse(JSON.stringify(test));
    this.currentIndex = 0;
    this.userAnswers = {};
    this.flaggedQuestions.clear();
    this.visitedQuestions.clear();
    this.isCompleted = false;
    this.totalSeconds = (test.durationMinutes || 20) * 60;
    this.remainingSeconds = this.totalSeconds;
    this.startTime = new Date();
    this.visitedQuestions.add(0);

    this.startTimer();
    return true;
  }

  startTimer() {
    if (this.timerInterval) clearInterval(this.timerInterval);

    this.timerInterval = setInterval(() => {
      if (this.remainingSeconds > 0) {
        this.remainingSeconds--;
        this.renderTimerDisplay();

        // 1-minute warning chime
        if (this.remainingSeconds === 60 && window.soundEngine) {
          window.soundEngine.playTimerWarning();
        }
      } else {
        clearInterval(this.timerInterval);
        this.finishTest(true);
      }
    }, 1000);
  }

  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }

  renderTimerDisplay() {
    const timerEl = document.getElementById("test-timer-display");
    if (timerEl) {
      timerEl.textContent = this.formatTime(this.remainingSeconds);
      if (this.remainingSeconds <= 120) {
        timerEl.classList.add("timer-urgent");
      } else {
        timerEl.classList.remove("timer-urgent");
      }
    }
  }

  getCurrentQuestion() {
    if (!this.currentTest) return null;
    return this.currentTest.questions[this.currentIndex];
  }

  selectOption(optionIndex) {
    if (!this.currentTest || this.isCompleted) return;
    const q = this.getCurrentQuestion();
    if (!q) return;

    this.userAnswers[q.id] = optionIndex;
    if (window.soundEngine) window.soundEngine.playClick();
    this.renderCurrentQuestion();
    this.renderPalette();
  }

  clearCurrentAnswer() {
    const q = this.getCurrentQuestion();
    if (!q) return;
    delete this.userAnswers[q.id];
    if (window.soundEngine) window.soundEngine.playClick();
    this.renderCurrentQuestion();
    this.renderPalette();
  }

  toggleFlagCurrent() {
    const q = this.getCurrentQuestion();
    if (!q) return;
    if (this.flaggedQuestions.has(this.currentIndex)) {
      this.flaggedQuestions.delete(this.currentIndex);
    } else {
      this.flaggedQuestions.add(this.currentIndex);
    }
    if (window.soundEngine) window.soundEngine.playClick();
    this.renderPalette();
    this.renderCurrentQuestion();
  }

  jumpToQuestion(index) {
    if (!this.currentTest || index < 0 || index >= this.currentTest.questions.length) return;
    this.currentIndex = index;
    this.visitedQuestions.add(index);
    if (window.soundEngine) window.soundEngine.playClick();
    this.renderCurrentQuestion();
    this.renderPalette();
  }

  nextQuestion() {
    if (!this.currentTest) return;
    if (this.currentIndex < this.currentTest.questions.length - 1) {
      this.jumpToQuestion(this.currentIndex + 1);
    }
  }

  prevQuestion() {
    if (this.currentIndex > 0) {
      this.jumpToQuestion(this.currentIndex - 1);
    }
  }

  renderCurrentQuestion() {
    const container = document.getElementById("test-active-question-card");
    if (!container || !this.currentTest) return;

    const q = this.getCurrentQuestion();
    const totalQ = this.currentTest.questions.length;
    const selectedAnswer = this.userAnswers[q.id];
    const isFlagged = this.flaggedQuestions.has(this.currentIndex);

    const optionsHtml = q.options
      .map((opt, idx) => {
        const isSelected = selectedAnswer === idx;
        const letter = String.fromCharCode(65 + idx);
        return `
        <div class="test-option-item ${isSelected ? "selected" : ""}" onclick="window.testEngine.selectOption(${idx})">
          <div class="test-option-badge">${letter}</div>
          <div class="test-option-text">${opt}</div>
        </div>
      `;
      })
      .join("");

    container.innerHTML = `
      <div class="test-q-meta">
        <div class="test-q-counter">Question <span>${this.currentIndex + 1}</span> of ${totalQ}</div>
        <div class="test-q-section-tag"><i class="fas fa-layer-group"></i> ${q.section || "General"}</div>
      </div>
      <div class="test-q-prompt">${q.question}</div>
      <div class="test-options-list">${optionsHtml}</div>
      <div class="test-q-controls">
        <div class="test-q-left-actions">
          <button class="btn btn-outline-danger btn-sm" onclick="window.testEngine.clearCurrentAnswer()">
            <i class="fas fa-eraser"></i> Clear Response
          </button>
          <button class="btn ${isFlagged ? "btn-warning" : "btn-outline-warning"} btn-sm" onclick="window.testEngine.toggleFlagCurrent()">
            <i class="fas fa-flag"></i> ${isFlagged ? "Marked for Review" : "Mark for Review"}
          </button>
        </div>
        <div class="test-q-right-actions">
          <button class="btn btn-secondary btn-sm" onclick="window.testEngine.prevQuestion()" ${this.currentIndex === 0 ? "disabled" : ""}>
            <i class="fas fa-arrow-left"></i> Previous
          </button>
          <button class="btn btn-primary btn-sm" onclick="window.testEngine.nextQuestion()" ${
            this.currentIndex === totalQ - 1 ? "disabled" : ""
          }>
            Next <i class="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
    `;
  }

  renderPalette() {
    const paletteEl = document.getElementById("test-question-palette");
    if (!paletteEl || !this.currentTest) return;

    const totalQ = this.currentTest.questions.length;
    let html = "";

    for (let i = 0; i < totalQ; i++) {
      const q = this.currentTest.questions[i];
      const isAnswered = this.userAnswers[q.id] !== undefined;
      const isFlagged = this.flaggedQuestions.has(i);
      const isCurrent = this.currentIndex === i;

      let statusClass = "status-unvisited";
      if (isFlagged) {
        statusClass = isAnswered ? "status-answered-flagged" : "status-flagged";
      } else if (isAnswered) {
        statusClass = "status-answered";
      } else if (this.visitedQuestions.has(i)) {
        statusClass = "status-visited";
      }

      html += `
        <button class="palette-btn ${statusClass} ${isCurrent ? "current" : ""}" 
                onclick="window.testEngine.jumpToQuestion(${i})" 
                title="Q${i + 1}">
          ${i + 1}
        </button>
      `;
    }

    paletteEl.innerHTML = html;

    // Update counts
    let answeredCount = Object.keys(this.userAnswers).length;
    let flaggedCount = this.flaggedQuestions.size;
    let notAnsweredCount = totalQ - answeredCount;

    const answeredEl = document.getElementById("palette-count-answered");
    if (answeredEl) answeredEl.textContent = answeredCount;
    const flaggedEl = document.getElementById("palette-count-flagged");
    if (flaggedEl) flaggedEl.textContent = flaggedCount;
    const notAnsweredEl = document.getElementById("palette-count-unanswered");
    if (notAnsweredEl) notAnsweredEl.textContent = notAnsweredCount;
  }

  confirmSubmit() {
    const totalQ = this.currentTest.questions.length;
    const answeredCount = Object.keys(this.userAnswers).length;
    const flaggedCount = this.flaggedQuestions.size;
    const unattempted = totalQ - answeredCount;

    const modal = document.getElementById("test-submit-modal");
    if (!modal) {
      if (confirm(`Submit Test? Answered: ${answeredCount}/${totalQ}. Unattempted: ${unattempted}`)) {
        this.finishTest();
      }
      return;
    }

    document.getElementById("modal-stat-answered").textContent = answeredCount;
    document.getElementById("modal-stat-unanswered").textContent = unattempted;
    document.getElementById("modal-stat-flagged").textContent = flaggedCount;
    document.getElementById("modal-stat-time-left").textContent = this.formatTime(this.remainingSeconds);

    modal.classList.add("active");
  }

  finishTest(timeExpired = false) {
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.isCompleted = true;
    this.endTime = new Date();

    const elapsedSeconds = this.totalSeconds - this.remainingSeconds;
    const timeSpentStr = this.formatTime(elapsedSeconds);

    // Calculate score
    let score = 0;
    const reviewList = [];

    this.currentTest.questions.forEach((q, idx) => {
      const selected = this.userAnswers[q.id];
      const isCorrect = selected === q.correct;
      if (isCorrect) score++;

      reviewList.push({
        questionNumber: idx + 1,
        question: q.question,
        selectedAnswer: selected !== undefined ? q.options[selected] : "Not Answered",
        correctAnswer: q.options[q.correct],
        isCorrect: isCorrect,
        explanation: q.explanation
      });
    });

    const totalQuestions = this.currentTest.questions.length;
    const accuracy = (score / totalQuestions) * 100;
    const passed = accuracy >= (this.currentTest.passingScore || 70);

    // Audio cue
    if (window.soundEngine) {
      if (passed) window.soundEngine.playFanfare();
      else window.soundEngine.playIncorrect();
    }

    // Save test result into user profile history
    if (window.LEARN_STREAM_DATA && window.LEARN_STREAM_DATA.userProfile) {
      window.LEARN_STREAM_DATA.userProfile.testsCompleted++;
      window.LEARN_STREAM_DATA.userProfile.totalXP += score * 25;
    }

    // Show Results View
    this.renderResultsView(score, totalQuestions, accuracy, timeSpentStr, passed, reviewList);
  }

  renderResultsView(score, maxScore, accuracy, timeSpent, passed, reviewList) {
    const hallContainer = document.getElementById("mock-test-chamber");
    const resultsContainer = document.getElementById("mock-test-results-view");
    const modal = document.getElementById("test-submit-modal");

    if (modal) modal.classList.remove("active");
    if (hallContainer) hallContainer.style.display = "none";
    if (resultsContainer) {
      resultsContainer.style.display = "block";

      document.getElementById("res-test-title").textContent = this.currentTest.title;
      document.getElementById("res-score-badge").textContent = `${score} / ${maxScore}`;
      document.getElementById("res-time-spent").textContent = timeSpent;
      document.getElementById("res-accuracy-pill").textContent = `${Math.round(accuracy)}% Accuracy`;

      const statusBadge = document.getElementById("res-status-badge");
      if (statusBadge) {
        statusBadge.textContent = passed ? "DISTINCTION (PASSED)" : "NEEDS REVISION";
        statusBadge.className = passed ? "badge badge-success" : "badge badge-warning";
      }

      // Render score donut
      setTimeout(() => {
        if (window.ChartEngine) {
          window.ChartEngine.renderDonutGauge("result-score-donut", accuracy, "Accuracy Score");
        }
      }, 50);

      // Render review cards
      const reviewContainer = document.getElementById("res-review-cards-list");
      if (reviewContainer) {
        reviewContainer.innerHTML = reviewList
          .map(
            item => `
          <div class="result-review-item ${item.isCorrect ? "correct" : "incorrect"}">
            <div class="review-header">
              <span class="review-q-num">Question ${item.questionNumber}</span>
              <span class="review-status-tag ${item.isCorrect ? "tag-correct" : "tag-incorrect"}">
                <i class="fas ${item.isCorrect ? "fa-check-circle" : "fa-times-circle"}"></i>
                ${item.isCorrect ? "Correct (+1.0)" : "Incorrect (0.0)"}
              </span>
            </div>
            <div class="review-q-text">${item.question}</div>
            <div class="review-answers-box">
              <div class="review-user-choice ${item.isCorrect ? "text-success" : "text-danger"}">
                <strong>Your Response:</strong> ${item.selectedAnswer}
              </div>
              ${
                !item.isCorrect
                  ? `<div class="review-correct-choice text-success">
                       <strong>Correct Answer:</strong> ${item.correctAnswer}
                     </div>`
                  : ""
              }
            </div>
            <div class="review-explanation">
              <i class="fas fa-lightbulb"></i> <strong>AI Explanation:</strong> ${item.explanation}
            </div>
          </div>
        `
          )
          .join("");
      }

      // Store current result for PDF export button
      this.lastResult = {
        title: this.currentTest.title,
        score,
        maxScore,
        accuracy,
        timeSpent,
        reviewList
      };
    }
  }

  downloadResultPDF() {
    if (this.lastResult && window.PDFExporter) {
      window.PDFExporter.exportTestReport(
        this.lastResult.title,
        this.lastResult.score,
        this.lastResult.maxScore,
        this.lastResult.accuracy,
        this.lastResult.timeSpent,
        this.lastResult.reviewList
      );
    }
  }

  exitTest() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    const hallContainer = document.getElementById("mock-test-chamber");
    const resultsContainer = document.getElementById("mock-test-results-view");
    const selectionContainer = document.getElementById("mock-test-selection-list");

    if (hallContainer) hallContainer.style.display = "none";
    if (resultsContainer) resultsContainer.style.display = "none";
    if (selectionContainer) selectionContainer.style.display = "block";
  }
}

window.testEngine = new MockTestEngine();
