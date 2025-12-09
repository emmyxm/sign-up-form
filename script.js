document.addEventListener('DOMContentLoaded', () => {
	const form = document.getElementById('signupForm');

	const firstname = document.getElementById('firstname');
	const lastname = document.getElementById('lastname');
	const age = document.getElementById('age');
	const password = document.getElementById('password');
	const confirmpassword = document.getElementById('confirmpassword');

	const firstnameError = document.getElementById('firstnameError');
	const lastnameError = document.getElementById('lastnameError');
	const ageError = document.getElementById('ageError');
	const passwordError = document.getElementById('passwordError');
	const confirmpasswordError = document.getElementById('confirmpasswordError');

	function clearError(el) {
		el.textContent = '';
	}

	function showError(input, errorEl) {
		if (input.validity.valueMissing) {
			errorEl.textContent = 'This field is required.';
			return;
		}
		if (input.validity.typeMismatch) {
			errorEl.textContent = 'Please enter a valid value.';
			return;
		}
		if (input.validity.tooShort) {
			errorEl.textContent = `Must be at least ${input.minLength} characters.`;
			return;
		}
		if (input.validity.rangeUnderflow) {
			errorEl.textContent = `Value must be at least ${input.getAttribute('min')}.`;
			return;
		}
		if (input.validity.rangeOverflow) {
			errorEl.textContent = `Value must be at most ${input.getAttribute('max')}.`;
			return;
		}
		if (input.validity.patternMismatch) {
			// Provide friendly messages per-field when possible
			if (input.id === 'firstname' || input.id === 'lastname') {
				errorEl.textContent = 'Only letters, spaces, hyphens and apostrophes allowed.';
			} else {
				errorEl.textContent = 'Invalid format.';
			}
			return;
		}
		if (input.validationMessage) {
			errorEl.textContent = input.validationMessage;
			return;
		}
		errorEl.textContent = '';
	}

	// Password match check
	function validatePasswordMatch() {
		if (confirmpassword.value && password.value !== confirmpassword.value) {
			confirmpassword.setCustomValidity('Passwords do not match');
		} else {
			confirmpassword.setCustomValidity('');
		}
	}

	// Wire up input events to validate progressively
	firstname.addEventListener('input', () => { firstname.setCustomValidity(''); showError(firstname, firstnameError); });
	lastname.addEventListener('input', () => { lastname.setCustomValidity(''); showError(lastname, lastnameError); });
	age.addEventListener('input', () => { age.setCustomValidity(''); showError(age, ageError); });
	password.addEventListener('input', () => { password.setCustomValidity(''); showError(password, passwordError); validatePasswordMatch(); showError(confirmpassword, confirmpasswordError); });
	confirmpassword.addEventListener('input', () => { confirmpassword.setCustomValidity(''); validatePasswordMatch(); showError(confirmpassword, confirmpasswordError); });

	form.addEventListener('submit', (e) => {
		validatePasswordMatch();

		// Run built-in checks first
		if (!form.checkValidity()) {
			e.preventDefault();
			// Show inline messages for all fields
			showError(firstname, firstnameError);
			showError(lastname, lastnameError);
			showError(age, ageError);
			showError(password, passwordError);
			showError(confirmpassword, confirmpasswordError);
			// Also use native UI to focus first invalid control
			form.reportValidity();
			return;
		}

		// If reached here, form is valid. You can proceed with submission logic.
		// For demo purposes prevent default and show a simple message.
		e.preventDefault();
		alert('Form is valid — ready to submit.');
	});
});
