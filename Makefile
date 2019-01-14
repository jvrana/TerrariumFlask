init:
	pip install pipenv -U
	pipenv install --dev


create:
	pipenv run python manage.py create_db
	pipenv run python manage.py db init
	pipenv run python manage.py db migrate
	pipenv run python manage.py db upgrade


run:
	pipenv run python manage.py runserver


worker:
	sudo celery -A application worker -E -l INFO