from transformers import AutoTokenizer, AutoModelForCausalLM
import json
from transformers import pipeline
tokenizer = AutoTokenizer.from_pretrained("google/gemma-2b-it")
model = AutoModelForCausalLM.from_pretrained("google/gemma-2b-it")

input_text = "a real-life photography task to adventure on"
input_ids = tokenizer(input_text, return_tensors="pt")

outputs = model.generate(**input_ids, max_length= 512)
# print(tokenizer.decode(outputs[0])) 
output = tokenizer.decode(outputs[0])
data = {"outputs": output}
# Write data to JSON file
with open("gemma_output1.json", "w") as outfile:
    json.dump(data, outfile)
