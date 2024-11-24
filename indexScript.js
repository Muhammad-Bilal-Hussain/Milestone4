var addMoreEducationButton = document.getElementById('addMoreEducation');
var addMoreSkillsButton = document.getElementById('addMoreSkills');
var addMoreLanguageButton = document.getElementById('addMoreLanguage');
var addMoreExperienceButton = document.getElementById('addMoreExperience');
var educationFieldsContainer = document.getElementById('educationFields');
var skillsFieldsContainer = document.getElementById('skillsFields');
var languageFieldsContainer = document.getElementById('languageFields');
var experienceFieldsContainer = document.getElementById('experienceFields');
var imageInput = document.getElementById('imageInput');
// Function to create new field and delete button
function createNewField(container, placeholder) {
    var newField = document.createElement('input');
    var fieldWrapper = document.createElement('div');
    var delBtn = document.createElement('button');
    newField.type = 'text';
    newField.style.marginTop = '10px';
    newField.placeholder = placeholder;
    newField.required = false;
    delBtn.innerText = 'Delete';
    delBtn.style.marginLeft = '10px';
    delBtn.addEventListener('click', function () {
        container.removeChild(fieldWrapper);
    });
    fieldWrapper.appendChild(newField);
    fieldWrapper.appendChild(delBtn);
    container.appendChild(fieldWrapper);
}
// Function to collect all education fields with line-breaks for each entry
var collectEducationValues = function () {
    var entries = [];
    var mainCollege = document.getElementById('college');
    var mainYear = document.getElementById('year');
    var mainSubject = document.getElementById('education');
    if (mainCollege.value && mainYear.value && mainSubject.value) {
        var mainEducationText = "<strong>College Name:</strong> <strong>".concat(mainCollege.value, "</strong> | <strong>").concat(mainYear.value, "</strong><br><strong>Subject:</strong> ").concat(mainSubject.value);
        entries.push(mainEducationText);
    }
    var educationInputs = educationFieldsContainer.querySelectorAll('div');
    educationInputs.forEach(function (entry) {
        var college = entry.querySelector('input[placeholder="College Name"]');
        var year = entry.querySelector('input[placeholder="Year"]');
        var subject = entry.querySelector('input[placeholder="Subject"]');
        if (college && year && subject && (college.value || year.value || subject.value)) {
            var educationText = "<strong>College Name:</strong> <strong>".concat(college.value, "</strong> | <strong>").concat(year.value, "</strong><br><strong>Subject:</strong> ").concat(subject.value);
            entries.push(educationText);
        }
    });
    return entries.join('\n');
};
// Function to create education fields
function createEducationFields(container) {
    var fieldWrapper = document.createElement('div');
    fieldWrapper.style.marginTop = '10px';
    // College Name input with placeholder
    var collegeInput = document.createElement('input');
    collegeInput.type = 'text';
    collegeInput.placeholder = 'College Name';
    collegeInput.style.fontWeight = 'bold';
    collegeInput.style.marginBottom = "10px";
    fieldWrapper.appendChild(collegeInput);
    // Year input with placeholder
    var yearInput = document.createElement('input');
    yearInput.type = 'text';
    yearInput.placeholder = 'Year';
    yearInput.style.fontWeight = 'bold';
    yearInput.style.marginBottom = "10px";
    fieldWrapper.appendChild(yearInput);
    // Subject input with placeholder
    var subjectInput = document.createElement('input');
    subjectInput.type = 'text';
    subjectInput.placeholder = 'Subject';
    fieldWrapper.appendChild(subjectInput);
    var delBtn = document.createElement('button');
    delBtn.innerText = 'Delete';
    delBtn.style.marginLeft = '10px';
    delBtn.addEventListener('click', function () {
        container.removeChild(fieldWrapper);
    });
    fieldWrapper.appendChild(delBtn);
    container.appendChild(fieldWrapper);
}
// Function to collect experience values
function createExperienceFields(experienceFieldsContainer) {
    var fieldWrapper = document.createElement('div');
    fieldWrapper.style.marginTop = '10px';
    var companyInput = document.createElement('input');
    companyInput.type = 'text';
    companyInput.placeholder = 'Company Name';
    companyInput.style.marginBottom = "10px";
    companyInput.style.fontWeight = 'bold';
    fieldWrapper.appendChild(companyInput);
    var yearInput = document.createElement('input');
    yearInput.type = 'text';
    yearInput.placeholder = 'Year';
    yearInput.style.marginBottom = "10px";
    fieldWrapper.appendChild(yearInput);
    var descriptionInput = document.createElement('input');
    descriptionInput.type = 'text';
    descriptionInput.placeholder = 'Job Description';
    fieldWrapper.appendChild(descriptionInput);
    var delBtn = document.createElement('button');
    delBtn.innerText = 'Delete';
    delBtn.style.marginLeft = '10px';
    delBtn.addEventListener('click', function () {
        experienceFieldsContainer.removeChild(fieldWrapper);
    });
    fieldWrapper.appendChild(delBtn);
    experienceFieldsContainer.appendChild(fieldWrapper);
}
function collectExperienceValues() {
    var entries = [];
    // Main experience fields ko manually collect karte hain
    var mainCompany = document.getElementById('company');
    var mainYear = document.getElementById('exYear');
    var mainDescription = document.getElementById('discription');
    if (mainCompany.value && mainYear.value && mainDescription.value) {
        var mainExperienceText = "<strong>Company Name:</strong> <strong>".concat(mainCompany.value, "</strong> | <strong>").concat(mainYear.value, "</strong><br><strong>Job Description:</strong> ").concat(mainDescription.value);
        entries.push(mainExperienceText);
    }
    // Dynamically added experience fields ko collect karte hain
    var experienceInputs = experienceFieldsContainer.querySelectorAll('div');
    experienceInputs.forEach(function (entry) {
        var company = entry.querySelector('input[placeholder="Company Name"]');
        var year = entry.querySelector('input[placeholder="Year"]');
        var description = entry.querySelector('input[placeholder="Job Description"]');
        if (company && year && description && (company.value || year.value || description.value)) {
            var experienceText = "<strong>Company Name:</strong> <strong>".concat(company.value, "</strong> | <strong>").concat(year.value, "</strong><br><strong>Job Description:</strong> ").concat(description.value);
            entries.push(experienceText);
        }
    });
    return entries.join('\n');
}
// Event listeners for adding fields
addMoreEducationButton.addEventListener('click', function () { return createEducationFields(educationFieldsContainer); });
addMoreSkillsButton.addEventListener('click', function () { return createNewField(skillsFieldsContainer, 'Enter Next Skill'); });
addMoreExperienceButton.addEventListener('click', function () { return createExperienceFields(experienceFieldsContainer); });
addMoreLanguageButton.addEventListener('click', function () { return createNewField(languageFieldsContainer, 'Enter Next Language'); });
// Form submission
var form = document.querySelector('form');
form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (imageInput.files && imageInput.files[0]) {
        var reader = new FileReader();
        reader.onload = function (event) {
            var _a;
            var dataURL = (_a = event.target) === null || _a === void 0 ? void 0 : _a.result;
            console.log("Image Data URL:", dataURL);
            localStorage.setItem('selectedImage', dataURL);
            window.location.href = 'index1.html';
        };
        reader.readAsDataURL(imageInput.files[0]);
    }
    // Function to collect all input values from dynamically added fields
    var collectInputValues = function (container) {
        var inputs = container.getElementsByTagName('input');
        var values = '';
        for (var i = 0; i < inputs.length; i++) {
            values += inputs[i].value + '\n';
        }
        return values;
    };
    var formData = {
        name: document.getElementById('name').value,
        contact: document.getElementById('contact').value,
        email: document.getElementById('email').value,
        about: document.getElementById('about').value,
        education: collectEducationValues(),
        skills: collectInputValues(skillsFieldsContainer),
        language: collectInputValues(languageFieldsContainer),
        experience: collectExperienceValues(),
    };
    console.log("Form Data:", formData); // Debug to check.
    localStorage.setItem('resumeData', JSON.stringify(formData));
    window.location.href = 'index1.html';
});
function collectInputValues(skillsFieldsContainer) {
    throw new Error("Function not implemented.");
}
