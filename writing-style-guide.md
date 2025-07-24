# SSHthings Blog Writing Style Guide

## Voice & Tone

### Personal & Conversational
- Write like you're explaining to a fellow tech enthusiast over coffee
- Use first person ("I realized", "I wanted", "I decided")
- Share your actual journey, including mistakes and discoveries
- Be honest about what went wrong and how you fixed it

### Technical but Accessible
- Explain the "why" before the "how"
- Include real examples from your actual setup
- Don't assume knowledge but don't over-explain basics
- Balance technical depth with readability

### Engaging & Story-Driven
- Start with a relatable problem or motivation
- Use narrative structure: problem → journey → solution → lessons
- Include personal anecdotes and real scenarios
- End with reflection on what you learned

## Structure Template

### 1. Hook with Personal Motivation
```
[Tool/Technology] is [basic description], but I realized that [limitation/problem]. 
That means [real-world impact]. I wanted [specific goal], so I decided to [solution approach].

This post is my journey through [process], the [challenges], and the satisfaction of [outcome].
```

### 2. Prerequisites Section
- Be specific about versions and requirements
- Link to official documentation
- Include your actual hardware/software setup

### 3. Step-by-Step Implementation
- Number your main sections (## 1. Installing X, ## 2. Configuring Y)
- Include actual commands you ran
- Show real configuration files
- Explain what each step accomplishes

### 4. Testing & Validation
- Always include "I always like to test things before declaring victory"
- Show actual commands and expected outputs
- Include screenshots or command results when helpful

### 5. Troubleshooting Section
- Share problems you actually encountered
- Use phrases like "I hit the infamous [error]" 
- Provide step-by-step fixes
- Include useful debugging commands

### 6. Optional Enhancements
- Share related improvements you made
- Include automation scripts you actually use
- Show real-world examples (like backup scripts)

### 7. References & Conclusion
- Link to official documentation
- Personal reflection on the journey
- What you learned beyond the technical implementation

## Language Patterns

### Opening Hooks
- "I realized that..."
- "What started as [simple goal] turned into..."
- "[Tool] is fantastic for [use case], but..."
- "I wanted more [control/privacy/understanding]..."

### Transition Phrases
- "Here's how I [accomplished something]:"
- "I always like to test things before declaring victory"
- "The [adjective] part? [insight]"
- "Turns out, [lesson learned]"

### Problem Introduction
- "I hit the infamous [error name] error"
- "If you see this, you may need to..."
- "Other useful commands:"
- "After breaking my config one too many times..."

### Personal Touches
- Reference your actual setup ("my Pi-hole box", "a Raspberry Pi 4")
- Include family context when relevant ("my family's browsing habits")
- Share real scenarios ("at 3 AM", "during prime Netflix time")
- Mention actual tools you use

### Technical Explanations
- "The port `5335` keeps [explanation]"
- "You **do not** need to [common mistake]—let [tool] do the heavy lifting"
- "Note:" callouts for important details
- Code blocks with comments explaining what commands do

### Conclusions
- "*What started as [simple goal] turned into [deeper learning experience]*"
- Reflect on unexpected lessons learned
- Connect technical achievement to practical benefits

## Code & Technical Content

### Code Blocks
- Always include language specification (```bash, ```conf, ```yaml)
- Add comments explaining non-obvious commands
- Show real file paths and configurations you use
- Include error handling in scripts

### Configuration Examples
- Use your actual configurations (sanitized)
- Explain each important setting
- Include "Note:" sections for gotchas
- Reference official documentation

### Commands & Examples
- Show complete command syntax
- Include expected outputs when helpful
- Explain what each command accomplishes
- Group related commands logically

## Content Guidelines

### What to Include
- Your actual journey and decision-making process
- Real problems you encountered and solved
- Specific technical details and configurations
- Links to official documentation
- Personal insights and lessons learned

### What to Avoid
- Generic tutorials without personal context
- Copying documentation without adding value
- Skipping the "why" behind technical decisions
- Overly formal or academic tone

### Family/Personal Context
- Include when it adds value to the story
- Use to illustrate real-world impact
- Keep it relevant to the technical content
- Shows practical applications of your work

## Example Phrases & Expressions

### Technical Discovery
- "I realized that by default..."
- "Turns out, [technical insight]"
- "The [adjective] part? [explanation]"
- "Nothing teaches you [lesson] quite like [real scenario]"

### Problem Solving
- "Let me confess something embarrassing..."
- "I hit the infamous [error] at one point"
- "If you see this, you may need to..."
- "Here's how I checked [validation]:"

### Learning & Reflection
- "What started as [simple goal] accidentally became [deeper learning]"
- "I learned more about [topic] from [practical experience] than from [theoretical learning]"
- "My [family/users] noticed the difference when..."
- "Turns out, [insight about best practices]"

## Tone Examples

### Good ✅
- "Pi-hole is fantastic for blocking ads and trackers, but I realized that by default, it forwards DNS queries to public resolvers."
- "I hit the infamous 'trust anchor presented twice' error at one point."
- "What started as a simple ad-blocking project turned into a deep dive into recursive resolvers."

### Avoid ❌
- "Pi-hole is a DNS sinkhole that blocks advertisements."
- "Users may encounter trust anchor errors."
- "This tutorial covers DNS resolver configuration."

Remember: You're sharing your actual journey with someone who might want to follow a similar path. Be the guide you wish you'd had when you started! 