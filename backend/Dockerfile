# Используем официальный образ Python
FROM python:3.9-slim

# Установка системных зависимостей для Python и сборки зависимостей
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Создание и активация виртуального окружения
RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# Копируем только requirements.txt сначала для кэширования зависимостей
COPY requirements.txt /app/requirements.txt

WORKDIR /app

# Установка зависимостей из requirements.txt
RUN pip install --upgrade pip && pip install -r requirements.txt

# Копирование всего остального приложения
COPY . /app

# Команда для запуска сервиса через gunicorn
CMD ["gunicorn", "-b", "0.0.0.0:8000", "app:app"]
