/**
 * Main purpos of sending queue is to meet AWS SES sending rate limits.
 * @returns {Object}
 */
function createSendingQueue() {
  const RATE_LIMIT_PER_SECOND = 10;
  const workersQueue = [];

  let activeWorkers = 0;
  let interval = null;
  let workersQueueIsFinished = false;

  function increaseActiveWorkersCounter() { activeWorkers += 1; }
  function decreaseActiveWorkersCounter() { activeWorkers -= 1; }

  /**
   * @param {Function} payloadFunction - returns Promise
   * @returns {Function}
   */
  function createWorkerFunction(payloadFunction) {
    return () => {
      // Worker starts its job. Increate the counter.
      increaseActiveWorkersCounter();

      // execute payload function which will return Promise
      payloadFunction()
        // Decrease the counter when worker finish its job.
        .then(decreaseActiveWorkersCounter)
        .catch((error) => {
          console.log(error);
          decreaseActiveWorkersCounter();
        });
    };
  }

  function runWorkers() {
    const spotsLeft = RATE_LIMIT_PER_SECOND - activeWorkers;

    workersQueue.splice(0, spotsLeft).forEach(worker => worker());
  }

  /**
   * @param {Function} payloadFunction - it has to return Promise
   */
  function createWorker(payloadFunction) {
    const worker = createWorkerFunction(payloadFunction);
    workersQueue.push(worker);
  }

  function startExecutionInterval() {
    interval = setInterval(() => {
      if (workersQueueIsFinished && workersQueue.length === 0) {
        clearInterval(interval);
      } else {
        runWorkers();
      }
    }, 1000);
  }

  function finishWorkersQueue() {
    workersQueueIsFinished = true;
  }

  return {
    createWorker,
    startExecutionInterval,
    finishWorkersQueue,
  };
}

module.exports = createSendingQueue;
