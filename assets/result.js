(() => {
  const API = 'https://moqpmrhholbbhuedvbgg.supabase.co';
  const KEY = 'sb_publishable_IfSp9O5zUubH6rifFbfmZQ_DJttLC1f';
  const RESULT_KEY = 'laff-public-result';
  const form = document.getElementById('result-form');
  const message = document.getElementById('result-message');
  const submit = form?.querySelector('.result-submit');
  const demoButton = document.getElementById('try-demo-result');

  const SAMPLE = {
    ok: true,
    demo: true,
    session: '2025/2026',
    term: 'FIRST',
    student: {
      name: 'Sample Learner (DEMO ONLY)',
      student_id: 'DEMO-0001',
      exam_number: 'DEMO-2025-001',
      class_name: 'Primary 4'
    },
    results: [
      { subject: 'English Language', code: 'ENG', ca: 27, exam: 59, total: 86, grade: 'A', grade_point: 5, teacher_remark: 'Excellent' },
      { subject: 'Mathematics', code: 'MAT', ca: 29, exam: 62, total: 91, grade: 'A', grade_point: 5, teacher_remark: 'Excellent' },
      { subject: 'Basic Science', code: 'BSC', ca: 26, exam: 62, total: 88, grade: 'A', grade_point: 5, teacher_remark: 'Very good' },
      { subject: 'Cultural & Creative Arts', code: 'CCA', ca: 28, exam: 56, total: 84, grade: 'A', grade_point: 5, teacher_remark: 'Very good' },
      { subject: 'Computer Studies', code: 'COM', ca: 30, exam: 60, total: 90, grade: 'A', grade_point: 5, teacher_remark: 'Excellent' },
      { subject: 'Social Studies', code: 'SOS', ca: 24, exam: 58, total: 82, grade: 'A', grade_point: 5, teacher_remark: 'Very good' }
    ]
  };

  const setMessage = (text, state = '') => {
    if (!message) return;
    message.textContent = text;
    message.className = `result-message ${state}`;
  };
  const busy = (state) => {
    if (!submit) return;
    submit.disabled = state;
    submit.classList.toggle('loading', state);
    submit.querySelector('span:first-child')?.replaceChildren(document.createTextNode(state ? 'Checking…' : 'Check result'));
  };
  const showResult = (payload) => {
    try {
      sessionStorage.setItem(RESULT_KEY, JSON.stringify(payload));
    } catch (_) {
      setMessage('Your browser could not open the report. Please allow session storage and try again.', 'error');
      busy(false);
      return;
    }
    location.assign('/result-view/');
  };

  async function check(event) {
    event.preventDefault();
    const serial = document.getElementById('serial')?.value.trim() || '';
    const pin = document.getElementById('pin')?.value.trim() || '';
    const session = document.getElementById('session')?.value.trim() || '';
    const term = document.getElementById('term')?.value || 'FIRST';

    if (!serial || !pin || !session) {
      setMessage('Enter your serial number, PIN and academic session.', 'error');
      return;
    }

    if (serial.toUpperCase() === 'LAFF-DEMO-001') {
      if (pin !== '246810' || session !== '2025/2026' || term !== 'FIRST') {
        setMessage('For the sample preview, use PIN 246810, session 2025/2026 and First Term.', 'error');
        return;
      }
      busy(true);
      setMessage('Opening the clearly labelled sample report…', 'loading');
      showResult(SAMPLE);
      return;
    }

    busy(true);
    setMessage('Checking the school record securely…', 'loading');
    try {
      const response = await fetch(`${API}/rest/v1/rpc/check_public_result`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: KEY,
          Authorization: `Bearer ${KEY}`
        },
        body: JSON.stringify({
          p_serial: serial,
          p_pin: pin,
          p_session: session,
          p_term: term
        })
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data?.message || data?.error || 'We could not verify those result details.');
      }
      if (data?.ok !== true) {
        const code = data?.reason_code || 'no_result';
        location.replace(`/result-unavailable/?reason=${encodeURIComponent(code)}`);
        return;
      }
      showResult(data);
    } catch (error) {
      setMessage(error?.message || 'Unable to check the result right now. Please try again.', 'error');
      busy(false);
    }
  }

  form?.addEventListener('submit', check);
  demoButton?.addEventListener('click', () => {
    const serial = document.getElementById('serial');
    const pin = document.getElementById('pin');
    const session = document.getElementById('session');
    const term = document.getElementById('term');
    if (serial) serial.value = 'LAFF-DEMO-001';
    if (pin) pin.value = '246810';
    if (session) session.value = '2025/2026';
    if (term) term.value = 'FIRST';
    form?.requestSubmit();
  });
})();
