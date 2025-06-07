document.addEventListener('DOMContentLoaded', function() {
// --- ОБЩИЕ ФУНКЦИИ И ПЕРЕМЕННЫЕ ---
const countryCodeMap = {
"Australia": "AU",
"Austria": "AT",
"Azerbaijan": "AZ",
"Albania": "AL",
"Algeria": "DZ",
"Angola": "AO",
"Andorra": "AD",
"Antigua and Barbuda": "AG",
"Argentina": "AR",
"Armenia": "AM",
"Afghanistan": "AF",
"Bahamas": "BS",
"Bangladesh": "BD",
"Barbados": "BB",
"Bahrain": "BH",
"Belarus": "BY",
"Belize": "BZ",
"Belgium": "BE",
"Benin": "BJ",
"Bulgaria": "BG",
"Bolivia": "BO",
"Bosnia and Herzegovina": "BA",
"Botswana": "BW",
"Brazil": "BR",
"Brunei Darussalam": "BN",
"Burkina Faso": "BF",
"Burundi": "BI",
"Bhutan": "BT",
"Vanuatu": "VU",
"Hungary": "HU",
"Venezuela": "VE",
"Vietnam": "VN",
"Gabon": "GA",
"Haiti": "HT",
"Guyana": "GY",
"Gambia": "GM",
"Ghana": "GH",
"Guatemala": "GT",
"Guinea": "GN",
"Guinea-Bissau": "GW",
"Germany": "DE",
"Honduras": "HN",
"Grenada": "GD",
"Greece": "GR",
"Georgia": "GE",
"Denmark": "DK",
"Congo, Democratic Republic of the": "CD",
"Djibouti": "DJ",
"Dominica": "DM",
"Dominican Republic": "DO",
"Egypt": "EG",
"Zambia": "ZM",
"Zimbabwe": "ZW",
"Israel": "IL",
"India": "IN",
"Indonesia": "ID",
"Jordan": "JO",
"Iraq": "IQ",
"Iran": "IR",
"Ireland": "IE",
"Iceland": "IS",
"Spain": "ES",
"Italy": "IT",
"Yemen": "YE",
"Cabo Verde": "CV",
"Kazakhstan": "KZ",
"Cambodia": "KH",
"Cameroon": "CM",
"Canada": "CA",
"Qatar": "QA",
"Kenya": "KE",
"Cyprus": "CY",
"Kiribati": "KI",
"China": "CN",
"Colombia": "CO",
"Comoros": "KM",
"Congo": "CG",
"North Korea": "KP",
"Costa Rica": "CR",
"Côte d'Ivoire": "CI",
"Cuba": "CU",
"Kuwait": "KW",
"Kyrgyzstan": "KG",
"Lao People's Democratic Republic": "LA",
"Latvia": "LV",
"Lesotho": "LS",
"Liberia": "LR",
"Lebanon": "LB",
"Libya": "LY",
"Lithuania": "LT",
"Liechtenstein": "LI",
"Luxembourg": "LU",
"Mauritius": "MU",
"Mauritania": "MR",
"Madagascar": "MG",
"Malawi": "MW",
"Malaysia": "MY",
"Mali": "ML",
"Maldives": "MV",
"Malta": "MT",
"Morocco": "MA",
"Marshall Islands": "MH",
"Mexico": "MX",
"Mozambique": "MZ",
"Monaco": "MC",
"Mongolia": "MN",
"Myanmar": "MM",
"Namibia": "NA",
"Nauru": "NR",
"Nepal": "NP",
"Niger": "NE",
"Nigeria": "NG",
"Netherlands": "NL",
"Nicaragua": "NI",
"Niue": "NU",
"New Zealand": "NZ",
"Norway": "NO",
"Tanzania, United Republic of": "TZ",
"United Arab Emirates": "AE",
"Oman": "OM",
"Cook Islands": "CK",
"Pakistan": "PK",
"Panama": "PA",
"Papua New Guinea": "PG",
"Paraguay": "PY",
"Peru": "PE",
"Poland": "PL",
"Portugal": "PT",
"Korea, Republic of": "KR",
"Moldova, Republic of": "MD",
"Russian Federation": "RU",
"Rwanda": "RW",
"Romania": "RO",
"El Salvador": "SV",
"Samoa": "WS",
"San Marino": "SM",
"Sao Tome and Principe": "ST",
"Saudi Arabia": "SA",
"Holy See (Vatican City State)": "VA",
"North Macedonia": "MK",
"Seychelles": "SC",
"Senegal": "SN",
"Saint Vincent and the Grenadines": "VC",
"Saint Kitts and Nevis": "KN",
"Saint Lucia": "LC",
"Serbia": "RS",
"Singapore": "SG",
"Syrian Arab Republic": "SY",
"Slovakia": "SK",
"Slovenia": "SI",
"United Kingdom": "GB",
"United States": "US",
"Solomon Islands": "SB",
"Somalia": "SO",
"Sudan": "SD",
"Suriname": "SR",
"Sierra Leone": "SL",
"Tajikistan": "TJ",
"Thailand": "TH",
"Timor-Leste": "TL",
"Togo": "TG",
"Tonga": "TO",
"Trinidad and Tobago": "TT",
"Tuvalu": "TV",
"Tunisia": "TN",
"Turkmenistan": "TM",
"Turkey": "TR",
"Uganda": "UG",
"Uzbekistan": "UZ",
"Ukraine": "UA",
"Uruguay": "UY",
"Fiji": "FJ",
"Philippines": "PH",
"Finland": "FI",
"France": "FR",
"Croatia": "HR",
"Central African Republic": "CF",
"Chad": "TD",
"Montenegro": "ME",
"Czech Republic": "CZ",
"Chile": "CL",
"Switzerland": "CH",
"Sweden": "SE",
"Sri Lanka": "LK",
"Ecuador": "EC",
"Equatorial Guinea": "GQ",
"Eritrea": "ER",
"Eswatini": "SZ",
"Estonia": "EE",
"Ethiopia": "ET"
};

// Общие функции
function splitFullName(fullName) {
if (!fullName) {
return { firstName: '', lastName: '' };
}

const nameParts = fullName.trim().split(' ');
const firstName = nameParts[0] || '';
const lastName = nameParts.slice(1).join(' ') || '';

if (nameParts.length === 1) {
return { firstName, lastName: firstName };
}

if (nameParts.length > 2) {
return { firstName, lastName: nameParts[1] || '' };
}

return { firstName, lastName };
}

function generateUserId() {
return 'user_' + Math.random().toString(36).substr(2, 9);
}

function getCookieValue(name) {
const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
if (match) return match[2];
return null;
}

function handleLabel(input) {
if (!input) return;
const label = input.nextElementSibling;

const updateLabelState = () => {
if (input.value !== '') {
  label.classList.add('active');
  input.classList.add('not-empty');
} else {
  label.classList.remove('active');
  input.classList.remove('not-empty');
}
};

updateLabelState();

input.addEventListener('focus', () => {
label.classList.add('active');
});

input.addEventListener('blur', () => {
updateLabelState();
});

input.addEventListener('input', () => {
updateLabelState();
});
}

function resetCheckbox(checkboxId) {
const checkboxInner = $(checkboxId);
checkboxInner.prop('checked', false).removeAttr('checked');
checkboxInner.parent().find('.w-checkbox-input').removeClass('w--redirected-checked');
}

function addPlaceholder() {
const searchInputs = document.querySelectorAll('.form-control[type="search"]');
searchInputs.forEach(function(searchInput) {
if (searchInput && !searchInput.getAttribute('placeholder')) {
  searchInput.setAttribute('placeholder', 'Search');
}
});
}

// Инициализация наблюдателя для placeholder
const observer = new MutationObserver((mutationsList, observer) => {
for (let mutation of mutationsList) {
if (mutation.type === 'childList') {
  addPlaceholder();
}
}
});
observer.observe(document.body, { childList: true, subtree: true });

// --- ФУНКЦИИ ДЛЯ ОТПРАВКИ ФОРМ ---
const pathSegments = window.location.pathname.split('/').filter(Boolean);
const pathLocale = pathSegments[0] || '';
const allowedLocales = ['en', 'de', 'fr', 'es', 'it', 'pt'];
const localeHeader = allowedLocales.includes(pathLocale) ? pathLocale : 'en';

async function submitFormToVerifiedWebflow(data, formType = 'main') {
try {
const response = await fetch('https://of-web-api.objectfirst.com/api/application/verified-webflow', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'locale': localeHeader
  },
  body: JSON.stringify(data),
  credentials: 'include',
});

const responseData = await response.json();

if (!response.ok) {
  if (responseData.errors && responseData.errors.email) {
    $(`#${formType === 'main' ? 'main-form-2' : 'p-main-form'}`).validate().showErrors({
      'email': responseData.errors.email[0]
    });
  }
  throw new Error('Server error: ' + JSON.stringify(responseData));
}

return responseData;
} catch (error) {
console.error('Error submitting form:', error);
throw error;
}
}

async function verifyCode(email, code) {
try {
const response = await fetch('https://of-web-api.objectfirst.com/api/application/webflow/verify', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, code }),
  credentials: 'include',
});
return await response.json();
} catch (error) {
console.error('Error verifying code:', error);
throw error;
}
}

// --- ПОПАП ФОРМА ---
const pMainFormContainer = document.getElementById('p-main-form-container');
const pCodeFormContainer = document.getElementById('p-code-form-container');
const pCodeForm = document.getElementById('p-code-form');
const pCodeInput = document.getElementById('p-code');
const pSubmitCodeButton = document.getElementById('p-submit-code');
const pResendCodeButton = document.getElementById('p-resend-code');
const pEmailDisplay = document.getElementById('p-email-display');
let isPopupSubmitting = false;
let isCodeSubmitting = false;

if (pMainFormContainer) {
// Элементы попап формы
const fullNameInput = document.getElementById('p-full-name');
const emailInput2 = document.getElementById('p-email');
const companyInput2 = document.getElementById('p-company');
const countrySelect2 = document.getElementById('p-country');
const dropdownAustralia = document.querySelector('.p-states-australia');
const dropdownBrazil = document.querySelector('.p-states-brazil');
const dropdownCanada = document.querySelector('.p-states-canada');
const dropdownChina = document.querySelector('.p-states-china');
const dropdownIreland = document.querySelector('.p-states-ireland');
const dropdownIndia = document.querySelector('.p-states-india');
const dropdownItaly = document.querySelector('.p-states-italy');
const dropdownMexico = document.querySelector('.p-states-mexico');
const dropdownState2 = document.querySelector('.p-dropdown-state');
const checkboxField = document.querySelector('.p-checkbox-field');
const checkbox = document.querySelector('.p-checkbox-field input[type="checkbox"]');
const submitButton2 = document.getElementById('p-submit');
const form2 = document.getElementById('p-main-form');
  pCodeFormContainer.style.display = 'none';

// Обработчики лейблов
[fullNameInput, emailInput2, companyInput2].forEach(input => {
handleLabel(input);
});

// Логика страны-штатов
countrySelect2.addEventListener('change', function() {
const selectedCountry = countrySelect2.value;
const dropdowns = {
  'United States': dropdownState2,
  'Australia': dropdownAustralia,
  'Brazil': dropdownBrazil,
  'Canada': dropdownCanada,
  'China': dropdownChina,
  'Ireland': dropdownIreland,
  'India': dropdownIndia,
  'Italy': dropdownItaly,
  'Mexico': dropdownMexico
};

Object.values(dropdowns).forEach(dropdown => {
  if (dropdown) {
    dropdown.style.display = 'none';
  }
});

if (dropdowns[selectedCountry]) {
  dropdowns[selectedCountry].style.display = 'block';
} else {
  Object.values(dropdowns).forEach(dropdown => {
    if (dropdown) {
      dropdown.style.display = 'none';
    }
  });
}
});

// Инициализация selectpicker
$('#p-country').selectpicker();
$('#p-state, #p-states-australia, #p-states-brazil, #p-states-canada, #p-states-china, #p-states-ireland, #p-states-india, #p-states-italy, #p-states-mexico').selectpicker();

$('#p-country').on('shown.bs.select', function() {
const selectpicker = $(this).data('selectpicker');
selectpicker.$menuInner[0].scrollTop = 0;
});

$('#p-state, #p-states-australia, #p-states-brazil, #p-states-canada, #p-states-china, #p-states-ireland, #p-states-india, #p-states-italy, #p-states-mexico').on('shown.bs.select', function() {
const selectpicker = $(this).data('selectpicker');
selectpicker.$menuInner[0].scrollTop = 0;
});

      // Функция для определения страны по IP
    function detectCountryForFirstForm() {
      return fetch('https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-3627560b-2163-4a62-81db-3a3b5da17d5a/ip/info')
        .then(response => response.json())
        .then(data => {
        if (data && data.country) {
          return data.country;
        }
        return null;
      })
        .catch(error => {
        console.error('Ошибка при определении страны:', error);
        return null;
      });
    }

    detectCountryForFirstForm().then(country => {
      if (country) {
        // Находим соответствующую опцию в выпадающем списке
        const option = [...countrySelect2.options].find(opt => opt.value === country);
        if (option) {
          option.selected = true;
          countrySelect2.dispatchEvent(new Event('change'));
          $('#p-country').selectpicker('refresh'); // Обновляем селектпикер
        }
      }
    });

// Валидация попап формы
$(document).ready(function() {
let isFormInitialized = false;
let isCheckboxInteracted = false;

function updateCheckboxErrorClass() {
  const checkbox = $('#p-agreement');
  const label = checkbox.closest('.p-checkbox-field').find('.checkbox-text');

  if (isCheckboxInteracted) {
    if (checkbox.is(':checked')) {
      label.removeClass('error');
    } else {
      label.addClass('error');
    }
  }
}

$('#p-agreement').on('change', function() {
  isCheckboxInteracted = true;
  updateCheckboxErrorClass();
});

// Инициализация валидации основной формы попапа
const validator = $('#p-main-form').validate({
  onfocusout: function(element) {
    if ($(element).data('modified')) {
      $(element).valid();
    }
  },
  onkeyup: function(element) {
    $(element).data('modified', true);
    $(element).valid();
  },
  onclick: function(element) {
    if (isFormInitialized) {
      $(element).valid();
    }
  },
  rules: {
    'Full-Name': {
      required: true,
      maxlength: 50,
      noSpacesOnly: true
    },
    email: {
      required: true,
      maxlength: 50,
      email: true,
      corporate: true,
      validEmailChars: true
    },
    company: {
      required: true,
      maxlength: 50,
      noSpacesOnly: true
    }
  },
  messages: {
    'Full-Name': {
      required: "This field is required",
      maxlength: "Full name must be at most 50 characters"
    },
    email: {
      required: "This field is required",
      maxlength: "Email must be at most 50 characters",
      email: "Invalid email address",
      corporate: "Please enter a valid corporate email address (e.g., yourname@company.com). Personal email addresses (e.g., Gmail, Yahoo) are not accepted."
    },
    company: {
      required: "This field is required",
      maxlength: "Company must be at most 50 characters"
    }
  },
  errorPlacement: function (error, element) {
    if ($(element).data('modified')) {
      error.appendTo(element.closest(".field-row"));
    }
  },
  highlight: function(element) {
    if ($(element).data('modified')) {
      $(element).css('border', '1px solid #c50006');
    }
  },
  unhighlight: function(element) {
    $(element).css('border', '');
  },
  ignoreTitle: true,
  onfocusin: function(element) {
    isFormInitialized = true;
    $(element).data("interacted", true);
  }
});

function updateSubmitButtonState() {
  const isFormValid = $('#p-main-form').valid();
  const selectedCountry = $('#p-country').val();
  const isCheckboxChecked = $('#p-agreement').prop('checked');
  const isCheckboxRequirementMet = selectedCountry === 'United States' || isCheckboxChecked;

  if (isFormValid && isCheckboxRequirementMet) {
    $('#p-submit').removeAttr('disabled');
  } else {
    $('#p-submit').attr('disabled', 'disabled');
  }
}

function toggleCountrySpecificElements(selectedCountry) {
  resetCheckbox('#p-agreement');

  if (selectedCountry === 'United States') {
    document.querySelector('.form-message').style.display = 'none';
    document.querySelector('.form-message_usa').style.display = 'block';
    $('#p-agreement').prop('checked', true).parent().hide();
  } else {
    document.querySelector('.form-message').style.display = 'block';
    document.querySelector('.form-message_usa').style.display = 'none';
    $('#p-agreement').parent().show();
  }

  setTimeout(() => {
    updateSubmitButtonState();
  }, 50);
}

$('#p-country').on('change', function() {
  toggleCountrySpecificElements(this.value);
  $(this).valid();
});

$('#p-agreement').on('change', function() {
  updateSubmitButtonState();
});

$('#p-main-form').on('input change', function(event) {
  updateSubmitButtonState();
});

$('#p-submit').attr('disabled', 'disabled');
});

// Обработчик отправки попап формы
$('#p-main-form').on('submit', async function(event) {
event.preventDefault();
if (isPopupSubmitting) return;
if (!$('#p-main-form').valid()) return;

isPopupSubmitting = true;
$('#p-submit').attr('disabled', 'disabled');

const form = this;
const formData = new FormData(form);

// Расщепляем полное имя на firstName и lastName
const fullName = formData.get('Full-Name');
const { firstName, lastName } = splitFullName(fullName);

// Выбираем значение state в зависимости от страны
let stateValue = '';
const selectedCountry = form.querySelector('select[name="country"]').value;
if (selectedCountry === 'United States') {
  stateValue = form.querySelector('#p-state').value;
} else if (selectedCountry === 'Australia') {
  stateValue = form.querySelector('#p-states-australia').value;
} else if (selectedCountry === 'Brazil') {
  stateValue = form.querySelector('#p-states-brazil').value;
} else if (selectedCountry === 'Canada') {
  stateValue = form.querySelector('#p-states-canada').value;
} else if (selectedCountry === 'China') {
  stateValue = form.querySelector('#p-states-china').value;
} else if (selectedCountry === 'Ireland') {
  stateValue = form.querySelector('#p-states-ireland').value;
} else if (selectedCountry === 'India') {
  stateValue = form.querySelector('#p-states-india').value;
} else if (selectedCountry === 'Italy') {
  stateValue = form.querySelector('#p-states-italy').value;
} else if (selectedCountry === 'Mexico') {
  stateValue = form.querySelector('#p-states-mexico').value;
}

// Собираем полезную нагрузку
const data = {
  firstname: firstName,
  lastname: lastName,
  email: formData.get('email'),
  company: formData.get('company'),
  lead_type: form.querySelector('input[name="lead_type"]:checked')?.value || '',
  country: formData.get('country'),
  state: stateValue || null,
  href: window.location.href,
  page: 'ransomware-proof-backup-eu-promo'
};

try {
  const responseData = await submitFormToVerifiedWebflow(data, 'popup');

  if (responseData.success === true) {
    // Успешная отправка — показываем сообщение об успехе
    const userId = generateUserId();
    document.cookie = `userId=${userId}; path=/; max-age=31536000`;

    const leadId = getCookieValue('userId') || '';
    const roleValue = data.lead_type
      ? data.lead_type.charAt(0).toUpperCase() + data.lead_type.slice(1).toLowerCase()
      : '';

    if (window.dataLayer) {
      window.dataLayer.push({
        'event': 'whitepaper',
        'role': roleValue,
        'type': '',
        'email': data.email,
        'lead_id': leadId
      });
    }

    $('#p-success-message').show();
    $('#p-main-form').hide();
  } else {
    // Требуется ввод кода — скрываем форму и показываем форму ввода кода
    pMainFormContainer.style.display = 'none';
    pCodeFormContainer.style.display = 'block';

    // Отображаем email, на который придёт код
    pEmailDisplay.textContent = data.email;
    pEmailDisplay.style.display = 'inline';
  }
} catch (error) {
  console.error('Ошибка при отправке формы попапа:', error);
} finally {
  isPopupSubmitting = false;
  $('#p-submit').removeAttr('disabled');
}
});

// Валидация формы ввода кода попапа
const validatorCodePopup = $('#p-code-form').validate({
onfocusout: function(element) {
  if ($(element).data('modified')) {
    $(element).valid();
  }
},
onkeyup: function(element) {
  $(element).data('modified', true);
  $(element).valid();
},
onclick: function(element) {
  $(element).data("interacted", true);
},
rules: {
  p-code: {
    required: true,
    noSpacesOnly: true,
    minlength: 6
  }
},
messages: {
  p-code: {
    required: "This field is required",
    minlength: "Code must be 6 characters"
  }
},
errorPlacement: function (error, element) {
  if ($(element).data('modified')) {
    error.appendTo(element.closest(".field-row"));
  }
},
highlight: function(element) {
  if ($(element).data('modified')) {
    $(element).css('border', '1px solid #c50006');
  }
},
unhighlight: function(element) {
  $(element).css('border', '');
},
ignoreTitle: true,
onfocusin: function(element) {
  $(element).data("interacted", true);
}
});

// Обработчик отправки формы ввода кода попапа
pCodeForm.addEventListener('submit', async function(event) {
event.preventDefault();
if (isCodeSubmitting) return;
if (!$(pCodeForm).valid()) return;

isCodeSubmitting = true;
pSubmitCodeButton.setAttribute('disabled', 'disabled');

const code = pCodeInput.value.trim();
const email = pEmailDisplay.textContent.trim();

try {
  const result = await verifyCode(email, code);
  if (!result.success) {
    $(pCodeForm).validate().showErrors({ code: result.message || 'Invalid code.' });
    return;
  }

  // Код подтверждён — показываем Success и скрываем всё остальное
  pCodeFormContainer.style.display = 'none';
  $('#p-success-message').show();

  const userId = generateUserId();
  document.cookie = `userId=${userId}; path=/; max-age=31536000`;

  const leadId = getCookieValue('userId') || '';
  const roleValue = ''; // Можно взять из ранее выбранного lead_type, если нужно

  if (window.dataLayer) {
    window.dataLayer.push({
      'event': 'whitepaper',
      'role': roleValue,
      'type': '',
      'email': email,
      'lead_id': leadId
    });
  }
} catch (error) {
  console.error('Ошибка при верификации кода:', error);
} finally {
  isCodeSubmitting = false;
  pSubmitCodeButton.removeAttribute('disabled');
}
});

// Обработчик «Отправить код заново» для попапа
pResendCodeButton.addEventListener('click', async function(event) {
event.preventDefault();

const email = pEmailDisplay.textContent.trim();
if (!email) {
  alert('Email не найден. Пожалуйста, заполните форму заново.');
  return;
}

pResendCodeButton.disabled = true;
pResendCodeButton.textContent = 'Please wait...';

setTimeout(() => {
  pResendCodeButton.disabled = false;
  pResendCodeButton.textContent = 'Отправить код заново';
}, 30000);

try {
  await submitFormToVerifiedWebflow({ email }, 'popup');
  alert('Новый код подтверждения отправлен на ваш email.');
} catch (error) {
  console.error('Ошибка при повторной отправке кода:', error);
  alert('Не удалось отправить код. Попробуйте позже.');
}
});
}

// --- ОСНОВНАЯ ФОРМА ---
const codeFormContainer = document.getElementById('code-form-container');
const mainFormContainer = document.getElementById('main-form-container');
const formCode = document.getElementById('code-form');
const resendCodeButton = document.getElementById('resend-code');
let isSubmitting = false;

if (mainFormContainer) {
// Элементы основной формы
const firstNameInput = document.getElementById('First-Name');
const lastNameInput = document.getElementById('Last-Name');
const jobTitleInput = document.getElementById('Job-title');
const emailInput2 = document.getElementById('email-2');
const codeInput = document.getElementById('code');
const companyInput2 = document.getElementById('company-2');
const countrySelect2 = document.getElementById('country-2');
const dropdownAustralia = document.querySelector('.states-australia');
const dropdownBrazil = document.querySelector('.states-brazil');
const dropdownCanada = document.querySelector('.states-canada');
const dropdownChina = document.querySelector('.states-china');
const dropdownIreland = document.querySelector('.states-ireland');
const dropdownIndia = document.querySelector('.states-india');
const dropdownItaly = document.querySelector('.states-italy');
const dropdownMexico = document.querySelector('.states-mexico');
const dropdownState2 = document.querySelector('.dropdown-state-2');
const stateSelect2 = document.getElementById('state-2');
const checkboxField = document.querySelector('.checkbox-field');
const checkbox = document.querySelector('.checkbox-field input[type="checkbox"]');
const submitButton2 = document.getElementById('submit-2');
const submit2Button = document.getElementById('submit2');
const form2 = document.getElementById('main-form-2');
const phoneInput = document.getElementById('phone');
const emailDisplay = document.getElementById('email-display');
const successMessage = document.querySelector('.success-message');
const formFields = document.getElementById('main-form-2');

codeFormContainer.style.display = 'none';

// Обработчики лейблов
[firstNameInput, lastNameInput, jobTitleInput, emailInput2, companyInput2, phoneInput, codeInput].forEach(input => {
handleLabel(input);
});

if (phoneInput) {
phoneInput.addEventListener('focus', () => {
  if (phoneInput.nextElementSibling) {
    phoneInput.nextElementSibling.classList.add('active');
  }
});
}

// Логика страны-штатов
countrySelect2.addEventListener('change', function() {
const selectedCountry = countrySelect2.value;
const dropdowns = {
  'United States': dropdownState2,
  'Australia': dropdownAustralia,
  'Brazil': dropdownBrazil,
  'Canada': dropdownCanada,
  'China': dropdownChina,
  'Ireland': dropdownIreland,
  'India': dropdownIndia,
  'Italy': dropdownItaly,
  'Mexico': dropdownMexico
};

Object.values(dropdowns).forEach(dropdown => {
  if (dropdown) {
    dropdown.style.display = 'none';
  }
});

if (dropdowns[selectedCountry]) {
  dropdowns[selectedCountry].style.display = 'block';
} else {
  Object.values(dropdowns).forEach(dropdown => {
    if (dropdown) {
      dropdown.style.display = 'none';
    }
  });
}
});

// Инициализация selectpicker
$('#country-2').selectpicker();
$('#state-2, #states-australia, #states-brazil, #states-canada, #states-china, #states-ireland, #states-india, #states-italy, #states-mexico').selectpicker();

$('#country-2').on('shown.bs.select', function() {
const selectpicker = $(this).data('selectpicker');
selectpicker.$menuInner[0].scrollTop = 0;
});

$('#state-2, #states-australia, #states-brazil, #states-canada, #states-china, #states-ireland, #states-india, #states-italy, #states-mexico').on('shown.bs.select', function() {
const selectpicker = $(this).data('selectpicker');
selectpicker.$menuInner[0].scrollTop = 0;
});

// Инициализация intlTelInput
const iti = window.intlTelInput(phoneInput, {
utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
autoPlaceholder: "aggressive",
separateDialCode: true,
initialCountry: "auto",
geoIpLookup: function (success, failure) {
  fetch('https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-3627560b-2163-4a62-81db-3a3b5da17d5a/ip/info')
    .then(response => response.json())
    .then(data => {
      if (data && data.iso_code && data.country) {
        success(data.iso_code);

        const optionToSelect = [...countrySelect2.options].find(
          option => option.value === data.country
        );

        if (optionToSelect) {
          optionToSelect.selected = true;
          countrySelect2.dispatchEvent(new Event('change'));
        } else {
          console.error('Country not found in the dropdown:', data.country);
        }
      } else {
        console.error('Invalid data received from IP API:', data);
        failure();
      }
    })
    .catch(error => {
      console.error('Error while getting IP data:', error);
      failure();
    });
}
});

// Валидация основной формы
$(document).ready(function() {
let isFormInitialized = false;
let isCheckboxInteracted = false;

function updateCheckboxErrorClass() {
  const checkboxInner = $('#agreement');
  const label = checkboxInner.closest('.checkbox-field').find('.checkbox-text');

  if (isCheckboxInteracted) {
    if (checkboxInner.is(':checked')) {
      label.removeClass('error');
    } else {
      label.addClass('error');
    }
  }
}

$('#agreement').on('change', function() {
  isCheckboxInteracted = true;
  updateCheckboxErrorClass();
});

$('#code').mask('000000');

const validatorCode = $('#code-form').validate({
  onfocusout: function(element) {
    if ($(element).data('modified')) {
      $(element).valid();
    }
  },
  onkeyup: function(element) {
    $(element).data('modified', true);
    $(element).valid();
  },
  onclick: function(element) {
    if (isFormInitialized) {
      $(element).valid();
    }
  },
  rules: {
    code: {
      required: true,
      noSpacesOnly: true,
      minlength: 6,
    }
  },
  messages: {
    code: {
      required: "This field is required",
    }
  },
  errorPlacement: function (error, element) {
    if ($(element).data('modified')) {
      error.appendTo(element.closest(".field-row"));
    }
  },
  highlight: function(element) {
    if ($(element).data('modified')) {
      $(element).css('border', '1px solid #c50006');
    }
  },
  unhighlight: function(element) {
    $(element).css('border', '');
  },
  ignoreTitle: true,
  onfocusin: function(element) {
    isFormInitialized = true;
    $(element).data("interacted", true);
  }
});

const validator = $('#main-form-2').validate({
  onfocusout: function(element) {
    if ($(element).data('modified')) {
      $(element).valid();
    }
  },
  onkeyup: function(element) {
    $(element).data('modified', true);
    $(element).valid();
  },
  onclick: function(element) {
    if (isFormInitialized) {
      $(element).valid();
    }
  },
  rules: {
    firstname: {
      required: true,
      maxlength: 50,
      noSpacesOnly: true
    },
    lastname: {
      required: true,
      maxlength: 50,
      noSpacesOnly: true
    },
    email: {
      required: true,
      maxlength: 50,
      email: true,
      corporate: true,
      validEmailChars: true
    },
    job_title: {
      required: true,
      maxlength: 50,
      noSpacesOnly: true
    },
    company: {
      required: true,
      maxlength: 50,
      noSpacesOnly: true
    },
    phone: {
      phoneCustom: true
    },
    agreement: {
      required: function(element) {
        const selectedCountry = $('#country-2').val();
        return selectedCountry !== 'United States' && $(element).is(':visible');
      }
    }
  },
  messages: {
    firstname: {
      required: "This field is required",
      maxlength: "Firstname must be at most 50 characters"
    },
    lastname: {
      required: "This field is required",
      maxlength: "Lastname must be at most 50 characters"
    },
    email: {
      required: "This field is required",
      maxlength: "Email must be at most 50 characters",
      email: "Invalid email address",
      corporate: "Please enter a valid corporate email address (e.g., yourname@company.com). Personal email addresses (e.g., Gmail, Yahoo) are not accepted."
    },
    job_title: {
      required: "This field is required",
      maxlength: "Job title must be at most 50 characters"
    },
    company: {
      required: "This field is required",
      maxlength: "Company must be at most 50 characters"
    },
    phone: {
      phoneCustom: "Phone number is invalid. Please add your country code, area code and phone number. Your phone number can contain numbers, spaces and these special characters: ( ) - # +",
    }
  },
  errorPlacement: function (error, element) {
    if ($(element).data('modified')) {
      error.appendTo(element.closest(".field-row"));
    }
  },
  highlight: function(element) {
    if ($(element).data('modified')) {
      $(element).css('border', '1px solid #c50006');
    }
  },
  unhighlight: function(element) {
    $(element).css('border', '');
  },
  ignoreTitle: true,
  onfocusin: function(element) {
    isFormInitialized = true;
    $(element).data("interacted", true);
  }
});

$.validator.addMethod("phoneCustom", function(value, element) {
  return iti.isValidNumber();
}, "Phone number is invalid. Please add your country code, area code and phone number. Your phone number can contain numbers, spaces and these special characters: ( ) - # +");

function updateSubmitButtonState() {
  const isFormValid = $('#main-form-2').valid();
  const isFormCodeValid = $('#code-form').valid();
  const selectedCountry = $('#country-2').val();
  const isCheckboxChecked = $('#agreement').prop('checked');
  const isCheckboxRequirementMet = selectedCountry === 'United States' || isCheckboxChecked;

  function toggleSubmitButton(buttonSelector, isValid) {
    if (isValid) {
      $(buttonSelector).removeAttr('disabled');
    } else {
      $(buttonSelector).attr('disabled', 'disabled');
    }
  }

  toggleSubmitButton('#submit-2', isFormValid && isCheckboxRequirementMet);
  toggleSubmitButton('#submit2', isFormCodeValid);
}

function toggleCountrySpecificElements(selectedCountry) {
  resetCheckbox('#agreement');

  if (selectedCountry === 'United States') {
    document.querySelector('.form-message').style.display = 'none';
    document.querySelector('.form-message_usa').style.display = 'block';
    $('#agreement').prop('checked', true).parent().hide();
  } else {
    document.querySelector('.form-message').style.display = 'block';
    document.querySelector('.form-message_usa').style.display = 'none';
    $('#agreement').parent().show();
  }

  setTimeout(() => {
    updateSubmitButtonState();
  }, 50);
}

$('#country-2').on('change', function() {
  toggleCountrySpecificElements(this.value);
  iti.setCountry(countryCodeMap[this.value]);
  $(this).valid();
});

$('#agreement').on('change', function() {
  updateSubmitButtonState();
});

$('#main-form-2, #code-form').on('input change', function(event) {
  updateSubmitButtonState();
});

$('#submit-2').attr('disabled', 'disabled');
$('#submit2').attr('disabled', 'disabled');
});

// Обработчик отправки основной формы
form2.addEventListener('submit', async function(event) {
event.preventDefault();

if (isSubmitting) return;

isSubmitting = true;
submitButton2.setAttribute('disabled', 'disabled');

const formData = new FormData(form2);
const leadTypeValue = form2.querySelector('input[name="lead_type"]:checked')?.value;
const selectedCountry = form2.querySelector('select[name="country"]').value;

let stateValue = '';
if (selectedCountry === 'United States') {
  stateValue = form2.querySelector('#state-2').value;
} else if (selectedCountry === 'Australia') {
  stateValue = form2.querySelector('#states-australia').value;
} else if (selectedCountry === 'Brazil') {
  stateValue = form2.querySelector('#states-brazil').value;
} else if (selectedCountry === 'Canada') {
  stateValue = form2.querySelector('#states-canada').value;
} else if (selectedCountry === 'China') {
  stateValue = form2.querySelector('#states-china').value;
} else if (selectedCountry === 'Ireland') {
  stateValue = form2.querySelector('#states-ireland').value;
} else if (selectedCountry === 'India') {
  stateValue = form2.querySelector('#states-india').value;
} else if (selectedCountry === 'Italy') {
  stateValue = form2.querySelector('#states-italy').value;
} else if (selectedCountry === 'Mexico') {
  stateValue = form2.querySelector('#states-mexico').value;
}

const urlParams = new URLSearchParams(window.location.search);
const utmCampaign = urlParams.get('utm_campaign') || '';
const utmContent = urlParams.get('utm_content') || '';
const utmMedium = urlParams.get('utm_medium') || '';
const utmSource = urlParams.get('utm_source') || '';
const utmTerm = urlParams.get('utm_term') || '';

const data = {
  firstname: formData.get('firstname'),
  lastname: formData.get('lastname'),
  email: formData.get('email'),
  job_title: formData.get('job_title'),
  company: formData.get('company'),
  phone: iti.getNumber(),
  lead_type: leadTypeValue,
  country: formData.get('country'),
  state: stateValue || null,
  href: window.location.href,
  page: 'ransomware-proof-backup-eu-promo',
  cookie: {
    _ga: getCookieValue('_ga'),
    c_of__ga: getCookieValue('c_of__ga'),
    c_of_utm_campaign: utmCampaign,
    c_of_utm_content: utmContent,
    c_of_utm_medium: utmMedium,
    c_of_utm_source: utmSource,
    c_of_utm_term: utmTerm
  }
};

if (selectedCountry !== 'United States' && !stateValue) {
  delete data.state;
}

try {
  const responseData = await submitFormToVerifiedWebflow(data, 'main');

  if (responseData.success === true) {
    mainFormContainer.style.display = 'flex';
    codeFormContainer.style.display = 'none';

    if (formFields) formFields.style.display = 'none';
    if (successMessage) successMessage.style.display = 'block';

    const userId = generateUserId();
    document.cookie = `userId=${userId}; path=/; max-age=31536000`;

    const leadId = getCookieValue('userId') || '';
    const roleValue = data.lead_type ? data.lead_type.charAt(0).toUpperCase() + data.lead_type.slice(1).toLowerCase() : '';

    if (window.dataLayer) {
      window.dataLayer.push({
        'event': 'demo',
        'role': roleValue,
        'type': '',
        'email': data.email,
        'phone': data.phone,
        'lead_id': leadId
      });
    }
  } else {
    if (responseData.errors) {
      $('#main-form-2').validate().showErrors({
        'email': responseData.errors.email ? responseData.errors.email[0] : 'Invalid email.'
      });
      throw new Error('Form validation failed.');
    }

    codeFormContainer.style.display = 'block';
    mainFormContainer.style.display = 'none';
    emailDisplay.textContent = data.email.trim();
    throw new Error('Code verification required.');
  }
} catch (error) {
  console.error('Error:', error.message);
  if (successMessage) successMessage.style.display = 'none';
  if (formFields) formFields.style.display = 'flex';
} finally {
  isSubmitting = false;
  submitButton2.removeAttribute('disabled');
}
});

// Обработчик отправки формы кода
formCode.addEventListener('submit', async function(event) {
event.preventDefault();

if (isSubmitting) return;
if (!$(formCode).valid()) return;

isSubmitting = true;
submit2Button.setAttribute('disabled', 'disabled');

const code = codeInput.value.trim();
const email = document.getElementById('email-2').value.trim();

try {
  const result = await verifyCode(email, code);
  if (!result.success) {
    $(formCode).validate().showErrors({ code: result.message || 'Invalid code.' });
    return;
  }

  codeFormContainer.style.display = 'none';
  mainFormContainer.style.display = 'flex';

  if (successMessage) successMessage.style.display = 'block';
  if (formFields) formFields.style.display = 'none';

  const leadTypeValue = document.querySelector('input[name="lead_type"]:checked')?.value || '';
  const roleValue = leadTypeValue
    ? leadTypeValue.charAt(0).toUpperCase() + leadTypeValue.slice(1).toLowerCase()
    : '';
  const phoneNumber = iti.getNumber();
  const leadId = getCookieValue('userId') || '';

  if (window.dataLayer) {
    window.dataLayer.push({
      'event': 'demo',
      'role': roleValue,
      'type': '',
      'email': email,
      'phone': phoneNumber,
      'lead_id': leadId
    });
  }
} catch (error) {
  console.error('Error submitting email form:', error);
} finally {
  isSubmitting = false;
  submit2Button.removeAttribute('disabled');
}
});

// Обработчик «Отправить код заново» для основной формы
resendCodeButton.addEventListener('click', async function(event) {
event.preventDefault();

const email = document.getElementById('email-2').value.trim();
if (!email) {
  alert('Email is missing. Please fill in the email field in the previous step.');
  return;
}

resendCodeButton.disabled = true;
resendCodeButton.textContent = 'Please wait...';

setTimeout(() => {
  resendCodeButton.disabled = false;
  resendCodeButton.textContent = 'Resend Code';
}, 30000);

try {
  await submitFormToVerifiedWebflow({ email }, 'main');
  alert('A new confirmation code has been sent to your email.');
} catch (error) {
  console.error('Error:', error);
  alert('An error occurred while resending the code. Please try again later.');
}
});
}

// Добавляем методы валидации jQuery
$.validator.addMethod("corporate", function(value, element) {
return !/@(gmail\.com|yahoo\.com|hotmail\.com|outlook\.com|mail\.ru)$/i.test(value);
}, "Please enter a valid corporate email address (e.g., yourname@company.com). Personal email addresses (e.g., Gmail, Yahoo) are not accepted.");

$.validator.addMethod("validEmailChars", function (value, element) {
return this.optional(element) || /^[a-zA-Z0-9@.\-_]+$/.test(value);
}, "Please use only valid characters in the email field (letters, numbers, @, ., -, _).");

$.validator.addMethod("noSpacesOnly", function (value, element) {
return this.optional(element) || value.trim().length > 0;
}, "This field cannot contain only spaces.");
});
