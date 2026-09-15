(() => {
  const API = 'https://moqpmrhholbbhuedvbgg.supabase.co';
  const KEY = 'sb_publishable_IfSp9O5zUubH6rifFbfmZQ_DJttLC1f';
  const form = document.getElementById('result-form');
  const output = document.getElementById('result-output');
  const message = document.getElementById('result-message');
  const submit = form?.querySelector('.result-submit');
  const rows = document.getElementById('result-rows');
  const summary = document.getElementById('result-summary');
  const studentName = document.getElementById('student-name');
  const studentMeta = document.getElementById('student-meta');
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const setMessage = (text, type='') => { if(message){ message.textContent = text; message.className = `result-message ${type}`; } };
  const setBusy = busy => { if(submit){ submit.disabled = busy; submit.classList.toggle('loading', busy); } };
  const first = (obj, keys) => keys.map(k => obj?.[k]).find(v => v !== undefined && v !== null && v !== '');
  const listFromResponse = data => {
    if(Array.isArray(data)) return data;
    for(const key of ['results','rows','subjects','data','items']) if(Array.isArray(data?.[key])) return data[key];
    if(data?.result && Array.isArray(data.result)) return data.result;
    if(data?.result?.results && Array.isArray(data.result.results)) return data.result.results;
    if(data?.result?.rows && Array.isArray(data.result.rows)) return data.result.rows;
    return [];
  };
  function render(data) {
    const items = listFromResponse(data);
    const firstRow = items[0] || {};
    const student = data?.student || data?.student_info || firstRow.student || {};
    const name = first(student, ['full_name','name']) || first(data, ['student_name']) || 'Student result';
    const reg = first(student, ['student_id','registration_number','exam_number']) || first(data, ['registration_number']);
    const cls = first(student, ['class_name','class']) || first(firstRow, ['class_name','class']);
    const session = document.getElementById('session')?.value || first(data, ['session_name','session']) || '';
    const term = document.getElementById('term')?.value || first(data, ['term_name','term']) || '';
    if(studentName) studentName.textContent = name;
    if(studentMeta) studentMeta.textContent = [reg && `Student ID: ${reg}`, cls && `Class: ${cls}`, session, term && `${term} Term`].filter(Boolean).join('  •  ');
    const total = items.reduce((sum, r) => sum + Number(first(r,['total','score','overall_total']) || 0), 0);
    const average = items.length ? total / items.length : 0;
    const points = items.reduce((sum, r) => sum + Number(first(r,['grade_point','point']) || 0), 0);
    if(summary) summary.innerHTML = `<div><span>Subjects</span><strong>${items.length}</strong></div><div><span>Average</span><strong>${average.toFixed(1)}</strong></div><div><span>Grade points</span><strong>${points.toFixed(1)}</strong></div>`;
    if(rows) rows.innerHTML = items.length ? items.map(r => {
      const subjectValue = first(r,['subject_name','subject']) || r.subject?.name || r.subject?.title || r.name || 'Subject';
      const ca = first(r,['ca_score','ca']) ?? '—';
      const exam = first(r,['exam_score','exam']) ?? '—';
      const score = first(r,['total','score','overall_total']) ?? '—';
      const grade = first(r,['grade']) || '—';
      const remark = first(r,['teacher_remark','principal_remark','remark']) || '—';
      return `<tr><td>${esc(subjectValue)}</td><td>${esc(ca)}</td><td>${esc(exam)}</td><td><strong>${esc(score)}</strong></td><td><span class="grade-badge">${esc(grade)}</span></td><td>${esc(remark)}</td></tr>`;
    }).join('') : '<tr><td colspan="6">No published result subjects were returned.</td></tr>';
    output.hidden = false;
    output.scrollIntoView({behavior:'smooth', block:'start'});
  }
  async function checkResult(event) {
    event.preventDefault();
    const serial = document.getElementById('serial')?.value.trim();
    const pin = document.getElementById('pin')?.value.trim();
    const session = document.getElementById('session')?.value.trim();
    const term = document.getElementById('term')?.value;
    if(!serial || !pin || !session){ setMessage('Enter your serial number, PIN and academic session.', 'error'); return; }
    setBusy(true); setMessage('Checking your published result…','loading');
    if(output) output.hidden = true;
    try {
      const response = await fetch(`${API}/rest/v1/rpc/check_public_result`, { method:'POST', headers:{'Content-Type':'application/json','apikey':KEY,'Authorization':`Bearer ${KEY}`}, body:JSON.stringify({p_serial:serial,p_pin:pin,p_session:session,p_term:term}) });
      const data = await response.json().catch(() => ({}));
      if(!response.ok) throw new Error(data?.message || data?.error || 'We could not verify those result details.');
      if(data?.ok === false || data?.error) throw new Error(data.error || 'Invalid result details.');
      const items = listFromResponse(data);
      if(!items.length && !data?.student && !data?.student_info && !data?.result) throw new Error('No published result was found for those details.');
      render(data?.result && !Array.isArray(data.result) ? data : data);
      setMessage('Result verified successfully.','success');
    } catch(error) { setMessage(error.message || 'Unable to check the result right now. Please try again.','error'); }
    finally { setBusy(false); }
  }
  form?.addEventListener('submit', checkResult);
  document.getElementById('print-result')?.addEventListener('click', () => window.print());
})();