// // Import packages
// import { format as _format, createLogger, transports as _transports } from "winston";
// import { basename } from "path";

// // Log format for development
// const developmentLogFormatter = _format.printf(({ level, timestamp, message, source = "", stack = "" }) => {
//     const msg = typeof message !== "string" ? JSON.stringify(message, null, 4) : message;
//     return `${timestamp} [${level}] ${source === "" ? "" : `[${source}]`} ${msg} ${stack}`;
// });

// const developmentLogFormat = _format.combine(
//     _format.errors({
//         stack: true,
//     }),
//     _format.timestamp({
//         format: "YYYY-MM-DD HH:mm:ss.SSS ZZ",
//     }),
//     _format.colorize(),
//     developmentLogFormatter,
// );

// // Log format for production
// const productionLogFormat = _format.combine(
//     _format.errors({
//         stack: true,
//     }),
//     _format.timestamp({
//         format: "YYYY-MM-DD HH:mm:ss.SSS ZZ",
//     }),
//     _format.json(),
// );

// // Creating logger by Winston
// let loggerInstance;
// if (process.env.NODE_APP_ENV === "development" || process.env.NODE_APP_ENV === "staging") {
//     loggerInstance = createLogger({
//         level: "info",
//         format: developmentLogFormat,
//         transports: [new _transports.Console()],
//     });
// } else {
//     loggerInstance = createLogger({
//         level: "info",
//         format: productionLogFormat,
//         transports: [
//             new _transports.Console({
//                 format: developmentLogFormat,
//             }),
//         ],
//     });
// }

// // Function: Get Caller File Name
// function getCallerFile() {
//     const originalFunc = Error.prepareStackTrace;

//     let callerFile;
//     try {
//         const err = new Error();

//         Error.prepareStackTrace = (_err, stack) => stack;

//         const currentFile = err.stack.shift().getFileName();

//         while (err.stack.length) {
//             callerFile = err.stack.shift().getFileName();

//             if (currentFile !== callerFile) break;
//         }
//     } catch (e) {
//         //
//     }

//     Error.prepareStackTrace = originalFunc;

//     return basename(callerFile).replace(/\.[^/.]+$/, "");
// }

// // Function: Get Caller Function Name
// function getFunctionName(d = 2) {
//     const error = new Error();
//     const functionName = ((((error.stack.split("at ") || [])[1 + d] || "").match(/(^|\.| <| )(.*[^(<])( \()/) || [])[2] || "").split(".").pop();
//     return functionName !== "<anonymous>" ? functionName : "";
// }

// export  const logger = {
//         loggerInstance.info({ source: `${fileName}${functionName ? `.${functionName}` : ""}`, message });
//     },
//     error(message, functionName = "", fileName = getCallerFile()) {
//         loggerInstance.error({ source: `${fileName}${functionName ? `.${functionName}` : ""}`, message });
//     },
//     warn(message, functionName = "", fileName = getCallerFile()) {
//         loggerInstance.warn({ source: `${fileName}${functionName ? `.${functionName}` : ""}`, message });
//     },
// };