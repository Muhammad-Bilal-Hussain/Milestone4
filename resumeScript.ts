// resumeScript.ts

// Retrieve data from localStorage
const resumeData = JSON.parse(localStorage.getItem('resumeData') || '{}');

// Get the element where the resume will be displayed
const resumeContent = document.getElementById('resumeContent') as HTMLDivElement;

// Display the data if it exists
if (resumeData) {
  resumeContent.innerHTML = `
    <p><strong>Name:</strong> ${resumeData.name}</p>
    <p><strong>Contact:</strong> ${resumeData.contact}</p>
    <p><strong>Email:</strong> ${resumeData.email}</p>
    <p><div class="resumeheading">About:</div><br> ${resumeData.about.replace(/\n/g, '<br>')}</p>
    <p><div class="resumeheading">Education:</div><br> ${resumeData.education.replace(/\n/g, '<br>')}</p>
    <p><div class="resumeheading">Skills:</div><br> ${resumeData.skills.replace(/\n/g, '<br>')}</p>
    <p><div class="resumeheading">Experience:</div><br>${resumeData.experience.replace(/\n/g, '<br>')}</p>
  `;
}

// Add event listener for the Edit button
const editButton = document.getElementById('editButton') as HTMLButtonElement;
editButton.addEventListener('click', () => {
  window.location.href = 'index.html'; // Redirect back to the form page
});

// Add event listener for the back button
const clearButton = document.getElementById('clearButton') as HTMLButtonElement;
clearButton.addEventListener('click', () => {
  localStorage.removeItem('resumeData'); // LocalStorage clear karna
  window.location.href='index.html'; // Page ko refresh karna
});

