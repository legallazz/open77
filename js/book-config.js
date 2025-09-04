class BookConfig {
  constructor() {
    this.books = {
      neurofitness: {
        id: "neurofitness",
        title: "Нейрофитнес",
        author: "Рахул Джандиал",
        description:
          "Руководство по улучшению работы мозга через физические упражнения и правильное питание.",
        ageRating: "18+",
        readingTime: "~4 часа",
        folder: "books-pack/neurofitness/",
        poster: "books-pack/neurofitness/images/poster.jpg",
        bookFile: "books-pack/neurofitness/book/neurofitness.fb2",
        bookFormat: "fb2",
        audioFolder: "books-pack/neurofitness/audio/",
        audioCount: 17,
        audioFiles: [],
        audioFileNames: [
          "01. Введение",
          "02. Основы нейрофитнеса",
          "03. Упражнения для мозга",
          "04. Питание для ума",
          "05. Сон и восстановление",
          "06. Стресс-менеджмент",
          "07. Когнитивные тренировки",
          "08. Физическая активность",
          "09. Медитация",
          "10. Дополнительные методики",
          "11. Практические советы",
          "12. День из жизни",
          "13. Результаты",
          "14. Частые вопросы",
          "15. Заключение",
          "16. Бонусные материалы",
          "17. Ресурсы",
        ],
        features: ["Чтение", "Аудио"],
        status: "available",
      },
      ezhevichnaya_zima: {
        id: "ezhevichnaya_zima",
        title: "Ежевичная зима",
        author: "Сара Джио",
        description:
          "Атмосферный роман в жанре женской прозы с элементами тайны и исторической драмы.",
        ageRating: "16+",
        readingTime: "~10 часов",
        folder: "books-pack/ezhevichnaya_zima/",
        poster: "books-pack/ezhevichnaya_zima/images/poster.jpg",
        bookFile: "books-pack/ezhevichnaya_zima/book/ezhevichnaya_zima.fb2",
        bookFormat: "fb2",
        audioFolder: "books-pack/ezhevichnaya_zima/audio/",
        audioCount: 20,
        audioFiles: [],
        audioFileNames: [
          "01. Пролог",
          "02. Прибытие",
          "03. Первая встреча",
          "04. Тайна начинается",
          "05. Старые письма",
          "06. Воспоминания",
          "07. Связь времен",
          "08. Открытие",
          "09. Сердечные дела",
          "10. Поворотный момент",
          "11. Темные секреты",
          "12. Конфронтация",
          "13. Прошлое настигает",
          "14. Объяснения",
          "15. Примирение",
          "16. Новые начала",
          "17. Эпилог",
          "18. Бонусная глава 1",
          "19. Бонусная глава 2",
          "20. Послесловие",
        ],
        features: ["Чтение", "Аудио"],
        status: "available",
      },
      atomnye_privychki: {
        id: "atomnye_privychki",
        title: "Атомные привычки",
        author: "Джеймс Клир", // ✅ Исправлено: Клир Джеймс → Джеймс Клир
        description:
          "Практическое руководство по формированию полезных привычек и избавлению от вредных через маленькие, ежедневные изменения.",
        ageRating: "16+",
        readingTime: "~8 часов",
        folder: "books-pack/atomnye_privychki/",
        poster: "books-pack/atomnye_privychki/images/poster.jpg",
        bookFile: "books-pack/atomnye_privychki/book/atomnye_privychki.fb2",
        bookFormat: "fb2",
        audioFolder: "books-pack/atomnye_privychki/audio/",
        audioCount: 24,
        audioFiles: [
          "00.mp3",
          "01.mp3",
          "02.mp3",
          "03.mp3",
          "04.mp3",
          "05.mp3",
          "06.mp3",
          "07.mp3",
          "08.mp3",
          "09.mp3",
          "10.mp3",
          "11.mp3",
          "12.mp3",
          "13.mp3",
          "14.mp3",
          "15.mp3",
          "16.mp3",
          "17.mp3",
          "18.mp3",
          "19.mp3",
          "20.mp3",
          "21.mp3",
          "22.mp3",
          "23.mp3",
          "24.mp3",
        ],
        audioFileNames: [
          "Введение",
          "Глава 1",
          "Глава 2",
          "Глава 3",
          "Глава 4",
          "Глава 5",
          "Глава 6",
          "Глава 7",
          "Глава 8",
          "Глава 9",
          "Глава 10",
          "Глава 11",
          "Глава 12",
          "Глава 13",
          "Глава 14",
          "Глава 15",
          "Глава 16",
          "Глава 17",
          "Глава 18",
          "Глава 19",
          "Глава 20",
          "Заключение",
          "Приложения",
          "Благодарности",
        ],
        features: ["Чтение", "Аудио"],
        status: "available",
      },
      bozhestvennaya_komediya: {
        id: "bozhestvennaya_komediya",
        title: "Божественная комедия",
        author: "Данте Алигьери",
        description:
          "Поэма итальянского поэта Данте Алигьери, написанная в начале XIV века.",
        ageRating: "16+",
        readingTime: "~21 час",
        folder: "books-pack/bozhestvennaya_komediya/",
        poster: "books-pack/bozhestvennaya_komediya/images/poster.jpg",
        bookFile:
          "books-pack/bozhestvennaya_komediya/book/bozhestvennaya_komediya.fb2",
        bookFormat: "fb2",
        audioFolder: "books-pack/bozhestvennaya_komediya/audio/",
        audioCount: 100,
        audioFiles: Array.from({ length: 100 }, (_, i) => {
          if (i < 34) {
            return `1_${String(i + 1).padStart(2, "0")}.mp3`;
          } else if (i < 67) {
            const num = i - 34 + 1;
            return `2_${String(num).padStart(2, "0")}.mp3`;
          } else {
            const num = i - 67 + 1;
            return `3_${String(num).padStart(2, "0")}.mp3`;
          }
        }),
        audioFileNames: Array.from({ length: 100 }, (_, i) => {
          if (i < 34) {
            return `Ад, Песнь ${i + 1}`;
          } else if (i < 67) {
            const num = i - 34 + 1;
            return `Чистилище, Песнь ${num}`;
          } else {
            const num = i - 67 + 1;
            return `Рай, Песнь ${num}`;
          }
        }),
        features: ["Чтение", "Аудио"],
        status: "available",
      },
    };

    this.currentBookId = null;
  }

  getBook(bookId) {
    return this.books[bookId] || null;
  }

  getAllBooks() {
    return Object.values(this.books);
  }

  setCurrentBookFromUrl() {
    const path = window.location.pathname;
    const fileName = path.split("/").pop();
    const bookId = fileName.replace(".html", "");

    if (this.books[bookId]) {
      this.currentBookId = bookId;
      return bookId;
    }
    return null;
  }

  getCurrentBook() {
    if (this.currentBookId) {
      return this.books[this.currentBookId];
    }
    const bookId = this.setCurrentBookFromUrl();
    return bookId ? this.books[bookId] : null;
  }

  addBook(config) {
    if (!config.id) {
      console.error("Book ID is required");
      return false;
    }

    const audioFiles =
      config.audioFiles ||
      Array.from(
        { length: config.audioCount || 0 },
        (_, i) => `${String(i + 1).padStart(2, "0")}.mp3`
      );

    const audioFileNames =
      config.audioFileNames ||
      Array.from(
        { length: config.audioCount || 0 },
        (_, i) => `Глава ${i + 1}`
      );

    this.books[config.id] = {
      id: config.id,
      title: config.title || "Без названия",
      author: config.author || "Неизвестный автор",
      description: config.description || "",
      ageRating: config.ageRating || "0+",
      readingTime: config.readingTime || "~1 час",
      folder: config.folder || `books-pack/${config.id}/`,
      poster: config.poster || `books-pack/${config.id}/images/poster.jpg`,
      bookFile:
        config.bookFile || `books-pack/${config.id}/book/${config.id}.fb2`,
      bookFormat: config.bookFormat || "fb2",
      audioFolder: config.audioFolder || `books-pack/${config.id}/audio/`,
      audioCount: config.audioCount || 0,
      audioFiles: audioFiles,
      audioFileNames: audioFileNames,
      features:
        config.features ||
        ["Чтение"].concat(config.audioCount > 0 ? ["Аудио"] : []),
      status: config.status || "available",
    };

    return true;
  }

  removeBook(bookId) {
    if (this.books[bookId]) {
      delete this.books[bookId];
      return true;
    }
    return false;
  }

  updateBook(bookId, updates) {
    if (this.books[bookId]) {
      this.books[bookId] = { ...this.books[bookId], ...updates };
      return true;
    }
    return false;
  }

  exportConfig() {
    return JSON.stringify(this.books, null, 2);
  }

  importConfig(configJson) {
    try {
      const config = JSON.parse(configJson);
      this.books = { ...this.books, ...config };
      return true;
    } catch (error) {
      console.error("Error importing config:", error);
      return false;
    }
  }

  getBooksByStatus(status) {
    return Object.values(this.books).filter((book) => book.status === status);
  }

  getAvailableBooks() {
    return this.getBooksByStatus("available");
  }

  getComingSoonBooks() {
    return this.getBooksByStatus("coming-soon");
  }
}

// Инициализация
window.bookConfig = new BookConfig();
class BookDOMHelper {
  static updateHomePageProgress(bookId, progressPercent) {
    const bookCard = document.querySelector(`[data-book="${bookId}"]`);
    if (bookCard) {
      const progressFill = bookCard.querySelector(".progress-fill");
      const progressText = bookCard.querySelector(
        ".progress-info span:first-child"
      );
      const actionButton = bookCard.querySelector("button");

      if (progressFill) {
        progressFill.style.width = `${progressPercent}%`;
      }

      if (progressText) {
        progressText.textContent = `Прогресс: ${Math.round(progressPercent)}%`;
      }

      if (actionButton && progressPercent > 5) {
        actionButton.innerHTML =
          '<i class="fas fa-book-open"></i> Продолжить чтение';
      }
    }
  }

  static updateBookPage(bookConfig) {
    if (!bookConfig) {
      console.error("No book configuration provided");
      return;
    }

    const progress = window.bookReader
      ? window.bookReader.loadReadingProgress()
      : { progress: 0 };

    const progressFill = document.getElementById("progress-fill");
    const progressText = document.getElementById("progress-text");
    const startBtn = document.getElementById("start-reading");

    if (progressFill) {
      progressFill.style.width = `${progress.progress || 0}%`;
    }

    if (progressText) {
      progressText.textContent = `Прогресс: ${Math.round(
        progress.progress || 0
      )}%`;
    }

    if (startBtn && progress.progress > 5) {
      startBtn.textContent = "Продолжить чтение";
      startBtn.innerHTML = '<i class="fas fa-book-open"></i> Продолжить чтение';
    }

    // Обновляем заголовок страницы
    document.title = `${bookConfig.title} - Цифровая Библиотека`;

    // Обновляем meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }
    // 🔧 Динамически формируем описание
    metaDescription.content = `Читайте книгу ${bookConfig.title} от ${bookConfig.author} онлайн с настройкой цветов и темы для комфортного чтения.`;

    // Обновляем обложку
    const posterImg = document.getElementById("book-poster");
    if (posterImg) {
      posterImg.src = bookConfig.poster;
      posterImg.alt = `${bookConfig.title} - обложка книги`;
    }

    // Обновляем заголовки
    const titleElements = document.querySelectorAll(
      ".book-title-large, .book-nav-title, #book-title-menu"
    );
    titleElements.forEach((el) => {
      if (el) {
        el.textContent = bookConfig.title;
      }
    });

    // Обновляем автора
    const authorElements = document.querySelectorAll(".book-author-large");
    authorElements.forEach((el) => {
      if (el) {
        el.textContent = bookConfig.author;
      }
    });

    // Обновляем описание
    const descriptionElements = document.querySelectorAll(
      ".book-description-large"
    );
    descriptionElements.forEach((el) => {
      if (el) {
        el.textContent = bookConfig.description;
      }
    });

    // Обновляем заголовок аудио (если есть)
    if (bookConfig.audioCount > 0) {
      const audioInfo = document.querySelector(".audio-info h3");
      if (audioInfo) {
        audioInfo.textContent = `Аудиокнига: ${bookConfig.title}`;
      }
    }

    // Устанавливаем data-атрибуты и кнопку скачивания
    if (bookConfig.status === "available") {
      document.body.setAttribute("data-audio-folder", bookConfig.audioFolder);
      document.body.setAttribute(
        "data-audio-count",
        String(bookConfig.audioCount)
      );
      document.body.setAttribute("data-book-file", bookConfig.bookFile);
      document.body.setAttribute("data-book-type", bookConfig.bookFormat);
      document.body.setAttribute("data-poster-image", bookConfig.poster);

      // Настройка кнопки скачивания
      const downloadLink = document.getElementById("download-book");
      if (downloadLink) {
        downloadLink.href = bookConfig.bookFile;
        const fileName = `${bookConfig.id}.${bookConfig.bookFormat}`;
        downloadLink.setAttribute("download", fileName);
      }
    } else {
      // Если книга недоступна
      const downloadLink = document.getElementById("download-book");
      if (downloadLink) {
        downloadLink.href = "#";
        downloadLink.removeAttribute("download");
        downloadLink.onclick = (e) => {
          e.preventDefault();
          window.showComingSoon(bookConfig?.title || "Книга");
        };
      }
    }
  }

  static generateBookCard(bookConfig) {
    // Получаем прогресс чтения для этой книги
    const progressData = localStorage.getItem(
      `reading-progress-${bookConfig.id}`
    );
    let progressPercent = 0;
    try {
      if (progressData) {
        const parsed = JSON.parse(progressData);
        progressPercent = parsed.progress || 0;
      }
    } catch (e) {
      console.warn("Could not parse progress data:", e);
    }

    return `
  <div class="compact-book-card" data-book="${bookConfig.id}">
    <div class="compact-book-cover">
      ${
        bookConfig.poster
          ? `<img src="${bookConfig.poster}" alt="${bookConfig.title}" loading="lazy" />`
          : ""
      }
      <div class="compact-book-badges">
        <span class="compact-book-status">${
          bookConfig.ageRating || "16+"
        }</span>
      </div>
    </div>
    
    <div class="compact-book-info">
      <h3 class="book-title">${bookConfig.title}</h3>
      <p class="book-author">${bookConfig.author}</p>
      <p class="book-description">${bookConfig.description}</p>
      
      <div class="book-metadata">
        <span class="reading-time">${bookConfig.readingTime || "~3 часа"}</span>
      </div>
      
      <!-- Прогресс бар для каждой карточки -->
      <div class="book-progress-section" style="margin: 10px 0;">
        <div class="progress-bar" style="height: 4px; background: var(--surface-secondary); border-radius: 2px;">
          <div class="progress-fill" style="width: ${progressPercent}%; height: 100%; background: var(--primary); border-radius: 2px; transition: width 0.3s ease;"></div>
        </div>
        <div class="progress-info" style="display: flex; justify-content: space-between; margin-top: 5px; font-size: 12px; color: var(--text-secondary);">
          <span>Прогресс: ${Math.round(progressPercent)}%</span>
          ${progressPercent > 5 ? `<span>Продолжить чтение</span>` : ""}
        </div>
      </div>
      
      <div class="compact-book-features">
        ${bookConfig.features
          .map(
            (feature) => `
          <span class="compact-feature">
            <i class="fas ${
              feature === "Аудио" ? "fa-headphones" : "fa-book"
            }"></i> ${feature}
          </span>
        `
          )
          .join("")}
      </div>
      
      <button class="btn-primary mgb" onclick="openBook('${bookConfig.id}')" 
              data-testid="button-read-${bookConfig.id}">
        <i class="fas fa-book-open"></i> 
        ${
          bookConfig.status === "available"
            ? progressPercent > 5
              ? "Продолжить чтение"
              : "Читать"
            : "Скоро"
        }
      </button>
    </div>
  </div>
  `;
  }

  static renderBooksGrid(containerId, books) {
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`Container with id "${containerId}" not found`);
      return;
    }

    if (books.length === 0) {
      container.innerHTML = '<div class="no-books">Книги не найдены</div>';
      return;
    }

    container.innerHTML = books
      .map((book) => this.generateBookCard(book))
      .join("");
  }

  static loadAndDisplayProgress(bookId) {
    // Загружаем прогресс из localStorage
    const saved = localStorage.getItem(`reading-progress-${bookId}`);
    if (saved) {
      try {
        const progressData = JSON.parse(saved);
        const progressPercent = progressData.progress || 0;

        // Обновляем все элементы прогресса на странице (правильные ID!)
        const progressElements = [
          "reading-progress-fill",
          "reading-modal-progress-fill",
          "progress-fill", // на случай если есть где-то
        ];

        const textElements = [
          "reading-progress-text",
          "reading-modal-progress-text",
          "progress-text", // на случай если есть где-то
        ];

        progressElements.forEach((id) => {
          const element = document.getElementById(id);
          if (element) {
            element.style.width = `${progressPercent}%`;
          }
        });

        textElements.forEach((id) => {
          const element = document.getElementById(id);
          if (element) {
            element.textContent = `${Math.round(progressPercent)}%`;
          }
        });

        // Обновляем кнопку "Продолжить"
        const startBtn = document.getElementById("start-reading");
        const continueBtn = document.getElementById("continue-reading");

        if (progressPercent > 5) {
          if (startBtn) {
            startBtn.textContent = "Продолжить чтение";
            startBtn.innerHTML =
              '<i class="fas fa-book-open"></i> Продолжить чтение';
          }
          if (continueBtn) {
            continueBtn.style.display = "inline-flex";
            continueBtn.style.visibility = "visible";
            try {
              continueBtn.textContent = `Продолжить с ${Math.round(
                progressPercent
              )}%`;
            } catch (e) {
              console.warn(
                "Could not set continueBtn textContent in loadAndDisplayProgress:",
                e
              );
            }
          }

          // Сделать видимой кнопку продолжения прослушивания
          const continueAudioBtn =
            document.getElementById("continue-listening");
          if (continueAudioBtn) {
            continueAudioBtn.style.display = "inline-flex";
            continueAudioBtn.style.visibility = "visible";
          }
        } else {
          // Скрываем кнопки продолжения если прогресс маленький
          if (continueBtn) {
            continueBtn.style.display = "none";
          }
          const continueAudioBtn =
            document.getElementById("continue-listening");
          if (continueAudioBtn) {
            continueAudioBtn.style.display = "none";
          }
        }

        console.log(`Progress loaded for ${bookId}: ${progressPercent}%`);
      } catch (e) {
        console.error("Error loading progress:", e);
      }
    }
  }

  static updateHomePage() {
    const availableBooks = window.bookConfig.getAvailableBooks();
    this.renderBooksGrid("books-grid", availableBooks);

    const comingSoonBooks = window.bookConfig.getComingSoonBooks();
    if (comingSoonBooks.length > 0) {
      this.renderBooksGrid("coming-soon-grid", comingSoonBooks);
    }
  }

  static updateHomePageProgress(bookId, progressPercent) {
    // Обновляем прогресс в карточках на главной странице при перерисовке
    const bookCard = document.querySelector(`[data-book="${bookId}"]`);
    if (bookCard) {
      const progressFill = bookCard.querySelector(".progress-fill");
      const progressText = bookCard.querySelector(
        ".progress-info span:first-child"
      );
      const actionButton = bookCard.querySelector("button");

      if (progressFill) {
        progressFill.style.width = `${progressPercent}%`;
      }

      if (progressText) {
        progressText.textContent = `Прогресс: ${Math.round(progressPercent)}%`;
      }

      if (actionButton && progressPercent > 5) {
        actionButton.innerHTML =
          '<i class="fas fa-book-open"></i> Продолжить чтение';
      }
    }
  }
}

// Инициализация при загрузке
document.addEventListener("DOMContentLoaded", function () {
  if (document.querySelector(".book-header")) {
    const bookConfig = window.bookConfig.getCurrentBook();
    if (bookConfig) {
      BookDOMHelper.updateBookPage(bookConfig);

      // Загружаем и отображаем сохраненный прогресс
      BookDOMHelper.loadAndDisplayProgress(bookConfig.id);
    } else {
      console.error("Book configuration not found for current page");
    }
  }

  if (document.getElementById("books-grid")) {
    BookDOMHelper.updateHomePage();
  }
});

// Глобальные функции
window.openBook = function (bookId) {
  const bookConfig = window.bookConfig.getBook(bookId);
  if (bookConfig && bookConfig.status === "available") {
    window.location.href = `${bookId}.html`;
  } else {
    window.showComingSoon(bookConfig?.title || bookId);
  }
};

window.showComingSoon = function (bookTitle) {
  alert(`${bookTitle} будет доступна в ближайшее время!`);
};
