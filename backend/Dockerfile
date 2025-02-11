FROM python:3.9-slim

# Установка системных зависимостей для Python и сборки зависимостей
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Создание и активация виртуального окружения
RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# Копирование файлов приложения
COPY . /app

WORKDIR /app

# Установка зависимостей из requirements.txt
RUN pip install --upgrade pip && pip install -r requirements.txt

# Команда для запуска сервиса (например, Gunicorn)
CMD ["gunicorn", "-b", "0.0.0.0:8000", "app:app"]
