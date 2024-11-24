const addMoreEducationButton = document.getElementById('addMoreEducation') as HTMLButtonElement;
const addMoreSkillsButton = document.getElementById('addMoreSkills') as HTMLButtonElement;
const addMoreLanguageButton = document.getElementById('addMoreLanguage') as HTMLButtonElement;
const addMoreExperienceButton = document.getElementById('addMoreExperience') as HTMLButtonElement;
const educationFieldsContainer = document.getElementById('educationFields') as HTMLDivElement;
const skillsFieldsContainer = document.getElementById('skillsFields') as HTMLDivElement;
const languageFieldsContainer = document.getElementById('languageFields') as HTMLDivElement;
const experienceFieldsContainer = document.getElementById('experienceFields') as HTMLDivElement;
const imageInput = document.getElementById('imageInput') as HTMLInputElement;

// Function to create new field and delete button
function createNewField(container: HTMLDivElement, placeholder: string) {
    const newField = document.createElement('input');
    const fieldWrapper = document.createElement('div');
    const delBtn = document.createElement('button');

    newField.type = 'text';
    newField.style.marginTop = '10px';
    newField.placeholder = placeholder;
    newField.required = false;

    delBtn.innerText = 'Delete';
    delBtn.style.marginLeft = '10px';
    delBtn.addEventListener('click', () => {
        container.removeChild(fieldWrapper);
    });

    fieldWrapper.appendChild(newField);
    fieldWrapper.appendChild(delBtn);
    container.appendChild(fieldWrapper);
}

// Function to collect all education fields with line-breaks for each entry
const collectEducationValues = () => {
    const entries: string[] = [];
    const mainCollege = document.getElementById('college') as HTMLInputElement;
    const mainYear = document.getElementById('year') as HTMLInputElement;
    const mainSubject = document.getElementById('education') as HTMLInputElement;

    if (mainCollege.value && mainYear.value && mainSubject.value) {
        const mainEducationText = `<strong>College Name:</strong> <strong>${mainCollege.value}</strong> | <strong>${mainYear.value}</strong><br><strong>Subject:</strong> ${mainSubject.value}`;
        entries.push(mainEducationText);
    }

    const educationInputs = educationFieldsContainer.querySelectorAll('div');
    educationInputs.forEach((entry) => {
        const college = entry.querySelector('input[placeholder="College Name"]') as HTMLInputElement;
        const year = entry.querySelector('input[placeholder="Year"]') as HTMLInputElement;
        const subject = entry.querySelector('input[placeholder="Subject"]') as HTMLInputElement;
        if (college && year && subject && (college.value || year.value || subject.value)) {
            const educationText = `<strong>College Name:</strong> <strong>${college.value}</strong> | <strong>${year.value}</strong><br><strong>Subject:</strong> ${subject.value}`;
            entries.push(educationText);
        }
    });
    return entries.join('\n');
};

// Function to create education fields
function createEducationFields(container: HTMLDivElement) {
    const fieldWrapper = document.createElement('div');
    fieldWrapper.style.marginTop = '10px';

    // College Name input with placeholder
    const collegeInput = document.createElement('input');
    collegeInput.type = 'text';
    collegeInput.placeholder = 'College Name';
    collegeInput.style.fontWeight = 'bold';
    collegeInput.style.marginBottom = "10px";
    fieldWrapper.appendChild(collegeInput);

    // Year input with placeholder
    const yearInput = document.createElement('input');
    yearInput.type = 'text';
    yearInput.placeholder = 'Year';
    yearInput.style.fontWeight = 'bold';
    yearInput.style.marginBottom = "10px";
    fieldWrapper.appendChild(yearInput);

    // Subject input with placeholder
    const subjectInput = document.createElement('input');
    subjectInput.type = 'text';
    subjectInput.placeholder = 'Subject';
    fieldWrapper.appendChild(subjectInput);

    const delBtn = document.createElement('button');
    delBtn.innerText = 'Delete';
    delBtn.style.marginLeft = '10px';
    delBtn.addEventListener('click', () => {
        container.removeChild(fieldWrapper);
    });
    fieldWrapper.appendChild(delBtn);

    container.appendChild(fieldWrapper);
}

// Function to collect experience values
function createExperienceFields(experienceFieldsContainer: HTMLDivElement) {
    const fieldWrapper = document.createElement('div');
    fieldWrapper.style.marginTop = '10px';

    const companyInput = document.createElement('input');
    companyInput.type = 'text';
    companyInput.placeholder = 'Company Name';
    companyInput.style.marginBottom = "10px";
    companyInput.style.fontWeight = 'bold';
    fieldWrapper.appendChild(companyInput);

    const yearInput = document.createElement('input');
    yearInput.type = 'text';
    yearInput.placeholder = 'Year';
    yearInput.style.marginBottom = "10px";
    fieldWrapper.appendChild(yearInput);

    const descriptionInput = document.createElement('input');
    descriptionInput.type = 'text';
    descriptionInput.placeholder = 'Job Description';
    fieldWrapper.appendChild(descriptionInput);

    const delBtn = document.createElement('button');
    delBtn.innerText = 'Delete';
    delBtn.style.marginLeft = '10px';
    delBtn.addEventListener('click', () => {
        experienceFieldsContainer.removeChild(fieldWrapper);
    });
    fieldWrapper.appendChild(delBtn);

    experienceFieldsContainer.appendChild(fieldWrapper);
}
function collectExperienceValues() {
    const entries: string[] = [];
    
    // Main experience fields ko manually collect karte hain
    const mainCompany = document.getElementById('company') as HTMLInputElement;
    const mainYear = document.getElementById('exYear') as HTMLInputElement;
    const mainDescription = document.getElementById('discription') as HTMLInputElement;
    
    if (mainCompany.value && mainYear.value && mainDescription.value) {
        const mainExperienceText = `<strong>Company Name:</strong> <strong>${mainCompany.value}</strong> | <strong>${mainYear.value}</strong><br><strong>Job Description:</strong> ${mainDescription.value}`;
        entries.push(mainExperienceText);
    }

    // Dynamically added experience fields ko collect karte hain
    const experienceInputs = experienceFieldsContainer.querySelectorAll('div');
    experienceInputs.forEach((entry) => {
        const company = entry.querySelector('input[placeholder="Company Name"]') as HTMLInputElement;
        const year = entry.querySelector('input[placeholder="Year"]') as HTMLInputElement;
        const description = entry.querySelector('input[placeholder="Job Description"]') as HTMLInputElement;

        if (company && year && description && (company.value || year.value || description.value)) {
            const experienceText = `<strong>Company Name:</strong> <strong>${company.value}</strong> | <strong>${year.value}</strong><br><strong>Job Description:</strong> ${description.value}`;
            entries.push(experienceText);
        }
    });

    return entries.join('\n');
}


// Event listeners for adding fields
addMoreEducationButton.addEventListener('click', () => createEducationFields(educationFieldsContainer));
addMoreSkillsButton.addEventListener('click', () => createNewField(skillsFieldsContainer, 'Enter Next Skill'));
addMoreExperienceButton.addEventListener('click', () => createExperienceFields(experienceFieldsContainer));
addMoreLanguageButton.addEventListener('click', () => createNewField(languageFieldsContainer, 'Enter Next Language'));

// Form submission
const form = document.querySelector('form') as HTMLFormElement;

form.addEventListener('submit', (event: Event) => {
    event.preventDefault();

    if (imageInput.files && imageInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const dataURL = event.target?.result as string;
            console.log("Image Data URL:", dataURL);
            localStorage.setItem('selectedImage', dataURL);
            window.location.href = 'index1.html';
        };
        reader.readAsDataURL(imageInput.files[0]);
    }

    // Function to collect all input values from dynamically added fields
const collectInputValues = (container: HTMLDivElement) => {
    const inputs = container.getElementsByTagName('input');
    let values = '';
    for (let i = 0; i < inputs.length; i++) {
        values += (inputs[i] as HTMLInputElement).value + '\n';
    }
    return values;
};

    const formData = {
        name: (document.getElementById('name') as HTMLInputElement).value,
        contact: (document.getElementById('contact') as HTMLInputElement).value,
        email: (document.getElementById('email') as HTMLInputElement).value,
        about: (document.getElementById('about') as HTMLTextAreaElement).value,
        education: collectEducationValues(),
        skills: collectInputValues(skillsFieldsContainer),
        language: collectInputValues(languageFieldsContainer),
        experience: collectExperienceValues(),
    };
    console.log("Form Data:", formData); // Debug to check.

    localStorage.setItem('resumeData', JSON.stringify(formData));
    window.location.href = 'index1.html';
});
function collectInputValues(skillsFieldsContainer: HTMLDivElement) {
    throw new Error("Function not implemented.");
}