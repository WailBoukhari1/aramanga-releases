(function () {
  const ids = ['downloadButton', 'downloadButtonBottom', 'releaseLink'];
  const byId = (id) => document.getElementById(id);
  const setDownload = (url) => ids.forEach((id) => { const element = byId(id); if (element) element.href = url; });

  async function loadRelease() {
    const meta = byId('releaseMeta');
    const version = byId('releaseVersion');
    const finalNote = byId('finalReleaseNote');
    try {
      const response = await fetch('update.json', { cache: 'no-store' });
      if (!response.ok) throw new Error('Manifest unavailable');
      const update = await response.json();
      if (!update.apkUrl || !update.version) throw new Error('Manifest is incomplete');
      setDownload(update.apkUrl);
      if (version) version.textContent = `AraManga ${update.version}`;
      if (meta) meta.textContent = update.notes || 'أحدث إصدار متاح للتنزيل الآن.';
      if (finalNote) finalNote.textContent = `الإصدار ${update.version} متاح الآن. سيظهر أي تحديث جديد هنا تلقائياً.`;
    } catch (error) {
      if (version) version.textContent = 'الإصدار الحالي';
      if (meta) meta.textContent = 'استخدم زر التنزيل للحصول على آخر إصدار متاح.';
      if (finalNote) finalNote.textContent = 'استخدم زر التنزيل للحصول على آخر إصدار متاح.';
    }
  }

  const year = byId('currentYear');
  if (year) year.textContent = String(new Date().getFullYear());
  loadRelease();
}());
