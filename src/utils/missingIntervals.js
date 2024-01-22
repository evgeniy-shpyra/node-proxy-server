const getMissingIntervals = (ids, startId, endId) => {
    if(!ids.length) return [{ start: startId, end: endId }]

    const missingIntervals = []
    console.log({ids, startId, endId})
    let interval = { start: null, end: null }
    for (let id = startId; id <= endId; id++) {
        const isExist = ids.includes(id)
        if (!isExist && interval.start === null) interval.start = id
        else if (isExist && interval.start !== null) {
            interval.end = id - 1
            missingIntervals.push(interval)

            interval = { start: null, end: null }
        }
    }
    if (interval.start !== null && interval.end === null) {
        interval.end = endId 
        missingIntervals.push(interval)
    }

    return missingIntervals
}
 
export default getMissingIntervals