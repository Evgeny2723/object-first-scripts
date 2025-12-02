document.addEventListener('DOMContentLoaded', function() {
    
    // 1. ГЛОБАЛЬНЫЕ КОНСТАНТЫ И УТИЛИТЫ
    const countryCodeMap = {
        "Australia": "AU", "Austria": "AT", "Azerbaijan": "AZ", "Albania": "AL", "Algeria": "DZ", "Angola": "AO", "Andorra": "AD", "Antigua and Barbuda": "AG", "Argentina": "AR", "Armenia": "AM", "Afghanistan": "AF", "Bahamas": "BS", "Bangladesh": "BD", "Barbados": "BB", "Bahrain": "BH", "Belarus": "BY", "Belize": "BZ", "Belgium": "BE", "Benin": "BJ", "Bulgaria": "BG", "Bolivia": "BO", "Bosnia and Herzegovina": "BA", "Botswana": "BW", "Brazil": "BR", "Brunei Darussalam": "BN", "Burkina Faso": "BF", "Burundi": "BI", "Bhutan": "BT", "Vanuatu": "VU", "Hungary": "HU", "Venezuela": "VE", "Vietnam": "VN", "Gabon": "GA", "Haiti": "HT", "Guyana": "GY", "Gambia": "GM", "Ghana": "GH", "Guatemala": "GT", "Guinea": "GN", "Guinea-Bissau": "GW", "Germany": "DE", "Honduras": "HN", "Grenada": "GD", "Greece": "GR", "Georgia": "GE", "Denmark": "DK", "Congo, Democratic Republic of the": "CD", "Djibouti": "DJ", "Dominica": "DM", "Dominican Republic": "DO", "Egypt": "EG", "Zambia": "ZM", "Zimbabwe": "ZW", "Israel": "IL", "India": "IN", "Indonesia": "ID", "Jordan": "JO", "Iraq": "IQ", "Iran": "IR", "Ireland": "IE", "Iceland": "IS", "Spain": "ES", "Italy": "IT", "Yemen": "YE", "Cabo Verde": "CV", "Kazakhstan": "KZ", "Cambodia": "KH", "Cameroon": "CM", "Canada": "CA", "Qatar": "QA", "Kenya": "KE", "Cyprus": "CY", "Kiribati": "KI", "China": "CN", "Colombia": "CO", "Comoros": "KM", "Congo": "CG", "North Korea": "KP", "Costa Rica": "CR", "Côte d'Ivoire": "CI", "Cuba": "CU", "Kuwait": "KW", "Kyrgyzstan": "KG", "Lao People's Democratic Republic": "LA", "Latvia": "LV", "Lesotho": "LS", "Liberia": "LR", "Lebanon": "LB", "Libya": "LY", "Lithuania": "LT", "Liechtenstein": "LI", "Luxembourg": "LU", "Mauritius": "MU", "Mauritania": "MR", "Madagascar": "MG", "Malawi": "MW", "Malaysia": "MY", "Mali": "ML", "Maldives": "MV", "Malta": "MT", "Morocco": "MA", "Marshall Islands": "MH", "Mexico": "MX", "Mozambique": "MZ", "Monaco": "MC", "Mongolia": "MN", "Myanmar": "MM", "Namibia": "NA", "Nauru": "NR", "Nepal": "NP", "Niger": "NE", "Nigeria": "NG", "Netherlands": "NL", "Nicaragua": "NI", "Niue": "NU", "New Zealand": "NZ", "Norway": "NO", "Tanzania, United Republic of": "TZ", "United Arab Emirates": "AE", "Oman": "OM", "Cook Islands": "CK", "Pakistan": "PK", "Panama": "PA", "Papua New Guinea": "PG", "Paraguay": "PY", "Peru": "PE", "Poland": "PL", "Portugal": "PT", "Korea, Republic of": "KR", "Moldova, Republic of": "MD", "Russian Federation": "RU", "Rwanda": "RW", "Romania": "RO", "El Salvador": "SV", "Samoa": "WS", "San Marino": "SM", "Sao Tome and Principe": "ST", "Saudi Arabia": "SA", "Holy See (Vatican City State)": "VA", "North Macedonia": "MK", "Seychelles": "SC", "Senegal": "SN", "Saint Vincent and the Grenadines": "VC", "Saint Kitts and Nevis": "KN", "Saint Lucia": "LC", "Serbia": "RS", "Singapore": "SG", "Syrian Arab Republic": "SY", "Slovakia": "SK", "Slovenia": "SI", "United Kingdom": "GB", "United States": "US", "Solomon Islands": "SB", "Somalia": "SO", "Sudan": "SD", "Suriname": "SR", "Sierra Leone": "SL", "Tajikistan": "TJ", "Thailand": "TH", "Timor-Leste": "TL", "Togo": "TG", "Tonga": "TO", "Trinidad and Tobago": "TT", "Tuvalu": "TV", "Tunisia": "TN", "Turkmenistan": "TM", "Turkey": "TR", "Uganda": "UG", "Uzbekistan": "UZ", "Ukraine": "UA", "Uruguay": "UY", "Fiji": "FJ", "Philippines": "PH", "Finland": "FI", "France": "FR", "Croatia": "HR", "Central African Republic": "CF", "Chad": "TD", "Montenegro": "ME", "Czech Republic": "CZ", "Chile": "CL", "Switzerland": "CH", "Sweden": "SE", "Sri Lanka": "LK", "Ecuador": "EC", "Equatorial Guinea": "GQ", "Eritrea": "ER", "Eswatini": "SZ", "Estonia": "EE", "Ethiopia": "ET"
    };

    // --- NEW: Add Empty Option & Required Attribute ---
    function initStateSelects() {
        // Находим все селекты штатов (обе формы)
        const allStateSelects = document.querySelectorAll('[id^="p-states-"], [id^="states-"], #p-state, #state-2');
        
        allStateSelects.forEach(sel => {
            // 1. Делаем поле обязательным (jQuery Validate подхватит это, когда поле станет видимым)
            sel.setAttribute('required', 'true');

            // 2. Добавляем пустой пункт в начало, если его нет
            if (!sel.querySelector('option[value=""]')) {
                const opt = document.createElement('option');
                opt.value = "";
                opt.text = "Select State"; // Текст заглушки
                // opt.setAttribute('data-hidden', 'true'); // Можно раскомментировать, если нужно скрыть его из списка выбора после открытия
                sel.prepend(opt);
            }
            
            // 3. Обновляем selectpicker, чтобы он увидел изменения
            $(sel).selectpicker('refresh');
        });
    }
    // Вызываем сразу после объявления
    initStateSelects();
    
    // --- Live Validation for State Selects ---
    // Убирает красную рамку сразу после выбора значения
    $('select[id^="p-states-"], select[id^="states-"], #p-state, #state-2').on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
        $(this).valid(); // Запускаем валидацию конкретного поля при изменении
    });

    // Locale Logic
    const pathSegments = window.location.pathname.split('/').filter(Boolean);
    const pathLocale = pathSegments[0] || '';
    const allowedLocales = ['en', 'de', 'fr', 'es', 'it', 'pt'];
    const localeHeader = allowedLocales.includes(pathLocale) ? pathLocale : 'en';
    let pagePath = window.location.pathname.substring(1);
    if (allowedLocales.includes(pathLocale)) {
        pagePath = pathSegments.slice(1).join('/');
    }

    // Shared Helpers
    async function sha256(message) {
        if (!message) return '';
        const msgBuffer = new TextEncoder().encode(message);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
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
        input.addEventListener('focus', () => label.classList.add('active'));
        input.addEventListener('blur', updateLabelState);
        input.addEventListener('input', updateLabelState);
    }

    function splitFullName(fullName) {
        if (!fullName) return { firstName: '', lastName: '' };
        const nameParts = fullName.trim().split(' ');
        const firstName = nameParts[0] || '';
        // Логика: если >2 слов, берем строго второе слово как фамилию, остальное игнорируем
        if (nameParts.length > 2) {
            return { firstName, lastName: nameParts[1] || '' };
        }
        // Если 1 или 2 слова
        const lastName = nameParts.slice(1).join(' ') || firstName;
        return { firstName, lastName };
    }

    // --- API FUNCTIONS (SHARED) ---

    // 1. Submit Initial Form Data (Verified Webflow Endpoint)
    async function submitFormToVerifiedWebflow(data, userId, formId) {
        const headers = { 'Content-Type': 'application/json', 'locale': localeHeader };
        if (userId) headers['user_id'] = userId;

        const response = await fetch('https://of-web-api.objectfirst.com/api/application/verified-webflow', {
            method: 'POST', headers: headers, body: JSON.stringify(data), credentials: 'include',
        });
        const responseData = await response.json();

        if (!response.ok) {
            if (responseData.errors && responseData.errors.email) {
                if (formId) $(`#${formId}`).validate().showErrors({ 'email': responseData.errors.email[0] });
            }
            throw new Error('Server error: ' + JSON.stringify(responseData));
        }
        return responseData;
    }

    // 2. Submit Verification Code
    async function submitVerificationCode(email, code, userId) {
        const headers = { 'Content-Type': 'application/json' };
        if (userId) headers['user_id'] = userId;

        const response = await fetch('https://of-web-api.objectfirst.com/api/application/webflow/verify', {
            method: 'POST', headers: headers, body: JSON.stringify({ email, code }), credentials: 'include',
        });
        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.message || 'Invalid code.');
        }
        return result;
    }

    // UI Observers
    function addPlaceholder() {
        document.querySelectorAll('.form-control[type="search"]').forEach(function(searchInput) {
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

    // Global Validation Methods
    if ($.validator) {
        $.validator.addMethod("corporate", function(value) {
            return !/@(gmail\.com|yahoo\.com|hotmail\.com|outlook\.com|mail\.ru)$/i.test(value);
        }, "Please enter a valid corporate email address.");
        $.validator.addMethod("validEmailChars", function(value, element) {
            return this.optional(element) || /^[a-zA-Z0-9@.\-_]+$/.test(value);
        }, "Please use only valid characters.");
        $.validator.addMethod("noSpacesOnly", function(value, element) {
            return this.optional(element) || value.trim().length > 0;
        }, "This field cannot contain only spaces.");
    }

    // =========================================================================
    // 2. ФОРМА 1: Whitepaper / Simplified Form (Prefix: p-)
    // =========================================================================
    const pForm = document.getElementById('p-main-form');
    if (pForm) {
        const pCodeForm = document.getElementById('p-code-form');
        const pCodeInput = document.getElementById('p-code');
        const pEmailInput = document.getElementById('p-email');
        const pCountrySelect = document.getElementById('p-country');
        const pSubmitButton = document.getElementById('p-submit');
        const pSubmitButtonCode = document.getElementById('p-submit-code');
        const pMainContainer = document.getElementById('p-main-form-container');
        const pCodeContainer = document.getElementById('p-code-form-container');
        const pSuccessMsg = document.querySelector('.p-success-message');
        const pCheckbox = document.getElementById('p-agreement');
        let pIsSubmitting = false;

        if (pCodeContainer) pCodeContainer.style.display = 'none';

        // Labels
        ['p-full-name', 'p-email', 'p-company', 'p-code', 'p-self-attribution'].forEach(id => handleLabel(document.getElementById(id)));
        $('#p-code').mask('000000');

        // Selectpickers
        $('#p-country').selectpicker();
        $('[id^="p-states-"], #p-state').selectpicker();
        $('[id^="p-states-"], #p-state, #p-country').on('shown.bs.select', function() { $(this).data('selectpicker').$menuInner[0].scrollTop = 0; });

        // Country Logic Form 1
        pCountrySelect.addEventListener('change', function() {
            const selected = this.value;
            
            // Скрываем все
            document.querySelectorAll('[class^="p-states-"], .p-dropdown-state').forEach(el => {
                el.style.display = 'none';
                const s = el.querySelector('select');
                if (s) {
                    s.disabled = true;
                    // Очищаем бордер у скрытых, чтобы при повторном показе не было "красного наследия"
                    $(s).closest('.bootstrap-select').find('.dropdown-toggle').css('border', '');
                    $(s).selectpicker('refresh');
                }
            });
            
            const stateMap = {
                'United States': '.p-dropdown-state', 'Australia': '.p-states-australia', 'Brazil': '.p-states-brazil',
                'Canada': '.p-states-canada', 'China': '.p-states-china', 'Ireland': '.p-states-ireland',
                'India': '.p-states-india', 'Italy': '.p-states-italy', 'Mexico': '.p-states-mexico'
            };

            if (stateMap[selected]) {
                const container = document.querySelector(stateMap[selected]);
                if (container) {
                    container.style.display = 'block';
                    const select = container.querySelector('select');
                    if (select) {
                        select.disabled = false;
                        $(select).val(''); // Выбираем нашу скрытую опцию
                        
                        // 1. Перерисовываем кнопку (создается новый DOM элемент)
                        $(select).selectpicker('refresh');
                        
                        // 2. ЖЕСТКО красим новую кнопку. 
                        // Мы на 100% знаем, что поле сейчас пустое и обязательное.
                        // Не ждем милости от валидатора.
                        $(select).closest('.bootstrap-select').find('.dropdown-toggle').css('border', '1px solid #c50006');
                        
                        // 3. Для порядка обновляем статус валидатора
                        $(select).valid(); 
                    }
                }
            }

            // ... (остальной код для США/чекбоксов тот же) ...
             if (selected === 'United States') {
                document.querySelector('.form-message').style.display = 'none';
                document.querySelector('.form-message_usa').style.display = 'block';
                $(pCheckbox).prop('checked', true).parent().hide();
            } else {
                document.querySelector('.form-message').style.display = 'block';
                document.querySelector('.form-message_usa').style.display = 'none';
                $(pCheckbox).parent().show();
                $(pCheckbox).prop('checked', false).removeAttr('checked');
                $(pCheckbox).parent().find('.w-checkbox-input').removeClass('w--redirected-checked');
            }
            setTimeout(updatePSubmitState, 50);
            $(this).valid(); 
        });

        // IP Detect
        fetch('https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-3627560b-2163-4a62-81db-3a3b5da17d5a/ip/info')
            .then(res => res.json()).then(data => {
                if (data && data.country) {
                    // 1. Устанавливаем страну
                    const opt = [...pCountrySelect.options].find(o => o.value === data.country);
                    if (opt) {
                        opt.selected = true;
                        pCountrySelect.dispatchEvent(new Event('change'));
                        $('#p-country').selectpicker('refresh');

                        // Карта ID полей штатов для разных стран (взято из логики submit)
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

                        // 2. Устанавливаем регион (штат/провинцию), если он пришел и есть поле для этой страны
                        if ((data.state_name || data.state) && stateInputIds[data.country]) {
                            setTimeout(() => {
                                const targetId = stateInputIds[data.country];
                                const stateSelect = document.getElementById(targetId);
                                
                                if (stateSelect) {
                                    const valToFind = data.state_name || data.state;
                                    // Ищем совпадение по значению или тексту
                                    const stateOpt = [...stateSelect.options].find(o => 
                                        o.value.toLowerCase() === valToFind.toLowerCase() || 
                                        o.text.toLowerCase() === valToFind.toLowerCase()
                                    );

                                    if (stateOpt) {
                                        stateOpt.selected = true;
                                        $(`#${targetId}`).selectpicker('refresh'); // Обновляем конкретный select
                                        $(stateSelect).valid(); 
                                    }
                                }
                            }, 100);
                        }
                    }
                }
            }).catch(console.error);

        // Validation - Main
        $('#p-main-form').validate({
            ignore: ":hidden:not(select)",
             onfocusout: function(el) { if ($(el).data('modified')) $(el).valid(); },
             onkeyup: function(el) { $(el).data('modified', true); $(el).valid(); },
             rules: {
                'Full-Name': { required: true, maxlength: 100, noSpacesOnly: true },
                email: { required: true, maxlength: 50, email: true, corporate: true, validEmailChars: true },
                company: { required: true, maxlength: 50, noSpacesOnly: true },
                'self-attribution': { maxlength: 50 },
                agreement: { required: true }
             },
             messages: { 'Full-Name': { required: "This field is required" }, email: { required: "This field is required" }, company: { required: "This field is required" } },
             errorPlacement: function(error, element) { if ($(element).data('modified')) error.appendTo(element.closest(".field-row")); },
             highlight: function(el) {
                 const $el = $(el);
                 // Если это Select (выпадающий список)
                 if ($el.is('select')) {
                     // Красим кнопку bootstrap-select
                     $el.closest('.bootstrap-select').find('.dropdown-toggle').css('border', '1px solid #c50006');
                 } else if ($el.data('modified')) {
                     // Обычные поля
                     $el.css('border', '1px solid #c50006'); 
                 }
             },
             unhighlight: function(el) {
                 const $el = $(el);
                 if ($el.is('select')) {
                     // Убираем обводку у кнопки (возвращаем стандартную)
                     $el.closest('.bootstrap-select').find('.dropdown-toggle').css('border', '');
                 } else {
                     $el.css('border', ''); 
                 }
             },
             onfocusin: function(el) { $(el).data("interacted", true); }
        });

        // Validation - Code
        $('#p-code-form').validate({
            rules: { 'p-code': { required: true, noSpacesOnly: true, minlength: 6 } },
            errorPlacement: function(error, element) { error.appendTo(element.closest(".field-row")); },
            highlight: function(el) { $(el).css('border', '1px solid #c50006'); },
            unhighlight: function(el) { $(el).css('border', ''); }
        });

        // Submit Buttons State
        function updatePSubmitState() {
            const isValid = $('#p-main-form').valid();
            const isCodeValid = $('#p-code-form').valid();
            const country = $('#p-country').val();
            const checked = $(pCheckbox).prop('checked');
            const reqMet = country === 'United States' || checked;

            // Main Button
            const pWrapper = pSubmitButton.closest('.submit-button-wrapper');
            if (isValid && reqMet) {
                $(pSubmitButton).removeAttr('disabled').removeClass('submit-inactive');
                if (pWrapper) pWrapper.classList.remove('button-is-inactive');
            } else {
                $(pSubmitButton).attr('disabled', 'disabled').addClass('submit-inactive');
                if (pWrapper) pWrapper.classList.add('button-is-inactive');
            }
            // Code Button
            if (isCodeValid) $(pSubmitButtonCode).removeAttr('disabled').removeClass('submit-inactive');
            else $(pSubmitButtonCode).attr('disabled', 'disabled').addClass('submit-inactive');
        }

        $('#p-main-form, #p-code-form').on('input change', updatePSubmitState);
        $(pCheckbox).on('change', function() {
            const lbl = $(this).closest('.p-checkbox-field').find('.checkbox-text');
            if ($(this).is(':checked')) lbl.removeClass('error'); else lbl.addClass('error');
            updatePSubmitState();
        });

        // --- SUBMIT: MAIN FORM ---
        pForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            if (pIsSubmitting) return;
            pIsSubmitting = true;
            pSubmitButton.setAttribute('disabled', 'disabled');

            const fd = new FormData(this);
            const { firstName, lastName } = splitFullName(fd.get('Full-Name'));
            
            // State Logic
            let stateVal = '';
            const cVal = fd.get('country');
            const sMapIds = { 'United States': '#p-state', 'Australia': '#p-states-australia', 'Brazil': '#p-states-brazil', 'Canada': '#p-states-canada', 'China': '#p-states-china', 'Ireland': '#p-states-ireland', 'India': '#p-states-india', 'Italy': '#p-states-italy', 'Mexico': '#p-states-mexico' };
            if (sMapIds[cVal]) stateVal = this.querySelector(sMapIds[cVal]).value;

            // Ehash calc
            const email = fd.get('email');
            const ehashValue = await sha256(email);

            const data = {
                firstname: firstName, lastname: lastName, email: email, company: fd.get('company'),
                lead_type: this.querySelector('input[name="lead_type"]:checked')?.value,
                country: cVal, state: stateVal || null, self_attribution: fd.get('self-attribution'),
                href: window.location.href, page: pagePath, ss_anonymous_id: window.segmentstream?.anonymousId?.() ?? '',
                ehash: ehashValue,
                cookie: { _ga: getCookieValue('_ga'), c_of__ga: getCookieValue('c_of__ga'), c_of_utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign') || '' }
            };
            if (cVal !== 'United States' && !stateVal) delete data.state;

            try {
                let userId = getCookieValue('user_id') || generateUserId();
                document.cookie = `user_id=${userId}; path=/; max-age=31536000`;
                const resp = await submitFormToVerifiedWebflow(data, userId, 'p-main-form');

                if (resp.success) {
                    // Success without code
                    pMainContainer.style.display = 'flex'; pCodeContainer.style.display = 'none';
                    pForm.style.display = 'none'; if (pSuccessMsg) pSuccessMsg.style.display = 'block';
                    
                    if (window.dataLayer) {
                        const role = data.lead_type.charAt(0).toUpperCase() + data.lead_type.slice(1).toLowerCase();
                        window.dataLayer.push({ 'event': 'lead2fa', 'role': role, 'email': data.email, 'lead_id': userId });
                        window.dataLayer.push({ 'event': 'lead_form_submitted', 'role': role, 'email': data.email, 'ehash': ehashValue });
                    }
                } else if (resp.errors) {
                    $('#p-main-form').validate().showErrors({ 'email': resp.errors.email[0] });
                } else {
                    // Show Code Form
                    pCodeContainer.style.display = 'block'; pMainContainer.style.display = 'none';
                    document.getElementById('p-email-display').textContent = data.email;
                }
            } catch (err) {
                console.error(err);
                if (pForm) pForm.style.display = 'flex';
                if (pSuccessMsg) pSuccessMsg.style.display = 'none';
            } finally {
                pIsSubmitting = false;
                pSubmitButton.removeAttribute('disabled');
            }
        });

        // --- SUBMIT: CODE FORM ---
        pCodeForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            if (pIsSubmitting || !$(this).valid()) return;
            pIsSubmitting = true;
            pSubmitButtonCode.setAttribute('disabled', 'disabled');

            const code = pCodeInput.value.trim();
            const email = pEmailInput.value.trim();
            const userId = getCookieValue('user_id');

            try {
                await submitVerificationCode(email, code, userId);
                
                // Success
                pCodeContainer.style.display = 'none'; pMainContainer.style.display = 'flex';
                pForm.style.display = 'none'; if (pSuccessMsg) pSuccessMsg.style.display = 'block';

                const lt = document.querySelector('#p-main-form input[name="lead_type"]:checked')?.value || '';
                const role = lt ? lt.charAt(0).toUpperCase() + lt.slice(1).toLowerCase() : '';
                const ehash = await sha256(email);

                if (window.dataLayer) {
                    window.dataLayer.push({ 'event': 'whitepaper', 'role': role, 'email': email, 'lead_id': userId });
                    window.dataLayer.push({ 'event': 'lead_form_submitted', 'role': role, 'email': email, 'ehash': ehash });
                }
            } catch (err) {
                 $(pCodeForm).validate().showErrors({ 'p-code': err.message });
            } finally {
                pIsSubmitting = false;
                pSubmitButtonCode.removeAttribute('disabled');
            }
        });

        // Resend Code
        const pResendBtn = document.getElementById('p-resend-code');
        if (pResendBtn) {
            pResendBtn.addEventListener('click', async function(e) {
                e.preventDefault();
                pResendBtn.disabled = true; pResendBtn.textContent = 'Please wait...';
                setTimeout(() => { pResendBtn.disabled = false; pResendBtn.textContent = 'Resend Code'; }, 30000);
                
                // Trigger submission again (same logic as main form)
                pForm.dispatchEvent(new Event('submit'));
            });
        }
    }

    // =========================================================================
    // 3. ФОРМА 2: Full / Demo Form (No prefix or -2)
    // =========================================================================
    const mForm = document.getElementById('main-form-2');
    if (mForm) {
        const mCodeForm = document.getElementById('code-form');
        const mCodeInput = document.getElementById('code');
        const mEmailInput = document.getElementById('email-2');
        const mPhoneInput = document.getElementById('phone');
        const mCountrySelect = document.getElementById('country-2');
        const mSubmitButtons = document.querySelectorAll('#submit, #submit-2');
        const mSubmitCode = document.querySelector('#submit-code-violet, #submit-code');
        const mMainContainer = document.getElementById('main-form-container');
        const mCodeContainer = document.getElementById('code-form-container');
        const mSuccessMsg = document.querySelector('.success-message');
        const mCheckbox = document.getElementById('agreement');
        let mIsSubmitting = false;

        if (mCodeContainer) mCodeContainer.style.display = 'none';

        // Labels
        ['First-Name', 'Last-Name', 'Job-title', 'email-2', 'company-2', 'phone', 'code', 'self-attribution'].forEach(id => handleLabel(document.getElementById(id)));
        $('#code').mask('000000');

        // Selectpickers
        $('#country-2').selectpicker();
        $('[id^="states-"], #state-2').selectpicker();
        $('[id^="states-"], #state-2, #country-2').on('shown.bs.select', function() { $(this).data('selectpicker').$menuInner[0].scrollTop = 0; });

        // IntlTelInput
        let iti;
        if (mPhoneInput) {
            iti = window.intlTelInput(mPhoneInput, {
                utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
                autoPlaceholder: "aggressive", separateDialCode: true, initialCountry: "auto",
                geoIpLookup: function(success, failure) {
                    fetch('https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-3627560b-2163-4a62-81db-3a3b5da17d5a/ip/info')
                        .then(r => r.json()).then(data => {
                            success(data.iso_code);
                            // 1. Устанавливаем страну
                            const opt = [...mCountrySelect.options].find(o => o.value === data.country);
                            if (opt) { 
                                opt.selected = true; 
                                mCountrySelect.dispatchEvent(new Event('change')); 
                                $('#country-2').selectpicker('refresh');
                                
                                // Карта ID полей штатов для второй формы
                                const stateInputIds = {
                                    'United States': 'state-2',
                                    'Australia': 'states-australia',
                                    'Brazil': 'states-brazil',
                                    'Canada': 'states-canada',
                                    'China': 'states-china',
                                    'Ireland': 'states-ireland',
                                    'India': 'states-india',
                                    'Italy': 'states-italy',
                                    'Mexico': 'states-mexico'
                                };

                                // 2. Устанавливаем регион для любой поддерживаемой страны
                                if ((data.state_name || data.state) && stateInputIds[data.country]) {
                                    setTimeout(() => {
                                        const targetId = stateInputIds[data.country];
                                        const stateSelect = document.getElementById(targetId);
                                        
                                        if (stateSelect) {
                                            const valToFind = data.state_name || data.state;
                                            const stateOpt = [...stateSelect.options].find(o => 
                                                o.value.toLowerCase() === valToFind.toLowerCase() || 
                                                o.text.toLowerCase() === valToFind.toLowerCase()
                                            );

                                            if (stateOpt) {
                                                stateOpt.selected = true;
                                                $(`#${targetId}`).selectpicker('refresh');
                                                $(stateSelect).valid();
                                            }
                                        }
                                    }, 100);
                                }
                            }
                        }).catch(failure);
                }
            });
            mPhoneInput.addEventListener('focus', () => { if(mPhoneInput.nextElementSibling) mPhoneInput.nextElementSibling.classList.add('active'); });
            $.validator.addMethod("phoneCustom", () => iti.isValidNumber(), "Phone number is invalid. Please add your country code, area code and phone number. Your phone number can contain numbers, spaces and these special characters: ( ) - # +");
        }

        // Country Logic Form 2
        mCountrySelect.addEventListener('change', function() {
            const selected = this.value;
            if (iti && countryCodeMap[selected]) iti.setCountry(countryCodeMap[selected]);
            
            document.querySelectorAll('[class^="states-"], .dropdown-state-2').forEach(el => {
                el.style.display = 'none';
                const s = el.querySelector('select');
                if (s) {
                     s.disabled = true; 
                     $(s).closest('.bootstrap-select').find('.dropdown-toggle').css('border', '');
                     $(s).selectpicker('refresh');
                }
            });
            
            const stateMap = { 'United States': '.dropdown-state-2', 'Australia': '.states-australia', 'Brazil': '.states-brazil', 'Canada': '.states-canada', 'China': '.states-china', 'Ireland': '.states-ireland', 'India': '.states-india', 'Italy': '.states-italy', 'Mexico': '.states-mexico' };
            
            if (stateMap[selected]) {
                const container = document.querySelector(stateMap[selected]);
                if (container) {
                    container.style.display = 'block';
                    const select = container.querySelector('select');
                    if (select) {
                        select.disabled = false; 
                        $(select).val(''); 
                        
                        // 1. Перерисовываем
                        $(select).selectpicker('refresh');

                        // 2. ЖЕСТКО красим
                        $(select).closest('.bootstrap-select').find('.dropdown-toggle').css('border', '1px solid #c50006');
                        
                        $(select).valid();
                    }
                }
            }

            // ... (остальной код без изменений) ...
            if (selected === 'United States') {
                document.querySelector('.form-message').style.display = 'none';
                document.querySelector('.form-message_usa').style.display = 'block';
                $(mCheckbox).prop('checked', true).parent().hide();
            } else {
                document.querySelector('.form-message').style.display = 'block';
                document.querySelector('.form-message_usa').style.display = 'none';
                $(mCheckbox).parent().show();
                $(mCheckbox).prop('checked', false).removeAttr('checked');
                $(mCheckbox).parent().find('.w-checkbox-input').removeClass('w--redirected-checked');
            }
            setTimeout(updateMSubmitState, 50);
            $(this).valid();
        });

        // Validation - Main
        $('#main-form-2').validate({
            ignore: ":hidden:not(select)",
            onfocusout: function(el) { if ($(el).data('modified')) $(el).valid(); },
            onkeyup: function(el) { $(el).data('modified', true); $(el).valid(); },
            rules: {
                firstname: { required: true, maxlength: 50, noSpacesOnly: true },
                lastname: { required: true, maxlength: 50, noSpacesOnly: true },
                email: { required: true, maxlength: 50, email: true, corporate: true, validEmailChars: true },
                job_title: { required: true, maxlength: 50, noSpacesOnly: true },
                company: { required: true, maxlength: 50, noSpacesOnly: true },
                phone: { phoneCustom: true },
                'self-attribution': { maxlength: 50 },
                agreement: { required: true }
            },
            messages: { firstname: { required: "This field is required" }, lastname: { required: "This field is required" }, email: { required: "This field is required" }, company: { required: "This field is required" } },
            errorPlacement: function(error, element) { if ($(element).data('modified')) error.appendTo(element.closest(".field-row")); },
            highlight: function(el) { 
                 const $el = $(el);
                 if ($el.is('select')) {
                     // Красим кнопку
                     $el.closest('.bootstrap-select').find('.dropdown-toggle').css('border', '1px solid #c50006');
                 } else if ($el.data('modified')) {
                     $el.css('border', '1px solid #c50006'); 
                 }
            },
            unhighlight: function(el) { 
                 const $el = $(el);
                 if ($el.is('select')) {
                     // Снимаем покраску
                     $el.closest('.bootstrap-select').find('.dropdown-toggle').css('border', '');
                 } else {
                     $el.css('border', ''); 
                 }
            },
            onfocusin: function(el) { $(el).data("interacted", true); }
        });

        // Validation - Code
        $('#code-form').validate({
             rules: { code: { required: true, noSpacesOnly: true, minlength: 6 } },
             errorPlacement: function(error, element) { error.appendTo(element.closest(".field-row")); },
             highlight: function(el) { $(el).css('border', '1px solid #c50006'); },
             unhighlight: function(el) { $(el).css('border', ''); }
        });

        // Submit Button States
        function updateMSubmitState() {
            const isValid = $('#main-form-2').valid();
            const isCodeValid = $('#code-form').valid();
            const country = $('#country-2').val();
            const checked = $(mCheckbox).prop('checked');
            const reqMet = country === 'United States' || checked;

            // Main Buttons
            mSubmitButtons.forEach(btn => {
                const wrapper = btn.closest('.submit-button-wrapper');
                if (isValid && reqMet) {
                    $(btn).removeAttr('disabled').removeClass('submit-inactive');
                    if (wrapper) wrapper.classList.remove('button-is-inactive');
                } else {
                    $(btn).attr('disabled', 'disabled').addClass('submit-inactive');
                    if (wrapper) wrapper.classList.add('button-is-inactive');
                }
            });
            // Code Button
            if (isCodeValid) $(mSubmitCode).removeAttr('disabled').removeClass('submit-inactive');
            else $(mSubmitCode).attr('disabled', 'disabled').addClass('submit-inactive');
        }

        $('#main-form-2, #code-form').on('input change', updateMSubmitState);
        $(mCheckbox).on('change', function() {
             const lbl = $(this).closest('.checkbox-field').find('.checkbox-text');
             if ($(this).is(':checked')) lbl.removeClass('error'); else lbl.addClass('error');
             updateMSubmitState();
        });

        // --- SUBMIT: MAIN FORM ---
        mForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            if (mIsSubmitting || !$(this).valid()) return;
            mIsSubmitting = true;
            mSubmitButtons.forEach(btn => btn.setAttribute('disabled', 'disabled'));

            const fd = new FormData(this);
            const email = fd.get('email');
            const ehashValue = await sha256(email);

             // State Logic
            let stateVal = '';
            const cVal = fd.get('country');
            const sMapIds = { 'United States': '#state-2', 'Australia': '#states-australia', 'Brazil': '#states-brazil', 'Canada': '#states-canada', 'China': '#states-china', 'Ireland': '#states-ireland', 'India': '#states-india', 'Italy': '#states-italy', 'Mexico': '#states-mexico' };
            if (sMapIds[cVal]) stateVal = this.querySelector(sMapIds[cVal]).value;

            const data = {
                firstname: fd.get('firstname'), lastname: fd.get('lastname'), email: email,
                job_title: fd.get('job_title'), company: fd.get('company'),
                phone: iti ? iti.getNumber() : '',
                lead_type: this.querySelector('input[name="lead_type"]:checked')?.value,
                country: cVal, state: stateVal || null, self_attribution: fd.get('self-attribution'),
                href: window.location.href, page: pagePath, ss_anonymous_id: window.segmentstream?.anonymousId?.() ?? '',
                ehash: ehashValue,
                cookie: { _ga: getCookieValue('_ga'), c_of__ga: getCookieValue('c_of__ga'), c_of_utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign') || '' }
            };
            if (cVal !== 'United States' && !stateVal) delete data.state;

             try {
                let userId = getCookieValue('user_id') || generateUserId();
                document.cookie = `user_id=${userId}; path=/; max-age=31536000`;
                const resp = await submitFormToVerifiedWebflow(data, userId, 'main-form-2');

                if (resp.success) {
                    mMainContainer.style.display = 'flex'; mCodeContainer.style.display = 'none';
                    mForm.style.display = 'none'; if (mSuccessMsg) mSuccessMsg.style.display = 'block';

                    if (window.dataLayer) {
                        const role = data.lead_type.charAt(0).toUpperCase() + data.lead_type.slice(1).toLowerCase();
                        window.dataLayer.push({ 'event': 'lead2fa', 'role': role, 'email': data.email, 'phone': data.phone, 'lead_id': userId });
                        window.dataLayer.push({ 'event': 'lead_form_submitted', 'role': role, 'email': data.email, 'ehash': ehashValue });
                    }
                } else if (resp.errors) {
                     $('#main-form-2').validate().showErrors({ 'email': resp.errors.email[0] });
                } else {
                     mCodeContainer.style.display = 'block'; mMainContainer.style.display = 'none';
                     document.getElementById('email-display').textContent = data.email;
                }
             } catch (err) {
                 console.error(err);
                 if (mForm) mForm.style.display = 'flex';
                 if (mSuccessMsg) mSuccessMsg.style.display = 'none';
             } finally {
                 mIsSubmitting = false;
                 mSubmitButtons.forEach(btn => btn.removeAttribute('disabled'));
             }
        });

        // --- SUBMIT: CODE FORM ---
        mCodeForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            if (mIsSubmitting || !$(this).valid()) return;
            mIsSubmitting = true;
            mSubmitCode.setAttribute('disabled', 'disabled');

            const code = mCodeInput.value.trim();
            const email = mEmailInput.value.trim();
            const userId = getCookieValue('user_id');

            try {
                await submitVerificationCode(email, code, userId);

                mCodeContainer.style.display = 'none'; mMainContainer.style.display = 'flex';
                mForm.style.display = 'none'; if (mSuccessMsg) mSuccessMsg.style.display = 'block';

                const lt = document.querySelector('#main-form-2 input[name="lead_type"]:checked')?.value || '';
                const role = lt ? lt.charAt(0).toUpperCase() + lt.slice(1).toLowerCase() : '';
                const phone = iti ? iti.getNumber() : '';
                const ehash = await sha256(email);

                 if (window.dataLayer) {
                    window.dataLayer.push({ 'event': 'lead2fa', 'role': role, 'email': email, 'phone': phone, 'lead_id': userId });
                    window.dataLayer.push({ 'event': 'lead_form_submitted', 'role': role, 'email': email, 'ehash': ehash });
                }
            } catch (err) {
                 $(mCodeForm).validate().showErrors({ code: err.message });
            } finally {
                mIsSubmitting = false;
                mSubmitCode.removeAttribute('disabled');
            }
        });

        // Resend Code
        const mResendBtn = document.getElementById('resend-code');
        if (mResendBtn) {
            mResendBtn.addEventListener('click', function(e) {
                e.preventDefault();
                mResendBtn.disabled = true; mResendBtn.textContent = 'Please wait...';
                setTimeout(() => { mResendBtn.disabled = false; mResendBtn.textContent = 'Resend Code'; }, 30000);
                mForm.dispatchEvent(new Event('submit'));
            });
        }
    }
});
