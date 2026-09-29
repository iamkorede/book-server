import morgan from "morgan";
// Custom JSON Logger Middleware
export const jsonLogger = (req, res, next) => {
  // Capture start time to calculate total response duration
  const startHrTime = process.hrtime();

  // Listen for the response to finish before building the log object
  res.on('finish', () => {
    // Calculate elapsed time in milliseconds
    const elapsedHrTime = process.hrtime(startHrTime);
    const elapsedTimeInMs = (elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6).toFixed(3);

    // Build the structured JSON log object
    const logData = {
      timestamp: new Date().toISOString(),
      request: {
        method: req.method,
        url: req.originalUrl || req.url,
        host: req.get('host'),
        ip: req.ip || req.connection.remoteAddress,
        headers: {
          userAgent: req.get('user-agent'),
          referer: req.get('referer') || null
        }
      },
      response: {
        statusCode: res.statusCode,
        statusMessage: res.statusMessage,
        responseTimeMs: parseFloat(elapsedTimeInMs)
      }
    };

    // Output as a single line stringified JSON (ideal for log aggregators)
    console.log(JSON.stringify(logData));
  });

  next();
};

// Apply the middleware globally before any routes

export const jsonMorganLogger = morgan((tokens, req, res) => {
  return JSON.stringify({
    timestamp: tokens.date(req, res, 'iso'),
    request: {
      method: tokens.method(req, res),
      url: tokens.url(req, res),
      host: req.get('host'),
      ip: tokens['remote-addr'](req, res),
      userAgent: tokens['user-agent'](req, res)
    },
    response: {
      status: Number(tokens.status(req, res)),
      contentLength: tokens.res(req, res, 'content-length') || 0,
      responseTimeMs: Number(tokens['response-time'](req, res))
    }
  });
});
