from celery import Celery
from config import TestingConfig

celery = Celery("application", broker=TestingConfig.CELERY_BROKER_URL, backend=TestingConfig.CELERY_RESULT_BACKEND)