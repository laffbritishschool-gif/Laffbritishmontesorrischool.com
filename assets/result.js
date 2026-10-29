(() => {
  const API = 'https://moqpmrhholbbhuedvbgg.supabase.co';
  const KEY = 'sb_publishable_IfSp9O5zUubH6rifFbfmZQ_DJttLC1f';
  const RESULT_KEY = 'laff-public-result';
  const form = document.getElementById('result-form');
  const message = document.getElementById('result-message');
  const submit = form && form.querySelector('.result-submit');

  const sessionSelect = document.getElementById('session');

  // School sessions are September-to-August and advance automatically each year.
  function populateAcademicSessions() {
    if (!sessionSelect) return;

    const today = new Date();
    const currentStartYear = today.getFullYear() - (today.getMonth() < 8 ? 1 : 0);
    const currentSession = currentStartYear + '/' + (currentStartYear + 1);
    const options = document.createDocumentFragment();

    for (let offset = 0; offset < 10; offset += 1) {
      const startYear = currentStartYear - offset;
      const value = startYear + '/' + (startYear + 1);
      const label = value === currentSession ? value + ' (Current session)' : value;
      options.appendChild(new Option(label, value, false, value === currentSession));
    }

    sessionSelect.replaceChildren(options);
    sessionSelect.value = currentSession;
  }

  populateAcademicSessions();


  function setMessage(text, state) {
    if (!message) return;
    message.textContent = text;
    message.className = 'result-message ' + (state || '');
  }

  function busy(state) {
    if (!submit) return;
    submit.disabled = state;
    submit.classList.toggle('loading', state);
    const label = submit.querySelector('span:first-child');
    if (label) label.textContent = state ? 'Checking…' : 'Check result';
  }

  function showResult(payload) {
    try {
      sessionStorage.setItem(RESULT_KEY, JSON.stringify(payload));
    } catch (_) {
      setMessage('Your browser could not open the report. Please allow session storage and try again.', 'error');
      busy(false);
      return;
    }
    location.assign('/result-view/');
  }

  async function check(event) {
    event.preventDefault();
    const serial = document.getElementById('serial').value.trim();
    const pin = document.getElementById('pin').value.trim();
    const session = document.getElementById('session').value.trim();
    const term = document.getElementById('term').value || 'FIRST';

    if (!serial || !pin || !session) {
      setMessage('Enter your result serial number, PIN and academic session.', 'error');
      return;
    }

    busy(true);
    setMessage('Checking your result…', 'loading');

    try {
      const response = await fetch(API + '/rest/v1/rpc/check_public_result', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: KEY,
          Authorization: 'Bearer ' + KEY
        },
        body: JSON.stringify({
          p_serial: serial,
          p_pin: pin,
          p_session: session,
          p_term: term
        })
      });

      const data = await response.json().catch(function () { return {}; });
      if (!response.ok) {
        throw new Error('We could not check your result right now. Please try again later.');
      }

      if (data && data.ok !== true) {
        const allowedReasons = ['not_enrolled', 'not_published', 'no_result', 'invalid_session'];
        const code = allowedReasons.includes(data.reason_code) ? data.reason_code : 'no_result';
        location.replace('/result-unavailable/?reason=' + encodeURIComponent(code));
        return;
      }

      if (!data || !data.student || !Array.isArray(data.results) || data.results.length === 0) {
        location.replace('/result-unavailable/?reason=not_published');
        return;
      }

      showResult(data);
    } catch (error) {
      setMessage(error && error.message ? error.message : 'Unable to check the result right now. Please try again.', 'error');
      busy(false);
    }
  }

  if (form) form.addEventListener('submit', check);
})();
