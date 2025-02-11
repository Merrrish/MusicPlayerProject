# Используем официальный Python образ
FROM python:3.9-slim

# Устанавливаем зависимости
RUN apt-get update && apt-get install -y build-essential libpq-dev && rm -rf /var/lib/apt/lists/*

# Создаем и активируем виртуальное окружение
RUN python -m venv /opt/venv

# Обновляем pip
RUN /opt/venv/bin/pip install --upgrade pip

# Устанавливаем зависимости из requirements.txt
COPY requirements.txt /app/requirements.txt
RUN /opt/venv/bin/pip install -r /app/requirements.txt

# Копируем все файлы проекта в контейнер
COPY . /app

# Переходим в директорию приложения
WORKDIR /app

# Запускаем Flask приложение на порту 5000
CMD ["/opt/venv/bin/python", "app.py"]
