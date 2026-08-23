# SentimentAnalysis

A Python-based NLP and Machine Learning project that analyzes user input and classifies its sentiment as **Positive, Negative, or Neutral**.

## 📌 Project Overview

The Sentiment Analysis Chatbot uses Natural Language Processing (NLP) and Machine Learning techniques to understand the sentiment expressed in text.

The project preprocesses text data, converts the processed text into numerical features using **TF-IDF (Term Frequency-Inverse Document Frequency)**, and uses a **Linear Support Vector Machine (SVM)** classifier to predict sentiment.

The trained model is then integrated into an interactive command-line chatbot that allows users to enter text and receive a sentiment prediction.

## 🚀 Features

- Text preprocessing and cleaning
- HTML tag removal
- Contraction expansion
- Special character removal
- Emoji processing
- Lowercase conversion
- Tokenization
- Stopword removal
- Lemmatization
- TF-IDF text vectorization
- Linear SVM classification
- Model accuracy evaluation
- Interactive command-line chatbot
- Positive, negative, and neutral sentiment classification

## 🛠️ Technologies Used

- **Python**
- **Pandas** – Data handling and preprocessing
- **NumPy** – Numerical operations
- **NLTK** – Natural Language Processing
- **Scikit-learn** – Machine Learning
- **TF-IDF** – Text feature extraction
- **SVM (Support Vector Machine)** – Sentiment classification
- **Regex** – Text cleaning
- **Emoji** – Emoji processing
- **Contractions** – Contraction expansion

## 📂 Project Structure

```text
SentimentAnalysis/
│
├── sentiment_analysis_chatbot.py
├── sentiment_train.csv
└── README.md
