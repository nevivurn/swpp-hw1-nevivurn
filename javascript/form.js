class Form {
  constructor(
    email,
    password,
    password_confirmation,
    phone_number,
    fname,
    lname,
    age,
    birth_month,
    birth_day,
    birth_year) {
    this.email = email;
    this.password = password;
    this.password_confirmation = password_confirmation;
    this.phone_number = phone_number;
    this.fname = fname;
    this.lname = lname;
    this.age = age;
    this.birth_month = birth_month;
    this.birth_day = birth_day;
    this.birth_year = birth_year;
  }

  wrongFields() {
    var fields = [];
    if (!/^[^@\s]+@[^@\.\s]+\.[a-z]{2,3}$/.test(this.email)) {
      fields.push('email');
    }
    if (!/[0-9]/.test(this.password) || !/[a-z]/.test(this.password) || !/[A-Z]/.test(this.password) || this.password.length < 8) {
      fields.push('password');
    }
    if (this.password !== this.password_confirmation) {
      fields.push('password_confirmation');
    }
    if (!this.phone_number.match(/^\d{3}-\d{4}-\d{4}$/)) {
      fields.push('phone_number');
    }
    if (!this.fname.match(/^[A-Z][a-z]+$/)) {
      fields.push('fname');
    }
    if (!this.lname.match(/^[A-Z][a-z]+$/)) {
      fields.push('lname');
    }
    if (!Number(this.age) || Number(this.age) < 0 || Number(this.age) > 200) {
      fields.push('age');
    }

    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    if (!months.includes(this.birth_month)) {
      fields.push('birth_month');
    }
    if (!this.birth_day.match(/^\d\d?$/)) {
      fields.push('birth_day');
    }
    if (!Number(this.birth_year) || Number(this.birth_year) < 1800 || Number(this.birth_year) > 2018) {
      fields.push('birth_year');
    }
    return fields;
  }
}

var but = document.createElement('button');
but.innerHTML = "Check";
but.onclick = function() {
  var email = document.forms["form"]["email"].value;
  var password = document.forms["form"]["password"].value;
  var password_confirmation = document.forms["form"]["password-confirmation"].value;
  var phone_number = document.forms["form"]["phone-number"].value;
  var fname = document.forms["form"]["fname"].value;
  var lname = document.forms["form"]["lname"].value;
  var age = document.forms["form"]["age"].value;
  var birth_month = document.forms["form"]["birth-month"].value;
  var birth_day = document.forms["form"]["birth-day"].value;
  var birth_year = document.forms["form"]["birth-year"].value;

  var form = new Form(email, password, password_confirmation, phone_number,
    fname, lname, age, birth_month, birth_day, birth_year);

  var field_desc = {
	  email: ['Email', `characters other than @ or whitespace followed by an @ sign, followed by more characters (not '@', '.', or whitespace: co.kr is not allowed in this case), and then a ".". After the ".", you can only write 2 to 3 letters from a to z.
  - \`characters(except for whitespace and '@')\` **@** \`characters(except for whitespace, '@' and '.')\` **.** \`2-3 alphabets\` 
  - *characters* mean one or more characters including alphabets, numbers or special characters.
  - *alphabets* include both lowercase and uppercase.
  - e.g.) valid@javascript.com (O), invalid@snu.ac.kr (X)`],
    password: ['Password', 'Must contain at least one number and one uppercase and one lowercase letter, and at least 8 or more characters.'],
    password_confirmation: ['Password Confirmation', 'Must match password.'],
    phone_number: ['Phone number', 'nnn-nnnn-nnnn: three numbers, then "-", followed by four numbers and a "-", then four numbers.'],
    fname: ['First Name', 'Start with a capital letter, followed by one or more lowercase letters. Should only contain alphabets (A-Z, a-z)'],
    lname: ['Last Name', 'Start with a capital letter, followed by one or more lowercase letters. Should only contain alphabets (A-Z, a-z)'],
    age: ['Age', 'Must be a number between 0 and 200 (inclusive).'],
    birth_month: ['Month', 'Must be one of "January", "February", ..., "December"'],
    birth_day: ['Day', 'Must be a number of one or two digits.'],
    birth_year: ['Year', 'Must be a number between 1800 and 2018 (inclusive).']
  };

  // reset all labels
  for (field in field_desc) {
    document.getElementById(field.replace('_', '-') + '-label').innerHTML = '';
    document.getElementById(field.replace('_', '-') + '-label').title = '';
  }

  var wrong_fields = form.wrongFields();
  var alertMessage = '';
  if (wrong_fields.length > 0) {
    alertMessage = 'You must correct:\n';
    for (var i = 0; i < wrong_fields.length; i++) {
      var field = wrong_fields[i];
      alertMessage += '\n' + field_desc[field][0];
      document.getElementById(field.replace('_', '-') + '-label').innerHTML = 'X';
      document.getElementById(field.replace('_', '-') + '-label').title = field_desc[field][1];
    }
  } else {
    alertMessage = 'Successfully Submitted!';
  }
  alert(alertMessage);

  // Hint: you can use the RegExp class for matching a string with the `test` method.
  // Hint: you can set contents of elements by finding it with `document.getElementById`, and fixing the `innerHTML`.
  // Hint: modify 'title' attribute of each label to display your message
  // Hint: Ask Google to do things you don't know yet! There should be others who have already done what you are to encounter.
};
document.body.appendChild(but);
