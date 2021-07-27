const logger = console

export default logger

export function logRequest(req, res) {
  const initialTime = new Date()
  const { url, method, ip } = req

  res.on('close', () => {
    _logRequest({ initialTime, url, method, ip, status: res.statusCode, error: res.error })
  })
  res.on('error', () => {
    _logRequest({ initialTime, url, method, ip, status: res.statusCode, error: res.error, isError: true })
  })
}

function _logRequest({ initialTime, url, method, ip, status, error, isError = false }) {
  const elapsedTime = +new Date() - +initialTime

  const level = isError ? 'error' : 'info'
  logger[level](
    `[${ip}] - ${method} ${url} => Resolved in ${elapsedTime} ms`,
    {
      status,
      error: status >= 400,
      errorMessage: error?.message || 'None',
      ...(error &&{ errorInfo: { ...error, stack: error.stack } }),
    }
  )
}
