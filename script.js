document.addEventListener('DOMContentLoaded', function() {
    // --- ПЕРЕМЕННЫЕ ДЛЯ ЭЛЕМЕНТОВ ФОРМЫ ---
    const fullNameInput = document.getElementById('p-full-name');
    const pEmailInput = document.getElementById('p-email');
    const pCodeInput = document.getElementById('p-code');
    const pCompanyInput = document.getElementById('p-company');
    const pCountrySelect = document.getElementById('p-country');
    const pDropdownAustralia = document.querySelector('.p-states-australia');
    const pDropdownBrazil = document.querySelector('.p-states-brazil');
    const pDropdownCanada = document.querySelector('.p-states-canada');
    const pDropdownChina = document.querySelector('.p-states-china');
    const pDropdownIreland = document.querySelector('.p-states-ireland');
    const pDropdownIndia = document.querySelector('.p-states-india');
    const pDropdownItaly = document.querySelector('.p-states-italy');
    const pDropdownMexico = document.querySelector('.p-states-mexico');
    const pDropdownState = document.querySelector('.p-dropdown-state');
    const pStateSelect = document.getElementById('p-state');
    const pCheckboxField = document.querySelector('.p-checkbox-field');
    const pCheckbox = document.querySelector('.p-checkbox-field input[type="checkbox"]');
    const pSubmitButton = document.getElementById('p-submit');
    const pSubmitButtonCode = document.getElementById('p-submit-code');
    const pForm = document.getElementById('p-main-form');
    const pFormCode = document.getElementById('p-code-form');
    const pCodeFormContainer = document.getElementById('p-code-form-container');
    const pMainFormContainer = document.getElementById('p-main-form-container');
    const pEmailDisplay = document.getElementById('p-email-display');

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

    // --- ОБРАБОТКА ИЗМЕНЕНИЯ СОСТОЯНИЯ МЕТОК ПОЛЕЙ ---
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

    // Применение меток ко всем полям (поле phone удалено из списка)
    [fullNameInput, pEmailInput, pCompanyInput, pCodeInput].forEach(input => {
      handleLabel(input);
    });

    // --- ПЕРЕКЛЮЧЕНИЕ ШТАТОВ/ПРОВИНЦИЙ В ЗАВИСИМОСТИ ОТ СТРАНЫ ---
    pCountrySelect.addEventListener('change', function() {
      const selectedCountry = pCountrySelect.value;
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
      }
    });

    // --- ИНИЦИАЛИЗАЦИЯ SELECTPICKER ДЛЯ ВЫПАДАЮЩИХ СПИСКОВ ---
    $('#p-country').selectpicker();
    $('#p-state, #p-states-australia, #p-states-brazil, #p-states-canada, #p-states-china, #p-states-ireland, #p-states-india, #p-states-italy, #p-states-mexico').selectpicker();
    
    // Сброс прокрутки при открытии
    $('#p-country, #p-state, #p-states-australia, #p-states-brazil, #p-states-canada, #p-states-china, #p-states-ireland, #p-states-india, #p-states-italy, #p-states-mexico').on('shown.bs.select', function() {
      const selectpicker = $(this).data('selectpicker');
      selectpicker.$menuInner[0].scrollTop = 0;
    });

    // --- АВТООПРЕДЕЛЕНИЕ СТРАНЫ ПО IP (ЛОГИКА СОХРАНЕНА) ---
    function detectAndSetCountry() {
        fetch('https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-3627560b-2163-4a62-81db-3a3b5da17d5a/ip/info')
          .then(response => response.json())
          .then(data => {
            if (data && data.country) {
              // Находим опцию в выпадающем списке
              const optionToSelect = [...pCountrySelect.options].find(
                option => option.value === data.country
              );

              if (optionToSelect) {
                optionToSelect.selected = true;
                // Обновляем selectpicker, чтобы отобразить изменение
                $(pCountrySelect).selectpicker('val', data.country);
                // Вызываем событие change, чтобы сработала остальная логика (показ штатов и т.д.)
                pCountrySelect.dispatchEvent(new Event('change'));
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
    }
    
    // Вызываем функцию определения страны при загрузке
    detectAndSetCountry();


    // --- ЛОГИКА ЧЕКБОКСА ---
    let popupIsFormInitialized = false;
    let popupIsCheckboxInteracted = false;

    function updateCheckboxErrorClass() {
      const checkbox = $('#p-agreement');
      const label = checkbox.closest('.p-checkbox-field').find('.checkbox-text');
      if (popupIsCheckboxInteracted) {
        if (checkbox.is(':checked')) {
          label.removeClass('error');
        } else {
          label.addClass('error');
        }
      }
    }

    $('#p-agreement').on('change', function() {
      popupIsCheckboxInteracted = true;
      updateCheckboxErrorClass();
    });

    $(document).ready(function() {
      const checkbox = $('#p-agreement');
      const label = checkbox.closest('.p-checkbox-field').find('.checkbox-text');
      label.removeClass('error');
      resetCheckbox();
      updateCheckboxErrorClass();
    });

    $('#p-code').mask('000000');

    // --- ВАЛИДАЦИЯ ФОРМЫ С КОДОМ ---
    const pValidatorCode = $('#p-code-form').validate({
      onfocusout: function(element) { if ($(element).data('modified')) { $(element).valid(); } },
      onkeyup: function(element) { $(element).data('modified', true); $(element).valid(); },
      onclick: function(element) { if (popupIsFormInitialized) { $(element).valid(); } },
      rules: {
        'p-code': { required: true, noSpacesOnly: true, minlength: 6 }
      },
      messages: {
        'p-code': { required: "This field is required" }
      },
      errorPlacement: function (error, element) { if ($(element).data('modified')) { error.appendTo(element.closest(".field-row")); } },
      highlight: function(element) { if ($(element).data('modified')) { $(element).css('border', '1px solid #c50006'); } },
      unhighlight: function(element) { $(element).css('border', ''); },
      ignoreTitle: true,
      onfocusin: function(element) { popupIsFormInitialized = true; $(element).data("interacted", true); }
    });

    // --- ВАЛИДАЦИЯ ОСНОВНОЙ ФОРМЫ (ПРАВИЛА ДЛЯ PHONE УДАЛЕНЫ) ---
    const popupValidator = $('#p-main-form').validate({
      onfocusout: function(element) { if ($(element).data('modified')) { $(element).valid(); } },
      onkeyup: function(element) { $(element).data('modified', true); $(element).valid(); },
      onclick: function(element) { if (popupIsFormInitialized) { $(element).valid(); } },
      rules: {
        'full-name': { required: true, maxlength: 100, noSpacesOnly: true },
        email: { required: true, maxlength: 50, email: true, corporate: true, validEmailChars: true },
        company: { required: true, maxlength: 50, noSpacesOnly: true },
        agreement: {
          required: function(element) {
            return $('#p-country').val() !== 'United States' && $(element).is(':visible');
          }
        }
      },
      messages: {
        'full-name': { required: "This field is required", maxlength: "Full Name must be at most 100 characters" },
        email: { required: "This field is required", maxlength: "Email must be at most 50 characters", email: "Invalid email address", corporate: "Please enter a valid corporate email address (e.g., yourname@company.com). Personal email addresses (e.g., Gmail, Yahoo) are not accepted." },
        company: { required: "This field is required", maxlength: "Company must be at most 50 characters" }
      },
      errorPlacement: function(error, element) { if ($(element).data('modified')) { error.appendTo(element.closest(".field-row")); } },
      highlight: function(element) { if ($(element).data('modified')) { $(element).css('border', '1px solid #c50006'); } },
      unhighlight: function(element) { $(element).css('border', ''); },
      ignoreTitle: true,
      onfocusin: function(element) { popupIsFormInitialized = true; $(element).data("interacted", true); }
    });

    // --- КАСТОМНЫЕ МЕТОДЫ ВАЛИДАЦИИ (МЕТОД ДЛЯ PHONE УДАЛЕН) ---
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
    
    $('#p-agreement').on('change', function() {
      updateSubmitButtonState();
    });
    
    $('#p-main-form, #p-code-form').on('input change', function(event) {
      updateSubmitButtonState();
    });
    
    $('#p-submit, #p-submit-code').attr('disabled', 'disabled');

    // --- ЛОГИКА PLACEHOLDER'ОВ ДЛЯ ПОИСКА В SELECT ---
    function addPlaceholder() {
      document.querySelectorAll('.form-control[type="search"]').forEach(function(searchInput) {
        if (searchInput && !searchInput.getAttribute('placeholder')) {
          searchInput.setAttribute('placeholder', 'Search');
        }
      });
    }
    addPlaceholder();
    const pObserver = new MutationObserver((mutationsList) => {
      for (let mutation of mutationsList) {
        if (mutation.type === 'childList') {
          addPlaceholder();
        }
      }
    });
    pObserver.observe(document.body, { childList: true, subtree: true });

    // --- ОБРАБОТЧИК СМЕНЫ СТРАНЫ ---
    $('#p-country').on('change', function() {
      toggleCountrySpecificElements(this.value);
      // iti.setCountry() удалено
      $(this).valid();
    });

    // --- ОБРАБОТЧИКИ ОТПРАВКИ ФОРМ ---
    const pSuccessMessage = document.querySelector('.p-success-message');
    const pFormFields = document.getElementById('p-main-form');
    let popupIsSubmitting = false;

    function generateUserId() {
      return 'user_' + Math.random().toString(36).substr(2, 9);
    }

    function getCookieValue(name) {
      const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
      return match ? match[2] : null;
    }

    // 1. ОБРАБОТЧИК ОТПРАВКИ ОСНОВНОЙ ФОРМЫ
    if (pForm) {
      pForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        if (popupIsSubmitting) return;

        popupIsSubmitting = true;
        pSubmitButton.setAttribute('disabled', 'disabled');

        const formData = new FormData(pForm);
        const leadTypeValue = pForm.querySelector('input[name="lead_type"]:checked')?.value;
        const selectedCountry = pForm.querySelector('select[name="country"]').value;

        let stateValue = '';
        if (selectedCountry === 'United States') stateValue = pForm.querySelector('#p-state').value;
        else if (selectedCountry === 'Australia') stateValue = pForm.querySelector('#p-states-australia').value;
        else if (selectedCountry === 'Brazil') stateValue = pForm.querySelector('#p-states-brazil').value;
        else if (selectedCountry === 'Canada') stateValue = pForm.querySelector('#p-states-canada').value;
        else if (selectedCountry === 'China') stateValue = pForm.querySelector('#p-states-china').value;
        else if (selectedCountry === 'Ireland') stateValue = pForm.querySelector('#p-states-ireland').value;
        else if (selectedCountry === 'India') stateValue = pForm.querySelector('#p-states-india').value;
        else if (selectedCountry === 'Italy') stateValue = pForm.querySelector('#p-states-italy').value;
        else if (selectedCountry === 'Mexico') stateValue = pForm.querySelector('#p-states-mexico').value;

        const urlParams = new URLSearchParams(window.location.search);

        // Формируем данные для отправки (поле phone удалено)
        const data = {
          full_name: formData.get('full-name'),
          email: formData.get('email'),
          company: formData.get('company'),
          lead_type: leadTypeValue,
          country: formData.get('country'),
          state: stateValue || null,
          href: window.location.href,
          page: window.location.pathname.substring(1),
          cookie: {
            _ga: getCookieValue('_ga'),
            c_of__ga: getCookieValue('c_of__ga'),
            c_of_utm_campaign: urlParams.get('utm_campaign') || '',
            c_of_utm_content: urlParams.get('utm_content') || '',
            c_of_utm_medium: urlParams.get('utm_medium') || '',
            c_of_utm_source: urlParams.get('utm_source') || '',
            c_of_utm_term: urlParams.get('utm_term') || ''
          }
        };

        if (selectedCountry !== 'United States' && !stateValue) {
          delete data.state;
        }

        try {
          const responseData = await submitFormToVerifiedWebflow(data);
          console.log('Form submitted successfully.', responseData);

          if (responseData.success === true) {
            pMainFormContainer.style.display = 'flex';
            pCodeFormContainer.style.display = 'none';
            if (pFormFields) pFormFields.style.display = 'none';
            if (pSuccessMessage) pSuccessMessage.style.display = 'block';

            const userId = generateUserId();
            document.cookie = `userId=${userId}; path=/; max-age=31536000`;
            const leadId = getCookieValue('userId') || '';
            const roleValue = data.lead_type.charAt(0).toUpperCase() + data.lead_type.slice(1).toLowerCase();

            if (window.dataLayer) {
              window.dataLayer.push({
                'event': 'whitepaper',
                'role': roleValue,
                'type': '',
                'email': data.email,
                'lead_id': leadId
              });
            } else {
              console.warn('dataLayer не определен');
            }
          } else {
            if (responseData.errors) {
              $('#p-main-form').validate().showErrors({
                'email': responseData.errors.email ? responseData.errors.email[0] : 'Invalid email.'
              });
              pMainFormContainer.style.display = 'flex';
              pCodeFormContainer.style.display = 'none';
              throw new Error('Form validation failed.');
            }
            pCodeFormContainer.style.display = 'block';
            pMainFormContainer.style.display = 'none';
            pEmailDisplay.textContent = data.email.trim();
            throw new Error('Code verification required.');
          }
        } catch (error) {
          console.error('Error:', error.message);
          if (pSuccessMessage) pSuccessMessage.style.display = 'none';
          if (pFormFields) pFormFields.style.display = 'flex';
        } finally {
          popupIsSubmitting = false;
          pSubmitButton.removeAttribute('disabled');
        }
      });
    }

    const popupPathSegments = window.location.pathname.split('/').filter(Boolean);
    const popupPathLocale = popupPathSegments[0] || '';
    const popupAllowedLocales = ['en', 'de', 'fr', 'es', 'it', 'pt'];
    const popupLocaleHeader = popupAllowedLocales.includes(popupPathLocale) ? popupPathLocale : 'en';
    
    // 2. ФУНКЦИЯ отправки данных
    async function submitFormToVerifiedWebflow(data) {
      try {
        const response = await fetch('https://of-web-api.objectfirst.com/api/application/verified-webflow', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'locale': popupLocaleHeader },
          body: JSON.stringify(data),
          credentials: 'include',
        });
        const responseData = await response.json();
        if (!response.ok) {
          if (responseData.errors && responseData.errors.email) {
            $('#p-main-form').validate().showErrors({
              'email': responseData.errors.email[0]
            });
            if (pFormFields) pFormFields.style.display = 'none';
            if (pSuccessMessage) pSuccessMessage.style.display = 'block';
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
    pFormCode.addEventListener('submit', async function (event) {
      event.preventDefault();
      if (popupIsSubmitting || !$(pFormCode).valid()) return;

      popupIsSubmitting = true;
      pSubmitButtonCode.setAttribute('disabled', 'disabled');

      const code = pCodeInput.value.trim();
      const email = document.getElementById('p-email').value.trim();

      try {
        const response = await fetch('https://of-web-api.objectfirst.com/api/application/webflow/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, code }),
          credentials: 'include',
        });
        const result = await response.json();
        if (!response.ok) {
          $(pFormCode).validate().showErrors({ 'p-code': result.message || 'Invalid code.' });
          return;
        }
        
        pCodeFormContainer.style.display = 'none';
        pMainFormContainer.style.display = 'flex';
        if (pSuccessMessage) pSuccessMessage.style.display = 'block';
        if (pFormFields) pFormFields.style.display = 'none';

        const leadTypeValue = document.querySelector('input[name="lead_type"]:checked')?.value || '';
        const roleValue = leadTypeValue ? leadTypeValue.charAt(0).toUpperCase() + leadTypeValue.slice(1).toLowerCase() : '';
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
        console.error('Error submitting email form:', error);
      } finally {
        popupIsSubmitting = false;
        pSubmitButtonCode.removeAttribute('disabled');
      }
    });

// 4. ПОВТОРНАЯ ОТПРАВКА КОДА
const pResendCodeButton = document.getElementById('p-resend-code');
if (pResendCodeButton) {
    pResendCodeButton.addEventListener('click', async function (event) {
        event.preventDefault();

        // Получаем данные из основной формы
        const mainForm = document.getElementById('p-main-form');
        if (!mainForm) {
            alert('Error: Main form not found.');
            return;
        }
        const formData = new FormData(mainForm);
        const email = formData.get('email');

        if (!email) {
            alert('Email is missing. Please fill in the email field in the previous step.');
            return;
        }

        // Блокируем кнопку на время отправки
        pResendCodeButton.disabled = true;
        pResendCodeButton.textContent = 'Please wait...';
        setTimeout(() => {
            pResendCodeButton.disabled = false;
            pResendCodeButton.textContent = 'Resend Code';
        }, 30000); // Тайм-аут 30 секунд

        // Собираем ВСЕ данные из формы, а не только email
        const leadTypeValue = formData.get('lead_type') || '';
        const selectedCountry = formData.get('country');
        let stateValue = '';
        if (selectedCountry === 'United States') stateValue = mainForm.querySelector('#p-state')?.value;
        else if (selectedCountry === 'Australia') stateValue = mainForm.querySelector('#p-states-australia')?.value;
        else if (selectedCountry === 'Brazil') stateValue = mainForm.querySelector('#p-states-brazil')?.value;
        else if (selectedCountry === 'Canada') stateValue = mainForm.querySelector('#p-states-canada')?.value;
        else if (selectedCountry === 'China') stateValue = mainForm.querySelector('#p-states-china')?.value;
        else if (selectedCountry === 'Ireland') stateValue = mainForm.querySelector('#p-states-ireland')?.value;
        else if (selectedCountry === 'India') stateValue = mainForm.querySelector('#p-states-india')?.value;
        else if (selectedCountry === 'Italy') stateValue = mainForm.querySelector('#p-states-italy')?.value;
        else if (selectedCountry === 'Mexico') stateValue = mainForm.querySelector('#p-states-mexico')?.value;

        const dataToSend = {
            full_name: formData.get('full-name'),
            email: email,
            company: formData.get('company'),
            lead_type: leadTypeValue,
            country: selectedCountry,
            state: stateValue || null,
            href: window.location.href,
            page: window.location.pathname.substring(1),
        };

        if (selectedCountry !== 'United States' && !stateValue) {
            delete dataToSend.state;
        }
        
        try {
            // Отправляем ПОЛНЫЕ данные, как при первой отправке
            const response = await fetch('https://of-web-api.objectfirst.com/api/application/verified-webflow', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'locale': popupLocaleHeader },
                body: JSON.stringify(dataToSend),
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
	const submitButton = document.querySelector('#submit, #submit-2');
	const submitCode = document.querySelector('#submit-code-violet, #submit-code');
	const form2 = document.getElementById('main-form-2');
	const formCode = document.getElementById('code-form');
	const phoneInput = document.getElementById('phone');
	const codeFormContainer = document.getElementById('code-form-container');
	const mainFormContainer = document.getElementById('main-form-container');
	const emailDisplay = document.getElementById('email-display');

	codeFormContainer.style.display = 'none';

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
	countrySelect2.addEventListener('change', function () {
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

	$('#country-2').on('shown.bs.select', function () {
		const selectpicker = $(this).data('selectpicker');
		selectpicker.$menuInner[0].scrollTop = 0;
	});

	$('#state-2, #states-australia, #states-brazil, #states-canada, #states-china, #states-ireland, #states-india, #states-italy, #states-mexico').on('shown.bs.select', function () {
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
	$('#agreement').on('change', function () {
		isCheckboxInteracted = true; // Отмечаем, что было взаимодействие
		updateCheckboxErrorClass(); // Обновляем класс error при изменении состояния чекбокса
	});

	// Изначально сбрасываем класс error и состояние чекбокса при загрузке страницы
	$(document).ready(function () {
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
		onfocusout: function (element) {
			if ($(element).data('modified')) {
				$(element).valid(); // Проверка поля при потере фокуса
			}
		},
		onkeyup: function (element) {
			$(element).data('modified', true);
			$(element).valid(); // Проверка поля при вводе данных
		},
		onclick: function (element) {
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
		highlight: function (element) {
			if ($(element).data('modified')) {
				$(element).css('border', '1px solid #c50006'); // Добавляем красную границу при ошибке
			}
		},
		unhighlight: function (element) {
			$(element).css('border', ''); // Убираем границу, если ошибок нет
		},
		ignoreTitle: true,
		onfocusin: function (element) {
			isFormInitialized = true; // Начало валидации при первом взаимодействии
			$(element).data("interacted", true); // Помечаем поле как взаимодействующее
		}
	});

	// Инициализация валидации формы main-form-2
	const validator = $('#main-form-2').validate({
		onfocusout: function (element) {
			if ($(element).data('modified')) {
				$(element).valid(); // Проверка поля при потере фокуса
			}
		},
		onkeyup: function (element) {
			$(element).data('modified', true);
			$(element).valid(); // Проверка поля при вводе данных
		},
		onclick: function (element) {
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
				required: function (element) {
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
		highlight: function (element) {
			if ($(element).data('modified')) {
				$(element).css('border', '1px solid #c50006'); // Добавляем красную границу при ошибке
			}
		},
		unhighlight: function (element) {
			$(element).css('border', ''); // Убираем границу, если ошибок нет
		},
		ignoreTitle: true,
		onfocusin: function (element) {
			isFormInitialized = true; // Начало валидации при первом взаимодействии
			$(element).data("interacted", true); // Помечаем поле как взаимодействующее
		}
	});

	// Кастомный метод для проверки телефона
	$.validator.addMethod("phoneCustom", function (value, element) {
		return iti.isValidNumber(); // Используем метод валидации intlTelInput
	}, "Phone number is invalid. Please add your country code, area code and phone number. Your phone number can contain numbers, spaces and these special characters: ( ) - # +");

	// Кастомный метод для проверки корпоративного email
	$.validator.addMethod("corporate", function (value, element) {
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
		toggleSubmitButton('#submit, #submit-2', isFormValid && isCheckboxRequirementMet);
		toggleSubmitButton('#submit-code-violet, #submit-code', isFormCodeValid);
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
	$('#agreement').on('change', function () {
		updateSubmitButtonState(); // Обновляем состояние кнопки
	});

	// Обновляем состояние кнопки при изменении формы
	$('#main-form-2, #code-form').on('input change', function (event) {
		updateSubmitButtonState();
	});

	// Изначально деактивируем кнопку отправки
	$('#submit, #submit-2').attr('disabled', 'disabled');
	$('#submit-code-violet, #submit-code').attr('disabled', 'disabled');

	// Функция добавления placeholder для поиска
	function addPlaceholder() {
		const searchInputs = document.querySelectorAll('.form-control[type="search"]');
		searchInputs.forEach(function (searchInput) {
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
	$('#country-2').on('change', function () {
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
		form.addEventListener('submit', async function (event) {
			event.preventDefault();

			if (isSubmitting) return;

			isSubmitting = true;
			if (submitButton) {
    				submitButton.setAttribute('disabled', 'disabled');
			}

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
				page: window.location.pathname.substring(1),
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
				if (submitButton) {
   		 			submitButton.setAttribute('disabled', 'disabled');
				}
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
					if (formFields) formFields.style.display = 'none';
					if (successMessage) successMessage.style.display = 'block';
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
		if (submitCode) {
			submitCode.setAttribute('disabled', 'disabled');
		}

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
			if (submitCode) {
				submitCode.removeAttribute('disabled');
			}
		}
	});

	// 4. ПОВТОРНАЯ ОТПРАВКА КОДА (ИСПРАВЛЕНО ДЛЯ ВТОРОЙ ФОРМЫ)
const resendCodeButton = document.getElementById('resend-code'); // Убедитесь, что ID кнопки правильный
if (resendCodeButton) {
    resendCodeButton.addEventListener('click', async function (event) {
        event.preventDefault();

        // Получаем данные из второй основной формы
        const mainForm = document.getElementById('main-form-2');
        if (!mainForm) {
            alert('Error: Main form #2 not found.');
            return;
        }
        const formData = new FormData(mainForm);
        const email = formData.get('email'); // Убедитесь, что у поля email есть name="email"

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

        // Собираем ВСЕ данные из второй формы
        const dataToSend = {
            firstname: formData.get('firstname'),
            lastname: formData.get('lastname'),
            email: email,
            job_title: formData.get('job_title'),
            company: formData.get('company'),
            phone: iti.getNumber(), // Если телефон используется во второй форме
            lead_type: formData.get('lead_type') || '',
            country: formData.get('country'),
            // ... и так далее, соберите все поля, как в основном обработчике отправки второй формы
        };
        
        try {
            // Отправляем ПОЛНЫЕ данные
            const response = await fetch('https://of-web-api.objectfirst.com/api/application/verified-webflow', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'locale': localeHeader }, // Используйте localeHeader для второй формы
                body: JSON.stringify(dataToSend),
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
}
