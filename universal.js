document.addEventListener('DOMContentLoaded', function() {
    // --- ПЕРЕМЕННЫЕ (Ваши + Новые для 2FA) ---
    const fullNameInput = document.getElementById('full-name');
    const firstNameInput = document.getElementById('first-name');
    const lastNameInput = document.getElementById('last-name');
    const jobTitleInput = document.getElementById('job-title');
    const emailInput = document.getElementById('email');
    const companyInput = document.getElementById('company');
    const countrySelect = document.getElementById('country');
    
    // Переменные Dropdowns (Ваши старые)
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
    
    // Переменные UI и кнопок (Ваши старые)
    const checkboxFields = document.querySelectorAll('.checkbox-field');
    const checkboxes = document.querySelectorAll('.checkbox-field input[type="checkbox"]');
    const submitButton = document.querySelector('[ms-code-submit-new="submit"]');
    const mainForm = document.getElementById('main-form'); // Это ваша основная форма
    const phoneInput = document.getElementById('phone');
    const selfAttributionInput = document.getElementById('self-attribution');
    const submitButtonWrapper = document.querySelector('.submit-button-wrapper');
    
    // --- НОВЫЕ ПЕРЕМЕННЫЕ ДЛЯ 2FA ---
    const mainFormContainer = document.getElementById('main-form-container'); // Обертка основной формы
    const codeFormContainer = document.getElementById('code-form-container'); // Обертка формы кода
    const codeForm = document.getElementById('code-form'); // Сама форма кода
    const codeInput = document.getElementById('code'); // Инпут для кода
    const submitCodeButton = document.querySelector('[ms-code-submit-new="submit-code"]'); // Кнопка отправки кода
    const emailDisplay = document.getElementById('email-display'); // Элемент для показа email
    const resendCodeButton = document.getElementById('resend-code'); // Кнопка "отправить код повторно"
    
    // Скрываем форму кода при загрузке (на всякий случай, если не скрыто CSS)
    if (codeFormContainer) codeFormContainer.style.display = 'none';
    if (mainFormContainer) mainFormContainer.style.display = 'block';

    let iti = null;

    // --- НОВЫЕ ФУНКЦИИ (Auto-detect helpers) ---

    // 1. Настройка селектов (Required + Empty Option + Title)
    function initStateSelects() {
        // Перечисляем все ID селектов штатов
        const selectors = '#state, #states-australia, #states-brazil, #states-canada, #states-china, #states-ireland, #states-india, #states-italy, #states-mexico';
        const allStateSelects = document.querySelectorAll(selectors);
        
        allStateSelects.forEach(sel => {
            // Делаем обязательным
            sel.setAttribute('required', 'true');
            // Заголовок для плагина (чтобы не писало "Nothing selected")
            sel.setAttribute('title', 'State*'); 
            sel.setAttribute('data-none-selected-text', 'State*');

            // Добавляем пустой пункт (скрытый), если нет
            if (!sel.querySelector('option[value=""]')) {
                const opt = document.createElement('option');
                opt.value = "";
                opt.text = "State*"; 
                opt.setAttribute('data-hidden', 'true'); // Скрываем из выпадающего списка
                sel.prepend(opt);
            }
            
            $(sel).selectpicker('refresh');
        });
    }
    // Вызываем сразу
    initStateSelects();

    // 2. Умный поиск опции (Exact + Fuzzy + City check)
    function findBestOption(selectElement, ...searchValues) {
        const options = [...selectElement.options];
        
        for (let val of searchValues) {
            if (!val) continue;
            const search = val.toLowerCase().trim();

            // А. Точное совпадение
            let match = options.find(o => 
                o.value.toLowerCase().trim() === search || 
                o.text.toLowerCase().trim() === search
            );
            if (match) return match;

            // Б. Частичное совпадение (исключая короткие и заглушку)
            match = options.find(o => {
                const oVal = o.value.toLowerCase().trim();
                const oTxt = o.text.toLowerCase().trim();
                if (oVal.length < 3 || oVal.includes('state*')) return false;
                
                return oVal.includes(search) || search.includes(oVal) || 
                       oTxt.includes(search) || search.includes(oTxt);
            });
            if (match) return match;
        }
        return null;
    }

    // --- ФУНКЦИИ UI (Метки, Плейсхолдеры, Selectpicker) ---
    
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

    // Применение меток ко всем полям (включая код)
    [fullNameInput, firstNameInput, lastNameInput, jobTitleInput, emailInput, companyInput, selfAttributionInput, codeInput].forEach(input => {
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

    // Подсветка текста активной радиокнопки
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
    let isTurnstileCompleted = false;

    // Turnstile callbacks
    window.onTurnstileSuccess = function(token) {
      isTurnstileCompleted = true;
      
      const hasServerErrors = $(mainForm).find('label.error:visible').length > 0;
      
      if (!hasServerErrors) {
        updateSubmitButtonState();
      } else {
        console.log("Server errors present, skipping validation");
      }
    };
    
    window.onTurnstileExpired = function() {
      console.log("Turnstile expired");
      isTurnstileCompleted = false;
      disableMainSubmit();
    };

    // Инициализация селекторов
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

    // Карта кодов стран
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

    // Анимация стрелки dropdown
    const dropdownsUI = document.querySelectorAll('.dropdown.bootstrap-select.select-search.w-select');
    const highlightColor = '#5B00B3';
    const defaultColor = '';

    dropdownsUI.forEach(dropdownContainer => {
      const targetButton = dropdownContainer.querySelector('button[type="button"].dropdown-toggle');
      const svgArrow = dropdownContainer.nextElementSibling; 
        if (targetButton && svgArrow && svgArrow.classList.contains('select-arrow-new')) {
              function handleMouseOver() { svgArrow.style.color = highlightColor; }
              function handleMouseOut() { svgArrow.style.color = defaultColor; }
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
    
    // Автоопределение страны, штата и города по IP
    function detectCountryByIP() {
      if (!countrySelect) return;
   
      fetch('https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-3627560b-2163-4a62-81db-3a3b5da17d5a/ip/info')
        .then(response => response.json())
        .then(data => {
          if (data && data.iso_code && data.country) {
            if (iti) iti.setCountry(data.iso_code);
            
            // 1. Устанавливаем страну
            const optionToSelect = [...countrySelect.options].find(
              option => option.value === data.country
            );
            
            if (optionToSelect) {
              optionToSelect.selected = true;
              countrySelect.dispatchEvent(new Event('change'));
              $('#country').selectpicker('refresh');

              // 2. Логика определения штата/города
              // Карта: Страна -> ID селекта штата
              const stateInputIds = {
                  'United States': 'state',
                  'Australia': 'states-australia',
                  'Brazil': 'states-brazil',
                  'Canada': 'states-canada',
                  'China': 'states-china',
                  'Ireland': 'states-ireland',
                  'India': 'states-india',
                  'Italy': 'states-italy',
                  'Mexico': 'states-mexico'
              };

              if (stateInputIds[data.country]) {
                  setTimeout(() => {
                      const targetId = stateInputIds[data.country];
                      const stateSelectEl = document.getElementById(targetId);
                      
                      if (stateSelectEl) {
                          // Ищем совпадение (Штат API -> Код API -> Город API)
                          const foundOption = findBestOption(
                              stateSelectEl, 
                              data.state_name, 
                              data.state, 
                              data.city
                          );

                          if (foundOption) {
                              foundOption.selected = true;
                              $(stateSelectEl).selectpicker('refresh');
                              
                              // Снимаем ошибку и запускаем валидацию
                              $(stateSelectEl).closest('.bootstrap-select').find('.dropdown-toggle').removeClass('input-error');
                              $(stateSelectEl).valid();
                              
                              // Обновляем кнопку
                              if (typeof updateSubmitButtonState === 'function') {
                                  updateSubmitButtonState();
                              }
                          }
                      }
                  }, 200);
              }
            }
          }
        })
        .catch(error => console.error('Error while getting IP data:', error));
    }
    detectCountryByIP();

    let isFormInitialized = false;

    // Сброс чекбоксов
    function resetCheckbox() {
      const $allCheckboxes = $(checkboxes);
      $allCheckboxes.prop('checked', false).removeAttr('checked');
      $allCheckboxes.parent().find('.w-checkbox-input').removeClass('w--redirected-checked');
    }

    // --- ВАЛИДАЦИЯ ---

    function updateCheckboxErrorClass() {
       $(checkboxes).each(function() {
           const currentCheckbox = $(this);
            if (currentCheckbox.attr('id') === 'checkbox-sign') {
                const label = currentCheckbox.closest('.checkbox-field').find('.checkbox-text');
                label.removeClass('error');
                return;
            }
           const label = currentCheckbox.closest('.checkbox-field').find('.checkbox-text');
           const wasInteracted = currentCheckbox.data('modified') === true;
           if (wasInteracted) {
               if (currentCheckbox.is(':checked')) label.removeClass('error');
               else label.addClass('error');
           }
       });
    }

    $(document).ready(function() {
       $(checkboxes).each(function() {
           const label = $(this).closest('.checkbox-field').find('.checkbox-text');
           label.removeClass('error');
       });
       resetCheckbox();
       updateCheckboxErrorClass();
       
       // Маска для кода (из вашего примера 2)
       if($('#code').length) {
         $('#code').mask('000000');
       }
    });

    // Валидация основной формы (Main Form)
    const validator = $('form').not('#code-form').validate({
        ignore: ":hidden:not(select)",
      onfocusout: function(element) { if ($(element).data('modified')) $(element).valid(); },
      onkeyup: function(element) { $(element).data('modified', true); $(element).valid(); },
      onclick: function(element) { if (isFormInitialized) $(element).valid(); },
      rules: {
        'full-name': { required: true, maxlength: 50, noSpacesOnly: true },
        'first-name': { required: true, maxlength: 50, noSpacesOnly: true },
        'last-name': { required: true, maxlength: 50, noSpacesOnly: true },
        email: { required: true, maxlength: 50, email: true, corporate: true, validEmailChars: true },
        'job-title': { required: true, maxlength: 50, noSpacesOnly: true },
        company: { required: true, maxlength: 50, noSpacesOnly: true },
        phone: { phoneCustom: true },
        'self-attribution': { maxlength: 50 },
        agreement: {
          required: function(element) {
            const selectedCountry = $('#country').val();
            return selectedCountry !== 'United States' && $(element).is(':visible');
          }
        },
        'agreement-2': { required: true },
        'checkbox-sign': { required: false }
      },
      messages: {
        'full-name': { required: "This field is required", maxlength: "Full name must be at most 50 characters" },
        'first-name': { required: "This field is required", maxlength: "Firstname must be at most 50 characters" },
        'last-name': { required: "This field is required", maxlength: "Lastname must be at most 50 characters" },
        email: { required: "This field is required", maxlength: "Email must be at most 50 characters", email: "Invalid email address", corporate: "Please enter a valid corporate email address (e.g., yourname@company.com). Personal email addresses (e.g., Gmail, Yahoo) are not accepted." },
        'job-title': { required: "This field is required", maxlength: "Job title must be at most 50 characters" },
        company: { required: "This field is required", maxlength: "Company must be at most 50 characters" },
        phone: { phoneCustom: "Phone number is invalid. Please add your country code, area code and phone number. Your phone number can contain numbers, spaces and these special characters: ( ) - # +" },
        agreement: { required: "Checking this box is necessary to continue" },
        'self-attribution': { maxlength: "This field should contain no more than 50 characters" }
      },
      errorPlacement: function (error, element) {
        const container = element.closest(".input-wrapper").length ? element.closest(".input-wrapper") : element.closest(".field-row");
        
        if (element.attr("name") === "agreement" && $(element).data('modified')) {
          error.appendTo(container);
        } 
        else if (element.is("select")) {
           error.appendTo(container);
        }
        else if ($(element).data('modified')) {
          error.appendTo(container);
        }
      },
      highlight: function(element) {
         const $el = $(element);
         if ($el.is('select')) {
             $el.closest('.bootstrap-select').find('.dropdown-toggle').addClass('input-error').css('color', '#E03400');
         } 
         else if ($el.data('modified')) {
             $el.css('border', '1px solid #E03400');
             $el.addClass('error-placeholder');
         }
      },
      unhighlight: function(element) {
         const $el = $(element);
         // Если это селект
         if ($el.is('select')) {
             $el.closest('.bootstrap-select').find('.dropdown-toggle').removeClass('input-error').css('color', '');
         } 
         else {
             $el.css('border', '');
             $el.removeClass('error-placeholder');
         }
      },
      ignoreTitle: true,
      onfocusin: function(element) { isFormInitialized = true; $(element).data("interacted", true); }
    });

    // Валидация формы КОДА (новая)
    const validatorCode = $('#code-form').validate({
        onfocusout: function(element) { if ($(element).data('modified')) $(element).valid(); },
        onkeyup: function(element) { $(element).data('modified', true); $(element).valid(); },
        onclick: function(element) { if (isFormInitialized) $(element).valid(); },
        rules: {
            code: { required: true, noSpacesOnly: true, minlength: 6 }
        },
        messages: {
            code: { required: "This field is required" }
        },
        errorPlacement: function (error, element) {
            if ($(element).data('modified')) {
                const container = element.closest(".input-wrapper").length ? element.closest(".input-wrapper") : element.closest(".field-row");
                error.appendTo(container);
            }
        },
        highlight: function(element) { if ($(element).data('modified')) $(element).css('border', '1px solid #E03400'); $el.addClass('error-placeholder'); },
        unhighlight: function(element) { $(element).css('border', ''); $el.removeClass('error-placeholder'); },
        ignoreTitle: true,
        onfocusin: function(element) { isFormInitialized = true; $(element).data("interacted", true); }
    });

    // Custom Validators
    $.validator.addMethod("phoneCustom", function(value, element) {
      if (!phoneInput || !iti) return true;
      return iti.isValidNumber();
    }, "Phone number is invalid.");

    $.validator.addMethod("corporate", function(value, element) {
      return !/@(gmail\.com|yahoo\.com|hotmail\.com|outlook\.com|mail\.ru)$/i.test(value);
    }, "Please enter a valid corporate email address (e.g., yourname@company.com). Personal email addresses (e.g., Gmail, Yahoo) are not accepted.");

    $.validator.addMethod("validEmailChars", function (value, element) {
      return this.optional(element) || /^[a-zA-Z0-9@.\-_]+$/.test(value);
    }, "Please use only valid characters in the email field (letters, numbers, @, ., -, _).");

    $.validator.addMethod("noSpacesOnly", function (value, element) {
      return this.optional(element) || value.trim().length > 0;
    }, "This field cannot contain only spaces.");

    // Обновление состояния кнопки отправки ОСНОВНОЙ формы
    function updateSubmitButtonState() {
      const $form = $(mainForm);
      if ($form.attr('id') === 'code-form') return; 

      const isFormValid = $form.valid();
      const isSimpleEmailForm = $form.hasClass('feedback-form');
    
      if (isSimpleEmailForm) {
        const emailEl = document.getElementById('email');
        const isEmailValid = emailEl ? $(emailEl).valid() : false;
        
        if (isEmailValid && isTurnstileCompleted) {
          enableMainSubmit();
        } else {
          disableMainSubmit();
        }
        return;
      }
      
      const selectedCountry = $('#country').val();
      const $requiredCheckboxes = $(checkboxes).filter(':visible').not('#checkbox-sign');
      const checkedCount = $requiredCheckboxes.filter(':checked').length;
      const areAllCheckboxesChecked = $requiredCheckboxes.length === checkedCount;
      const isCheckboxRequirementMet = selectedCountry === 'United States' || areAllCheckboxesChecked;

      if (isFormValid && isCheckboxRequirementMet && isTurnstileCompleted) {
        enableMainSubmit();
      } else {
        disableMainSubmit();
      }
    }

    // Хелперы для кнопки
    function enableMainSubmit() {
        $(submitButton).removeAttr('disabled');
        $(submitButton).removeClass('submit-inactive');
        $(submitButtonWrapper).removeClass('button-is-inactive');
    }

    function disableMainSubmit() {
        $(submitButton).attr('disabled', 'disabled');
        $(submitButton).addClass('submit-inactive');
        $(submitButtonWrapper).addClass('button-is-inactive');
    }
    
    // Функция переключения элементов для страны
    function toggleCountrySpecificElements(selectedCountry) {
      resetCheckbox();
      const formMessage = document.querySelector('.form-message');
      const formMessageUsa = document.querySelector('.form-message_usa');
    
      if (selectedCountry === 'United States') {
        if (formMessage) formMessage.style.display = 'none';
        if (formMessageUsa) formMessageUsa.style.display = 'block';
        $(checkboxes).prop('checked', true);
        $(checkboxFields).hide();
      } else {
        if (formMessage) formMessage.style.display = 'block';
        if (formMessageUsa) formMessageUsa.style.display = 'none';
        $(checkboxFields).show();
      }
      setTimeout(() => updateSubmitButtonState(), 50);
    }

    // Листенеры изменений для кнопок и чекбоксов
    $(checkboxes).on('change', function() {
      $(this).data('modified', true);
      $(this).valid();
      updateCheckboxErrorClass();
      updateSubmitButtonState();
    });

    $(mainForm).on('input change', function(event) {
      updateSubmitButtonState();
    });
    
    // Обновляем состояние кнопки для формы кода
    $('#code-form').on('input change', function() {
        if($(this).valid()) {
            $(submitCodeButton).removeAttr('disabled');
            $(submitCodeButton).removeClass('submit-inactive');
        } else {
            $(submitCodeButton).attr('disabled', 'disabled');
            $(submitCodeButton).addClass('submit-inactive');
        }
    });

    disableMainSubmit();
    if(submitCodeButton) $(submitCodeButton).attr('disabled', 'disabled');

    // Placeholders Search
    function addPlaceholder() {
      const searchInputs = document.querySelectorAll('.form-control[type="search"]');
      searchInputs.forEach(function(searchInput) {
        if (searchInput && !searchInput.getAttribute('placeholder')) {
          searchInput.setAttribute('placeholder', 'Search');
        }
      });
    }
    addPlaceholder();
    const observer = new MutationObserver((mutationsList) => {
      for (let mutation of mutationsList) { if (mutation.type === 'childList') addPlaceholder(); }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // Обработчик изменения страны (Исправленный)
    if (countrySelect) {
      $('#country').on('change', function() {
        const selectedCountry = this.value;

        // A. Обновляем телефонный код
        if (iti && countryCodeMap[selectedCountry]) {
          iti.setCountry(countryCodeMap[selectedCountry]);
        }

        // B. Скрываем и ОТКЛЮЧАЕМ все списки штатов (чтобы валидатор их игнорировал)
        // Список контейнеров (классы) и селектов внутри них
        const allStateContainers = [
            { container: '.dropdown-state', select: '#state' },
            { container: '.states-australia', select: '#states-australia' },
            { container: '.states-brazil', select: '#states-brazil' },
            { container: '.states-canada', select: '#states-canada' },
            { container: '.states-china', select: '#states-china' },
            { container: '.states-ireland', select: '#states-ireland' },
            { container: '.states-india', select: '#states-india' },
            { container: '.states-italy', select: '#states-italy' },
            { container: '.states-mexico', select: '#states-mexico' }
        ];

        allStateContainers.forEach(item => {
            const container = document.querySelector(item.container);
            const select = document.querySelector(item.select);
            
            if (container) container.style.display = 'none'; // Скрываем
            if (select) {
                select.disabled = true; // Отключаем (валидатор пропустит)
                $(select).selectpicker('refresh');
                $(select).closest('.bootstrap-select').find('.dropdown-toggle').removeClass('input-error');
            }
        });

        // C. Включаем нужный список
        const stateMap = {
            'United States': { container: '.dropdown-state', select: '#state' },
            'Australia': { container: '.states-australia', select: '#states-australia' },
            'Brazil': { container: '.states-brazil', select: '#states-brazil' },
            'Canada': { container: '.states-canada', select: '#states-canada' },
            'China': { container: '.states-china', select: '#states-china' },
            'Ireland': { container: '.states-ireland', select: '#states-ireland' },
            'India': { container: '.states-india', select: '#states-india' },
            'Italy': { container: '.states-italy', select: '#states-italy' },
            'Mexico': { container: '.states-mexico', select: '#states-mexico' }
        };

        if (stateMap[selectedCountry]) {
            const target = stateMap[selectedCountry];
            const container = document.querySelector(target.container);
            const select = document.querySelector(target.select);

            if (container) container.style.display = 'block';
            if (select) {
                select.disabled = false; // Включаем обратно
                
                // Сбрас значения на "пусто", чтобы отобразился "State*"
                $(select).val(""); 
                $(select).selectpicker('refresh');
                
                // Подсвечиваем как ошибку (т.к. стало пустым и обязательным)
                $(select).closest('.bootstrap-select').find('.dropdown-toggle').addClass('input-error');
            }
        }

        // D. Логика чекбоксов и сообщений (выносим toggleCountrySpecificElements прямо сюда или вызываем её)
        toggleCountrySpecificElements(selectedCountry);

        // E. Обновляем валидацию страны и кнопку
        $(this).valid();
        setTimeout(() => updateSubmitButtonState(), 50);
      });
    }

    // Слушатель для обновления кнопки при выборе ШТАТА
    const stateSelectors = '#state, #states-australia, #states-brazil, #states-canada, #states-china, #states-ireland, #states-india, #states-italy, #states-mexico';
    $(stateSelectors).on('changed.bs.select', function () {
        // Убираем класс ошибки
        $(this).closest('.bootstrap-select').find('.dropdown-toggle').removeClass('input-error');
        $(this).valid();
        updateSubmitButtonState();
    });

    // --- ЛОГИКА ОТПРАВКИ И 2FA ---
    
    const successMessage = document.querySelector('.w-form-done');
    const formFields = document.getElementById('main-form'); // Для скрытия при успехе
    const blockingBlock = document.querySelector('.blocking-block');
    const unlockText = document.querySelector('.unlock-text');
    let isSubmitting = false;

    // Utils
    async function sha256(message) {
      const msgBuffer = new TextEncoder().encode(message);
      const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
      return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
    }
    function generateUserId() { return 'user_' + Math.random().toString(36).substr(2, 9); }
    function getCookieValue(name) {
      const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
      return match ? match[2] : null;
    }
    function splitFullName(fullName) {
      if (!fullName) return { firstName: '', lastName: '' };
      const parts = fullName.trim().split(' ');
      if (parts.length === 1) return { firstName: parts[0], lastName: parts[0] };
      if (parts.length > 2) return { firstName: parts[0], lastName: parts[1] };
      return { firstName: parts[0], lastName: parts.slice(1).join(' ') };
    }
    function replaceConfusableChars(str) {
      if (typeof str !== 'string') return str;
      return str.replace(/e/g, '\u0435').replace(/a/g, '\u0430');
    }

    // Проверка видео (разблокировано или нет)
    function checkCookiesAndStorage() {
      const hasVideoContent = blockingBlock || unlockText;
      if (hasVideoContent && sessionStorage.getItem('videoUnlocked') === 'true') {
        if (blockingBlock) blockingBlock.style.display = 'none';
        if (unlockText) unlockText.style.display = 'flex';
        if (successMessage) successMessage.style.display = 'block';
        if (mainForm) mainForm.style.display = 'none';
        if (mainFormContainer) mainFormContainer.style.display = 'none'; // Скрываем контейнер
        return;
      }
      if (successMessage) successMessage.style.display = 'none';
      if (mainForm) mainForm.style.display = 'flex';
      if (mainFormContainer) mainFormContainer.style.display = 'block';
    }
    checkCookiesAndStorage();

    // Honeypot Obfuscation (Ваш код)
    try {
      const confirmEmailInput = document.querySelector('input[name="confirm-email"]');
      if (confirmEmailInput) {
        confirmEmailInput.name = replaceConfusableChars(confirmEmailInput.name);
        // ... (Label logic simplified for brevity)
      }
    } catch (e) { console.error(e); }

    // Locale Handling
    const pathSegments = window.location.pathname.split('/').filter(Boolean);
    const pathLocale = pathSegments[0] || '';
    const allowedLocales = ['en', 'de', 'fr', 'es', 'it', 'pt'];
    const localeHeader = allowedLocales.includes(pathLocale) ? pathLocale : 'en';
    let pagePath = window.location.pathname.substring(1);
    if (allowedLocales.includes(pathLocale)) pagePath = pathSegments.slice(1).join('/');

    // === ОБРАБОТЧИК ОТПРАВКИ ОСНОВНОЙ ФОРМЫ ===
    if (mainForm) {
      mainForm.addEventListener('input', () => {
        if (formInteractionStartTime === 0) formInteractionStartTime = Date.now();
      }, { once: true });

      const decoyLink = document.getElementById('optional-link');
      if (decoyLink) decoyLink.addEventListener('click', (e) => { e.preventDefault(); decoyLinkClicked = true; });

      mainForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const is2FA = mainForm.getAttribute('data-form-type') === '2fa';
        const apiUrl = is2FA 
            ? 'https://of-web-api.objectfirst.com/api/application/verified-webflow'
            : 'https://of-web-api.objectfirst.com/api/application/webflow';
        
        // Сбор комментариев (Ваш код)
        const commentsInput = document.getElementById('comments');
        const demoMessageValue = commentsInput ? commentsInput.value.trim() : '';
        let commentParts = [];
        if (mainForm.querySelector('input[name="dietary_restrictions"]')) {
            const dietaryValue = mainForm.querySelector('input[name="dietary_restrictions"]:checked')?.value;
            commentParts.push(`Dietary restrictions: ${dietaryValue || 'None'}`);
        }
        const fleetCheckbox = document.getElementById('checkbox-sign');
        if (fleetCheckbox && mainForm.contains(fleetCheckbox)) {
             commentParts.push(`Fleet Manager beta registered: ${fleetCheckbox.checked}`);
        }
        let formattedComments = commentParts.length > 0 ? commentParts.join('\n') + `\nDemo message: ${demoMessageValue}` : demoMessageValue;

        if (!$(this).valid()) return;
        if (isSubmitting) return;
        isSubmitting = true;
        submitButton.setAttribute('disabled', 'disabled');

        const formData = new FormData(mainForm);
        let firstNameValue = formData.get('first-name') || '';
        let lastNameValue  = formData.get('last-name')  || '';
        if (!firstNameValue && !lastNameValue) {
          const fullName = formData.get('full-name') || '';
          const { firstName, lastName } = splitFullName(fullName);
          firstNameValue = firstName;
          lastNameValue  = lastName;
        }

        // Honeypot Check
        const JUNK_REASONS = { HONEYPOT_FILLED: 1, DECOY_CLICKED: 2, FILLED_TOO_FAST: 3 };
        const confirmEmailValue = formData.get(replaceConfusableChars('confirm-email')) || '';
        const cityValue = formData.get('city') || '';
        let junk_lead = false, junk_reason = null, junk_context = null;
        const formFillingTime = formInteractionStartTime > 0 ? (Date.now() - formInteractionStartTime) / 1000 : 999;

        if (confirmEmailValue.length > 0 || cityValue.length > 0) {
          junk_context = { email: confirmEmailValue || null, city: cityValue || null };
          junk_lead = true;
          junk_reason = JUNK_REASONS.HONEYPOT_FILLED;
        } else if (decoyLinkClicked) {
          junk_lead = true;
          junk_reason = JUNK_REASONS.DECOY_CLICKED;
        } else if (formFillingTime < 0.5) {
          junk_lead = true;
          junk_reason = JUNK_REASONS.FILLED_TOO_FAST;
        }

        const leadTypeValue = mainForm.querySelector('input[name="lead_type"]:checked')?.value;
        
        // Logic for State
        let selectedCountry = null;
        let stateValue = '';
        if (countrySelect) {
          selectedCountry = mainForm.querySelector('select[name="country"]').value;
          // Mapping for state selectors...
          if (selectedCountry === 'United States') stateValue = mainForm.querySelector('#state').value;
          else if (selectedCountry === 'Australia') stateValue = mainForm.querySelector('#states-australia').value;
          else if (selectedCountry === 'Brazil') stateValue = mainForm.querySelector('#states-brazil').value;
          else if (selectedCountry === 'Canada') stateValue = mainForm.querySelector('#states-canada').value;
          else if (selectedCountry === 'China') stateValue = mainForm.querySelector('#states-china').value;
          else if (selectedCountry === 'Ireland') stateValue = mainForm.querySelector('#states-ireland').value;
          else if (selectedCountry === 'India') stateValue = mainForm.querySelector('#states-india').value;
          else if (selectedCountry === 'Italy') stateValue = mainForm.querySelector('#states-italy').value;
          else if (selectedCountry === 'Mexico') stateValue = mainForm.querySelector('#states-mexico').value;
        }

        const urlParams = new URLSearchParams(window.location.search);
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
          comments: formattedComments,
          junk_lead: junk_lead,
          of_form_duration: formFillingTime,
          junk_reason: junk_reason,
          junk_context: junk_context,
          ehash: ehashValue,
          cookie: {
            _ga: getCookieValue('_ga'),
            c_of__ga: getCookieValue('c_of__ga'),
            c_of_utm_campaign: urlParams.get('utm_campaign'),
            c_of_utm_content: urlParams.get('utm_content'),
            c_of_utm_medium: urlParams.get('utm_medium'),
            c_of_utm_source: urlParams.get('utm_source'),
            c_of_utm_term: urlParams.get('utm_term')
          }
        };

        if (countrySelect && selectedCountry !== 'United States' && !stateValue) {
          delete data.state;
        }

        try {
          let userId = getCookieValue('user_id') || generateUserId();
          
          // 2. ОТПРАВЛЯЕМ НА НУЖНЫЙ URL
          const responseData = await submitForm(data, userId, apiUrl);

          console.log('Form submitted successfully.', responseData);
          document.cookie = `user_id=${userId}; path=/; max-age=31536000`;

          // 3. РАЗВЕТВЛЕНИЕ ЛОГИКИ (2FA vs ОБЫЧНАЯ)
          
          if (is2FA) {
              // --- Логика для формы с 2FA ---
              
              if (responseData.success === true) {
                 // Email уже подтвержден ранее -> Успех
                 handleSuccess(data, userId, ehashValue);
              } else {
                 // Email не подтвержден, сервер прислал success: false (но статус 200) -> Нужен код
                 
                 // Если вдруг есть ошибки в ответе verified-endpoint
                 if (responseData.errors) {
                    $('form').validate().showErrors({ 'email': responseData.errors.email ? responseData.errors.email[0] : 'Invalid email.' });
                    throw new Error('Validation error from 2FA server.');
                 }
                 
                 // Показываем форму кода
                 if(mainFormContainer) mainFormContainer.style.display = 'none'; 
                 if(codeFormContainer) codeFormContainer.style.display = 'block'; 
                 if(emailDisplay) emailDisplay.textContent = data.email.trim(); 
              }

          } else {
              handleSuccess(data, userId, ehashValue);
          }

        } catch (error) {
          console.error('Error:', error.message);
            try {
                const jsonStartIndex = error.message.indexOf('{');
                
                if (jsonStartIndex !== -1) {
                  const jsonString = error.message.substring(jsonStartIndex);
                  const errorData = JSON.parse(jsonString);
                  
                  if (errorData.errors && errorData.errors.email) {
                    const errorText = errorData.errors.email[0];
                    
                    const validatorInstance = $(mainForm).validate();
                    validatorInstance.showErrors({
                      'email': errorText
                    });
                    
                    $('#email').data('modified', true);
                    
                    console.log('Email error displayed:', errorText);
                  }
                }
              } catch (e) {
                console.error('Parsing failed:', e);
              }
          if (successMessage) successMessage.style.display = 'none';
          if (mainForm) mainForm.style.display = 'flex';
          if (mainFormContainer) mainFormContainer.style.display = 'flex';
          if (codeFormContainer) codeFormContainer.style.display = 'none';
            if (window.turnstile) {
                const turnstileWidget = mainForm.querySelector('.cf-turnstile');
                if (turnstileWidget) {
                  turnstile.reset(turnstileWidget);
                  isTurnstileCompleted = false;
                    disableMainSubmit();
                }
              }
        } finally {
          isSubmitting = false;
        }
      });
    }

    // Универсальная функция отправки (ПЕРЕИМЕНОВАНА и ИСПРАВЛЕНА)
    async function submitForm(data, userId, url) {
      const headers = { 'Content-Type': 'application/json', 'locale': localeHeader };
      if (userId) headers['user_id'] = userId;

      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data),
        credentials: 'include',
      });
      
      const responseData = await response.json();
      
      if (!response.ok) {
        // Для обычной формы ошибки могут приходить просто как объект, нужно смотреть структуру
        throw new Error('Server error: ' + JSON.stringify(responseData));
      }
      
      return responseData;
    }

    // === ОБРАБОТЧИК ФОРМЫ КОДА ===
    if (codeForm) {
        codeForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            if(isSubmitting) return;
            if(!$(codeForm).valid()) return;

            isSubmitting = true;
            if(submitCodeButton) submitCodeButton.setAttribute('disabled', 'disabled');

            const codeVal = codeInput.value.trim();
            const emailVal = emailInput.value.trim(); // Берем из поля основной формы, т.к. пользователь его заполнил там

            try {
                const userId = getCookieValue('user_id');
                const headers = { 'Content-Type': 'application/json' };
                if (userId) headers['user_id'] = userId;

                const response = await fetch('https://of-web-api.objectfirst.com/api/application/webflow/verify', {
                  method: 'POST',
                  headers: headers,
                  body: JSON.stringify({ email: emailVal, code: codeVal }),
                  credentials: 'include',
                });
                const result = await response.json();

                if (!response.ok) {
                    if (result.message) {
                        $(codeForm).validate().showErrors({ code: result.message });
                    }
                    throw new Error('Code submission failed');
                }

                // Код верный!
                if(codeFormContainer) codeFormContainer.style.display = 'none';
                
                // Генерируем данные для аналитики и вызываем успех
                const ehashValue = await sha256(emailVal);
                // Восстанавливаем объект data (частично) для аналитики
                const dummyData = {
                    email: emailVal,
                    phone: iti ? iti.getNumber() : '',
                    lead_type: mainForm.querySelector('input[name="lead_type"]:checked')?.value
                };
                
                handleSuccess(dummyData, userId, ehashValue, 'lead2fa');

            } catch (error) {
                console.error('Error verifying code:', error);
            } finally {
                isSubmitting = false;
                if(submitCodeButton) submitCodeButton.removeAttribute('disabled');
            }
        });
    }

    // === КНОПКА ПОВТОРНОЙ ОТПРАВКИ КОДА ===
    if (resendCodeButton) {
        resendCodeButton.addEventListener('click', async function(event) {
            event.preventDefault();
            const emailVal = emailInput.value.trim();
            if(!emailVal) return;

            resendCodeButton.disabled = true;
            const originalText = resendCodeButton.textContent;
            resendCodeButton.textContent = 'Please wait...';

            setTimeout(() => {
                resendCodeButton.disabled = false;
                resendCodeButton.textContent = originalText;
            }, 30000);

            try {
                const response = await fetch('https://of-web-api.objectfirst.com/api/application/verified-webflow', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'locale': localeHeader },
                    body: JSON.stringify({ email: emailVal }),
                    credentials: 'include',
                });
                if(response.ok) {
                    alert('A new confirmation code has been sent.');
                } else {
                    alert('Failed to resend code.');
                }
            } catch (e) { console.error(e); }
        });
    }

    // --- ОБЩИЕ ФУНКЦИИ ---

    // Функция Успешного Завершения (UI + Analytics)
    function handleSuccess(data, userId, ehashValue, specificEventName) {
        if (mainForm) mainForm.style.display = 'none';
        if (mainFormContainer) mainFormContainer.style.display = 'flex';
        if (successMessage) successMessage.style.display = 'block';
        if (blockingBlock) blockingBlock.style.display = 'none';
        if (unlockText) unlockText.style.display = 'flex';

        sessionStorage.setItem('formSubmitted', 'true');
        sessionStorage.setItem('videoUnlocked', 'true');

        const roleValue = data.lead_type ? (data.lead_type.charAt(0).toUpperCase() + data.lead_type.slice(1).toLowerCase()) : 'Customer';
        const eventType = specificEventName || $('#main-form').attr('data-event-type') || 'demo';

        if (window.dataLayer) {
            window.dataLayer.push({
              'event': eventType,
              'role': roleValue,
              'type': '',
              'email': data.email,
              'phone': data.phone,
              'lead_id': userId
            });
            window.dataLayer.push({
              'event': 'lead_form_submitted',
              'role': roleValue,
              'email': data.email,
              'ehash': ehashValue
            });
        }
    }
});
