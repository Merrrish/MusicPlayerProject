FROM python:3.9-slim

RUN apt-get update && apt-get install -y build-essential && rm -rf /var/lib/apt/lists/*

RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

COPY requirements.txt /app/requirements.txt
WORKDIR /app

RUN pip install --upgrade pip && pip install -r requirements.txt

COPY . /app

CMD ["gunicorn", "-b", "0.0.0.0:8000", "app:app"]
