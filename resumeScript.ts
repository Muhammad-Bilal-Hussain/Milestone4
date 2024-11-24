// Retrieve resume data from localStorage and parse it to an object
const resumeData: {
  name: string;
  contact: string;
  email: string;
  about: string;
  education: string;
  skills: string;
  language: string;
  experience: string;
} = JSON.parse(localStorage.getItem("resumeData") || "{}");

// Utility function to get an HTML element by ID with specific type
function getElementById<T extends HTMLElement>(id: string): T {
  const element = document.getElementById(id);
  if (!element) throw new Error(`Element with ID '${id}' not found.`);
  return element as T;
}

// Retrieve the image data URL from localStorage
const imageDataURL = localStorage.getItem("selectedImage");
const displayImage = document.getElementById(
  "displayImage"
) as HTMLImageElement;

if (imageDataURL) {
  displayImage.src = imageDataURL;
  displayImage.style.display = "block"; // Make image visible
}

// Display data in respective HTML elements
getElementById<HTMLHeadingElement>("displayName").textContent = resumeData.name;
getElementById<HTMLParagraphElement>("displayContact").textContent =
  "Contact: " + resumeData.contact;
getElementById<HTMLParagraphElement>("displayEmail").textContent =
  "Email: " + resumeData.email;
getElementById<HTMLParagraphElement>("displayAbout").textContent =
  resumeData.about;

// Education section: show each entry in a styled format
const educationContainer = getElementById<HTMLDivElement>("displayEducation");
resumeData.education.split("\n").forEach((edu: string) => {
  const eduElement = document.createElement("p");
  eduElement.style.textAlign = "left";
  eduElement.innerHTML = edu + "<hr>";
  educationContainer.appendChild(eduElement);
});
// Skills section: show each entry in a styled format if present
const skillContainer = getElementById<HTMLUListElement>(
  "displaySkillsContainer"
);

// Get non-empty skills, then add them with <hr> only between entries
const skills = resumeData.skills.split("\n").forEach((skl: string) => {
  const skillElement = document.createElement("li");
  skillElement.innerHTML = skl.trim();
  skillElement.style.marginLeft = "5px";
  // skillElement.outerText = skl.trim();
  skillContainer.appendChild(skillElement);
});
// Language section: show each entry in a styled format if present
const languageContainer = getElementById<HTMLUListElement>(
  "displayLanguageContainer"
);

// Get non-empty skills, then add them with <hr> only between entries
const language = resumeData.language.split("\n").forEach((lan: string) => {
  const languageElement = document.createElement("li");
  languageElement.style.marginLeft = "5px";
  languageElement.innerHTML = lan.trim();
  languageContainer.appendChild(languageElement);
});

// Experience section: show each entry in a styled format
const expContainer = getElementById<HTMLDivElement>("displayExperience");
resumeData.experience.split("\n").forEach((exp: string) => {
  const expElement = document.createElement("p");
  expElement.style.textAlign = "left";
  expElement.innerHTML = exp + "<hr>";
  expContainer.appendChild(expElement);
});

// Add event listener for the Edit button
document.addEventListener("DOMContentLoaded", () => {
  const editButton = document.getElementById("editButton");
  const clearButton = document.getElementById("clearButton");

  
  if (!editButton || !clearButton) {
    console.warn("Edit button not found in the DOM");
    return; // Stop execution if the edit button is not found
  }

 // Hide both buttons before printing
 window.addEventListener("beforeprint", () => {
  editButton.style.display = "none";
  clearButton.style.display = "none";
});

// Show both buttons again after printing
window.addEventListener("afterprint", () => {
  editButton.style.display = "inline-block";
  clearButton.style.display = "inline-block";
});

  const editableElements = [
    "displayImage",
    "displayName",
    "displayAbout",
    "displayContact",
    "displayEmail",
    "displaySkillsContainer",
    "displayLanguageContainer",
    "displayEducation",
    "displayExperience",
  ];

  editButton.addEventListener("click", () => {
    editableElements.forEach((elementId) => {
      const element = document.getElementById(elementId);

      if (!element) {
        console.warn(`Element with ID '${elementId}' not found.`);
        return; // Skip this iteration if element not found
      }

      // Special handling for the image element
      if (elementId === "displayImage") {
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = "image/*";

        fileInput.addEventListener("change", (event) => {
          const file = (event.target as HTMLInputElement).files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = () => {
              (element as HTMLImageElement).src = reader.result as string;
              saveEditedContent(elementId, reader.result as string);
            };
            reader.readAsDataURL(file);
          }
        });

        fileInput.click(); // Trigger file selection dialog
      } else {

      if (element.getAttribute("contenteditable") !== "true") {
        element.setAttribute("contenteditable", "true");
        element.style.border = "2px dashed blue";
        element.style.padding = "5px";
        editButton.textContent = "Save Changes";
      } else {
        element.setAttribute("contenteditable", "false");
        element.style.border = "none";
        element.style.padding = "0";
        editButton.textContent = "Edit";

        saveEditedContent(elementId, element.textContent|| "");
      }
      }
    });
  });

  function saveEditedContent(elementId:string, newContent:string) {
    localStorage.setItem(elementId, newContent);
    console.log(`${elementId} content updated`);
  }

  editableElements.forEach((elementId) => {
    const savedContent = localStorage.getItem(elementId);
    const element = document.getElementById(elementId);
    if (element && savedContent) {
      element.textContent = savedContent;
    }
  });
});

// Add event listener for the back button
const clearButton = document.getElementById("clearButton") as HTMLButtonElement;
clearButton.addEventListener("click", () => {
  localStorage.clear(); // LocalStorage clear karna
  window.location.href = "index.html"; // Page ko refresh karna
});
