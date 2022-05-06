import throttle from 'lodash.throttle';

const FEEDBACK_KEY = "feedback-form-state";

const ref = {
	form: document.querySelector('.feedback-form'),
	textarea: document.querySelector('.feedback-form textarea'),
	input: document.querySelector('.feedback-form input')
}
	
ref.form.addEventListener('submit', onFormSubmit);
ref.form.addEventListener('input', throttle(onInput, 500));
ref.textarea.addEventListener('input', throttle(onInput, 500));



let formData = {};
checkStorage();

function onFormSubmit(e) {
	e.preventDefault();
	console.log(formData);
	e.target.reset();
	localStorage.removeItem(FEEDBACK_KEY);
};
 
function onInput  (e) {
	const message = e.target.value;
	const name = e.target.name;

	if (formData) {
		formData[name] = message;
		localStorage.setItem(FEEDBACK_KEY, JSON.stringify(formData));
	}
 };

function checkStorage () {
	const savedFeedbackForm = localStorage.getItem(FEEDBACK_KEY);
	const parsedData = JSON.parse(savedFeedbackForm);
	 if (parsedData.message) {
		 ref.textarea.value = parsedData.message;
	 }
	 if (parsedData.email) {
		 ref.input.value = parsedData.email;
	 }
};
