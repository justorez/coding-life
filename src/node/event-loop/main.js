const fs = require('fs')

const ITERATIONS_MAX = 2
let iteration = 0
const start = Date.now()

const msleep = (i) => {
    for (let index = 0; Date.now() - start < i; index++) {
        // do nonthing
    }
}
const logger = {
    info: (msg, stage) => console.log(`${Date.now()}:INFO: ${stage}: ${msg}`)
}

Promise.resolve().then(() => {
    // Microtask callback runs AFTER mainline, even though the code is here
    logger.info('Promise.resolve.then', 'MAINLINE MICROTASK')
})

logger.info('START', 'MAINLINE')
const timeout = setInterval(() => {
    logger.info(
        'START iteration ' + iteration + ': setInterval',
        'TIMERS PHASE'
    )
    if (iteration < ITERATIONS_MAX) {
        setTimeout(
            (iteration) => {
                logger.info(
                    'TIMER EXPIRED (from iteration ' +
                        iteration +
                        '): setInterval.setTimeout',
                    'TIMERS PHASE'
                )
                Promise.resolve().then(() => {
                    logger.info(
                        'setInterval.setTimeout.Promise.resolve.then',
                        'TIMERS PHASE MICROTASK'
                    )
                })
            },
            0,
            iteration
        )

        fs.readdir(__dirname, (err, files) => {
            if (err) throw err
            logger.info(
                'fs.readdir() callback: Directory contains: ' +
                    files.length +
                    ' files',
                'POLL PHASE'
            )
            queueMicrotask(() =>
                logger.info(
                    'setInterval.fs.readdir.queueMicrotask',
                    'POLL PHASE MICROTASK'
                )
            )
            Promise.resolve().then(() => {
                logger.info(
                    'setInterval.fs.readdir.Promise.resolve.then',
                    'POLL PHASE MICROTASK'
                )
            })
        })

        setImmediate(() => {
            logger.info('setInterval.setImmediate', 'CHECK PHASE')
            Promise.resolve().then(() => {
                logger.info(
                    'setInterval.setTimeout.Promise.resolve.then',
                    'CHECK PHASE MICROTASK'
                )
            })
        })
        // msleep(1000); // 等待 I/O 完成
    } else {
        logger.info('Max interval count exceeded. Goodbye.', 'TIMERS PHASE')
        clearInterval(timeout)
    }

    logger.info('END iteration ' + iteration + ': setInterval', 'TIMERS PHASE')
    iteration++
}, 0)
logger.info('END', 'MAINLINE')
