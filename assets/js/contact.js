const contactForm = document.querySelector('#contact-form');
const statusMessage = document.querySelector('#form-status');

contactForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;

    const formData = new FormData(contactForm);
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const organisation = String(formData.get('organisation') || '').trim();
    const topic = String(formData.get('subject') || '').trim();
    const message = String(formData.get('message') || '').trim();

    const subject = encodeURIComponent(`Website enquiry: ${topic}`);
    const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nOrganisation: ${organisation || 'Not provided'}\nTopic: ${topic}\n\n${message}`
    );
    statusMessage.textContent = 'Your email app should open with the message ready to send.';
    window.location.href = `mailto:info@itcompany.com?subject=${subject}&body=${body}`;
});
