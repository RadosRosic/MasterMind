const root = document.body;

const createElement = (el, parent, prepend = false) => {
  const { nodeName = "div", ...attrs } = el;
  const element = document.createElement(nodeName);
  Object.entries(attrs).forEach(([attr, value]) => {
    element[attr] = value;
  });
  if (prepend) parent.prepend(element);
  else parent.append(element);
};

// game box
createElement(
  {
    id: "playground",
  },
  root,
  true
);

// header
createElement(
  {
    nodeName: "header",
    id: "header",
  },
  playground
);

createElement(
  {
    nodeName: "h1",
    textContent: "Master Mind",
    id: "h1",
  },
  header
);

createElement(
  {
    nodeName: "p",
    id: "current-round",
  },
  header
);

createElement(
  {
    nodeName: "img",
    id: "btnInfo",
    src: "./img/info.svg",
  },
  header
);

createElement(
  {
    nodeName: "img",
    id: "btnRestart",
    src: "./img/restart.svg",
  },
  header
);

// main
createElement(
  {
    id: "modal",
    classList: "display-none",
  },
  playground
);

createElement(
  {
    nodeName: "p",
    id: "modalContent",
    innerHTML:
      "You have six guesses to figure out the hidden combination.<br/><br/>X means that a symbol is not in the combination. Checkmark means that the symbol is in the combination and at a right place, and circular arrows mean that the symbol is in the combination but at the wrong place.<br/><br/> Good luck!",
  },
  modal
);

createElement(
  {
    nodeName: "span",
    id: "btn-close-modal",
    textContent: "🞬",
  },
  modalContent
);

createElement(
  {
    nodeName: "main",
    id: "main",
  },
  playground
);

for (let i = 0; i < 2; i++) {
  createElement(
    {
      nodeName: "section",
      id: `section${i + 1}`,
      classList: "section",
    },
    main
  );
}

// display player guesses (left)
for (let i = 0; i < 6; i++) {
  createElement(
    {
      id: `guessBox${i + 1}`,
      classList: `box`,
    },
    document.querySelector("#section1")
  );
}

// display hints (right)
for (let i = 0; i < 6; i++) {
  createElement(
    {
      id: `hintBox${i + 1}`,
      classList: `box`,
    },
    document.querySelector("#section2")
  );
}

createElement(
  {
    nodeName: "section",
    id: "buttons",
  },
  playground
);

createElement(
  {
    id: "guessAndDelBtns",
  },
  buttons
);

createElement(
  {
    nodeName: "button",
    type: "button",
    id: "btnTry",
    textContent: "TRY",
  },
  guessAndDelBtns
);

createElement(
  {
    nodeName: "button",
    type: "button",
    id: "btnDel",
    textContent: "DEL",
  },
  guessAndDelBtns
);

createElement(
  {
    id: "btnsSelectSection",
  },
  buttons
);

createElement(
  {
    id: "solution",
    classList: "display-none",
  },
  buttons
);

for (let i = 0; i < 6; i++) {
  createElement(
    {
      nodeName: "img",
      type: "image",
      id: `btn${i}`,
      src: `./img/symbol${i + 1}.svg`,
      classList: "btn",
      textContent: `${i + 1}`,
      value: `${i + 1}`,
    },
    btnsSelectSection
  );
}

createElement(
  {
    nodeName: "footer",
    id: "footer",
    textContent: "Rados Rosic 2022",
  },
  playground
);
