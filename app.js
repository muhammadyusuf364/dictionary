const fonts = document.querySelector(".fonts");
const font = document.querySelector(".font");
const container = document.querySelector(".container");

const sans = document.querySelector(".sans");
const serif = document.querySelector(".serif");
const mono = document.querySelector(".mono");
const strelka = document.querySelector(".strel");

const icon = document.querySelector(".icon");
const icons = document.querySelector(".icons");

const input = document.querySelector(".input");
const form = document.querySelector(".form");

const API = "https://api.dictionaryapi.dev/api/v2/entries/en/keyboard";
const nosoz = document.querySelector(".nosoz");
async function getDate(api = API) {
  try {
    const response = await fetch(api);
    const data = await response.json();
    updateUI(data, false);
    return data;
  } catch {
    updateUI("nosoz", true);
  }
}

getDate();

function updateUI(foods, xato = null) {
  if (!xato) {
    foods.forEach((food) => {
      const {
        word,
        audio,
        partOfSpeech,
        definition,
        synonyms,
        example,
        sourceUrls,
        phonetics,
      } = food;
      let text;
      food.phonetics.some((item) => {
        if (item.text) {
          text = item.text;
        } else {
          text = "no Phonetics";
        }
      });
      let audioo;
      phonetics.forEach((item) => {
        if (item.audio.length > 10) {
          audioo = new Audio(item.audio);
        }
      });

      console.log(food);
      container.innerHTML = `
    <div class="box">
    <form class="form">
    <input class="input" type="text" placeholder="so'zni kiriting" autofocus required>
    </form>
    <img src="./images/png/Shape.png" alt="">
    </div>
    <p class="nosoz">Whoops, can’t be empty…</p>

<div class="box__one">
 <div class="keybor">
    <h1 class="soz">${word}</h1> 
    <p class="tarjima">${text}</p>
 </div>
 <span class="pause"  >
   <i class="fa-solid fa-play fa-xl"></i>
</span>
</div>

<div class="noun">
<h2 class="ot">noun</h2>
<div class="hr"></div>
</div>

<div class="parent">
<p class="meaning">Meaning</p>
${food.meanings[0].definitions
  .map((item) => {
    return `<p class="compon">. ${item.definition}</p>`;
  })
  .join("")}
<div class="parent__child">
    <h2 class="syn">synonyms</h2>
    <h2 class="elec">${food.meanings[0].synonyms}</h2>
</div>
</div>

<div class="noun">
<h2 class="ot">verb</h2>
<div class="hr"></div>
</div>

<div class="main">
<p class="meaning">Meaning</p>
<p class="type">${food.meanings[1].definitions[0].definition}</p>
<p class="masalan">"${food.meanings[1].definitions[0].example}"</p>
</div>
<div class="div"></div>

<div class="footer">
    <h2 class="source">Source</h2>
    <p class="wikipedya">${food.sourceUrls}</p>
</div> 
    `;
      const playBtn = document.querySelector(".pause");
      const form = document.querySelector("form");
      const input = document.querySelector(".input");
      const box = document.querySelector(".box");
      const nosoz = document.querySelector(".nosoz");
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (!input.value == "") {
          getDate(
            `https://api.dictionaryapi.dev/api/v2/entries/en/${input.value}`
          );
        }
      });

      playBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        if (audioo) {
          audioo && audioo.play();
          playBtn.innerHTML = `<i class="fa-solid fa-pause fa-xl"></i>`;
          setTimeout(() => {
            playBtn.innerHTML = `<i class="fa-solid fa-play fa-xl"></i>`;
          }, 1000);
        }
      });
    });
  } else {
    container.innerHTML = `<div class="box">
    <form class="form">
    <input class="input" type="text" placeholder="so'zni kiriting" autofocus required>
    </form>
    <img src="./images/png/Shape.png" alt="">
    </div>
    <p class="nosoz">No word found… 😒😒😂</p>`;

    const form = document.querySelector("form");
    const input = document.querySelector(".input");
    const box = document.querySelector(".box");
    const nosoz = document.querySelector(".nosoz");
    nosoz.style.display = "block";
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (input.value) {
        getDate(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${input.value}`
        );
      }
    });
    playBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      if (audioo) {
        audioo && audioo.play();
        playBtn.innerHTML = `<i class="fa-solid fa-pause fa-xl"></i>`;
        setTimeout(() => {
          playBtn.innerHTML = `<i class="fa-solid fa-play fa-xl"></i>`;
        }, 1000);
      }
    });
  }
}

font.classList.toggle("hidden");
strelka.addEventListener("click", () => {
  font.classList.toggle("hidden");
});

sans.addEventListener("click", () => {
  fonts.textContent = sans.textContent;
  document.body.classList.add("sansSerif");
  document.body.classList.remove("serifF");
  document.body.classList.remove("monoF");
});

serif.addEventListener("click", () => {
  fonts.textContent = serif.textContent;
  document.body.classList.remove("sansSerif");
  document.body.classList.add("serifF");
  document.body.classList.remove("monoF");
});

mono.addEventListener("click", () => {
  fonts.textContent = mono.textContent;
  document.body.classList.remove("sansSerif");
  document.body.classList.remove("serifF");
  document.body.classList.add("monoF");
});
icon.addEventListener("click", (e) => {
  icons.classList.toggle("leftIcons");
  document.body.classList.toggle("dark");
});
