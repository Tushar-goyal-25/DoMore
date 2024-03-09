from transformers import AutoTokenizer, AutoModelForCausalLM
import json
from transformers import pipeline

# Initialize text-generation pipeline for Gemma-2b
# generator = pipeline("text-generation", model="google/gemma-2b")

# # Provide your input text
# input_text = "Write a poem about nature."

# # Generate output using Gemma-2b
# generated_text = generator(input_text, max_length=100)[0]['generated_text']

# # Prepare data for JSON
# output_data = {"prompt": input_text, "generated_text": generated_text}


# access_token = "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"

tokenizer = AutoTokenizer.from_pretrained("google/gemma-2b-it")
model = AutoModelForCausalLM.from_pretrained("google/gemma-2b-it")

input_text = "a real-life photography task to adventure on"
input_ids = tokenizer(input_text, return_tensors="pt")

outputs = model.generate(**input_ids, max_length= 512)
# print(tokenizer.decode(outputs[0])) 
output = tokenizer.decode(outputs[0])
data = {"input": output}
# Write data to JSON file
with open("gemma_output1.json", "w") as outfile:
    json.dump(data, outfile)
