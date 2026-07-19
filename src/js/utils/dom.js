export function $(selector, ctx = document) { return ctx.querySelector(selector) }
export function $$(selector, ctx = document) { return [...ctx.querySelectorAll(selector)] }

export function clearElement(el) { while (el.firstChild) el.removeChild(el.firstChild) }

export function debounce(fn, delay = 300) {
  let timeout
  return function (...args) { clearTimeout(timeout); timeout = setTimeout(() => fn.apply(this, args), delay) }
}

export function safeText(text) {
  if (text === null || text === undefined) return ''
  const div = document.createElement('div')
  div.textContent = String(text)
  return div.innerHTML
}

export function disableButton(btn) {
  btn.disabled = true
  const orig = btn.innerHTML
  btn.dataset.originalHtml = orig
  btn.innerHTML = '<span class="loading-spinner"></span>'
  return orig
}

export function enableButton(btn) {
  btn.disabled = false
  if (btn.dataset.originalHtml) btn.innerHTML = btn.dataset.originalHtml
}
