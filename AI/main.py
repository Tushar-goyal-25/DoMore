#pip install accelerate
from transformers import AutoTokenizer, AutoModelForCausalLM
import transformers
import torch
import json

model_id = "google/gemma-2b-it"
dtype = torch.bfloat16

tokenizer = AutoTokenizer.from_pretrained(model_id)
model = AutoModelForCausalLM.from_pretrained(
    model_id,
    device_map="cuda",
    torch_dtype=dtype,
)
def ask(input):
  chat = [
      { "role": "user", "content": input},
      
  ]
  prompt = tokenizer.apply_chat_template(chat, tokenize=False, add_generation_prompt=True)
  inputs = tokenizer.encode(prompt, add_special_tokens=False, return_tensors="pt")
  output = model.generate(input_ids=inputs.to(model.device), max_new_tokens=150)
  outputs = tokenizer.decode(output[0])
# output_weekly = tokenizer.decode(outputw[0])
# output_monthly = tokenizer.decode(outputm[0])
  data =  {"output": outputs}
  print(outputs)
  return data
    # Write data to JSON file

def write(data):
  with open("genAI3.json", "w") as outfile:
      json.dump(data, outfile)

def main():
  input_daily = "a real-life photography task to do within a day"
  input_week = "a real-life photography task to do within a week."
  input_month = "a real-life photography task to do within a month"
  data_daily = ask(input_daily)
  data_weekly = ask(input_week)
  data_monthly = ask(input_month)
  dataw = {"outputs":
   [
       {"output_daily": data_daily},
        {"output_weekly": data_weekly},
         {"output_monthly": data_monthly}
       ]
      
          }
  write(dataw)

if __name__ == '__main__':
    main()

