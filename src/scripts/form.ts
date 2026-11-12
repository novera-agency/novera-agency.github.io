/**
 * Validation et envoi du formulaire de devis.
 * - Web3Forms ou Formspree selon src/config/site.ts.
 * - Aucun succès n'est affiché sans réponse positive du service.
 * - Sans service configuré : message explicite + envoi par e-mail.
 */

const MESSAGES: Record<string, string> = {
  valueMissing: 'Ce champ est obligatoire.',
  typeMismatch: 'Veuillez saisir une adresse e-mail valide.',
  patternMismatch: 'Veuillez saisir un numéro de téléphone valide.',
  tooShort: 'Merci de donner un peu plus de détails.',
};

type Field = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

function errorFor(el: Field): string {
  if (el.type === 'checkbox' && el.validity.valueMissing) return 'Votre accord est nécessaire pour traiter la demande.';
  if (el.validity.tooShort && el.name === 'message') return 'Merci de décrire votre besoin en quelques phrases (20 caractères minimum).';
  for (const key of Object.keys(MESSAGES)) {
    if (el.validity[key as keyof ValidityState]) return MESSAGES[key];
  }
  return '';
}

function showFieldError(el: Field) {
  const wrap = el.closest('.field');
  const msg = errorFor(el);
  const errEl = el.id ? document.getElementById(`${el.id}-err`) : null;
  wrap?.classList.toggle('is-invalid', Boolean(msg));
  el.setAttribute('aria-invalid', String(Boolean(msg)));
  if (errEl) {
    errEl.textContent = msg;
    if (msg) el.setAttribute('aria-describedby', errEl.id);
    else el.removeAttribute('aria-describedby');
  }
  return !msg;
}

function setStatus(box: HTMLElement, state: 'success' | 'error' | 'info', html: string) {
  box.dataset.state = state;
  box.innerHTML = html;
  box.hidden = false;
  box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
}

function buildMailto(form: HTMLFormElement): string {
  const email = form.dataset.email ?? '';
  const data = new FormData(form);
  const lines = [
    `Type de projet : ${data.get('type_projet') ?? ''}`,
    `Nom : ${data.get('nom') ?? ''}`,
    `Entreprise : ${data.get('entreprise') ?? ''}`,
    `E-mail : ${data.get('email') ?? ''}`,
    `Téléphone : ${data.get('telephone') ?? ''}`,
    `Secteur : ${data.get('secteur') ?? ''}`,
    '',
    `${data.get('message') ?? ''}`,
  ];
  return `mailto:${email}?subject=${encodeURIComponent(form.dataset.subject ?? 'Demande de devis')}&body=${encodeURIComponent(lines.join('\n'))}`;
}

async function send(form: HTMLFormElement): Promise<void> {
  const provider = form.dataset.provider;
  const data = new FormData(form);
  data.delete('website');
  if (provider === 'web3forms') {
    const res = await fetch(form.action, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(Object.fromEntries(data)),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok || !json.success) throw new Error(json.message || `HTTP ${res.status}`);
    return;
  }
  if (provider === 'formspree') {
    data.set('_subject', String(data.get('subject') ?? ''));
    data.set('_replyto', String(data.get('email') ?? ''));
    const res = await fetch(form.action, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
    if (!res.ok) {
      const json = await res.json().catch(() => ({}));
      throw new Error(json?.errors?.[0]?.message || `HTTP ${res.status}`);
    }
    return;
  }
  throw new Error('not-configured');
}

export function initContactForms() {
  document.querySelectorAll<HTMLFormElement>('[data-contact-form]').forEach((form) => {
    const status = form.querySelector<HTMLElement>('[data-form-status]')!;
    const submit = form.querySelector<HTMLButtonElement>('[data-submit]')!;
    const label = form.querySelector<HTMLElement>('[data-submit-label]')!;
    const fields = [...form.querySelectorAll<Field>('input:not([type=hidden]):not([name=website]), select, textarea')]
      .filter((f) => f.type !== 'radio');

    fields.forEach((f) => {
      f.addEventListener('blur', () => { if (f.value || f.closest('.field')?.classList.contains('is-invalid')) showFieldError(f); });
      f.addEventListener('input', () => { if (f.closest('.field')?.classList.contains('is-invalid')) showFieldError(f); });
      f.addEventListener('change', () => { if (f.closest('.field')?.classList.contains('is-invalid')) showFieldError(f); });
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      status.hidden = true;

      // Pot de miel : on ignore silencieusement les robots.
      const hp = form.querySelector<HTMLInputElement>('[name=website]');
      if (hp?.value) return;

      const results = fields.map(showFieldError);
      if (results.includes(false)) {
        const first = fields.find((f) => !f.validity.valid);
        first?.focus();
        setStatus(status, 'error', '<strong>Certains champs sont à compléter.</strong>Merci de vérifier les informations indiquées en rouge.');
        return;
      }

      if (form.dataset.provider === 'none') {
        const mailto = buildMailto(form);
        setStatus(
          status,
          'info',
          `<strong>L’envoi en ligne n’est pas encore activé.</strong>Votre demande <u>n’a pas été transmise</u>. Vous pouvez l’envoyer directement par e-mail : <a href="${escapeHtml(mailto)}">ouvrir ma messagerie avec la demande pré-remplie</a>, ou écrire à <a href="mailto:${escapeHtml(form.dataset.email ?? '')}">${escapeHtml(form.dataset.email ?? '')}</a>.`,
        );
        return;
      }

      submit.setAttribute('aria-busy', 'true');
      submit.disabled = true;
      const original = label.textContent;
      label.textContent = 'Envoi en cours…';
      try {
        await send(form);
        form.reset();
        fields.forEach((f) => { f.closest('.field')?.classList.remove('is-invalid'); f.removeAttribute('aria-invalid'); });
        setStatus(status, 'success', '<strong>Merci, votre demande a bien été envoyée.</strong>Nous l’étudions et revenons vers vous dans les meilleurs délais.');
      } catch (err) {
        console.error('[formulaire]', err);
        const mailto = buildMailto(form);
        setStatus(
          status,
          'error',
          `<strong>Votre demande n’a pas pu être envoyée.</strong>Une erreur technique est survenue. Réessayez dans un instant ou <a href="${escapeHtml(mailto)}">envoyez-la par e-mail</a>.`,
        );
      } finally {
        submit.removeAttribute('aria-busy');
        submit.disabled = false;
        label.textContent = original;
      }
    });
  });
}
