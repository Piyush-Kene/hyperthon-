import os
import requests
import json

# Replace with your real key / token (but don't commit it in code)
API_KEY = "AIzaSyBPwePgl9dJ6WeXQC561It1rNPbWGg35C8"

def generate_gemini_response(prompt, model="gemini-2.5-flash"):
    """
    Send a prompt to the Gemini API and return the response text.
    """
    url = "https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent".format(model=model)
    
    headers = {
        "Content-Type": "application/json",
        "x-goog-api-key": API_KEY
    }
    
    payload = {
        "contents": [
            {
                "parts": [
                    {
                        "text": prompt
                    }
                ]
            }
        ]
    }
    
    response = requests.post(url, headers=headers, data=json.dumps(payload))
    if response.status_code != 200:
        raise Exception(f"Request failed: {response.status_code}, {response.text}")
    
    resp_json = response.json()
    # The returned JSON has nested structure; extract the content pieces
    try:
        # Example: candidates -> first candidate -> content -> parts -> first part -> text
        content = resp_json["candidates"][0]["content"]["parts"][0]["text"]
        return content
    except KeyError as e:
        # Unexpected format
        raise Exception(f"Unexpected response format: missing {e}. Full response: {resp_json}")

if __name__ == "__main__":
    prompt_text = "Explain how AI works in a few simple points."
    answer = generate_gemini_response(prompt_text)
    print("Gemini says:", answer)
