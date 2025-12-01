document.addEventListener('DOMContentLoaded', function() {
    // =========================================================================
    // 1. ГЛОБАЛЬНЫЕ КОНСТАНТЫ И УТИЛИТЫ
    // =========================================================================
    
    // Карта кодов стран для телефона (ISO -> Dial Code не требуется, intlTelInput сам справляется, 
    // но нужна карта Country Name -> ISO Code для синхронизации селекта и телефона)
    const countryCodeMap = {
        "Australia": "au", "Austria": "at", "Azerbaijan": "az", "Albania": "al", "Algeria": "dz", "Angola": "ao", "Andorra": "ad", "Antigua and Barbuda": "ag", "Argentina": "ar", "Armenia": "am", "Afghanistan": "af", "Bahamas": "bs", "Bangladesh": "bd", "Barbados": "bb", "Bahrain": "bh", "Belarus": "by", "Belize": "bz", "Belgium": "be", "Benin": "bj", "Bulgaria": "bg", "Bolivia": "bo", "Bosnia and Herzegovina": "ba", "Botswana": "bw", "Brazil": "br", "Brunei Darussalam": "bn", "Burkina Faso": "bf", "Burundi": "bi", "Bhutan": "bt", "Vanuatu": "vu", "Hungary": "hu", "Venezuela": "ve", "Vietnam": "vn", "Gabon": "ga", "Haiti": "ht", "Guyana": "gy", "Gambia": "gm", "Ghana": "gh", "Guatemala": "gt", "Guinea": "gn", "Guinea-Bissau": "gw", "Germany": "de", "Honduras": "hn", "Grenada": "gd", "Greece": "gr", "Georgia": "ge", "Denmark": "dk", "Congo, Democratic Republic of the": "cd", "Djibouti": "dj", "Dominica": "dm", "Dominican Republic": "do", "Egypt": "eg", "Zambia": "zm", "Zimbabwe": "zw", "Israel": "il", "India": "in", "Indonesia": "id", "Jordan": "jo", "Iraq": "iq", "Iran": "ir", "Ireland": "ie", "Iceland": "is", "Spain": "es", "Italy": "it", "Yemen": "ye", "Cabo Verde": "cv", "Kazakhstan": "kz", "Cambodia": "kh", "Cameroon": "cm", "Canada": "ca", "Qatar": "qa", "Kenya": "ke", "Cyprus": "cy", "Kiribati": "ki", "China": "cn", "Colombia": "co", "Comoros": "km", "Congo": "cg", "North Korea": "kp", "Costa Rica": "cr", "Côte d'Ivoire": "ci", "Cuba": "cu", "Kuwait": "kw", "Kyrgyzstan": "kg", "Lao People's Democratic Republic": "la", "Latvia": "lv", "Lesotho": "ls", "Liberia": "lr", "Lebanon": "lb", "Libya": "ly", "Lithuania": "lt", "Liechtenstein": "li", "Luxembourg": "lu", "Mauritius": "mu", "Mauritania": "mr", "Madagascar": "mg", "Malawi": "mw", "Malaysia": "my", "Mali": "ml", "Maldives": "mv", "Malta": "mt", "Morocco": "ma", "Marshall Islands": "mh", "Mexico": "mx", "Mozambique": "mz", "Monaco": "mc", "Mongolia": "mn", "Myanmar": "mm", "Namibia": "na", "Nauru": "nr", "Nepal": "np", "Niger": "ne", "Nigeria": "ng", "Netherlands": "nl", "Nicaragua": "ni", "Niue": "nu", "New Zealand": "nz", "Norway": "no", "Tanzania, United Republic of": "tz", "United Arab Emirates": "ae", "Oman": "om", "Cook Islands": "ck", "Pakistan": "pk", "Panama": "pa", "Papua New Guinea": "pg", "Paraguay": "py", "Peru": "pe", "Poland": "pl", "Portugal": "pt", "Korea, Republic of": "kr", "Moldova, Republic of": "md", "Russian Federation": "ru", "Rwanda": "rw", "Romania": "ro", "El Salvador": "sv", "Samoa": "ws", "San Marino": "sm", "Sao Tome and Principe": "st", "Saudi Arabia": "sa", "Holy See (Vatican City State)": "va", "North Macedonia": "mk", "Seychelles": "sc", "Senegal": "sn", "Saint Vincent and the Grenadines": "vc", "Saint Kitts and Nevis": "kn", "Saint Lucia": "lc", "Serbia": "rs", "Singapore": "sg", "Syrian Arab Republic": "sy", "Slovakia": "sk", "Slovenia": "si", "United Kingdom": "gb", "United States": "us", "Solomon Islands": "sb", "Somalia": "so", "Sudan": "sd", "Suriname": "sr", "Sierra Leone": "sl", "Tajikistan": "tj", "Thailand": "th", "Timor-Leste": "tl", "Togo": "tg", "Tonga": "to", "Trinidad and Tobago": "tt", "Tuvalu": "tv", "Tunisia": "tn", "Turkmenistan": "tm", "Turkey": "tr", "Uganda": "ug", "Uzbekistan": "uz", "Ukraine": "ua", "Uruguay": "uy", "Fiji": "fj", "Philippines": "ph", "Finland": "fi", "France": "fr", "Croatia": "hr", "Central African Republic": "cf", "Chad": "td", "Montenegro": "me", "Czech Republic": "cz", "Chile": "cl", "Switzerland": "ch", "Sweden": "se", "Sri Lanka": "lk", "Ecuador": "ec", "Equatorial Guinea": "gq", "Eritrea": "er", "Eswatini": "sz", "Estonia": "ee", "Ethiopia": "et"
    };

    // Карта штатов США (Код -> Название)
    const usStateMap = {
        "AL": "Alabama", "AK": "Alaska", "AZ": "Arizona", "AR": "Arkansas", "CA": "California",
        "CO": "Colorado", "CT": "Connecticut", "DE": "Delaware", "DC": "District of Columbia",
        "FL": "Florida", "GA": "Georgia", "HI": "Hawaii", "ID": "Idaho", "IL": "Illinois",
        "IN": "Indiana", "IA": "Iowa", "KS": "Kansas", "KY": "Kentucky", "LA": "Louisiana",
        "ME": "Maine", "MD": "Maryland", "MA": "Massachusetts", "MI": "Michigan", "MN": "Minnesota",
        "MS": "Mississippi", "MO": "Missouri", "MT": "Montana", "NE": "Nebraska", "NV": "Nevada",
        "NH": "New Hampshire", "NJ": "New Jersey", "NM": "New Mexico", "NY": "New York",
        "NC": "North Carolina", "ND": "North Dakota", "OH": "Ohio", "OK": "Oklahoma", "OR": "Oregon",
        "PA": "Pennsylvania", "RI": "Rhode Island", "SC": "South Carolina", "SD": "South Dakota",
        "TN": "Tennessee", "TX": "Texas", "UT": "Utah", "VT": "Vermont", "VA": "Virginia",
        "WA": "Washington", "WV": "West Virginia", "WI": "Wisconsin", "WY": "Wyoming"
    };

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
        if (nameParts.length > 2) {
            return { firstName, lastName: nameParts[1] || '' };
        }
        const lastName = nameParts.slice(1).join(' ') || firstName;
        return { firstName, lastName };
    }

    // --- API FUNCTIONS ---
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

    // Validation Methods
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
        
        // --- ОБНОВЛЕННЫЙ ТЕКСТ ВАЛИДАЦИИ ТЕЛЕФОНА ---
        $.validator.addMethod("phoneCustom", function(value, element) {
             if (window.intlTelInputGlobals && $(element).data('intlTelInput')) {
                return $(element).intlTelInput("isValidNumber");
            }
            return true; 
        }, "Phone number is invalid. Please add your country code, area code and phone number. Your phone number can contain numbers, spaces and these special characters: ( ) - # +");
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

        ['p-full-name', 'p-email', 'p-company', 'p-code', 'p-self-attribution'].forEach(id => handleLabel(document.getElementById(id)));
        $('#p-code').mask('000000');

        $('#p-country').selectpicker();
        $('[id^="p-states-"], #p-state').selectpicker();
        $('[id^="p-states-"], #p-state, #p-country').on('shown.bs.select', function() { $(this).data('selectpicker').$menuInner[0].scrollTop = 0; });

        // Map Country to Specific State Select ID for Form 1
        const pStateSelectMap = {
            'United States': '#p-state',
            'Australia': '#p-states-australia',
            'Brazil': '#p-states-brazil',
            'Canada': '#p-states-canada',
            'China': '#p-states-china',
            'Ireland': '#p-states-ireland',
            'India': '#p-states-india',
            'Italy': '#p-states-italy',
            'Mexico': '#p-states-mexico'
        };

        // Country Logic Form 1
        pCountrySelect.addEventListener('change', function() {
            const selected = this.value;
            // Hide all
            document.querySelectorAll('[class^="p-states-"], .p-dropdown-state').forEach(el => el.style.display = 'none');
            
            // Show relevant wrapper
            const wrapperMap = {
                'United States': '.p-dropdown-state', 'Australia': '.p-states-australia', 'Brazil': '.p-states-brazil',
                'Canada': '.p-states-canada', 'China': '.p-states-china', 'Ireland': '.p-states-ireland',
                'India': '.p-states-india', 'Italy': '.p-states-italy', 'Mexico': '.p-states-mexico'
            };
            if (wrapperMap[selected]) {
                document.querySelector(wrapperMap[selected]).style.display = 'block';
                
                // --- Reset specific state dropdown for ALL countries to avoid defaults ---
                const selector = pStateSelectMap[selected];
                if (selector) {
                     // Only reset if value is not already set (prevents clearing if IP detect just set it)
                     if (!$(selector).val()) {
                         $(selector).val('').selectpicker('refresh');
                     }
                }
            }

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

        // IP Detect & Set State Logic
        fetch('https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-3627560b-2163-4a62-81db-3a3b5da17d5a/ip/info')
            .then(res => res.json()).then(data => {
                if (data && data.country) {
                    const opt = [...pCountrySelect.options].find(o => o.value === data.country);
                    if (opt) {
                        // 1. Set Country Value
                        $(pCountrySelect).selectpicker('val', data.country);
                        
                        // 2. Identify State Logic
                        const stateSelector = pStateSelectMap[data.country];
                        
                        // 3. Try Auto-Select State BEFORE triggering change (so change handler doesn't wipe it)
                        let stateSet = false;
                        if (stateSelector && (data.region || data.region_code)) {
                             const regionCode = data.region || data.region_code;
                             const regionName = (data.country === 'United States' && usStateMap[regionCode]) ? usStateMap[regionCode] : regionCode;
                             
                             const stateSelectEl = document.querySelector(stateSelector);
                             const stateOpt = [...stateSelectEl.options].find(o => 
                                o.value === regionName || o.text === regionName || 
                                o.value === regionCode || o.text === regionCode
                             );

                             if (stateOpt) {
                                $(stateSelector).selectpicker('val', stateOpt.value);
                                stateSet = true;
                             }
                        }
                        
                        // 4. Trigger Change to Update UI (Show/Hide Fields)
                        // Important: We manually trigger change so visual logic runs
                        $(pCountrySelect).trigger('change'); 

                        // 5. If state wasn't set by IP, ensure it's empty (Reset)
                        if (stateSelector && !stateSet) {
                            $(stateSelector).val('').selectpicker('refresh');
                        }
                    }
                }
            }).catch(console.error);

        $('#p-main-form').validate({
             onfocusout: function(el) { if ($(el).data('modified')) $(el).valid(); },
             onkeyup: function(el) { $(el).data('modified', true); $(el).valid(); },
             rules: {
                'Full-Name': { required: true, maxlength: 100, noSpacesOnly: true },
                email: { required: true, maxlength: 50, email: true, corporate: true, validEmailChars: true },
                company: { required: true, maxlength: 50, noSpacesOnly: true },
                'self-attribution': { maxlength: 50 },
                agreement: { required: function(el) { return $('#p-country').val() !== 'United States' && $(el).is(':visible'); } }
             },
             messages: { 'Full-Name': { required: "This field is required" }, email: { required: "This field is required" }, company: { required: "This field is required" } },
             errorPlacement: function(error, element) { if ($(element).data('modified')) error.appendTo(element.closest(".field-row")); },
             highlight: function(el) { if ($(el).data('modified')) $(el).css('border', '1px solid #c50006'); },
             unhighlight: function(el) { $(el).css('border', ''); },
             onfocusin: function(el) { $(el).data("interacted", true); }
        });

        $('#p-code-form').validate({
            rules: { 'p-code': { required: true, noSpacesOnly: true, minlength: 6 } },
            errorPlacement: function(error, element) { error.appendTo(element.closest(".field-row")); },
            highlight: function(el) { $(el).css('border', '1px solid #c50006'); },
            unhighlight: function(el) { $(el).css('border', ''); }
        });

        function updatePSubmitState() {
            const isValid = $('#p-main-form').valid();
            const isCodeValid = $('#p-code-form').valid();
            const country = $('#p-country').val();
            const checked = $(pCheckbox).prop('checked');
            const reqMet = country === 'United States' || checked;

            const pWrapper = pSubmitButton.closest('.submit-button-wrapper');
            if (isValid && reqMet) {
                $(pSubmitButton).removeAttr('disabled').removeClass('submit-inactive');
                if (pWrapper) pWrapper.classList.remove('button-is-inactive');
            } else {
                $(pSubmitButton).attr('disabled', 'disabled').addClass('submit-inactive');
                if (pWrapper) pWrapper.classList.add('button-is-inactive');
            }
            if (isCodeValid) $(pSubmitButtonCode).removeAttr('disabled').removeClass('submit-inactive');
            else $(pSubmitButtonCode).attr('disabled', 'disabled').addClass('submit-inactive');
        }

        $('#p-main-form, #p-code-form').on('input change', updatePSubmitState);
        $(pCheckbox).on('change', function() {
            const lbl = $(this).closest('.p-checkbox-field').find('.checkbox-text');
            if ($(this).is(':checked')) lbl.removeClass('error'); else lbl.addClass('error');
            updatePSubmitState();
        });

        pForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            if (pIsSubmitting) return;
            pIsSubmitting = true;
            pSubmitButton.setAttribute('disabled', 'disabled');

            const fd = new FormData(this);
            const { firstName, lastName } = splitFullName(fd.get('Full-Name'));
            
            let stateVal = '';
            const cVal = fd.get('country');
            const sMapIds = { 'United States': '#p-state', 'Australia': '#p-states-australia', 'Brazil': '#p-states-brazil', 'Canada': '#p-states-canada', 'China': '#p-states-china', 'Ireland': '#p-states-ireland', 'India': '#p-states-india', 'Italy': '#p-states-italy', 'Mexico': '#p-states-mexico' };
            if (sMapIds[cVal]) stateVal = this.querySelector(sMapIds[cVal]).value;

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
                
                pCodeContainer.style.display = 'none'; pMainContainer.style.display = 'flex';
                pForm.style.display = 'none'; if (pSuccessMsg) pSuccessMsg.style.display = 'block';

                const lt = document.querySelector('#p-main-form input[name="lead_type"]:checked')?.value || '';
                const role = lt ? lt.charAt(0).toUpperCase() + lt.slice(1).toLowerCase() : '';
                const ehash = await sha256(email);

                if (window.dataLayer) {
                    window.dataLayer.push({ 'event': 'lead2fa', 'role': role, 'email': email, 'lead_id': userId });
                    window.dataLayer.push({ 'event': 'lead_form_submitted', 'role': role, 'email': email, 'ehash': ehash });
                }
            } catch (err) {
                 $(pCodeForm).validate().showErrors({ 'p-code': err.message });
            } finally {
                pIsSubmitting = false;
                pSubmitButtonCode.removeAttribute('disabled');
            }
        });

        const pResendBtn = document.getElementById('p-resend-code');
        if (pResendBtn) {
            pResendBtn.addEventListener('click', async function(e) {
                e.preventDefault();
                pResendBtn.disabled = true; pResendBtn.textContent = 'Please wait...';
                setTimeout(() => { pResendBtn.disabled = false; pResendBtn.textContent = 'Resend Code'; }, 30000);
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

        ['First-Name', 'Last-Name', 'Job-title', 'email-2', 'company-2', 'phone', 'code', 'self-attribution'].forEach(id => handleLabel(document.getElementById(id)));
        $('#code').mask('000000');

        $('#country-2').selectpicker();
        $('[id^="states-"], #state-2').selectpicker();
        $('[id^="states-"], #state-2, #country-2').on('shown.bs.select', function() { $(this).data('selectpicker').$menuInner[0].scrollTop = 0; });

        // Map Country to Specific State Select ID for Form 2
        const mStateSelectMap = {
            'United States': '#state-2',
            'Australia': '#states-australia',
            'Brazil': '#states-brazil',
            'Canada': '#states-canada',
            'China': '#states-china',
            'Ireland': '#states-ireland',
            'India': '#states-india',
            'Italy': '#states-italy',
            'Mexico': '#states-mexico'
        };

        let iti;
        if (mPhoneInput) {
            iti = window.intlTelInput(mPhoneInput, {
                utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
                autoPlaceholder: "aggressive", separateDialCode: true, initialCountry: "auto",
                geoIpLookup: function(success, failure) {
                    fetch('https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-3627560b-2163-4a62-81db-3a3b5da17d5a/ip/info')
                        .then(r => r.json()).then(data => {
                            success(data.iso_code);
                            const opt = [...mCountrySelect.options].find(o => o.value === data.country);
                            if (opt) { 
                                // 1. Set Country
                                $(mCountrySelect).selectpicker('val', data.country);
                                
                                // 2. State Logic
                                const stateSelector = mStateSelectMap[data.country];
                                let stateSet = false;

                                if (stateSelector && (data.region || data.region_code)) {
                                     const regionCode = data.region || data.region_code;
                                     const regionName = (data.country === 'United States' && usStateMap[regionCode]) ? usStateMap[regionCode] : regionCode;
                                     const stateSelectEl = document.querySelector(stateSelector);
                                     const stateOpt = [...stateSelectEl.options].find(o => o.value === regionName || o.text === regionName || o.value === regionCode || o.text === regionCode);
                                     
                                     if (stateOpt) {
                                         $(stateSelector).selectpicker('val', stateOpt.value);
                                         stateSet = true;
                                     }
                                }

                                // 3. Trigger Change to Show Fields
                                $(mCountrySelect).trigger('change'); 

                                // 4. Reset if empty
                                if (stateSelector && !stateSet) {
                                    $(stateSelector).val('').selectpicker('refresh');
                                }
                            }
                        }).catch(failure);
                }
            });
            mPhoneInput.addEventListener('focus', () => { if(mPhoneInput.nextElementSibling) mPhoneInput.nextElementSibling.classList.add('active'); });
            
            // Assign intlTelInput instance to DOM element for validation access
            $(mPhoneInput).data('intlTelInput', iti);
        }

        // Country Logic Form 2
        mCountrySelect.addEventListener('change', function() {
            const selected = this.value;
            if (iti && countryCodeMap[selected]) iti.setCountry(countryCodeMap[selected]);
            
            document.querySelectorAll('[class^="states-"], .dropdown-state-2').forEach(el => el.style.display = 'none');
            const wrapperMap = { 'United States': '.dropdown-state-2', 'Australia': '.states-australia', 'Brazil': '.states-brazil', 'Canada': '.states-canada', 'China': '.states-china', 'Ireland': '.states-ireland', 'India': '.states-india', 'Italy': '.states-italy', 'Mexico': '.states-mexico' };
            if (wrapperMap[selected]) {
                document.querySelector(wrapperMap[selected]).style.display = 'block';

                // --- Reset specific state dropdown for ALL countries ---
                const selector = mStateSelectMap[selected];
                if (selector) {
                    if (!$(selector).val()) {
                        $(selector).val('').selectpicker('refresh');
                    }
                }
            }

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

        $('#main-form-2').validate({
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
                agreement: { required: function(el) { return $('#country-2').val() !== 'United States' && $(el).is(':visible'); } }
            },
            messages: { firstname: { required: "This field is required" }, lastname: { required: "This field is required" }, email: { required: "This field is required" }, company: { required: "This field is required" } },
            errorPlacement: function(error, element) { if ($(element).data('modified')) error.appendTo(element.closest(".field-row")); },
            highlight: function(el) { if ($(el).data('modified')) $(el).css('border', '1px solid #c50006'); },
            unhighlight: function(el) { $(el).css('border', ''); },
            onfocusin: function(el) { $(el).data("interacted", true); }
        });

        $('#code-form').validate({
             rules: { code: { required: true, noSpacesOnly: true, minlength: 6 } },
             errorPlacement: function(error, element) { error.appendTo(element.closest(".field-row")); },
             highlight: function(el) { $(el).css('border', '1px solid #c50006'); },
             unhighlight: function(el) { $(el).css('border', ''); }
        });

        function updateMSubmitState() {
            const isValid = $('#main-form-2').valid();
            const isCodeValid = $('#code-form').valid();
            const country = $('#country-2').val();
            const checked = $(mCheckbox).prop('checked');
            const reqMet = country === 'United States' || checked;

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
            if (isCodeValid) $(mSubmitCode).removeAttr('disabled').removeClass('submit-inactive');
            else $(mSubmitCode).attr('disabled', 'disabled').addClass('submit-inactive');
        }

        $('#main-form-2, #code-form').on('input change', updateMSubmitState);
        $(mCheckbox).on('change', function() {
             const lbl = $(this).closest('.checkbox-field').find('.checkbox-text');
             if ($(this).is(':checked')) lbl.removeClass('error'); else lbl.addClass('error');
             updateMSubmitState();
        });

        mForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            if (mIsSubmitting || !$(this).valid()) return;
            mIsSubmitting = true;
            mSubmitButtons.forEach(btn => btn.setAttribute('disabled', 'disabled'));

            const fd = new FormData(this);
            const email = fd.get('email');
            const ehashValue = await sha256(email);

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
