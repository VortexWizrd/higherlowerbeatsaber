(async () => {
  let score = 0;
  let map1 = await newMap();
  let map2 = await newMap();

  setDetails(map1, "map1");
  setDetails(map2, "map2");

  const higherButton = document.querySelector("#higher");
  const lowerButton = document.querySelector("#lower");
  const scoreDisplay = document.querySelector("#score");

  higherButton?.addEventListener("click", async (event) => {
    if (!map1 || !map2) return;
    if (map2.stats.upvotes >= map1.stats.upvotes) {
      score += 1;
    } else {
      score = 0;
    }
    map1 = map2;
    map2 = await newMap();
    setDetails(map1, "map1");
    setDetails(map2, "map2");
    if (!scoreDisplay) return;
    scoreDisplay.innerHTML = "Score: " + score;
  });

  lowerButton?.addEventListener("click", async (event) => {
    if (!map1 || !map2) return;
    if (map2.stats.upvotes <= map1.stats.upvotes) {
      score += 1;
    } else {
      score = 0;
    }
    map1 = map2;
    map2 = await newMap();
    setDetails(map1, "map1");
    setDetails(map2, "map2");
    if (!scoreDisplay) return;
    scoreDisplay.innerHTML = "Score: " + score;
  });
})();

async function newMap(): Promise<any> {
  const response = await fetch(
    `https://api.beatsaver.com/maps/id/${randId(315872).toString(16)}`,
    {}
  );
  const data: any = await response.json();
  if (data.success == false) {
    return await newMap();
  }
  return data;
}

function setDetails(map: any, id: string) {
  const side = document.querySelector("#" + id);
  if (!side) return;
  const name = side.querySelector(".name");
  if (!name) return;
  name.innerHTML = map.name;
  const background = side.querySelector(".background");
  // background?.setAttribute("src", map.versions[0].coverURL);
  // side.setAttribute(
  //   "style",
  //   `background-image: url("${map.versions[0].coverURL}")`
  // );
  background?.setAttribute(
    "style",
    `background-image: url("${map.versions[0].coverURL}")`
  );
  const image = side.querySelector(".image");
  image?.setAttribute("src", map.versions[0].coverURL);

  const description = side.querySelector(".description");
  if (!description) return;
  description.innerHTML = `By ${map.uploader.name} | !bsr ${map.id}`;

  const upvotes = side.querySelector(".upvotes");
  if (!upvotes) return;
  upvotes.innerHTML = map.stats.upvotes + " Upvotes";
}

function randId(max: number) {
  return Math.floor(Math.random() * max - 1) + 1;
}
