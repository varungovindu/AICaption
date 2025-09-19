# AI Captioning Service using Hugging Face Transformers
from flask import Flask, request, jsonify
from PIL import Image
import io
from transformers import BlipProcessor, BlipForConditionalGeneration

app = Flask(__name__)

# Load model and processor
processor = BlipProcessor.from_pretrained('Salesforce/blip-image-captioning-base')
model = BlipForConditionalGeneration.from_pretrained('Salesforce/blip-image-captioning-base')


import re

def make_social_caption(caption):
    # Add emoji and a call to action for social media flavor
    emojis = ['🔥', '✨', '😍', '🌟', '😎', '📸', '💫', '🙌', '🌈', '💥']
    cta = [
        "What do you think?",
        "Drop a like!",
        "Tag a friend!",
        "#Vibes",
        "Your thoughts?",
        "Feeling this!",
        "#Inspo",
        "#OOTD",
        "#NoFilter",
        "#LifeIsGood"
    ]
    import random
    emoji = random.choice(emojis)
    call = random.choice(cta)
    # Capitalize first letter, add emoji and CTA
    return f"{caption.strip().capitalize()} {emoji} {call}"

def generate_hashtags(text, num=5):
    # Simple keyword extraction for hashtags
    words = re.findall(r'\b\w{4,}\b', text.lower())
    common = set(['with','this','that','have','from','your','about','which','would','there','their','could','should','these','those','will','just','like','what','when','where','while','because','into','over','under','above','below','after','before','again','more','most','some','such','only','own','same','than','too','very','can','has','get','got','make','made','also','much','many','each','other','every','both','between','through','during','without','within','upon','once','here','who','whom','whose','why','how','our','ours','you','yours','they','them','theirs','she','her','hers','him','his','he','it','its','we','us','are','was','were','been','am','is','be','do','does','did','not','no','yes','on','in','at','by','for','to','of','and','or','but','if','as','an','a','the'])
    keywords = [w for w in words if w not in common]
    hashtags = [f"#{w}" for w in list(dict.fromkeys(keywords))[:num]]
    return hashtags

@app.route('/caption', methods=['POST'])
def caption_image():
    image_bytes = request.data
    image = Image.open(io.BytesIO(image_bytes)).convert('RGB')
    # Use BLIP default image captioning
    inputs = processor(image, return_tensors="pt")
    out = model.generate(**inputs)
    caption = processor.decode(out[0], skip_special_tokens=True)
    social_caption = make_social_caption(caption)
    hashtags = generate_hashtags(caption, num=5)
    return jsonify({'caption': social_caption, 'hashtags': hashtags})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
