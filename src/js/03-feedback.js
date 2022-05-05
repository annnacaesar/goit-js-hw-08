import throttle from 'lodash.throttle';

const FEEDBACK_KEY = "feedback-form-state";

const ref = {
	form: document.querySelector('.feedback-form'),
	textarea: document.querySelector('.feedback-form textarea'),
	input: document.querySelector('.feedback-form input')
}
	
ref.form.addEventListener('submit', onFormSubmit);
ref.form.addEventListener('input', throttle(onInput, 500));

let formData = {};

function onParsedData (key) {
	const savedFeedbackForm = localStorage.getItem(key);
	const parsedData = JSON.parse(savedFeedbackForm);
	return parsedData;
};
formData = onParsedData(FEEDBACK_KEY);
console.log(formData);
checkStorage();

function onFormSubmit(e) {
	e.preventDefault();
	console.log(formData);
	e.currentTarget.reset();
	localStorage.removeItem(FEEDBACK_KEY);
};
 
function onInput  (e) {
	const value = e.target.value;
	console.log(value);
	const key = e.target.name;
	console.log(key);
	
	if (key !== null) {
		formData[key] = value;
		localStorage.setItem(FEEDBACK_KEY, JSON.stringify(formData));
	}
 };

function checkStorage () {
	 if (formData.message !== "") {
		 ref.textarea.value = formData.message;
	 }
	 if (formData.email !== "") {
		 ref.input.value = formData.email;
	 }
};