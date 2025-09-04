class ReadingSettings {
  constructor() {
    this.currentSettings = {
      fontSize: 18,
      fontFamily: "Inter",
      textAlign: "justify",
      readingMode: "scroll",
      theme: "dark",
      brightness: 1.0,
    };

    this.fontOptions = [
      "Inter",
      "Arial",
      "Times New Roman",
      "Georgia",
      "Verdana",
      "Kazimir",
      "Roboto",
    ];
    this.themes = this.createThemes();

    this.init();
  }

  createThemes() {
    return {
      dark: {
        "--reader-background": "#111827",
        "--reader-page": "#1e293b", // #1f2937
        "--reader-text": "#f8fafc",
        "--reader-border": "#111827",
        name: "Ночное небо",
      },
      "dark-blue": {
        "--reader-background": "#171717",
        "--reader-page": "#202124",
        "--reader-text": "#f1f5f9",
        "--reader-border": "#171717",
        name: "Асфальд",
      },
      "dark-warm": {
        "--reader-background": "#1c1917",
        "--reader-page": "#292524",
        "--reader-text": "#e7e5e4",
        "--reader-border": "#1c1917",
        name: "Тёмный кофе",
      },
      light: {
        "--reader-background": "#f8fafc",
        "--reader-page": "#ffffff",
        "--reader-text": "#1f2937",
        "--reader-border": "#e5e7eb",
        name: "Классический",
      },
      "light-warm": {
        "--reader-background": "#7e7e8f",
        "--reader-page": "#c6c6d5",
        "--reader-text": "#202020",
        "--reader-border": "#7e7e8f",
        name: "Туман",
      },
      sepia: {
        "--reader-background": "#f5e6d3",
        "--reader-page": "#fdf6e3",
        "--reader-text": "#644339",
        "--reader-border": "#f5e6d3",
        name: "Винтаж",
      },
      blue: {
        "--reader-background": "#edf2f7",
        "--reader-page": "#e2e8f0",
        "--reader-text": "#2d3748",
        "--reader-border": "#bdc4c8",
        name: "Современный UI",
      },
      green: {
        "--reader-background": "#e6ddd6",
        "--reader-page": "#faf8f2",
        "--reader-text": "#302d27",
        "--reader-border": "#e6e7e0",
        name: "Старая книга",
      },
    };
  }

  init() {
    this.setupEventListeners();
    this.loadSettings();

    // Убеждаемся, что все настройки применяются после загрузки DOM
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => {
        this.applyAllSettings();
        this.setupReadingMode();
      });
    } else {
      this.applyAllSettings();
      this.setupReadingMode();
    }

    // Обновление прогресса при загрузке контента
    window.addEventListener("bookContentLoaded", () => {
      console.log("Book content loaded, setting up reading mode");
      this.setupReadingMode();
      this.setupScrollProgressTracking(); // Подключаем отслеживание прокрутки
    });

  }

  setupEventListeners() {
    // Кнопки размера шрифта
    this.setupButton("font-size-increase", () => this.changeFontSize(1));
    this.setupButton("font-size-decrease", () => this.changeFontSize(-1));

    // Выбор шрифта
    this.setupSelect("font-family-select", (value) =>
      this.changeFontFamily(value)
    );

    // Выравнивание текста
    this.setupButton("text-align-left", () => {
      this.setTextAlign("left");
      this.updateButtonStates();
    });
    this.setupButton("text-align-justify", () => {
      this.setTextAlign("justify");
      this.updateButtonStates();
    });

    // Темы
    document.querySelectorAll(".theme-preset").forEach((preset) => {
      preset.addEventListener("click", () => {
        const theme = preset.dataset.theme;
        this.applyTheme(theme);
        this.saveSettings();
      });
    });

    // Открытие/закрытие настроек
    this.setupButton("reading-color-settings", () => this.openSettings());
    this.setupButton("settings-close", () => this.closeSettings());

    // Регулятор яркости
    const brightnessSlider = document.getElementById("brightness-slider");
    if (brightnessSlider) {
      brightnessSlider.addEventListener("input", (e) =>
        this.changeBrightness(parseFloat(e.target.value))
      );
    }

    // Закрытие настроек при клике вне
    document.addEventListener("click", (e) => {
      const sidebar = document.getElementById("settings-sidebar");
      if (
        sidebar &&
        sidebar.classList.contains("open") &&
        !sidebar.contains(e.target) &&
        !e.target.closest("#reading-color-settings")
      ) {
        this.closeSettings();
      }
    });
  }

  setupButton(id, callback) {
    const element = document.getElementById(id);
    if (element) {
      element.addEventListener("click", callback);
    }
  }

  setupSelect(id, callback) {
    const element = document.getElementById(id);
    if (element) {
      element.addEventListener("change", (e) => callback(e.target.value));
    }
  }

  changeFontSize(delta) {
    this.currentSettings.fontSize = Math.max(
      14,
      Math.min(24, this.currentSettings.fontSize + delta)
    );
    this.applyFontSettings();
    this.saveSettings();
  }

  changeFontFamily(font) {
    this.currentSettings.fontFamily = font;
    this.applyFontSettings();
    this.saveSettings();
  }

  changeBrightness(brightness) {
    this.currentSettings.brightness = brightness;
    this.applyBrightness();
    this.saveSettings();

    // Обновляем отображение значения
    const brightnessDisplay = document.getElementById("brightness-display");
    if (brightnessDisplay) {
      brightnessDisplay.textContent = `${Math.round(brightness * 100)}%`;
    }
  }

  setTextAlign(align) {
    this.currentSettings.textAlign = align;
    this.applyFontSettings();
    this.saveSettings();
    this.updateButtonStates();
  }

  setReadingMode(mode) {
    console.log("Setting reading mode to scroll (page mode removed)");
    this.currentSettings.readingMode = "scroll"; // Always use scroll mode

    const bookContent = document.getElementById("book-content");
    if (!bookContent) {
      console.error("Book content element not found");
      return;
    }

    this.setupScrollMode();
    this.saveSettings();
    this.updateButtonStates();
  }

  setupScrollMode() {
    console.log("Setting up scroll mode");
    const bookContent = document.getElementById("book-content");
    if (!bookContent) return;

    bookContent.style.cssText = `
      height: auto;
      overflow-y: auto;
      padding: 2rem;
      margin: 80px auto 2rem;
      max-width: 800px;
      background: var(--reader-page, var(--background-primary));
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
      font-size: ${this.currentSettings.fontSize}px;
      font-family: ${this.currentSettings.fontFamily};
      text-align: ${this.currentSettings.textAlign};
      line-height: 1.8;
      scroll-behavior: smooth;
    `;

    const paragraphs = bookContent.querySelectorAll("p");
    paragraphs.forEach((p) => {
      p.style.marginBottom = "1.5rem";
      p.style.lineHeight = "1.8";
    });

    const images = bookContent.querySelectorAll("img");
    images.forEach((img) => {
      img.style.maxWidth = "100%";
      img.style.height = "auto";
      img.style.display = "block";
      img.style.margin = "2rem auto";
      img.style.borderRadius = "8px";
      img.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
      img.style.cursor = "pointer";

      img.addEventListener("click", () => {
        this.toggleImageFullscreen(img);
      });
    });

    // Начинаем отслеживать прокрутку
    this.setupScrollProgressTracking();
    this.updateReadingProgress(); // Обновляем прогресс сразу
  }


  setupScrollProgressTracking() {
    const bookContent = document.getElementById("book-content");
    if (!bookContent) return;

    // Удаляем старый слушатель, чтобы не дублировался
    if (this.scrollHandler) {
      bookContent.removeEventListener("scroll", this.scrollHandler);
    }

    this.scrollHandler = () => {
      this.updateReadingProgress();
    };

    bookContent.addEventListener("scroll", this.scrollHandler);

    // Также вызываем один раз
    this.updateReadingProgress();
  }


  toggleImageFullscreen(img) {
    if (img.classList.contains("fullscreen")) {
      img.classList.remove("fullscreen");
      document.body.style.overflow = "";
      img.style.cssText = `
        max-width: 100%;
        height: auto;
        display: block;
        margin: 2rem auto;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        cursor: pointer;
      `;
    } else {
      img.classList.add("fullscreen");
      document.body.style.overflow = "hidden";
      img.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        max-width: 90vw;
        max-height: 90vh;
        z-index: 10000;
        cursor: zoom-out;
      `;
    }
  }

  updateReadingProgress() {
    let progressPercent = 0;

    const bookContent = document.getElementById("book-content");
    if (bookContent) {
      const scrollTop = bookContent.scrollTop;
      const scrollHeight =
        bookContent.scrollHeight - bookContent.clientHeight;
      progressPercent =
        scrollHeight > 0
          ? Math.min(100, Math.round((scrollTop / scrollHeight) * 100))
          : 0;
    }

    // Обновляем все прогресс-бары
    const progressElements = [
      { fill: "reading-progress-fill", text: "reading-progress-text" },
      {
        fill: "reading-modal-progress-fill",
        text: "reading-modal-progress-text",
      },
    ];

    progressElements.forEach(({ fill, text }) => {
      const fillEl = document.getElementById(fill);
      const textEl = document.getElementById(text);

      if (fillEl) fillEl.style.width = `${progressPercent}%`;
      if (textEl) textEl.textContent = `${progressPercent}%`;
    });

    // Также обновляем элементы прогресса в хедере режима чтения
    const additionalElements = [
      { fill: "reading-progress-fill", text: "reading-progress-text" },
      { fill: "progress-fill", text: "progress-text" }, // для совместимости
    ];

    additionalElements.forEach(({ fill, text }) => {
      const fillEl = document.getElementById(fill);
      const textEl = document.getElementById(text);

      if (fillEl) {
        fillEl.style.width = `${progressPercent}%`;
      }

      if (textEl) {
        textEl.textContent = `${progressPercent}%`;
      }
    });

    // Сохраняем прогресс отдельно
    this.saveReadingProgress(progressPercent);
  }

  getBookId() {
    return window.bookConfig?.getCurrentBook?.()?.id || "unknown-book";
  }

  saveReadingProgress(progressPercent) {
    const bookId = this.getBookId();

    // Get current scroll position for scroll mode
    const bookContent = document.getElementById("book-content");
    const scrollTop = bookContent ? bookContent.scrollTop : 0;

    const progressData = {
      bookId,
      progress: progressPercent,
      scrollPosition: scrollTop,
      readingMode: this.currentSettings.readingMode,
      timestamp: new Date().toISOString(),
    };

    try {
      localStorage.setItem(
        `reading-progress-${bookId}`,
        JSON.stringify(progressData)
      );
    } catch (e) {
      console.error("Failed to save reading progress:", e);
    }
  }

  loadReadingProgress() {
    const bookId = this.getBookId();
    const saved = localStorage.getItem(`reading-progress-${bookId}`);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        return data.progress || 0;
      } catch (e) {
        console.error("Error loading reading progress:", e);
      }
    }
    return 0;
  }

  applyFontSettings() {
    const bookContent = document.getElementById("book-content");
    if (!bookContent) return;

    bookContent.style.fontSize = `${this.currentSettings.fontSize}px`;
    bookContent.style.fontFamily = this.currentSettings.fontFamily;
    bookContent.style.textAlign = this.currentSettings.textAlign;

    const fontSizeDisplay = document.getElementById("font-size-display");
    if (fontSizeDisplay) {
      fontSizeDisplay.textContent = `${this.currentSettings.fontSize}px`;
    }
  }

  applyBrightness() {
    const brightness = this.currentSettings.brightness;

    // Применяем яркость ко всем CSS переменным reader
    const root = document.documentElement;

    // Получаем базовые цвета из текущей темы
    const currentTheme =
      this.themes[this.currentSettings.theme] || this.themes.dark;

    Object.keys(currentTheme).forEach((variable) => {
      if (variable !== "name") {
        const originalColor = currentTheme[variable];
        const adjustedColor = this.adjustColorBrightness(
          originalColor,
          brightness
        );
        root.style.setProperty(variable, adjustedColor);
      }
    });

    // Обновляем слайдер
    const brightnessSlider = document.getElementById("brightness-slider");
    if (brightnessSlider) {
      brightnessSlider.value = brightness;
    }

    // Обновляем отображение значения
    const brightnessDisplay = document.getElementById("brightness-display");
    if (brightnessDisplay) {
      brightnessDisplay.textContent = `${Math.round(brightness * 100)}%`;
    }
  }

  // Функция для изменения яркости цвета
  adjustColorBrightness(color, brightness) {
    // Конвертируем hex в RGB
    const hex = color.replace("#", "");
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);

    // Применяем яркость (умножаем на коэффициент)
    const newR = Math.round(Math.min(255, r * brightness));
    const newG = Math.round(Math.min(255, g * brightness));
    const newB = Math.round(Math.min(255, b * brightness));

    // Конвертируем обратно в hex
    const toHex = (n) => n.toString(16).padStart(2, "0");
    return `#${toHex(newR)}${toHex(newG)}${toHex(newB)}`;
  }

  applyTheme(themeName) {
    if (!this.themes[themeName]) return;

    const theme = this.themes[themeName];
    Object.keys(theme).forEach((variable) => {
      if (variable !== "name") {
        document.documentElement.style.setProperty(variable, theme[variable]);
      }
    });

    this.currentSettings.theme = themeName;
    this.updateActiveTheme(themeName);

    // Повторно применяем яркость после смены темы
    this.applyBrightness();

    // Сохраняем настройки после применения темы
    this.saveSettings();
  }

  updateActiveTheme(themeName) {
    document.querySelectorAll(".theme-preset").forEach((preset) => {
      preset.classList.remove("active");
    });

    const activePreset = document.querySelector(`[data-theme="${themeName}"]`);
    if (activePreset) {
      activePreset.classList.add("active");
    }
  }

  updateButtonStates() {
    this.updateButtonState(
      "text-align-left",
      this.currentSettings.textAlign === "left"
    );
    this.updateButtonState(
      "text-align-justify",
      this.currentSettings.textAlign === "justify"
    );
    this.updateActiveTheme(this.currentSettings.theme);
  }

  updateButtonState(buttonId, isActive) {
    const button = document.getElementById(buttonId);
    if (button) {
      if (isActive) {
        button.classList.add("active");
      } else {
        button.classList.remove("active");
      }
    }
  }

  applyAllSettings() {
    console.log("Applying all settings:", this.currentSettings);
    this.applyFontSettings();
    this.applyTheme(this.currentSettings.theme);
    this.applyBrightness();
    this.updateButtonStates();
  }

  setupReadingMode() {
    this.setReadingMode(this.currentSettings.readingMode);

    // Restore scroll position after setup - добавляем несколько попыток
    const savedProgress = this.loadSavedProgressData();
    if (savedProgress && savedProgress.scrollPosition) {
      this.restoreScrollPosition(savedProgress.scrollPosition);
    }
  }

  restoreScrollPosition(scrollPosition) {
    let attempts = 0;
    const maxAttempts = 10;

    const tryRestore = () => {
      const bookContent = document.getElementById("book-content");
      if (bookContent && bookContent.scrollHeight > 0) {
        bookContent.scrollTop = scrollPosition;
        console.log(`Scroll position restored to: ${scrollPosition}`);
        return true;
      }

      attempts++;
      if (attempts < maxAttempts) {
        setTimeout(tryRestore, 500);
      }
      return false;
    };

    // Первая попытка сразу
    if (!tryRestore()) {
      // Если не получилось, попробуем через события
      window.addEventListener(
        "bookContentLoaded",
        () => {
          setTimeout(() => tryRestore(), 200);
        },
        { once: true }
      );
    }
  }

  loadSavedProgressData() {
    const bookId = this.getBookId();
    const saved = localStorage.getItem(`reading-progress-${bookId}`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error loading reading progress data:", e);
      }
    }
    return null;
  }

  saveSettings() {
    const settings = {
      ...this.currentSettings,
      timestamp: new Date().toISOString(),
    };

    try {
      localStorage.setItem("reading-settings", JSON.stringify(settings));
    } catch (e) {
      console.error("Failed to save reading settings:", e);
    }
  }

  loadSettings() {
    // Загружаем общие настройки
    const saved = localStorage.getItem("reading-settings");
    if (saved) {
      try {
        const settings = JSON.parse(saved);
        if (settings) {
          this.currentSettings = { ...this.currentSettings, ...settings };
        }
      } catch (e) {
        console.error("Error loading reading settings:", e);
      }
    }
  }

  openSettings() {
    const sidebar = document.getElementById("settings-sidebar");
    if (sidebar) {
      sidebar.classList.add("open");
    }
  }

  closeSettings() {
    const sidebar = document.getElementById("settings-sidebar");
    if (sidebar) {
      sidebar.classList.remove("open");
    }
  }
}

// Инициализация
document.addEventListener("DOMContentLoaded", function () {
  if (!window.readingSettings) {
    window.readingSettings = new ReadingSettings();
  }

  // Глобальные функции (если используются в HTML)
  window.openReadingSettings = function () {
    if (window.readingSettings) {
      window.readingSettings.openSettings();
    }
  };

  window.closeReadingSettings = function () {
    if (window.readingSettings) {
      window.readingSettings.closeSettings();
    }
  };

  const colorSettingsBtn = document.getElementById("reading-color-settings");
  if (colorSettingsBtn) {
    colorSettingsBtn.addEventListener("click", window.openReadingSettings);
  }
});
