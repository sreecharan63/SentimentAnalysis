#importing modules
import pandas as pd
import numpy as np
import re
import emoji
import contractions

#Download ""sentiment analysis dataset"" from Kaggle website  
# data = pd.read_csv(r'D:\sentiment_Analysis', encoding = 'Windows-1252')
data = pd.read_csv('sentiment_train.csv', encoding='Windows-1252')
#taking required dataframe from the whole data
df = data[['text', 'sentiment']].copy()

#df.info()


#removing Null values
df.dropna()



#removing html tags
df['clean_text'] = df['text'].astype(str).apply(lambda x: re.sub('<.*?>', "", x))

#removing contrations
def remove_contractions(text):
    expanded_text = contractions.fix(text)
    return expanded_text
df['clean_text'] = df['clean_text'].astype(str).apply(remove_contractions)

#removing special characters
df['clean_text'] = df['clean_text'].apply(lambda x: re.sub(r'[^\w\s]',"",x))

#remove emojis
def remove_emojis(text):
    return emoji.demojize( text)
df['clean_text'] = df['clean_text'].astype(str).apply(remove_emojis)

#Converting all letters into lowercase
df['clean_text'] = df['clean_text'].str.lower()

#importing natural language processing toolkit and other modules
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer

#nltk.download('punkt')
#nltk.download('stopwords')
stop_words = set(stopwords.words('english'))
#nltk.download('wordnet')
lemmatizer = WordNetLemmatizer()

#Tokenization
df['tokens'] = df['clean_text'].apply(word_tokenize)

#removing Stopwords
def remove_stopwords(token_list):
    return[word for word in token_list if word.lower() not in stop_words]

df['tokens'] = df['tokens'].apply(remove_stopwords)

#Lemmatization
def lemmatize_tokens(tokens):
    return[lemmatizer.lemmatize(x) for x in tokens]
df['tokens'] = df['tokens'].apply(lemmatize_tokens)


#df.info()

#Creating strings from the filtered tokens
df['token_string'] = df['tokens'].apply(lambda x: ' '.join(x))

#Vectorization
from sklearn.feature_extraction.text import TfidfVectorizer

tfidf = TfidfVectorizer()
X_tfidf = tfidf.fit_transform(df['token_string'])
y = df['sentiment']


#importing modules for building ML model
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score


#Splitting the data into training and testing data
X_train, X_test, y_train, y_test = train_test_split(X_tfidf, y, test_size = 0.2, random_state = 42)


#Training support vector machine model
svm_classifier = SVC(kernel = 'linear')
svm_classifier.fit(X_train, y_train)


#Checking Accuraccy
y_pred = svm_classifier.predict(X_test)
accuracy = accuracy_score(y_pred, y_test)


#creating chatbot
print("Welcome to Sentiment Analysis Chatbot")
print("Accuracy of this chatbot is", accuracy)
print('if you want to leave the chatbot type "exit"')

#preprocessing the input data
def preprocessed_input(n):
    #removing contractions
    m = remove_contractions(n)
    
    #removing emojis
    m = remove_emojis(m)
    
    tkns = word_tokenize(m.lower())
    filtered_tkns = [word for word in tkns if word.isalnum() and word not in stop_words]
    preprocessed_input = " ".join(filtered_tkns)
    input_tfidf = tfidf.transform([preprocessed_input])
    
    #predicting sentiment of the user
    predicted_sentiment = svm_classifier.predict(input_tfidf)[0]
    return predicted_sentiment


while True:
    n= input('you: ')
    predicted_sentiment = preprocessed_input(n)
    if n.lower() == 'exit':
        print("Chatbot: Good bye")
        break
    elif predicted_sentiment == 'positive':
        print("...positive sentiment")
        print("chatbot: I'm glad that your happy.")
    elif predicted_sentiment == 'negative':
        print("...negative sentiment")
        print("chatbot: I'm sorry to hear that.")
    else:
        print("...neutral sentiment")
        print("chatbot: Please, come here again.")

