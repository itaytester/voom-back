import logger from 'pino';
import dayjs from 'dayjs';

const log = logger({
    base:{
        pid: false
    },
    prettyPrint: true,
    timestamp: () => `timestamp: ${dayjs().format()}`
})

export default log;