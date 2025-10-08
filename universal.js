document.addEventListener('DOMContentLoaded', function() {
  // --- Убедимся, что jQuery и jQuery Validate загружены ---
  if (typeof jQuery === 'undefined' || typeof jQuery.fn.validate === 'undefined') {
    console.error('jQuery or jQuery Validate is not loaded. This script requires them.');
    return;
  }

  document.querySelectorAll('.main-form[data-universal-form]').forEach(form => {
    const $form = $(form); // Работаем с jQuery-объектом формы

    // ---- ЭЛЕМЕНТЫ ФОРМЫ (ИЩЕМ ВСЕ ВОЗМОЖНЫЕ ВАРИАНТЫ) ----
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
    const extraCheckbox = form.querySelector('#agreement-2');
    const formMessageDiv = form.querySelector('.form-message');
    const formMessageUSADiv = form.querySelector('.form-message_usa');
    const successMessage = form.querySelector('.w-form-done, #success-message');
    const submitButtonWrapper = submitButton ? submitButton.closest('.submit-button-wrapper') : null;

    let isSubmitting = false;
    let iti = null;

    // ---- HONEYPOT (ЗАЩИТА ОТ СПАМА) ----
    let formInteractionStartTime = 0;
    let decoyLinkClicked = false;

    form.addEventListener('input', () => {
      if (formInteractionStartTime === 0) formInteractionStartTime = Date.now();
    }, { once: true });

    const decoyLink = form.querySelector('#optional-link');
    if (decoyLink) {
      decoyLink.addEventListener('click', e => {
        e.preventDefault();
        decoyLinkClicked = true;
      });
    }
    
    // Функция для обфускации имен полей-ловушек
    function replaceConfusableChars(str) {
      if (typeof str !== 'string') return str;
      return str.replace(/e/g, '\u0435').replace(/a/g, '\u0430');
    }
    
    // Применяем обфускацию к полям-ловушкам
    const confirmEmailHoneypot = form.querySelector('input[name="confirm-email"]');
    if (confirmEmailHoneypot) {
        confirmEmailHoneypot.name = replaceConfusableChars(confirmEmailHoneypot.name);
    }


    // ---- ИНИЦИАЛИЗАЦИЯ ПЛАГИНОВ И ОБРАБОТЧИКОВ ----

    // 1. Плавающие метки (Floating Labels)
    function handleLabel(input) {
      if (!input) return;
      const label = input.nextElementSibling;
      if (!label || label.tagName !== 'LABEL') return;

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
    [fullNameInput, firstNameInput, lastNameInput, jobTitleInput, emailInput, companyInput, phoneInput, selfAttributionInput].forEach(handleLabel);

    // 2. Стилизация селектов (bootstrap-select)
    if ($.fn.selectpicker) {
      $(countrySelect).selectpicker();
      $form.find('.dropdown-state, .states-australia, .states-brazil, .states-canada, .states-china, .states-ireland, .states-india, .states-italy, .states-mexico').selectpicker();
    }
    
    // 3. Международные телефонные номера (intlTelInput)
    const countryCodeMap = {"Australia":"AU","Austria":"AT","Azerbaijan":"AZ","Albania":"AL","Algeria":"DZ","Angola":"AO","Andorra":"AD","Antigua and Barbuda":"AG","Argentina":"AR","Armenia":"AM","Afghanistan":"AF","Bahamas":"BS","Bangladesh":"BD","Barbados":"BB","Bahrain":"BH","Belarus":"BY","Belize":"BZ","Belgium":"BE","Benin":"BJ","Bulgaria":"BG","Bolivia":"BO","Bosnia and Herzegovina":"BA","Botswana":"BW","Brazil":"BR","Brunei Darussalam":"BN","Burkina Faso":"BF","Burundi":"BI","Bhutan":"BT","Vanuatu":"VU","Hungary":"HU","Venezuela":"VE","Vietnam":"VN","Gabon":"GA","Haiti":"HT","Guyana":"GY","Gambia":"GM","Ghana":"GH","Guatemala":"GT","Guinea":"GN","Guinea-Bissau":"GW","Germany":"DE","Honduras":"HN","Grenada":"GD","Greece":"GR","Georgia":"GE","Denmark":"DK","Congo, Democratic Republic of the":"CD","Djibouti":"DJ","Dominica":"DM","Dominican Republic":"DO","Egypt":"EG","Zambia":"ZM","Zimbabwe":"ZW","Israel":"IL","India":"IN","Indonesia":"ID","Jordan":"JO","Iraq":"IQ","Iran":"IR","Ireland":"IE","Iceland":"IS","Spain":"ES","Italy":"IT","Yemen":"YE","Cabo Verde":"CV","Kazakhstan":"KZ","Cambodia":"KH","Cameroon":"CM","Canada":"CA","Qatar":"QA","Kenya":"KE","Cyprus":"CY","Kiribati":"KI","China":"CN","Colombia":"CO","Comoros":"KM","Congo":"CG","North Korea":"KP","Costa Rica":"CR","Côte d'Ivoire":"CI","Cuba":"CU","Kuwait":"KW","Kyrgyzstan":"KG","Lao People's Democratic Republic":"LA","Latvia":"LV","Lesotho":"LS","Liberia":"LR","Lebanon":"LB","Libya":"LY","Lithuania":"LT","Liechtenstein":"LI","Luxembourg":"LU","Mauritius":"MU","Mauritania":"MR","Madagascar":"MG","Malawi":"MW","Malaysia":"MY","Mali":"ML","Maldives":"MV","Malta":"MT","Morocco":"MA","Marshall Islands":"MH","Mexico":"MX","Mozambique":"MZ","Monaco":"MC","Mongolia":"MN","Myanmar":"MM","Namibia":"NA","Nauru":"NR","Nepal":"NP","Niger":"NE","Nigeria":"NG","Netherlands":"NL","Nicaragua":"NI","Niue":"NU","New Zealand":"NZ","Norway":"NO","Tanzania, United Republic of":"TZ","United Arab Emirates":"AE","Oman":"OM","Cook Islands":"CK","Pakistan":"PK","Panama":"PA","Papua New Guinea":"PG","Paraguay":"PY","Peru":"PE","Poland":"PL","Portugal":"PT","Korea, Republic of":"KR","Moldova, Republic of":"MD","Russian Federation":"RU","Rwanda":"RW","Romania":"RO","El Salvador":"SV","Samoa":"WS","San Marino":"SM","Sao Tome and Principe":"ST","Saudi Arabia":"SA","Holy See (Vatican City State)":"VA","North Macedonia":"MK","Seychelles":"SC","Senegal":"SN","Saint Vincent and the Grenadines":"VC","Saint Kitts and Nevis":"KN","Saint Lucia":"LC","Serbia":"RS","Singapore":"SG","Syrian Arab Republic":"SY","Slovakia":"SK","Slovenia":"SI","United Kingdom":"GB","United States":"US","Solomon Islands":"SB","Somalia":"SO","Sudan":"SD","Suriname":"SR","Sierra Leone":"SL","Tajikistan":"TJ","Thailand":"TH","Timor-Leste":"TL","Togo":"TG","Tonga":"TO","Trinidad and Tobago":"TT","Tuvalu":"TV","Tunisia":"TN","Turkmenistan":"TM","Turkey":"TR","Uganda":"UG","Uzbekistan":"UZ","Ukraine":"UA","Uruguay":"UY","Fiji":"FJ","Philippines":"PH","Finland":"FI","France":"FR","Croatia":"HR","Central African Republic":"CF","Chad":"TD","Montenegro":"ME","Czech Republic":"CZ","Chile":"CL","Switzerland":"CH","Sweden":"SE","Sri Lanka":"LK","Ecuador":"EC","Equatorial Guinea":"GQ","Eritrea":"ER","Eswatini":"SZ","Estonia":"EE","Ethiopia":"ET"};
    if (phoneInput && window.intlTelInput) {
      iti = window.intlTelInput(phoneInput, {
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
        autoPlaceholder: "aggressive",
        separateDialCode: true,
        initialCountry: "auto",
        geoIpLookup: function(success, failure) {
          fetch('https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-3627560b-2163-4a62-81db-3a3b5da17d5a/ip/info')
            .then(r => r.json()).then(data => {
              if (data && data.iso_code) success(data.iso_code);
              else failure();
              if (countrySelect && data && data.country) {
                 const opt = [...countrySelect.options].find(o => o.value === data.country);
                 if (opt) {
                     opt.selected = true;
                     $(countrySelect).selectpicker('refresh').trigger('change');
                 }
              }
            }).catch(failure);
        }
      });
    }

    // --- ЛОГИКА ОТОБРАЖЕНИЯ ЭЛЕМЕНТОВ ----

    function setStateDropdown(selectedCountry) {
        const map = {
            'United States': '.dropdown-state, .dropdown-state-2', 'Australia': '.states-australia', 'Brazil': '.states-brazil',
            'Canada': '.states-canada', 'China': '.states-china', 'Ireland': '.states-ireland',
            'India': '.states-india', 'Italy': '.states-italy', 'Mexico': '.states-mexico'
        };
        form.querySelectorAll(Object.values(map).join(', ')).forEach(dd => dd && (dd.style.display = 'none'));
        if (map[selectedCountry]) {
            const block = form.querySelector(map[selectedCountry]);
            if (block) block.style.display = 'block';
        }
    }

    function toggleCountrySpecificElements(selectedCountry) {
      if (checkbox) {
          const $checkboxParent = $(checkbox).parent();
          $(checkbox).prop('checked', false).removeAttr('checked');
          $checkboxParent.find('.w-checkbox-input').removeClass('w--redirected-checked');
          
          if (selectedCountry === 'United States') {
              if (formMessageDiv) formMessageDiv.style.display = 'none';
              if (formMessageUSADiv) formMessageUSADiv.style.display = 'block';
              $(checkbox).prop('checked', true);
              $checkboxParent.hide();
          } else {
              if (formMessageDiv) formMessageDiv.style.display = 'block';
              if (formMessageUSADiv) formMessageUSADiv.style.display = 'none';
              $checkboxParent.show();
          }
      }
      setTimeout(updateSubmitButtonState, 50);
    }

    if (countrySelect) {
        $(countrySelect).on('change', function() {
            const selectedCountry = this.value;
            setStateDropdown(selectedCountry);
            toggleCountrySpecificElements(selectedCountry);
            if (iti && countryCodeMap[selectedCountry]) {
                iti.setCountry(countryCodeMap[selectedCountry].toLowerCase());
            }
            $form.validate().element(this); // Перепроверяем валидность селекта
        });
        setStateDropdown(countrySelect.value);
        toggleCountrySpecificElements(countrySelect.value);
    }
    
    // ---- ВАЛИДАЦИЯ (jQuery Validate) ----
    $.validator.addMethod("corporate", (v) => !/@(gmail\.com|yahoo\.com|hotmail\.com|outlook\.com|mail\.ru)$/i.test(v), "Please enter a valid corporate email address.");
    $.validator.addMethod("validEmailChars", (v) => /^[a-zA-Z0-9@.\-_]+$/.test(v), "Invalid characters in email.");
    $.validator.addMethod("noSpacesOnly", (v) => v.trim().length > 0, "This field cannot contain only spaces.");
    $.validator.addMethod("phoneCustom", () => !phoneInput || !phoneInput.value.trim() || (iti && iti.isValidNumber()), "Phone number is invalid.");

    $form.validate({
      onfocusout: (el) => $(el).data('modified') && $(el).valid(),
      onkeyup: (el) => $(el).data('modified', true).valid(),
      errorPlacement: (error, element) => error.appendTo(element.closest(".field-row, .w-full")),
      highlight: (element) => $(element).data('modified') && $(element).addClass('has-error'),
      unhighlight: (element) => $(element).removeClass('has-error'),
      rules: {
        'Full-Name': { required: true, maxlength: 50, noSpacesOnly: true },
        'First-Name': { required: true, maxlength: 50, noSpacesOnly: true },
        'Last-Name': { required: true, maxlength: 50, noSpacesOnly: true },
        'email': { required: true, maxlength: 50, email: true, corporate: true, validEmailChars: true },
        'Job-title': { required: true, maxlength: 50, noSpacesOnly: true },
        'company': { required: true, maxlength: 50, noSpacesOnly: true },
        'phone': { phoneCustom: true },
        'self-attribution': { maxlength: 50 }
      },
      messages: {
         email: { corporate: "Personal emails (e.g., Gmail, Yahoo) are not accepted." }
      }
    });

    function updateSubmitButtonState() {
        const isFormValid = $form.valid();
        const selectedCountry = countrySelect ? countrySelect.value : '';
        const isAgreementOk = (checkbox && (selectedCountry === 'United States' || checkbox.checked)) || !checkbox;
        const isExtraAgreementOk = (extraCheckbox && extraCheckbox.checked) || !extraCheckbox;

        if (isFormValid && isAgreementOk && isExtraAgreementOk) {
            submitButton && submitButton.removeAttribute('disabled');
            submitButtonWrapper && submitButtonWrapper.classList.remove('button-is-inactive');
        } else {
            submitButton && submitButton.setAttribute('disabled', 'disabled');
            submitButtonWrapper && submitButtonWrapper.classList.add('button-is-inactive');
        }
    }

    $form.on('input change', updateSubmitButtonState);
    updateSubmitButtonState(); // Первоначальная проверка


    // ---- ЛОГИКА РАЗБЛОКИРОВКИ ВИДЕО ----
    function checkVideoUnlock() {
        if (sessionStorage.getItem('videoUnlocked') === 'true' && form.hasAttribute('data-unlock-video')) {
            const unlockTargetSelector = form.getAttribute('data-unlock-video');
            const unlockTarget = document.querySelector(unlockTargetSelector);
            if (unlockTarget) {
                unlockTarget.classList.remove('is-locked');
                form.style.display = 'none'; // Скрываем форму, если видео уже разблокировано
                if (successMessage) successMessage.style.display = 'block';
            }
        }
    }
    checkVideoUnlock();


    // ---- ОТПРАВКА ФОРМЫ (SUBMIT) ----
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      if (isSubmitting || !$form.valid()) {
        updateSubmitButtonState(); // Показать ошибки, если невалидна
        return;
      }
      isSubmitting = true;
      submitButton && submitButton.setAttribute('disabled', 'disabled');

      // 1. Собираем и обрабатываем данные
      let firstName = '', lastName = '';
      if (fullNameInput) {
          const nameParts = fullNameInput.value.trim().split(' ');
          firstName = nameParts.shift() || '';
          lastName = nameParts.join(' ') || firstName;
      } else {
          firstName = firstNameInput ? firstNameInput.value.trim() : '';
          lastName = lastNameInput ? lastNameInput.value.trim() : '';
      }
      
      const selectedCountry = countrySelect ? countrySelect.value : '';
      let stateValue = '';
      const stateDropdown = form.querySelector('.dropdown-state[style*="block"], .dropdown-state-2[style*="block"], .states-australia[style*="block"], .states-brazil[style*="block"], .states-canada[style*="block"], .states-china[style*="block"], .states-ireland[style*="block"], .states-india[style*="block"], .states-italy[style*="block"], .states-mexico[style*="block"]');
      if (stateDropdown) {
         stateValue = stateDropdown.querySelector('select')?.value || '';
      }
      
      const urlParams = new URLSearchParams(window.location.search);
      const getCookieValue = (name) => (document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || '');

      // 2. Проверяем на спам (Honeypot)
      const formFillingTime = formInteractionStartTime > 0 ? (Date.now() - formInteractionStartTime) / 1000 : 999;
      const confirmEmailValue = new FormData(form).get(replaceConfusableChars('confirm-email')) || '';
      const cityValue = new FormData(form).get('city') || '';
      let junk_lead = false, junk_reason = null, junk_context = null;

      if (confirmEmailValue.length > 0 || cityValue.length > 0) {
          junk_lead = true; junk_reason = 1; junk_context = JSON.stringify({email: confirmEmailValue, city: cityValue});
      } else if (decoyLinkClicked) {
          junk_lead = true; junk_reason = 2;
      } else if (formFillingTime < 0.5) {
          junk_lead = true; junk_reason = 3;
      }

      // 3. Формируем все данные для отправки
      const dataToSubmit = {
        'firstname': firstName,
        'lastname': lastName,
        'state': stateValue || null,
        'full_phone_number': iti ? iti.getNumber() : (phoneInput ? phoneInput.value.trim() : ''),
        'href': window.location.href,
        'page': window.location.pathname.substring(1),
        'ss_anonymous_id': window.segmentstream?.anonymousId?.() ?? '',
        'junk_lead': junk_lead,
        'of_form_duration': formFillingTime,
        'junk_reason': junk_reason,
        'junk_context': junk_context,
        'c_of_utm_campaign': urlParams.get('utm_campaign') || '',
        'c_of_utm_content': urlParams.get('utm_content') || '',
        'c_of_utm_medium': urlParams.get('utm_medium') || '',
        'c_of_utm_source': urlParams.get('utm_source') || '',
        'c_of_utm_term': urlParams.get('utm_term') || '',
        '_ga': getCookieValue('_ga'),
        'c_of__ga': getCookieValue('c_of__ga')
      };

      // 4. Внедряем данные в скрытые поля
      for (const key in dataToSubmit) {
          let input = form.querySelector(`input[type="hidden"][name="${key}"]`);
          if (!input) {
              input = document.createElement('input');
              input.type = 'hidden';
              input.name = key;
              form.appendChild(input);
          }
          input.value = dataToSubmit[key];
      }
      
      // 5. Отправка в dataLayer (если нужно)
      if (window.dataLayer) {
          window.dataLayer.push({
            'event': form.getAttribute('data-datalayer-event') || 'demo',
            'role': (form.querySelector('input[name="lead_type"]:checked')?.value || '').replace(/^./, s => s.toUpperCase()),
            'email': emailInput ? emailInput.value.trim() : '',
            'phone': dataToSubmit.full_phone_number,
          });
      }
      
      // 6. Разблокировка видео
      if (form.hasAttribute('data-unlock-video')) {
          const unlockTarget = document.querySelector(form.getAttribute('data-unlock-video'));
          if (unlockTarget) unlockTarget.classList.remove('is-locked');
          sessionStorage.setItem('videoUnlocked', 'true');
      }

      // 7. Отправляем форму стандартным способом для Zapier
      form.submit();
    });
  });
});
