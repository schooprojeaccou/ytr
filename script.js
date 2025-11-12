const presentationData = [

  {
    section: ["Reconciliation and Indigenous Populations of Canada", "", "", "", "", "", ""],
    parts: []
  },
  {
    section: ["What is reconciliation?", "", "", "", "", "", ""],
    parts: [
      [
        "Reconciliation is the process by which one reaches an agreeable resolution for all victim parties following their wrongdoings. In the case of the Indigenous populations of Canada, this involves recognizing, understanding and resolving the past and grave mistreatments of the Indigenous peoples.",
        "",
        "",
        "",
        "",
        "",
        ""
      ],
      [
        "Examples of reconciliation towards Indigenous peoples include, but are not limited to, protesting for, studying of, and supporting the Indigenous peoples and their cultures. These forms of reconciliation are not the only ones, nor are they alone sufficient, but it is still tremendously important and necessary to perform them, even if it is in a minor way. After all, if a sole man sloths due to perceived insignificance, all men shall sloth due to perceived insignificance.",
        "",
        "",
        "",
        "",
        "",
        ""
      ]
    ]
  },
  {
    section: ["Credits", "", "", "", "", "", ""],
    parts: [
      ["sigma men", "mog.png", "mog.png", "mog.png", "mog.png", "mog.png", "mog.png"],
      ["ohio men", "", "", "", "", "", ""]
    ]
  }

];

let totalSpots = -1; 
presentationData.forEach(section => {
  totalSpots++;
  totalSpots += section.parts.length;
});

let currentSpot = 0;
let isLoading = false;
let cancelLoad = false;
let selector = 0;
let part = 0;

const sectionStart = document.getElementById("section-start");
const sectionPart = document.getElementById("section-part");
const progressBar = document.getElementById("slider-bar");

const backgroundImage = document.getElementById("background-img");
const topLeftImage = document.getElementById("topleft-img");
const topRightImage = document.getElementById("topright-img");
const bottomLeftImage = document.getElementById("bottomleft-img");
const bottomRightImage = document.getElementById("bottomright-img");
const centerImage = document.getElementById("center-img");

function updateProgress() {
  const percentage = (currentSpot / totalSpots) * 100;
  progressBar.style.width = `${percentage}%`;
}

function getTitleOf(sectionObj) {
  return sectionObj.querySelector(".section-title");
}
function getTextOf(sectionObj) {
  return sectionObj.querySelector(".section-text");
}

function safeImageLoad(imgElement, src) {
  if (!src) {
    imgElement.style.display = "none";
    imgElement.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
  } else {
    imgElement.src = `images/${src}`;
    imgElement.style.display = "block";
  }
}

function applyImages(dataArr) {
  safeImageLoad(backgroundImage, dataArr[1]);
  safeImageLoad(topLeftImage, dataArr[2]);
  safeImageLoad(topRightImage, dataArr[3]);
  safeImageLoad(bottomLeftImage, dataArr[4]);
  safeImageLoad(bottomRightImage, dataArr[5]);
  safeImageLoad(centerImage, dataArr[6]);
}

function loadSection(sectionArr) {
  if (isLoading || cancelLoad) return;
  isLoading = true;
  updateProgress();

  sectionPart.style.display = "none";
  sectionStart.style.display = "block";

  const title = getTitleOf(sectionStart);
  title.textContent = sectionArr[0];

  applyImages(sectionArr);

  title.classList.remove("animate-up");
  void title.offsetWidth;
  title.classList.add("animate-up");

  setTimeout(() => { isLoading = false; }, 1000);
}

function loadPart(sectionName, partArr) {
  if (isLoading || cancelLoad) return;
  isLoading = true;
  updateProgress();

  sectionStart.style.display = "none";
  sectionPart.style.display = "block";

  const title = getTitleOf(sectionPart);
  const text = getTextOf(sectionPart);

  title.textContent = sectionName;
  text.textContent = partArr[0];

  applyImages(partArr);

  title.classList.remove("animate-to-part");
  title.classList.add("animate-to-part");

  text.classList.remove("animate-up");
  void text.offsetWidth;
  text.classList.add("animate-up");

  setTimeout(() => { isLoading = false; }, 1000);
}

function upPart() {
  if (isLoading) return;
  cancelLoad = false;
  const oldSelector = selector;
  const oldPart = part;
  part++;
  currentSpot++;
  if (part > presentationData[selector]["parts"].length) {
    selector++;
    part = 0;
  }
  if (selector >= presentationData.length) {
    selector = oldSelector;
    part = oldPart;
    currentSpot--;
    cancelLoad = true;
  }
}

function downPart() {
  if (isLoading) return;
  cancelLoad = false;
  const oldSelector = selector;
  const oldPart = part;
  part--;
  currentSpot--;
  if (part < 0) {
    selector--;
    if (selector < 0) {
      selector = oldSelector;
      part = oldPart;
      currentSpot++;
      cancelLoad = true;
      return;
    }
    part = presentationData[selector]["parts"].length;
  }
}

function loadSelector() {
  if (isLoading) return;
  const selectedSection = presentationData[selector];
  const isNewSection = (part == 0);
  const sectionArr = selectedSection["section"];
  let sectionPartArr = selectedSection["parts"][part];
  if (!isNewSection) sectionPartArr = selectedSection["parts"][part - 1];
  if (isNewSection) {
    loadSection(sectionArr);
  } else {
    loadPart(sectionArr[0], sectionPartArr);
  }
}

function leftClick() {
  downPart();
  loadSelector();
}

function rightClick() {
  upPart();
  loadSelector();
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") rightClick();
  if (e.key === "ArrowLeft") leftClick();
});
