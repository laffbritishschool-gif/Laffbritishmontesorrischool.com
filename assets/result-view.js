(() => {
  const key = 'laff-public-result';
  const rows = document.getElementById('view-result-rows');
  const details = document.getElementById('student-details');
  const stats = document.getElementById('view-stats');
  let data = null;

  try {
    data = JSON.parse(sessionStorage.getItem(key) || 'null');
  } catch (_) {
    data = null;
  }

  if (!data || !data.student || !Array.isArray(data.results) || !data.results.length) {
    location.replace('/result/');
    return;
  }

  function escapeHtml(value) {
    return String(value == null ? '—' : value).replace(/[&<>"']/g, function (character) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character];
    });
  }

  const student = data.student;
  const termNames = { FIRST: 'First Term', SECOND: 'Second Term', THIRD: 'Third Term' };
  const rawTerm = String(data.term || '').trim();
  const termKey = rawTerm.toUpperCase().replace(/\s+TERM$/i, '');
  const termLabel = termNames[termKey] || (rawTerm.endsWith('Term') ? rawTerm : (rawTerm || '—') + ' Term');

  document.getElementById('view-student-name').textContent = student.name || 'Student Result';
  document.getElementById('view-session-term').textContent = (data.session || '—') + ' • ' + termLabel;

  details.innerHTML = [
    ['Student ID', student.student_id],
    ['Exam Number', student.exam_number || 'Not assigned'],
    ['Class', student.class_name || student.class || student.class_level || '—'],
    ['Academic Session', data.session],
    ['Term', termLabel]
  ].map(function (item) {
    return '<div><small>' + escapeHtml(item[0]) + '</small><strong>' + escapeHtml(item[1]) + '</strong></div>';
  }).join('');

  const resultCount = data.results.length;
  const total = data.results.reduce(function (sum, result) { return sum + Number(result.total || 0); }, 0);
  const points = data.results.reduce(function (sum, result) { return sum + Number(result.grade_point || 0); }, 0);
  const average = resultCount ? total / resultCount : 0;

  stats.innerHTML =
    '<div><span>Subjects</span><strong>' + resultCount + '</strong></div>' +
    '<div><span>Average Mark</span><strong>' + average.toFixed(1) + '%</strong></div>' +
    '<div><span>Total Grade Points</span><strong>' + points.toFixed(1) + '</strong></div>';

  rows.innerHTML = data.results.map(function (result, index) {
    const grade = escapeHtml(result.grade || '—');
    return '<tr><td>' + (index + 1) + '</td>' +
      '<td>' + escapeHtml(result.subject) + '</td>' +
      '<td>' + escapeHtml(result.code) + '</td>' +
      '<td>' + escapeHtml(result.ca) + '</td>' +
      '<td>' + escapeHtml(result.exam) + '</td>' +
      '<td><strong>' + escapeHtml(result.total) + '</strong></td>' +
      '<td><span class="result-grade-pill">' + grade + '</span></td>' +
      '<td>' + escapeHtml(result.grade_point) + '</td>' +
      '<td>' + escapeHtml(result.teacher_remark || result.principal_remark || '—') + '</td></tr>';
  }).join('');

  const printButton = document.getElementById('print-only-result');
  if (printButton) printButton.addEventListener('click', function () { window.print(); });
  sessionStorage.removeItem(key);
})();
