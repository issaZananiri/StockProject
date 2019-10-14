import threading, time


class KillableThread(threading.Thread):
    def __init__(self, sleep_interval=0, task=0, args=[]):
        super().__init__()
        self.task = task
        self.args = args
        self._kill = threading.Event()
        self._interval = sleep_interval

    def run(self):
        while True:
            self.task(*self.args)

            # If no kill signal is set, sleep for the interval,
            # If kill signal comes in while sleeping, immediately
            #  wake up and handle
            is_killed = self._kill.wait(self._interval)
            if is_killed:
                break

        print("Killing Thread")

    def kill(self):
        self._kill.set()


# how to use
WAIT_TIME_SECONDS = 1


def mytask(param1, param2):
    print(time.ctime(), param1, param2)


t = KillableThread(sleep_interval=WAIT_TIME_SECONDS, task=mytask, args=[1, 2])
t.start()
# t.kill()
