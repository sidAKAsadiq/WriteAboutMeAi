import json
from linkedin_api import Linkedin
import sys
from dotenv import load_dotenv
import os
import sys
 
LinkedIn_url = sys.argv[1] 

load_dotenv()

# print("email",)
# print("pass",)
#muhammad-sadiq-054939219
sys.stdout.reconfigure(encoding='utf-8')
api = Linkedin(os.getenv('EMAIL'),os.getenv('PASS'))
profile = LinkedIn_url
profile_data = api.get_profile(profile)

# Basic Info
name = f"{profile_data.get('firstName', '')} {profile_data.get('lastName', '')}"
headline = profile_data.get('headline', '')
summary = profile_data.get('summary', '')

# Experience
experience_list = []
for exp in profile_data.get('experience', []):
    experience_list.append({
        "title": exp.get('title', ''),
        "company": exp.get('companyName', ''),
        "description": exp.get('description', '')
    })

# Education
education_list = []
for edu in profile_data.get('education', []):
    education_list.append({
        "degree": edu.get('degreeName', ''),
        "school": edu.get('schoolName', ''),
        "field_of_study": edu.get('fieldOfStudy', '')
    })

output = {
    "name": name,
    "headline": headline,
    "summary": summary,
    "experience": experience_list,
    "education": education_list
}

# Print the output as a JSON string
print(json.dumps(output, ensure_ascii=False))
sys.stdout.flush()
