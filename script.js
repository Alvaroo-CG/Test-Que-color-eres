function aceptarCookies() {
    localStorage.setItem('cookiesAceptadas', 'true');
    document.getElementById('cookie-consent').style.display = 'none';
  }

  function rechazarCookies() {
    localStorage.setItem('cookiesAceptadas', 'false');
    document.getElementById('cookie-consent').style.display = 'none';
  }

  window.onload = function () {
    const consentimiento = localStorage.getItem('cookiesAceptadas');
    if (consentimiento !== 'true' && consentimiento !== 'false') {
      document.getElementById('cookie-consent').style.display = 'block';
    }
  };

    const preguntas = [
      "¿Qué actividad prefieres en tu tiempo libre?",
      "¿Cómo te describirían tus amigos más cercanos?",
      "¿Qué tipo de clima te hace sentir más feliz?",
      "¿Qué género musical te identifica más?",
      "Si fueras un animal, ¿cuál serías?",
      "¿Dónde te gustaría pasar tus vacaciones ideales?",
      "¿Qué tipo de comida es tu favorita?",
      "Si pudieras tener un superpoder, ¿cuál elegirías?",
      "¿Qué estilo de ropa te representa mejor?",
      "¿Qué es lo que más valoras en la vida?"
    ];

    const opciones = [
      ["Deportes extremos y aventura", "Leer un buen libro en silencio", "Pasear en la naturaleza", "Reunirte con amigos y socializar"],
      ["Apasionado/a y lleno de energía", "Tranquilo/a y analítico/a", "Equilibrado/a y armonioso/a", "Alegre y optimista"],
      ["Caluroso y soleado", "Fresco y nublado", "Templado con brisa suave", "Soleado pero no demasiado caliente"],
      ["Rock o música fuerte y energética", "Clásica o jazz relajante", "Instrumental o sonidos de naturaleza", "Pop alegre y bailable"],
      ["Un león: fuerte y dominante", "Un delfín: inteligente y sociable", "Un ciervo: elegante y en armonía", "Un perro: leal y juguetón"],
      ["Montañas para escalar y explorar", "Una cabaña tranquila con biblioteca", "Un bosque para meditar", "Una playa con fiesta y gente"],
      ["Picante y llena de sabor", "Dulce y reconfortante", "Natural y saludable", "Colorida y variada"],
      ["Super fuerza y resistencia", "Telepatía y lectura de mentes", "Sanación y habilidades curativas", "Volar y ser libre"],
      ["Deportivo y práctico", "Elegante y sofisticado", "Casual y cómodo", "Creativo y llamativo"],
      ["Logros personales y éxito", "Sabiduría y conocimiento", "Paz interior y equilibrio", "Conexiones humanas y amor"]
    ];

    const colores = ["rojo", "azul", "verde", "amarillo"];

    const colorData = {
      rojo: {
        color: "#FF4757",
        title: "¡Eres ROJO! 🔴",
        desc: "Eres una persona apasionada, valiente y llena de energía. Tomas la iniciativa y no tienes miedo de enfrentar desafíos. Tu personalidad vibrante atrae a los demás y tu determinación te ayuda a alcanzar tus metas. Eres directo/a y honesto/a, pero también muy leal con quienes te importan.",
        icon: "fas fa-fire"
      },
      azul: {
        color: "#1E90FF",
        title: "¡Eres AZUL! 🔵",
        desc: "Eres tranquilo/a, confiable y profundamente reflexivo/a. Tu mente analítica te permite resolver problemas con facilidad. Inspiras paz y serenidad en los demás. Eres un excelente oyente y das consejos sabios. Valoras la honestidad y la profundidad en tus relaciones.",
        icon: "fas fa-water"
      },
      verde: {
        color: "#2ED573",
        title: "¡Eres VERDE! 🟢",
        desc: "Eres equilibrado/a, compasivo/a y estás en armonía con el mundo que te rodea. Buscas el crecimiento personal y te preocupas por el bienestar de los demás. Eres práctico/a pero también muy empático/a. Tu presencia es calmante y ayudas a resolver conflictos con tu actitud conciliadora.",
        icon: "fas fa-leaf"
      },
      amarillo: {
        color: "#FFD700",
        title: "¡Eres AMARILLO! 🟡",
        desc: "Eres alegre, optimista y contagias tu energía positiva a todos los que te rodean. Ves el lado bueno de las situaciones y tu creatividad no tiene límites. Eres sociable y haces amigos fácilmente. Tu entusiasmo es inspirador y tienes un talento especial para animar a los demás.",
        icon: "fas fa-sun"
      }
    };

    const questionsDiv = document.getElementById("questions");

    preguntas.forEach((pregunta, i) => {
      const div = document.createElement("div");
      div.className = "question";
      div.innerHTML = `<p>${i + 1}. ${pregunta}</p><div class="options-grid">`;

      opciones[i].forEach((op, j) => {
        const val = colores[j];
        const id = `q${i + 1}_${j}`;
        div.querySelector('.options-grid').innerHTML += `
          <label>
            <input type="radio" name="q${i + 1}" value="${val}" id="${id}" />
            <div class="option">${op}</div>
          </label>
        `;
      });

      div.innerHTML += `</div>`;
      questionsDiv.appendChild(div);
    });

    const form = document.getElementById("quizForm");
    const result = document.getElementById("result");
    const colorBox = document.getElementById("colorBox");
    const colorTitle = document.getElementById("colorTitle");
    const colorDesc = document.getElementById("colorDesc");
    const colorPercentages = document.getElementById("colorPercentages");
    const whatsappShare = document.getElementById("whatsappShare");
    const facebookShare = document.getElementById("facebookShare");
    const twitterShare = document.getElementById("twitterShare");
    const restartBtn = document.getElementById("restartBtn");
    const celebrateDiv = document.getElementById("celebrate");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const formData = new FormData(form);
      const scores = { rojo: 0, azul: 0, verde: 0, amarillo: 0 };

      for (const val of formData.values()) {
        scores[val]++;
      }

      const total = Object.values(scores).reduce((a, b) => a + b, 0);
      const resultColor = Object.keys(scores).reduce((a, b) =>
        scores[a] > scores[b] ? a : b
      );

      const { color, title, desc, icon } = colorData[resultColor];
      colorBox.style.backgroundColor = color;
      colorBox.style.color = color;
      colorTitle.textContent = title;
      colorTitle.style.color = color;
      colorDesc.textContent = desc;
      
      // Crear barras de porcentaje
      colorPercentages.innerHTML = Object.entries(scores).map(([col, val]) => {
        const percent = ((val / total) * 100).toFixed(1);
        const colorInfo = colorData[col];
        return `
          <div class="percentage-item">
            <span class="percentage-text" style="color: ${colorInfo.color}">
              <i class="${colorInfo.icon}"></i> ${col.charAt(0).toUpperCase() + col.slice(1)}
            </span>
            <div class="percentage-bar">
              <div class="percentage-fill ${col}" style="width: ${percent}%"></div>
            </div>
            <span class="percentage-number">${percent}%</span>
          </div>
        `;
      }).join("");

      // Configurar compartir en redes
      const shareText = encodeURIComponent(`¡Mi color de personalidad es ${resultColor.toUpperCase()}! "${title}"\n\n${desc.substring(0, 100)}...\n\nDescubre tu color en este test: `);
      const pageUrl = encodeURIComponent(window.location.href);
      whatsappShare.href = `https://wa.me/?text=${shareText}%20${pageUrl}`;
      facebookShare.href = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}&quote=${shareText}`;
      twitterShare.href = `https://twitter.com/intent/tweet?text=${shareText}&url=${pageUrl}`;

      // Mostrar resultado con animación
      result.style.display = "block";
      form.style.display = "none";
      
      // Animación de celebración
      createConfetti(color);
    });

    restartBtn.addEventListener("click", function() {
      result.style.display = "none";
      form.style.display = "block";
      form.reset();
      window.scrollTo(0, 0);
    });

    function createConfetti(color) {
      celebrateDiv.innerHTML = '';
      celebrateDiv.style.opacity = '1';
      
      for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.color = color;
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = -10 + 'px';
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = Math.random() * 10 + 5 + 'px';
        confetti.style.animationDelay = Math.random() * 5 + 's';
        confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
        celebrateDiv.appendChild(confetti);
        
        // Animación
        setTimeout(() => {
          confetti.style.opacity = '1';
          confetti.style.top = Math.random() * 100 + 'vh';
          confetti.style.left = Math.random() * 100 + 'vw';
        }, 10);
      }
      
      setTimeout(() => {
        celebrateDiv.style.opacity = '0';
        setTimeout(() => {
          celebrateDiv.innerHTML = '';
        }, 1000);
      }, 3000);
    }