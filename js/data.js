/* ==========================================================================
   SITE CONTENT — edit this file to update the site. script.js only reads
   from the two arrays below; you should never need to touch script.js or
   index.html to add a new project or a new paper to the Research section.
   ========================================================================== */

/* --------------------------------------------------------------------------
   PAPERS  (the "Research" section — your publications list)

   Add a new paper by copying one of the objects below. Order is up to
   you — they render in array order (currently newest-first).

   Fields:
     id     — unique slug, used internally (letters, numbers, dashes)
     type   — short label shown as a tag, e.g. "Journal Article",
              "Conference Abstract", "Preprint", "Working Paper"
     title  — full paper title
     venue  — journal / conference / publisher name (leave null if unknown)
     date   — display string, e.g. "Jun 2022"
     doi    — OPTIONAL: DOI string, shown as-is (no need to include the
              https://doi.org/ prefix)
     link   — OPTIONAL: URL to the full text / PDF / publisher page. If
              omitted, the entry displays without a clickable link.
-------------------------------------------------------------------------- */
const PAPERS = [
  {
    id: "ml-in-production",
    type: "Journal Article",
    title: "Machine Learning in Production: From Experimented ML Model to System",
    venue: "ScienceOpen Preprints",
    date: "Jun 2022",
    doi: "10.14293/S2199-1006.1.SOR-.PPKHXND.v1",
    link: "https://www.opastpublishers.com/open-access-articles/machine-learning-in-production-from-experimented-ml-model-to-system.pdf",
  },
  {
    id: "adversarial-vulnerability-cv",
    type: "Conference Abstract",
    title: "Vulnerability of Neural Networks to Adversarial Attack and Defenses in Computer Vision",
    venue: "IEEE Computer Society — Bangladesh Chapter",
    date: "Nov 2021",
    doi: null,
    link: null,
  },
  {
    id: "data-centric-ml-production",
    type: "Journal Article",
    title: "A Data-Centric Approach to Improve Machine Learning Model's Performance in Production",
    venue: "International Journal of Engineering and Advanced Technology (IJEAT)",
    date: "Oct 2021",
    doi: "10.35940/ijeat.a3201.1011121",
    link: "https://www.ijeat.org/portfolio-item/a32011011121/",
  },
  {
    id: "ann-basic-understanding",
    type: "Journal Article",
    title: "Research Study on Basic Understanding of Artificial Neural Networks",
    venue: null,
    date: "Nov 2019",
    doi: null,
    link: "https://computerresearch.org/index.php/computer/article/view/1885",
  },
];

/* --------------------------------------------------------------------------
   PROJECTS  (the "Projects" section)

   Kept to 3 curated projects by design — add a new one by copying one of
   the objects below (or pulling one back in from the commented-out block
   further down, which has 5 more ready to go).

   Fields:
     id        — unique slug
     title     — project title
     category  — short label shown as a tag
     summary   — one-line description shown in the card
     metrics   — array of {value, label} shown in the case-study pop-up
     role      — your role + duration, shown under the title in the pop-up
     problem, approach — paragraph strings
     results   — array of bullet strings
     stack     — array of tool/technology names
     links     — { caseStudy: "url", code: "url" } — either is optional
-------------------------------------------------------------------------- */
const PROJECTS = [
  {
    id: "rag-pharma",
    title: "Multi-Agent RAG Chatbot for Pharmaceutical Supply Chain",
    category: "AI / ML",
    summary: "A six-agent hierarchical RAG system for regulated, temperature-sensitive pharma logistics decisions.",
    role: "Researcher — Data Science & AI, Data Science Lab, Montclair State University",
    metrics: [
      { value: "97%", label: "retrieval accuracy" },
      { value: "94%", label: "faster query response" },
      { value: "$4.2M", label: "est. annual savings" },
    ],
    problem: "The pharmaceutical industry struggles to manage highly regulated, temperature-sensitive products across complex global distribution networks. Traditional retrieval systems couldn't handle the multifaceted nature of supply-chain decisions, limiting how fast decision-makers could act.",
    approach: "Designed a hierarchical multi-agent architecture in LangChain and LangGraph. Six specialized agents — Manager, Router, Search, Page, ReAct, and Tool — coordinate through an orchestration pattern, using hybrid retrieval (BM25 + dense vector embeddings) across 15+ pharmaceutical databases. Deployed on FAISS, OpenAI, Flask, Docker, and AWS.",
    results: [
      "97% retrieval accuracy, up from a 72% baseline",
      "95% web-integration success (+30 points over baseline)",
      "40–60% faster decision-making",
      "Query response time cut from 3.2 minutes to 12 seconds (94% reduction)",
      "99.3% counterfeit-detection accuracy; compliance monitoring across 150+ requirements in 27 countries",
      "76% reduction in expired product; 32% better demand forecasting across 1,200+ SKUs",
      "$4.2M in estimated annual savings; 78% fewer quality incidents and medication errors",
    ],
    stack: ["LangChain", "LangGraph", "FAISS", "OpenAI", "Python", "Flask", "Docker", "AWS"],
    links: {
      caseStudy: "https://pritom02bh.github.io/project-supply-chain.html",
      code: "https://github.com/pritom02bh/pharma_ai_multi_agentic_rag_system",
    },
  },
  {
    id: "intellistock",
    title: "IntelliStock — Demand Forecasting & Inventory Optimization",
    category: "AI / ML",
    summary: "Ensemble forecasting (ARIMA + XGBoost + Prophet) with EOQ-based inventory optimization for a Fortune 1000 retailer.",
    role: "Lead Data Scientist & Supply Chain Consultant · 3-month build, 6-month rollout",
    metrics: [
      { value: "9.2%", label: "MAPE, down from 18.5%" },
      { value: "15%", label: "lower carrying cost" },
      { value: "$3.2M", label: "annual savings" },
    ],
    problem: "A Fortune 1000 retail organization ($5B+ revenue) couldn't account for seasonality, promotions, and market swings with traditional forecasting, resulting in alternating stockouts and excess inventory.",
    approach: "Built an ensemble ML platform combining ARIMA, XGBoost regression, and Prophet, weighted by historical accuracy, with Economic Order Quantity optimization and dynamic safety-stock calculations. Added seasonal and promotional feature engineering, automated retraining pipelines, ERP integration, and a Streamlit + Plotly dashboard.",
    results: [
      "Forecast error (MAPE) cut from 18.5% to 9.2% (+50.3% improvement)",
      "15% reduction in inventory carrying costs",
      "Stockouts down from 4.2% to 1.8% of SKUs (-57.1%)",
      "Forecast generation time cut from 3–5 days to 4 hours (-95%)",
      "Approximately $3.2M in annual savings",
    ],
    stack: ["Python", "ARIMA", "XGBoost", "Prophet", "Streamlit", "Plotly", "Pandas", "NumPy"],
    links: {
      caseStudy: "https://pritom02bh.github.io/project-intellistock.html",
      code: "https://github.com/pritom02bh/intelligent-demand-forecasting-inventory-optimization",
    },
  },
  {
    id: "predictive-healthcare",
    title: "Predictive Healthcare — Risk Stratification",
    category: "AI / ML",
    summary: "Ensemble ML models flagging at-risk patients before complications occur, across 15,000+ patient records.",
    role: "Senior ML Engineer & Data Scientist · 7-month project",
    metrics: [
      { value: "92%", label: "prediction accuracy" },
      { value: "0.89", label: "AUC-ROC" },
      { value: "40%", label: "fewer missed high-risk cases" },
    ],
    problem: "Traditional risk-scoring systems in healthcare are too simple to process complex patient data, so at-risk patients are often missed until it's too late to intervene.",
    approach: "Built an ensemble of XGBoost, Random Forest, and Gradient Boosting with 150+ engineered clinical variables, automated hyperparameter tuning, and rigorous cross-validation, developed in collaboration with clinical staff.",
    results: [
      "92% prediction accuracy for high-risk identification",
      "0.89 AUC-ROC score",
      "40% fewer missed high-risk cases",
      "30% improvement in early-intervention rate",
      "25% shorter average length of stay",
      "Analyzed 15,000+ patient records",
    ],
    stack: ["Python", "TensorFlow", "XGBoost", "Scikit-learn", "Pandas", "Matplotlib"],
    links: {
      caseStudy: "https://pritom02bh.github.io/project-predictive-healthcare.html",
    },
  },
];

/* --------------------------------------------------------------------------
   MORE PROJECTS (not currently shown)

   Five more case studies, kept here so they're one copy-paste away from
   being back on the site. To bring one back: cut its object out of this
   comment block and paste it into the PROJECTS array above.
-------------------------------------------------------------------------- */
/*
  {
    id: "last-mile",
    title: "Last-Mile Delivery + Weather Intelligence",
    category: "AI / ML",
    summary: "Weather-adaptive route optimization for a 500+ vehicle regional delivery fleet.",
    role: "Lead Data Scientist & Logistics Optimization Specialist · 4-month build + 3-month rollout",
    metrics: [
      { value: "32%", label: "routing efficiency" },
      { value: "25%", label: "cost reduction" },
      { value: "28%", label: "time saved" },
    ],
    problem: "Last-mile delivery drove up to 53% of total shipping cost while being the least efficient leg of the chain. A 500+ vehicle regional fleet couldn't adapt routing to real-time traffic and weather disruptions.",
    approach: "Combined ML-driven dynamic route generation, live traffic data (Google Maps API), and predictive weather analytics with genetic algorithms and linear programming for resource allocation. TensorFlow powered traffic prediction models; OR-Tools handled route optimization.",
    results: [
      "32% improvement in route optimization efficiency",
      "25% operational cost reduction",
      "28% delivery time savings",
      "35% increase in customer satisfaction",
      "45% reduction in weather-related delays",
      "22% decrease in carbon emissions",
    ],
    stack: ["Python", "TensorFlow", "OR-Tools", "Google Maps API", "Weather API", "Flask", "React", "PostgreSQL"],
    links: {
      caseStudy: "https://pritom02bh.github.io/project-last-mile-delivery.html",
    },
  },
  {
    id: "sales-analytics",
    title: "Sales Analytics Dashboard",
    category: "Analytics / BI",
    summary: "Five interconnected Power BI dashboards unifying CRM, ERP, and market data for a multi-channel retailer.",
    role: "Senior Data Analyst & BI Developer · 4-month implementation",
    metrics: [
      { value: "35%", label: "faster decisions" },
      { value: "25%", label: "revenue growth" },
      { value: "98%", label: "data accuracy" },
    ],
    problem: "Sales data was fragmented across systems, reporting was manual, and teams lacked real-time visibility into performance trends.",
    approach: "Architected five interconnected Power BI dashboards integrating CRM, ERP, and external market data, with automated ETL pipelines, ML-based forecasting, role-based mobile-optimized views, and automated alerting.",
    results: [
      "Decision-making sped up from 5–7 days to real time (35% faster)",
      "Weekly reporting time cut from 20 to 2 hours (-50%)",
      "Revenue increased 25%",
      "Data accuracy improved from 85% to 98%",
      "95% user adoption rate",
    ],
    stack: ["Power BI", "SQL Server", "DAX", "Python", "Pandas", "Excel", "ETL"],
    links: {
      caseStudy: "https://pritom02bh.github.io/project-sales-analytics.html",
    },
  },
  {
    id: "sales-forecasting-pm",
    title: "Sales Forecasting & Workforce Scheduling Platform",
    category: "Product",
    summary: "End-to-end product initiative unifying forecasting automation and workforce scheduling across five departments.",
    role: "Product Manager & Product Owner",
    metrics: [
      { value: "500+", label: "users impacted" },
      { value: "40%", label: "efficiency gain" },
      { value: "95%", label: "adoption in 3 months" },
    ],
    problem: "Five departments relied on manual forecasting and inefficient scheduling, causing resource misallocation and slower decision-making.",
    approach: "Ran a four-phase product cycle — Discovery (stakeholder interviews, analytics review), Strategy & Design (roadmap, user stories, wireframes), Agile Development (sprints with UAT), and Launch & Tracking (phased rollout, training, adoption monitoring).",
    results: [
      "40% operational efficiency gain for 500+ users",
      "95% user adoption within three months",
      "60% fewer manual tasks",
      "85% user satisfaction score",
      "50% faster feature delivery cycle",
      "30% increase in user engagement",
    ],
    stack: ["Agile / Scrum", "JIRA", "Confluence", "User analytics", "UX / UI collaboration"],
    links: {
      caseStudy: "https://pritom02bh.github.io/project-agile.html",
      code: "https://github.com/pritom02bh/weekly_sales_forecasting",
    },
  },
  {
    id: "customer-churn",
    title: "Customer Churn Analytics",
    category: "Analytics / BI",
    summary: "Root-cause analysis of telecom churn across 50,000+ service interactions, translated into retention strategy.",
    role: "Senior Data Analyst & Customer Experience Specialist · 4-month initiative",
    metrics: [
      { value: "50k+", label: "service records analyzed" },
      { value: "4", label: "root causes identified" },
      { value: "8", label: "strategies delivered" },
    ],
    problem: "A telecommunications organization faced rising churn with no clear picture of what was driving customers away, beyond broad service-quality complaints.",
    approach: "Mined 50,000+ service calls, customer surveys, contracts, and usage data; segmented by demographics and usage patterns; categorized recurring issues through statistical methods; synthesized findings for executive stakeholders.",
    results: [
      "Identified 4 primary churn drivers: competitive pressure, service-quality gaps, contract inflexibility, and unlimited-data plan limitations",
      "Delivered 8 strategic recommendations spanning support, contract flexibility, plan design, and proactive monitoring",
    ],
    stack: ["Python", "Pandas", "Matplotlib", "Seaborn", "SQL", "Power BI", "Statistical Analysis"],
    links: {
      caseStudy: "https://pritom02bh.github.io/project-customer-churn.html",
    },
  },
  {
    id: "healthcare-analytics",
    title: "Healthcare Analytics",
    category: "Analytics / BI",
    summary: "Operational and clinical KPI dashboards across hospital workflows, surfacing bottlenecks for care teams and administrators.",
    role: null,
    metrics: [],
    problem: null,
    approach: "Built operational and clinical KPI dashboards spanning hospital workflows to give care teams and administrators shared visibility into performance.",
    results: [],
    stack: ["Analytics", "Healthcare", "Dashboards"],
    links: {
      caseStudy: "https://pritom02bh.github.io/project-healthcare-analytics.html",
    },
  },
*/
