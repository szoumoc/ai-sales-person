import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

# Initialize the OpenAI client
client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)

def get_gpt_response(prompt):
    try:
        print("Prompt received:", prompt)
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": prompt}
            ]
        )
        reply = response.choices[0].message.content
        print("GPT Reply:", reply)
        return reply
    except Exception as e:
        print("OpenAI API Error:", e)
        return "Sorry, I couldn't process your request."