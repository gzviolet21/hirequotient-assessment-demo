const CASE_MINUTES = 30;

const nusaSipQuestions = [
  {
    id: "datasets",
    category: "Problem structuring",
    type: "multi",
    prompt: "Which FIVE datasets are most relevant to advising NusaSip whether to acquire BrewPack and, if appropriate, set a maximum bid?",
    instruction: "Select exactly five. You cannot change this response after continuing.",
    options: [
      ["A", "Expected RTD sales volume, selling price, and customer discounts"],
      ["B", "RTD packaging, distribution, and promotional costs per bottle"],
      ["C", "BrewPack capacity, utilization, and current third-party production volume"],
      ["D", "BrewPack's standalone profit and required maintenance capex"],
      ["E", "NusaSip's current external manufacturing cost for comparable RTD bottles"],
      ["F", "NusaSip outlet employees' engagement-survey results"],
      ["G", "Indonesia's five-year GDP forecast"],
      ["H", "A focus group's preferred celebrity endorser"],
    ],
    answer: ["A", "B", "C", "D", "E"],
    points: 12,
    exhibit: null,
  },
  {
    id: "profit",
    category: "Quantitative reasoning",
    type: "number",
    prompt: "What was NusaSip's operating profit in Year 2? Enter your answer in IDR billion, to one decimal place.",
    instruction: "Enter your response as a number to one decimal place.",
    answer: 35.2,
    tolerance: 0.05,
    points: 10,
    exhibit: {
      title: "Exhibit 1 · NusaSip group P&L",
      note: "IDR billion",
      columns: ["Metric", "Year 1", "Year 2"],
      rows: [["Revenue", "200.0", "230.0"], ["Total operating costs", "160.0", "194.8"]],
    },
  },
  {
    id: "synergy",
    category: "Quantitative reasoning",
    type: "number",
    prompt: "If NusaSip shifts all forecast RTD demand from its external manufacturer to BrewPack, what annual manufacturing-cost saving would it generate? Enter IDR billion, to one decimal place.",
    instruction: "Enter your response as a number to one decimal place.",
    answer: 12.6,
    tolerance: 0.05,
    points: 12,
    exhibit: {
      title: "Exhibit 2 · RTD manufacturing economics",
      note: "Annual forecast",
      columns: ["Metric", "Value"],
      rows: [["Forecast NusaSip demand", "14.0m bottles"], ["External manufacturer cost", "IDR 4,800 / bottle"], ["BrewPack manufacturing cost", "IDR 3,900 / bottle"]],
    },
  },
  {
    id: "capacity",
    category: "Data interpretation",
    type: "single",
    prompt: "What does BrewPack's current capacity imply for the proposed launch?",
    instruction: "Third-party production is contractually fixed for the next 12 months. Select the best answer.",
    options: [
      ["A", "BrewPack can meet all NusaSip demand and retain 5m bottles of spare capacity."],
      ["B", "BrewPack can meet all NusaSip demand only by displacing current third-party production."],
      ["C", "BrewPack has 9m bottles of spare capacity, so 5m of NusaSip demand still needs another source."],
      ["D", "BrewPack needs to add 14m bottles of capacity before producing any NusaSip RTD coffee."],
    ],
    answer: "C",
    points: 10,
    exhibit: {
      title: "Exhibit 3 · BrewPack production capacity",
      note: "Annual volume, millions of bottles",
      columns: ["Metric", "Annual volume"],
      rows: [["Maximum capacity", "20m bottles"], ["Current third-party volume", "11m bottles"], ["NusaSip forecast demand", "14m bottles"]],
    },
  },
  {
    id: "valuation",
    category: "Quantitative reasoning",
    type: "number",
    prompt: "NusaSip values BrewPack at 8× annual profit impact. For this assessment, profit impact equals BrewPack's standalone profit plus Year-1 manufacturing savings from its available spare capacity. What is NusaSip's maximum financial bid? Enter IDR billion, to one decimal place.",
    instruction: "Enter your response as a number to one decimal place.",
    answer: 120.8,
    tolerance: 0.05,
    points: 14,
    exhibit: {
      title: "Exhibit 4 · Acquisition valuation inputs",
      note: "Year 1",
      columns: ["Input", "Value"],
      rows: [["BrewPack standalone annual profit", "IDR 7.0bn"], ["Available spare capacity", "9.0m bottles"], ["Saving per bottle versus external production", "IDR 900"], ["Valuation multiple", "8× annual profit impact"]],
    },
  },
  {
    id: "ev",
    category: "Quantitative reasoning",
    type: "number",
    prompt: "The final row is a certain one-off campaign cost. What is the campaign's risk-adjusted net value? Enter IDR billion, to one decimal place.",
    instruction: "Enter a negative response with a minus sign, if applicable.",
    answer: -0.4,
    tolerance: 0.05,
    points: 12,
    exhibit: {
      title: "Exhibit 5 · National campaign scenarios",
      note: "Scenario outcomes",
      columns: ["Scenario", "Probability", "Incremental annual profit / cost"],
      rows: [["High adoption", "50%", "IDR 20bn"], ["Moderate adoption", "30%", "IDR 8bn"], ["Low adoption", "20%", "–IDR 4bn"], ["One-off campaign cost", "Certain", "–IDR 12bn"]],
    },
  },
  {
    id: "risks",
    category: "Business judgment",
    type: "multi",
    prompt: "Which THREE risks should NusaSip prioritize before acquiring BrewPack?",
    instruction: "Select exactly three risks that are material and specific to this decision.",
    options: [
      ["A", "The RTD line could cannibalize higher-margin purchases at NusaSip cafés."],
      ["B", "Food-safety or quality-control failures could damage the NusaSip brand."],
      ["C", "Packaging-input volatility could erode expected unit economics."],
      ["D", "The rainy season will reduce all coffee consumption to zero."],
      ["E", "A competitor's logo may use a similar shade of green."],
      ["F", "Indonesia's population will necessarily decline next year."],
    ],
    answer: ["A", "B", "C"],
    points: 10,
    exhibit: null,
  },
  {
    id: "decision",
    category: "Synthesis",
    type: "single",
    prompt: "Which recommendation is best supported by the analysis so far?",
    instruction: "Select the most evidence-led next step.",
    options: [
      ["A", "Acquire BrewPack immediately at any price, because vertical integration always reduces risk."],
      ["B", "Do not acquire BrewPack; the national launch has a negative risk-adjusted value, so test demand and resolve the capacity gap before making a bid."],
      ["C", "Acquire BrewPack for IDR 120.8bn, then launch nationally regardless of campaign economics."],
      ["D", "Ignore RTD coffee and focus only on employee engagement, which is the clearest cause of profit decline."],
    ],
    answer: "B",
    points: 10,
    exhibit: null,
  },
];

const bumiBiteQuestions = [
  { id: "datasets", category: "Problem structuring", type: "multi", prompt: "Which FIVE datasets are most relevant to advising BumiBite whether to acquire NutriPak and, if appropriate, set a maximum bid?", instruction: "Select exactly five. You cannot change this response after continuing.", options: [["A", "Expected protein-chip sales volume, selling price, and customer discounts"], ["B", "Protein-chip ingredients, packaging, distribution, and promotional costs per pack"], ["C", "NutriPak capacity, utilization, and current third-party production volume"], ["D", "NutriPak's standalone profit and required maintenance capex"], ["E", "BumiBite's current external co-packing cost for comparable snack packs"], ["F", "BumiBite employee engagement-survey results"], ["G", "US five-year GDP forecast"], ["H", "A focus group's preferred celebrity endorser"]], answer: ["A", "B", "C", "D", "E"], points: 12, exhibit: null },
  { id: "profit", category: "Quantitative reasoning", type: "number", prompt: "What was BumiBite's operating profit in Year 2? Enter your answer in IDR billion, to one decimal place.", instruction: "Enter your response as a number to one decimal place.", answer: 30.4, tolerance: 0.05, points: 10, exhibit: { title: "Exhibit 1 · BumiBite group P&L", note: "IDR billion", columns: ["Metric", "Year 1", "Year 2"], rows: [["Revenue", "160.0", "184.0"], ["Total operating costs", "128.0", "153.6"]] } },
  { id: "synergy", category: "Quantitative reasoning", type: "number", prompt: "If BumiBite shifts all forecast protein-chip demand from its external co-packer to NutriPak, what annual manufacturing-cost saving would it generate? Enter IDR billion, to one decimal place.", instruction: "Enter your response as a number to one decimal place.", answer: 7.2, tolerance: 0.05, points: 12, exhibit: { title: "Exhibit 2 · Protein-chip manufacturing economics", note: "Annual forecast", columns: ["Metric", "Value"], rows: [["Forecast BumiBite demand", "12.0m packs"], ["External co-packer cost", "IDR 3,900 / pack"], ["NutriPak manufacturing cost", "IDR 3,300 / pack"]] } },
  { id: "capacity", category: "Data interpretation", type: "single", prompt: "What does NutriPak's current capacity imply for the proposed launch?", instruction: "Third-party production is contractually fixed for the next 12 months. Select the best answer.", options: [["A", "NutriPak can meet all BumiBite demand and retain 2m packs of spare capacity."], ["B", "NutriPak can meet all BumiBite demand only by displacing current third-party production."], ["C", "NutriPak has 10m packs of spare capacity, so 2m of BumiBite demand still needs another source."], ["D", "NutriPak needs to add 12m packs of capacity before producing any protein chips."]], answer: "C", points: 10, exhibit: { title: "Exhibit 3 · NutriPak production capacity", note: "Annual volume", columns: ["Metric", "Annual volume"], rows: [["Maximum capacity", "18m packs"], ["Current third-party volume", "8m packs"], ["BumiBite forecast demand", "12m packs"]] } },
  { id: "valuation", category: "Quantitative reasoning", type: "number", prompt: "BumiBite values NutriPak at 8× annual profit impact. For this assessment, profit impact equals NutriPak's standalone profit plus Year-1 manufacturing savings from its available spare capacity. What is BumiBite's maximum financial bid? Enter IDR billion, to one decimal place.", instruction: "Enter your response as a number to one decimal place.", answer: 92.0, tolerance: 0.05, points: 14, exhibit: { title: "Exhibit 4 · Acquisition valuation inputs", note: "Year 1", columns: ["Input", "Value"], rows: [["NutriPak standalone annual profit", "IDR 5.5bn"], ["Available spare capacity", "10.0m packs"], ["Saving per pack versus external co-packing", "IDR 600"], ["Valuation multiple", "8× annual profit impact"]] } },
  { id: "ev", category: "Quantitative reasoning", type: "number", prompt: "The final row is a certain one-off launch cost. What is the launch's risk-adjusted net value? Enter IDR billion, to one decimal place.", instruction: "Enter a negative response with a minus sign, if applicable.", answer: -0.4, tolerance: 0.05, points: 12, exhibit: { title: "Exhibit 5 · National launch scenarios", note: "Scenario outcomes", columns: ["Scenario", "Probability", "Incremental annual profit / cost"], rows: [["High adoption", "40%", "IDR 18bn"], ["Moderate adoption", "40%", "IDR 6bn"], ["Low adoption", "20%", "–IDR 5bn"], ["One-off launch cost", "Certain", "–IDR 9bn"]] } },
  { id: "risks", category: "Business judgment", type: "multi", prompt: "Which THREE risks should BumiBite prioritize before acquiring NutriPak?", instruction: "Select exactly three risks that are material and specific to this decision.", options: [["A", "Protein chips could cannibalize higher-margin BumiBite e-commerce bundles."], ["B", "Food-safety or quality-control failures could damage the BumiBite brand."], ["C", "Protein-powder and packaging-input volatility could erode expected unit economics."], ["D", "The rainy season will eliminate all snack consumption."], ["E", "A competitor's logo may use a similar shade of green."], ["F", "Indonesia's population will necessarily decline next year."]], answer: ["A", "B", "C"], points: 10, exhibit: null },
  { id: "decision", category: "Synthesis", type: "single", prompt: "Which recommendation is best supported by the analysis so far?", instruction: "Select the most evidence-led next step.", options: [["A", "Acquire NutriPak immediately at any price, because vertical integration always reduces risk."], ["B", "Do not acquire NutriPak yet; test demand and resolve the capacity gap before making a bid."], ["C", "Acquire NutriPak for IDR 92.0bn, then launch nationally regardless of launch economics."], ["D", "Ignore protein chips and focus only on employee engagement, which is the clearest cause of profit decline."]], answer: "B", points: 10, exhibit: null },
];

const suryaGridQuestions = [
  { id: "datasets", category: "Problem structuring", type: "multi", prompt: "Which FIVE datasets are most important to help SuryaGrid set a feasible 2030 climate target and choose initiatives?", instruction: "Select exactly five. The target must balance emissions, reliability, affordability, and execution feasibility.", options: [["A", "Current emissions by generation asset and projected 2030 electricity demand"], ["B", "Initiative-level abatement, investment, implementation timing, and operational effects"], ["C", "Reliability metrics and the expected effect of each initiative on outage performance"], ["D", "Tariff and affordability impact by customer segment"], ["E", "Permitting, land, grid-connection, and regulatory constraints"], ["F", "The CEO's preferred font for the annual report"], ["G", "Global smartphone market-share forecasts"], ["H", "Cafeteria meal satisfaction at headquarters"]], answer: ["A", "B", "C", "D", "E"], points: 12, exhibit: null },
  { id: "target", category: "Quantitative reasoning", type: "number", prompt: "SuryaGrid emitted 2.40m tCO₂e in 2024 and aims to cut emissions 35% by 2030. How many million tCO₂e must it abate? Enter million tCO₂e to two decimal places.", instruction: "Enter your response as a number.", answer: 0.84, tolerance: 0.005, points: 10, exhibit: { title: "Exhibit 1 · Climate ambition", note: "Fictional client data", columns: ["Metric", "Value"], rows: [["2024 emissions", "2.40m tCO₂e"], ["2030 reduction target", "35%"]] } },
  { id: "portfolio", category: "Data interpretation", type: "single", prompt: "Which portfolio reaches SuryaGrid's 0.84m tCO₂e reduction target while staying within its IDR 170bn budget, causing no reliability decline, and limiting average tariff impact to +0.6%?", instruction: "Select the most feasible portfolio.", options: [["A", "Solar PPAs + battery storage + coal efficiency + demand response"], ["B", "Solar PPAs + coal efficiency + demand response + diesel retirement"], ["C", "Solar PPAs + battery storage + diesel retirement"], ["D", "Battery storage + coal efficiency + demand response + diesel retirement"]], answer: "B", points: 14, exhibit: { title: "Exhibit 2 · Initiative trade-offs", note: "Fictional client data", columns: ["Initiative", "Abatement (m tCO₂e)", "Cost (IDR bn)", "Reliability effect", "Tariff impact"], rows: [["Solar PPAs", "0.30", "45", "0.0", "+0.3%"], ["Battery storage", "0.10", "55", "+1.0", "+0.2%"], ["Coal efficiency", "0.18", "30", "0.0", "0.0%"], ["Demand response", "0.16", "20", "+0.5", "−0.1%"], ["Diesel retirement", "0.20", "50", "−0.5", "+0.4%"]] } },
  { id: "cost", category: "Quantitative reasoning", type: "number", prompt: "What is the average abatement cost of the feasible portfolio? Enter IDR thousand per tCO₂e to one decimal place.", instruction: "Use the portfolio you selected in the preceding question.", answer: 172.6, tolerance: 0.1, points: 12, exhibit: null },
  { id: "kpis", category: "Business judgment", type: "multi", prompt: "Which THREE KPIs best protect the non-financial outcomes of SuryaGrid's climate plan?", instruction: "Select exactly three.", options: [["A", "Annual tCO₂e avoided versus the approved transition pathway"], ["B", "Outage duration and frequency for affected customers"], ["C", "Tariff burden for low-income households"], ["D", "Number of sustainability-themed social-media posts"], ["E", "Headquarters parking-space utilization"], ["F", "The CEO's number of speaking engagements"]], answer: ["A", "B", "C"], points: 10, exhibit: null },
  { id: "score", category: "Quantitative reasoning", type: "number", prompt: "SuryaGrid weights emissions 50%, reliability 25%, affordability 15%, and execution readiness 10%. What is Portfolio A's weighted score out of 100? Enter to one decimal place.", instruction: "Use the scores in Exhibit 3.", answer: 88.0, tolerance: 0.05, points: 12, exhibit: { title: "Exhibit 3 · Portfolio scorecard", note: "0 = weakest, 100 = strongest", columns: ["Portfolio", "Emissions", "Reliability", "Affordability", "Execution readiness"], rows: [["A", "100", "100", "40", "70"], ["B", "90", "80", "85", "90"]] } },
  { id: "risks", category: "Business judgment", type: "multi", prompt: "Which THREE risks deserve explicit mitigation before SuryaGrid commits to the transition portfolio?", instruction: "Select exactly three risks that are material to this plan.", options: [["A", "Land, permitting, or grid-connection delays could push back solar delivery."], ["B", "Demand-response participation could be lower than expected."], ["C", "Diesel retirement could impair reliability if replacement capacity is late."], ["D", "The company might receive fewer likes on a transition announcement."], ["E", "Office coffee demand could change during construction."], ["F", "The company logo may look less modern than a competitor's."]], answer: ["A", "B", "C"], points: 10, exhibit: null },
  { id: "decision", category: "Synthesis", type: "single", prompt: "What should SuryaGrid recommend to its board?", instruction: "Select the best evidence-led recommendation.", options: [["A", "Adopt Portfolio B and begin immediately, because it hits the target at the lowest cost."], ["B", "Adopt Portfolio B conditionally: approve the target, stage the initiative commitments against reliability and affordability guardrails, and secure permitting and demand-response pilots first."], ["C", "Choose Portfolio A because it has the highest weighted score, despite missing the emissions target."], ["D", "Defer climate action until every uncertainty has been eliminated."]], answer: "B", points: 10, exhibit: null },
];

const healthAccessQuestions = [
  { id:"datasets",category:"Problem structuring",type:"multi",prompt:"Which FIVE datasets are most important to improve health-care access across ArchipelagoCare's network?",instruction:"Select exactly five.",options:[["A","Patient demand and unmet need by district"],["B","Appointment capacity, staffing, and wait time by facility"],["C","Intervention capacity, cost, and time to implement"],["D","Travel time and service use for rural and low-income patients"],["E","Clinical outcomes and quality safeguards"],["F","Hospital lobby color preferences"],["G","Global fashion retail growth"],["H","Head-office parking use"]],answer:["A","B","C","D","E"],points:12,exhibit:null },
  { id:"target",category:"Quantitative reasoning",type:"number",prompt:"ArchipelagoCare serves 500,000 annual patients. Currently 60% receive a consultation within 30 days; the target is 80%. How many additional patients must receive a timely consultation? Enter thousands of patients.",instruction:"Enter your response as a number.",answer:100,answerUnit:"thousand patients",tolerance:.05,points:10,exhibit:{title:"Exhibit 1 · Access target",note:"Fictional client data",columns:["Metric","Value"],rows:[["Annual patients","500,000"],["Current within 30 days","60%"],["Target within 30 days","80%"]]} },
  { id:"portfolio",category:"Data interpretation",type:"single",prompt:"Which portfolio delivers the 100,000 additional timely consultations within the IDR 55bn budget, without reducing clinical-quality score?",instruction:"Select the most feasible portfolio.",options:[["A","Telehealth triage + mobile clinics + scheduling redesign"],["B","Telehealth triage + mobile clinics"],["C","Mobile clinics + weekend clinics"],["D","Telehealth triage + weekend clinics + scheduling redesign"]],answer:"A",points:14,exhibit:{title:"Exhibit 2 · Access interventions",note:"Fictional client data",columns:["Initiative","Extra timely consultations","Cost (IDR bn)","Quality effect"],rows:[["Telehealth triage","45,000","20","0"],["Mobile clinics","35,000","25","0"],["Scheduling redesign","20,000","8","+"],["Weekend clinics","30,000","18","−"]]} },
  { id:"cost",category:"Quantitative reasoning",type:"number",prompt:"What is the average cost of the feasible portfolio per additional timely consultation? Enter IDR thousand to one decimal place.",instruction:"Use the portfolio from the preceding question.",answer:530,answerUnit:"IDR thousand",tolerance:.1,points:12,exhibit:null },
  { id:"kpis",category:"Business judgment",type:"multi",prompt:"Which THREE KPIs best protect the non-financial objective of equitable access?",instruction:"Select exactly three.",options:[["A","Share of patients served within 30 days"],["B","Median travel time for rural patients"],["C","Clinical-quality and follow-up completion rate"],["D","Number of social-media followers"],["E","Head-office electricity use"],["F","Number of press mentions"]],answer:["A","B","C"],points:10,exhibit:null },
  { id:"score",category:"Quantitative reasoning",type:"number",prompt:"ArchipelagoCare weights access 45%, equity 30%, quality 15%, and cost 10%. What is Portfolio A's weighted score out of 100?",instruction:"Use Exhibit 3.",answer:91,answerUnit:"score / 100",tolerance:.05,points:12,exhibit:{title:"Exhibit 3 · Portfolio A scorecard",note:"0 = weakest, 100 = strongest",columns:["Access","Equity","Quality","Cost"],rows:[["100","90","90","70"]]} },
  { id:"risks",category:"Business judgment",type:"multi",prompt:"Which THREE risks require mitigation before rollout?",instruction:"Select exactly three.",options:[["A","Digital triage could exclude patients with poor connectivity"],["B","Mobile clinics may struggle to retain qualified staff"],["C","Higher volume could weaken follow-up care if referrals are not integrated"],["D","The logo may not look modern"],["E","Cafeteria menus may change"],["F","A competitor may post more often"]],answer:["A","B","C"],points:10,exhibit:null },
  { id:"decision",category:"Synthesis",type:"single",prompt:"What should ArchipelagoCare recommend to its board?",instruction:"Select the most evidence-led recommendation.",options:[["A","Deploy Portfolio A nationally without conditions"],["B","Approve Portfolio A, but phase it through rural pilots with quality, equity, and staffing guardrails"],["C","Choose weekend clinics because they are the most visible intervention"],["D","Delay access improvements until all digital-exclusion risk disappears"]],answer:"B",points:10,exhibit:null },
];

const circularPackQuestions = [
  { id:"datasets",category:"Problem structuring",type:"multi",prompt:"Which FIVE datasets are most important to help PacificPack meet its packaging-reduction target?",instruction:"Select exactly five.",options:[["A","Current material use by pack format and product volume"],["B","Initiative-level plastic reduction, cost, and implementation timing"],["C","Food-safety, shelf-life, and product-quality constraints"],["D","Consumer return behavior and recycling collection coverage"],["E","Retailer operating and reverse-logistics constraints"],["F","CEO travel preferences"],["G","Global cinema attendance"],["H","Office plant-watering costs"]],answer:["A","B","C","D","E"],points:12,exhibit:null },
  { id:"target",category:"Quantitative reasoning",type:"number",prompt:"PacificPack sells 60m packs annually, each using 30g of virgin plastic. It targets a 25% reduction in virgin plastic. How many tonnes must it reduce?",instruction:"Enter your response as a number.",answer:450,answerUnit:"tonnes",tolerance:.05,points:10,exhibit:{title:"Exhibit 1 · Packaging baseline",note:"Fictional client data",columns:["Metric","Value"],rows:[["Annual packs","60m"],["Virgin plastic per pack","30g"],["Reduction target","25%"]]} },
  { id:"portfolio",category:"Data interpretation",type:"single",prompt:"Which portfolio reaches the 450-tonne target within the IDR 80bn budget, maintains shelf life, and has collection coverage above 60%?",instruction:"Select the most feasible portfolio.",options:[["A","Lightweighting + recycled-content resin + returnable pilot"],["B","Lightweighting + compostable film"],["C","Recycled-content resin + returnable pilot"],["D","Compostable film + returnable pilot"]],answer:"A",points:14,exhibit:{title:"Exhibit 2 · Circularity options",note:"Fictional client data",columns:["Initiative","Reduction (tonnes)","Cost (IDR bn)","Shelf-life","Collection coverage"],rows:[["Lightweighting","180","20","Maintained","n/a"],["Recycled-content resin","200","35","Maintained","n/a"],["Returnable pilot","90","20","Maintained","65%"],["Compostable film","250","45","Reduced","30%"]]} },
  { id:"cost",category:"Quantitative reasoning",type:"number",prompt:"What is the average cost of the feasible portfolio per tonne of virgin plastic reduced? Enter IDR million to one decimal place.",instruction:"Use the portfolio from the preceding question.",answer:166.7,answerUnit:"IDR million / tonne",tolerance:.1,points:12,exhibit:null },
  { id:"kpis",category:"Business judgment",type:"multi",prompt:"Which THREE KPIs best protect circularity outcomes beyond the financial case?",instruction:"Select exactly three.",options:[["A","Virgin-plastic reduction verified by material data"],["B","Return and collection rate by geography"],["C","Food-safety and shelf-life compliance"],["D","Brand hashtag usage"],["E","Office printing volume"],["F","CEO media interviews"]],answer:["A","B","C"],points:10,exhibit:null },
  { id:"score",category:"Quantitative reasoning",type:"number",prompt:"PacificPack weights material reduction 40%, consumer adoption 25%, product quality 20%, and execution readiness 15%. What is Portfolio A's weighted score out of 100?",instruction:"Use Exhibit 3.",answer:87.5,answerUnit:"score / 100",tolerance:.05,points:12,exhibit:{title:"Exhibit 3 · Portfolio A scorecard",note:"0 = weakest, 100 = strongest",columns:["Reduction","Adoption","Quality","Readiness"],rows:[["100","70","100","75"]]} },
  { id:"risks",category:"Business judgment",type:"multi",prompt:"Which THREE risks require mitigation before rollout?",instruction:"Select exactly three.",options:[["A","Recycled resin supply could be inconsistent in quality or availability"],["B","Retailers may not execute reverse logistics consistently"],["C","Consumers may not return packs despite the incentive"],["D","The packaging color may trend poorly online"],["E","Office elevators may be busy"],["F","Competitors may use a different font"]],answer:["A","B","C"],points:10,exhibit:null },
  { id:"decision",category:"Synthesis",type:"single",prompt:"What should PacificPack recommend to its executive team?",instruction:"Select the most evidence-led recommendation.",options:[["A","Adopt Portfolio A and launch every component nationally on day one"],["B","Adopt Portfolio A conditionally: scale lightweighting and recycled resin, while gating the returnable pilot on retailer and consumer-return proof points"],["C","Choose compostable film because it sounds more sustainable"],["D","Pause the target until a zero-risk material exists"]],answer:"B",points:10,exhibit:null },
];

const caseLibrary = [
  { id: "nusasip", title: "NusaSip × BrewPack", context: "NusaSip is a 120-outlet Indonesian specialty-coffee chain. Operating profit fell 12% last year despite sales rising 15%. The CEO is evaluating an acquisition of BrewPack to launch RTD coffee through minimarkets.", situation: "NusaSip, an Indonesian specialty-coffee chain, is considering acquiring a local bottler to launch ready-to-drink coffee in minimarkets.", objective: "Should NusaSip acquire BrewPack—and if so, what is the maximum bid?", videoPrompt: "Advise NusaSip's CEO whether to acquire BrewPack and what to do next.", coachTitle: "You made the right call: test before buying.", coachText: "The best supported recommendation is to avoid an immediate acquisition: the IDR 120.8bn value is a ceiling, not a reason to pay it, and the national campaign has a –IDR 0.4bn risk-adjusted value. Pilot demand, close the 5m-bottle capacity gap, then revisit a negotiated bid.", coachClose: "I recommend a pilot rather than acquiring BrewPack now. The deal has a financial ceiling of IDR 120.8bn, but BrewPack cannot fulfill 5m bottles in Year 1 and a national launch is slightly value-negative after marketing spend. Pilot in priority cities, validate demand and cannibalization, and negotiate only once capacity and economics are proven.", questions: nusaSipQuestions },
  { id: "bumibite", title: "BumiBite × NutriPak", difficulty: "Hard", context: "BumiBite is an Indonesian healthy-snack brand. Operating profit fell despite revenue growth, and the CEO is evaluating an acquisition of NutriPak to launch protein chips nationally.", situation: "BumiBite, an Indonesian healthy-snack brand, is considering acquiring a local co-packer to launch protein chips through modern retail.", objective: "Should BumiBite acquire NutriPak—and if so, what is the maximum bid?", videoPrompt: "Advise BumiBite's CEO whether to acquire NutriPak and what to do next.", coachTitle: "You made the right call: validate the economics first.", coachText: "The IDR 92.0bn valuation is a ceiling, not an acquisition recommendation. NutriPak cannot cover 2m packs of Year-1 demand and the national launch is slightly value-negative after the launch investment. Pilot demand, verify cannibalization, and secure a capacity solution before bidding.", coachClose: "I recommend a pilot rather than acquiring NutriPak now. The financial ceiling is IDR 92.0bn, but there is a 2m-pack capacity gap and the launch is slightly value-negative on a risk-adjusted basis. Pilot in priority retailers, validate demand and margin, then revisit a negotiated acquisition once the capacity plan is clear.", questions: bumiBiteQuestions },
  { id: "suryagrid", title: "SuryaGrid 2030 Transition", difficulty: "Very hard · Sustainability", context: "SuryaGrid is a fictional Indonesian utility. Its board wants a 2030 climate target that reduces environmental impact without compromising system reliability or household affordability.", situation: "SuryaGrid must build a climate business case, choose initiatives, and set guardrails for a transition portfolio.", objective: "Recommend a feasible target and transition portfolio that balances emissions, reliability, affordability, and execution risk.", videoPrompt: "Advise SuryaGrid's board on the 2030 target and which transition portfolio to pursue.", coachTitle: "Strong sustainability cases treat trade-offs as constraints, not footnotes.", coachText: "Portfolio B is the feasible starting point: it reaches the emissions goal within budget, holds reliability flat, and stays within the affordability guardrail. The recommendation must remain conditional on permitting, replacement capacity, and demand-response proof points.", coachClose: "I recommend approving the 35% target and pursuing Portfolio B conditionally. It delivers the required 0.84m tCO₂e reduction inside the budget while holding reliability and tariffs within the board's guardrails. The main risk is execution: secure solar permits, pilot demand response, and gate diesel retirement on replacement-capacity readiness.", questions: suryaGridQuestions },
  { id:"healthaccess",title:"ArchipelagoCare Access",difficulty:"Very hard · Public sector",context:"ArchipelagoCare is a fictional Indonesian health network. It must improve timely consultations while protecting equity, clinical quality, and scarce staff capacity.",situation:"A health network needs an access strategy that does not leave rural or low-connectivity patients behind.",objective:"Recommend an access portfolio that improves timely care, equity, quality, and execution readiness.",videoPrompt:"Advise ArchipelagoCare's board on the access portfolio and the conditions required for rollout.",coachTitle:"The best access strategy improves outcomes without hiding who gets left behind.",coachText:"Portfolio A meets the timely-access target within budget without reducing quality. It should be phased through rural pilots with safeguards for connectivity, staffing, referral follow-up, and clinical quality.",coachClose:"I recommend approving Portfolio A through phased rural pilots. It provides 100,000 additional timely consultations inside the budget while preserving quality. The central risk is unequal access through digital triage, so we should track rural travel time, staff mobile clinics adequately, and gate scale-up on follow-up completion.",questions:healthAccessQuestions },
  { id:"circularpack",title:"PacificPack Circularity",difficulty:"Very hard · Circular economy",context:"PacificPack is a fictional consumer-goods company that must reduce virgin plastic without compromising food safety, customer adoption, or retailer execution.",situation:"A packaging transition must turn an environmental target into a viable consumer, retailer, and operations plan.",objective:"Recommend a packaging portfolio that delivers material reduction while protecting quality, adoption, and delivery feasibility.",videoPrompt:"Advise PacificPack's executive team on the packaging-transition portfolio and rollout sequence.",coachTitle:"Circularity only works when the material loop works in the real world.",coachText:"Portfolio A reaches the reduction target while keeping shelf life intact and meeting the collection-coverage guardrail. Lightweighting and recycled resin can scale first; the returnable model needs retailer and consumer-return proof before a broader rollout.",coachClose:"I recommend Portfolio A, with a staged rollout. It cuts 450 tonnes of virgin plastic inside the budget without compromising shelf life. Scale lightweighting and recycled resin now, and gate the returnable pilot on verified retailer reverse logistics, consumer return rates, and recycled-resin quality.",questions:circularPackQuestions },
];

const openingClientTurns = {
  nusasip: {
    type: "client",
    prompt: "Before we analyze the acquisition, which TWO questions would you ask the CEO first?",
    instruction: "Choose two questions that most directly frame the decision. Casey will answer only what you ask.",
    options: [["A", "What outcome would make this acquisition successful, and over what time horizon?"], ["B", "Which RTD customer segments and channels are in scope for the launch?"], ["C", "How many employees work at NusaSip's head office?"], ["D", "What colour should the launch campaign use?"], ["E", "How many café drinks are sold on a typical Friday?"]],
    answer: ["A", "B"],
    clientResponses: { A: "The CEO wants a financially attractive launch that strengthens the brand within three years; an acquisition is optional, not the objective.", B: "The launch targets minimarkets and modern retail, with an initial focus on urban convenience shoppers." },
  },
  bumibite: {
    type: "client",
    prompt: "Before we analyze the acquisition, which TWO questions would you ask the CEO first?",
    instruction: "Choose two questions that most directly frame the decision. Casey will answer only what you ask.",
    options: [["A", "What outcome would make this acquisition successful, and over what time horizon?"], ["B", "Which consumer segments and retail channels are in scope for protein chips?"], ["C", "How many staff work in BumiBite's Jakarta office?"], ["D", "Which celebrity does the CEO prefer for advertising?"], ["E", "What is the average commute time of the leadership team?"]],
    answer: ["A", "B"],
    clientResponses: { A: "The CEO wants a profitable national protein-chip platform within three years; buying NutriPak is only worthwhile if it advances that goal.", B: "The intended launch is through modern retail and e-commerce, aimed at active consumers seeking convenient high-protein snacks." },
  },
  suryagrid: {
    type: "client",
    prompt: "Before designing SuryaGrid's transition plan, which TWO questions would you ask the board first?",
    instruction: "Choose two questions that define the decision and its non-negotiable constraints.",
    options: [["A", "What emissions outcome and time horizon does the board expect?"], ["B", "Which reliability and household-affordability guardrails cannot be breached?"], ["C", "What font should the sustainability report use?"], ["D", "How many parking spaces are at headquarters?"], ["E", "Which board member speaks most often at conferences?"]],
    answer: ["A", "B"],
    clientResponses: { A: "The board's ambition is a 35% emissions reduction from 2024 by 2030.", B: "Average tariffs must rise by no more than 0.6%, and reliability must not decline from the current baseline." },
  },
  healthaccess: {
    type: "client",
    prompt: "Before designing an access plan, which TWO questions would you ask ArchipelagoCare's board first?",
    instruction: "Choose two questions that define success and protect the people most affected by the decision.",
    options: [["A", "What access outcome and time horizon define success?"], ["B", "Which patient groups or quality standards must not be disadvantaged?"], ["C", "What colour should mobile clinics be painted?"], ["D", "How often are flowers replaced in the lobby?"], ["E", "Which hospital has the largest staff cafeteria?"]],
    answer: ["A", "B"],
    clientResponses: { A: "The board wants 80% of patients to receive a consultation within 30 days within the next year.", B: "Rural and low-connectivity patients must not be left behind, and clinical-quality scores cannot fall." },
  },
  circularpack: {
    type: "client",
    prompt: "Before proposing a packaging transition, which TWO questions would you ask PacificPack's executive team first?",
    instruction: "Choose two questions that establish the target and the critical product or operating constraints.",
    options: [["A", "What plastic-reduction target and time horizon has the executive team committed to?"], ["B", "Which food-safety, shelf-life, consumer, or retailer constraints are non-negotiable?"], ["C", "Which airline does the CEO prefer to fly?"], ["D", "How many plants are in the head office?"], ["E", "Which cinema genres are most popular this year?"]],
    answer: ["A", "B"],
    clientResponses: { A: "PacificPack has committed to reduce virgin plastic by 25% within the next 18 months.", B: "Food safety and shelf life cannot deteriorate; any returnable solution needs consumer participation and retailer reverse-logistics support." },
  },
};

caseLibrary.forEach(caseItem => Object.assign(caseItem.questions[0], openingClientTurns[caseItem.id]));

const shortResponseOverrides = {
  nusasip: {
    capacity: { type: "short", prompt: "Using the capacity exhibit, explain what it means for NusaSip's proposed launch.", instruction: "In 2–4 lines, state the capacity fact, the implication for demand, and the operational consequence.", responsePrompt: "Capacity fact → demand implication → operational consequence", modelAnswer: "BrewPack has 9m bottles of spare capacity after its fixed third-party commitments, versus NusaSip demand of 14m. It therefore has a 5m-bottle gap in Year 1 and needs another source or added capacity before a full launch.", rubric: [{ label: "Identifies 9m bottles of spare capacity", concepts: ["9m", "9 million", "nine million"] }, { label: "Identifies the 5m-bottle demand gap", concepts: ["5m", "5 million", "five million", "capacity gap"] }, { label: "States that another source or added capacity is needed", concepts: ["another source", "second source", "additional capacity", "add capacity", "cannot meet", "not meet full demand"] }] },
    decision: { type: "short", prompt: "What should NusaSip recommend to its CEO?", instruction: "Answer first, then cite two case facts and one condition or next step.", responsePrompt: "Recommendation → evidence → condition / next step", modelAnswer: "NusaSip should not acquire BrewPack yet. BrewPack has a 5m-bottle Year-1 capacity gap and the national campaign is slightly value-negative after the one-off cost. Pilot demand, secure capacity, and revisit a negotiated bid once the economics are proven.", rubric: [{ label: "Recommends piloting or deferring an immediate acquisition", concepts: ["do not acquire", "not acquire", "defer", "pilot", "wait"] }, { label: "Cites the capacity gap", concepts: ["5m", "5 million", "capacity gap", "capacity"] }, { label: "Cites launch economics and a concrete next step", concepts: ["negative", "value negative", "risk adjusted", "campaign", "secure capacity", "test demand", "pilot"] }] },
  },
  bumibite: {
    capacity: { type: "short", prompt: "Using the capacity exhibit, explain what it means for BumiBite's proposed launch.", instruction: "In 2–4 lines, state the capacity fact, the implication for demand, and the operational consequence.", responsePrompt: "Capacity fact → demand implication → operational consequence", modelAnswer: "NutriPak has 10m packs of spare capacity after its fixed third-party commitments, versus BumiBite demand of 12m. There is a 2m-pack Year-1 gap, so BumiBite needs another co-packer or added capacity before a full launch.", rubric: [{ label: "Identifies 10m packs of spare capacity", concepts: ["10m", "10 million", "ten million"] }, { label: "Identifies the 2m-pack demand gap", concepts: ["2m", "2 million", "two million", "capacity gap"] }, { label: "States that another source or added capacity is needed", concepts: ["another source", "co-packer", "additional capacity", "add capacity", "cannot meet", "not meet full demand"] }] },
    decision: { type: "short", prompt: "What should BumiBite recommend to its CEO?", instruction: "Answer first, then cite two case facts and one condition or next step.", responsePrompt: "Recommendation → evidence → condition / next step", modelAnswer: "BumiBite should not acquire NutriPak yet. There is a 2m-pack capacity gap and the national launch is slightly value-negative after the launch cost. Pilot demand, resolve capacity, and revisit a negotiated bid once the economics are proven.", rubric: [{ label: "Recommends piloting or deferring an immediate acquisition", concepts: ["do not acquire", "not acquire", "defer", "pilot", "wait"] }, { label: "Cites the capacity gap", concepts: ["2m", "2 million", "capacity gap", "capacity"] }, { label: "Cites launch economics and a concrete next step", concepts: ["negative", "value negative", "risk adjusted", "launch", "secure capacity", "test demand", "pilot"] }] },
  },
  suryagrid: {
    portfolio: { type: "short", prompt: "Which transition portfolio should SuryaGrid pursue, and why?", instruction: "In 2–4 lines, name the portfolio and show how it satisfies the emissions, budget, reliability, and tariff constraints.", responsePrompt: "Portfolio → evidence against constraints → implication", portfolioOptions: [["A", "Solar PPAs + battery storage + coal efficiency + demand response"], ["B", "Solar PPAs + coal efficiency + demand response + diesel retirement"], ["C", "Solar PPAs + battery storage + diesel retirement"], ["D", "Battery storage + coal efficiency + demand response + diesel retirement"]], modelAnswer: "SuryaGrid should choose Portfolio B: solar PPAs, coal efficiency, demand response, and diesel retirement. It delivers 0.84m tCO₂e of abatement for IDR 145bn, has no net reliability decline, and limits tariff impact to +0.6%.", rubric: [{ label: "Identifies Portfolio B or its component initiatives", concepts: ["portfolio b", "solar", "coal efficiency", "demand response", "diesel retirement"] }, { label: "Shows it meets the emissions and budget constraints", concepts: ["0.84", "84", "145", "under 170", "budget"] }, { label: "Shows it meets reliability and tariff guardrails", concepts: ["reliability", "no decline", "0.6", "tariff"] }] },
    decision: { type: "short", prompt: "What should SuryaGrid recommend to its board?", instruction: "Answer first, then give evidence and the key conditions required for delivery.", responsePrompt: "Recommendation → evidence → delivery gates", modelAnswer: "Approve the 35% target and pursue Portfolio B conditionally. It meets the emissions, budget, reliability, and affordability guardrails; however, solar permitting, demand-response participation, and replacement capacity must be proven before full commitment.", rubric: [{ label: "Approves Portfolio B conditionally", concepts: ["portfolio b", "conditionally", "approve", "35% target"] }, { label: "Cites the multi-objective guardrails", concepts: ["emissions", "budget", "reliability", "tariff", "affordability"] }, { label: "Names concrete delivery gates", concepts: ["permitting", "demand response", "replacement capacity", "diesel", "pilot"] }] },
  },
  healthaccess: {
    portfolio: { type: "short", prompt: "Which access portfolio should ArchipelagoCare pursue, and why?", instruction: "In 2–4 lines, name the portfolio and show how it meets access, budget, and quality constraints.", responsePrompt: "Portfolio → evidence against constraints → implication", portfolioOptions: [["A", "Telehealth triage + mobile clinics + scheduling redesign"], ["B", "Telehealth triage + mobile clinics"], ["C", "Mobile clinics + weekend clinics"], ["D", "Telehealth triage + weekend clinics + scheduling redesign"]], modelAnswer: "ArchipelagoCare should select Portfolio A: telehealth triage, mobile clinics, and scheduling redesign. It creates 100,000 additional timely consultations at IDR 53bn without reducing clinical quality.", rubric: [{ label: "Identifies Portfolio A or its component interventions", concepts: ["portfolio a", "telehealth", "mobile clinics", "scheduling"] }, { label: "Cites the 100,000 timely-consultation target", concepts: ["100,000", "100k", "100 thousand"] }, { label: "Cites cost and preserves quality", concepts: ["53", "55", "budget", "quality", "no reduction"] }] },
    decision: { type: "short", prompt: "What should ArchipelagoCare recommend to its board?", instruction: "Answer first, then give evidence and the safeguards required for rollout.", responsePrompt: "Recommendation → evidence → equity / quality safeguards", modelAnswer: "Approve Portfolio A through phased rural pilots. It meets the access target within budget while preserving quality, but rollout should be gated on rural connectivity, mobile-clinic staffing, and referral follow-up safeguards.", rubric: [{ label: "Recommends Portfolio A with phased rollout", concepts: ["portfolio a", "phase", "pilot", "approve"] }, { label: "Cites access, budget, or quality evidence", concepts: ["100,000", "100k", "53", "budget", "quality"] }, { label: "Names equity or delivery safeguards", concepts: ["rural", "connectivity", "staffing", "follow-up", "referral"] }] },
  },
  circularpack: {
    portfolio: { type: "short", prompt: "Which packaging portfolio should PacificPack pursue, and why?", instruction: "In 2–4 lines, name the portfolio and show how it satisfies reduction, budget, shelf-life, and collection constraints.", responsePrompt: "Portfolio → evidence against constraints → implication", portfolioOptions: [["A", "Lightweighting + recycled-content resin + returnable pilot"], ["B", "Lightweighting + compostable film"], ["C", "Recycled-content resin + returnable pilot"], ["D", "Compostable film + returnable pilot"]], modelAnswer: "PacificPack should select Portfolio A: lightweighting, recycled-content resin, and a returnable pilot. It reduces 470 tonnes for IDR 75bn, preserves shelf life, and reaches 65% collection coverage.", rubric: [{ label: "Identifies Portfolio A or its component initiatives", concepts: ["portfolio a", "lightweighting", "recycled", "returnable"] }, { label: "Cites reduction and budget evidence", concepts: ["470", "450", "75", "80", "budget"] }, { label: "Cites product-quality and collection constraints", concepts: ["shelf life", "maintained", "65", "collection"] }] },
    decision: { type: "short", prompt: "What should PacificPack recommend to its executive team?", instruction: "Answer first, then give evidence and the rollout conditions required for the returnable model.", responsePrompt: "Recommendation → evidence → rollout gates", modelAnswer: "Adopt Portfolio A in stages. Scale lightweighting and recycled resin now because they meet the reduction goal without harming shelf life, while gating the returnable pilot on retailer reverse logistics and proven consumer return rates.", rubric: [{ label: "Recommends Portfolio A with a staged rollout", concepts: ["portfolio a", "stage", "phased", "scale"] }, { label: "Cites the material-reduction or quality case", concepts: ["reduction", "470", "450", "shelf life", "recycled", "lightweighting"] }, { label: "Gates the returnable model on execution proof", concepts: ["returnable", "retailer", "reverse logistics", "consumer return", "return rate"] }] },
  },
};

caseLibrary.forEach(caseItem => Object.entries(shortResponseOverrides[caseItem.id]).forEach(([id, override]) => Object.assign(caseItem.questions.find(question => question.id === id), override)));

let activeCase = caseLibrary[0];
const state = { screen: "welcome", mode: "timed", lastCaseId: null, index: 0, answers: {}, reasoning: {}, evaluations: {}, transcript: [], optionSeed: 1, seconds: CASE_MINUTES * 60, deadline: null, timer: null, videoTimer: null, prepSeconds: 60, recordingSeconds: 60, stream: null, recorder: null, recorded: false, onboardingStep: 0, lastAttemptId: null };
const app = document.querySelector("#app");
const letters = ["A", "B", "C", "D", "E", "F", "G", "H"];

const demoCandidates = [
  { id: "demo-aisha", name: "Aisha Rahman", role: "Strategy Analyst", title: "SuryaGrid 2030 Transition", mode: "Timed", score: 91, skills: { "Problem structuring": 92, "Quantitative reasoning": 88, "Data interpretation": 94, "Business judgment": 91, "Synthesis": 89 }, mistakes: [{ category: "Quantitative reasoning" }], date: "Today", status: "Recommended", videoRecorded: true, integrity: "No review flags" },
  { id: "demo-lucas", name: "Lucas Martin", role: "Business Analyst", title: "PacificPack Circularity", mode: "Timed", score: 86, skills: { "Problem structuring": 88, "Quantitative reasoning": 84, "Data interpretation": 90, "Business judgment": 82, "Synthesis": 85 }, mistakes: [{ category: "Business judgment" }], date: "Today", status: "Complete", videoRecorded: true, integrity: "No review flags" },
  { id: "demo-priya", name: "Priya Nair", role: "Graduate Consultant", title: "ArchipelagoCare Access", mode: "Timed", score: 78, skills: { "Problem structuring": 82, "Quantitative reasoning": 73, "Data interpretation": 81, "Business judgment": 76, "Synthesis": 75 }, mistakes: [{ category: "Quantitative reasoning" }, { category: "Synthesis" }], date: "Today", status: "Needs review", videoRecorded: false, integrity: "2 focus-change events — context required" },
  { id: "demo-james", name: "James Okafor", role: "Associate Consultant", title: "NusaSip × BrewPack", mode: "Timed", score: 84, skills: { "Problem structuring": 80, "Quantitative reasoning": 90, "Data interpretation": 83, "Business judgment": 79, "Synthesis": 84 }, mistakes: [{ category: "Business judgment" }], date: "Yesterday", status: "Complete", videoRecorded: true, integrity: "No review flags" },
];

function loadHistory() {
  try { return JSON.parse(localStorage.getItem("casey-practice-history") || "[]"); } catch { return []; }
}

function saveAttempt(attempt) {
  try {
    const history = [attempt, ...loadHistory()].slice(0, 12);
    localStorage.setItem("casey-practice-history", JSON.stringify(history));
  } catch { /* History is optional when browser storage is unavailable. */ }
}

function loadReviewStatuses() {
  try { return JSON.parse(localStorage.getItem("casey-review-statuses") || "{}"); } catch { return {}; }
}

function saveReviewStatus(id, status) {
  try { localStorage.setItem("casey-review-statuses", JSON.stringify({ ...loadReviewStatuses(), [id]: status })); } catch { /* Optional local demo state. */ }
}

function recruiterCandidates() {
  const statuses = loadReviewStatuses();
  const local = loadHistory().map((item, index) => ({
    ...item,
    id: item.id || `local-${index}-${item.date}`,
    name: "You (local attempt)",
    role: "Candidate practice record",
    status: "Complete",
    integrity: "No monitoring data collected",
  }));
  return [...local, ...demoCandidates].map(candidate => ({ ...candidate, status: statuses[candidate.id] || candidate.status }));
}

function recruiterView(selectedId = null, filter = "all") {
  const all = recruiterCandidates();
  const candidates = all.filter(candidate => filter === "all" || candidate.status.toLowerCase().replace(" ", "-") === filter);
  const selected = all.find(candidate => candidate.id === selectedId) || candidates[0] || all[0];
  const average = Math.round(all.reduce((sum, candidate) => sum + candidate.score, 0) / Math.max(1, all.length));
  shell(`<section class="recruiter-shell"><header class="recruiter-hero"><div><p class="eyebrow">RECRUITER REVIEW · LOCAL DEMO</p><h1>Assessment review queue</h1><p>Use results as structured evidence for a human conversation—not an automatic hiring decision.</p></div><button class="back-candidate" id="backCandidate">← Back to candidate practice</button></header><section class="recruiter-metrics"><article><small>CANDIDATES</small><b>${all.length}</b><span>Local + synthetic demo cohort</span></article><article><small>AVERAGE SCORE</small><b>${average}</b><span>Across completed assessments</span></article><article><small>RECOMMENDED</small><b>${all.filter(c => c.status === "Recommended").length}</b><span>Requires recruiter confirmation</span></article><article><small>REVIEW FLAGS</small><b>${all.filter(c => c.integrity !== "No review flags" && c.integrity !== "No monitoring data collected").length}</b><span>Signals, not verdicts</span></article></section><section class="review-controls"><div class="review-tabs">${[["all", "All candidates"], ["recommended", "Recommended"], ["complete", "Complete"], ["needs-review", "Needs review"]].map(([key, label]) => `<button class="review-filter ${filter === key ? "active" : ""}" data-filter="${key}">${label}</button>`).join("")}</div><p>Scores combine case evidence and capability results; video delivery remains human-reviewed.</p></section><section class="review-layout"><div class="review-list"><div class="review-list-head"><b>Candidate</b><b>Status</b><b>Score</b><b>Evidence</b></div>${candidates.sort((a,b) => b.score - a.score).map(candidate => `<button class="candidate-row ${selected?.id === candidate.id ? "selected" : ""}" data-candidate-id="${candidate.id}"><span><strong>${candidate.name}</strong><small>${candidate.role} · ${candidate.title}</small></span><em class="status ${candidate.status.toLowerCase().replace(" ", "-")}">${candidate.status}</em><b>${candidate.score}</b><i>${candidate.integrity === "No review flags" || candidate.integrity === "No monitoring data collected" ? "Evidence ready" : "Review signal"}</i></button>`).join("")}</div>${selected ? recruiterDetail(selected) : ""}</section></section>`);
  document.querySelector("#backCandidate").onclick = welcome;
  document.querySelectorAll(".review-filter").forEach(button => button.onclick = () => recruiterView(null, button.dataset.filter));
  document.querySelectorAll(".candidate-row").forEach(button => button.onclick = () => recruiterView(button.dataset.candidateId, filter));
  const progress = document.querySelector("#progressCandidate");
  if (progress) progress.onclick = () => { saveReviewStatus(selected.id, "Recommended"); recruiterView(selected.id, filter); };
  const note = document.querySelector(".review-note");
  if (note) note.onclick = () => { note.textContent = "Reviewer note recorded"; note.disabled = true; };
}

function recruiterDetail(candidate) {
  const skills = Object.entries(candidate.skills || {});
  const missed = [...new Set((candidate.mistakes || []).map(item => item.category))];
  return `<aside class="candidate-report"><div class="report-head"><div class="report-avatar">${candidate.name.split(" ").map(word => word[0]).join("").slice(0,2)}</div><div><h2>${candidate.name}</h2><p>${candidate.role}</p></div><span class="status ${candidate.status.toLowerCase().replace(" ", "-")}">${candidate.status}</span></div><section><h3>Assessment evidence</h3><p><b>${candidate.title}</b> · ${candidate.mode} · ${candidate.date}</p><div class="report-score"><b>${candidate.score}</b><span>/ 100 overall score</span></div></section><section><h3>Capability profile</h3>${skills.map(([name, score]) => `<div class="report-skill"><span>${name}</span><b>${score}</b><i><em style="width:${score}%"></em></i></div>`).join("")}</section><section><h3>Review notes</h3><p><b>Likely drill areas:</b> ${missed.length ? missed.join(", ") : "No material weak area identified"}</p><p><b>Video:</b> ${candidate.videoRecorded ? "Recorded; review answer-first structure and delivery." : "No recording available in this demo."}</p><p><b>Integrity context:</b> ${candidate.integrity}</p></section><div class="report-actions"><button class="primary" id="progressCandidate">Move to interview</button><button class="review-note">Add reviewer note</button></div><small class="human-note">Human review required: scores and interaction signals are decision support, not an automated hiring outcome.</small></aside>`;
}

function historyHtml() {
  const history = loadHistory();
  if (!history.length) return `<section class="history-card"><div><p class="eyebrow">ATTEMPT HISTORY</p><h2>Your trend will appear here.</h2><p>Complete a case to save the score and the capability to drill next.</p></div></section>`;
  const latest = history.slice(0, 4);
  const averages = ["Problem structuring", "Quantitative reasoning", "Data interpretation", "Business judgment", "Synthesis"].map(name => [name, Math.round(history.reduce((sum, item) => sum + item.skills[name], 0) / history.length)]).sort((a, b) => a[1] - b[1]);
  return `<section class="history-card"><div><p class="eyebrow">ATTEMPT HISTORY</p><h2>Keep drilling ${averages[0][0].toLowerCase()}.</h2><p>Your average is ${averages[0][1]}% in this capability across ${history.length} saved attempt${history.length === 1 ? "" : "s"}.</p></div><div class="history-list">${latest.map(item => `<div><span>${item.title}</span><small>${item.mode} · ${item.date}</small><b>${item.score}</b></div>`).join("")}</div></section>`;
}

function coachHtml() {
  const history = loadHistory();
  if (!history.length) return "";
  const misses = history.flatMap(item => item.mistakes || []);
  const grouped = Object.entries(misses.reduce((all, item) => ({ ...all, [item.category]: (all[item.category] || 0) + 1 }), {})).sort((a, b) => b[1] - a[1]);
  const focus = grouped[0]?.[0] || "Quantitative reasoning";
  return `<section class="coach-dashboard"><div><p class="eyebrow">PERSONAL COACH</p><h2>Your next drill: ${focus.toLowerCase()}.</h2><p>${grouped.length ? `${grouped[0][1]} saved miss${grouped[0][1] === 1 ? "" : "es"} point here. Run a short focused drill before your next full case.` : "Your recent work is balanced—use a timed case to keep it that way."}</p><button class="drill-button" id="startDrill" data-focus="${focus}">Start 5-minute drill →</button></div><div class="notebook"><b>Mistake notebook</b>${grouped.length ? grouped.slice(0, 3).map(([category, count]) => `<span>${category}<em>${count}</em></span>`).join("") : "<span>No saved misses yet.</span>"}</div></section>`;
}

function serviceDashboardHtml() {
  const history = loadHistory();
  const skills = ["Problem structuring", "Quantitative reasoning", "Data interpretation", "Business judgment", "Synthesis"];
  const readiness = history.length ? Math.round(history.reduce((sum, item) => sum + item.score, 0) / history.length) : 0;
  const weakest = history.length ? skills.map(skill => [skill, Math.round(history.reduce((sum, item) => sum + item.skills[skill], 0) / history.length)]).sort((a, b) => a[1] - b[1])[0] : ["Quantitative reasoning", 0];
  return `<section class="member-dashboard"><div class="member-heading"><div><p class="eyebrow">YOUR PREP OS</p><h2>Practice with a plan, not just more cases.</h2><p>Build case fluency, measure your readiness, and close your specific gaps.</p></div><span class="member-plan">Starter</span></div><div class="member-grid"><article><small>READINESS</small><strong>${history.length ? `${readiness}/100` : "—"}</strong><p>${history.length ? "Based on your recent attempts" : "Complete a case to establish a baseline"}</p></article><article><small>NEXT FOCUS</small><strong>${history.length ? weakest[0] : "First case"}</strong><p>${history.length ? `${weakest[1]}% current capability score` : "Start with a timed baseline"}</p></article><article><small>THIS WEEK</small><strong>${history.length}/3</strong><p>Suggested full simulations</p></article><article class="pro-card"><small>PRO PRACTICE</small><strong>Structured prep path</strong><p>Unlock custom plans, deeper drills, and expanded case packs.</p><button id="proPreview">Preview Pro →</button></article></div></section>`;
}

function proPreview() {
  const modal = `<div class="pro-modal-bg" id="proModal"><section class="pro-modal"><button id="closePro">×</button><p class="eyebrow">CASEY PRACTICE PRO</p><h2>Turn preparation into a repeatable system.</h2><p>Pro is the paid layer this product is designed to grow into: more cases, structured study plans, advanced drill packs, and richer progress analysis.</p><div class="pro-benefits"><span>Unlimited case rotations</span><span>Targeted capability sprints</span><span>Advanced case packs</span><span>Detailed readiness trends</span></div><button class="primary" id="proInterest">Join product waitlist</button><small id="proStatus">No payment details are requested in this prototype.</small></section></div>`;
  document.body.insertAdjacentHTML("beforeend", modal);
  document.querySelector("#closePro").onclick = () => document.querySelector("#proModal").remove();
  document.querySelector("#proInterest").onclick = () => { document.querySelector("#proStatus").textContent = "Interest saved locally. A production version would connect this to authentication and checkout."; };
}

function drill(focus) {
  const prompts = { "Problem structuring": "Name the three non-overlapping data sets you would request before deciding whether to launch a new service.", "Quantitative reasoning": "A programme costs IDR 48bn and creates IDR 12bn annual savings. What is the simple payback period in years?", "Data interpretation": "A chart shows revenue up 12%, profit down 8%, and unit volume flat. What is the most likely first hypothesis?", "Business judgment": "Name one customer, one operational, and one execution risk to test before scaling a pilot.", "Synthesis": "In two sentences, make a recommendation, give one evidence-based reason, and name one next step." };
  shell(`<section class="drill-room"><p class="eyebrow">5-MINUTE FOCUSED DRILL</p><h1>${focus}</h1><div class="drill-bubble"><span>c</span><p><b>Casey</b>${prompts[focus]}</p></div><textarea id="drillResponse" placeholder="Write your answer here…"></textarea><button class="primary" id="saveDrill">Save drill reflection →</button><p class="fine" id="drillSaved"></p></section>`);
  document.querySelector("#saveDrill").onclick = () => { document.querySelector("#drillSaved").textContent = "Saved locally. Compare your response against the relevant case feedback, then return for a timed simulation."; };
}

function formatTime(seconds) {
  const min = String(Math.max(0, Math.floor(seconds / 60))).padStart(2, "0");
  const sec = String(Math.max(0, seconds % 60)).padStart(2, "0");
  return `${min}:${sec}`;
}

function validateCaseLibrary() {
  caseLibrary.forEach(caseItem => {
    if (!Array.isArray(caseItem.questions) || caseItem.questions.length !== 8) throw new Error(`${caseItem.id} must contain exactly 8 questions.`);
    const ids = new Set();
    const total = caseItem.questions.reduce((sum, question) => {
      if (ids.has(question.id)) throw new Error(`${caseItem.id} contains a duplicate question id: ${question.id}`);
      ids.add(question.id);
      if (!question.category || !question.type || question.answer === undefined || !question.points) throw new Error(`${caseItem.id}/${question.id} is missing required assessment data.`);
      if (question.type === "short" && (!question.responsePrompt || !question.modelAnswer || !Array.isArray(question.rubric) || question.rubric.length !== 3)) throw new Error(`${caseItem.id}/${question.id} needs a three-part short-answer rubric.`);
      if (question.exhibit && question.exhibit.rows.some(row => row.length !== question.exhibit.columns.length)) throw new Error(`${caseItem.id}/${question.id} has an invalid exhibit table.`);
      return sum + question.points;
    }, 0);
    if (total !== 90) throw new Error(`${caseItem.id} must total 90 scored points; received ${total}.`);
  });
}

function persistCurrentAttempt() {
  if (!activeCase || state.screen !== "case") return;
  writeActiveAttempt({ version: 4, caseId: activeCase.id, mode: state.mode, index: state.index, answers: state.answers, reasoning: state.reasoning, evaluations: state.evaluations, transcript: state.transcript, optionSeed: state.optionSeed, deadline: state.deadline, lastCaseId: state.lastCaseId, savedAt: Date.now() });
}

function restoreAttempt(attempt) {
  activeCase = caseLibrary.find(caseItem => caseItem.id === attempt.caseId) || caseLibrary[0];
  state.mode = attempt.mode === "practice" ? "practice" : "timed";
  state.index = Math.min(Math.max(0, attempt.index || 0), activeCase.questions.length - 1);
  state.answers = attempt.answers || {};
  state.reasoning = attempt.reasoning || {};
  state.evaluations = attempt.evaluations || {};
  state.transcript = attempt.transcript || transcriptFromAnswers();
  state.optionSeed = attempt.optionSeed || 1;
  state.deadline = attempt.deadline || null;
  state.lastCaseId = attempt.lastCaseId || activeCase.id;
  state.screen = "case";
  if (state.mode === "timed" && state.deadline && state.deadline <= Date.now()) { clearActiveAttempt(); videoRoom(); return; }
  renderQuestion();
  startTimer();
}

function formatTranscriptAnswer(answer) {
  if (answer && typeof answer === "object" && !Array.isArray(answer)) {
    const value = Array.isArray(answer.value) ? answer.value.join(", ") : answer.value;
    return `${escapeHtml(value)}${answer.reasoning ? `<span class="candidate-reasoning">${escapeHtml(answer.reasoning)}</span>` : ""}`;
  }
  if (Array.isArray(answer)) return answer.join(", ");
  return String(answer);
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[character]);
}

function transcriptFromAnswers() {
  if (!activeCase) return [];
  return activeCase.questions.flatMap((question, index) => state.answers[question.id] === undefined ? [] : [{ questionIndex: index, prompt: question.prompt, answer: { value: state.answers[question.id], reasoning: state.reasoning[question.id] || "" }, exhibit: question.exhibit || null }]);
}

function transcriptHtml() {
  if (!state.transcript.length) return `<div class="chat-intro" role="status"><span>c</span><p><b>Casey</b> I’ll guide you through one business decision. Read each exhibit closely and send your best answer when ready.</p></div>`;
  return `<section class="chat-log" aria-live="polite">${state.transcript.map(turn => `<article class="chat-turn casey-turn"><span>c</span><div><b>Casey</b><p>${turn.prompt}</p>${turn.exhibit ? inlineExhibit(turn.exhibit) : ""}</div></article>${turn.answer === undefined ? "" : `<article class="chat-turn candidate-turn"><div><b>You</b><p>${formatTranscriptAnswer(turn.answer)}</p><small>Sent · locked</small></div></article>`}`).join("")}</section>`;
}

function inlineExhibit(exhibit) {
  return `<details class="inline-exhibit"><summary>Attachment · ${exhibit.title} <span>View data</span></summary><div class="inline-table"><table><thead><tr>${exhibit.columns.map(column => `<th>${column}</th>`).join("")}</tr></thead><tbody>${exhibit.rows.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join("")}</tr>`).join("")}</tbody></table></div></details>`;
}

function startTimer() {
  clearInterval(state.timer);
  if (state.mode !== "timed") return;
  state.deadline ||= Date.now() + CASE_MINUTES * 60 * 1000;
  const update = () => {
    state.seconds = Math.max(0, Math.ceil((state.deadline - Date.now()) / 1000));
    const node = document.querySelector("#timer");
    if (node) node.textContent = `◷ ${formatTime(state.seconds)}`;
    if (state.seconds <= 0) { clearInterval(state.timer); clearActiveAttempt(); videoRoom(); }
  };
  update();
  state.timer = setInterval(update, 1000);
}

function shell(content, assessment = false) {
  const modeLabel = state.mode === "practice" ? "Practice mode" : "Timed simulation";
  app.innerHTML = `<header class="topbar"><a class="brand" href="#" aria-label="Start page"><span>c</span>casey <em>practice</em></a>${assessment ? `<div class="progress-text">${modeLabel} · Question ${Math.min(state.index + 1, activeCase.questions.length)} of ${activeCase.questions.length}</div>${state.mode === "timed" ? `<div class="timer" id="timer" aria-label="Time remaining">◷ ${formatTime(state.seconds)}</div>` : ""}` : `<div class="practice-label">Independent BCG-style preparation</div>`}</header>${content}`;
  const scale = Number(localStorage.getItem("casey-font-scale") || "0");
  document.documentElement.dataset.fontScale = String(scale);
  document.querySelector(".topbar").insertAdjacentHTML("beforeend", `<div class="font-controls" aria-label="Text size"><button id="fontDown" ${scale <= 0 ? "disabled" : ""}>A−</button><button id="fontUp" ${scale >= 2 ? "disabled" : ""}>A+</button></div>`);
  document.querySelector("#fontDown").onclick = () => setFontScale(scale - 1);
  document.querySelector("#fontUp").onclick = () => setFontScale(scale + 1);
}

function setFontScale(scale) {
  const next = Math.max(0, Math.min(2, scale));
  localStorage.setItem("casey-font-scale", String(next));
  document.documentElement.dataset.fontScale = String(next);
  document.querySelector("#fontDown").disabled = next <= 0;
  document.querySelector("#fontUp").disabled = next >= 2;
  document.querySelector("#fontDown").onclick = () => setFontScale(next - 1);
  document.querySelector("#fontUp").onclick = () => setFontScale(next + 1);
}

function caseCardsHtml() {
  return `<section class="library"><div class="library-head"><div><p class="eyebrow">CASE LIBRARY</p><h2>Choose your next challenge.</h2></div><button class="random-case" id="randomCase">↻ Random case</button></div><div class="case-grid">${caseLibrary.map(caseItem => `<article class="case-tile"><div><span class="difficulty">${caseItem.difficulty || "Hard"}</span><h3>${caseItem.title}</h3><p>${caseItem.situation}</p></div><footer><small>8 questions · 30 min · feedback</small><button class="choose-case" data-case-id="${caseItem.id}">Start →</button></footer></article>`).join("")}</div></section>`;
}

function welcome() {
  state.screen = "welcome";
  shell(`<section class="welcome">
    <div class="welcome-copy">
      <p class="eyebrow">BCG-STYLE ONLINE CASE</p>
      <h1>A calm, realistic Casey practice run.</h1>
      <p class="lede">Five rotating cases: two hard commercial cases and three very-hard, multi-objective cases. Each run has eight questions, exhibits, quantitative reasoning, and a one-minute recommendation.</p>
      <div class="setup-cards"><div><span>5</span><small>Rotating cases</small></div><div><span>8</span><small>Sequential questions</small></div><div><span>1 min</span><small>Video close</small></div></div>
      <div class="mode-picker"><button class="mode selected" data-mode="timed"><b>Timed simulation</b><small>30 minutes · feedback at the end</small></button><button class="mode" data-mode="practice"><b>Practice mode</b><small>No timer · answer feedback as you go</small></button></div>
      <button class="primary large" id="start">Begin timed simulation <span>→</span></button>
      <p class="fine">Calculator, paper, and pen are allowed. Answers lock when you continue. This is an independent educational simulator—not an official BCG or HireQuotient assessment.</p>
    </div>
    <aside class="case-card"><div class="case-icon">⌁</div><p class="eyebrow">ROTATING CASE LIBRARY</p><h2>Commercial + public-impact strategy</h2><p>Attempts rotate across acquisition, climate transition, health-care access, and circular-packaging decisions with real trade-offs.</p><div class="objective"><span>Objective</span><b>Make a recommendation that balances the true decision constraints—not just the financial answer.</b></div></aside>
  </section>${serviceDashboardHtml()}${caseCardsHtml()}${coachHtml()}${historyHtml()}`);
  document.querySelectorAll(".mode").forEach(button => button.onclick = () => {
    state.mode = button.dataset.mode;
    document.querySelectorAll(".mode").forEach(x => x.classList.toggle("selected", x === button));
    document.querySelector("#start").innerHTML = `Begin ${state.mode === "practice" ? "practice mode" : "timed simulation"} <span>→</span>`;
  });
  document.querySelector("#start").onclick = () => onboarding(state.mode);
  document.querySelector("#randomCase").onclick = () => onboarding(state.mode);
  document.querySelectorAll(".choose-case").forEach(button => button.onclick = () => onboarding(state.mode, button.dataset.caseId));
  if (document.querySelector("#startDrill")) document.querySelector("#startDrill").onclick = event => drill(event.currentTarget.dataset.focus);
  document.querySelector("#proPreview").onclick = proPreview;
  const saved = readActiveAttempt();
  if (saved && caseLibrary.some(caseItem => caseItem.id === saved.caseId)) {
    document.querySelector(".welcome-copy").insertAdjacentHTML("beforeend", `<div class="resume-card"><b>Assessment in progress</b><span>Your previous ${saved.mode} attempt is saved on this browser.</span><button id="resumeAttempt">Resume →</button><button id="discardAttempt">Discard</button></div>`);
    document.querySelector("#resumeAttempt").onclick = () => restoreAttempt(saved);
    document.querySelector("#discardAttempt").onclick = () => { clearActiveAttempt(); welcome(); };
  }
}

function onboarding(mode, selectedCaseId = null) {
  state.mode = mode;
  state.onboardingStep = 0;
  shell(`<section class="onboarding"><p class="eyebrow">ASSESSMENT SETUP</p><div class="onboarding-progress"><i class="active"></i><i></i><i></i></div><h1>Before we begin.</h1><div class="onboarding-card" id="onboardingCard"></div><button class="primary large" id="onboardingNext">Continue →</button><button class="text-button" id="cancelOnboarding">Back to library</button></section>`);
  const steps = [
    ["What you need", "Use a calculator, paper, and pen. Timed mode locks answers after they are sent; Practice mode gives immediate feedback."],
    ["Device and privacy", "Camera recording is optional practice only. If you start it, the browser requests permission; nothing is uploaded or retained by this simulator."],
    ["One warm-up", "A client has revenue of IDR 120bn and costs of IDR 95bn. What is operating profit?", "25"],
  ];
  const renderStep = () => {
    const [title, copy, answer] = steps[state.onboardingStep];
    document.querySelector("#onboardingCard").innerHTML = `<h2>${title}</h2><p>${copy}</p>${answer ? `<label>Answer <input id="warmupAnswer" inputmode="decimal" placeholder="IDR billion" /></label><small id="warmupFeedback"></small>` : ""}`;
    document.querySelectorAll(".onboarding-progress i").forEach((dot, index) => dot.classList.toggle("active", index <= state.onboardingStep));
    document.querySelector("#onboardingNext").textContent = state.onboardingStep === steps.length - 1 ? "Start assessment →" : "Continue →";
  };
  renderStep();
  document.querySelector("#onboardingNext").onclick = () => {
    if (state.onboardingStep === 2) {
      const feedback = document.querySelector("#warmupFeedback");
      if (document.querySelector("#warmupAnswer").value !== "25") { feedback.textContent = "Try one more time: profit = revenue − cost."; return; }
      start(mode, selectedCaseId);
      return;
    }
    state.onboardingStep += 1;
    renderStep();
  };
  document.querySelector("#cancelOnboarding").onclick = welcome;
}

function start(mode, selectedCaseId = null) {
  state.screen = "case";
  state.mode = mode;
  const availableCases = caseLibrary.filter(caseItem => caseItem.id !== state.lastCaseId);
  activeCase = selectedCaseId ? caseLibrary.find(caseItem => caseItem.id === selectedCaseId) : availableCases[Math.floor(Math.random() * availableCases.length)];
  state.lastCaseId = activeCase.id;
  state.seconds = CASE_MINUTES * 60;
  state.deadline = mode === "timed" ? Date.now() + CASE_MINUTES * 60 * 1000 : null;
  state.index = 0;
  state.answers = {};
  state.reasoning = {};
  state.evaluations = {};
  state.transcript = [];
  state.optionSeed = Math.floor(Math.random() * 2147483647) || 1;
  renderQuestion();
  persistCurrentAttempt();
  startTimer();
}

function exhibitHtml(exhibit, portfolioOptions = []) {
  if (!exhibit) return `<div class="exhibit empty-exhibit"><span>⌁</span><p>No additional exhibit is required for this question.</p><small>Use the client objective and your business judgment.</small></div>`;
  return `<aside class="exhibit"><div class="exhibit-head"><div><span>${exhibit.title}</span><small>${exhibit.note}</small></div><button class="expand" title="Exhibit is already shown at full readable size">⤢</button></div><div class="table-wrap"><table><thead><tr>${exhibit.columns.map(c => `<th>${c}</th>`).join("")}</tr></thead><tbody>${exhibit.rows.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join("")}</tr>`).join("")}</tbody></table></div></aside>`;
}

function portfolioMenuHtml(portfolios) {
  return `<section class="portfolio-menu"><div><span>Candidate portfolios</span><small>Each portfolio combines the initiatives shown in the exhibit.</small></div>${portfolios.map(([name, initiatives]) => `<article><b>Portfolio ${name}</b><p>${initiatives}</p></article>`).join("")}</section>`;
}

function openExhibitViewer(exhibit, portfolioOptions = []) {
  if (!exhibit) return;
  const viewer = `<div class="exhibit-viewer" id="exhibitViewer" role="dialog" aria-modal="true" aria-label="Expanded exhibit"><section><header><div><span>${exhibit.title}</span><small>${exhibit.note}</small></div><button id="closeExhibitViewer" aria-label="Close exhibit">×</button></header><div class="exhibit-viewer-table"><table><thead><tr>${exhibit.columns.map(column => `<th>${column}</th>`).join("")}</tr></thead><tbody>${exhibit.rows.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join("")}</tr>`).join("")}</tbody></table></div>${portfolioOptions.length ? portfolioMenuHtml(portfolioOptions) : ""}</section></div>`;
  document.body.insertAdjacentHTML("beforeend", viewer);
  const close = () => document.querySelector("#exhibitViewer")?.remove();
  document.querySelector("#closeExhibitViewer").onclick = close;
  document.querySelector("#exhibitViewer").onclick = event => { if (event.target.id === "exhibitViewer") close(); };
  document.addEventListener("keydown", function onKeydown(event) { if (event.key === "Escape") { close(); document.removeEventListener("keydown", onKeydown); } });
}

function optionOrder(q) {
  let seed = state.optionSeed >>> 0;
  for (const char of q.id) seed = Math.imul(seed ^ char.charCodeAt(0), 16777619) >>> 0;
  const next = () => {
    seed = (seed + 0x6D2B79F5) >>> 0;
    let value = seed;
    value = Math.imul(value ^ value >>> 15, value | 1);
    value ^= value + Math.imul(value ^ value >>> 7, value | 61);
    return ((value ^ value >>> 14) >>> 0) / 4294967296;
  };
  const ordered = [...q.options];
  for (let index = ordered.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(next() * (index + 1));
    [ordered[index], ordered[swapIndex]] = [ordered[swapIndex], ordered[index]];
  }
  return ordered;
}

function needsReasoning(q) {
  return q.type !== "short" && (q.category === "Data interpretation" || q.category === "Synthesis");
}

function answerControl(q) {
  if (q.type === "number") return `<label class="number-field"><span>Answer <small>${q.answerUnit || "IDR billion"}</small></span><input id="response" inputmode="decimal" autocomplete="off" placeholder="Enter a number" /><em>Use a minus sign for negative answers.</em></label>`;
  if (q.type === "short") return `<label class="short-answer-field"><span>Your response</span><small>${q.responsePrompt}</small><textarea id="response" placeholder="Write a concise, evidence-led answer…"></textarea><em>Casey scores the ideas you make visible, not a single exact wording.</em></label>`;
  const options = optionOrder(q);
  if (q.type === "single") return `<div class="choices single">${options.map(([key, label]) => `<button class="choice" data-value="${key}"><i>${key}</i><span>${label}</span></button>`).join("")}</div>`;
  return `<div class="choices multi">${options.map(([key, label]) => `<button class="choice" data-value="${key}"><i>${key}</i><span>${label}</span><b>✓</b></button>`).join("")}</div>`;
}

function renderQuestion() {
  const q = activeCase.questions[state.index];
  if (activeCase.id === "suryagrid") {
    q.answerUnit = { target: "million tCO₂e", cost: "IDR thousand / tCO₂e", score: "score / 100" }[q.id] || q.answerUnit;
  }
  if (activeCase.id === "circularpack" && q.id === "score") q.answer = 88.8;
  shell(`<section class="assessment-layout"><div class="case-pane"><div class="case-context"><p class="eyebrow">${activeCase.title.toUpperCase()}</p><h1>${q.category}</h1><p>${activeCase.context}</p></div>${exhibitHtml(q.exhibit)}</div><section class="question-pane"><div class="bot-note"><span>c</span><p><b>Casey</b> <small>${state.index === 0 ? "Start by selecting the information that lets you test the full business case." : "Use the exhibit, then choose the most defensible answer."}</small></p></div><div class="question-head"><span class="pill">${q.category}</span><span class="locked">${state.mode === "practice" ? "Immediate feedback is on" : "Answers lock after you continue"}</span></div><h2>${q.prompt}</h2><p class="instruction">${q.instruction}</p>${answerControl(q)}<div class="question-footer"><button class="calculator" id="calculator">⌗ Calculator</button><button class="primary" id="continue" disabled>Continue <span>→</span></button></div></section></section><div class="calc-popover hidden" id="calc"><div><b>Calculator</b><button id="closeCalc">×</button></div><input id="calcDisplay" value="0" readonly /><section class="calc-keys">${["7", "8", "9", "÷", "4", "5", "6", "×", "1", "2", "3", "−", "0", ".", "=", "+"].map(k => `<button data-key="${k}">${k}</button>`).join("")}<button class="clear" data-key="clear">Clear</button></section></div>`, true);
  if (q.portfolioOptions) document.querySelector(".case-pane").insertAdjacentHTML("beforeend", portfolioMenuHtml(q.portfolioOptions));
  document.querySelector(".expand")?.addEventListener("click", () => openExhibitViewer(q.exhibit, q.portfolioOptions || []));
  document.querySelector(".question-pane").classList.add("chat-pane");
  if (q.type === "client") {
    document.querySelector(".choices")?.classList.add("client-questions");
    document.querySelector(".bot-note small").textContent = "Start by asking the client the questions that define the decision. Casey will answer only the questions you send.";
  }
  document.querySelector(".question-pane").insertAdjacentHTML("afterbegin", transcriptHtml());
  document.querySelector(".question-head").insertAdjacentHTML("beforebegin", `<div class="active-turn-divider"><span>Current turn</span></div>`);
  document.querySelector(".question-head").insertAdjacentHTML("beforebegin", `<div class="chat-meta"><span>Casey · ${activeCase.difficulty || "Hard"}</span><span>● online</span></div>`);
  if (state.mode === "practice") {
    document.querySelector(".question-pane").insertAdjacentHTML("afterbegin", `<nav class="practice-nav">${activeCase.questions.map((question, index) => `<button class="${index === state.index ? "current" : ""}" data-practice-index="${index}" ${index > state.index ? "disabled" : ""}>${index + 1}${state.answers[question.id] !== undefined ? " ✓" : ""}</button>`).join("")}</nav>`);
    document.querySelectorAll("[data-practice-index]").forEach(button => button.onclick = () => { state.index = Number(button.dataset.practiceIndex); renderQuestion(); });
  }
  document.querySelector(".case-context .eyebrow").textContent = `${activeCase.difficulty || "Hard"} · ${activeCase.title}`;
  if (needsReasoning(q)) document.querySelector(".question-footer").insertAdjacentHTML("beforebegin", `<label class="reasoning-field">Tell Casey your reasoning <small>Use 2–4 concise lines: observation → implication → likely driver. This is required for interpretation and recommendation turns.</small><textarea id="reasoning" placeholder="State the evidence, what it means for the decision, and the likely driver or next step."></textarea></label>`);
  wireQuestion(q);
}

function wireQuestion(q) {
  const continueBtn = document.querySelector("#continue");
  let selected = q.type === "multi" || q.type === "client" ? (state.answers[q.id] || []) : (state.answers[q.id] ?? null);
  const reasoningInput = document.querySelector("#reasoning");
  if (reasoningInput && state.mode === "practice") reasoningInput.value = state.reasoning[q.id] || "";
  const answerReady = () => {
    if (q.type === "number" || q.type === "short") {
      const value = document.querySelector("#response")?.value.trim() || "";
      return q.type === "short" ? value.length >= 24 : value !== "" && !Number.isNaN(Number(value));
    }
    if (q.type === "multi" || q.type === "client") {
      const required = Array.isArray(q.answer) ? q.answer.length : 1;
      return selected.length === required;
    }
    return Boolean(selected);
  };
  const updateContinue = () => {
    const reasoningReady = !needsReasoning(q) || (reasoningInput?.value.trim().length || 0) >= 24;
    continueBtn.disabled = !(answerReady() && reasoningReady);
  };
  if (q.type === "number" || q.type === "short") {
    const input = document.querySelector("#response");
    if (state.mode === "practice" && selected !== null) input.value = selected;
    input.oninput = updateContinue;
    input.focus();
  } else {
    if (state.mode === "practice" && selected) document.querySelectorAll(".choice").forEach(button => button.classList.toggle("selected", Array.isArray(selected) ? selected.includes(button.dataset.value) : selected === button.dataset.value));
    document.querySelectorAll(".choice").forEach(button => button.onclick = () => {
      const value = button.dataset.value;
      if (q.type === "client") document.querySelector(".client-correction")?.remove();
      if (q.type === "single") {
        document.querySelectorAll(".choice").forEach(x => x.classList.remove("selected"));
        button.classList.add("selected");
        selected = value;
      } else {
        button.classList.toggle("selected");
        selected = [...document.querySelectorAll(".choice.selected")].map(x => x.dataset.value);
      }
      updateContinue();
      if (!document.querySelector(".response-ready")) document.querySelector(".question-footer").insertAdjacentHTML("beforebegin", `<div class="response-ready">You <span>Response ready to send</span></div>`);
    });
  }
  if (reasoningInput) {
    reasoningInput.oninput = updateContinue;
    reasoningInput.onblur = () => { if (reasoningInput.value.trim()) state.reasoning[q.id] = reasoningInput.value.trim(); };
  }
  updateContinue();
  continueBtn.onclick = () => {
    const answer = q.type === "number" ? Number(document.querySelector("#response").value) : q.type === "short" ? document.querySelector("#response").value.trim() : selected;
    const reasoning = reasoningInput?.value.trim() || "";
    state.answers[q.id] = answer;
    if (reasoning) state.reasoning[q.id] = reasoning;
    state.evaluations[q.id] = evaluateAnswer(q, answer);
    state.transcript = [...state.transcript.filter(turn => turn.questionIndex !== state.index), { questionIndex: state.index, prompt: q.prompt, answer: { value: answer, reasoning }, exhibit: q.exhibit || null }].sort((a, b) => a.questionIndex - b.questionIndex);
    persistCurrentAttempt();
    if (q.type === "client") return showClientExchange(q, answer);
    if (q.type === "short" && state.mode === "practice") return showShortPracticeCheck(q, answer, state.evaluations[q.id]);
    if (state.mode === "practice") return showPracticeCheck(q, answer);
    advanceQuestion();
  };
  calculator();
}

function advanceQuestion() {
  state.index += 1;
  persistCurrentAttempt();
  if (state.index >= activeCase.questions.length) { videoRoom(); return; }
  const pane = document.querySelector(".question-pane");
  if (!pane) { renderQuestion(); return; }
  pane.insertAdjacentHTML("beforeend", `<div class="casey-thinking" role="status"><span></span><span></span><span></span> Casey is reviewing your response…</div>`);
  document.querySelector("#continue").disabled = true;
  setTimeout(renderQuestion, 420);
}

function showPracticeCheck(q, answer) {
  const correct = isCorrect(q, answer);
  document.querySelectorAll(".choice").forEach(button => button.disabled = true);
  const input = document.querySelector("#response");
  if (input) input.readOnly = true;
  document.querySelector(".question-footer").insertAdjacentHTML("beforebegin", `<div class="instant-feedback ${correct ? "correct" : "incorrect"}"><b>Casey · ${correct ? "That’s a sound read" : "Let’s revisit the setup"}</b><span>${correct ? "Your answer matches the expected result. Keep this observation-and-implication structure for the next turn." : explain(q.id)}</span></div>`);
  const continueBtn = document.querySelector("#continue");
  continueBtn.disabled = false;
  continueBtn.innerHTML = state.index === activeCase.questions.length - 1 ? "Continue to recommendation <span>→</span>" : "Next question <span>→</span>";
  continueBtn.onclick = advanceQuestion;
}

function showShortPracticeCheck(q, answer, evaluation) {
  const input = document.querySelector("#response");
  if (input) input.readOnly = true;
  const met = evaluation.criteria.filter(criterion => criterion.met);
  const missed = evaluation.criteria.filter(criterion => !criterion.met);
  document.querySelector(".question-footer").insertAdjacentHTML("beforebegin", `<section class="short-feedback ${evaluation.correct ? "full" : "partial"}"><div><span>c</span><p><b>Casey · ${evaluation.earnedPoints}/${q.points} points</b>${evaluation.correct ? "You made each core decision point visible." : "Your response has a useful start; make the missing decision points explicit."}</p></div><section><b>Evidence Casey recognized</b>${met.length ? met.map(criterion => `<span class="rubric-chip met">✓ ${criterion.label}</span>`).join("") : "<span class=\"rubric-chip\">No required evidence recognized yet.</span>"}<b>Make explicit next time</b>${missed.length ? missed.map(criterion => `<span class="rubric-chip missed">+ ${criterion.label}</span>`).join("") : "<span class=\"rubric-chip met\">All core points covered</span>"}</section><details><summary>View a model response</summary><p>${q.modelAnswer}</p></details></section>`);
  const continueBtn = document.querySelector("#continue");
  continueBtn.disabled = false;
  continueBtn.innerHTML = state.index === activeCase.questions.length - 1 ? "Continue to recommendation <span>→</span>" : "Next question <span>→</span>";
  continueBtn.onclick = advanceQuestion;
}

function showClientExchange(q, answer) {
  const correct = isCorrect(q, answer);
  const continueBtn = document.querySelector("#continue");
  if (!correct) {
    delete state.answers[q.id];
    delete state.evaluations[q.id];
    state.transcript = state.transcript.filter(turn => turn.questionIndex !== state.index);
    persistCurrentAttempt();
    document.querySelector(".question-footer").insertAdjacentHTML("beforebegin", `<div class="client-correction"><b>Casey</b><span>One of those questions is not decision-critical yet. Keep the conversation on the decision objective and the business scope; then try again.</span></div>`);
    continueBtn.disabled = true;
    return;
  }
  document.querySelectorAll(".choice").forEach(button => button.disabled = true);
  const replies = answer.map(key => `<li>${q.clientResponses[key]}</li>`).join("");
  document.querySelector(".question-footer").insertAdjacentHTML("beforebegin", `<div class="client-reply"><span>c</span><div><b>Casey</b><p>Good starting questions. Here is what the client tells us:</p><ul>${replies}</ul><p>Let’s use that framing to examine the first data exhibit.</p></div></div>`);
  continueBtn.disabled = false;
  continueBtn.innerHTML = "Open first data exhibit <span>→</span>";
  continueBtn.onclick = advanceQuestion;
}

function calculator() {
  const popover = document.querySelector("#calc");
  document.querySelector("#calculator").onclick = () => popover.classList.toggle("hidden");
  document.querySelector("#closeCalc").onclick = () => popover.classList.add("hidden");
  const display = document.querySelector("#calcDisplay");
  let expr = "";
  document.querySelectorAll("[data-key]").forEach(key => key.onclick = () => {
    const value = key.dataset.key;
    if (value === "clear") { expr = ""; display.value = "0"; return; }
    if (value === "=") {
      try { expr = String(Function(`"use strict"; return (${expr.replaceAll("×", "*").replaceAll("÷", "/").replaceAll("−", "-")})`)()); display.value = expr; } catch { display.value = "Error"; expr = ""; }
      return;
    }
    expr += value;
    display.value = expr;
  });
}

function videoRoom() {
  clearInterval(state.timer);
  clearActiveAttempt();
  state.transcript.push({ questionIndex: activeCase.questions.length, prompt: activeCase.videoPrompt, exhibit: null });
  state.screen = "video";
  state.prepSeconds = 60;
  state.recordingSeconds = 60;
  state.recorded = false;
  renderVideo("prep");
}

function renderVideo(stage) {
  shell(`<section class="video-room"><div class="video-copy"><p class="eyebrow">FINAL RECOMMENDATION</p><span class="pill">One attempt</span><h1>${stage === "prep" ? "Take a minute to prepare your recommendation." : "Record your one-minute recommendation."}</h1><p>Advise NusaSip's CEO whether to acquire BrewPack and what to do next. Lead with your answer, give 2–3 reasons, then name one risk and next step.</p><div class="video-framework"><b>A useful 60-second shape</b><ol><li>Recommendation</li><li>Evidence: economics, capacity, and risk-adjusted launch value</li><li>Risk + next step</li></ol></div><button class="primary large" id="videoAction">${stage === "prep" ? "Start recording" : "Start 1-minute recording"} <span>→</span></button><button class="text-button" id="skipVideo">Skip camera practice and see feedback</button></div><aside class="video-card"><div class="video-top"><span class="live-dot"></span><span id="videoStatus">${stage === "prep" ? "PREPARATION" : "READY TO RECORD"}</span><b id="videoTimer">${formatTime(stage === "prep" ? state.prepSeconds : state.recordingSeconds)}</b></div><div class="camera"><video id="camera" autoplay muted playsinline></video><div class="camera-placeholder" id="cameraPlaceholder"><span>◉</span><b>Camera preview</b><small>Camera access is requested only when recording begins.</small></div></div><p class="video-tip">${stage === "prep" ? "Rehearse before you start—the assessment is waiting." : "Look at the camera, speak in headlines, and finish your final sentence."}</p></aside></section>`, true);
  document.querySelector(".video-copy").insertAdjacentHTML("afterbegin", `<div class="final-chat-turn"><span>c</span><p><b>Casey</b>${activeCase.videoPrompt}</p></div>`);
  document.querySelector(".video-copy > p:not(.eyebrow)").textContent = `${activeCase.videoPrompt} Lead with your answer, give 2–3 reasons, then name one risk and next step.`;
  document.querySelector("#skipVideo").onclick = feedback;
  document.querySelector("#videoAction").onclick = () => stage === "prep" ? beginRecording() : record();
  if (stage === "prep") {
    state.videoTimer = setInterval(() => {
      state.prepSeconds -= 1;
      const timer = document.querySelector("#videoTimer");
      if (timer) timer.textContent = formatTime(state.prepSeconds);
      if (state.prepSeconds <= 0) { clearInterval(state.videoTimer); beginRecording(); }
    }, 1000);
  }
}

async function beginRecording() {
  clearInterval(state.videoTimer);
  try {
    state.stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    renderVideo("record");
    const video = document.querySelector("#camera");
    video.srcObject = state.stream;
    document.querySelector("#cameraPlaceholder").classList.add("hidden");
  } catch {
    document.querySelector("#videoStatus").textContent = "CAMERA UNAVAILABLE";
    document.querySelector("#cameraPlaceholder").innerHTML = "<span>!</span><b>Camera permission was not granted</b><small>You can still complete the written simulation and view feedback.</small>";
    document.querySelector("#videoAction").textContent = "Continue to feedback →";
    document.querySelector("#videoAction").onclick = feedback;
  }
}

function record() {
  const status = document.querySelector("#videoStatus");
  const action = document.querySelector("#videoAction");
  if (!state.stream) return feedback();
  state.recorder = new MediaRecorder(state.stream);
  state.recorder.start();
  status.textContent = "RECORDING";
  action.disabled = true;
  action.textContent = "Recording…";
  state.videoTimer = setInterval(() => {
    state.recordingSeconds -= 1;
    const timer = document.querySelector("#videoTimer");
    if (timer) timer.textContent = formatTime(state.recordingSeconds);
    if (state.recordingSeconds <= 0) {
      clearInterval(state.videoTimer);
      state.recorder.stop();
      state.stream.getTracks().forEach(track => track.stop());
      state.recorded = true;
      feedback();
    }
  }, 1000);
}

function normalizeConcept(value) {
  return String(value || "").toLowerCase().replace(/[^a-z0-9%]+/g, " ").trim();
}

function evaluateAnswer(question, answer) {
  if (question.type === "short") {
    const response = normalizeConcept(answer);
    const criteria = question.rubric.map(criterion => ({ ...criterion, met: criterion.concepts.some(concept => response.includes(normalizeConcept(concept))) }));
    const metCount = criteria.filter(criterion => criterion.met).length;
    return { correct: metCount === criteria.length, earnedPoints: Math.round(question.points * metCount / criteria.length * 10) / 10, criteria, explanation: metCount === criteria.length ? "Your response made all core decision points visible." : "Make the missing decision points explicit in your next response." };
  }
  const correct = question.type === "number" ? Math.abs(answer - question.answer) <= question.tolerance : question.type === "single" ? answer === question.answer : Array.isArray(answer) && answer.length === question.answer.length && answer.every(value => question.answer.includes(value));
  return { correct, earnedPoints: correct ? question.points : 0, criteria: [], explanation: correct ? "Your answer matches the expected result." : explain(question.id) };
}

function isCorrect(question, answer) {
  return evaluateAnswer(question, answer).correct;
}

function feedback() {
  clearInterval(state.timer);
  clearInterval(state.videoTimer);
  if (state.stream) state.stream.getTracks().forEach(track => track.stop());
  const results = activeCase.questions.map(q => ({ q, evaluation: state.evaluations[q.id] || evaluateAnswer(q, state.answers[q.id]), correct: (state.evaluations[q.id] || evaluateAnswer(q, state.answers[q.id])).correct }));
  const total = results.reduce((sum, r) => sum + r.evaluation.earnedPoints, 0);
  const categoryScore = name => {
    const rows = results.filter(r => r.q.category === name);
    const possible = rows.reduce((s, r) => s + r.q.points, 0);
    return possible ? Math.round(rows.reduce((s, r) => s + r.evaluation.earnedPoints, 0) / possible * 100) : null;
  };
  const score = Math.round(total / 90 * 100);
  const skills = Object.fromEntries(["Problem structuring", "Quantitative reasoning", "Data interpretation", "Business judgment", "Synthesis"].map(name => [name, categoryScore(name)]));
  state.lastAttemptId = `attempt-${Date.now()}`;
  saveAttempt({ id: state.lastAttemptId, title: activeCase.title, mode: state.mode === "practice" ? "Practice" : "Timed", score, skills, mistakes: results.filter(result => !result.correct).map(result => ({ category: result.q.category, question: result.q.prompt })), videoRecorded: state.recorded, date: new Date().toLocaleDateString() });
  const verdict = score >= 80 ? ["Strong practice performance", "Your approach is suitably structured and numerically reliable. Tighten the final verbal recommendation with a crisp caveat."] : score >= 60 ? ["Promising, with a clear next focus", "You have the backbone of a solid case approach. Accuracy and evidence selection are the fastest gains before test day."] : ["Build the mechanics before the next full run", "The case is doing its useful job: showing exactly where to drill. Focus first on setup before speed."];
  shell(`<section class="results"><div class="result-hero"><div><p class="eyebrow">PRACTICE FEEDBACK</p><h1>${verdict[0]}</h1><p>${verdict[1]}</p><button class="primary" id="restart">Try again <span>↻</span></button></div><div class="score-ring" style="--score:${score}"><div><b>${score}</b><small>/ 100</small></div></div></div><section class="feedback-grid"><article class="feedback-card performance"><h2>Performance by capability</h2>${[["Problem structuring", categoryScore("Problem structuring")], ["Quantitative reasoning", categoryScore("Quantitative reasoning")], ["Data interpretation", categoryScore("Data interpretation")], ["Business judgment", categoryScore("Business judgment")], ["Synthesis", categoryScore("Synthesis")]].map(([name, value]) => `<div class="capability"><div><span>${name}</span><b>${value}%</b></div><i><em style="width:${value}%"></em></i></div>`).join("")}<div class="video-score"><span>${state.recorded ? "✓ Video recommendation recorded" : "○ Video recommendation skipped"}</span><small>${state.recorded ? "Review your delivery for structure, pace, and eye contact." : "For maximum realism, record the close on your next attempt."}</small></div></article><article class="feedback-card coach"><p class="eyebrow">COACH'S TAKE</p><h2>${score >= 80 ? "You made the right call: test before buying." : "Make the logic visible, not just the arithmetic."}</h2><p>The best supported recommendation is to avoid an immediate acquisition: the IDR 120.8bn value is a ceiling, not a reason to pay it, and the national campaign has a <b>–IDR 0.4bn</b> risk-adjusted value. Pilot demand, close the 5m-bottle capacity gap, then revisit a negotiated bid.</p><div><b>Strong one-minute close:</b><span>“I recommend a pilot rather than acquiring BrewPack now. The deal has a financial ceiling of IDR 120.8bn, but BrewPack cannot fulfill 5m bottles in Year 1 and a national launch is slightly value-negative after marketing spend. Pilot in priority cities, validate demand and cannibalization, and negotiate only once capacity and economics are proven.”</span></div></article></section><section class="feedback-card answer-review"><div><h2>Question-by-question review</h2><p>Use this as your drill list—focus on the underlying setup, not only the final number.</p></div>${results.map((r, i) => `<details ${!r.correct ? "open" : ""}><summary><span class="result-icon ${r.correct ? "right" : "wrong"}">${r.correct ? "✓" : "!"}</span><b>${i + 1}. ${r.q.category}</b><em>${r.correct ? "Correct" : "Review"}</em><i>⌄</i></summary><div class="answer-detail"><p>${r.q.prompt}</p><div><span>Your answer</span><b>${formatAnswer(state.answers[r.q.id])}</b></div><div><span>Expected answer</span><b>${formatAnswer(r.q.answer)}</b></div>${r.correct ? "<small>Good. Carry this same explicit setup into the next question.</small>" : `<small>${explain(r.q.id)}</small>`}</div></details>`).join("")}</section></section>`);
  document.querySelector(".result-hero .eyebrow").textContent = `PRACTICE FEEDBACK · ${activeCase.title.toUpperCase()}`;
  document.querySelectorAll(".answer-review details").forEach((detail, index) => {
    const result = results[index];
    if (result.q.type !== "short") return;
    detail.querySelector("summary em").textContent = result.evaluation.correct ? "Complete" : `${result.evaluation.earnedPoints}/${result.q.points} pts`;
    const rubric = result.evaluation.criteria.map(criterion => `<span class="rubric-chip ${criterion.met ? "met" : "missed"}">${criterion.met ? "✓" : "+"} ${criterion.label}</span>`).join("");
    detail.querySelector(".answer-detail").innerHTML = `<p>${result.q.prompt}</p><div><span>Your response</span><b>${escapeHtml(state.answers[result.q.id])}</b></div><div><span>Rubric score</span><b>${result.evaluation.earnedPoints}/${result.q.points} points</b></div><div class="rubric-review"><span>Evidence review</span><section>${rubric}</section></div><div class="model-answer"><span>Model response</span><p>${result.q.modelAnswer}</p></div>`;
  });
  if (score >= 80) document.querySelector(".coach h2").textContent = activeCase.coachTitle;
  document.querySelector(".coach > p:not(.eyebrow)").textContent = activeCase.coachText;
  document.querySelector(".coach > div span").textContent = `“${activeCase.coachClose}”`;
  document.querySelector("#restart").textContent = "Try another case ↻";
  document.querySelector(".results").insertAdjacentHTML("beforeend", `<section class="video-rubric"><div><p class="eyebrow">VIDEO SELF-REVIEW</p><h2>Score your recommendation before you watch it back.</h2></div><label><input type="checkbox"> Answer first in the opening sentence</label><label><input type="checkbox"> Used two or three case facts</label><label><input type="checkbox"> Named one risk and concrete next step</label><label><input type="checkbox"> Finished inside one minute</label></section>`);
  document.querySelector("#restart").onclick = welcome;
}

function formatAnswer(answer) {
  if (answer === undefined) return "No answer submitted";
  if (Array.isArray(answer)) return answer.join(", ");
  return String(answer);
}

function explain(id) {
  if (activeCase.id === "healthaccess") return { datasets:"Access cases need demand, operational capacity, intervention feasibility, equity, and clinical-quality data together.",target:"500,000 × (80% − 60%) = 100,000 additional timely consultations.",portfolio:"Portfolio A delivers 45,000 + 35,000 + 20,000 = 100,000 consultations at IDR 53bn with no quality decline.",cost:"IDR 53bn ÷ 100,000 = IDR 530,000, or IDR 530.0 thousand, per consultation.",kpis:"Timely access, rural travel time, and clinical-quality follow-up jointly protect access and equity.",score:"100×45% + 90×30% + 90×15% + 70×10% = 91.0.",risks:"Connectivity exclusion, mobile-clinic staffing, and referral follow-up directly threaten equitable, safe access.",decision:"A staged pilot lets the network meet the access target while proving equity and quality safeguards." }[id];
  if (activeCase.id === "circularpack") return { datasets:"A circular-packaging decision needs materials, initiative performance, product quality, consumer behavior, and retailer logistics data.",target:"60m × 30g = 1,800 tonnes of virgin plastic; 25% reduction = 450 tonnes.",portfolio:"Portfolio A reduces 180 + 200 + 90 = 470 tonnes, costs IDR 75bn, retains shelf life, and has 65% collection coverage.",cost:"IDR 75bn ÷ 450 tonnes = IDR 166.7m per tonne.",kpis:"Verified material reduction, collection performance, and food-safety/shelf-life compliance protect the real circularity outcome.",score:"100×40% + 70×25% + 100×20% + 75×15% = 88.75, which rounds to 88.8—not 87.5." ,risks:"Recycled-resin quality, retailer reverse logistics, and consumer returns are the critical delivery risks.",decision:"Scale the proven material changes first; use explicit proof points before expanding returnable packaging." }[id];
  if (activeCase.id === "suryagrid") {
    const climateGuides = {
      datasets: "A climate target is only decision-useful when emissions, initiative economics, reliability, affordability, and delivery constraints are visible together.",
      target: "Required abatement = 2.40m tCO₂e × 35% = 0.84m tCO₂e.",
      portfolio: "Portfolio B abates 0.30 + 0.18 + 0.16 + 0.20 = 0.84m tCO₂e, costs IDR 145bn, has no net reliability decline, and creates a +0.6% tariff impact.",
      cost: "Portfolio B costs IDR 145bn for 0.84m tCO₂e, or IDR 172,619 per tCO₂e = IDR 172.6 thousand per tCO₂e.",
      kpis: "The core non-financial guardrails are emissions progress, service reliability, and affordability for vulnerable customers.",
      score: "Portfolio A's weighted score = 100×50% + 100×25% + 40×15% + 70×10% = 88.0.",
      risks: "Permitting and interconnection, demand-response participation, and replacement-capacity timing directly threaten the portfolio's delivery or reliability outcome.",
      decision: "The strongest answer is conditional: commit to the target and portfolio while gating execution against the reliability, affordability, and readiness constraints.",
    };
    return climateGuides[id];
  }
  if (activeCase.id === "bumibite") {
    const bumiGuides = {
      datasets: "The non-overlapping set is demand and price, unit costs, capacity, standalone economics, and the external co-packing baseline. The other datasets are secondary or off-objective.",
      profit: "Operating profit = revenue − operating costs = 184.0 − 153.6 = IDR 30.4bn.",
      synergy: "Saving = 12.0m packs × (IDR 3,900 − IDR 3,300) = IDR 7.2bn.",
      capacity: "18m maximum capacity minus 8m contractual third-party volume leaves 10m spare capacity. BumiBite needs 12m, leaving a 2m-pack gap.",
      valuation: "Year-1 savings are 10m × IDR 600 = IDR 6.0bn. Annual profit impact is 5.5 + 6.0 = IDR 11.5bn; at 8×, that is IDR 92.0bn.",
      ev: "Expected operating profit is (40% × 18) + (40% × 6) + (20% × −5) = IDR 8.6bn. Less IDR 9bn launch cost gives −IDR 0.4bn.",
      risks: "Prioritize decision-specific risks: e-commerce bundle cannibalization, food safety/brand quality, and protein-powder or packaging-input volatility.",
      decision: "The launch has a slightly negative risk-adjusted value and capacity cannot cover Year-1 demand. A pilot supplies the missing evidence before a binding bid.",
    };
    return bumiGuides[id];
  }
  const guides = {
    datasets: "The key is a non-overlapping set: demand and price, unit costs, capacity, standalone economics, and the external cost baseline. The remaining datasets are secondary or off-objective.",
    profit: "Operating profit = Revenue − operating costs = 230.0 − 194.8 = IDR 35.2bn.",
    synergy: "Saving = 14.0m bottles × (IDR 4,800 − IDR 3,900) = IDR 12.6bn.",
    capacity: "20m maximum capacity minus 11m contractual third-party volume leaves 9m spare capacity. NusaSip needs 14m, leaving a 5m-bottle gap.",
    valuation: "Year-1 savings are 9m × IDR 900 = IDR 8.1bn. Annual profit impact is 7.0 + 8.1 = IDR 15.1bn; at 8×, that is IDR 120.8bn.",
    ev: "Expected operating profit is (50% × 20) + (30% × 8) + (20% × −4) = IDR 11.6bn. Less IDR 12bn campaign cost gives −IDR 0.4bn.",
    risks: "Prioritize decision-specific risks: café cannibalization, food safety/brand quality, and packaging-input volatility.",
    decision: "The national launch has a slightly negative risk-adjusted value, and capacity cannot meet Year-1 demand. A pilot supplies the missing evidence before a binding bid.",
  };
  return guides[id];
}

validateCaseLibrary();
welcome();
