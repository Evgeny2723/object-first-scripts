document.addEventListener('DOMContentLoaded', function() {
  if (typeof jQuery === 'undefined' || typeof jQuery.fn.validate === 'undefined') {
    console.error('jQuery or jQuery Validate is not loaded. This script requires them.');
    return;
  }

  function getCookieValue(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
    return null;
  }
  
  function generateUserId() {
    return 'user_' + Math.random().toString(36).substr(2, 9);
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
    const submitButton = form.querySelector('#submit, #submit-2');
    const checkbox = form.querySelector('#agreement');
    const successMessage = form.querySelector('.w-form-done, #success-message');
    const errorMessage = form.querySelector('.w-form-fail');
    const submitButtonWrapper = submitButton ? submitButton.closest('.submit-button-wrapper') : null;

    console.log('🔍 Поиск success message элемента:');
    console.log('- Найденный элемент:', successMessage);
    console.log('- Класс .w-form-done:', form.querySelector('.w-form-done'));
    console.log('- ID #success-message:', form.querySelector('#success-message'));
    console.log('- Все .w-form-done на странице:', document.querySelectorAll('.w-form-done'));

    let isSubmitting = false;
    let iti = null;
    let isCheckboxInteracted = false;
    let hasUserInteracted = false;
    let isFormInitialized = false;

    submitButton?.setAttribute('disabled', 'disabled');
    submitButtonWrapper?.classList.add('button-is-inactive');

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
              if (countrySelect && data && data.country) {
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
    // Кастомный метод для проверки корпоративного email
      $.validator.addMethod("corporate", function(value, element) {
        return !/@(gmail\.com|yahoo\.com|hotmail\.com|outlook\.com|mail\.ru)$/i.test(value);
      }, "Please enter a valid corporate email address (e.g., yourname@company.com). Personal email addresses (e.g., Gmail, Yahoo) are not accepted.");

      // Кастомный метод для проверки телефона
      $.validator.addMethod("phoneCustom", function(value, element) {
        return !value.trim() || (iti && iti.isValidNumber());
      }, "Phone number is invalid. Please add your country code, area code and phone number. Your phone number can contain numbers, spaces and these special characters: ( ) - # +");

      // Кастомный метод для проверки допустимых символов в email
      $.validator.addMethod("validEmailChars", function (value, element) {
        return this.optional(element) || /^[a-zA-Z0-9@.\-_]+$/.test(value);
      }, "Please use only valid characters in the email field (letters, numbers, @, ., -, _).");

      // Кастомный метод для проверки на только пробелы
      $.validator.addMethod("noSpacesOnly", function (value, element) {
        return this.optional(element) || value.trim().length > 0;
      }, "This field cannot contain only spaces.");

    const validator = $form.validate({
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
        'Full-Name': { required: true, maxlength: 50, noSpacesOnly: true },
        'firstname': { required: true, maxlength: 50, noSpacesOnly: true },
        'lastname': { required: true, maxlength: 50, noSpacesOnly: true },
        'email': { required: true, maxlength: 50, validEmailChars: true, corporate: true },
        'job_title': { required: true, maxlength: 50, noSpacesOnly: true },
        'company': { required: true, maxlength: 50, noSpacesOnly: true },
        'phone': { required: true, phoneCustom: true },
        'agreement': { required: () => countrySelect && countrySelect.value !== 'United States' }
      },
      errorPlacement: function (error, element) {
          if ($(element).data('modified')) {
            error.appendTo(element.closest(".field-row"));
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
        },
      invalidHandler: () => {
        if (hasUserInteracted) {
          isCheckboxInteracted = true;
          updateCheckboxErrorClass();
        }
      },
    });
    
    $form.on('input change keyup', () => {
        setTimeout(() => {
            const isFormValid = $form.valid();
            if (isFormValid) {
                submitButton?.removeAttribute('disabled');
                submitButton?.classList.remove('submit-inactive');
                submitButtonWrapper?.classList.remove('button-is-inactive');
            } else {
                submitButton?.setAttribute('disabled', 'disabled');
                submitButton?.classList.add('submit-inactive');
                submitButtonWrapper?.classList.add('button-is-inactive');
            }
        }, 100);
    });

    // ---- ОБРАБОТЧИК ОТПРАВКИ ----
    form.addEventListener('submit', function(event) {
      // 1. Проверяем валидность. Если форма не валидна, останавливаем отправку.
      if (!$form.valid()) {
        event.preventDefault();
        
        // Помечаем все поля как "проверенные", чтобы показать ошибки
        hasUserInteracted = true;
        $form.find('input, select').data('interacted', true);
        isCheckboxInteracted = true;
        updateCheckboxErrorClass();
        validator.focusInvalid();
        return;
      }
      
      // 2. Если форма валидна, продолжаем обработку
      submitButton?.setAttribute('disabled', 'disabled');
      
      // Добавляем индикатор загрузки
      if (submitButtonWrapper) {
        submitButtonWrapper.classList.add('is-loading');
      }

      let firstName = '', lastName = '';
      if (fullNameInput && fullNameInput.value) {
        // Обработка Full Name - делим на firstname и lastname
        const nameParts = fullNameInput.value.trim().split(/\s+/);
        if (nameParts.length === 1) {
          // Если только одно слово, ставим его и в firstname и в lastname
          firstName = nameParts[0];
          lastName = nameParts[0];
        } else if (nameParts.length === 2) {
          // Если два слова - стандартная обработка
          firstName = nameParts[0];
          lastName = nameParts[1];
        } else {
          // Если три и больше слов - первое в firstname, второе в lastname, остальное игнорируем
          firstName = nameParts[0];
          lastName = nameParts[1];
        }
      } else {
        // Обработка отдельных полей First Name и Last Name
        firstName = firstNameInput?.value?.trim() || '';
        lastName = lastNameInput?.value?.trim() || '';
      }
      
      let stateValue = '';
      const selectedCountry = countrySelect ? countrySelect.value : '';
      
      // Определяем правильный селект для штата в зависимости от страны
      if (selectedCountry === 'United States') {
        const stateSelect = form.querySelector('#state, #state-2');
        stateValue = stateSelect ? stateSelect.value : '';
      } else if (selectedCountry === 'Australia') {
        const stateSelect = form.querySelector('#states-australia');
        stateValue = stateSelect ? stateSelect.value : '';
      } else if (selectedCountry === 'Brazil') {
        const stateSelect = form.querySelector('#states-brazil');
        stateValue = stateSelect ? stateSelect.value : '';
      } else if (selectedCountry === 'Canada') {
        const stateSelect = form.querySelector('#states-canada');
        stateValue = stateSelect ? stateSelect.value : '';
      } else if (selectedCountry === 'China') {
        const stateSelect = form.querySelector('#states-china');
        stateValue = stateSelect ? stateSelect.value : '';
      } else if (selectedCountry === 'Ireland') {
        const stateSelect = form.querySelector('#states-ireland');
        stateValue = stateSelect ? stateSelect.value : '';
      } else if (selectedCountry === 'India') {
        const stateSelect = form.querySelector('#states-india');
        stateValue = stateSelect ? stateSelect.value : '';
      } else if (selectedCountry === 'Italy') {
        const stateSelect = form.querySelector('#states-italy');
        stateValue = stateSelect ? stateSelect.value : '';
      } else if (selectedCountry === 'Mexico') {
        const stateSelect = form.querySelector('#states-mexico');
        stateValue = stateSelect ? stateSelect.value : '';
      }
      
      // Альтернативный метод если не нашли по ID
      if (!stateValue) {
        const visibleStateSelect = $form.find('div[class*="states-"]:visible select, div[class*="dropdown-state"]:visible select').first();
        if(visibleStateSelect.length) { stateValue = visibleStateSelect.val(); }
      }

      const formFillingTime = formInteractionStartTime > 0 ? (Date.now() - formInteractionStartTime) / 1000 : 999;
      
      let junk_lead = false, junk_reason = null, junk_context = null;
      const confirmEmailValue = new FormData(form).get(replaceConfusableChars('confirm-email')) || '';
      const cityValue = form.querySelector('[name="city"]')?.value || '';

      if (confirmEmailValue.length > 0 || cityValue.length > 0) {
          junk_lead = true; junk_reason = 1;
          junk_context = JSON.stringify({ email: confirmEmailValue || null, city: cityValue || null });
      } else if (decoyLinkClicked) {
          junk_lead = true; junk_reason = 2;
      } else if (formFillingTime < 0.5) {
          junk_lead = true; junk_reason = 3;
      }

      const userId = getCookieValue('user_id') || generateUserId();
      document.cookie = `user_id=${userId}; path=/; max-age=31536000`;

      const userIdInput = form.querySelector('input[name="user_id"]');
      if (userIdInput) {
        userIdInput.value = userId;
      }

      const dataToSubmit = {
        'email': (emailInput || form.querySelector('[name="email"]'))?.value?.trim() || '',
        'firstname': firstName, 
        'lastname': lastName,
        'company': (companyInput || form.querySelector('[name="company"]'))?.value?.trim() || '',
        'job_title': (jobTitleInput || form.querySelector('[name="job_title"]') || form.querySelector('[name="Job-title"]'))?.value?.trim() || '',
        'country': selectedCountry || (countrySelect || form.querySelector('[name="country"]'))?.value || '',
        'state': stateValue || null,
        'full_phone_number': iti ? iti.getNumber() : (phoneInput ? phoneInput.value.trim() : ''),
        'href': window.location.href, 
        'page': window.location.pathname.substring(1),
        'ss_anonymous_id': window.segmentstream?.anonymousId?.() ?? '', 
        'junk_lead': junk_lead,
        'of_form_duration': formFillingTime, 
        'junk_reason': junk_reason,
        'junk_context': junk_context,
      };
      
      // Добавляем lead_type - берем только выбранную радиокнопку
      const selectedLeadType = form.querySelector('input[name="lead_type"]:checked');
      if (selectedLeadType && selectedLeadType.value) {
        dataToSubmit.lead_type = selectedLeadType.value;
      }
      
      // Получаем все остальные поля формы
      const allInputs = form.querySelectorAll('input:not([type="hidden"]):not([type="submit"]), select, textarea');
      
      // Создаем Set для отслеживания уже добавленных полей
      const addedFields = new Set(['firstname', 'lastname', 'state', 'full_phone_number', 
                                   'href', 'page', 'ss_anonymous_id', 'junk_lead', 
                                   'of_form_duration', 'junk_reason', 'junk_context', 'lead_type']);
      
      // Фильтруем и добавляем только заполненные поля
      allInputs.forEach(input => {
        // Пропускаем поля, которые уже обработаны выше
        const processedFields = ['firstname', 'lastname', 'Full-Name', 'First-Name', 'Last-Name', 
                                'phone', 'country', 'state', 'state-2', 
                                'states-australia', 'states-brazil', 'states-canada', 
                                'states-china', 'states-ireland', 'states-india', 
                                'states-italy', 'states-mexico',
                                'email', 'email-2', 'company', 'company-2', 
                                'Job-title', 'job_title', 'lead_type',
                                'agreement', 'city', 'self-attribution']; // city в honeypot
        
        const fieldName = input.name || input.id;
        
        // Пропускаем обработанные поля, пустые значения и уже добавленные
        if (!processedFields.includes(fieldName) && 
            !addedFields.has(fieldName) && 
            input.value && 
            input.value.trim()) {
          
          // Для чекбоксов передаем только если они отмечены
          if (input.type === 'checkbox') {
            if (input.checked) {
              dataToSubmit[fieldName] = true;
              addedFields.add(fieldName);
            }
          } else if (input.type === 'radio') {
            // Для радиокнопок передаем только выбранную
            if (input.checked) {
              dataToSubmit[fieldName] = input.value;
              addedFields.add(fieldName);
            }
          } else {
            // Для всех остальных полей
            dataToSubmit[fieldName] = input.value.trim();
            addedFields.add(fieldName);
          }
        }
      });
      
      // Очищаем существующие hidden поля чтобы избежать дублирования
      const existingHiddenFields = form.querySelectorAll('input[type="hidden"]:not([name="user_id"])');
      existingHiddenFields.forEach(field => {
        // Удаляем только те hidden поля, которые мы собираемся добавить
        if (Object.keys(dataToSubmit).includes(field.name)) {
          field.remove();
        }
      });

      for (const key in dataToSubmit) {
          let input = form.querySelector(`input[type="hidden"][name="${key}"]`);
          if (!input) { 
            input = document.createElement('input'); 
            input.type = 'hidden'; 
            input.name = key;
            form.appendChild(input); 
          }
          // Проверяем что значение не массив и не undefined
          let value = dataToSubmit[key];
          if (Array.isArray(value)) {
            value = value[0]; // Берем первый элемент если это массив
          }
          input.value = value !== null && value !== undefined ? String(value) : '';
      }

      if (form.hasAttribute('data-unlock-video')) {
          const unlockTarget = document.querySelector(form.getAttribute('data-unlock-video'));
          if (unlockTarget) unlockTarget.classList.remove('is-locked');
          sessionStorage.setItem('videoUnlocked', 'true');
      }

      // --- БЛОК DATALAYER ---
    const eventName = form.getAttribute('data-event-name') || 'demo';
    
    // Получаем значение из поля lead_type (используем уже полученное значение)
    const leadTypeValue = dataToSubmit.lead_type || '';
    
    const userEmail = emailInput ? emailInput.value : '';
    const userPhone = iti ? iti.getNumber() : (phoneInput ? phoneInput.value : '');

    if (window.dataLayer) {
        window.dataLayer.push({
            'event': eventName,
            'role': leadTypeValue, // Используем значение из lead_type
            'type': '',
            'email': userEmail,
            'phone': userPhone,
            'lead_id': userId // Используем userId
        });
    } else {
        console.warn('dataLayer не определен');
    }
    
    const webhookUrl = form.getAttribute('data-webhook-url');
      if (webhookUrl) {
      event.preventDefault();
      event.stopPropagation();
      
      // Отправляем через AJAX
      $.ajax({
        url: webhookUrl,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(dataToSubmit),
        dataType: 'json',
        success: function(response) {
          console.log('✅ Ответ от сервера:', response);
          
          // Убираем индикатор загрузки
          if (submitButtonWrapper) {
            submitButtonWrapper.classList.remove('is-loading');
          }
          
          if (response.success === true || response.success === 'true') {

            console.log('✅ Условие success выполнено!');
            console.log('📋 successMessage:', successMessage);
            console.log('📋 Существует ли элемент?', !!successMessage);
            
            // Показываем success message принудительно
            if (successMessage) {
    console.log('👉 Пытаемся показать successMessage');
    console.log('Display ДО:', successMessage.style.display);
    console.log('Computed display ДО:', window.getComputedStyle(successMessage).display);
    
    successMessage.style.display = 'block';
    successMessage.style.visibility = 'visible';
    successMessage.style.opacity = '1';
    
    console.log('Display ПОСЛЕ:', successMessage.style.display);
    console.log('Computed display ПОСЛЕ:', window.getComputedStyle(successMessage).display);
  } else {
    console.error('❌ successMessage элемент НЕ НАЙДЕН!');
    console.log('Все элементы формы:', form);
  }
  
  // Скрываем форму
  if (form) {
    console.log('👉 Скрываем форму');
    form.style.display = 'none';
  }
            
            // Очищаем форму
            setTimeout(() => {
              form.reset();
              $form.find('.error').removeClass('error');
              $form.find('label.error').remove();
              if ($.fn.selectpicker) {
                $form.find('select').selectpicker('refresh');
              }
              if (iti) {
                iti.setNumber('');
              }
            }, 500);
          }
        },
        error: function(xhr, status, error) {
          console.log('❌ Ошибка сети/сервера:', {
            status: xhr.status,
            statusText: xhr.statusText,
            responseText: xhr.responseText,
            error: error
          });
          
          // Убираем индикатор загрузки
          if (submitButtonWrapper) {
            submitButtonWrapper.classList.remove('is-loading');
          }
          
          // Скрываем сообщение об успехе
          $(successMessage).css('display', 'none');
          
          // Пытаемся распарсить ответ для показа ошибок полей
          try {
            const response = JSON.parse(xhr.responseText);
            if (response.errors) {
              handleApiValidationErrors(form, response.errors, response.message);
            }
          } catch (e) {
            // Если не удалось распарсить - показываем общую ошибку
            console.error('Сетевая ошибка или невалидный JSON:', e);
          }
          
          // Разблокируем кнопку
          if (submitButton) {
            submitButton.removeAttribute('disabled');
            if (submitButtonWrapper) {
              submitButtonWrapper.classList.remove('button-is-inactive');
            }
          }
        }
      });
      
      return false;
    }
    });
  });

  // Функция обработки ошибок валидации от API
  function handleApiValidationErrors(form, errors, generalMessage) {
    const $form = $(form);
    const validator = $form.data('validator');
    const validationErrors = {};
    
    // Маппинг полей API на поля формы
    const fieldMapping = {
      'email': ['email', 'email-2'],
      'firstname': ['First-Name', 'firstname'],
      'lastname': ['Last-Name', 'lastname'],
      'full_name': ['Full-Name'],
      'company': ['company', 'company-2'],
      'phone': ['phone'],
      'job_title': ['Job-title', 'job_title'],
      'country': ['country', 'country-2'],
      'state': ['state', 'state-2']
    };
    
    // Обрабатываем каждую ошибку
    Object.keys(errors).forEach(apiField => {
      const possibleFields = fieldMapping[apiField] || [apiField];
      
      for (const fieldName of possibleFields) {
        // Ищем поле разными способами
        const fieldElement = form.querySelector(
          `#${fieldName}, [name="${fieldName}"], [name="${apiField}"]`
        );
        
        if (fieldElement) {
          let errorText = errors[apiField];
          if (Array.isArray(errorText)) {
            errorText = errorText[0];
          }
          
          // Добавляем ошибку для jQuery Validate
          const actualFieldName = fieldElement.name || fieldElement.id;
          validationErrors[actualFieldName] = errorText;
          
          // Визуальное выделение
          $(fieldElement).addClass('error');
          $(fieldElement).css('border', '1px solid #c50006');
          
          // Создаем label с ошибкой если нет
          const $fieldRow = $(fieldElement).closest('.field-row');
          let $errorLabel = $fieldRow.find('label.error');
          
          if (!$errorLabel.length) {
            $errorLabel = $('<label class="error"></label>');
            $fieldRow.append($errorLabel);
          }
          
          $errorLabel.text(errorText).show();
          
          break; // Нашли поле
        }
      }
    });
    
    // Показываем ошибки через jQuery Validate
    if (Object.keys(validationErrors).length > 0 && validator) {
      validator.showErrors(validationErrors);
    }
    
    // Общее сообщение об ошибке
    const errorMessage = form.querySelector('.w-form-fail');
    if (errorMessage && generalMessage) {
      const errorText = errorMessage.querySelector('.error-text, .w-form-fail > div');
      if (errorText) {
        errorText.textContent = generalMessage;
      }
    }
    
    // Скроллим к первой ошибке
    setTimeout(() => {
      const firstError = form.querySelector('.error:not(label)');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  }

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
      if (mutation.type === 'childList') {
        addPlaceholder();
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
});

// CSS стили для индикатора загрузки
if (!document.querySelector('#form-loading-styles')) {
  const styles = document.createElement('style');
  styles.id = 'form-loading-styles';
  styles.innerHTML = `
    .submit-button-wrapper.is-loading {
      position: relative;
      pointer-events: none;
      opacity: 0.7;
    }
    
    .submit-button-wrapper.is-loading::after {
      content: '';
      position: absolute;
      width: 20px;
      height: 20px;
      top: 50%;
      right: 20px;
      margin-top: -10px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      border-top-color: #ffffff;
      animation: form-spinner 0.8s linear infinite;
    }
    
    @keyframes form-spinner {
      to { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(styles);
}
