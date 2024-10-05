export const scaleFactor = 4;

export const dialogueData = {
  pc: `This is my PC. I work mostly in JavaScript/TypeScript these days.
    I've made a couple of games in that language. I also like Golang and Python. Anyway regardless of the language, I just like programming.
    Here is my <a href="https://github.com/jslegenddev" target="_blank">Github</a>!`,
  "cs-degree": `This is my CS degree. I hung it on the wall because I'm proud of it. It was a very theoretical degree but I think it gave me a good foundation.`,
  "sofa-table": `That's my sofa. I like to relax here and watch YouTube. 
  I also make game programming tutorials on YouTube. Go sub to <a href="https://youtube.com/@jslegenddev" target="_blank">my channel</a>! (If you like the content)
  You'll learn how I built this portfolio you're currently playing through!`,
  tv: `That's my TV. I've been watching tech youtubers a lot recently like :
   <a href="https://www.youtube.com/@ThePrimeTimeagen" target="_blank">Theprimeagen</a>, <a href="https://www.youtube.com/@t3dotgg" target="_blank">Theo - t3.gg</a>,
  <a href="https://www.youtube.com/@PirateSoftware" target="_blank">PirateSoftware</a> (sometimes) and <a href="https://www.youtube.com/@MelkeyDev" target="_blank">Melkey</a>!`,
  bed: `This where I sleep. Great ideas comes when I'm lying on my bed. When an idea strikes, I often have to write it down or else I won't be able to sleep because my mental energy is consumed by it.`,
  resume: `This is my desk and on it is my resume. <a href="https://github.com/JSLegendDev/Resume/blob/main/JSLegend%20Resume-1.pdf" target="_blank">Check it out?</a>
  Contact me at jslegend@protonmail.com if you have any interesting job opportunities!`,
  projects: `Info about this portfolio : It's made with the Kaboom.js library which is a library for making games in JavaScript.
  Text is rendered with HTML/CSS. So the textbox you're currently reading is not rendered within canvas. Learn more about how to use
  Kaboom.js by watching some of my tutorials <a href="https://youtube.com/@jslegenddev" target="_blank">here</a>.`,
  library: `There are a lot of programming books on my shelves. There is even one in French (I also speak French btw).
  I probably only read one of them. Who else compulsively buys technical books without ever finishing them?`,
  exit: `If you want to exit JSLegendDev's portfolio, just close the tab.`,
};

export const realDialogueData = {
  1: `2023 holds the record for being the hottest year globally since NASA began satellite monitoring!}`,
  2: `Since 1993, global sea levels have been rising at an average rate of 4.4 mm per year due to melting ice and thermal expansion.`,
  3: `Carbon dioxide (CO₂) is the most significant greenhouse gas contributing to the Earth's temperature rise.`,
  4: ` Over 95% of global warming is directly linked to human actions like burning fossil fuels and deforestation.`,
  5: `The Arctic is warming more than twice as fast as the global average, which is why its ice is melting so quickly.`,
  6: `Global warming is causing Greenland to lose around 300 billion tons of ice every year—about the weight of 1,500 Empire State Buildings!`,
  7: `NASA's OCO-2 satellite measures the global distribution of CO₂, helping scientists understand where carbon is coming from and where it's being absorbed.`,
  8: `Since the start of the industrial age, atmospheric CO₂ levels have increased by 45%, driving climate change. `,
  9: `The Middle East and North Africa are experiencing more frequent extreme droughts, severely impacting water supplies.`,
  10: `Climate change is shrinking habitats for many species, putting their survival at risk.`,
  11: `About 90% of the excess heat from global warming is absorbed by the oceans, causing rising sea temperatures and threatening marine ecosystems`,
  12: ` Half of the world's coral reefs have already been lost due to rising sea temperatures and ocean acidification, which bleaches and weakens the corals.`,
  13: ` Climate change has extended the duration of wildfire seasons, especially in regions like the western United States, causing more intense and frequent fires.`,
  14: `Global warming has led to a significant increase in the frequency and intensity of heatwaves, with major impacts on public health and agriculture.`,
  15: ` Antarctica and the Arctic are losing ice at unprecedented rates, with Antarctica alone shedding 150 billion metric tons of ice per year. `,
  16: `Climate change is affecting crop yields by altering growing seasons, reducing water availability, and increasing the likelihood of pests and diseases.`,
  17: `As CO₂ levels increase in the atmosphere, more of it gets absorbed by the oceans, making the water more acidic and harming shellfish, corals, and other marine life.`,
  18: ` The frequency of extreme weather events, such as hurricanes, floods, and droughts, has increased due to climate change, affecting millions of people worldwide.`,
  19: ` Many species are being forced to migrate to new areas due to changing climate conditions, disrupting ecosystems and food chains. `,
  20: `As the Arctic warms, permafrost—ground that has been frozen for centuries—is thawing, releasing stored carbon dioxide and methane, which accelerates global warming.`
}

export const quizData = [
  {
    question: 'According to NASA satellite data, what was the hottest year on record globally so far?',
    answer: '2023',
    answers: ['2021', '2016', ' 2010', '2023']
  },
  {
    question: 'According to NASA records, what has been the average rate of sea level rise since 1993?',
    answer: '4.4 mm per year',
    answers: ['4.4 mm per year', '3.3 mm per year', '5 mm per year', '10 mm per year']
  },
  {
    question: 'What is the main greenhouse gas responsible for most of global warming, according to NASA measurements?',
    answer: 'Carbon dioxide (CO₂)',
    answers: ['Methane (CH₄)', 'Carbon dioxide (CO₂)', 'Ozone (O₃)', 'Nitrous oxide (N₂O)']
  },
  {
    question: 'Based on NASA data, what percentage of global warming is attributable to human activities, such as burning fossil fuels and deforestation?',
    answer: 'More than 95%',
    answers: ['Approximately 50%', 'More than 95%', 'Less than 70%', 'Around 80%']
  },
  {
    question: 'According to NASA data, which region of the planet is warming at a faster rate than the global average?',
    answer: 'The Arctic',
    answers: ['The South Pacific', 'Antarctica', 'The Arctic', 'Western Europe']
  },
  {
    question: 'According to NASA satellites, how much ice is Greenland losing every year due to global warming?',
    answer: 'Around 300 billion tons',
    answers: ['Around 50 billion tons', 'Around 100 billion tons', 'Around 200 billion tons', 'Around 300 billion tons']
  },
  {
    question: 'What is NASAs contribution to measuring atmospheric carbon dioxide based on the Orbital Carbon Observatory (OCO-2)?',
    answer: 'OCO-2 monitors the global distribution of CO₂, focusing on carbon sources and sinks.',
    answers: ['NASA only measures CO₂ in urban areas.', 'OCO-2 monitors the global distribution of CO₂, focusing on carbon sources and sinks.', 'OCO-2 only measures CO₂ levels in tropical forests.', 'NASA does not measure carbon dioxide directly with OCO-2.']
  },
  {
    question: 'According to NASA monitoring data, how much has the concentration of carbon dioxide in the atmosphere increased since the beginning of the industrial age?',
    answer: '45%',
    answers: ['10%', '30%', '45%', '60%']
  },
  {
    question: 'According to NASA data, which region of the world has experienced extreme droughts more frequently in recent years?',
    answer: 'Middle East and North Africa',
    answers: ['North America', 'Central Europe', 'South Africa', 'Middle East and North Africa']
  },
  {
    question: 'How does climate change affect biodiversity?',
    answer: 'Reduce the habitats available to many species',
    answers: ['They increase the number of species', 'Reduce the habitats available to many species', ' Improve soil quality', 'They have no significant impact']
  },
]