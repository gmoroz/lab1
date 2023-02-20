python manage.py migrate
python manage.py loaddata main/fixtures/titles.json
python manage.py loaddata main/fixtures/teams.json
python manage.py loaddata main/fixtures/calendar.json
python manage.py collectstatic --noinput
uvicorn tournament.asgi:application --host 0.0.0.0 --port 80
