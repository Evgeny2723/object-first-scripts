document.addEventListener('DOMContentLoaded', function() {
    // =========================================================================
    // 1. ГЛОБАЛЬНЫЕ КОНСТАНТЫ И УТИЛИТЫ
    // =========================================================================
    
    // Карта стран
    const countryCodeMap = {
        "Australia": "AU", "Austria": "AT", "Azerbaijan": "AZ", "Albania": "AL", "Algeria": "DZ", "Angola": "AO", "Andorra": "AD", "Antigua and Barbuda": "AG", "Argentina": "AR", "Armenia": "AM", "Afghanistan": "AF", "Bahamas": "BS", "Bangladesh": "BD", "Barbados": "BB", "Bahrain": "BH", "Belarus": "BY", "Belize": "BZ", "Belgium": "BE", "Benin": "BJ", "Bulgaria": "BG", "Bolivia": "BO", "Bosnia and Herzegovina": "BA", "Botswana": "BW", "Brazil": "BR", "Brunei Darussalam": "BN", "Burkina Faso": "BF", "Burundi": "BI", "Bhutan": "BT", "Vanuatu": "VU", "Hungary": "HU", "Venezuela": "VE", "Vietnam": "VN", "Gabon": "GA", "Haiti": "HT", "Guyana": "GY", "Gambia": "GM", "Ghana": "GH", "Guatemala": "GT", "Guinea": "GN", "Guinea-Bissau": "GW", "Germany": "DE", "Honduras": "HN", "Grenada": "GD", "Greece": "GR", "Georgia": "GE", "Denmark": "DK", "Congo, Democratic Republic of the": "CD", "Djibouti": "DJ", "Dominica": "DM", "Dominican Republic": "DO", "Egypt": "EG", "Zambia": "ZM", "Zimbabwe": "ZW", "Israel": "IL", "India": "IN", "Indonesia": "ID", "Jordan": "JO", "Iraq": "IQ", "Iran": "IR", "Ireland": "IE", "Iceland": "IS", "Spain": "ES", "Italy": "IT", "Yemen": "YE", "Cabo Verde": "CV", "Kazakhstan": "KZ", "Cambodia": "KH", "Cameroon": "CM", "Canada": "CA", "Qatar": "QA", "Kenya": "KE", "Cyprus": "CY", "Kiribati": "KI", "China": "CN", "Colombia": "CO", "Comoros": "KM", "Congo": "CG", "North Korea": "KP", "Costa Rica": "CR", "Côte d'Ivoire": "CI", "Cuba": "CU", "Kuwait": "KW", "Kyrgyzstan": "KG", "Lao People's Democratic Republic": "LA", "Latvia": "LV", "Lesotho": "LS", "Liberia": "LR", "Lebanon": "LB", "Libya": "LY", "Lithuania": "LT", "Liechtenstein": "LI", "Luxembourg": "LU", "Mauritius": "MU", "Mauritania": "MR", "Madagascar": "MG", "Malawi": "MW", "Malaysia": "MY", "Mali": "ML", "Maldives": "MV", "Malta": "MT", "Morocco": "MA", "Marshall Islands": "MH", "Mexico": "MX", "Mozambique": "MZ", "Monaco": "MC", "Mongolia": "MN", "Myanmar": "MM", "Namibia": "NA", "Nauru": "NR", "Nepal": "NP", "Niger": "NE", "Nigeria": "NG", "Netherlands": "NL", "Nicaragua": "NI", "Niue": "NU", "New Zealand": "NZ", "Norway": "NO", "Tanzania, United Republic of": "TZ", "United Arab Emirates": "AE", "Oman": "OM", "Cook Islands": "CK", "Pakistan": "PK", "Panama": "PA", "Papua New Guinea": "PG", "Paraguay": "PY", "Peru": "PE", "Poland": "PL", "Portugal": "PT", "Korea, Republic of": "KR", "Moldova, Republic of": "MD", "Russian Federation": "RU", "Rwanda": "RW", "Romania": "RO", "El Salvador": "SV", "Samoa": "WS", "San Marino": "SM", "Sao Tome and Principe": "ST", "Saudi Arabia": "SA", "Holy See (Vatican City State)": "VA", "North Macedonia": "MK", "Seychelles": "SC", "Senegal": "SN", "Saint Vincent and the Grenadines": "VC", "Saint Kitts and Nevis": "KN", "Saint Lucia": "LC", "Serbia": "RS", "Singapore": "SG", "Syrian Arab Republic": "SY", "Slovakia": "SK", "Slovenia": "SI", "United Kingdom": "GB", "United States": "US", "Solomon Islands": "SB", "Somalia": "SO", "Sudan": "SD", "Suriname": "SR", "Sierra Leone": "SL", "Tajikistan": "TJ", "Thailand": "TH", "Timor-Leste": "TL", "Togo": "TG", "Tonga": "TO", "Trinidad and Tobago": "TT", "Tuvalu": "TV", "Tunisia": "TN", "Turkmenistan": "TM", "Turkey": "TR", "Uganda": "UG", "Uzbekistan": "UZ", "Ukraine": "UA", "Uruguay": "UY", "Fiji": "FJ", "Philippines": "PH", "Finland": "FI", "France": "FR", "Croatia": "HR", "Central African Republic": "CF", "Chad": "TD", "Montenegro": "ME", "Czech Republic": "CZ", "Chile": "CL", "Switzerland": "CH", "Sweden": "SE", "Sri Lanka": "LK", "Ecuador": "EC", "Equatorial Guinea": "GQ", "Eritrea": "ER", "Eswatini": "SZ", "Estonia": "EE", "Ethiopia": "ET"
    };

    // Определение локали
    const pathSegments = window.location.pathname.split('/').filter(Boolean);
    const pathLocale = pathSegments[0] || '';
    const allowedLocales = ['en', 'de', 'fr', 'es', 'it', 'pt'];
    const localeHeader = allowedLocales.includes(pathLocale) ? pathLocale : 'en';
    let pagePath = window.location.pathname.substring(1);
    if (allowedLocales.includes(pathLocale)) {
        pagePath = pathSegments.slice(1).join('/');
    }

    // =========================================================================
    // FIX #3: handleLabel — Floating Labels (перенесено из File 1)
    // =========================================================================
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
        input.addEventListener('focus', () => { label.classList.add('active'); });
        input.addEventListener('blur', () => { updateLabelState(); });
        input.addEventListener('input', () => { updateLabelState(); });
    }

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

    // =========================================================================
    // FIX #2: Параметризированные функции чекбоксов (вместо глобального селектора)
    // =========================================================================
    function resetCheckboxes($checkboxSet) {
        $checkboxSet.prop('checked', false).removeAttr('checked');
        $checkboxSet.parent().find('.w-checkbox-input').removeClass('w--redirected-checked');
    }

    function updateCheckboxErrorClass($checkboxSet) {
       $checkboxSet.each(function() {
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

    // Инициализация: сброс всех чекбоксов на странице (при первой загрузке — безопасно)
    const $allCheckboxes = $('input[type="checkbox"]');
    $(document).ready(function() {
       $allCheckboxes.each(function() {
           const label = $(this).closest('.checkbox-field').find('.checkbox-text');
           label.removeClass('error');
       });
       resetCheckboxes($allCheckboxes);
       updateCheckboxErrorClass($allCheckboxes);
    });

    // Переменные Honeypot
    let formInteractionStartTime = 0;
    let decoyLinkClicked = false;
    let isTurnstileCompleted = false;

    // =========================================================================
    // FIX #5: Turnstile Callbacks — скоупинг к конкретным формам
    // =========================================================================
    window.onTurnstileSuccess = function(token) {
        console.log("Turnstile success");
        isTurnstileCompleted = true;
        
        if (typeof updatePSubmitState === 'function') {
            updatePSubmitState();
        }
        if (typeof updateMSubmitState === 'function') {
            updateMSubmitState();
        }
    };
    
    window.onTurnstileExpired = function() {
        console.log("Turnstile expired");
        isTurnstileCompleted = false;
        
        // Form 1: скоупим к конкретной кнопке
        const pBtn = document.querySelector('[ms-code-submit-new="p-submit"]');
        if (pBtn) {
            pBtn.setAttribute('disabled', 'disabled');
            pBtn.classList.add('submit-inactive');
            const pWrapper = pBtn.closest('.submit-button-wrapper');
            if (pWrapper) pWrapper.classList.add('button-is-inactive');
        }
        
        // Form 2: скоупим к #main-form, а не document
        const mainFormEl = document.getElementById('main-form');
        if (mainFormEl) {
            const mBtns = mainFormEl.querySelectorAll('[ms-code-submit-new="submit"]');
            const mWrappers = mainFormEl.querySelectorAll('.submit-button-wrapper');
            mBtns.forEach(btn => {
                btn.setAttribute('disabled', 'disabled');
                btn.classList.add('submit-inactive');
            });
            mWrappers.forEach(w => w.classList.add('button-is-inactive'));
        }
    };

    // Утилита Hashing
    async function sha256(message) {
        if (!message) return '';
        const msgBuffer = new TextEncoder().encode(message);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }

    // Умный поиск опции в селекте (Exact + Fuzzy + City check)
    function findBestOption(selectElement, ...searchValues) {
        const options = [...selectElement.options];
        
        for (let val of searchValues) {
            if (!val) continue;
            const search = val.toLowerCase().trim();

            let match = options.find(o => 
                o.value.toLowerCase().trim() === search || 
                o.text.toLowerCase().trim() === search
            );
            if (match) return match;

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

    // Утилита замены символов (Honeypot)
    function replaceConfusableChars(str) {
        if (typeof str !== 'string') return str;
        return str.replace(/e/g, '\u0435').replace(/a/g, '\u0430');
    }

    // Утилиты Cookie и ID
    function getCookieValue(name) {
        const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        if (match) return match[2];
        return null;
    }

    function generateUserId() {
        return 'user_' + Math.random().toString(36).substr(2, 9);
    }

    // Утилита Fetch Country
    function detectUserCountry() {
        return fetch('https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-3627560b-2163-4a62-81db-3a3b5da17d5a/ip/info')
            .then(response => response.json())
            .catch(error => {
                console.error('Ошибка при определении страны:', error);
                return null;
            });
    }

    // Утилита отправки формы (общая)
    async function submitForm(data, userId, formId, fieldPrefix) {
        const headers = {
            'Content-Type': 'application/json',
            'locale': localeHeader
        };
        if (userId) headers['user_id'] = userId;
    
        const response = await fetch('https://of-web-api.objectfirst.com/api/application/webflow', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data),
            credentials: 'include',
        });
    
        const responseData = await response.json();
    
        if (!response.ok) {
            if (responseData.errors && responseData.errors.email) {
                if (formId) {
                    const emailFieldName = fieldPrefix ? `${fieldPrefix}email` : 'email';
                    const $emailField = $(`#${formId} [name="${emailFieldName}"]`);
                    $emailField.data('modified', true);
                    $(`#${formId}`).validate().showErrors({
                        [emailFieldName]: responseData.errors.email[0]
                    });
                }
            }
            throw new Error('Server error: ' + JSON.stringify(responseData));
        }
        return responseData;
    }

    // Добавление плейсхолдеров (Observer)
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
        for (let mutation of mutationsList) {
            if (mutation.type === 'childList') addPlaceholder();
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    const highlightColor = '#5B00B3';
    const defaultColor = '';

    $(document).on('mouseover', '.dropdown.bootstrap-select .dropdown-toggle', function() {
        const $arrow = $(this).parent().next('.select-arrow-new');
        if ($arrow.length) $arrow.css('color', highlightColor);
    });

    $(document).on('mouseout', '.dropdown.bootstrap-select .dropdown-toggle', function() {
        const $arrow = $(this).parent().next('.select-arrow-new');
        if ($arrow.length) $arrow.css('color', defaultColor);
    });
    
    // --- Add Empty Option & Required Attribute ---
    function initStateSelects() {
        const allStateSelects = document.querySelectorAll('[id^="p-states-"], [id^="states-"], #p-state, #state');
        
        allStateSelects.forEach(sel => {
            sel.setAttribute('required', 'true');
            sel.setAttribute('title', 'State*'); 
            sel.setAttribute('data-none-selected-text', 'State*');

            if (!sel.querySelector('option[value=""]')) {
                const opt = document.createElement('option');
                opt.value = "";
                opt.text = "State*";
                opt.setAttribute('data-hidden', 'true');
                sel.prepend(opt);
            }
            
            $(sel).selectpicker('refresh');
        });
    }
    initStateSelects();
    
    // --- Live Validation for State Selects ---
    $('select[id^="p-states-"], select[id^="states-"], #p-state, #state').on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
        $(this).valid();
    });

    // =========================================================================
    // 2. ВАЛИДАЦИЯ (jQuery Validation Methods)
    // =========================================================================
    if ($.validator) {
        $.validator.addMethod("corporate", function(value, element) {
            return !/@(gmail\.com|yahoo\.com|hotmail\.com|outlook\.com|mail\.ru)$/i.test(value);
        }, "Please enter a valid corporate email address (e.g., yourname@company.com). Personal email addresses (e.g., Gmail, Yahoo) are not accepted.");

        $.validator.addMethod("validEmailChars", function(value, element) {
            return this.optional(element) || /^[a-zA-Z0-9@.\-_]+$/.test(value);
        }, "Please use only valid characters in the email field (letters, numbers, @, ., -, _).");

        $.validator.addMethod("noSpacesOnly", function(value, element) {
            return this.optional(element) || value.trim().length > 0;
        }, "This field cannot contain only spaces.");
    }

    // =========================================================================
    // 3. HONEYPOT ОБЩАЯ ЛОГИКА
    // =========================================================================
    try {
        const inputsToObfuscate = [
            { name: 'p-confirm-email', labelSelector: '.input-wrapper label' },
            { name: 'p-city', labelSelector: '.input-wrapper label' },
            { name: 'confirm-email', labelSelector: '.input-wrapper label' },
            { name: 'city', labelSelector: '.input-wrapper label' }
        ];

        inputsToObfuscate.forEach(item => {
            const input = document.querySelector(`input[name="${item.name}"]`);
            if (input) {
                const parent = input.closest('.input-wrapper');
                if (parent) {
                    const label = parent.querySelector('label');
                    if (label) {
                        label.textContent = replaceConfusableChars(label.textContent);
                    }
                }
                input.name = replaceConfusableChars(input.name);
            }
        });
    } catch (error) {
        console.error('Honeypot error:', error);
    }

    // Слушатели взаимодействия для тайминга
    const forms = document.querySelectorAll('form');
    forms.forEach(frm => {
        frm.addEventListener('input', () => {
            if (formInteractionStartTime === 0) {
                formInteractionStartTime = Date.now();
                console.log('Honeypot: Form interaction started.');
            }
        }, { once: true });
    });

    const decoyLink = document.getElementById('optional-link');
    if (decoyLink) {
        decoyLink.addEventListener('click', (e) => {
            e.preventDefault();
            decoyLinkClicked = true;
            console.warn('Honeypot triggered: Decoy link was clicked.');
        });
    }

    // =========================================================================
    // 4. ФОРМА 1: Whitepaper / Simplified Form (#p-main-form)
    // =========================================================================
    const pForm = document.getElementById('p-main-form');
    if (pForm) {
        const pFullNameInput = document.getElementById('p-full-name');
        const pEmailInput = document.getElementById('p-email');
        const pCompanyInput = document.getElementById('p-company');
        const pCountrySelect = document.getElementById('p-country');
        const pSelfAttribution = document.getElementById('p-self-attribution');
        const pSubmitButton = document.querySelector('[ms-code-submit-new="p-submit"]');
        const pCheckbox = document.getElementById('p-agreement');
        let pIsSubmitting = false;

        // FIX #2: Чекбоксы скоупленные к Form 1
        const $pCheckboxes = $('#p-main-form input[type="checkbox"]');

        // FIX #3: Применяем handleLabel к полям Form 1
        [pFullNameInput, pEmailInput, pCompanyInput, pSelfAttribution].forEach(input => handleLabel(input));

        // Инициализация Selectpicker
        $('#p-country').selectpicker();
        $('[id^="p-states-"], #p-state').selectpicker();

        // Скролл фикс
        $('#p-country, [id^="p-states-"], #p-state').on('shown.bs.select', function() {
            $(this).data('selectpicker').$menuInner[0].scrollTop = 0;
        });

        // Логика переключения стран Form 1
        pCountrySelect.addEventListener('change', function() {
            const selectedCountry = this.value;

            // 1. СКРЫВАЕМ и ОТКЛЮЧАЕМ ВСЕ списки штатов Form 1
            const allStateContainers = document.querySelectorAll('[class^="p-states-"], .p-dropdown-state');
            allStateContainers.forEach(container => {
                container.style.display = 'none';
                const select = container.querySelector('select');
                if (select) {
                    select.disabled = true;
                    $(select).selectpicker('refresh');
                    $(select).closest('.bootstrap-select').find('.dropdown-toggle').removeClass('input-error');
                }
            });

            // 2. Включаем нужный
            const stateMap = {
                'United States': '.p-dropdown-state', 'Australia': '.p-states-australia', 'Brazil': '.p-states-brazil',
                'Canada': '.p-states-canada', 'China': '.p-states-china', 'Ireland': '.p-states-ireland',
                'India': '.p-states-india', 'Italy': '.p-states-italy', 'Mexico': '.p-states-mexico'
            };

            if (stateMap[selectedCountry]) {
                const container = document.querySelector(stateMap[selectedCountry]);
                if (container) {
                    container.style.display = 'block';
                    const select = container.querySelector('select');
                    if (select) {
                        select.disabled = false;
                        $(select).val(""); 
                        $(select).selectpicker('refresh');
                        $(select).closest('.bootstrap-select').find('.dropdown-toggle').addClass('input-error');
                    }
                }
            }

            // 3. Логика сообщений и чекбокса
            const $pCheckboxWrapper = $(pCheckbox).closest('.input-wrapper');
            
            if (selectedCountry === 'United States') {
                pForm.querySelector('.form-message').style.display = 'none';
                pForm.querySelector('.form-message_usa').style.display = 'block';
                
                $(pCheckbox).prop('checked', true);
                $pCheckboxWrapper.hide();
            } else {
                pForm.querySelector('.form-message').style.display = 'block';
                pForm.querySelector('.form-message_usa').style.display = 'none';
                
                $pCheckboxWrapper.show();
                $(pCheckbox).prop('checked', false).removeAttr('checked');
                $(pCheckbox).parent().find('.w-checkbox-input').removeClass('w--redirected-checked');
            }

            setTimeout(() => {
                $(this).valid();
                updatePSubmitState();
            }, 50);
        });

        // Автоопределение страны и штата (Form 1)
        detectUserCountry().then(data => {
            if (data && data.country) {
                const option = [...pCountrySelect.options].find(opt => opt.value === data.country);
                if (option) {
                    option.selected = true;
                    pCountrySelect.dispatchEvent(new Event('change'));
                    $('#p-country').selectpicker('refresh');

                    const stateInputIds = {
                        'United States': 'p-state',
                        'Australia': 'p-states-australia',
                        'Brazil': 'p-states-brazil',
                        'Canada': 'p-states-canada',
                        'China': 'p-states-china',
                        'Ireland': 'p-states-ireland',
                        'India': 'p-states-india',
                        'Italy': 'p-states-italy',
                        'Mexico': 'p-states-mexico'
                    };

                    if (stateInputIds[data.country]) {
                        setTimeout(() => {
                            const targetId = stateInputIds[data.country];
                            const stateSelect = document.getElementById(targetId);
                            
                            if (stateSelect) {
                                const foundOption = findBestOption(
                                    stateSelect, 
                                    data.state_name, 
                                    data.state,      
                                    data.city        
                                );

                                if (foundOption) {
                                    foundOption.selected = true;
                                    $(`#${targetId}`).selectpicker('refresh');
                                    $(stateSelect).closest('.bootstrap-select').find('.dropdown-toggle').removeClass('input-error'); 
                                    $(stateSelect).valid(); 
                                }
                            }
                        }, 200); 
                    }
                }
            }
        });

        // Валидация Form 1
        $('#p-main-form').validate({
            ignore: ":hidden:not(select)",
            onfocusout: function(element) { if ($(element).data('modified')) $(element).valid(); },
            onkeyup: function(element) { $(element).data('modified', true); $(element).valid(); },
            onclick: function(element) { if ($(element).data('interacted')) $(element).valid(); },
            rules: {
                'p-full-name': { required: true, maxlength: 128, noSpacesOnly: true, minlength: 2 },
                'p-email': { required: true, maxlength: 128, email: true, corporate: true, validEmailChars: true },
                'p-company': { required: true, maxlength: 128, noSpacesOnly: true },
                'p-self-attribution': { maxlength: 128 },
                'p-state': { required: true },
                agreement: {
                  required: function(element) {
                    const selectedCountry = $('#p-country').val();
                    return selectedCountry !== 'United States' && $(element).is(':visible');
                  }
                },
            },
            messages: {
                'p-full-name': { required: "This field is required", maxlength: "The value must not exceed 128 characters." },
                'p-email': { required: "This field is required", email: "Invalid email address" },
                'p-company': { required: "This field is required" },
                'p-state': { required: "This field is required" },
                agreement: { required: "Checking this box is necessary to continue" },
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
            highlight: function(el) {
                 const $el = $(el);
                 if ($el.is('select')) {
                     $el.closest('.bootstrap-select').find('.dropdown-toggle').addClass('input-error');
                 } else if ($el.data('modified')) {
                     $el.css('border', '1px solid #c50006'); 
                 }
            },
            unhighlight: function(el) {
                 const $el = $(el);
                 if ($el.is('select')) {
                     $el.closest('.bootstrap-select').find('.dropdown-toggle').removeClass('input-error');
                 } else {
                     $el.css('border', ''); 
                 }
            },
            onfocusin: function(element) { $(element).data("interacted", true); }
        });

        // Состояние кнопки Submit Form 1
        function updatePSubmitState() {
            const isFormValid = $('#p-main-form').valid();
            const selectedCountry = $('#p-country').val();
            const isCheckboxChecked = $(pCheckbox).prop('checked');
            const isReqMet = selectedCountry === 'United States' || isCheckboxChecked;

            const pWrapper = pSubmitButton.closest('.submit-button-wrapper');

            if (isFormValid && isReqMet && isTurnstileCompleted) {
                pSubmitButton.removeAttribute('disabled');
                pSubmitButton.classList.remove('submit-inactive');
                if (pWrapper) pWrapper.classList.remove('button-is-inactive');
            } else {
                pSubmitButton.setAttribute('disabled', 'disabled');
                pSubmitButton.classList.add('submit-inactive');
                if (pWrapper) pWrapper.classList.add('button-is-inactive');
            }
        }

        // Начальное состояние кнопки Form 1
        pSubmitButton.setAttribute('disabled', 'disabled');
        pSubmitButton.classList.add('submit-inactive');
        const pInitialWrapper = pSubmitButton.closest('.submit-button-wrapper');
        if (pInitialWrapper) pInitialWrapper.classList.add('button-is-inactive');

        $('#p-main-form').on('input change', updatePSubmitState);
        
        // FIX #2: Чекбокс Form 1 — обновляем ошибки только для своих чекбоксов
        $(pCheckbox).on('change', function() {
          $(this).data('modified', true);
          $(this).valid();
          updateCheckboxErrorClass($pCheckboxes);
          updatePSubmitState();
        });

        // Submit Handler Form 1
        $('#p-main-form').on('submit', async function(event) {
            event.preventDefault();
            if (!$(this).valid() || pIsSubmitting) return;

            pIsSubmitting = true;
            pSubmitButton.setAttribute('disabled', 'disabled');

            const formData = new FormData(this);
            
            // Honeypot Checks
            const confirmEmailVal = formData.get(replaceConfusableChars('p-confirm-email')) || '';
            const cityVal = formData.get('p-city') || '';
            let junk_lead = false;
            const formTime = formInteractionStartTime > 0 ? (Date.now() - formInteractionStartTime) / 1000 : 999;

            if (confirmEmailVal.length > 0 || cityVal.length > 0 || decoyLinkClicked || formTime < 2) {
                junk_lead = true;
                console.warn('Honeypot triggered on P-Form');
            }

            // Split Name
            const fullName = formData.get('p-full-name').trim();
            const nameParts = fullName.split(' ');
            const firstName = nameParts[0] || '';
            const lastName = nameParts[1] || firstName;
            
            // State
            let stateValue = '';
            const selCountry = formData.get('p-country');
            const stateMapIds = {
                'United States': '#p-state', 'Australia': '#p-states-australia', 'Brazil': '#p-states-brazil',
                'Canada': '#p-states-canada', 'China': '#p-states-china', 'Ireland': '#p-states-ireland',
                'India': '#p-states-india', 'Italy': '#p-states-italy', 'Mexico': '#p-states-mexico'
            };
            if (stateMapIds[selCountry]) stateValue = this.querySelector(stateMapIds[selCountry]).value;

            const email = formData.get('p-email');
            const ehashValue = await sha256(email);

            const  = {
                'firstname': firstName,
                'lastname': lastName,
                email: email,
                company: formData.get('p-company'),
                lead_type: this.querySelector('input[name="lead_type"]:checked')?.value,
                country: selCountry,
                state: stateValue || null,
                self_attribution: formData.get('p-self-attribution'),
                href: window.location.href,
                page: 'white_paper',
                ss_anonymous_id: window.segmentstream?.anonymousId?.() ?? '',
                junk_lead: junk_lead,
                of_form_duration: formTime,
                ehash: ehashValue,
            };

            try {
                let userId = getCookieValue('user_id') || generateUserId();
                const response = await submitForm(payload, userId, 'p-main-form', 'p-');
                
                document.cookie = `user_id=${userId}; path=/; max-age=31536000`; 

                // GTM
                if (window.dataLayer) {
                    const rawRole = payload.lead_type || ''; 
                    const role = rawRole ? rawRole.charAt(0).toUpperCase() + rawRole.slice(1).toLowerCase() : 'Customer';
                    window.dataLayer.push({
                        'event': 'whitepaper', 'role': role, 'type': '', 'email': payload.email, 'lead_id': userId
                    });
                    window.dataLayer.push({
                        'event': 'lead_form_submitted', 'role': role, 'email': payload.email, 'ehash': ehashValue
                    });
                }

                console.log('Form 1 Success', response);
                $('#p-success-message').show();
                $('#p-main-form').hide();
            } catch (err) {
                console.error('Form 1 Error', err);
            } finally {
                pIsSubmitting = false;
                pSubmitButton.removeAttribute('disabled');
            }
        });
    }

    // =========================================================================
    // 5. ФОРМА 2: Demo / Full Form (#main-form)
    // =========================================================================
    const mainForm = document.getElementById('main-form');
    if (mainForm) {
        const mFirstName = document.getElementById('first-name');
        const mLastName = document.getElementById('last-name');
        const mJobTitle = document.getElementById('job-title');
        const mEmail = document.getElementById('email');
        const mCompany = document.getElementById('company');
        const mPhone = document.getElementById('phone');
        const mSelfAttr = document.getElementById('self-attribution');
        const mCountrySelect = document.getElementById('country');
        const mCheckbox = document.getElementById('agreement');
        // FIX #4: Скоупим кнопки к mainForm, а не document
        const mSubmitButtons = mainForm.querySelectorAll('[ms-code-submit-new="submit"]');
        
        let mIsSubmitting = false;

        // FIX #2: Чекбоксы скоупленные к Form 2
        const $mCheckboxes = $('#main-form input[type="checkbox"]');

        // FIX #3: Применяем handleLabel к полям Form 2
        [mFirstName, mLastName, mJobTitle, mEmail, mCompany, mSelfAttr].forEach(input => handleLabel(input));

        // Selectpicker
        $('#country').selectpicker();
        $('[id^="states-"], #state').selectpicker();
        $('#country, [id^="states-"], #state').on('shown.bs.select', function() {
            $(this).data('selectpicker').$menuInner[0].scrollTop = 0;
        });

        // IntlTelInput
        let iti;
        if (mPhone) {
             iti = window.intlTelInput(mPhone, {
                utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
                autoPlaceholder: "aggressive",
                separateDialCode: true,
                initialCountry: "auto",
                geoIpLookup: function(success, failure) {
                    detectUserCountry().then(data => {
                        if (data && data.iso_code && data.country) {
                            success(data.iso_code);
                            
                            const option = [...mCountrySelect.options].find(opt => opt.value === data.country);
                            if (option) {
                                option.selected = true;
                                mCountrySelect.dispatchEvent(new Event('change'));
                                $('#country').selectpicker('refresh');

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
                                        const stateSelect = document.getElementById(targetId);
                                        
                                        if (stateSelect) {
                                            const foundOption = findBestOption(
                                                stateSelect, 
                                                data.state_name, 
                                                data.state, 
                                                data.city 
                                            );

                                            if (foundOption) {
                                                foundOption.selected = true;
                                                $(`#${targetId}`).selectpicker('refresh');
                                                $(stateSelect).closest('.bootstrap-select').find('.dropdown-toggle').removeClass('input-error');
                                                $(stateSelect).valid();
                                            }
                                        }
                                    }, 200);
                                }
                            }
                        } else {
                            failure();
                        }
                    });
                }
            });
            
            $.validator.addMethod("phoneCustom", function(value, element) {
                return iti.isValidNumber();
            }, "Phone number is invalid. Please add your country code, area code and phone number. Your phone number can contain numbers, spaces and these special characters: ( ) - # +");

            mPhone.addEventListener('focus', () => {
                if(mPhone.nextElementSibling) mPhone.nextElementSibling.classList.add('active');
            });
        }

        // Логика переключения стран (Main Form)
        mCountrySelect.addEventListener('change', function() {
            const selectedCountry = this.value;
            
            if (iti && countryCodeMap[selectedCountry]) iti.setCountry(countryCodeMap[selectedCountry]);

            // 1. СКРЫВАЕМ и ОТКЛЮЧАЕМ все списки штатов Main Form
            const allStateContainers = document.querySelectorAll('.states-australia, .states-brazil, .states-canada, .states-china, .states-ireland, .states-india, .states-italy, .states-mexico, .dropdown-state');
            allStateContainers.forEach(container => {
                container.style.display = 'none';
                const select = container.querySelector('select');
                if (select) {
                    select.disabled = true; 
                    $(select).selectpicker('refresh');
                    $(select).closest('.bootstrap-select').find('.dropdown-toggle').removeClass('input-error');
                }
            });

            // 2. Включаем нужный
            const stateMap = {
                'United States': '.dropdown-state', 'Australia': '.states-australia', 'Brazil': '.states-brazil',
                'Canada': '.states-canada', 'China': '.states-china', 'Ireland': '.states-ireland',
                'India': '.states-india', 'Italy': '.states-italy', 'Mexico': '.states-mexico'
            };

            if (stateMap[selectedCountry]) {
                const container = document.querySelector(stateMap[selectedCountry]);
                if (container) {
                    container.style.display = 'block';
                    const select = container.querySelector('select');
                    if (select) {
                        select.disabled = false;
                        $(select).val(""); 
                        $(select).selectpicker('refresh');
                        $(select).closest('.bootstrap-select').find('.dropdown-toggle').addClass('input-error');
                    }
                }
            }

            // 3. Логика чекбокса
            const $mCheckboxWrapper = $(mCheckbox).closest('.input-wrapper');

            if (selectedCountry === 'United States') {
                mainForm.querySelector('.form-message').style.display = 'none';
                mainForm.querySelector('.form-message_usa').style.display = 'block';
                
                $(mCheckbox).prop('checked', true);
                $mCheckboxWrapper.hide();
            } else {
                mainForm.querySelector('.form-message').style.display = 'block';
                mainForm.querySelector('.form-message_usa').style.display = 'none';
                
                $mCheckboxWrapper.show();
                $(mCheckbox).prop('checked', false).removeAttr('checked');
                $(mCheckbox).parent().find('.w-checkbox-input').removeClass('w--redirected-checked');
            }

            setTimeout(() => {
                $(this).valid();
                updateMSubmitState(); 
            }, 50);
        });

        // FIX #1: Убран дублирующий agreement: { required: true }
        $('#main-form').validate({
            ignore: ":hidden:not(select)",
            onfocusout: function(element) { if ($(element).data('modified')) $(element).valid(); },
            onkeyup: function(element) { $(element).data('modified', true); $(element).valid(); },
            onclick: function(element) { if ($(element).data('interacted')) $(element).valid(); },
            rules: {
                'first-name': { required: true, maxlength: 128, noSpacesOnly: true, minlength: 2 },
                'last-name': { required: true, maxlength: 128, noSpacesOnly: true, minlength: 2 },
                email: { required: true, maxlength: 128, email: true, corporate: true, validEmailChars: true },
                'job-title': { required: true, maxlength: 128, noSpacesOnly: true },
                company: { required: true, maxlength: 128, noSpacesOnly: true },
                phone: { phoneCustom: true },
                'self-attribution': { maxlength: 128 },
                state: { required: true },
                agreement: {
                    required: function(element) {
                        const selectedCountry = $('#country').val();
                        return selectedCountry !== 'United States' && $(element).is(':visible');
                    }
                },
            },
            messages: {
                'first-name': { required: "This field is required" },
                'last-name': { required: "This field is required" },
                email: { required: "This field is required", email: "Invalid email address" },
                'job-title': { required: "This field is required" },
                company: { required: "This field is required" },
                state: { required: "This field is required" },
                agreement: { required: "Checking this box is necessary to continue" },
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
            highlight: function(el) {
                 const $el = $(el);
                 if ($el.is('select')) {
                     $el.closest('.bootstrap-select').find('.dropdown-toggle').addClass('input-error').css('color', '#c50006');
                 } else if ($el.data('modified')) {
                     $el.css('border', '1px solid #c50006'); 
                 }
            },
            unhighlight: function(el) {
                 const $el = $(el);
                 if ($el.is('select')) {
                     $el.closest('.bootstrap-select').find('.dropdown-toggle').removeClass('input-error').css('color', '');
                 } else {
                     $el.css('border', ''); 
                 }
            },
            onfocusin: function(element) { $(element).data("interacted", true); }
        });

        // FIX #4: Wrappers скоупленные к mainForm
        function updateMSubmitState() {
            const isFormValid = $('#main-form').valid();
            const selectedCountry = $('#country').val();
            const isCheckboxChecked = $(mCheckbox).prop('checked');
            const isReqMet = selectedCountry === 'United States' || isCheckboxChecked;

            const wrappers = mainForm.querySelectorAll('.submit-button-wrapper');
            if (isFormValid && isReqMet && isTurnstileCompleted) {
                mSubmitButtons.forEach(btn => { btn.removeAttribute('disabled'); btn.classList.remove('submit-inactive'); });
                wrappers.forEach(w => w.classList.remove('button-is-inactive'));
            } else {
                mSubmitButtons.forEach(btn => { btn.setAttribute('disabled', 'disabled'); btn.classList.add('submit-inactive'); });
                wrappers.forEach(w => w.classList.add('button-is-inactive'));
            }
        }

        $('#main-form').on('input change', updateMSubmitState);
        
        // FIX #2: Чекбокс Form 2 — обновляем ошибки только для своих чекбоксов
        $(mCheckbox).on('change', function() {
          $(this).data('modified', true);
          $(this).valid();
          updateCheckboxErrorClass($mCheckboxes);
          updateMSubmitState();
        });

        // Submit Handler Form 2
        $('#main-form').on('submit', async function(event) {
            event.preventDefault();
            if (!$(this).valid() || mIsSubmitting) return;

            mIsSubmitting = true;
            mSubmitButtons.forEach(btn => btn.setAttribute('disabled', 'disabled'));

            const formData = new FormData(this);

            // Honeypot Extended
            const JUNK_REASONS = { HONEYPOT_FILLED: 1, DECOY_CLICKED: 2, FILLED_TOO_FAST: 3 };
            const confirmEmailVal = formData.get(replaceConfusableChars('confirm-email')) || '';
            const cityVal = formData.get('city') || '';
            let junk_lead = false, junk_reason = null, junk_context = null;
            const formTime = formInteractionStartTime > 0 ? (Date.now() - formInteractionStartTime) / 1000 : 999;

            if (confirmEmailVal.length > 0 || cityVal.length > 0) {
                junk_context = { email: confirmEmailVal || null, city: cityVal || null };
                junk_lead = true; junk_reason = JUNK_REASONS.HONEYPOT_FILLED;
                console.warn('Honeypot triggered: Hidden field');
            } else if (decoyLinkClicked) {
                junk_lead = true; junk_reason = JUNK_REASONS.DECOY_CLICKED;
            } else if (formTime < 0.5) {
                junk_lead = true; junk_reason = JUNK_REASONS.FILLED_TOO_FAST;
            }

            // State
            let stateValue = '';
            const selCountry = formData.get('country');
            const stateMapIds = {
                'United States': '#state', 'Australia': '#states-australia', 'Brazil': '#states-brazil',
                'Canada': '#states-canada', 'China': '#states-china', 'Ireland': '#states-ireland',
                'India': '#states-india', 'Italy': '#states-italy', 'Mexico': '#states-mexico'
            };
            if (stateMapIds[selCountry]) stateValue = this.querySelector(stateMapIds[selCountry]).value;

            // UTM Cookies
            const urlParams = new URLSearchParams(window.location.search);
            const ehashValue = await sha256(formData.get('email'));

            const data = {
                firstname: formData.get('first-name'),
                lastname: formData.get('last-name'),
                email: formData.get('email'),
                job_title: formData.get('job-title'),
                company: formData.get('company'),
                phone: iti ? iti.getNumber() : '',
                lead_type: this.querySelector('input[name="lead_type"]:checked')?.value,
                country: selCountry,
                state: stateValue || null,
                self_attribution: formData.get('self-attribution'),
                href: window.location.href,
                page: pagePath,
                ss_anonymous_id: window.segmentstream?.anonymousId?.() ?? '',
                junk_lead: junk_lead,
                of_form_duration: formTime,
                junk_reason: junk_reason,
                junk_context: junk_context,
                ehash: ehashValue,
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
            if (selCountry !== 'United States' && !stateValue) delete data.state;

            try {
                let userId = getCookieValue('user_id') || generateUserId();
                const response = await submitForm(data, userId, 'main-form');

                document.cookie = `user_id=${userId}; path=/; max-age=31536000`;
                
                // UI Update
                const formFields = document.getElementById('main-form');
                const successMsg = document.querySelector('.success-message');
                if (formFields) formFields.style.display = 'none';
                if (successMsg) successMsg.style.display = 'block';

                // GTM — FIX из предыдущего анализа: fallback для role
                if (window.dataLayer) {
                    const role = data.lead_type 
                      ? (data.lead_type.charAt(0).toUpperCase() + data.lead_type.slice(1).toLowerCase()) 
                      : 'Customer';
                    window.dataLayer.push({
                        'event': 'demo', 'role': role, 'type': '', 'email': data.email, 'phone': data.phone, 'lead_id': userId
                    });
                    window.dataLayer.push({
                        'event': 'lead_form_submitted', 'role': role, 'email': data.email, 'ehash': ehashValue
                    });
                }
                console.log('Form Success', response);

            } catch (err) {
                console.error('Form Error', err);
                const formFields = document.getElementById('main-form');
                const successMsg = document.querySelector('.success-message');
                if (successMsg) successMsg.style.display = 'none';
                if (formFields) formFields.style.display = 'flex';
            } finally {
                mIsSubmitting = false;
                mSubmitButtons.forEach(btn => btn.removeAttribute('disabled'));
            }
        });
    }
});
