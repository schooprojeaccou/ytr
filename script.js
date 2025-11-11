const presentationData = [

    {
        section: ["Reconciliation and Indigenous Populations of Canada", ""],
        parts: []
    },
    {
        section: ["What is reconciliation?", ""],
        parts: [
            ["Reconciliation is the process by which one reaches an agreeable resolution for all victim parties following their wrongdoings. In the case of the Indigenous populations of Canada, this involves recognizing, understanding and resolving the past and grave mistreatments of the Indigenous peoples.", ""],
            ["Examples of reconciliation towards Indigenous peoples include, but are not limited to, protesting for, studying of, and supporting the Indigenous peoples and their cultures. These forms of reconciliation are not the only ones, nor are they alone sufficient, but it is still tremendously important and necessary to perform them, even if it is in a minor way. After all, if a sole man sloths due to perceived insignificance, all men shall sloth due to perceived insignificance.", ""]
        ]
    },
    {
        section: ["Credits", ""],
        parts: [
            ["sigma men", "mog.png"],
            ["ohio men", ""]
        ]
    }

]

let totalSpots = -1; 
presentationData.forEach(section => {
    totalSpots++;
    totalSpots += section.parts.length;
});

let currentSpot = 0;

let isLoading = false;
let selector = 0;
let part = 0;

const sectionStart = document.getElementById("section-start");
const sectionPart = document.getElementById("section-part");
const progressBar = document.getElementById("slider-bar");
const backgroundImage = document.getElementById("background-img");

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

function loadSection(sectionName) {
  if (isLoading) return;
  isLoading = true;
  updateProgress();

  sectionPart.style.display = "none";
  sectionStart.style.display = "block";

  const title = getTitleOf(sectionStart);
  title.textContent = sectionName;

  title.classList.remove("animate-up");
  void title.offsetWidth;
  title.classList.add("animate-up");

  setTimeout(() => { isLoading = false; }, 1000);
}

function loadPart(sectionName, partText) {
  if (isLoading) return;
  isLoading = true;
  updateProgress();

  sectionStart.style.display = "none";
  sectionPart.style.display = "block";

  const title = getTitleOf(sectionPart);
  const text = getTextOf(sectionPart);

  title.textContent = sectionName;
  text.textContent = partText;

  title.classList.remove("animate-to-part");
  title.classList.add("animate-to-part");

  text.classList.remove("animate-up");
  void text.offsetWidth;
  text.classList.add("animate-up");

  setTimeout(() => { isLoading = false; }, 1000);
}


function upPart() {
    if (isLoading) return;
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
    }
}

function downPart() {
    if (isLoading) return;
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
                return;
            }
        part = presentationData[selector]["parts"].length;
    }
}

function loadSelector() {
    if (isLoading) return;
    const selectedSection = presentationData[selector];
    const isNewSection = (part == 0);
    const section = selectedSection["section"];
    const sectionName = section[0];
    let sectionPart = selectedSection["parts"][part];
    if (!isNewSection) sectionPart = selectedSection["parts"][part - 1];
    if (isNewSection) {
        loadSection(sectionName);
        backgroundImage.style.display = "block";
        backgroundImage.src = `images/${section[1]}`;
    } else {
        loadPart(sectionName, sectionPart[0]);
        backgroundImage.style.display = "block";
        backgroundImage.src = `images/${sectionPart[1]}`;
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

backgroundImage.onerror = () => {
  backgroundImage.style.display = "none";
};