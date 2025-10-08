document.addEventListener('DOMContentLoaded', function() {
  if (typeof jQuery === 'undefined' || typeof jQuery.fn.validate === 'undefined') {
    console.error('jQuery or jQuery Validate is not loaded. This script requires them.');
    return;
  }

  document.querySelectorAll('.main-form[data-universal-form]').forEach(form => {
    const $form = $(form);

    // ---- ЭЛЕМЕНТЫ ФОРМЫ ----
    const fullNameInput = form.querySelector('#Full-Name');
    const firstNameInput = form.querySelector('#First-Name');
    const lastNameInput = form.querySelector('#Last-Name');
    const jobTitleInput = form.querySelector('#Job-title');
    const emailInput = form.querySelector('#email, #email-2');
    const companyInput = form.querySelector('#company, #company-2');
    const countrySelect = form.querySelector('#country, #country-2');
    const phoneInput = form.querySelector('#phone');
    const selfAttributionInput = form.querySelector('#self-attribution');
    const submitButton = form.querySelector('.form-submit, #submit, #submit-2');
    const checkbox = form.querySelector('#agreement');
    const successMessage = form.querySelector('.w-form-done, #success-message');
    const submitButtonWrapper = submitButton ? submitButton.closest('.submit-button-wrapper') : null;

    let isSubmitting = false;
    let iti = null;
    let isCheckboxInteracted = false;

    // ---- HONEYPOT ----
    let formInteractionStartTime = 0;
    let decoyLinkClicked = false;
    form.addEventListener('input', () => { if (formInteractionStartTime === 0) formInteractionStartTime = Date.now(); }, { once: true });
    const decoyLink = form.querySelector('#optional-link');
    if (decoyLink) { decoyLink.addEventListener('click', e => { e.preventDefault(); decoyLinkClicked = true; }); }
    function replaceConfusableChars(str) { return typeof str === 'string' ? str.replace(/e/g, '\u0435').replace(/a/g, '\u0430') : str; }
    const confirmEmailHoneypot = form.querySelector('input[name="confirm-email"]');
    if (confirmEmailHoneypot) { confirmEmailHoneypot.name = replaceConfusableChars(confirmEmailHoneypot.name); }

    // ---- ИНИЦИАЛИЗАЦИЯ ----

    // 1. Плавающие метки
    function handleLabel(input) {
      if (!input) return;
      const label = input.nextElementSibling;
      if (!label || label.tagName !== 'LABEL') return;
      const updateLabelState = () => {
        if (input.value !== '') { label.classList.add('active'); input.classList.add('not-empty'); } 
        else { label.classList.remove('active'); input.classList.remove('not-empty'); }
      };
      updateLabelState();
      input.addEventListener('focus', () => label.classList.add('active'));
      input.addEventListener('blur', updateLabelState);
    }
    [fullNameInput, firstNameInput, lastNameInput, jobTitleInput, emailInput, companyInput, phoneInput, selfAttributionInput].forEach(handleLabel);

    // 2. Стилизация селектов (bootstrap-select)
    if ($.fn.selectpicker) {
      const allSelects = $form.find('#country, #country-2, #state, #state-2, #states-australia, #states-brazil, #states-canada, #states-china, #states-ireland, #states-india, #states-italy, #states-mexico');
      allSelects.selectpicker();
      allSelects.on('shown.bs.select', function() {
        const selectpicker = $(this).data('selectpicker');
        if (selectpicker) selectpicker.$menuInner[0].scrollTop = 0;
      });
    }
    
    // 3. Международные телефонные номера (intlTelInput)
    const countryCodeMap = {"Australia":"AU","Austria":"AT","Azerbaijan":"AZ","Albania":"AL","Algeria":"DZ","Angola":"AO","Andorra":"AD","Antigua and Barbuda":"AG","Argentina":"AR","Armenia":"AM","Afghanistan":"AF","Bahamas":"BS","Bangladesh":"BD","Barbados":"BB","Bahrain":"BH","Belarus":"BY","Belize":"BZ","Belgium":"BE","Benin":"BJ","Bulgaria":"BG","Bolivia":"BO","Bosnia and Herzegovina":"BA","Botswana":"BW","Brazil":"BR","Brunei Darussalam":"BN","Burkina Faso":"BF","Burundi":"BI","Bhutan":"BT","Vanuatu":"VU","Hungary":"HU","Venezuela":"VE","Vietnam":"VN","Gabon":"GA","Haiti":"HT","Guyana":"GY","Gambia":"GM","Ghana":"GH","Guatemala":"GT","Guinea":"GN","Guinea-Bissau":"GW","Germany":"DE","Honduras":"HN","Grenada":"GD","Greece":"GR","Georgia":"GE","Denmark":"DK","Congo, Democratic Republic of the":"CD","Djibouti":"DJ","Dominica":"DM","Dominican Republic":"DO","Egypt":"EG","Zambia":"ZM","Zimbabwe":"ZW","Israel":"IL","India":"IN","Indonesia":"ID","Jordan":"JO","Iraq":"IQ","Iran":"IR","Ireland":"IE","Iceland":"IS","Spain":"ES","Italy":"IT","Yemen":"YE","Cabo Verde":"CV","Kazakhstan":"KZ","Cambodia":"KH","Cameroon":"CM","Canada":"CA","Qatar":"QA","Kenya":"KE","Cyprus":"CY","Kiribati":"KI","China":"CN","Colombia":"CO","Comoros":"KM","Congo":"CG","North Korea":"KP","Costa Rica":"CR","Côte d'Ivoire":"CI","Cuba":"CU","Kuwait":"KW","Kyrgyzstan":"KG","Lao People's Democratic Republic":"LA","Latvia":"LV","Lesotho":"LS","Liberia":"LR","Lebanon":"LB","Libya":"LY","Lithuania":"LT","Liechtenstein":"LI","Luxembourg":"LU","Mauritius":"MU","Mauritania":"MR","Madagascar":"MG","Malawi":"MW","Malaysia":"MY","Mali":"ML","Maldives":"MV","Malta":"MT","Morocco":"MA","Marshall Islands":"MH","Mexico":"MX","Mozambique":"MZ","Monaco":"MC","Mongolia":"MN","Myanmar":"MM","Namibia":"NA","Nauru":"NR","Nepal":"NP","Niger":"NE","Nigeria":"NG","Netherlands":"NL","Nicaragua":"NI","Niue":"NU","New Zealand":"NZ","Norway":"NO","Tanzania, United Republic of":"TZ","United Arab Emirates":"AE","Oman":"OM","Cook Islands":"CK","Pakistan":"PK","Panama":"PA","Papua New Guinea":"PG","Paraguay":"PY","Peru":"PE","Poland":"PL","Portugal":"PT","Korea, Republic of":"KR","Moldova, Republic of":"MD","Russian Federation":"RU","Rwanda":"RW","Romania":"RO","El Salvador":"SV","Samoa":"WS","San Marino":"SM","Sao Tome and Principe":"ST","Saudi Arabia":"SA","Holy See (Vatican City State)":"VA","North Macedonia":"MK","Seychelles":"SC","Senegal":"SN","Saint Vincent and the Grenadines":"VC","Saint Kitts and Nevis":"KN","Saint Lucia":"LC","Serbia":"RS","Singapore":"SG","Syrian Arab Republic":"SY","Slovakia":"SK","Slovenia":"SI","United Kingdom":"GB","United States":"US","Solomon Islands":"SB","Somalia":"SO","Sudan":"SD","Suriname":"SR","Sierra Leone":"SL","Tajikistan":"TJ","Thailand":"TH","Timor-Leste":"TL","Togo":"TG","Tonga":"TO","Trinidad and Tobago":"TT","Tuvalu":"TV","Tunisia":"TN","Turkmenistan":"TM","Turkey":"TR","Uganda":"UG","Uzbekistan":"UZ","Ukraine":"UA","Uruguay":"UY","Fiji":"FJ","Philippines":"PH","Finland":"FI","France":"FR","Croatia":"HR","Central African Republic":"CF","Chad":"TD","Montenegro":"ME","Czech Republic":"CZ","Chile":"CL","Switzerland":"CH","Sweden":"SE","Sri Lanka":"LK","Ecuador":"EC","Equatorial Guinea":"GQ","Eritrea":"ER","Eswatini":"SZ","Estonia":"EE","Ethiopia":"ET"};
    if (phoneInput && window.intlTelInput) {
      iti = window.intlTelInput(phoneInput, {
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
        autoPlaceholder: "aggressive", separateDialCode: true, initialCountry: "auto",
        geoIpLookup: function(success, failure) {
          fetch('https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-3627560b-2163-4a62-81db-3a3b5da17d5a/ip/info')
            .then(r => r.json()).then(data => {
              if (data && data.iso_code) success(data.iso_code); else failure();
              if (countrySelect && data && data.country && !countrySelect.value) {
                 $(countrySelect).val(data.country).selectpicker('refresh').trigger('change');
              }
            }).catch(failure);
        }
      });
    }

    // ---- ЛОГИКА ОТОБРАЖЕНИЯ И ЧЕКБОКСА ----
    function setStateDropdown(selectedCountry) {
      const map = {
        'United States': '.dropdown-state, .dropdown-state-2', 'Australia': '.states-australia', 'Brazil': '.states-brazil',
        'Canada': '.states-canada', 'China': '.states-china', 'Ireland': '.states-ireland',
        'India': '.states-india', 'Italy': '.states-italy', 'Mexico': '.states-mexico'
      };
      Object.values(map).forEach(selector => $form.find(selector).hide());
      if (map[selectedCountry]) { $form.find(map[selectedCountry]).show(); }
    }

    function toggleCountrySpecificElements(selectedCountry) {
      if (checkbox) {
        const $checkboxParent = $(checkbox).closest('.checkbox-field');
        if (selectedCountry === 'United States') {
          $form.find('.form-message').hide();
          $form.find('.form-message_usa').show();
          $checkboxParent.hide();
          $(checkbox).prop('checked', true);
        } else {
          $form.find('.form-message').show();
          $form.find('.form-message_usa').hide();
          $checkboxParent.show();
          $(checkbox).prop('checked', false);
        }
        $(checkbox).parent().find('.w-checkbox-input').removeClass('w--redirected-checked');
      }
    }

    function updateCheckboxErrorClass() {
      if (!checkbox) return;
      const label = $(checkbox).closest('.checkbox-field').find('.checkbox-text');
      if (isCheckboxInteracted && countrySelect && countrySelect.value !== 'United States') {
        checkbox.checked ? label.removeClass('error') : label.addClass('error');
      } else {
        label.removeClass('error');
      }
    }

    if (checkbox) {
      // Изначально убираем класс ошибки
      $(checkbox).closest('.checkbox-field').find('.checkbox-text').removeClass('error');
      $(checkbox).on('change', function() {
        isCheckboxInteracted = true;
        updateCheckboxErrorClass();
        $form.valid(); // Перепроверяем форму для обновления кнопки
      });
    }
    
    if (countrySelect) {
      $(countrySelect).on('change', function() {
        setStateDropdown(this.value);
        toggleCountrySpecificElements(this.value);
        if (iti && countryCodeMap[this.value]) {
          iti.setCountry(countryCodeMap[this.value].toLowerCase());
        }
        $form.valid();
      });
      setStateDropdown(countrySelect.value);
      toggleCountrySpecificElements(countrySelect.value);
    }

    // ---- ВАЛИДАЦИЯ ----
    $.validator.addMethod("corporate", (v) => !/@(gmail\.com|yahoo\.com|hotmail\.com|outlook\.com|mail\.ru)$/i.test(v), "Personal emails are not accepted.");
    $.validator.addMethod("phoneCustom", (v) => !v.trim() || (iti && iti.isValidNumber()), "Phone number is invalid.");

    const validator = $form.validate({
      onfocusin: (element) => $(element).data("interacted", true),
      onfocusout: (element) => $(element).data('interacted') && $(element).valid(),
      onkeyup: (element) => $(element).data('interacted') && $(element).valid(),
      errorPlacement: (error, element) => { if ($(element).data('interacted')) { error.appendTo(element.closest(".field-row, .w-full, .iti")); } },
      highlight: (element) => { if ($(element).data('interacted')) { $(element).addClass('has-error'); } },
      unhighlight: (element) => $(element).removeClass('has-error'),
      rules: {
        'Full-Name': { required: true, maxlength: 100, normalizer: v => v.trim() },
        'First-Name': { required: true, maxlength: 50, normalizer: v => v.trim() },
        'Last-Name': { required: true, maxlength: 50, normalizer: v => v.trim() },
        'email': { required: true, maxlength: 50, email: true, corporate: true, normalizer: v => v.trim() },
        'Job-title': { required: true, maxlength: 50, normalizer: v => v.trim() },
        'company': { required: true, maxlength: 50, normalizer: v => v.trim() },
        'phone': { required: true, phoneCustom: true },
        'agreement': { required: () => countrySelect && countrySelect.value !== 'United States' }
      },
      invalidHandler: () => { isCheckboxInteracted = true; updateCheckboxErrorClass(); }
    });
    
    // Обновление состояния кнопки при любом изменении
    $form.on('input change keyup', () => {
        const isFormValid = $form.valid();
        if (isFormValid) {
            submitButton?.removeAttribute('disabled');
            submitButtonWrapper?.classList.remove('button-is-inactive');
        } else {
            submitButton?.setAttribute('disabled', 'disabled');
            submitButtonWrapper?.classList.add('button-is-inactive');
        }
    });

    // ---- ОТПРАВКА ФОРМЫ ----
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      $form.find('input, select').data('interacted', true);
      isCheckboxInteracted = true;
      updateCheckboxErrorClass();
      
      if (isSubmitting || !$form.valid()) { return; }
      isSubmitting = true;
      submitButton?.setAttribute('disabled', 'disabled');

      let firstName = '', lastName = '';
      if (fullNameInput) {
        const nameParts = fullNameInput.value.trim().split(/\s+/);
        firstName = nameParts.shift() || '';
        lastName = nameParts.join(' ') || firstName;
      } else {
        firstName = firstNameInput?.value.trim() || '';
        lastName = lastNameInput?.value.trim() || '';
      }
      
      let stateValue = '';
      const visibleStateSelect = $form.find('div[class*="states-"][style*="block"] select, div[class*="dropdown-state"][style*="block"] select').first();
      if(visibleStateSelect.length) { stateValue = visibleStateSelect.val(); }

      const formFillingTime = formInteractionStartTime > 0 ? (Date.now() - formInteractionStartTime) / 1000 : 999;
      let junk_lead = false, junk_reason = null;
      if (new FormData(form).get(replaceConfusableChars('confirm-email')) || decoyLinkClicked || formFillingTime < 0.5) {
        junk_lead = true; junk_reason = decoyLinkClicked ? 2 : (formFillingTime < 0.5 ? 3 : 1);
      }

      const dataToSubmit = {
        'firstname': firstName, 'lastname': lastName, 'state': stateValue || null,
        'full_phone_number': iti ? iti.getNumber() : (phoneInput ? phoneInput.value.trim() : ''),
        'href': window.location.href, 'page': window.location.pathname.substring(1),
        'ss_anonymous_id': window.segmentstream?.anonymousId?.() ?? '', 'junk_lead': junk_lead,
        'of_form_duration': formFillingTime, 'junk_reason': junk_reason
      };

      for (const key in dataToSubmit) {
          let input = form.querySelector(`input[type="hidden"][name="${key}"]`);
          if (!input) { input = document.createElement('input'); input.type = 'hidden'; input.name = key; form.appendChild(input); }
          input.value = dataToSubmit[key];
      }

      if (form.hasAttribute('data-unlock-video')) {
          const unlockTarget = document.querySelector(form.getAttribute('data-unlock-video'));
          if (unlockTarget) unlockTarget.classList.remove('is-locked');
          sessionStorage.setItem('videoUnlocked', 'true');
      }

      form.submit();
    });
  });
});
