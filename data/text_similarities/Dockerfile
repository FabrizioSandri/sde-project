# Use the official Python 3.12 image as the base image
FROM python:3.12

# Set the working directory inside the container to /app
WORKDIR /app

# Copy the app.py file from the host to the container's /app directory
COPY . /app

# Install the Python dependencies listed in requirements.txt using pip
RUN pip install -r requirements.txt

# Install the spaCy model
RUN python -m spacy download en_core_web_sm

# Define the command to run when the container starts
CMD python app.py