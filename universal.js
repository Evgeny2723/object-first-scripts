document.addEventListener('DOMContentLoaded', function() {
    // -----------------------------------------------------------------------
    // 1. ПЕРЕМЕННЫЕ И СЕЛЕКТОРЫ
    // -----------------------------------------------------------------------
    
    // Основная форма
    const mainForm = document.getElementById('main-form') || document.querySelector('form');
    const submitButton = document.querySelector('[ms-code-submit-new="submit"]');
    const submitButtonWrapper = document.querySelector('.submit-button-wrapper');
    
    // Правка №2: Контейнер первой формы, который будем скрывать
    const formFields = document.getElementById('main-form-container'); 
    
    // Поля основной формы
    const fullNameInput = document.getElementById('full-name');
    const firstNameInput = document.getElementById('first-name');
    const lastNameInput = document.getElementById('last-name');
    const jobTitleInput = document.getElementById('job-title');
    const emailInput = document.getElementById('email');
    const companyInput = document.getElementById('company');
    const phoneInput = document.getElementById('phone');
    const selfAttributionInput = document.getElementById('self-attribution');
    const countrySelect = document.getElementById('country');
    const stateSelect = document.getElementById('state');
    
    // Дропдауны штатов
    const dropdownState = document.querySelector('.dropdown-state');
    const dropdownAustralia = document.querySelector('.states-australia');
    const dropdownBrazil = document.querySelector('.states-brazil');
    const dropdownCanada = document.querySelector('.states-canada');
    const dropdownChina = document.querySelector('.states-china');
    const dropdownIreland = document.querySelector('.states-ireland');
    const dropdownIndia = document.querySelector('.states-india');
    const dropdownItaly = document.querySelector('.states-italy');
    const dropdownMexico = document.querySelector('.states-mexico');
    
    // Чекбоксы
    const checkboxFields = document.querySelectorAll('.checkbox-field');
    const checkboxes = document.querySelectorAll('.checkbox-field input[type="checkbox"]');

    // Форма ввода кода
    const formCode = document.getElementById('code-form'); 
    const codeInput = document.getElementById('code');
    const emailInput2 = document.getElementById('hidden-email');     
    const submit2Button = document.getElementById('submit-code-violet') || document.querySelector('[ms-code-submit-new="submit2"]');
    const emailDisplay = document.getElementById('email-display');
    
    const resendCodeButton = document.getElementById('resend-code');
    const codeFormContainer = document.getElementById('code-form-container'); // Общий контейнер блока с кодом

    // Глобальные элементы UI
    const successMessage = document.querySelector('.w-form-done');
    const blockingBlock = document.querySelector('.blocking-block');
    const unlockText = document.querySelector('.unlock-text');
    
    // Служебные переменные
    let iti = null;
    let isSubmitting = false;
    let isFormInitialized = false;
    codeFormContainer.style.display = 'none';

    // Honeypot переменные
    let formInteractionStartTime = 0;
    let decoyLinkClicked = false;

    // -----------------------------------------------------------------------
    // 2. ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ (UI, Validate, Helper)
    // -----------------------------------------------------------------------

    // Обработка меток (floating labels)
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
        input.addEventListener('focus', () => label.classList.add('active'));
        input.addEventListener('blur', () => updateLabelState());
        input.addEventListener('input', () => updateLabelState());
    }

    [fullNameInput, firstNameInput, lastNameInput, jobTitleInput, emailInput, companyInput, selfAttributionInput, codeInput].forEach(input => {
        handleLabel(input);
    });

    // Плейсхолдеры
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

    // Подсветка радиокнопок
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

    // Dropdown Logic
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
                if (dropdown) dropdown.style.display = 'none';
            });
  
            if (dropdowns[selectedCountry]) {
                dropdowns[selectedCountry].style.display = 'block';
            }
        });
    }

    // Selectpicker Init
    if (countrySelect) {
        $('#country').selectpicker();
        $('#state, #states-australia, #states-brazil, #states-canada, #states-china, #states-ireland, #states-india, #states-italy, #states-mexico').selectpicker();
  
        $('#country').on('shown.bs.select', function() {
            $(this).data('selectpicker').$menuInner[0].scrollTop = 0;
        });
        $('#state, #states-australia, #states-brazil, #states-canada, #states-china, #states-ireland, #states-india, #states-italy, #states-mexico').on('shown.bs.select', function() {
            $(this).data('selectpicker').$menuInner[0].scrollTop = 0;
        });
    }

    // IntlTelInput
    const countryCodeMap = { "Australia": "AU", "Austria": "AT", "Azerbaijan": "AZ", "Albania": "AL", "Algeria": "DZ", "Angola": "AO", "Andorra": "AD", "Antigua and Barbuda": "AG", "Argentina": "AR", "Armenia": "AM", "Afghanistan": "AF", "Bahamas": "BS", "Bangladesh": "BD", "Barbados": "BB", "Bahrain": "BH", "Belarus": "BY", "Belize": "BZ", "Belgium": "BE", "Benin": "BJ", "Bulgaria": "BG", "Bolivia": "BO", "Bosnia and Herzegovina": "BA", "Botswana": "BW", "Brazil": "BR", "Brunei Darussalam": "BN", "Burkina Faso": "BF", "Burundi": "BI", "Bhutan": "BT", "Vanuatu": "VU", "Hungary": "HU", "Venezuela": "VE", "Vietnam": "VN", "Gabon": "GA", "Haiti": "HT", "Guyana": "GY", "Gambia": "GM", "Ghana": "GH", "Guatemala": "GT", "Guinea": "GN", "Guinea-Bissau": "GW", "Germany": "DE", "Honduras": "HN", "Grenada": "GD", "Greece": "GR", "Georgia": "GE", "Denmark": "DK", "Congo, Democratic Republic of the": "CD", "Djibouti": "DJ", "Dominica": "DM", "Dominican Republic": "DO", "Egypt": "EG", "Zambia": "ZM", "Zimbabwe": "ZW", "Israel": "IL", "India": "IN", "Indonesia": "ID", "Jordan": "JO", "Iraq": "IQ", "Iran": "IR", "Ireland": "IE", "Iceland": "IS", "Spain": "ES", "Italy": "IT", "Yemen": "YE", "Cabo Verde": "CV", "Kazakhstan": "KZ", "Cambodia": "KH", "Cameroon": "CM", "Canada": "CA", "Qatar": "QA", "Kenya": "KE", "Cyprus": "CY", "Kiribati": "KI", "China": "CN", "Colombia": "CO", "Comoros": "KM", "Congo": "CG", "North Korea": "KP", "Costa Rica": "CR", "Côte d'Ivoire": "CI", "Cuba": "CU", "Kuwait": "KW", "Kyrgyzstan": "KG", "Lao People's Democratic Republic": "LA", "Latvia": "LV", "Lesotho": "LS", "Liberia": "LR", "Lebanon": "LB", "Libya": "LY", "Lithuania": "LT", "Liechtenstein": "LI", "Luxembourg": "LU", "Mauritius": "MU", "Mauritania": "MR", "Madagascar": "MG", "Malawi": "MW", "Malaysia": "MY", "Mali": "ML", "Maldives": "MV", "Malta": "MT", "Morocco": "MA", "Marshall Islands": "MH", "Mexico": "MX", "Mozambique": "MZ", "Monaco": "MC", "Mongolia": "MN", "Myanmar": "MM", "Namibia": "NA", "Nauru": "NR", "Nepal": "NP", "Niger": "NE", "Nigeria": "NG", "Netherlands": "NL", "Nicaragua": "NI", "Niue": "NU", "New Zealand": "NZ", "Norway": "NO", "Tanzania, United Republic of": "TZ", "United Arab Emirates": "AE", "Oman": "OM", "Cook Islands": "CK", "Pakistan": "PK", "Panama": "PA", "Papua New Guinea": "PG", "Paraguay": "PY", "Peru": "PE", "Poland": "PL", "Portugal": "PT", "Korea, Republic of": "KR", "Moldova, Republic of": "MD", "Russian Federation": "RU", "Rwanda": "RW", "Romania": "RO", "El Salvador": "SV", "Samoa": "WS", "San Marino": "SM", "Sao Tome and Principe": "ST", "Saudi Arabia": "SA", "Holy See (Vatican City State)": "VA", "North Macedonia": "MK", "Seychelles": "SC", "Senegal": "SN", "Saint Vincent and the Grenadines": "VC", "Saint Kitts and Nevis": "KN", "Saint Lucia": "LC", "Serbia": "RS", "Singapore": "SG", "Syrian Arab Republic": "SY", "Slovakia": "SK", "Slovenia": "SI", "United Kingdom": "GB", "United States": "US", "Solomon Islands": "SB", "Somalia": "SO", "Sudan": "SD", "Suriname": "SR", "Sierra Leone": "SL", "Tajikistan": "TJ", "Thailand": "TH", "Timor-Leste": "TL", "Togo": "TG", "Tonga": "TO", "Trinidad and Tobago": "TT", "Tuvalu": "TV", "Tunisia": "TN", "Turkmenistan": "TM", "Turkey": "TR", "Uganda": "UG", "Uzbekistan": "UZ", "Ukraine": "UA", "Uruguay": "UY", "Fiji": "FJ", "Philippines": "PH", "Finland": "FI", "France": "FR", "Croatia": "HR", "Central African Republic": "CF", "Chad": "TD", "Montenegro": "ME", "Czech Republic": "CZ", "Chile": "CL", "Switzerland": "CH", "Sweden": "SE", "Sri Lanka": "LK", "Ecuador": "EC", "Equatorial Guinea": "GQ", "Eritrea": "ER", "Eswatini": "SZ", "Estonia": "EE", "Ethiopia": "ET" };

    if (phoneInput && countrySelect) {
        iti = window.intlTelInput(phoneInput, {
            utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
            autoPlaceholder: "aggressive",
            separateDialCode: true,
            initialCountry: "auto"
        });
    }

    // IP Detection
    function detectCountryByIP() {
        if (!countrySelect) return;
        fetch('https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-3627560b-2163-4a62-81db-3a3b5da17d5a/ip/info')
            .then(response => response.json())
            .then(data => {
                if (data && data.iso_code && data.country) {
                    if (iti) iti.setCountry(data.iso_code);
                    const optionToSelect = [...countrySelect.options].find(option => option.value === data.country);
                    if (optionToSelect) {
                        optionToSelect.selected = true;
                        countrySelect.dispatchEvent(new Event('change'));
                    }
                }
            })
            .catch(error => console.error('Error while getting IP data:', error));
    }
    detectCountryByIP();

    // Checkbox Logic
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
                if (currentCheckbox.is(':checked')) {
                    label.removeClass('error');
                } else {
                    label.addClass('error');
                }
            }
        });
    }

    // Init Logic on Ready
    $(document).ready(function() {
       $(checkboxes).each(function() {
           const label = $(this).closest('.checkbox-field').find('.checkbox-text');
           label.removeClass('error');
       });
       resetCheckbox();
       updateCheckboxErrorClass();
    });

    // jQuery Validate Init (Main Form)
    const validator = $(mainForm).validate({
        onfocusout: function(element) {
            if ($(element).data('modified')) $(element).valid();
        },
        onkeyup: function(element) {
            $(element).data('modified', true);
            $(element).valid();
        },
        onclick: function(element) {
            if (isFormInitialized) $(element).valid();
        },
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
            email: { required: "This field is required", email: "Invalid email address", corporate: "Please enter a valid corporate email address." },
            'job-title': { required: "This field is required" },
            company: { required: "This field is required" },
            phone: { phoneCustom: "Phone number is invalid. Please add your country code, area code and phone number. Your phone number can contain numbers, spaces and these special characters: ( ) - # +" },
            agreement: { required: "Checking this box is necessary to continue" }
        },
        // Правка №7: Обновленный errorPlacement
        errorPlacement: function (error, element) {
           if (element.attr("name") === "agreement" && $(element).data('modified')) {
             const container = element.closest(".input-wrapper").length
               ? element.closest(".input-wrapper")
               : element.closest(".field-row");
             error.appendTo(container);
           } else if (element.attr("name") !== "agreement" && $(element).data('modified')) {
             const container = element.closest(".input-wrapper").length
               ? element.closest(".input-wrapper")
               : element.closest(".field-row");
             error.appendTo(container);
           }
        },
        highlight: function(element) {
            if ($(element).data('modified')) $(element).css('border', '1px solid #c50006');
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

    // Custom Validators
    $.validator.addMethod("phoneCustom", function(value, element) {
        if (!phoneInput || !iti) return true;
        return iti.isValidNumber();
    }, "Phone number is invalid.");

    $.validator.addMethod("corporate", function(value, element) {
        return !/@(gmail\.com|yahoo\.com|hotmail\.com|outlook\.com|mail\.ru)$/i.test(value);
    }, "Please enter a valid corporate email address.");

    $.validator.addMethod("validEmailChars", function (value, element) {
        return this.optional(element) || /^[a-zA-Z0-9@.\-_]+$/.test(value);
    }, "Please use only valid characters.");

    $.validator.addMethod("noSpacesOnly", function (value, element) {
        return this.optional(element) || value.trim().length > 0;
    }, "This field cannot contain only spaces.");

    // Helpers
    function resetCheckbox() {
        const $allCheckboxes = $(checkboxes);
        $allCheckboxes.prop('checked', false).removeAttr('checked');
        $allCheckboxes.parent().find('.w-checkbox-input').removeClass('w--redirected-checked');
    }

    function updateSubmitButtonState() {
        const $form = $(mainForm);
        const isFormValid = $form.valid();
        const isSimpleEmailForm = $form.hasClass('feedback-form');
        
        if (isSimpleEmailForm) {
            const emailEl = document.getElementById('email');
            const isEmailValid = emailEl ? $(emailEl).valid() : false;
            if (isEmailValid) {
                $(submitButton).removeAttr('disabled').removeClass('submit-inactive');
                $(submitButtonWrapper).removeClass('button-is-inactive');
            } else {
                $(submitButton).attr('disabled', 'disabled').addClass('submit-inactive');
                $(submitButtonWrapper).addClass('button-is-inactive');
            }
            return;
        }
        
        const selectedCountry = $('#country').val();
        const $requiredCheckboxes = $(checkboxes).filter(':visible').not('#checkbox-sign');
        const checkedCount = $requiredCheckboxes.filter(':checked').length;
        const areAllCheckboxesChecked = $requiredCheckboxes.length === checkedCount;
        const isCheckboxRequirementMet = selectedCountry === 'United States' || areAllCheckboxesChecked;

        if (isFormValid && isCheckboxRequirementMet) {
            $(submitButton).removeAttr('disabled').removeClass('submit-inactive');
            $(submitButtonWrapper).removeClass('button-is-inactive');
        } else {
            $(submitButton).attr('disabled', 'disabled').addClass('submit-inactive');
            $(submitButtonWrapper).addClass('button-is-inactive');
        }
    }

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

    // Events for Main Form UI
    $(checkboxes).on('change', function() {
        $(this).data('modified', true);
        $(this).valid();
        updateCheckboxErrorClass();
        updateSubmitButtonState();
    });

    $(mainForm).on('input change', function(event) {
        updateSubmitButtonState();
    });
    
    $(submitButton).attr('disabled', 'disabled').addClass('submit-inactive');
    $(submitButtonWrapper).addClass('button-is-inactive');

    // Search Placeholder Animation
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

    if (countrySelect) {
        $('#country').on('change', function() {
            toggleCountrySpecificElements(this.value);
            if (iti && countryCodeMap[this.value]) {
                iti.setCountry(countryCodeMap[this.value]);
            }
            $(this).valid();
        });
    }

    // Cookie & Hash Utils
    const pathSegments = window.location.pathname.split('/').filter(Boolean);
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
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }

    function generateUserId() { return 'user_' + Math.random().toString(36).substr(2, 9); }

    function getCookieValue(name) {
        const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        if (match) return match[2];
        return null;
    }

    function checkCookiesAndStorage() {
        const hasVideoContent = blockingBlock || unlockText;
        if (hasVideoContent && sessionStorage.getItem('videoUnlocked') === 'true') {
            if (blockingBlock) blockingBlock.style.display = 'none';
            if (unlockText) unlockText.style.display = 'flex';
            if (successMessage) successMessage.style.display = 'block';
            if (formFields) formFields.style.display = 'none';
            return;
        }
        if (successMessage) successMessage.style.display = 'none';
        if (formFields) formFields.style.display = 'flex';
    }
    checkCookiesAndStorage();

    function replaceConfusableChars(str) {
        if (typeof str !== 'string') return str;
        return str.replace(/e/g, '\u0435').replace(/a/g, '\u0430');
    }

    // Honeypot Init
    try {
        const confirmEmailInput = document.querySelector('input[name="confirm-email"]');
        if (confirmEmailInput) {
             // Правка №6: Более универсальный селектор враппера
             const wrapper = confirmEmailInput.closest('.input-w') || confirmEmailInput.closest('.input-wrapper');
             if(wrapper) {
                 const label = wrapper.querySelector('label');
                 if(label) label.textContent = replaceConfusableChars(label.textContent);
             }
             confirmEmailInput.name = replaceConfusableChars(confirmEmailInput.name);
        }
        const cityInput = document.querySelector('input[name="city"]');
        if (cityInput) {
             const wrapper = cityInput.closest('.input-w') || cityInput.closest('.input-wrapper');
             if(wrapper) {
                 const label = wrapper.querySelector('label');
                 if(label) label.textContent = replaceConfusableChars(label.textContent);
             }
        }
    } catch (error) { console.error(error); }

    function splitFullName(fullName) {
        if (!fullName) return { firstName: '', lastName: '' };
        const nameParts = fullName.trim().split(' ');
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || '';
        if (nameParts.length === 1) return { firstName, lastName: firstName };
        if (nameParts.length > 2) return { firstName, lastName: nameParts[1] || '' };
        return { firstName, lastName };
    }

    // -----------------------------------------------------------------------
    // 3. ОБРАБОТКА ОТПРАВКИ ФОРМ
    // -----------------------------------------------------------------------

    // --- MAIN FORM SUBMISSION ---
    if (mainForm) {
        mainForm.addEventListener('input', () => {
            if (formInteractionStartTime === 0) formInteractionStartTime = Date.now();
        }, { once: true });

        const decoyLink = document.getElementById('optional-link');
        if (decoyLink) decoyLink.addEventListener('click', (e) => {
            e.preventDefault();
            decoyLinkClicked = true;
        });

        mainForm.addEventListener('submit', async function(event) {
            event.preventDefault();

            // Сборка комментариев
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
            
            let formattedComments = '';
            if (commentParts.length > 0) {
                commentParts.push(`Demo message: ${demoMessageValue}`);
                formattedComments = commentParts.join('\n');
            } else {
                formattedComments = demoMessageValue;
            }

            if (!$(this).valid()) return;
            if (isSubmitting) return;

            isSubmitting = true;
            if (submitButton) submitButton.setAttribute('disabled', 'disabled');

            const formData = new FormData(mainForm);
            let firstNameValue = formData.get('first-name') || '';
            let lastNameValue  = formData.get('last-name')  || '';
            
            if (!firstNameValue && !lastNameValue) {
                const fullName = formData.get('full-name') || '';
                const { firstName, lastName } = splitFullName(fullName);
                firstNameValue = firstName;
                lastNameValue  = lastName;
            }

            // Honeypot Logic
            const JUNK_REASONS = { HONEYPOT_FILLED: 1, DECOY_CLICKED: 2, FILLED_TOO_FAST: 3 };
            const confirmEmailValue = formData.get(replaceConfusableChars('confirm-email')) || '';
            const cityValue = formData.get('city') || '';
            let junk_lead = false, junk_reason = null, junk_context = null;
            const formFillingTime = formInteractionStartTime > 0 ? (Date.now() - formInteractionStartTime) / 1000 : 999;

            if (confirmEmailValue.length > 0 || cityValue.length > 0) {
                junk_context = { email: confirmEmailValue || null, city: cityValue || null };
                junk_lead = true; junk_reason = JUNK_REASONS.HONEYPOT_FILLED;
            } else if (decoyLinkClicked) {
                junk_lead = true; junk_reason = JUNK_REASONS.DECOY_CLICKED;
            } else if (formFillingTime < 0.5) {
                junk_lead = true; junk_reason = JUNK_REASONS.FILLED_TOO_FAST;
            }

            const leadTypeValue = mainForm.querySelector('input[name="lead_type"]:checked')?.value;
            let selectedCountry = null;
            let stateValue = '';

            if (countrySelect) {
                selectedCountry = mainForm.querySelector('select[name="country"]').value;
                const stateMap = {
                    'United States': '#state', 'Australia': '#states-australia', 'Brazil': '#states-brazil',
                    'Canada': '#states-canada', 'China': '#states-china', 'Ireland': '#states-ireland',
                    'India': '#states-india', 'Italy': '#states-italy', 'Mexico': '#states-mexico'
                };
                if (stateMap[selectedCountry]) {
                    stateValue = mainForm.querySelector(stateMap[selectedCountry]).value;
                }
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
                    c_of_utm_campaign: urlParams.get('utm_campaign') || '',
                    c_of_utm_content: urlParams.get('utm_content') || '',
                    c_of_utm_medium: urlParams.get('utm_medium') || '',
                    c_of_utm_source: urlParams.get('utm_source') || '',
                    c_of_utm_term: urlParams.get('utm_term') || ''
                }
            };

            if (countrySelect && selectedCountry !== 'United States' && !stateValue) delete data.state;

            try {
                window.formDataToSubmit = data;
                let userId = getCookieValue('user_id') || generateUserId();
                const responseData = await checkEmailOnly(data, userId);
                console.log('Main Form submitted successfully.', responseData);

                document.cookie = `user_id=${userId}; path=/; max-age=31536000`;

                // ЛОГИКА ПЕРЕХОДА НА ВТОРОЙ ШАГ
                if (formCode && codeFormContainer) {
                    if (emailInput2) {
                        emailInput2.value = data.email;
                        emailDisplay.textContent = data.email.trim();
                    }
                    if (formFields) formFields.style.display = 'none'; // Скрываем #main-form-container
                    if (codeFormContainer) codeFormContainer.style.display = 'flex'; // Показываем блок кода
                } else {
                    if (formFields) formFields.style.display = 'none';
                    if (successMessage) successMessage.style.display = 'block';
                    if (blockingBlock) blockingBlock.style.display = 'none';
                    if (unlockText) unlockText.style.display = 'flex';
                    
                    sessionStorage.setItem('formSubmitted', 'true');
                    sessionStorage.setItem('videoUnlocked', 'true');
                }

                // DataLayer Push (Initial Lead)
                const leadId = userId;
                const roleValue = data.lead_type ? (data.lead_type.charAt(0).toUpperCase() + data.lead_type.slice(1).toLowerCase()) : 'Customer';
                const eventType = $(mainForm).attr('data-event-type') || 'demo';

                if (window.dataLayer) {
                    window.dataLayer.push({
                        'event': eventType,
                        'role': roleValue,
                        'type': '',
                        'email': data.email,
                        'phone': data.phone,
                        'lead_id': leadId
                    });
                }

            } catch (error) {
                console.error('Error:', error.message);
                if (successMessage) successMessage.style.display = 'none';
                if (formFields) formFields.style.display = 'flex';
            } finally {
                isSubmitting = false; 
                if (submitButton) submitButton.removeAttribute('disabled');
            }
        });
    }

    // --- CODE FORM SUBMISSION (ВТОРАЯ ФОРМА) ---
    if (formCode) {
          if (codeInput) {
            $(codeInput).mask('000000'); // Применить маску сразу
          }
        
          if (codeInput && submit2Button) {
            function updateCodeSubmitButtonState() {
              const codeValue = codeInput.value.trim();
              if (codeValue.length === 6) {
                submit2Button.removeAttribute('disabled');
                submit2Button.classList.remove('submit-inactive');
              } else {
                submit2Button.setAttribute('disabled', 'disabled');
                submit2Button.classList.add('submit-inactive');
              }
            }
            updateCodeSubmitButtonState(); // Проверить состояние на старте
            codeInput.addEventListener('input', updateCodeSubmitButtonState); // Проверять при вводе
          }
        
        // Валидация второй формы
        $(formCode).validate({
            rules: {
                code: { required: true, minlength: 6 } // обычно код 6 знаков
            },
            messages: {
                code: { required: "Please enter the code" }
            },
             errorPlacement: function (error, element) {
                error.appendTo(element.parent());
            }
        });

        formCode.addEventListener('submit', async function (event) {
            event.preventDefault();

            if (isSubmitting) return;
            if (!$(formCode).valid()) return;

            isSubmitting = true;
            if (submit2Button) submit2Button.setAttribute('disabled', 'disabled');

            const code = codeInput.value.trim();
            const email = emailInput2 ? emailInput2.value.trim() : (emailInput ? emailInput.value.trim() : '');

            try {
                const userId = getCookieValue('user_id'); 
                const headers = { 'Content-Type': 'application/json' };
                if (userId) headers['user_id'] = userId;

                const response = await fetch('https://of-web-api.objectfirst.com/api/application/webflow/verify', {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({ email, code }),
                    credentials: 'include',
                });

                const result = await response.json();

                if (!response.ok) {
                    if (result.message) {
                        $(formCode).validate().showErrors({ code: result.message });
                    }
                    throw new Error('Code submission failed');
                }
                if (window.formDataToSubmit) {
                  let userId = getCookieValue('user_id') || generateUserId();
                  await submitForm(window.formDataToSubmit, userId);
                }

                // УСПЕХ ПОСЛЕ КОДА
                if (codeFormContainer) codeFormContainer.style.display = 'none';
                if (formFields) formFields.style.display = 'flex';
                if (successMessage) successMessage.style.display = 'block';
                if (blockingBlock) blockingBlock.style.display = 'none';
                if (unlockText) unlockText.style.display = 'flex';
                
                sessionStorage.setItem('formSubmitted', 'true');
                sessionStorage.setItem('videoUnlocked', 'true');

                // DataLayer Push (2FA Success)
                const leadTypeValue = mainForm.querySelector('input[name="lead_type"]:checked')?.value || '';
                const roleValue = leadTypeValue ? leadTypeValue.charAt(0).toUpperCase() + leadTypeValue.slice(1).toLowerCase() : '';
                const phoneNumber = iti ? iti.getNumber() : '';
                const ehashValue = await sha256(email);

                if (window.dataLayer) {
                    window.dataLayer.push({
                        'event': 'lead2fa',
                        'role': roleValue,
                        'type': '',
                        'email': email,
                        'phone': phoneNumber,
                        'lead_id': userId
                    });
                    window.dataLayer.push({
                        'event': 'lead_form_submitted',
                        'role': roleValue,
                        'email': email,
                        'ehash': ehashValue
                    });
                }

            } catch (error) {
                console.error('Error submitting code form:', error);
            } finally {
                isSubmitting = false;
                if (submit2Button) submit2Button.removeAttribute('disabled');
            }
        });
    }

    // --- RESEND CODE BUTTON ---
    if (resendCodeButton) {
        resendCodeButton.addEventListener('click', async function (event) {
            event.preventDefault();
            
            const email = emailInput2 ? emailInput2.value.trim() : (emailInput ? emailInput.value.trim() : '');
            if (!email) {
                alert('Email is missing. Please fill in the email field in the previous step.');
                return;
            }

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
    }

    // 2. ФУНКЦИЯ проверки email (отправляем ТОЛЬКО email)
    async function checkEmailOnly(data, userId) {
      try {
        const headers = {
          'Content-Type': 'application/json',
          'locale': localeHeader
        };
        if (userId) {
          headers['user_id'] = userId;
        }
    
        const response = await fetch('https://of-web-api.objectfirst.com/api/application/verified-webflow', {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(data), // ← ТОЛЬКО email
          credentials: 'include',
        });
    
        const responseData = await response.json();
    
        if (!response.ok) {
          if (responseData.errors && responseData.errors.email) {
            $('#main-form').validate().showErrors({
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

    // Функция отправки данных на сервер (Первичная)
    async function submitForm(data, userId) {
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
                $(mainForm).validate().showErrors({ 'email': responseData.errors.email[0] });
            }
            throw new Error('Server error: ' + JSON.stringify(responseData));
        }
        return responseData;
    }
});
