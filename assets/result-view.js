(() => {
  const key = 'laff-public-result';
  const rows = document.getElementById('view-result-rows');
  const details = document.getElementById('student-details');
  const stats = document.getElementById('view-stats');
  const sheet = document.getElementById('print-result-area');
  const demoBanner = document.getElementById('sample-result-banner');
  let data = null;
  try {
    data = JSON.parse(sessionStorage.getItem(key) || 'null');
  } catch (_) {
    data = null;
  }
  if (!data?.student || !Array.isArray(data.results)) {
    location.replace('/result/');
    return;
  }

  const escapeHtml = (value) => String(value ?? '—').replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[character]);
  const student = data.student;
  const termNames = { FIRST: 'First Term', SECOND: 'Second Term', THIRD: 'Third Term' };
  const termKey = String(data.term || '').toUpperCase().replace(/\s+TERM$/i, '');
  const termLabel = termNames[termKey] || (String(data.term || '').endsWith('Term') ? data.term : `${data.term || '—'} Term`);

  document.getElementById('view-student-name').textContent = student.name || 'Student Result';
  document.getElementById('view-session-term').textContent = `${data.session || '—'} • ${termLabel}`;
  details.innerHTML = [
    ['Student ID', student.student_id],
    ['Exam Number', student.exam_number || 'Not assigned'],
    ['Academic Session', data.session],
    ['Term', termLabel]
  ].map(([label, value]) =>
    `<div><small>${escapeHtml(label)}</small><strong>${escapeHtml(value)}</strong></div>`
  ).join('');

  const resultCount = data.results.length;
  const total = data.results.reduce((sum, result) => sum + Number(result.total || 0), 0);
  const points = data.results.reduce((sum, result) => sum + Number(result.grade_point || 0), 0);
  const average = resultCount ? total / resultCount : 0;
  stats.innerHTML = `<div><span>Subjects</span><strong>${resultCount}</strong></div><div><span>Average Total</span><strong>${average.toFixed(1)}%</strong></div><div><span>Total Grade Points</span><strong>${points.toFixed(1)}</strong></div>`;

  rows.innerHTML = data.results.map((result, index) => {
    const grade = escapeHtml(result.grade || '—');
    return `<tr><td>${index + 1}</td><td>${escapeHtml(result.subject)}</td><td>${escapeHtml(result.code)}</td><td>${escapeHtml(result.ca)}</td><td>${escapeHtml(result.exam)}</td><td><strong>${escapeHtml(result.total)}</strong></td><td><span class="result-grade-pill">${grade}</span></td><td>${escapeHtml(result.grade_point)}</td><td>${escapeHtml(result.teacher_remark || result.principal_remark || '—')}</td></tr>`;
  }).join('');

  if (data.demo === true) {
    if (demoBanner) demoBanner.hidden = false;
    sheet?.classList.add('is-demo');
    document.body.classList.add('demo-result');
    const footerText = document.querySelector('.result-footer p');
    if (footerText) footerText.textContent = 'SAMPLE PREVIEW ONLY — fictional example data, not an official school result.';
  }
  document.getElementById('print-only-result')?.addEventListener('click', () => window.print());
  sessionStorage.removeItem(key);
})();
