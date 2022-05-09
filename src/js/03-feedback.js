import throttle from 'lodash.throttle';

const FEEDBACK_KEY = "feedback-form-state";

const refs = {
	form: document.querySelector('.feedback-form'),
	textarea: document.querySelector('.feedback-form textarea'),
	input: document.querySelector('.feedback-form input')
}
	
refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));

let formData = {};
checkStorage();

function onFormSubmit(e) {
	e.preventDefault();

	if (refs.form.email.value && refs.form.message.value) {
		console.log(`Дякуємо за відгук!`, formData);
		formData = {};
		e.target.reset();
		localStorage.removeItem(FEEDBACK_KEY);
		} else {
			alert(`Заповніть всі поля!`);
		};
};
 
function onFormInput(e) {
	const name = e.target.name;
	const message = e.target.value;

	if (formData) {
		formData[name] = message;
		localStorage.setItem(FEEDBACK_KEY, JSON.stringify(formData));
	}
 };

function checkStorage() {
	 if (localStorage.getItem(FEEDBACK_KEY)) {
    const saveData = localStorage.getItem(FEEDBACK_KEY);
    formData = JSON.parse(saveData);
  }

  if (formData.email) {
    refs.input.value = formData.email;
  }

  if (formData.message) {
    refs.textarea.value = formData.message;
  }
};
