from application.celery import celery
import random
import time
from pydent import AqSession


def format_task_json(state, current, total, status, result):
    return {
        'state': state,
        'current': current,
        'total': total,
        'status': status,
        'result': result
    }


def update_task_progress(self, task_json):
    print(task_json)
    self.update_state(state=task_json['state'],
                      meta={'current': task_json['current'],
                            'total': task_json['total'],
                            'status': task_json['status'],
                            'result': task_json['result']
                            })


@celery.task(bind=True)
def long_task(self):
    """Background task that runs a long function with progress reports."""
    verb = ['Starting up', 'Booting', 'Repairing', 'Loading', 'Checking']
    adjective = ['master', 'radiant', 'silent', 'harmonic', 'fast']
    noun = ['solar array', 'particle reshaper', 'cosmic ray', 'orbiter', 'bit']
    message = ''
    total = random.randint(10, 250)
    for i in range(total):
        if not message or random.random() < 0.25:
            message = '{0} {1} {2}...'.format(random.choice(verb),
                                              random.choice(adjective),
                                              random.choice(noun))

        task_json = format_task_json('PROGRESS', i, total, message, None)
        update_task_progress(self, task_json)
        time.sleep(0.05)
    return format_task_json(
        'COMPLETE',
        total,
        total,
        'Task complete',
        'Done'
    )


@celery.task(bind=True)
def ping_connection(self, login, password, url):
    num = 5.0
    session = AqSession(login, password, url)
    ping = session.ping(5)
    avg = ping / num
    return format_task_json(
        'COMPLETE',
        1,
        1,
        'Task complete',
        avg
    )


@celery.task(bind=True)
def create_model(self, login, password, url):
    session = AqSession(login, password, url)
    ap = AutoPlanner(session, depth=50)
    ap.construct_template_graph()
    return format_task_json(
        'COMPLETE',
        1,
        1,
        'Task complete',
        "complete"
    )
