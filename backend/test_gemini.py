from app.ai.gemini import model

response = model.generate_content("Say Hello")

print(response.text)