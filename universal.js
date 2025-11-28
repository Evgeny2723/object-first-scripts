  document.addEventListener('DOMContentLoaded', function() {
    // Переменные для полей формы
    const fullNameInput = document.getElementById('full-name');
    const firstNameInput = document.getElementById('first-name');
    const lastNameInput = document.getElementById('last-name');
    const jobTitleInput = document.getElementById('job-title');
    const emailInput = document.getElementById('email');
    const companyInput = document.getElementById('company');
    const countrySelect = document.getElementById('country');
    const dropdownAustralia = document.querySelector('.states-australia');
    const dropdownBrazil = document.querySelector('.states-brazil');
    const dropdownCanada = document.querySelector('.states-canada');
    const dropdownChina = document.querySelector('.states-china');
    const dropdownIreland = document.querySelector('.states-ireland');
    const dropdownIndia = document.querySelector('.states-india');
    const dropdownItaly = document.querySelector('.states-italy');
    const dropdownMexico = document.querySelector('.states-mexico');
    const dropdownState = document.querySelector('.dropdown-state');
    const stateSelect = document.getElementById('state');
    const checkboxField = document.querySelector('.checkbox-field');
    const checkbox = document.querySelector('.checkbox-field input[type="checkbox"]');
    const submitButton = document.querySelector('[ms-code-submit-new="submit"]');
    const mainForm = document.querySelector('form');
    const phoneInput = document.getElementById('phone');
    const selfAttributionInput = document.getElementById('self-attribution');
    const submitButtonWrapper = document.querySelector('.submit-button-wrapper');
    let iti = null;

    // Обработка изменения состояния меток полей
    function handleLabel(input) {
      if (!input) return;
      const label = input.nextElementSibling;
      if (!label) return;
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
    [fullNameInput, firstNameInput, lastNameInput, jobTitleInput, emailInput, companyInput].forEach(input => {
      handleLabel(input);
    });

    // Скрытие и отображение плейсхолдера
    const inputs = document.querySelectorAll('.form-input');
    inputs.forEach(input => {
      input.addEventListener('focus', function() {
        const placeholderText = this.getAttribute('placeholder');
        if (placeholderText) {
          this.setAttribute('data-placeholder', placeholderText);
          this.removeAttribute('placeholder');
        }
      });
      input.addEventListener('blur', function() {
        const savedPlaceholder = this.getAttribute('data-placeholder');
        if (savedPlaceholder) {
          this.setAttribute('placeholder', savedPlaceholder);
          this.removeAttribute('data-placeholder');
        }
      });
    });

    // Подсветка текста актвной радиокнопки
    const radioWraps = document.querySelectorAll('.radiobutton-wrap'); 

    radioWraps.forEach(container => {
        const targetElement = container.querySelector('.w-form-formradioinput'); 
        const textElement = container.querySelector('.radiobutton-text'); 
        if (targetElement && textElement) {
            if (targetElement.classList.contains('w--redirected-checked')) {
                textElement.style.color = '#161515';
            }
            const observer = new MutationObserver((mutationsList) => {
                for (const mutation of mutationsList) {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                        if (targetElement.classList.contains('w--redirected-checked')) {
                            textElement.style.color = '#161515';
                        } else {
                            textElement.style.color = ''; 
                        }
                    }
                }
            });
            observer.observe(targetElement, { attributes: true });
        }
    });

    // Honeypot переменные
    let formInteractionStartTime = 0;
    let decoyLinkClicked = false;

    // Переключение отображения dropdown-меню в зависимости от выбранной страны
    if (countrySelect) {
      countrySelect.addEventListener('change', function() {
        const selectedCountry = countrySelect.value;
        const dropdowns = {
          'United States': dropdownState,
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
    }

    // Инициализация селекторов для выбора страны и штатов
    if (countrySelect) {
      $('#country').selectpicker();
      $('#state, #states-australia, #states-brazil, #states-canada, #states-china, #states-ireland, #states-india, #states-italy, #states-mexico').selectpicker();
  
      $('#country').on('shown.bs.select', function() {
        const selectpicker = $(this).data('selectpicker');
        selectpicker.$menuInner[0].scrollTop = 0;
      });
  
      $('#state, #states-australia, #states-brazil, #states-canada, #states-china, #states-ireland, #states-india, #states-italy, #states-mexico').on('shown.bs.select', function() {
        const selectpicker = $(this).data('selectpicker');
        selectpicker.$menuInner[0].scrollTop = 0;
      });
    }

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

    // Анимация подсветки стрелки в выпадающих списках
    const dropdowns = document.querySelectorAll('.dropdown.bootstrap-select.select-search.w-select');
    const highlightColor = '#5B00B3';
    const defaultColor = '';

    dropdowns.forEach(dropdownContainer => {
      const targetButton = dropdownContainer.querySelector('button[type="button"].dropdown-toggle');
      const svgArrow = dropdownContainer.nextElementSibling; 
        if (targetButton && svgArrow && svgArrow.classList.contains('select-arrow-new')) {
              function handleMouseOver() {
                  svgArrow.style.color = highlightColor;
              }
              function handleMouseOut() {
                  svgArrow.style.color = defaultColor; 
              }
              targetButton.addEventListener('mouseover', handleMouseOver);
              targetButton.addEventListener('mouseout', handleMouseOut);
          }
      });

    // Инициализация intlTelInput
    if (phoneInput && countrySelect) {
      iti = window.intlTelInput(phoneInput, {
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
        autoPlaceholder: "aggressive",
        separateDialCode: true,
        initialCountry: "auto"
      });
    }
    
    // Общая функция автоопределения страны
    function detectCountryByIP() {
      if (!countrySelect) return;
    
      fetch('https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-3627560b-2163-4a62-81db-3a3b5da17d5a/ip/info')
        .then(response => response.json())
        .then(data => {
          if (data && data.iso_code && data.country) {
            // если есть intlTelInput — ставим страну в нём
            if (iti) {
              iti.setCountry(data.iso_code);
            }
            // всегда синхронизируем селект страны
            const optionToSelect = [...countrySelect.options].find(
              option => option.value === data.country
            );
            if (optionToSelect) {
              optionToSelect.selected = true;
              countrySelect.dispatchEvent(new Event('change'));
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
    
    // вызывать после определения countrySelect
    detectCountryByIP();

    let isFormInitialized = false;
    let isCheckboxInteracted = false;

    // Функция для обновления состояния класса error у текста чекбокса
      function updateCheckboxErrorClass() {
        const checkbox = $('#agreement');
        const label = checkbox.closest('.checkbox-field').find('.checkbox-text');

        if (isCheckboxInteracted) {
          if (checkbox.is(':checked')) {
            label.removeClass('error');
          } else {
            label.addClass('error');
          }
        }
      }

    // Обработчик изменения состояния чекбокса
    $('#agreement').on('change', function() {
      isCheckboxInteracted = true;
      updateCheckboxErrorClass();
    });

    // Изначально сбрасываем класс error и состояние чекбокса при загрузке страницы
    $(document).ready(function() {
      const checkbox = $('#agreement');
      const label = checkbox.closest('.checkbox-field').find('.checkbox-text');
      label.removeClass('error');
      resetCheckbox();
      updateCheckboxErrorClass();
    });

    // Инициализация валидации формы
    const validator = $('form').validate({
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
        'full-name': {
          required: true,
          maxlength: 50,
          noSpacesOnly: true
        },
        'first-name': {
          required: true,
          maxlength: 50,
          noSpacesOnly: true
        },
        'last-name': {
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
        'job-title': {
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
            const selectedCountry = $('#country').val();
            return selectedCountry !== 'United States' && $(element).is(':visible');
          }
        }
      },
      messages: {
        'full-name': {
          required: "This field is required",
          maxlength: "Full name must be at most 50 characters"
        },
        'first-name': {
          required: "This field is required",
          maxlength: "Firstname must be at most 50 characters"
        },
        'last-name': {
          required: "This field is required",
          maxlength: "Lastname must be at most 50 characters"
        },
        email: {
          required: "This field is required",
          maxlength: "Email must be at most 50 characters",
          email: "Invalid email address",
          corporate: "Please enter a valid corporate email address (e.g., yourname@company.com). Personal email addresses (e.g., Gmail, Yahoo) are not accepted."
        },
        'job-title': {
          required: "This field is required",
          maxlength: "Job title must be at most 50 characters"
        },
        company: {
          required: "This field is required",
          maxlength: "Company must be at most 50 characters"
        },
        phone: {
          phoneCustom: "Phone number is invalid. Please add your country code, area code and phone number. Your phone number can contain numbers, spaces and these special characters: ( ) - # +"
        },
        agreement: {
          required: "Checking this box is necessary to continue"
        },
        'self-attribution': {
          maxlength: "This field should contain no more than 50 characters"
        }
      },
      errorPlacement: function (error, element) {
        // Для чекбокса – как было, но с выбором контейнера
        if (element.attr("name") === "agreement" && $(element).data('modified')) {
          const container = element.closest(".input-wrapper").length
            ? element.closest(".input-wrapper")
            : element.closest(".field-row");
          error.appendTo(container);
        } else if (element.attr("name") !== "agreement" && $(element).data('modified')) {
          // Для всех остальных полей
          const container = element.closest(".input-wrapper").length
            ? element.closest(".input-wrapper")
            : element.closest(".field-row");
          error.appendTo(container);
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

    // Кастомный метод для проверки телефона
    $.validator.addMethod("phoneCustom", function(value, element) {
      if (!phoneInput || !iti) return true;
      return iti.isValidNumber();
    }, "Phone number is invalid. Please add your country code, area code and phone number. Your phone number can contain numbers, spaces and these special characters: ( ) - # +");

    // Кастомный метод для проверки корпоративного email
    $.validator.addMethod("corporate", function(value, element) {
      return !/@(gmail\.com|yahoo\.com|hotmail\.com|outlook\.com|mail\.ru)$/i.test(value);
    }, "Please enter a valid corporate email address (e.g., yourname@company.com). Personal email addresses (e.g., Gmail, Yahoo) are not accepted.");

    // Кастомный метод для проверки допустимых символов в email
    $.validator.addMethod("validEmailChars", function (value, element) {
      return this.optional(element) || /^[a-zA-Z0-9@.\-_]+$/.test(value);
    }, "Please use only valid characters in the email field (letters, numbers, @, ., -, _).");

    // Кастомный метод для проверки на только пробелы
    $.validator.addMethod("noSpacesOnly", function (value, element) {
      return this.optional(element) || value.trim().length > 0;
    }, "This field cannot contain only spaces.");

    // Функция сброса состояния чекбокса
    function resetCheckbox() {
      const checkbox = $('#agreement');
      checkbox.prop('checked', false).removeAttr('checked');
      checkbox.parent().find('.w-checkbox-input').removeClass('w--redirected-checked');
    }

    // Функция обновления состояния кнопки отправки
    function updateSubmitButtonState() {
      const $form = $('form');
      const isFormValid = $form.valid();

      // Проверяем, является ли форма "короткой" (только email)
      const isSimpleEmailForm = $form.hasClass('feedback-form');
    
      if (isSimpleEmailForm) {
        // Для такой формы критерий один – валиден ли email
        const emailEl = document.getElementById('email');
        const isEmailValid = emailEl ? $(emailEl).valid() : false;
    
        if (isEmailValid) {
          $(submitButton).removeAttr('disabled');
          $(submitButton).removeClass('submit-inactive');
          $(submitButtonWrapper).removeClass('button-is-inactive');
        } else {
          $(submitButton).attr('disabled', 'disabled');
          $(submitButton).addClass('submit-inactive');
          $(submitButtonWrapper).addClass('button-is-inactive');
        }
    
        return; // дальше общую логику не выполняем
      }
      
      const selectedCountry = $('#country').val();
      const isCheckboxChecked = $('#agreement').prop('checked');
      const isCheckboxRequirementMet = selectedCountry === 'United States' || isCheckboxChecked;

      if (isFormValid && isCheckboxRequirementMet) {
        $(submitButton).removeAttr('disabled');
        $(submitButton).removeClass('submit-inactive');
        $(submitButtonWrapper).removeClass('button-is-inactive');
      } else {
        $(submitButton).attr('disabled', 'disabled');
        $(submitButton).addClass('submit-inactive');
        $(submitButtonWrapper).addClass('button-is-inactive');
      }
    }

    // Функция переключения элементов для конкретной страны
    function toggleCountrySpecificElements(selectedCountry) {
      resetCheckbox();
    
      const formMessage = document.querySelector('.form-message');
      const formMessageUsa = document.querySelector('.form-message_usa');
    
      if (selectedCountry === 'United States') {
        if (formMessage) formMessage.style.display = 'none';
        if (formMessageUsa) formMessageUsa.style.display = 'block';
        $('#agreement').prop('checked', true).parent().hide();
      } else {
        if (formMessage) formMessage.style.display = 'block';
        if (formMessageUsa) formMessageUsa.style.display = 'none';
        $('#agreement').parent().show();
      }
    
      setTimeout(() => {
        updateSubmitButtonState();
      }, 50);
    }

    // Обработчик изменения состояния чекбокса
    $('#agreement').on('change', function() {
      isCheckboxInteracted = true;
      // Добавляем флаг 'modified' при первом взаимодействии
      $(this).data('modified', true); 
      // Вызываем валидацию для чекбокса, чтобы показать/скрыть ошибку
      $(this).valid(); 
      updateSubmitButtonState();
    });

    // Обновляем состояние кнопки при изменении формы
    $('form').on('input change', function(event) {
      updateSubmitButtonState();
    });

    // Изначально деактивируем кнопку отправки
    $(submitButton).attr('disabled', 'disabled');

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
    if (countrySelect) {
      $('#country').on('change', function() {
        toggleCountrySpecificElements(this.value);
        if (iti && countryCodeMap[this.value]) {
          iti.setCountry(countryCodeMap[this.value]);
        }
        $(this).valid();
      });
    }
    
    const successMessage = document.querySelector('.w-form-done');
    const formFields = document.querySelector('form');
    const playButton = document.querySelector('.play-button');
    const blockingBlock = document.querySelector('.blocking-block');
    const unlockText = document.querySelector('.unlock-text');
    let isSubmitting = false;

    const pathSegments = window.location.pathname
    .split('/')
    .filter(Boolean)
    const pathLocale = pathSegments[0] || '';
    const allowedLocales = ['en', 'de', 'fr', 'es', 'it', 'pt'];
    const localeHeader = allowedLocales.includes(pathLocale) ? pathLocale : 'en';

    let pagePath = window.location.pathname.substring(1);
    if (allowedLocales.includes(pathLocale)) {
      pagePath = pathSegments.slice(1).join('/');
    }

    async function sha256(message) {
      const msgBuffer = new TextEncoder().encode(message);
      const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      return hashHex;
    }

    function generateUserId() {
      return 'user_' + Math.random().toString(36).substr(2, 9);
    }

    function getCookieValue(name) {
      const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
      if (match) return match[2];
      return null;
    }

    // Проверка cookies и sessionStorage
    function checkCookiesAndStorage() {
      const cookies = document.cookie.split(';').reduce((acc, cookie) => {
        const [name, value] = cookie.trim().split('=');
        acc[name] = value;
        return acc;
      }, {});

      if (sessionStorage.getItem('videoUnlocked') === 'true') {
        if (blockingBlock) blockingBlock.style.display = 'none';
        if (unlockText) unlockText.style.display = 'flex';
      }

      if (cookies.user_id && sessionStorage.getItem('formSubmitted') === 'true') {
        if (successMessage) successMessage.style.display = 'block';
        if (formFields) formFields.style.display = 'none';
      } else {
        if (successMessage) successMessage.style.display = 'none';
        if (formFields) formFields.style.display = 'flex';
      }
    }

    checkCookiesAndStorage();

    function replaceConfusableChars(str) {
      if (typeof str !== 'string') return str;
      return str.replace(/e/g, '\u0435').replace(/a/g, '\u0430');
    }

    try {
      const confirmEmailInput = document.querySelector('input[name="confirm-email"]');
      if (confirmEmailInput) {
        const parentWrapper = confirmEmailInput.closest('.input-w');
        if (parentWrapper) {
          const confirmEmailLabel = parentWrapper.querySelector('label');
          if (confirmEmailLabel) {
            confirmEmailLabel.textContent = replaceConfusableChars(confirmEmailLabel.textContent);
            console.log('Label for "confirm-email" was successfully obfuscated.');
          }
        }
        confirmEmailInput.name = replaceConfusableChars(confirmEmailInput.name);
      }

      const cityInput = document.querySelector('input[name="city"]');
      if (cityInput) {
        const parentWrapper = cityInput.closest('.input-w');
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

    // Функция для разделения полного имени на First Name и Last Name
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

    // Обработчик отправки формы
    if (mainForm) {
      mainForm.addEventListener('input', () => {
        if (formInteractionStartTime === 0) {
          formInteractionStartTime = Date.now();
          console.log('Honeypot: Form interaction started.');
        }
      }, { once: true });

      const decoyLink = document.getElementById('optional-link');
      if (decoyLink) {
        decoyLink.addEventListener('click', (e) => {
          e.preventDefault();
          decoyLinkClicked = true;
          console.warn('Honeypot triggered: Decoy link was clicked.');
        });
      }

      mainForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        if (!$(this).valid()) return;
        if (isSubmitting) return;

        isSubmitting = true;
        submitButton.setAttribute('disabled', 'disabled');

        const formData = new FormData(mainForm);

        let firstNameValue = formData.get('first-name') || '';
        let lastNameValue  = formData.get('last-name')  || '';
      
        // Если оба пустые, пробуем разобрать full-name
        if (!firstNameValue && !lastNameValue) {
          const fullName = formData.get('full-name') || '';
          const { firstName, lastName } = splitFullName(fullName);
          firstNameValue = firstName;
          lastNameValue  = lastName;
        }

        // Обновленный honeypot функционал
        const JUNK_REASONS = { HONEYPOT_FILLED: 1, DECOY_CLICKED: 2, FILLED_TOO_FAST: 3 };
        const confirmEmailValue = formData.get(replaceConfusableChars('confirm-email')) || '';
        const cityValue = formData.get('city') || '';
        let junk_lead = false, junk_reason = null, junk_context = null;
        const formFillingTime = formInteractionStartTime > 0 ? (Date.now() - formInteractionStartTime) / 1000 : 999;

        if (confirmEmailValue.length > 0 || cityValue.length > 0) {
          junk_context = {
            email: confirmEmailValue.length > 0 ? confirmEmailValue : null,
            city: cityValue.length > 0 ? cityValue : null,
          };
          junk_lead = true;
          junk_reason = JUNK_REASONS.HONEYPOT_FILLED;
          console.warn('Honeypot triggered: A hidden field was filled.');
        } else if (decoyLinkClicked) {
          junk_lead = true;
          junk_reason = JUNK_REASONS.DECOY_CLICKED;
        } else if (formFillingTime < 0.5) {
          junk_lead = true;
          junk_reason = JUNK_REASONS.FILLED_TOO_FAST;
          console.warn(`Honeypot triggered: Form submitted too fast (${formFillingTime.toFixed(2)}s).`);
        }

        const leadTypeValue = mainForm.querySelector('input[name="lead_type"]:checked')?.value;

        if (countrySelect) {
          let stateValue = '';
          const selectedCountry = mainForm.querySelector('select[name="country"]').value;
  
          if (selectedCountry === 'United States') {
            stateValue = mainForm.querySelector('#state').value;
          } else if (selectedCountry === 'Australia') {
            stateValue = mainForm.querySelector('#states-australia').value;
          } else if (selectedCountry === 'Brazil') {
            stateValue = mainForm.querySelector('#states-brazil').value;
          } else if (selectedCountry === 'Canada') {
            stateValue = mainForm.querySelector('#states-canada').value;
          } else if (selectedCountry === 'China') {
            stateValue = mainForm.querySelector('#states-china').value;
          } else if (selectedCountry === 'Ireland') {
            stateValue = mainForm.querySelector('#states-ireland').value;
          } else if (selectedCountry === 'India') {
            stateValue = mainForm.querySelector('#states-india').value;
          } else if (selectedCountry === 'Italy') {
            stateValue = mainForm.querySelector('#states-italy').value;
          } else if (selectedCountry === 'Mexico') {
            stateValue = mainForm.querySelector('#states-mexico').value;
          }
        }

        const urlParams = new URLSearchParams(window.location.search);
        const utmCampaign = urlParams.get('utm_campaign') || '';
        const utmContent = urlParams.get('utm_content') || '';
        const utmMedium = urlParams.get('utm_medium') || '';
        const utmSource = urlParams.get('utm_source') || '';
        const utmTerm = urlParams.get('utm_term') || '';

        const ehashValue = await sha256(formData.get('email'));

        const data = {
          firstname: firstNameValue,
          lastname: lastNameValue,
          email: formData.get('email'),
          job_title: formData.get('job-title'),
          company: formData.get('company'),
          phone: iti ? iti.getNumber() : (formData.get('phone') || ''),
          lead_type: leadTypeValue,
          country: formData.get('country'),
          state: stateValue || null,
          self_attribution: formData.get('self-attribution'),
          href: window.location.href,
          page: pagePath,
          ss_anonymous_id: window.segmentstream?.anonymousId?.() ?? '',
          junk_lead: junk_lead,
          of_form_duration: formFillingTime,
          junk_reason: junk_reason,
          junk_context: junk_context,
          ehash: ehashValue,
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
          let userId = getCookieValue('user_id') || generateUserId();
          const responseData = await submitForm(data, userId);

          console.log('Form submitted successfully.', responseData);

          if (formFields) formFields.style.display = 'none';
          if (successMessage) successMessage.style.display = 'block';
          if (blockingBlock) blockingBlock.style.display = 'none';
          if (unlockText) unlockText.style.display = 'flex';

          document.cookie = `user_id=${userId}; path=/; max-age=31536000`;

          sessionStorage.setItem('formSubmitted', 'true');
          sessionStorage.setItem('videoUnlocked', 'true');

          const leadId = userId;
          const roleValue = data.lead_type ? (data.lead_type.charAt(0).toUpperCase() + data.lead_type.slice(1).toLowerCase()) : 'Customer';

          if (window.dataLayer) {
            window.dataLayer.push({
              'event': 'demo',
              'role': roleValue,
              'type': '',
              'email': data.email,
              'phone': data.phone,
              'lead_id': leadId
            });
            window.dataLayer.push({
              'event': 'lead_form_submitted',
              'role': roleValue,
              'email': data.email,
              'ehash': data.ehash
            });
          } else {
            console.warn('dataLayer не определен');
          }

        } catch (error) {
          console.error('Error:', error.message);
          if (successMessage) successMessage.style.display = 'none';
          if (formFields) formFields.style.display = 'flex';
        } finally {
          isSubmitting = false;
          submitButton.removeAttribute('disabled');
        }
      });
    }

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
            $('form').validate().showErrors({
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
