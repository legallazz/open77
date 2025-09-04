// progress-manager.js
class ProgressManager {
  constructor() {
    this.initialize();
  }

  initialize() {
    this.setupGlobalListeners();
  }

  setupGlobalListeners() {
    // Автосохранение прогресса при изменении
    setInterval(() => {
      this.saveAllProgress();
    }, 5000);

    // Сохранение перед закрытием страницы
    window.addEventListener("beforeunload", () => {
      this.saveAllProgress();
    });

    // Восстановление при загрузке
    window.addEventListener("load", () => {
      this.restoreAllProgress();
    });
  }

  saveAllProgress() {
    // Сохраняем прогресс для всех книг
    const books = window.bookConfig?.getAllBooks() || [];
    books.forEach((book) => {
      const progress = this.getCurrentProgress(book.id);
      if (progress !== null) {
        this.saveProgress(book.id, progress);
      }
    });
  }

  restoreAllProgress() {
    // Восстанавливаем прогресс для текущей книги
    const currentBook = window.bookConfig?.getCurrentBook();
    if (currentBook) {
      const progress = this.loadProgress(currentBook.id);
      if (progress !== null) {
        this.updateProgressUI(progress);
      }
    }
  }

  getCurrentProgress(bookId) {
    if (window.bookReader && bookId === window.bookReader.bookId) {
      return window.bookReader.currentProgress;
    }

    // Для других книг пытаемся получить из UI
    const progressFill = document.getElementById("reading-progress-fill");
    if (progressFill) {
      const width = progressFill.style.width;
      return parseInt(width) || 0;
    }

    return null;
  }

  saveProgress(bookId, progress) {
    const progressData = {
      progress: progress,
      timestamp: new Date().toISOString(),
      page: window.bookReader?.currentPage || 1,
    };

    try {
      localStorage.setItem(
        `reading-progress-${bookId}`,
        JSON.stringify(progressData)
      );
    } catch (e) {
      console.error("Failed to save progress:", e);
    }
  }

  loadProgress(bookId) {
    try {
      const stored = localStorage.getItem(`reading-progress-${bookId}`);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error("Error loading progress:", e);
    }
    return null;
  }

  updateProgressUI(progressData) {
    const progress = progressData.progress || 0;

    // Обновляем все элементы прогресса
    const elements = [
      "reading-progress-fill",
      "reading-modal-progress-fill",
      "progress-fill",
    ];

    elements.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        element.style.width = `${progress}%`;
      }
    });

    const textElements = [
      "reading-progress-text",
      "reading-modal-progress-text",
      "progress-text",
    ];

    textElements.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        element.textContent = `${Math.round(progress)}%`;
      }
    });

    // Обновляем кнопки
    this.updateActionButtons(progress);
  }

  updateActionButtons(progress) {
    const startBtn = document.getElementById("start-reading");
    const continueBtn = document.getElementById("continue-reading");

    if (progress > 5) {
      if (startBtn) {
        startBtn.textContent = "Продолжить чтение";
        startBtn.innerHTML =
          '<i class="fas fa-book-open"></i> Продолжить чтение';
      }
      if (continueBtn) {
        continueBtn.style.display = "inline-flex";
        continueBtn.textContent = `Продолжить с ${Math.round(progress)}%`;
      }
    } else {
      if (startBtn) {
        startBtn.textContent = "Начать чтение";
        startBtn.innerHTML = '<i class="fas fa-book-open"></i> Начать чтение';
      }
      if (continueBtn) {
        continueBtn.style.display = "none";
      }
    }
  }
}

// Инициализация
document.addEventListener("DOMContentLoaded", () => {
  window.progressManager = new ProgressManager();
});
