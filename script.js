/* ================================================================
   1. داتا الألعاب والأقسام اللي بنعرضها في الموقع
   ================================================================ */

const trendingGames = [
  { img: "images/trending-01.jpg", genre: "Action / RPG", title: "Assassin's Creed" },
  { img: "images/trending-02.jpg", genre: "Open World", title: "Cyberpunk 2077" },
  { img: "images/trending-03.jpg", genre: "Adventure", title: "God of War" },
  { img: "images/trending-04.jpg", genre: "Dark Fantasy", title: "Elden Ring" },
];

const mostPlayedGames = [
  { img: "images/top-game-01.jpg", genre: "Action", title: "Assassin's Creed" },
  { img: "images/top-game-02.jpg", genre: "Open World", title: "Cyberpunk 2077" },
  { img: "images/top-game-03.jpg", genre: "Adventure", title: "God of War" },
  { img: "images/top-game-04.jpg", genre: "Fantasy", title: "Elden Ring" },
  { img: "images/top-game-05.jpg", genre: "Shooter", title: "Halo Infinite" },
  { img: "images/top-game-06.jpg", genre: "RPG", title: "The Witcher 3" },
];

const categories = [
  { genre: "Action", img: "images/categories-01.jpg" },
  { genre: "RPG", img: "images/categories-02.jpg" },
  { genre: "Adventure", img: "images/categories-03.jpg" },
  { genre: "Shooter", img: "images/categories-04.jpg" },
  { genre: "Strategy", img: "images/categories-05.jpg" },
];

/* ================================================================
   2. دوال مساعدة لتقليل تكرار الكود
   ================================================================ */

// دالة بتعمل عنصر HTML جديد وبتضيف الكلاس عليه لو مبعوت ليها عشان مانكررش الكود
function createElement(tag, className) {
  let element = document.createElement(tag);
  if (className) element.className = className;
  return element;
}

// دالة بتجيب السنة الحالية وتحطها في الفوتر تلقائي أول ما الصفحة تفتح
function setFooterYear() {
  let currentYear = new Date().getFullYear();
  // تعديل: ربطنا بـ copyrightCurrentYear المكتوب في الـ HTML الجديد
  let yearSpans = document.querySelectorAll("#copyrightCurrentYear");
  
  // بنلف على كل العناصر اللي واخدة الـ ID ده ونغير النص جواها للسنة الحالية
  for (let i = 0; i < yearSpans.length; i++) {
    yearSpans[i].textContent = String(currentYear);
  }
}

/* ================================================================
   3. رندرة كروت ألعاب التريند (باستخدام for loop والـ DOM)
   ================================================================ */

function renderTrendingCards() {
  // تعديل: ربطنا بالحاوية المخصصة في الـ HTML الجديد trendingItemsContainer
  let container = document.getElementById("trendingItemsContainer");
  if (!container) return; // لو عنصر الحاوية مش موجود في الصفحة بنوقف التنفيذ فوراً (حماية من أخطاء الانتقال بين الصفحات)

  for (let i = 0; i < trendingGames.length; i++) {
    let game = trendingGames[i];

    // تعديل: بنبني الهيكل البنائي للكارت خطوة بخطوة بالـ DOM باستخدام كلاسات الاستايل الفاتح الجديد
    let card = createElement("div", "interactiveItemCard");
    let img = createElement("img");
    img.src = game.img;
    img.alt = game.title;

    let cardInfo = createElement("div", "cardInformationOverlay");
    let cardTextGroup = createElement("div", "cardTextGroup");
    
    let genrePara = createElement("p");
    genrePara.textContent = game.genre;
    
    let titleHead = createElement("h3");
    titleHead.textContent = game.title;

    cardTextGroup.appendChild(genrePara);
    cardTextGroup.appendChild(titleHead);

    let iconLink = createElement("a", "actionIconWrapper");
    iconLink.href = "#";
    
    let iconImg = createElement("img");
    iconImg.src = "images/online-shopping.png";
    iconImg.alt = "Buy " + game.title;
    
    iconLink.appendChild(iconImg);
    cardInfo.appendChild(cardTextGroup);
    cardInfo.appendChild(iconLink);
    
    card.appendChild(img);
    card.appendChild(cardInfo);
    
    container.appendChild(card); // إضافة الكارت الجاهز جوة حاوية العرض الأساسية
  }
}

/* ================================================================
   4. رندرة كروت الألعاب الأكثر لعباً (باستخدام while loop)
   ================================================================ */

function renderMostPlayedCards() {
  // تعديل: ربطنا بالحاوية المخصصة في الـ HTML الجديد mostPlayedItemsContainer
  let container = document.getElementById("mostPlayedItemsContainer");
  if (!container) return;

  let i = 0;
  while (i < mostPlayedGames.length) {
    let game = mostPlayedGames[i];

    // شرط وقائي لو وصلنا للرقم 99 بنوقف الـ loop بالكامل
    if (i === 99) break;

    // لو اللعبة جاية من غير عنوان بنعمل سكايب وندخل على اللي بعدها
    if (!game.title) {
      i++;
      continue;
    }

    // أول لعبتين في المصفوفة بنعتبرهم كروت مميزة
    let isPremium = i < 2;

    // تعديل: هيكلة الكارت وكلاساته لتتوافق مع تنسيقات القسم الأكثر لعباً الساطعة (.interactiveItemCard و .cardMediaHeader)
    let card = createElement("div", "interactiveItemCard");
    let imgDiv = createElement("div", "cardMediaHeader");
    let img = createElement("img");
    img.src = game.img;
    img.alt = game.title;
    imgDiv.appendChild(img);

    let cardBottom = createElement("div", "cardBottomDetails");
    let genreSpan = createElement("span", "itemCategoryBadge");
    genreSpan.textContent = game.genre;

    let titleHead = createElement("h3", "itemDisplayTitle");
    titleHead.textContent = game.title;

    // تعديل: إعطاء الزرار الكلاس الموحد العصري globalActionButton
    let exploreBtn = createElement("button", "globalActionButton");
    exploreBtn.textContent = "Explore";

    cardBottom.appendChild(genreSpan);
    cardBottom.appendChild(titleHead);
    cardBottom.appendChild(exploreBtn);

    card.appendChild(imgDiv);
    card.appendChild(cardBottom);

    // تعديل: لو الكارت مميز بنضيف كلاس الـ specialFeatureItem المعرّف في الـ CSS الفاتح بالإضاءة الوردية الجذابة
    isPremium && card.classList.add("specialFeatureItem");

    // ربط حدث الضغط على الزرار عشان يعرض تفاصيل اللعبة في نافذة تنبيه
    exploreBtn.addEventListener("click", () => {
      alert("🕹️ Exploring: " + game.title + "\nGenre: " + game.genre);
    });

    container.appendChild(card);
    i++;
  }
}

/* ================================================================
   5. رندرة كروت الأقسام (باستخدام do…while loop)
   ================================================================ */

function renderCategoryCards() {
  // تعديل: ربطنا بالحاوية المخصصة في الـ HTML الجديد categoryItemsContainer
  let container = document.getElementById("categoryItemsContainer");
  if (!container) return;

  let j = 0;
  do {
    let cat = categories[j];
    let card = createElement("div", "interactiveItemCard");

    // تعديل: ضبط الكلاسات لتطابق ستايل التصنيفات المبهج (.categoryTextHeader و .categoryMediaBody)
    let genreDiv = createElement("div", "categoryTextHeader");
    genreDiv.textContent = cat.genre;

    let imgDiv = createElement("div", "categoryMediaBody");
    let img = createElement("img");
    img.src = cat.img;
    img.alt = cat.genre;

    imgDiv.appendChild(img);
    card.appendChild(genreDiv);
    card.appendChild(imgDiv);
    container.appendChild(card);

    j++;
  } while (j < categories.length); // الشرط بيتنفذ بعد ما اللوب يشتغل مرة واحدة على الأقل تضمن الرندرة الأولية
}

/* ================================================================
   6. منظومة البحث (دمج البيانات والفلترة)
   ================================================================ */

function initSearch() {
  // تعديل: ربطنا بعناصر حقل البحث الجديد في صفحة الرئيسية (gameQueryField و executeGameSearch و searchFeedbackBox)
  let searchInput = document.getElementById("gameQueryField");
  let searchBtn = document.getElementById("executeGameSearch");
  let searchResult = document.getElementById("searchFeedbackBox");

  if (!searchBtn || !searchInput || !searchResult) return;

  searchBtn.addEventListener("click", () => {
    let query = searchInput.value;
    let hasQuery = Boolean(query.trim()); // التحقق إن المدخلات مش مجرد مسافات فاضية

    // لو الخانة فاضية بنعرض رسالة خطأ باللون الوردي النيون ونوقف البحث
    if (!hasQuery) {
      searchResult.style.color = "#ec4899"; // اللون الفوشيا/الوردي من الـ CSS الجديد للتحذيرات
      searchResult.textContent = "Enter the name of game!";
      return;
    }

    let queryLower = query.toLowerCase();
    let found = false;
    let foundGame = null;

    // دمج مصفوفات الألعاب كلها في مصفوفة واحدة موحدة عشان ندور فيها مرة واحدة
    let allGames = trendingGames.concat(mostPlayedGames);
    
    for (let k = 0; k < allGames.length; k++) {
      let gameName = allGames[k].title.toLowerCase();

      // لو اسم اللعبة بيحتوي على النص المكتوب بنسجل البيانات وبنوقف الـ loop
      if (gameName.includes(queryLower)) {
        found = true;
        foundGame = allGames[k];
        break;
      }
    }

    // تعديل: تغيير تنسيق رسالة النتيجة بناءً على الألوان العصرية الجديدة (#6366f1 بنفسجي ساطع للنجاح و #ec4899 فوشيا للفشل)
    searchResult.style.color = found ? "#6366f1" : "#ec4899";
    searchResult.textContent = found
      ? "💻 Found: " + foundGame.title + " (" + foundGame.genre + ")"
      : '❌ "' + query + '" not found. Try another game!';

    searchInput.value = ""; // مسح حقل الإدخال بعد الانتهاء عشان يبقى جاهز للبحث الجديد
  });

  // تشغيل حدث البحث بمجرد الضغط على زرار Enter داخل حقل الإدخال
  searchInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") searchBtn.click();
  });
}

/* ================================================================
   7. عداد زيارات الموقع التراكمي (باستخدام localStorage)
   ================================================================ */

function updateVisitCounter() {
  // تعديل: ربطنا بالمعرف المحدث لويدجت العداد التفاعلي الجديد visitorStatusMessage
  let visitMsg = document.getElementById("visitorStatusMessage");
  if (!visitMsg) return;

  // جلب القيمة القديمة، وتحويلها لـ 0 لو مش موجودة عشان نتجنب الـ NaN أثناء الجمع
  let rawCount = localStorage.getItem("AlphaVisits");
  let visitCount = (rawCount && !isNaN(rawCount)) ? Number(rawCount) + 1 : 1;

  localStorage.setItem("AlphaVisits", String(visitCount)); // حفظ التحديث الجديد في ذاكرة المتصفح

  // صياغة نص الترحيب بناءً على عدد مرات الزيارة الفعلي
  let label = visitCount === 1
    ? "💻 Welcome! This is your first visit to Game Stop."
    : "💻 Welcome back! You have visited " + visitCount + " times.";

  visitMsg.textContent = label;
}

/* ================================================================
   8. تحكم القائمة الجانبية للموبايل (Hamburger Menu)
   ================================================================ */

function initHamburgerMenu() {
  // تعديل: ربطنا بـ triggerMobileNav و navigationLinkList المكتوبين في الهيدر الجديد والـ CSS المتجاوب
  let toggleBtn = document.getElementById("triggerMobileNav");
  let navLinks = document.getElementById("navigationLinkList");

  if (!toggleBtn || !navLinks) return;

  toggleBtn.addEventListener("click", function () {
    let isOpen = navLinks.classList.contains("open");
    // تبديل حالة كلاس .open المسؤول عن فتح وغلق القائمة بمرونة وسلاسة
    isOpen ? navLinks.classList.remove("open") : navLinks.classList.add("open");
  });
}

/* ================================================================
   9. شاشة تسجيل الدخول المنبثقة والتحقق من الحسابات (Modal System)
   ================================================================ */

// بيانات الحسابات المسموح ليها بالدخول بشكل مؤقت لتجربة النظام
let validUsers = [
  { username: "admin", password: "1234" },
  { username: "gamer", password: "lugx" },
  { username: "player", password: "play" },
];

function initSignInModal() {
  // تعديل: ربطنا بمعرفات وكلاسات بوابة الـ Auth Portal الحالية الفاتحة لعدم حدوث تعارض (openAuthPortal, authPortalOverlay, الخ)
  let signInBtns = document.querySelectorAll("#openAuthPortal");
  let overlay = document.getElementById("authPortalOverlay");
  let closeBtn = document.getElementById("closeAuthPortal");
  let submitBtn = document.getElementById("submitAuthCredentials");
  let modalMsg = document.getElementById("authValidationMessage");

  if (!overlay) return;

  // ربط حدث الفتح بكل الأزرار المتاحة اللي شايلة نفس المعرف (سواء في الشاشات الكبيرة أو الموبايل)
  for (let s = 0; s < signInBtns.length; s++) {
    signInBtns[s].addEventListener("click", function () {
      overlay.classList.add("active"); // كلاس الـ active بيفعل الأوباستي وتأثير الـ scale المكتوب في الـ CSS الخاص بالـ Backdrop
    });
  }

  // قفل الشاشة المنبثقة لو المستخدم داس على الخلفية الخارجية الفاضية
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) overlay.classList.remove("active");
  });

  // قفل الشاشة عند الضغط على زرار الإغلاق الداخلي (العلامة &times;)
  if (closeBtn) {
    closeBtn.addEventListener("click", function () {
      overlay.classList.remove("active");
    });
  }

  // معالجة بيانات نموذج تسجيل الدخول عند الإرسال
  if (submitBtn) {
    submitBtn.addEventListener("click", function () {
      let usernameInput = document.getElementById("authUsernameInput");
      let passwordInput = document.getElementById("authPasswordInput");

      let username = usernameInput ? usernameInput.value.trim() : "";
      let password = passwordInput ? passwordInput.value : "";

      let isValid = Boolean(username) && Boolean(password);

      // التحقق من أن الحقول مش فاضية قبل مقارنتها بالبيانات المخزنة
      if (!isValid) {
        modalMsg.style.color = "#ec4899"; // لون الفوشيا التحذيري
        modalMsg.textContent = "⚠️ Please fill in both fields.";
        return;
      }

      let loggedIn = false;
      
      // فحص المطابقة بين المدخلات وقائمة الحسابات الصحيحة المتاحة لدينا
      for (let u = 0; u < validUsers.length; u++) {
        if (validUsers[u].username === username && validUsers[u].password === password) {
          loggedIn = true;
          break;
        }
      }

      if (loggedIn) {
        modalMsg.style.color = "#6366f1"; // لون البنفسجي الساطع للنجاح
        modalMsg.textContent = "✅ Welcome, " + username + "! Redirecting…";
        // إغلاق تلقائي للنافذة بعد ثانية ونصف عشان تظهر رسالة النجاح للمستخدم
        setTimeout(function () {
          overlay.classList.remove("active");
          modalMsg.textContent = "";
          if (usernameInput) usernameInput.value = "";
          if (passwordInput) passwordInput.value = "";
        }, 1500);
      } else {
        modalMsg.style.color = "#ec4899";
        modalMsg.textContent = "❌ Wrong username or password.";
      }
    });
  }
}

/* ================================================================
   10. فحص والتحقق من صحة مدخلات فورم التواصل (Contact Form)
   ================================================================ */

function initContactForm() {
  // تعديل: ربطنا بشكل كامل مع عناصر وحقول صفحة contact.html الجديدة لضمان الفلترة الدقيقة
  let sendBtn = document.getElementById("triggerFormDispatch");
  let formFeedback = document.getElementById("submissionFeedbackLine");

  if (!sendBtn) return; // لو مش واقفين في صفحة contact بنوقف الدالة فوراً عشان ميتسببش في أخطاء بالصفحة الرئيسية

  sendBtn.addEventListener("click", function () {
    let name = document.getElementById("visitorFullName").value.trim();
    let email = document.getElementById("visitorEmailAddress").value.trim();
    let ageRaw = document.getElementById("visitorNumericalAge").value;
    let msg = document.getElementById("visitorTextPayload").value.trim();

    let age = Number(ageRaw);
    let errors = [];

    // التحقق المتتالي من شروط صحة الحقول وإضافة الأخطاء المكتشفة في مصفوفة
    if (!name) errors.push("Name is required.");
    if (!email || !email.includes("@")) errors.push("A valid email is required.");
    if (!ageRaw || isNaN(age) || age < 5 || age > 120) errors.push("Please enter a valid age (5–120).");
    if (!msg) errors.push("Message cannot be empty.");

    // لو فيه أخطاء بنعرضها متجمعة ومفصولة بفاصل منسق وأنيق
    if (errors.length > 0) {
      formFeedback.style.color = "#ec4899"; // التنسيق اللوني الوردي المبهج للأخطاء متطابق مع الـ CSS الفاتح
      
      let errorText = "";
      let ei = 0;
      while (ei < errors.length) {
        errorText += "⚠️ " + errors[ei];
        if (ei < errors.length - 1) errorText += "  |  ";
        ei++;
      }
      formFeedback.textContent = errorText;
      return;
    }

    // تحديد الفئة العمرية ونوع الرسالة التوضيحية بناءً على السن المدخل
    let isAdult = age >= 18;
    let ageNote = isAdult ? "You are an adult gamer 🕹️" : "Young gamer detected 🕹️";

    formFeedback.style.color = "#6366f1"; // اللون البنفسجي الساطع عند نجاح العملية بالكامل
    formFeedback.textContent = "✅ Message sent, " + name + "! " + ageNote + " We'll reply to " + email + " soon.";

    // تفريغ وإعادة تهيئة الحقول بعد نجاح عملية الإرسال تماماً لإفساح المجال لكتابة رسالة جديدة
    let fields = ["visitorFullName", "visitorEmailAddress", "visitorNumericalAge", "visitorTextPayload"];
    for (let fi = 0; fi < fields.length; fi++) {
      let el = document.getElementById(fields[fi]);
      if (el) el.value = "";
    }
  });
}

/* ================================================================
   11. أزرار عرض الكل والرسائل التفاعلية (View All Buttons)
   ================================================================ */

function initViewAllButtons() {
  // تعديل: ربطنا مع أزرار الإضافة الجديدة في الصفحة الرئيسية loadMoreTrending و loadMoreMostPlayed
  let trendingAllBtn = document.getElementById("loadMoreTrending");
  let mostAllBtn = document.getElementById("loadMoreMostPlayed");

  let handleViewAll = (section) => {
    let confirmed = confirm("Do you want to see all " + section + " games?");
    confirmed && alert("🚀 Loading all " + section + " games… (Feature coming soon!)");
  };

  if (trendingAllBtn) trendingAllBtn.addEventListener("click", () => handleViewAll("Trending"));
  if (mostAllBtn) mostAllBtn.addEventListener("click", () => handleViewAll("Most Played"));
}

/* ================================================================
   12. تأثيرات التحريك والظهور التدريجي للكروت مع التمرير (Scroll Reveal)
   ================================================================ */

function initScrollReveal() {
  // تعديل: استهداف كلاس الكروت الموحد الجديد .interactiveItemCard لتنسيق حركة ظهور كروت كل السكاشن معاً
  let cards = document.querySelectorAll(".interactiveItemCard");

  // تعيين الحالة الأولية للكروت (مخفية ومزاحة لأسفل مع إضافة خصائص الانتقال السلس والمريح للعين)
  for (let ci = 0; ci < cards.length; ci++) {
    cards[ci].style.opacity = "0";
    cards[ci].style.transform = "translateY(30px)";
    cards[ci].style.transition = "opacity 0.5s ease, transform 0.5s ease";
  }

  // إعداد المراقب لمتابعة دخول العناصر في نطاق الرؤية وتفعيل التحريك وتغيير النمط الشفاف لشكل كامل
  let observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          observer.unobserve(entry.target); // إلغاء المراقبة للعنصر بعد ظهوره لأول مرة لضمان استقرار وسرعة أداء الصفحة
        }
      });
    },
    { threshold: 0.15 } // يشتغل التأثير بمجرد ظهور 15% من مساحة الكارت داخل الشاشة
  );

  let oi = 0;
  while (oi < cards.length) {
    observer.observe(cards[oi]);
    oi++;
  }
}

/* ================================================================
   13. تشغيل وإقلاع المهام الرئيسية فور اكتمال تحميل الـ DOM
   ================================================================ */

document.addEventListener("DOMContentLoaded", function () {
  setFooterYear(); // تحديث سنة الحقوق في الفوتر تلقائياً أول ما الصفحة تفتح
  
  // بناء وهيكلة الكروت ديناميكياً داخل الحاويات المخصصة لها (بتشتغل في الصفحة الرئيسية بس وتتخطى لو مش موجودة)
  renderTrendingCards();
  renderMostPlayedCards();
  renderCategoryCards();

  // تفعيل كل الأنظمة الفرعية والتفاعلية للموقع الإلكتروني
  initSearch();
  updateVisitCounter();
  initHamburgerMenu();
  initSignInModal();
  initContactForm(); // بتشتغل جوة صفحة contact.html بس وبتتوقف تلقائياً في الرئيسية بدون أي مشاكل
  initViewAllButtons();

  // تفعيل مراقب التحريك (Scroll Reveal) بعد الانتهاء الكامل من رندرة وبناء جميع الكروت ديناميكياً
  initScrollReveal();
});
