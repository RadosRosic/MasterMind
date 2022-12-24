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
    nodeName: "h2",
    id: "current-round",
  },
  header
);

// main
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
