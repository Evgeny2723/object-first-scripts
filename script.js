  document.addEventListener('DOMContentLoaded', function() {
    const pFullName = document.getElementById('p-full-name');
    const pEmail = document.getElementById('p-email');
    const pCompany = document.getElementById('p-company');
    const pCountry = document.getElementById('p-country');
    const pDropdownAustralia = document.querySelector('.p-states-australia');
    const pDropdownBrazil = document.querySelector('.p-states-brazil');
    const pDropdownCanada = document.querySelector('.p-states-canada');
    const pDropdownChina = document.querySelector('.p-states-china');
    const pDropdownIreland = document.querySelector('.p-states-ireland');
    const pDropdownIndia = document.querySelector('.p-states-india');
    const pDropdownItaly = document.querySelector('.p-states-italy');
    const pDropdownMexico = document.querySelector('.p-states-mexico');
    const pDropdownState = document.querySelector('.p-dropdown-state');
    const pCheckboxField = document.querySelector('.p-checkbox-field');
    const pCheckbox = document.querySelector('.p-checkbox-field input[type="checkbox"]');
    const pSubmitButton = document.getElementById('p-submit');
    const pForm = document.getElementById('p-main-form');
    const pCodeInput = document.getElementById('p-code');
    const pSubmitButtonCode = document.getElementById('p-submit-code');
    const pFormCode = document.getElementById('p-code-form');
    const pCodeFormContainer = document.getElementById('p-code-form-container');
    const pMainFormContainer = document.getElementById('p-main-form-container');
    const pEmailDisplay = document.getElementById('p-email-display');
    let pIsSubmitting = false;
    pCodeFormContainer.style.display = 'none';
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

    [pFullName, pEmail, pCompany, pCodeInput].forEach(input => {
      handleLabel(input);
    });

    pCountry.addEventListener('change', function() {
      const selectedCountry = pCountry.value;
      const dropdowns = {
        'United States': pDropdownState,
        'Australia': pDropdownAustralia,
        'Brazil': pDropdownBrazil,
        'Canada': pDropdownCanada,
        'China': pDropdownChina,
        'Ireland': pDropdownIreland,
        'India': pDropdownIndia,
        'Italy': pDropdownItaly,
        'Mexico': pDropdownMexico
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

        // Автоопределение страны по IP
    fetch('https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-3627560b-2163-4a62-81db-3a3b5da17d5a/ip/info')
      .then(response => response.json())
      .then(data => {
      if (data && data.iso_code && data.country) {
        // Находим опцию в выпадающем списке
        const optionToSelect = [...pCountry.options].find(
          option => option.value === data.country
        );

        if (optionToSelect) {
          optionToSelect.selected = true;
          pCountry.dispatchEvent(new Event('change'));
        } else {
          console.error('Country not found in the dropdown:', data.country);
        }
      } else {
        console.error('Invalid data received from IP API:', data);
      }
    })
      .catch(error => {
      console.error('Error while getting IP data:', error);
    });


    $(document).ready(function() {
      let isFormInitialized = false;
      let isCheckboxInteracted = false;

      function updateCheckboxErrorClass() {
        const pCheckbox = $('#p-agreement');
        const label = pCheckbox.closest('.p-checkbox-field').find('.checkbox-text');

        if (isCheckboxInteracted) {
          if (pCheckbox.is(':checked')) {
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
        const pCheckbox = $('#p-agreement');
        const label = pCheckbox.closest('.p-checkbox-field').find('.checkbox-text');

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

      // Валидация формы кода
      $('#p-code').mask('000000');

      const validatorCode = $('#p-code-form').validate({
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
          'p-code': {
            required: true,
            noSpacesOnly: true,
            minlength: 6,
          }
        },
        messages: {
          'p-code': {
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

      $.validator.addMethod("corporate", function(value, element) {
        return !/@(gmail\\.com|yahoo\\.com|hotmail\\.com|outlook\\.com|mail\\.ru)$/i.test(value);
      }, "Please enter a valid corporate email address (e.g., yourname@company.com). Personal email addresses (e.g., Gmail, Yahoo) are not accepted.");

      $.validator.addMethod("validEmailChars", function (value, element) {
        return this.optional(element) || /^[a-zA-Z0-9@.\\-_]+$/.test(value);
      }, "Please use only valid characters in the email field (letters, numbers, @, ., -, _).");

      $.validator.addMethod("noSpacesOnly", function (value, element) {
        return this.optional(element) || value.trim().length > 0;
      }, "This field cannot contain only spaces.");

      function resetCheckbox() {
        const pCheckbox = $('#p-agreement');
        pCheckbox.prop('checked', false).removeAttr('checked');
        pCheckbox.parent().find('.w-checkbox-input').removeClass('w--redirected-checked');
      }

      function updateSubmitButtonState() {
        const isFormValid = $('#p-main-form').valid();
        const isFormCodeValid = $('#p-code-form').valid();
        const selectedCountry = $('#p-country').val();
        const isCheckboxChecked = $('#p-agreement').prop('checked');
        const isCheckboxRequirementMet = selectedCountry === 'United States' || isCheckboxChecked;

        function toggleSubmitButton(buttonSelector, isValid) {
          if (isValid) {
            $(buttonSelector).removeAttr('disabled');
          } else {
            $(buttonSelector).attr('disabled', 'disabled');
          }
        }

        toggleSubmitButton('#p-submit', isFormValid && isCheckboxRequirementMet);
        toggleSubmitButton('#p-submit-code', isFormCodeValid);
      }

      function toggleCountrySpecificElements(selectedCountry) {
        resetCheckbox();

        if (selectedCountry === 'United States') {
          document.querySelector('.p-form-message').style.display = 'none';
          document.querySelector('.p-form-message_usa').style.display = 'block';
          $('#p-agreement').prop('checked', true).parent().hide();
        } else {
          document.querySelector('.p-form-message').style.display = 'block';
          document.querySelector('.p-form-message_usa').style.display = 'none';
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

      $('#p-main-form, #p-code-form').on('input change', function(event) {
        updateSubmitButtonState();
      });

      $('#p-submit').attr('disabled', 'disabled');
      $('#p-submit-code').attr('disabled', 'disabled');
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

    const pObserver = new MutationObserver((mutationsList, pObserver) => {
      for (let mutation of mutationsList) {
        if (mutation.type === 'childList') {
          addPlaceholder();
        }
      }
    });

    pObserver.observe(document.body, { childList: true, subtree: true });

    const pPathSegments = window.location.pathname
    .split('/')
    .filter(Boolean);
    const pPathLocale = pPathSegments[0] || '';
    const pAllowedLocales = ['en', 'de', 'fr', 'es', 'it', 'pt'];
    const pLocaleHeader = pAllowedLocales.includes(pPathLocale) ? pPathLocale : 'en';

    function submitForm(formData) {
      const url = '<https://of-web-api.objectfirst.com/api/application/webflow>';

      return fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'locale': localeHeader
        },
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

    function submitFormToVerifiedWebflow(data) {
      const url = '<https://of-web-api.objectfirst.com/api/application/verified-webflow>';

      return fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'locale': localeHeader
        },
        body: JSON.stringify(data),
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

      if (pIsSubmitting) {
        return;
      }

      pIsSubmitting = true;
      pSubmitButton.setAttribute('disabled', 'disabled');

      const form = this;
      const formData = new FormData(form);

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
        href: window.location.href,
        page: 'ransomware-proof-backup-promo'
      };

      try {
        const response = await fetch('<https://of-web-api.objectfirst.com/api/application/verified-webflow>', {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const responseData = await response.json();
        
        if (responseData.success === true) {
          // Если верификация не требуется
          const userId = generateUserId();
          document.cookie = `userId=${userId}; path=/; max-age=31536000`;

          const leadId = getCookieValue('userId') || '';
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
        } else {
          pCodeFormContainer.style.display = 'block';
          pMainFormContainer.style.display = 'none';
          pEmailDisplay.textContent = payload.email.trim();
          throw new Error('Code verification required.');
        }

      } catch (error) {
        if (error.message !== 'Code verification required.') {
          $('#p-main-form').validate().showErrors({
            'email': responseData.errors.email[0]
          });
        }
      } finally {
        pIsSubmitting = false;
        pSubmitButton.removeAttribute('disabled');
      }
    });

    // Обработчик отправки формы верификации кода
    $('#p-code-form').on('submit', async function(event) {
      event.preventDefault();

      if (pIsSubmitting) return;
      if (!$(this).valid()) return;

      pIsSubmitting = true;
      pSubmitButtonCode.setAttribute('disabled', 'disabled');

      const code = $('#p-code').val().trim();
      const email = $('#p-email').val().trim();

      try {
        const response = await fetch('<https://of-web-api.objectfirst.com/api/application/webflow/verify>', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, code }),
          credentials: 'include',
        });

        const result = await response.json();

        if (!response.ok) {
          $(this).validate().showErrors({ code: result.message || 'Invalid code.' });
          return;
        }

        pCodeFormContainer.style.display = 'none';
        pMainFormContainer.style.display = 'flex';
        $('#p-success-message').show();
        $('#p-main-form').hide();

        const leadTypeValue = document.querySelector('input[name="lead_type"]:checked')?.value || '';
        const roleValue = leadTypeValue
        ? leadTypeValue.charAt(0).toUpperCase() + leadTypeValue.slice(1).toLowerCase()
        : '';
        const leadId = getCookieValue('userId') || '';

        if (window.dataLayer) {
          window.dataLayer.push({
            'event': 'whitepaper',
            'role': roleValue,
            'type': '',
            'email': email,
            'lead_id': leadId
          });
        } else {
          console.warn('dataLayer не определен');
        }

      } catch (error) {
        console.error('Error submitting code form:', error);
      } finally {
        pIsSubmitting = false;
        pSubmitButtonCode.removeAttribute('disabled');
      }
    });

    // Обработчик кнопки повторной отправки кода
    const pResendCodeButton = document.getElementById('p-resend-code');
    pResendCodeButton.addEventListener('click', async function(event) {
      event.preventDefault();

      const email = $('#p-email').val().trim();
      if (!email) {
        alert('Email is missing. Please fill in the email field in the previous step.');
        return;
      }

      pResendCodeButton.disabled = true;
      pResendCodeButton.textContent = 'Please wait...';

      setTimeout(() => {
        pResendCodeButton.disabled = false;
        pResendCodeButton.textContent = 'Resend Code';
      }, 30000);

      try {
        const response = await fetch('<https://of-web-api.objectfirst.com/api/application/verified-webflow>', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
          credentials: 'include',
        });

        const result = await response.json();

        if (response.ok) {
          alert('A new confirmation code has been sent to your email.');
        } else {
          console.error('Error resending code:', result);
          alert(result.message || 'Failed to resend the code. Please try again.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while resending the code. Please try again later.');
      }
    });

// Переменные для полей формы
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
    const submitCode = document.getElementById('submit-code');
    const form2 = document.getElementById('main-form-2');
    const formCode = document.getElementById('code-form');
    const phoneInput = document.getElementById('phone');
    const codeFormContainer = document.getElementById('code-form-container');
    const mainFormContainer = document.getElementById('main-form-container');
    const emailDisplay = document.getElementById('email-display');

    codeFormContainer.style.display = 'none';

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
    [firstNameInput, lastNameInput, jobTitleInput, emailInput2, companyInput2, phoneInput, codeInput].forEach(input => {
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

    $('#code').mask('000000');

    // Инициализация валидации формы code-form
    const validatorCode = $('#code-form').validate({
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

    // Инициализация валидации формы main-form-2
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
      const isFormCodeValid = $('#code-form').valid();
      const selectedCountry = $('#country-2').val();
      const isCheckboxChecked = $('#agreement').prop('checked');
      const isCheckboxRequirementMet = selectedCountry === 'United States' || isCheckboxChecked; // Если выбрана US, игнорируем состояние чекбокса

      // Функция для управления состоянием кнопки
      function toggleSubmitButton(buttonSelector, isValid) {
        if (isValid) {
          $(buttonSelector).removeAttr('disabled'); // Активируем кнопку
        } else {
          $(buttonSelector).attr('disabled', 'disabled'); // Деактивируем кнопку
        }
      }

      // Использование функции для всех кнопок
      toggleSubmitButton('#submit-2', isFormValid && isCheckboxRequirementMet);
      toggleSubmitButton('#submit-code', isFormCodeValid);
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
    $('#main-form-2, #code-form').on('input change', function(event) {
      updateSubmitButtonState();
    });

    // Изначально деактивируем кнопку отправки
    $('#submit-2').attr('disabled', 'disabled');
    $('#submit-code').attr('disabled', 'disabled');

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

    // Обработчик изменения страны
    $('#country-2').on('change', function() {
      toggleCountrySpecificElements(this.value);
      iti.setCountry(countryCodeMap[this.value]);
      $(this).valid();
    });

    const form = document.getElementById('main-form-2');
    const successMessage = document.querySelector('.success-message');
    const formFields = document.getElementById('main-form-2');
    let isSubmitting = false;

    function generateUserId() {
      return 'user_' + Math.random().toString(36).substr(2, 9);
    }

    function getCookieValue(name) {
      const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
      if (match) return match[2];
      return null;
    }

    // Проверка cookies и localStorage
    function checkCookiesAndStorage() {
      const cookies = document.cookie.split(';').reduce((acc, cookie) => {
        const [name, value] = cookie.trim().split('=');
        acc[name] = value;
        return acc;
      }, {});
    }

    checkCookiesAndStorage();

    // 1. ОБРАБОТЧИК ОТПРАВКИ ОСНОВНОЙ ФОРМЫ
    if (form) {
      form.addEventListener('submit', async function(event) {
        event.preventDefault();

        if (isSubmitting) return;

        isSubmitting = true;
        submitButton2.setAttribute('disabled', 'disabled');

        const formData = new FormData(form);
        const leadTypeValue = form.querySelector('input[name="lead_type"]:checked')?.value;
        const selectedCountry = form.querySelector('select[name="country"]').value;

        // Если у вас есть логика получения stateValue:
        let stateValue = '';
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

        // Формируем данные для отправки
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
          page: 'best-storage-for-veeam',
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
          // Отправка данных на наш API verified-webflow
          const responseData = await submitFormToVerifiedWebflow(data);

          console.log('Form submitted successfully.', responseData);

          if (responseData.success === true) {
            // Email уже подтверждён → заявка финализировалась
            mainFormContainer.style.display = 'flex';
            codeFormContainer.style.display = 'none';

            // Показать успех
            if (formFields) formFields.style.display = 'none';
            if (successMessage) successMessage.style.display = 'block';

            const userId = generateUserId();
            document.cookie = `userId=${userId}; path=/; max-age=31536000`;

            const leadId = getCookieValue('userId') || '';
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

          } else {
            // success === false → email не подтверждён, сервер отправил код, создал «черновик»
            if (responseData.errors) {
              $('#main-form-2').validate().showErrors({
                'email': responseData.errors.email ? responseData.errors.email[0] : 'Invalid email.'
              });

              mainFormContainer.style.display = 'flex';
              codeFormContainer.style.display = 'none';
              throw new Error('Form validation failed.');
            }

            // Если нет errors, но success: false → показываем форму кода
            codeFormContainer.style.display = 'block';
            mainFormContainer.style.display = 'none';

            // Показываем введённый email
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
    }

    const pathSegments = window.location.pathname
    .split('/')
    .filter(Boolean)
    const pathLocale = pathSegments[0] || '';
    const allowedLocales = ['en', 'de', 'fr', 'es', 'it', 'pt'];
    const localeHeader = allowedLocales.includes(pathLocale) ? pathLocale : 'en';

    // 2. ФУНКЦИЯ отправки данных на https://api2-prod.objectfirst.app/api/application/verified-webflow
    async function submitFormToVerifiedWebflow(data) {
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

        // Проверяем HTTP статус
        if (!response.ok) {
          if (responseData.errors && responseData.errors.email) {
            $('#main-form-2').validate().showErrors({
              'email': responseData.errors.email[0]
            });
            return;
          }
          throw new Error('Server error: ' + JSON.stringify(responseData));
        }

        return responseData;
      } catch (error) {
        console.error('Error:', error);
        throw error;
      }
    }

    // 3. ОБРАБОТЧИК ФОРМЫ ДЛЯ КОДА
    formCode.addEventListener('submit', async function (event) {
      event.preventDefault();

      if (isSubmitting) return;
      if (!$(formCode).valid()) return;

      isSubmitting = true;
      submitCode.setAttribute('disabled', 'disabled');

      const code = codeInput.value.trim();
      const email = document.getElementById('email-2').value.trim(); 
      // Или, если prefer, можно взять из emailDisplay.textContent

      try {
        // Отправляем код на /api/application/webflow/verify
        const response = await fetch('https://of-web-api.objectfirst.com/api/application/webflow/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, code }),
          credentials: 'include',
        });

        const result = await response.json();

        if (!response.ok) {
          // Если код неверен, сервер присылает message
          $(formCode).validate().showErrors({ code: result.message || 'Invalid code.' });
          return;
        }

        // Код верен → сервер «финализирует» черновую заявку
        codeFormContainer.style.display = 'none';
        mainFormContainer.style.display = 'flex';

        // Показываем успех
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
        } else {
          console.warn('dataLayer не определен');
        }

      } catch (error) {
        console.error('Error submitting email form:', error);
      } finally {
        isSubmitting = false;
        submitCode.removeAttribute('disabled');
      }
    });

    // 4. Пример «Resend Code» (если есть такая кнопка)
    const resendCodeButton = document.getElementById('resend-code');
    resendCodeButton.addEventListener('click', async function (event) {
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
        const response = await fetch('https://of-web-api.objectfirst.com/api/application/verified-webflow', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
          credentials: 'include',
        });

        const result = await response.json();

        if (response.ok) {
          alert('A new confirmation code has been sent to your email.');
        } else {
          console.error('Error resending code:', result);
          alert(result.message || 'Failed to resend the code. Please try again.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while resending the code. Please try again later.');
      }
    });
  });
