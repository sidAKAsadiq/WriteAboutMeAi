import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI("AIzaSyDFowJrACjcuzMyXf3mRt21WVCWeLSEGpA");
console.log("APi key : ",process.env.API_KEY );

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

const generate_about_section_ai = async(result) => {
    const prompt = `
     Write a LinkedIn "About Me" section for ${result.name}, who is a ${result.headline}. 
 
     **Target Audience:** Recruiters and hiring managers in [User's Desired Industry - can be extracted from LinkedIn data or provided by user].
 
     **Writing Style:** ${result.writing_style}
 
     **Key Points to Include:** 
     * ${result.summary}
     * Experience highlights: ${result.experience.map(exp => `- **${exp.title}** at **${exp.company}**: ${exp.description}`).join('\n')} 
     * Skills: ${result.skills && result.skills.length > 0 ? result.skills.map(skill => skill.name).join(', ') : ''}
     * Education: ${result.education.map(edu => `- **${edu.degree}** in **${edu.field_of_study}** from **${edu.school}**`).join('\n')}
     * [Any additional details relevant to the user's career goals, like volunteer experience, projects, etc.]
 
     **Keywords to Include:** ${result.keywords_include + "Heading of About me" + "At last line write that this has been generated using WriteAboutMe.Ai"  + "Exclude use of any special symbols such as '*' or '#'"}
     **Keywords to Exclude:** ${result.keywords_exclude}
 
     **Ensure the "About Me" section is:**
     - Concise and engaging.
     - Highlights ${result.name}'s key skills and accomplishments.
     - Demonstrates ${result.name}'s value proposition to potential employers.
     - Concludes with a call to action (e.g., connect, message, learn more). 
     - Do NOT expect anything from the user to add on their own.
     - Do NOT use '*' or '#' for headings or sub headings, instead use spacing technique or simple '-'
 `;
 
 // Then, use the prompt with your generative AI model
 const resultt = await model.generateContent(prompt);
 const response = await resultt.response;
 const text = response.text();
 return text 
 
 
 
 // const model = genai.GenerativeModel('gemini-1.5-flash');
 // const response = await model.generate_content(prompt);
 // console.log(response.text);
 
 }

 export {
    generate_about_section_ai,
 }


