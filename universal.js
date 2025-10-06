document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.main-form[data-universal-form]').forEach(form => {
    // ---- ЭЛЕМЕНТЫ ----
    const fullNameInput = form.querySelector('#Full-Name');
    const firstNameInput = form.querySelector('#First-Name');
    const lastNameInput = form.querySelector('#Last-Name');
    const jobTitleInput = form.querySelector('#Job-title');
    const emailInput = form.querySelector('#email');
    const companyInput = form.querySelector('#company');
    const countrySelect = form.querySelector('#country');
    const phoneInput = form.querySelector('#phone');
    const submitButton = form.querySelector('.form-submit');
    const checkbox = form.querySelector('#agreement');
    const extraCheckbox = form.querySelector('#agreement-2');
    const formMessageDiv = form.querySelector('.form-message');
    const formMessageUSADiv = form.querySelector('.form-message_usa');
    const submitButtonWrapper = submitButton ? submitButton.closest('.submit-button-wrapper') : null;
    const successMessage = form.querySelector('.w-form-done, #success-message');
    let isSubmitting = false;

    // ---- МАППИНГ КОДОВ СТРАН ----
    const countryCodeMap = {
      "Australia": "AU","Austria": "AT","Azerbaijan": "AZ","Albania": "AL","Algeria": "DZ","Angola": "AO","Andorra": "AD","Antigua and Barbuda": "AG","Argentina": "AR","Armenia": "AM","Afghanistan": "AF","Bahamas": "BS","Bangladesh": "BD","Barbados": "BB","Bahrain": "BH","Belarus": "BY","Belize": "BZ","Belgium": "BE","Benin": "BJ","Bulgaria": "BG","Bolivia": "BO","Bosnia and Herzegovina": "BA","Botswana": "BW","Brazil": "BR","Brunei Darussalam": "BN","Burkina Faso": "BF","Burundi": "BI","Bhutan": "BT","Vanuatu": "VU","Hungary": "HU","Venezuela": "VE","Vietnam": "VN","Gabon": "GA","Haiti": "HT","Guyana": "GY","Gambia": "GM","Ghana": "GH","Guatemala": "GT","Guinea": "GN","Guinea-Bissau": "GW","Germany": "DE","Honduras": "HN","Grenada": "GD","Greece": "GR","Georgia": "GE","Denmark": "DK","Congo, Democratic Republic of the": "CD","Djibouti": "DJ","Dominica": "DM","Dominican Republic": "DO","Egypt": "EG","Zambia": "ZM","Zimbabwe": "ZW","Israel": "IL","India": "IN","Indonesia": "ID","Jordan": "JO","Iraq": "IQ","Iran": "IR","Ireland": "IE","Iceland": "IS","Spain": "ES","Italy": "IT","Yemen": "YE","Cabo Verde": "CV","Kazakhstan": "KZ","Cambodia": "KH","Cameroon": "CM","Canada": "CA","Qatar": "QA","Kenya": "KE","Cyprus": "CY","Kiribati": "KI","China": "CN","Colombia": "CO","Comoros": "KM","Congo": "CG","North Korea": "KP","Costa Rica": "CR","Côte d'Ivoire": "CI","Cuba": "CU","Kuwait": "KW","Kyrgyzstan": "KG","Lao People's Democratic Republic": "LA","Latvia": "LV","Lesotho": "LS","Liberia": "LR","Lebanon": "LB","Libya": "LY","Lithuania": "LT","Liechtenstein": "LI","Luxembourg": "LU","Mauritius": "MU","Mauritania": "MR","Madagascar": "MG","Malawi": "MW","Malaysia": "MY","Mali": "ML","Maldives": "MV","Malta": "MT","Morocco": "MA","Marshall Islands": "MH","Mexico": "MX","Mozambique": "MZ","Monaco": "MC","Mongolia": "MN","Myanmar": "MM","Namibia": "NA","Nauru": "NR","Nepal": "NP","Niger": "NE","Nigeria": "NG","Netherlands": "NL","Nicaragua": "NI","Niue": "NU","New Zealand": "NZ","Norway": "NO","Tanzania, United Republic of": "TZ","United Arab Emirates": "AE","Oman": "OM","Cook Islands": "CK","Pakistan": "PK","Panama": "PA","Papua New Guinea": "PG","Paraguay": "PY","Peru": "PE","Poland": "PL","Portugal": "PT","Korea, Republic of": "KR","Moldova, Republic of": "MD","Russian Federation": "RU","Rwanda": "RW","Romania": "RO","El Salvador": "SV","Samoa": "WS","San Marino": "SM","Sao Tome and Principe": "ST","Saudi Arabia": "SA","Holy See (Vatican City State)": "VA","North Macedonia": "MK","Seychelles": "SC","Senegal": "SN","Saint Vincent and the Grenadines": "VC","Saint Kitts and Nevis": "KN","Saint Lucia": "LC","Serbia": "RS","Singapore": "SG","Syrian Arab Republic": "SY","Slovakia": "SK","Slovenia": "SI","United Kingdom": "GB","United States": "US","Solomon Islands": "SB","Somalia": "SO","Sudan": "SD","Suriname": "SR","Sierra Leone": "SL","Tajikistan": "TJ","Thailand": "TH","Timor-Leste": "TL","Togo": "TG","Tonga": "TO","Trinidad and Tobago": "TT","Tuvalu": "TV","Tunisia": "TN","Turkmenistan": "TM","Turkey": "TR","Uganda": "UG","Uzbekistan": "UZ","Ukraine": "UA","Uruguay": "UY","Fiji": "FJ","Philippines": "PH","Finland": "FI","France": "FR","Croatia": "HR","Central African Republic": "CF","Chad": "TD","Montenegro": "ME","Czech Republic": "CZ","Chile": "CL","Switzerland": "CH","Sweden": "SE","Sri Lanka": "LK","Ecuador": "EC","Equatorial Guinea": "GQ","Eritrea": "ER","Eswatini": "SZ","Estonia": "EE","Ethiopia": "ET"
    };

    // --- STATE SELECTORS ---
    function setStateDropdown(selectedCountry) {
      const map = {
        'United States': '.dropdown-state',
        'Australia': '.states-australia',
        'Brazil': '.states-brazil',
        'Canada': '.states-canada',
        'China': '.states-china',
        'Ireland': '.states-ireland',
        'India': '.states-india',
        'Italy': '.states-italy',
        'Mexico': '.states-mexico'
      };
      form.querySelectorAll('.dropdown-state, .states-australia, .states-brazil, .states-canada, .states-china, .states-ireland, .states-india, .states-italy, .states-mexico')
        .forEach(dd => dd && (dd.style.display = 'none'));
      if (map[selectedCountry]) {
        const block = form.querySelector(map[selectedCountry]);
        if (block) block.style.display = 'block';
      }
    }
    if (countrySelect) {
      countrySelect.addEventListener('change', function(){
        setStateDropdown(this.value);
        if(phoneInput && iti && countryCodeMap[this.value]) iti.setCountry(countryCodeMap[this.value]);
        toggleCountrySpecificElements(this.value);
      });
      setStateDropdown(countrySelect.value);
    }

    // --- intlTelInput ---
    let iti = null;
    if (phoneInput && window.intlTelInput) {
      iti = window.intlTelInput(phoneInput, {
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
        autoPlaceholder: "aggressive",
        separateDialCode: true,
        initialCountry: "auto",
        geoIpLookup: function(success, failure) {
          fetch('https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-3627560b-2163-4a62-81db-3a3b5da17d5a/ip/info')
            .then(r=>r.json()).then(data=>{
              if(data && data.iso_code) success(data.iso_code);
              else failure();
            }).catch(failure);
        }
      });
    } else if (countrySelect) {
      fetch('https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-3627560b-2163-4a62-81db-3a3b5da17d5a/ip/info')
        .then(r=>r.json()).then(data=>{
          if (data && data.country) {
            const opt = [...countrySelect.options].find(o=>o.value===data.country);
            if (opt) { opt.selected = true; countrySelect.dispatchEvent(new Event('change')); }
          }
        }).catch(()=>{});
    }

    // --- ВАЛИДАЦИЯ ---
    function validateForm() {
      let valid = true;
      let errorFields = [];
      function err(input, msg) {
        valid = false;
        input.classList.add('has-error');
        input.setCustomValidity && input.setCustomValidity(msg);
        errorFields.push(input);
      }
      function clearerr(input) {
        input.classList.remove('has-error'); input.setCustomValidity && input.setCustomValidity('');
      }
      if (fullNameInput && (!fullNameInput.value.trim() || fullNameInput.value.length>50))
        err(fullNameInput, 'Full name is required (max 50 chars)');
      if (firstNameInput && (!firstNameInput.value.trim() || firstNameInput.value.length>50))
        err(firstNameInput, 'First name required');
      if (lastNameInput && (!lastNameInput.value.trim() || lastNameInput.value.length>50))
        err(lastNameInput, 'Last name required');
      if (jobTitleInput && (!jobTitleInput.value.trim() || jobTitleInput.value.length>50))
        err(jobTitleInput, 'Job title is required');

      // Email
      if (emailInput) {
        const email = emailInput.value.trim();
        if (!email)      err(emailInput, 'Email is required');
        else if (email.length>50) err(emailInput, 'Max 50 characters');
        else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) err(emailInput, 'Invalid email address');
        else if (/@(gmail\.com|yahoo\.com|hotmail\.com|outlook\.com|mail\.ru)$/i.test(email)) err(emailInput,"Enter corporate email");
        else if (!/^[a-zA-Z0-9@.\-_]+$/.test(email)) err(emailInput,"Invalid chars in email");
      }

      if(companyInput && (!companyInput.value.trim() || companyInput.value.length>50))
        err(companyInput, 'Company is required');

      if(phoneInput && phoneInput.value.trim()) {
        if (iti) { if (!iti.isValidNumber()) err(phoneInput, 'Phone is invalid'); }
        else if (!/^[0-9\s()+#\-]+$/.test(phoneInput.value)) err(phoneInput, 'Invalid phone chars');
      }

      const selectedCountry = countrySelect && countrySelect.value;
      if ((checkbox && selectedCountry !== 'United States' && !checkbox.checked) ||
         (extraCheckbox && !extraCheckbox.checked)) {
        if (checkbox && selectedCountry !== 'United States' && !checkbox.checked) err(checkbox, 'This is required');
        if (extraCheckbox && !extraCheckbox.checked) err(extraCheckbox, 'This is required');
      }
      errorFields.forEach(f=>{
        f.addEventListener('input', ()=>clearerr(f), {once:true});
      });
      return valid;
    }

    // --- ЧЕКБОКСЫ, КНОПКИ, LABELЫ ---
    function switchCheckboxState(){
      if (!checkbox) return;
      const label = checkbox.closest('.checkbox-field') && checkbox.closest('.checkbox-field').querySelector('.checkbox-text');
      if (!label) return;
      if (checkbox.checked) label.classList.remove('error');
      else label.classList.add('error');
    }
    if (checkbox) checkbox.addEventListener('change', switchCheckboxState);
    if (extraCheckbox) extraCheckbox.addEventListener('change', switchCheckboxState);

    function toggleCountrySpecificElements(selectedCountry) {
      if (!checkbox) return;
      resetCheckbox();
      if (selectedCountry === 'United States') {
        if (formMessageDiv) formMessageDiv.style.display = 'none';
        if (formMessageUSADiv) formMessageUSADiv.style.display = 'block';
        checkbox.checked = true; checkbox.parentElement.style.display = 'none';
      } else {
        if (formMessageDiv) formMessageDiv.style.display = 'block';
        if (formMessageUSADiv) formMessageUSADiv.style.display = 'none';
        checkbox.checked = false; checkbox.parentElement.style.display = '';
      }
      setTimeout(updateSubmitButtonState, 50);
    }
    function resetCheckbox() {
      if (checkbox) { checkbox.checked = false; checkbox.removeAttribute('checked'); }
      if (checkbox && checkbox.parentElement.querySelector('.w-checkbox-input'))
        checkbox.parentElement.querySelector('.w-checkbox-input').classList.remove('w--redirected-checked');
    }
    function updateSubmitButtonState() {
      if(validateForm()){
        submitButton && submitButton.removeAttribute('disabled');
        submitButtonWrapper && submitButtonWrapper.classList.remove('button-is-inactive');
      } else {
        submitButton && submitButton.setAttribute('disabled','disabled');
        submitButtonWrapper && submitButtonWrapper.classList.add('button-is-inactive');
      }
    }
    ['input','change'].forEach(ev => form.addEventListener(ev, updateSubmitButtonState));

    // --- HONEYPOT TRACK ---
    let formInteractionStartTime = 0, decoyLinkClicked = false;
    form.addEventListener('input', ()=>{ if (formInteractionStartTime === 0) formInteractionStartTime = Date.now(); }, {once:true});
    const decoyLink = form.querySelector('#optional-link');
    if (decoyLink) decoyLink.addEventListener('click', e=>{ e.preventDefault(); decoyLinkClicked=true; });

    function replaceConfusableChars(str) {
      if (typeof str !== 'string') return str;
      return str.replace(/e/g, '\u0435').replace(/a/g, '\u0430');
    }

    // --- SUBMIT ---
    form.addEventListener('submit', async function(event) {
      event.preventDefault();
      if (isSubmitting) return;
      if (!validateForm()) return;
      isSubmitting = true;
      submitButton && submitButton.setAttribute('disabled', 'disabled');

      const formData = new FormData(form);
      let junk_lead = false, junk_reason = null, junk_context = null;
      const formFillingTime = formInteractionStartTime > 0 ? (Date.now() - formInteractionStartTime) / 1000 : 999;

      const confirmEmailValue = formData.get(replaceConfusableChars('confirm-email')) || '';
      const cityValue = formData.get('city') || '';
      if (confirmEmailValue.length > 0 || cityValue.length > 0) {
        junk_context = {email: confirmEmailValue||null, city: cityValue||null};
        junk_lead = true; junk_reason = 1;
      }
      else if (decoyLinkClicked)   { junk_lead = true; junk_reason = 2;}
      else if (formFillingTime<0.5){ junk_lead = true; junk_reason = 3;}

      let firstName = '', lastName = '';
      if (fullNameInput) {
        const nameParts = fullNameInput.value.trim().split(' ');
        firstName = nameParts[0] || '';
        lastName = nameParts.slice(1).join(' ') || '';
        if (nameParts.length === 1) lastName = firstName;
        if (nameParts.length > 2) lastName = nameParts[1] || '';
      } else if (firstNameInput && lastNameInput) {
        firstName = firstNameInput.value.trim(); lastName = lastNameInput.value.trim();
      }
      const selectedCountry = countrySelect ? countrySelect.value : '';
      let stateValue = '';
      if (selectedCountry === 'United States')      stateValue = (form.querySelector('#state')||{}).value;
      else if (selectedCountry === 'Australia')     stateValue = (form.querySelector('#states-australia')||{}).value;
      else if (selectedCountry === 'Brazil')        stateValue = (form.querySelector('#states-brazil')||{}).value;
      else if (selectedCountry === 'Canada')        stateValue = (form.querySelector('#states-canada')||{}).value;
      else if (selectedCountry === 'China')         stateValue = (form.querySelector('#states-china')||{}).value;
      else if (selectedCountry === 'Ireland')       stateValue = (form.querySelector('#states-ireland')||{}).value;
      else if (selectedCountry === 'India')         stateValue = (form.querySelector('#states-india')||{}).value;
      else if (selectedCountry === 'Italy')         stateValue = (form.querySelector('#states-italy')||{}).value;
      else if (selectedCountry === 'Mexico')        stateValue = (form.querySelector('#states-mexico')||{}).value;

      const payload = {
        firstname : firstName,
        lastname  : lastName,
        email     : emailInput ? emailInput.value.trim() : '',
        job_title : jobTitleInput ? jobTitleInput.value.trim() : '',
        company   : companyInput ? companyInput.value.trim() : '',
        phone     : iti ? iti.getNumber() : (phoneInput ? phoneInput.value.trim() : ''),
        country   : selectedCountry,
        state     : stateValue||null,
        lead_type : (form.querySelector('input[name="lead_type"]:checked')||{}).value,
        href      : window.location.href,
        page      : window.location.pathname.substring(1),
        junk_lead,
        of_form_duration: formFillingTime,
        junk_reason,
        junk_context,
        ss_anonymous_id: window.segmentstream?.anonymousId?.() ?? ''
      };

      try {
        const res = await fetch('https://of-web-api.objectfirst.com/api/application/webflow', {
          method: 'POST', headers: {'Content-Type':'application/json'},
          body: JSON.stringify(payload), credentials: 'include'
        });
        const responseData = await res.json();

        if(window.dataLayer) window.dataLayer.push({
          'event':    form.getAttribute('data-datalayer-event') || 'demo',
          'role':     (payload.lead_type || '').replace(/^./,s=>s.toUpperCase()),
          'type':     '',
          'email':    payload.email,
          'phone':    payload.phone,
          'lead_id':  responseData.lead_id || ''
        });

        if(successMessage) successMessage.style.display = 'block';
        form.style.display = 'none';

        if (form.hasAttribute('data-unlock-video')) {
          const unlockTarget = document.querySelector(form.getAttribute('data-unlock-video'));
          if(unlockTarget) unlockTarget.classList.remove('is-locked');
        }
      } catch(e) {
        console.error('Submit error: ',e);
        if(successMessage) successMessage.style.display = 'none';
        form.style.display = '';
      } finally {
        isSubmitting = false;
        submitButton && submitButton.removeAttribute('disabled');
      }
    });
  });
});
