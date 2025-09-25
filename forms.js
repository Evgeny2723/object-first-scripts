  document.addEventListener('DOMContentLoaded', function() {
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
    const selfAttributionInput = document.getElementById('p-self-attribution');
    let isSubmitting = false;

    // --- Переменные для отслеживания Honeypot ---
    let formInteractionStartTime = 0;
    let decoyLinkClicked = false;

    // --- Функция для замены визуально схожих символов (латиница на кириллицу) ---
    function replaceConfusableChars(str) {
        if (typeof str !== 'string') return str;
        // Используем Unicode-коды для кириллицы, чтобы избежать проблем с кодировкой
        return str.replace(/e/g, '\u0435').replace(/a/g, '\u0430');
    }

    try {
        // --- Обработка поля-ловушки "Confirm Email" ---
        const confirmEmailInput = document.querySelector('input[name="p-confirm-email"]');
        if (confirmEmailInput) {
            // Ищем родительский контейнер, чтобы надежно найти связанный <label>
            const parentWrapper = confirmEmailInput.closest('.field-row'); // Используем класс .field-row
            if (parentWrapper) {
                const confirmEmailLabel = parentWrapper.querySelector('label');
                if (confirmEmailLabel) {
                    confirmEmailLabel.textContent = replaceConfusableChars(confirmEmailLabel.textContent);
                    console.log('Honeypot: Label for "confirm-email" was successfully obfuscated.');
                }
            }
            // Также обфусцируем атрибут 'name' самого поля ввода
            confirmEmailInput.name = replaceConfusableChars(confirmEmailInput.name);
        }

        // --- Обработка поля-ловушки "city" ---
        const cityInput = document.querySelector('input[name="p-city"]');
        if (cityInput) {
            const parentWrapper = cityInput.closest('.field-row'); // Используем класс .field-row
            if (parentWrapper) {
                const cityLabel = parentWrapper.querySelector('label');
                if (cityLabel) {
                    cityLabel.textContent = replaceConfusableChars(cityLabel.textContent);
                    console.log('Honeypot: Label for "city" was successfully obfuscated.');
                }
            }
        }
    } catch (error) {
        console.error('An error occurred during honeypot character replacement:', error);
    }

    form2.addEventListener('input', () => {
        if (formInteractionStartTime === 0) {
            formInteractionStartTime = Date.now();
            console.log('Honeypot: Form interaction started.');
        }
    }, { once: true });

    const decoyLink = document.getElementById('optional-link');
    if (decoyLink) {
        decoyLink.addEventListener('click', (e) => {
            e.preventDefault(); // Предотвращаем реальный переход по ссылке
            decoyLinkClicked = true;
            console.warn('Honeypot triggered: Decoy link was clicked.');
        });
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

    [fullNameInput, emailInput2, companyInput2, selfAttributionInput].forEach(input => {
      handleLabel(input);
    });

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

      $(document).ready(function() {
        const checkbox = $('#p-agreement');
        const label = checkbox.closest('.p-checkbox-field').find('.checkbox-text');

        label.removeClass('error');

        resetCheckbox();
        updateCheckboxErrorClass();
      });

      // Инициализация валидации формы
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
          },
          'self-attribution': {
            maxlength: 50,
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
          },
          'self-attribution': {
            maxlength: "This field should contain no more than 50 characters"
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

      $.validator.addMethod("corporate", function(value, element) {
        return !/@(gmail\.com|yahoo\.com|hotmail\.com|outlook\.com|mail\.ru)$/i.test(value);
      }, "Please enter a valid corporate email address (e.g., yourname@company.com). Personal email addresses (e.g., Gmail, Yahoo) are not accepted.");

      $.validator.addMethod("validEmailChars", function (value, element) {
        return this.optional(element) || /^[a-zA-Z0-9@.\-_]+$/.test(value);
      }, "Please use only valid characters in the email field (letters, numbers, @, ., -, _).");

      $.validator.addMethod("noSpacesOnly", function (value, element) {
        return this.optional(element) || value.trim().length > 0;
      }, "This field cannot contain only spaces.");

      function resetCheckbox() {
        const checkbox = $('#p-agreement');
        checkbox.prop('checked', false).removeAttr('checked');
        checkbox.parent().find('.w-checkbox-input').removeClass('w--redirected-checked');
      }

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
        resetCheckbox();

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
        // Since phone handling was removed, we skip setting country on a phone plugin
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

    function addPlaceholder() {
      const searchInputs = document.querySelectorAll('.form-control[type="search"]');
      searchInputs.forEach(function(searchInput) {
        if (searchInput && !searchInput.getAttribute('placeholder')) {
          searchInput.setAttribute('placeholder', 'Search');
        }
      });
    }

    addPlaceholder();

    const observer = new MutationObserver((mutationsList, observer) => {
      for (let mutation of mutationsList) {
        if (mutation.type === 'childList') {
          addPlaceholder();
        }
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    const pathSegments = window.location.pathname
    .split('/')
    .filter(Boolean);
    const pathLocale = pathSegments[0] || '';
    const allowedLocales = ['en', 'de', 'fr', 'es', 'it', 'pt'];
    const localeHeader = allowedLocales.includes(pathLocale) ? pathLocale : 'en';

    function submitForm(formData, userId) {
      const url = 'https://of-web-api.objectfirst.com/api/application/webflow';
      const headers = {
        'Content-Type': 'application/json',
        'locale': localeHeader
      };

      if (userId) {
        headers['user_id'] = userId;
      }

      return fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(formData),
        credentials: 'include',
      })
        .then(async response => {
        const responseData = await response.json();
        if (!response.ok) {
          if (responseData.errors && responseData.errors.email) {
            $('#p-main-form').validate().showErrors({
              'email': responseData.errors.email[0]
            });
          }
          throw new Error('Server error: ' + JSON.stringify(responseData));
        }
        return responseData;
      })
        .catch(error => {
        console.error('An error occurred:', error);
        throw error;
      });
    }

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

    $('#p-main-form').on('submit', async function(event) {
      event.preventDefault();

      if (!$(this).valid()) {
        return;
      }

      if (isSubmitting) {
        return;
      }

      isSubmitting = true;
      submitButton2.setAttribute('disabled', 'disabled');

      const form = this;
      const formData = new FormData(form);

      // Получаем значения из полей-ловушек (используя обфусцированное имя для email)
        const confirmEmailValue = formData.get(replaceConfusableChars('confirm-email')) || '';
        const cityValue = formData.get('p-city') || '';
        let junk_lead = false; // Флаг, который пометит заявку как спам

        // 1. Проверка на заполнение скрытых полей
        if (confirmEmailValue.length > 0 || cityValue.length > 0) {
            console.warn('Honeypot triggered: A hidden field was filled.');
            junk_lead = true;
        }

        // 2. Проверка времени заполнения формы
        const formFillingTime = formInteractionStartTime > 0 ? (Date.now() - formInteractionStartTime) / 1000 : 999;
        if (formFillingTime < 2) { // Если форма заполнена менее чем за 2 секунды
            console.warn(`Honeypot triggered: Form submitted too fast (${formFillingTime.toFixed(2)}s).`);
            junk_lead = true;
        }
        
        // 3. Проверка клика по ссылке-ловушке
        if (decoyLinkClicked) {
            junk_lead = true; // junk_lead уже будет true, но для ясности
        }

      const fullName = formData.get('Full-Name');
      const { firstName, lastName } = splitFullName(fullName);

      const leadTypeValue = form.querySelector('input[name="lead_type"]:checked')?.value;

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

      const payload = {
        'firstname': firstName,
        'lastname': lastName,
        email: formData.get('email'),
        company: formData.get('company'),
        lead_type: leadTypeValue,
        country: formData.get('country'),
        state: stateValue || null,
        self_attribution: formData.get('self-attribution'),
        href: window.location.href,
        page: window.location.pathname.substring(1),
        ss_anonymous_id: window.segmentstream?.anonymousId?.() ?? '',
        junk_lead: junk_lead,
        of_form_duration: formFillingTime,
      };

      try {
        let userId = getCookieValue('user_id') || generateUserId();
        const responseData = await submitForm(payload, userId);

        document.cookie = `userId=${userId}; path=/; max-age=31536000`;

        const leadId = userId;
        const roleValue = payload.lead_type.charAt(0).toUpperCase() + payload.lead_type.slice(1).toLowerCase();

        if (window.dataLayer) {
          window.dataLayer.push({
            'event': 'whitepaper',
            'role': roleValue,
            'type': '',
            'email': payload.email,
            'lead_id': leadId
          });
        } else {
          console.warn('dataLayer не определен');
        }

        console.log('Form submitted successfully.', responseData);
        $('#p-success-message').show();
        $('#p-main-form').hide();

      } catch (error) {
        console.error('An error occurred while submitting the form:', error);
      } finally {
        isSubmitting = false;
        submitButton2.removeAttribute('disabled');
      }
    });
  });

  document.addEventListener('DOMContentLoaded', function() {
    // Переменные для полей формы
    const firstNameInput = document.getElementById('First-Name');
    const lastNameInput = document.getElementById('Last-Name');
    const jobTitleInput = document.getElementById('Job-title');
    const emailInput2 = document.getElementById('email-2');
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
    const submitButton = document.querySelector('#submit, #submit-2');
    const form2 = document.getElementById('main-form-2');
    const phoneInput = document.getElementById('phone');
    const selfAttributionInput = document.getElementById('self-attribution');

    // Обработка изменения состояния меток полей
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

    // Применение меток ко всем полям
    [firstNameInput, lastNameInput, jobTitleInput, emailInput2, companyInput2, phoneInput, selfAttributionInput].forEach(input => {
      handleLabel(input);
    });

    // Обработчик для фокуса на поле ввода телефона
    if (phoneInput) {
      phoneInput.addEventListener('focus', () => {
        if (phoneInput.nextElementSibling) {
          phoneInput.nextElementSibling.classList.add('active');
        }
      });
    }

    // Переключение отображения dropdown-меню в зависимости от выбранной страны
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

    // Инициализация селекторов для выбора страны и штатов
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
            // Устанавливаем страну для intlTelInput
            success(data.iso_code);

            // Находим опцию в выпадающем списке
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

    let isFormInitialized = false;

    let isCheckboxInteracted = false; // Флаг для отслеживания взаимодействия с чекбоксом

    // Функция для обновления состояния класса error у текста чекбокса
    function updateCheckboxErrorClass() {
      const checkbox = $('#agreement');
      const label = checkbox.closest('.checkbox-field').find('.checkbox-text'); // Обращение к классу .checkbox-text

      // Проверяем состояние только после взаимодействия
      if (isCheckboxInteracted) {
        if (checkbox.is(':checked')) {
          label.removeClass('error'); // Удаляем класс error, если чекбокс отмечен
        } else {
          label.addClass('error'); // Добавляем класс error, если чекбокс не отмечен
        }
      }
    }

    // Обработчик изменения состояния чекбокса
    $('#agreement').on('change', function() {
      isCheckboxInteracted = true; // Отмечаем, что было взаимодействие
      updateCheckboxErrorClass(); // Обновляем класс error при изменении состояния чекбокса
    });

    // Изначально сбрасываем класс error и состояние чекбокса при загрузке страницы
    $(document).ready(function() {
      const checkbox = $('#agreement');
      const label = checkbox.closest('.checkbox-field').find('.checkbox-text');

      // Удаляем класс error при загрузке страницы
      label.removeClass('error');

      // Проверяем состояние чекбокса после загрузки страницы и сброса
      resetCheckbox(); // Сбрасываем состояние чекбокса
      updateCheckboxErrorClass(); // Проверяем и обновляем класс error (если чекбокс был сброшен)
    });


    // Инициализация валидации формы
    const validator = $('#main-form-2').validate({  
      onfocusout: function(element) {
        if ($(element).data('modified')) {
          $(element).valid(); // Проверка поля при потере фокуса
        }
      },
      onkeyup: function(element) {
        $(element).data('modified', true);
        $(element).valid(); // Проверка поля при вводе данных
      },
      onclick: function(element) {
        if (isFormInitialized) {
          $(element).valid(); // Проверка поля при клике (например, для чекбоксов)
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
        'self-attribution': {
          maxlength: 50,
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
        },
        'self-attribution': {
          maxlength: "This field should contain no more than 50 characters"
        }
      },
      errorPlacement: function (error, element) {
        if ($(element).data('modified')) {
          error.appendTo(element.closest(".field-row"));
        }
      },
      highlight: function(element) {
        if ($(element).data('modified')) {
          $(element).css('border', '1px solid #c50006'); // Добавляем красную границу при ошибке
        }
      },
      unhighlight: function(element) {
        $(element).css('border', ''); // Убираем границу, если ошибок нет
      },
      ignoreTitle: true,
      onfocusin: function(element) {
        isFormInitialized = true; // Начало валидации при первом взаимодействии
        $(element).data("interacted", true); // Помечаем поле как взаимодействующее
      }
    });

    // Кастомный метод для проверки телефона
    $.validator.addMethod("phoneCustom", function(value, element) {
      return iti.isValidNumber(); // Используем метод валидации intlTelInput
    }, "Phone number is invalid. Please add your country code, area code and phone number. Your phone number can contain numbers, spaces and these special characters: ( ) - # +");

    // Кастомный метод для проверки корпоративного email
    $.validator.addMethod("corporate", function(value, element) {
      return !/@(gmail\.com|yahoo\.com|hotmail\.com|outlook\.com|mail\.ru)$/i.test(value);
    }, "Please enter a valid corporate email address (e.g., yourname@company.com). Personal email addresses (e.g., Gmail, Yahoo) are not accepted.");

    // Кастомный метод для проверки допустимых символов в email
    $.validator.addMethod("validEmailChars", function (value, element) {
      // Разрешаем только буквы, цифры, @, ., -, _
      return this.optional(element) || /^[a-zA-Z0-9@.\-_]+$/.test(value);
    }, "Please use only valid characters in the email field (letters, numbers, @, ., -, _).");

    // Кастомный метод для проверки на только пробелы
    $.validator.addMethod("noSpacesOnly", function (value, element) {
      // Проверяем, чтобы поле не содержало только пробелы
      return this.optional(element) || value.trim().length > 0;
    }, "This field cannot contain only spaces.");

    // Функция сброса состояния чекбокса
    function resetCheckbox() {
      const checkbox = $('#agreement');
      checkbox.prop('checked', false).removeAttr('checked'); // Сбросить чекбокс
      checkbox.parent().find('.w-checkbox-input').removeClass('w--redirected-checked'); // Убираем визуальное выделение
    }

    // Функция обновления состояния кнопки отправки
    function updateSubmitButtonState() {
      const isFormValid = $('#main-form-2').valid(); // Проверяем валидность всей формы
      const selectedCountry = $('#country-2').val();
      const isCheckboxChecked = $('#agreement').prop('checked');
      const isCheckboxRequirementMet = selectedCountry === 'United States' || isCheckboxChecked; // Если выбрана US, игнорируем состояние чекбокса

      if (isFormValid && isCheckboxRequirementMet) {
        $('#submit, #submit-2').removeAttr('disabled'); // Активируем кнопку, если форма валидна и условие чекбокса выполнено
      } else {
        $('#submit, #submit-2').attr('disabled', 'disabled'); // Деактивируем кнопку, если не выполнены условия
      }
    }

    // Функция переключения элементов для конкретной страны
    function toggleCountrySpecificElements(selectedCountry) {
      resetCheckbox(); // Сбрасываем чекбокс при смене страны

      if (selectedCountry === 'United States') {
        document.querySelector('.form-message').style.display = 'none';
        document.querySelector('.form-message_usa').style.display = 'block';
        $('#agreement').prop('checked', true).parent().hide(); // Установить и скрыть чекбокс
      } else {
        document.querySelector('.form-message').style.display = 'block';
        document.querySelector('.form-message_usa').style.display = 'none';
        $('#agreement').parent().show(); // Показать чекбокс
      }

      setTimeout(() => {
        updateSubmitButtonState(); // Обновляем состояние кнопки после изменения страны
      }, 50);
    }


    // Обработчик изменения состояния чекбокса
    $('#agreement').on('change', function() {
      updateSubmitButtonState(); // Обновляем состояние кнопки
    });

    // Обновляем состояние кнопки при изменении формы
    $('#main-form-2').on('input change', function(event) {
      updateSubmitButtonState();
    });

    // Изначально деактивируем кнопку отправки
    $('#submit, #submit-2').attr('disabled', 'disabled');

    // Функция добавления placeholder для поиска
    function addPlaceholder() {
      const searchInputs = document.querySelectorAll('.form-control[type="search"]');
      searchInputs.forEach(function(searchInput) {
        if (searchInput && !searchInput.getAttribute('placeholder')) {
          searchInput.setAttribute('placeholder', 'Search');
        }
      });
    }

    addPlaceholder();

    const observer = new MutationObserver((mutationsList, observer) => {
      for (let mutation of mutationsList) {
        if (mutation.type === 'childList') {
          addPlaceholder();
        }
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Карта кодов стран для intlTelInput
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
    // Обработчик изменения страны
    $('#country-2').on('change', function() {
      toggleCountrySpecificElements(this.value);
      iti.setCountry(countryCodeMap[this.value]);
      $(this).valid();
    });

    const form = document.getElementById('main-form-2');
    const successMessage = document.querySelector('.success-message.w-form-done');
    const formFields = document.querySelector('.main-form');

    let isSubmitting = false;

    function generateUserId() {
      return 'user_' + Math.random().toString(36).substr(2, 9);
    }

    function getCookieValue(name) {
      const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
      if (match) return match[2];
      return null;
    }
    
    function replaceConfusableChars(str) {
        if (typeof str !== 'string') return str;
        // Используем правильные Unicode-коды для кириллицы
        return str.replace(/e/g, '\u0435').replace(/a/g, '\u0430');
    }

    try {
      // --- Обработка поля "Confirm Email" ---
      const confirmEmailInput = document.querySelector('input[name="confirm-email"]');

      // Проверяем, что поле вообще найдено
      if (confirmEmailInput) {
        // ИЩЕМ LABEL БОЛЕЕ НАДЕЖНЫМ СПОСОБОМ:
        // Находим ближайшего родителя-обертку (например, с классом .input-w или .field-row)
        // и уже ВНУТРИ него ищем сам <label>.
        const parentWrapper = confirmEmailInput.closest('.input-w'); // <-- Укажите класс вашей обертки
        if (parentWrapper) {
          const confirmEmailLabel = parentWrapper.querySelector('label');
          if (confirmEmailLabel) {
            confirmEmailLabel.textContent = replaceConfusableChars(confirmEmailLabel.textContent);
            console.log('Label for "confirm-email" was successfully obfuscated.');
          }
        }

        // Замена имени для самого input остается как есть
        confirmEmailInput.name = replaceConfusableChars(confirmEmailInput.name);
      }

      // --- Обработка метки для поля "city" ---
      const cityInput = document.querySelector('input[name="city"]');
      if (cityInput) {
        const parentWrapper = cityInput.closest('.input-w'); // <-- Укажите тот же класс обертки
        if (parentWrapper) {
          const cityLabel = parentWrapper.querySelector('label');
          if (cityLabel) {
            cityLabel.textContent = replaceConfusableChars(cityLabel.textContent);
            console.log('Label for "city" was successfully obfuscated.');
          }
        }
      }

    } catch (error) {
      console.error('An error occurred during honeypot character replacement:', error);
    }

    // Обработчик отправки формы
    if (form) {
    
    let formInteractionStartTime = 0;
      let decoyLinkClicked = false;

      form.addEventListener('input', () => {
        if (formInteractionStartTime === 0) {
          formInteractionStartTime = Date.now();
          console.log('Honeypot: Form interaction started.');
        }
      }, { once: true });

      const decoyLink = document.getElementById('optional-link');
      if (decoyLink) {
        decoyLink.addEventListener('click', (e) => {
          e.preventDefault(); // Предотвращаем переход по ссылке
          decoyLinkClicked = true;
          console.warn('Honeypot triggered: Decoy link was clicked.');
        });
      }
      form.addEventListener('submit', async function(event) {
        event.preventDefault();

        // Проверка флага отправки
        if (isSubmitting) {
          return;
        }
        isSubmitting = true; // Устанавливаем флаг
        submitButton.setAttribute('disabled', 'disabled'); // Отключаем кнопку

        const formData = new FormData(form);
        const confirmEmailValue = formData.get(replaceConfusableChars('confirm-email')) || '';
        const cityValue = formData.get('city') || '';
        let junk_lead = false;

        if (confirmEmailValue.length > 0 || cityValue.length > 0) {
          console.warn('Honeypot triggered: A hidden field was filled.');
          junk_lead = true;
        }

        const formFillingTime = formInteractionStartTime > 0 ? (Date.now() - formInteractionStartTime) / 1000 : 999;
        if (formFillingTime < 2) {
          console.warn(`Honeypot triggered: Form submitted too fast (${formFillingTime.toFixed(2)}s).`);
          junk_lead = true;
        }

        if (decoyLinkClicked) {
          junk_lead = true;
        }
        const leadTypeValue = form.querySelector('input[name="lead_type"]:checked')?.value;

        let stateValue = '';
        const selectedCountry = form.querySelector('select[name="country"]').value;

        // Получаем значения state для конкретных стран
        if (selectedCountry === 'United States') {
          stateValue = form.querySelector('#state-2').value;
        } else if (selectedCountry === 'Australia') {
          stateValue = form.querySelector('#states-australia').value;
        } else if (selectedCountry === 'Brazil') {
          stateValue = form.querySelector('#states-brazil').value;
        } else if (selectedCountry === 'Canada') {
          stateValue = form.querySelector('#states-canada').value;
        } else if (selectedCountry === 'China') {
          stateValue = form.querySelector('#states-china').value;
        } else if (selectedCountry === 'Ireland') {
          stateValue = form.querySelector('#states-ireland').value;
        } else if (selectedCountry === 'India') {
          stateValue = form.querySelector('#states-india').value;
        } else if (selectedCountry === 'Italy') {
          stateValue = form.querySelector('#states-italy').value;
        } else if (selectedCountry === 'Mexico') {
          stateValue = form.querySelector('#states-mexico').value;
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
          self_attribution: formData.get('self-attribution'),
          href: window.location.href,
          page: window.location.pathname.substring(1),
          ss_anonymous_id: window.segmentstream?.anonymousId?.() ?? '',
          junk_lead: junk_lead,
          of_form_duration: formFillingTime,
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
          // Отправка данных на сервер
          let userId = getCookieValue('user_id') || generateUserId();
          const responseData = await submitForm(data, userId);

          // Если запрос успешен
          console.log('Form submitted successfully.', responseData);

          if (formFields) formFields.style.display = 'none';
          if (successMessage) successMessage.style.display = 'block';

          document.cookie = `user_id=${userId}; path=/; max-age=31536000`;

          const leadId = userId;
          const roleValue = data.lead_type.charAt(0).toUpperCase() + data.lead_type.slice(1).toLowerCase();

          if (window.dataLayer) {
            window.dataLayer.push({
              'event': 'demo',
              'role': roleValue,
              'type': '',
              'email': data.email,
              'phone': data.phone,
              'lead_id': leadId
            });
          } else {
            console.warn('dataLayer не определен');
          }
        } catch (error) {
          console.error('Error:', error.message);
          if (successMessage) successMessage.style.display = 'none';
          if (formFields) formFields.style.display = 'flex';
        } finally {
          // Сброс флага и разблокировка кнопки
          isSubmitting = false;
          submitButton.removeAttribute('disabled');
        }
      });
    }

    const pathSegments = window.location.pathname
    .split('/')
    .filter(Boolean)
    const pathLocale = pathSegments[0] || '';
    const allowedLocales = ['en', 'de', 'fr', 'es', 'it', 'pt'];
    const localeHeader = allowedLocales.includes(pathLocale) ? pathLocale : 'en';

    // Функция отправки данных на сервер
    async function submitForm(data, userId) {
      try {
        const headers = {
          'Content-Type': 'application/json',
          'locale': localeHeader
        };

        if (userId) {
          headers['user_id'] = userId;
        }

        const response = await fetch('https://of-web-api.objectfirst.com/api/application/webflow', {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(data),
          credentials: 'include',
        });

        const responseData = await response.json();

        if (!response.ok) {
          if (responseData.errors && responseData.errors.email) {
            $('#main-form-2').validate().showErrors({
              'email': responseData.errors.email[0]
            });
          }
          throw new Error('Server error: ' + JSON.stringify(responseData));
        }

        return responseData;

      } catch (error) {
        console.error('Error:', error);
        throw error;
      }
    }
  });
