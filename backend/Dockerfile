FROM python:3

WORKDIR /backend

ENV FLASK_APP=api.py

ENV FLASK_ENV=development

COPY . .

RUN pip install -r requirements.txt

CMD ["flask", "run", "-h", "0.0.0.0", "-p", "5000"]