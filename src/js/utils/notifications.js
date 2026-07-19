let container = null

function ensureContainer() {
  if (!container) {
    container = document.createElement('div')
    container.style.cssText = 'position:fixed;top:1rem;right:1rem;z-index:10000;display:flex;flex-direction:column;gap:0.5rem;max-width:400px;width:calc(100% - 2rem);'
    document.body.appendChild(container)
  }
  return container
}

function toast(message, type, duration = 4000) {
  const c = ensureContainer()
  const el = document.createElement('div')
  const icons = { success: '✓', error: '✕', warning: '⚠', info: 'ℹ' }
  const colors = { success: '#10b981', error: '#ef4444', warning: '#f59e0b', info: '#3b82f6' }
  el.style.cssText = `display:flex;align-items:center;gap:0.75rem;padding:1rem;border-radius:0.5rem;background:white;border-left:4px solid ${colors[type]};box-shadow:0 4px 12px rgba(0,0,0,0.15);animation:slideIn 0.3s ease;font-size:0.875rem;color:#1e293b;`
  el.innerHTML = `<span style="font-size:1.1rem;flex-shrink:0">${icons[type]}</span><span style="flex:1">${message}</span><button style="background:none;border:none;cursor:pointer;font-size:1.1rem;color:#94a3b8;padding:0">&times;</button>`
  el.querySelector('button').onclick = () => el.remove()
  c.appendChild(el)
  if (duration > 0) setTimeout(() => { if (el.parentNode) { el.style.animation = 'slideOut 0.3s ease'; setTimeout(() => el.remove(), 300) } }, duration)
}

const styleEl = document.createElement('style')
styleEl.textContent = '@keyframes slideIn{from{transform:translateX(100%);opacity:0}to{transform:translateX(0);opacity:1}}@keyframes slideOut{from{transform:translateX(0);opacity:1}to{transform:translateX(100%);opacity:0}}'
document.head.appendChild(styleEl)

export const showSuccess = (msg, d) => toast(msg, 'success', d)
export const showError = (msg, d) => toast(msg, 'error', d)
export const showWarning = (msg, d) => toast(msg, 'warning', d)
export const showInfo = (msg, d) => toast(msg, 'info', d)
