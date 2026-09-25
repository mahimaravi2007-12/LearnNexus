/**
 * LearnStream AI - Primary Application Controller
 * Handles tab routing, state management, search filtering, voice queries,
 * language localization, theme switching, quiz gameplay, and confetti celebrations.
 */

class LearnStreamApp {
  constructor() {
    this.currentTab = "dashboard";
    this.currentLanguage = "en";
    this.currentSubjectFilter = "all";
    this.activeVideo = null;
    this.activeQuiz = null;
    this.quizQuestionIndex = 0;
    this.quizScore = 0;
    this.quizAnswered = false;
    this.savedItems = {
      videos: new Set(["vid-1", "vid-2"]),
      notes: new Set(["note-1"])
    };

    this.init();
  }

  init() {
    this.initTheme();
    this.initLanguage();
    this.bindEvents();
    this.renderDashboard();
    this.renderVideosList();
    this.renderNotesTab();
    this.renderMockTestsTab();
    this.renderQuizSelection();
    this.renderSavedLibrary();
    this.renderAnalyticsTab();

    if (window.aiCopilot) {
      window.aiCopilot.init();
    }

    // Trigger charts on first render
    setTimeout(() => {
      this.refreshCharts();
    }, 200);
  }

  /* ================== THEME & LOCALIZATION ================== */
  initTheme() {
    const savedTheme = localStorage.getItem("learnstream_theme") || "dark";
    document.documentElement.setAttribute("data-theme", savedTheme);
    this.updateThemeIcon(savedTheme);
  }

  toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme") || "dark";
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("learnstream_theme", next);
    this.updateThemeIcon(next);
    this.refreshCharts();
  }

  updateThemeIcon(theme) {
    const icon = document.getElementById("theme-toggle-icon");
    if (icon) {
      icon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon";
    }
  }

  initLanguage() {
    const savedLang = localStorage.getItem("learnstream_lang") || "en";
    this.setLanguage(savedLang, false);
  }

  setLanguage(langCode, save = true) {
    if (!window.LEARN_STREAM_I18N[langCode]) return;
    this.currentLanguage = langCode;
    if (save) localStorage.setItem("learnstream_lang", langCode);
    document.documentElement.setAttribute("lang", langCode);

    // Update select element if present
    const langSelect = document.getElementById("global-language-selector");
    if (langSelect && langSelect.value !== langCode) {
      langSelect.value = langCode;
    }

    // Translate DOM elements marked with data-i18n
    const dict = window.LEARN_STREAM_I18N[langCode];
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    // Translate placeholders
    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
      const key = el.getAttribute("data-i18n-placeholder");
      if (dict[key]) {
        el.setAttribute("placeholder", dict[key]);
      }
    });
  }

  /* ================== TAB NAVIGATION ================== */
  switchTab(tabId) {
    if (this.currentTab === tabId) return;

    // Remove active from nav links
    document.querySelectorAll(".nav-item").forEach(item => {
      item.classList.remove("active");
    });
    // Add active to targeted link
    const targetLink = document.querySelector(`[data-tab="${tabId}"]`);
    if (targetLink) targetLink.classList.add("active");

    // Hide all view panels
    document.querySelectorAll(".view-panel").forEach(panel => {
      panel.classList.remove("active");
    });

    // Show target view panel
    const targetPanel = document.getElementById(`panel-${tabId}`);
    if (targetPanel) {
      targetPanel.classList.add("active");
    }

    this.currentTab = tabId;

    if (window.soundEngine) window.soundEngine.playClick();

    // Re-render / refresh specific tab components
    if (tabId === "dashboard" || tabId === "analytics") {
      setTimeout(() => this.refreshCharts(), 100);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ================== DASHBOARD ================== */
  renderDashboard() {
    const user = window.LEARN_STREAM_DATA.userProfile;
    if (!user) return;

    // Header info
    const nameEl = document.getElementById("dash-user-name");
    if (nameEl) nameEl.textContent = user.name;
    const streakEl = document.getElementById("dash-stat-streak");
    if (streakEl) streakEl.textContent = `${user.streakDays}d`;
    const hoursEl = document.getElementById("dash-stat-hours");
    if (hoursEl) hoursEl.textContent = `${user.totalStudyHours}h`;
    const xpEl = document.getElementById("dash-stat-xp");
    if (xpEl) xpEl.textContent = `${user.totalXP} XP`;
    const accEl = document.getElementById("dash-stat-accuracy");
    if (accEl) accEl.textContent = `${user.averageScore}%`;

    // Render Streak Heatmap
    this.renderStreakHeatmap(user.streakCalendar);

    // Render Quick Resume Video Cards (First 2)
    const resumeContainer = document.getElementById("dash-resume-grid");
    if (resumeContainer) {
      const videos = window.LEARN_STREAM_DATA.videos.slice(0, 2);
      resumeContainer.innerHTML = videos
        .map(
          v => `
        <div class="dash-resume-card" onclick="window.app.openVideoModal('${v.id}')">
          <div class="resume-thumb-wrap">
            <img src="${v.thumbnail}" alt="${v.title}">
            <div class="resume-play-btn"><i class="fas fa-play"></i></div>
            <div class="resume-duration">${v.duration}</div>
          </div>
          <div class="resume-info">
            <div class="resume-tag">${v.subject.toUpperCase()}</div>
            <h4 class="resume-title">${v.title}</h4>
            <div class="resume-meta">
              <span><i class="fas fa-magic"></i> ${v.matchScore}% Match</span>
              <span><i class="fas fa-star text-warning"></i> ${v.rating}</span>
            </div>
          </div>
        </div>
      `
        )
        .join("");
    }

    // Render Mastery Badges
    const badgeContainer = document.getElementById("dash-badges-row");
    if (badgeContainer && user.badges) {
      badgeContainer.innerHTML = user.badges
        .map(
          b => `
        <div class="badge-item" title="${b.desc}">
          <div class="badge-icon">${b.icon}</div>
          <div class="badge-name">${b.name}</div>
        </div>
      `
        )
        .join("");
    }
  }

  renderStreakHeatmap(calendarData) {
    const container = document.getElementById("streak-heatmap-grid");
    if (!container || !calendarData) return;

    container.innerHTML = calendarData
      .map(d => {
        let level = 0;
        if (d.count >= 6) level = 4;
        else if (d.count >= 4) level = 3;
        else if (d.count >= 2) level = 2;
        else if (d.count > 0) level = 1;

        return `
        <div class="heatmap-cell level-${level}" title="${d.date}: ${d.count} study sessions"></div>
      `;
      })
      .join("");
  }

  refreshCharts() {
    if (!window.ChartEngine) return;
    const analytics = window.LEARN_STREAM_DATA.analytics;

    // Radar Mastery Chart on Dashboard & Analytics
    window.ChartEngine.renderRadarChart(
      "radar-mastery-canvas",
      analytics.radarData.labels,
      analytics.radarData.studentScores,
      analytics.radarData.cohortAverage
    );

    // Weekly Study Hours Bar Chart
    window.ChartEngine.renderBarChart("weekly-hours-canvas", analytics.weeklyHours);

    // Analytics tab radar
    window.ChartEngine.renderRadarChart(
      "analytics-radar-canvas",
      analytics.radarData.labels,
      analytics.radarData.studentScores,
      analytics.radarData.cohortAverage
    );
  }

  /* ================== SMART SEARCH & VIDEO HUB ================== */
  renderVideosList(query = "", subject = "all") {
    const container = document.getElementById("video-results-grid");
    if (!container) return;

    let list = window.LEARN_STREAM_DATA.videos;

    if (subject && subject !== "all") {
      list = list.filter(v => v.subject === subject);
    }

    if (query && query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        v =>
          v.title.toLowerCase().includes(q) ||
          v.summary.toLowerCase().includes(q) ||
          v.channel.toLowerCase().includes(q) ||
          (v.tags && v.tags.some(t => t.toLowerCase().includes(q)))
      );
    }

    const counterEl = document.getElementById("video-results-count");
    if (counterEl) counterEl.textContent = `${list.length} lessons matched`;

    if (list.length === 0) {
      container.innerHTML = `
        <div class="empty-state-card">
          <i class="fas fa-search-minus fa-3x text-muted"></i>
          <h3>No educational lessons found for "${query}"</h3>
          <p>Try searching for "Backpropagation", "Attention", "Dijkstra", or "Event Loop".</p>
          <button class="btn btn-outline-primary" onclick="window.app.clearSearch()">Reset Search</button>
        </div>
      `;
      return;
    }

    container.innerHTML = list
      .map(v => {
        const isSaved = this.savedItems.videos.has(v.id);
        return `
        <div class="video-card">
          <div class="video-thumb-container">
            <img src="${v.thumbnail}" alt="${v.title}" loading="lazy">
            <div class="video-duration-badge">${v.duration}</div>
            <div class="video-match-chip">
              <i class="fas fa-sparkles"></i> ${v.matchScore}% Match
            </div>
            <button class="bookmark-btn ${isSaved ? "saved" : ""}" 
                    onclick="event.stopPropagation(); window.app.toggleSaveVideo('${v.id}')" 
                    title="${isSaved ? "Saved in Library" : "Bookmark video"}">
              <i class="${isSaved ? "fas" : "far"} fa-bookmark"></i>
            </button>
            <div class="play-overlay" onclick="window.app.openVideoModal('${v.id}')">
              <div class="play-circle"><i class="fas fa-play"></i></div>
            </div>
          </div>
          <div class="video-content-body">
            <div class="video-top-meta">
              <span class="subject-pill">${v.subject.toUpperCase()}</span>
              <span class="difficulty-pill">${v.difficulty}</span>
            </div>
            <h3 class="video-card-title" onclick="window.app.openVideoModal('${v.id}')">${v.title}</h3>
            <p class="video-card-summary">${v.summary}</p>
            <div class="video-tags-row">
              ${(v.tags || []).map(t => `<span class="v-tag">#${t}</span>`).join("")}
            </div>
            <div class="video-footer-actions">
              <div class="channel-info">
                <img src="${v.channelAvatar}" alt="${v.channel}">
                <span>${v.channel}</span>
              </div>
              <div class="card-btn-group">
                <button class="btn btn-sm btn-outline-primary" onclick="window.app.generateNotesFromVideo('${v.id}')" title="Synthesize Notes">
                  <i class="fas fa-file-alt"></i> Notes
                </button>
                <button class="btn btn-sm btn-primary" onclick="window.app.openVideoModal('${v.id}')">
                  <i class="fas fa-play"></i> Watch
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
      })
      .join("");
  }

  filterVideosBySubject(subjectId) {
    this.currentSubjectFilter = subjectId;
    document.querySelectorAll(".topic-filter-pill").forEach(pill => {
      if (pill.getAttribute("data-subject") === subjectId) {
        pill.classList.add("active");
      } else {
        pill.classList.remove("active");
      }
    });

    const searchInput = document.getElementById("main-search-input");
    const query = searchInput ? searchInput.value : "";
    this.renderVideosList(query, subjectId);
  }

  handleSearchInput(e) {
    const query = e.target.value;
    this.renderVideosList(query, this.currentSubjectFilter);
  }

  clearSearch() {
    const input = document.getElementById("main-search-input");
    if (input) input.value = "";
    this.currentSubjectFilter = "all";
    document.querySelectorAll(".topic-filter-pill").forEach(p => {
      p.classList.toggle("active", p.getAttribute("data-subject") === "all");
    });
    this.renderVideosList("", "all");
  }

  toggleSaveVideo(videoId) {
    if (this.savedItems.videos.has(videoId)) {
      this.savedItems.videos.delete(videoId);
    } else {
      this.savedItems.videos.add(videoId);
    }
    if (window.soundEngine) window.soundEngine.playClick();
    this.renderVideosList(
      document.getElementById("main-search-input")?.value || "",
      this.currentSubjectFilter
    );
    this.renderSavedLibrary();
  }

  /* ================== VIDEO PLAYER & AI ANALYSIS MODAL ================== */
  openVideoModal(videoId) {
    const video = window.LEARN_STREAM_DATA.videos.find(v => v.id === videoId);
    if (!video) return;
    this.activeVideo = video;

    const modal = document.getElementById("video-player-modal");
    if (!modal) return;

    document.getElementById("modal-video-title").textContent = video.title;
    document.getElementById("modal-video-channel").textContent = video.channel;
    document.getElementById("modal-video-match").textContent = `${video.matchScore}% Match`;

    // Embed YouTube Player with valid fallback iframe
    const playerFrame = document.getElementById("modal-video-iframe");
    if (playerFrame) {
      playerFrame.src = `https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`;
    }

    // Render Key Takeaways
    const takeawaysList = document.getElementById("modal-takeaways-list");
    if (takeawaysList) {
      takeawaysList.innerHTML = video.keyTakeaways
        .map(t => `<li><i class="fas fa-check-circle text-primary"></i> ${t}</li>`)
        .join("");
    }

    // Render Timestamps
    const tsContainer = document.getElementById("modal-timestamps-list");
    if (tsContainer) {
      tsContainer.innerHTML = video.timestamps
        .map(
          ts => `
        <div class="timestamp-pill" onclick="window.app.seekVideoTo('${ts.time}')">
          <span class="time-stamp-val">${ts.time}</span>
          <span class="time-stamp-title">${ts.title}</span>
        </div>
      `
        )
        .join("");
    }

    modal.classList.add("active");
    if (window.soundEngine) window.soundEngine.playClick();
  }

  closeVideoModal() {
    const modal = document.getElementById("video-player-modal");
    const playerFrame = document.getElementById("modal-video-iframe");
    if (playerFrame) playerFrame.src = "";
    if (modal) modal.classList.remove("active");
  }

  seekVideoTo(timeStr) {
    // In actual embed, we can postMessage to player, or alert seeking
    alert(`Jumping to chapter: ${timeStr}`);
  }

  /* ================== AUTO NOTES GENERATOR ================== */
  renderNotesTab() {
    const select = document.getElementById("preloaded-notes-selector");
    if (select) {
      select.innerHTML = window.LEARN_STREAM_DATA.notesLibrary
        .map(n => `<option value="${n.id}">${n.topic} (${n.subject.toUpperCase()})</option>`)
        .join("");
    }
    // Load first note by default
    if (window.LEARN_STREAM_DATA.notesLibrary.length > 0) {
      this.displayNote(window.LEARN_STREAM_DATA.notesLibrary[0]);
    }
  }

  onSelectPreloadedNote(e) {
    const noteId = e.target.value;
    const note = window.LEARN_STREAM_DATA.notesLibrary.find(n => n.id === noteId);
    if (note) this.displayNote(note);
  }

  displayNote(note) {
    this.currentDisplayedNote = note;

    document.getElementById("note-display-title").textContent = note.topic;
    document.getElementById("note-display-summary").textContent = note.summary;
    document.getElementById("note-display-meta").textContent = `${note.readTime || "6 min read"} • Created by ${note.author}`;

    // Formulas
    const formulaContainer = document.getElementById("note-display-formulas");
    if (formulaContainer) {
      if (note.keyFormulae && note.keyFormulae.length > 0) {
        formulaContainer.innerHTML = note.keyFormulae
          .map(
            f => `
          <div class="note-formula-card">
            <div class="formula-label">${f.name}</div>
            <div class="formula-code"><code>${f.latex}</code></div>
          </div>
        `
          )
          .join("");
        formulaContainer.parentElement.style.display = "block";
      } else {
        formulaContainer.parentElement.style.display = "none";
      }
    }

    // Sections
    const sectionsContainer = document.getElementById("note-display-sections");
    if (sectionsContainer) {
      sectionsContainer.innerHTML = (note.sections || [])
        .map(
          s => `
        <div class="note-deep-section">
          <h4>${s.heading}</h4>
          <p>${s.content.replace(/\n/g, "<br/>")}</p>
        </div>
      `
        )
        .join("");
    }

    // Flashcards
    this.renderNoteFlashcards(note.flashcards || []);
  }

  renderNoteFlashcards(flashcards) {
    const container = document.getElementById("note-display-flashcards");
    if (!container) return;

    if (!flashcards || flashcards.length === 0) {
      container.parentElement.style.display = "none";
      return;
    }

    container.parentElement.style.display = "block";
    container.innerHTML = flashcards
      .map(
        (fc, idx) => `
      <div class="flashcard-3d" onclick="this.classList.toggle('flipped'); window.soundEngine.playClick();">
        <div class="flashcard-inner">
          <div class="flashcard-front">
            <div class="fc-badge">CARD #${idx + 1}</div>
            <div class="fc-prompt">${fc.front}</div>
            <div class="fc-flip-hint"><i class="fas fa-sync-alt"></i> Click to reveal answer</div>
          </div>
          <div class="flashcard-back">
            <div class="fc-badge back-badge">ANSWER</div>
            <div class="fc-answer">${fc.back}</div>
            <div class="fc-flip-hint"><i class="fas fa-check"></i> Click to flip back</div>
          </div>
        </div>
      </div>
    `
      )
      .join("");
  }

  generateCustomNote() {
    const topicInput = document.getElementById("custom-note-topic-input");
    const styleSelect = document.getElementById("custom-note-style-select");
    const topic = topicInput ? topicInput.value.trim() : "";
    const style = styleSelect ? styleSelect.value : "academic";

    if (!topic) {
      alert("Please enter a topic or concept to generate notes for!");
      return;
    }

    // Show generating spinner state
    const btn = document.getElementById("btn-generate-notes");
    if (btn) {
      btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Synthesizing AI Notes...`;
      btn.disabled = true;
    }

    setTimeout(() => {
      const generated = {
        id: `note-${Date.now()}`,
        topic: topic,
        subject: "General",
        dateCreated: new Date().toISOString().split("T")[0],
        readTime: "5 min read",
        author: `LearnStream AI Engine (${style.toUpperCase()} MODE)`,
        summary: `Synthesized foundational principles, mathematical models, and practical mental frameworks for understanding ${topic}.`,
        keyFormulae: [
          { name: "Governing Transformation Law", latex: "f^*(x) = \\arg\\min_\\theta \\mathbb{E}[\\mathcal{L}(y, f(x; \\theta))]" },
          { name: "Information Density Metric", latex: "I(X; Y) = H(X) - H(X | Y)" }
        ],
        sections: [
          {
            heading: "1. Foundational Architecture & First Principles",
            content: `${topic} operates on the principle of minimizing entropy while maximizing actionable representations across multi-dimensional spaces. By decomposing complex interactions into tractable subproblems, system stability is maintained.`
          },
          {
            heading: "2. Strategic Heuristics & Trade-offs",
            content: `When applying ${topic} in real-world scenarios, engineers must balance computational throughput with precision. Over-indexing on edge-case optimization often degrades generalization.`
          }
        ],
        flashcards: [
          { front: `What is the core objective of ${topic}?`, back: "To provide robust, scalable representations that generalize across varied distributions." },
          { front: `Which trade-off is critical when tuning ${topic}?`, back: "The bias-variance tradeoff and space-time memory access bounds." }
        ]
      };

      // Add to dataset and display
      window.LEARN_STREAM_DATA.notesLibrary.unshift(generated);
      this.renderNotesTab();
      this.displayNote(generated);

      if (btn) {
        btn.innerHTML = `<i class="fas fa-magic"></i> Generate Structured Notes`;
        btn.disabled = false;
      }
      if (window.soundEngine) window.soundEngine.playCorrect();
    }, 900);
  }

  generateNotesFromVideo(videoId) {
    const video = window.LEARN_STREAM_DATA.videos.find(v => v.id === videoId);
    if (!video) return;

    this.switchTab("notes");
    const input = document.getElementById("custom-note-topic-input");
    if (input) input.value = video.title;
    this.generateCustomNote();
  }

  downloadCurrentNotePDF() {
    if (this.currentDisplayedNote && window.PDFExporter) {
      window.PDFExporter.exportNotesToPDF(this.currentDisplayedNote);
    }
  }

  /* ================== AI QUIZ ZONE ================== */
  renderQuizSelection() {
    const container = document.getElementById("quiz-selection-cards");
    if (!container) return;

    container.innerHTML = window.LEARN_STREAM_DATA.quizzes
      .map(
        q => `
      <div class="quiz-card" onclick="window.app.startQuiz('${q.id}')">
        <div class="quiz-card-header">
          <span class="subject-pill">${q.subject.toUpperCase()}</span>
          <span class="q-count-badge"><i class="fas fa-question-circle"></i> ${q.questions.length} Questions</span>
        </div>
        <h3>${q.topic}</h3>
        <p>Adaptive AI recall test with instant explanatory feedback and streak XP rewards.</p>
        <button class="btn btn-primary btn-block">
          <i class="fas fa-play"></i> Start Quiz Now
        </button>
      </div>
    `
      )
      .join("");
  }

  startQuiz(quizId) {
    const quiz = window.LEARN_STREAM_DATA.quizzes.find(q => q.id === quizId);
    if (!quiz) return;

    this.activeQuiz = quiz;
    this.quizQuestionIndex = 0;
    this.quizScore = 0;
    this.quizAnswered = false;

    document.getElementById("quiz-selection-panel").style.display = "none";
    document.getElementById("quiz-active-arena").style.display = "block";
    document.getElementById("quiz-completion-card").style.display = "none";

    this.renderCurrentQuizQuestion();
  }

  renderCurrentQuizQuestion() {
    if (!this.activeQuiz) return;
    const q = this.activeQuiz.questions[this.quizQuestionIndex];
    const totalQ = this.activeQuiz.questions.length;
    this.quizAnswered = false;

    document.getElementById("quiz-arena-topic").textContent = this.activeQuiz.topic;
    document.getElementById("quiz-progress-text").textContent = `Question ${this.quizQuestionIndex + 1} of ${totalQ}`;
    document.getElementById("quiz-progress-fill").style.width = `${((this.quizQuestionIndex + 1) / totalQ) * 100}%`;
    document.getElementById("quiz-prompt-text").textContent = q.question;

    // Hint element reset
    const hintEl = document.getElementById("quiz-hint-box");
    if (hintEl) {
      hintEl.style.display = "none";
      hintEl.innerHTML = `<i class="fas fa-lightbulb"></i> <strong>Hint:</strong> ${q.hint}`;
    }

    // Explanation element reset
    const explanationEl = document.getElementById("quiz-explanation-box");
    if (explanationEl) {
      explanationEl.style.display = "none";
    }

    const optionsContainer = document.getElementById("quiz-options-container");
    optionsContainer.innerHTML = q.options
      .map(
        (opt, idx) => `
      <button class="quiz-option-btn" id="quiz-opt-${idx}" onclick="window.app.handleQuizOptionClick(${idx})">
        <span class="opt-letter">${String.fromCharCode(65 + idx)}</span>
        <span class="opt-text">${opt}</span>
      </button>
    `
      )
      .join("");

    const nextBtn = document.getElementById("quiz-next-question-btn");
    if (nextBtn) nextBtn.style.display = "none";
  }

  toggleQuizHint() {
    const hintEl = document.getElementById("quiz-hint-box");
    if (hintEl) {
      hintEl.style.display = hintEl.style.display === "none" ? "block" : "none";
      if (window.soundEngine) window.soundEngine.playClick();
    }
  }

  handleQuizOptionClick(selectedIndex) {
    if (this.quizAnswered || !this.activeQuiz) return;
    this.quizAnswered = true;

    const q = this.activeQuiz.questions[this.quizQuestionIndex];
    const isCorrect = selectedIndex === q.correct;

    const clickedBtn = document.getElementById(`quiz-opt-${selectedIndex}`);
    const correctBtn = document.getElementById(`quiz-opt-${q.correct}`);

    if (isCorrect) {
      this.quizScore++;
      if (clickedBtn) clickedBtn.classList.add("correct-choice");
      if (window.soundEngine) window.soundEngine.playCorrect();
    } else {
      if (clickedBtn) clickedBtn.classList.add("incorrect-choice");
      if (correctBtn) correctBtn.classList.add("correct-choice");
      if (window.soundEngine) window.soundEngine.playIncorrect();
    }

    // Show AI explanation
    const explanationEl = document.getElementById("quiz-explanation-box");
    if (explanationEl) {
      explanationEl.style.display = "block";
      explanationEl.className = `quiz-explanation-callout ${isCorrect ? "exp-correct" : "exp-incorrect"}`;
      explanationEl.innerHTML = `
        <div class="exp-title"><i class="fas ${isCorrect ? "fa-check-circle" : "fa-info-circle"}"></i> ${
        isCorrect ? "Excellent! That's mathematically correct." : "Not quite, but here's why:"
      }</div>
        <div class="exp-body">${q.explanation}</div>
      `;
    }

    // Show next button
    const nextBtn = document.getElementById("quiz-next-question-btn");
    if (nextBtn) {
      nextBtn.style.display = "inline-flex";
      const isLast = this.quizQuestionIndex === this.activeQuiz.questions.length - 1;
      nextBtn.innerHTML = isLast ? `See Final Results <i class="fas fa-trophy"></i>` : `Next Question <i class="fas fa-arrow-right"></i>`;
    }
  }

  nextQuizQuestion() {
    if (!this.activeQuiz) return;
    if (this.quizQuestionIndex < this.activeQuiz.questions.length - 1) {
      this.quizQuestionIndex++;
      this.renderCurrentQuizQuestion();
    } else {
      this.finishQuiz();
    }
  }

  finishQuiz() {
    document.getElementById("quiz-active-arena").style.display = "none";
    const compEl = document.getElementById("quiz-completion-card");
    compEl.style.display = "block";

    const totalQ = this.activeQuiz.questions.length;
    const pct = (this.quizScore / totalQ) * 100;

    document.getElementById("quiz-final-score").textContent = `${this.quizScore} / ${totalQ}`;
    document.getElementById("quiz-final-pct").textContent = `${Math.round(pct)}% Accuracy`;

    if (window.soundEngine) window.soundEngine.playFanfare();

    // Trigger confetti celebration!
    this.launchConfetti();
  }

  restartQuiz() {
    if (this.activeQuiz) {
      this.startQuiz(this.activeQuiz.id);
    }
  }

  exitQuiz() {
    document.getElementById("quiz-selection-panel").style.display = "block";
    document.getElementById("quiz-active-arena").style.display = "none";
    document.getElementById("quiz-completion-card").style.display = "none";
  }

  /* ================== ONLINE MOCK TESTS ================== */
  renderMockTestsTab() {
    const container = document.getElementById("mock-tests-cards-grid");
    if (!container) return;

    container.innerHTML = window.LEARN_STREAM_DATA.mockTests
      .map(
        t => `
      <div class="test-overview-card">
        <div class="test-top-badges">
          <span class="subject-pill">${t.subject.toUpperCase()}</span>
          <span class="difficulty-pill">${t.difficulty}</span>
        </div>
        <h3 class="test-card-title">${t.title}</h3>
        <p class="test-card-desc">${t.instructions}</p>
        <div class="test-specs-grid">
          <div class="spec-col"><i class="far fa-clock"></i> ${t.durationMinutes} mins</div>
          <div class="spec-col"><i class="fas fa-list-ol"></i> ${t.totalQuestions} Questions</div>
          <div class="spec-col"><i class="fas fa-medal"></i> ${t.passingScore}% Pass Mark</div>
        </div>
        <button class="btn btn-primary btn-block" onclick="window.app.launchMockTest('${t.id}')">
          <i class="fas fa-pencil-alt"></i> Enter Exam Chamber
        </button>
      </div>
    `
      )
      .join("");
  }

  launchMockTest(testId) {
    if (window.testEngine) {
      const ok = window.testEngine.loadTest(testId);
      if (ok) {
        document.getElementById("mock-test-selection-list").style.display = "none";
        document.getElementById("mock-test-chamber").style.display = "block";
        document.getElementById("mock-test-results-view").style.display = "none";
        document.getElementById("exam-hall-title").textContent = window.testEngine.currentTest.title;
        window.testEngine.renderCurrentQuestion();
        window.testEngine.renderPalette();
      }
    }
  }

  /* ================== SAVED LIBRARY ================== */
  renderSavedLibrary() {
    const videoContainer = document.getElementById("saved-videos-list");
    if (videoContainer) {
      const savedVids = window.LEARN_STREAM_DATA.videos.filter(v => this.savedItems.videos.has(v.id));
      if (savedVids.length === 0) {
        videoContainer.innerHTML = `<div class="empty-hint">No saved lessons yet. Click the bookmark icon on any lesson to save it here!</div>`;
      } else {
        videoContainer.innerHTML = savedVids
          .map(
            v => `
          <div class="saved-item-row" onclick="window.app.openVideoModal('${v.id}')">
            <img src="${v.thumbnail}" alt="${v.title}">
            <div class="saved-row-info">
              <h4>${v.title}</h4>
              <div class="saved-meta">${v.channel} • ${v.duration}</div>
            </div>
            <button class="btn btn-sm btn-outline-danger" onclick="event.stopPropagation(); window.app.toggleSaveVideo('${v.id}')">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        `
          )
          .join("");
      }
    }

    const notesContainer = document.getElementById("saved-notes-list");
    if (notesContainer) {
      const savedNotes = window.LEARN_STREAM_DATA.notesLibrary.filter(n => this.savedItems.notes.has(n.id));
      notesContainer.innerHTML = savedNotes
        .map(
          n => `
        <div class="saved-item-row" onclick="window.app.switchTab('notes'); window.app.displayNote(window.LEARN_STREAM_DATA.notesLibrary.find(x => x.id === '${n.id}'))">
          <div class="saved-note-icon"><i class="fas fa-file-alt"></i></div>
          <div class="saved-row-info">
            <h4>${n.topic}</h4>
            <div class="saved-meta">${n.readTime || "5 min read"} • ${n.dateCreated}</div>
          </div>
          <button class="btn btn-sm btn-outline-primary" onclick="event.stopPropagation(); window.PDFExporter.exportNotesToPDF(window.LEARN_STREAM_DATA.notesLibrary.find(x => x.id === '${n.id}'))">
            <i class="fas fa-download"></i> PDF
          </button>
        </div>
      `
        )
        .join("");
    }
  }

  /* ================== PERFORMANCE ANALYTICS ================== */
  renderAnalyticsTab() {
    const listEl = document.getElementById("analytics-topics-list");
    if (!listEl) return;

    const topics = window.LEARN_STREAM_DATA.analytics.topicMastery;
    listEl.innerHTML = topics
      .map(
        t => `
      <div class="topic-mastery-item">
        <div class="topic-m-header">
          <span class="topic-m-name">${t.name}</span>
          <span class="topic-m-score" style="color: ${t.color}">${t.score}% (${t.status})</span>
        </div>
        <div class="topic-progress-track">
          <div class="topic-progress-fill" style="width: ${t.score}%; background: ${t.color}"></div>
        </div>
      </div>
    `
      )
      .join("");

    const recsEl = document.getElementById("analytics-prescriptions-list");
    if (recsEl) {
      const recs = window.LEARN_STREAM_DATA.analytics.aiRecommendations;
      recsEl.innerHTML = recs
        .map(
          r => `
        <div class="ai-prescription-card">
          <div class="presc-badge"><i class="fas fa-robot"></i> AI RECOMMENDATION</div>
          <h4>${r.title}</h4>
          <p>${r.reason}</p>
          <button class="btn btn-sm btn-primary" onclick="window.app.filterVideosBySubject('${r.actionSubject}'); window.app.switchTab('videos');">
            ${r.actionLabel} <i class="fas fa-arrow-right"></i>
          </button>
        </div>
      `
        )
        .join("");
    }
  }

  /* ================== VOICE SEARCH TRIGGER ================== */
  openVoiceSearch() {
    const modal = document.getElementById("voice-search-modal");
    if (!modal) return;

    modal.classList.add("active");
    const statusText = document.getElementById("voice-modal-status");
    const queryDisplay = document.getElementById("voice-modal-transcript");

    if (statusText) statusText.textContent = "Listening for educational queries...";
    if (queryDisplay) queryDisplay.textContent = "Say 'Neural Networks', 'Dijkstra', 'Quantum Superposition'...";

    window.voiceSearchEngine.start(
      (transcript, isFinal) => {
        if (queryDisplay) queryDisplay.textContent = `"${transcript}"`;
        if (isFinal) {
          setTimeout(() => {
            modal.classList.remove("active");
            this.switchTab("videos");
            const searchInput = document.getElementById("main-search-input");
            if (searchInput) searchInput.value = transcript;
            this.renderVideosList(transcript, "all");
          }, 600);
        }
      },
      (isListening) => {
        const visualizer = document.getElementById("voice-wave-visualizer");
        if (visualizer) visualizer.classList.toggle("listening", isListening);
      }
    );
  }

  closeVoiceSearch() {
    window.voiceSearchEngine.stop();
    const modal = document.getElementById("voice-search-modal");
    if (modal) modal.classList.remove("active");
  }

  /* ================== CONFETTI ANIMATION ================== */
  launchConfetti() {
    const canvas = document.getElementById("confetti-canvas");
    if (!canvas) return;

    canvas.style.display = "block";
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");

    const particles = [];
    const colors = ["#6366f1", "#a855f7", "#ec4899", "#10b981", "#f59e0b", "#06b6d4"];

    for (let i = 0; i < 120; i++) {
      particles.push({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        vx: (Math.random() - 0.5) * 16,
        vy: (Math.random() - 0.8) * 18,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rSpeed: (Math.random() - 0.5) * 10,
        alpha: 1
      });
    }

    let frame = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.35; // gravity
        p.rotation += p.rSpeed;
        p.alpha -= 0.008;

        if (p.alpha > 0) {
          alive = true;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
          ctx.restore();
        }
      });

      frame++;
      if (alive && frame < 200) {
        requestAnimationFrame(animate);
      } else {
        canvas.style.display = "none";
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    requestAnimationFrame(animate);
  }

  /* ================== FLOATING COPILOT WIDGET ================== */
  toggleFloatingCopilot() {
    const widget = document.getElementById("floating-copilot-widget");
    if (widget) {
      widget.classList.toggle("open");
      if (window.soundEngine) window.soundEngine.playClick();
    }
  }

  /* ================== EVENT BINDINGS ================== */
  bindEvents() {
    // Keyboard shortcut (Ctrl + K or Cmd + K) for search
    window.addEventListener("keydown", e => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        this.switchTab("videos");
        const searchInput = document.getElementById("main-search-input");
        if (searchInput) searchInput.focus();
      }
    });

    // Window resize chart re-render
    window.addEventListener("resize", () => {
      this.refreshCharts();
    });
  }
}

// Instantiate on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  window.app = new LearnStreamApp();
});
