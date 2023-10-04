FROM python:3.12.0

WORKDIR /app

COPY ./uploads .

CMD ["python", "hello_world.py"]