import { DashboardData } from "./types";
import { Advisor } from "./types";
import { SubscriptionTier } from "./types";

export const DUMMY_ADVISORS: Advisor[] = [
  {
    id: "jude-addo",
    name: "Jude Addo",
    title: "Investment Advisor",
    bio: "Jude Addo is harnessing over a decade of transformative leadership in global finance to redefine wealth management for clients. As the co-founder and CEO of Celerey, he has pioneered the delivery of innovative financial solutions, empowering clients to achieve remarkable success. Jude’s distinguished career includes senior positions at Standard Chartered and J.P. Morgan, where he was celebrated for his groundbreaking credit and asset management strategies that significantly enhanced client portfolios. His remarkable tenure at Standard Chartered culminated in him becoming one of the youngest directors in the bank's history, highlighting his exceptional talent. At JA Group, he drives strategic initiatives across diverse sectors and co-founded Cornerstone Partners to uplift underrepresented founders. His commitment to social impact shines through his contributions to World Vision and his directorships in insurtech and health tech. With his extensive expertise and steadfast dedication to innovation, Jude stands as an invaluable asset for Celerey users, providing the insights and strategies essential for navigating complex financial landscapes and unlocking their full growth potential.",
    imageUrl: "/assets/advisors/jude.png",
    specialties: [
      "Innovative Wealth & Asset Management",
      "Entrepreneurship",
      "Social Impact",
      "Diversity Advocacy",
      "Strategic Leadership",
    ],
    googleCalendarUrl:
      "https://calendar.google.com/calendar/appointments/schedules/AcZssZ1NSb0LgqhxnM3-5z3um2QjRERvxzhBDUQxNJQpxoditZ5cKP8PFu6b06HlllhIYa6M1iHb8FFB?gv=true",
  },
  {
    id: "anna-agyekum",
    name: "Anna Agyekum",
    title: "International Property Consultant",
    bio: "With over 24 years of experience in the real estate industry, Anna Agyekum is a seasoned property consultant and investor with a proven track record in both the UK and Ghana. Specializing in private clients, she is dedicated to helping individuals secure the best properties for both lifestyle and investment purposes. Her expertise extends beyond the UK and Ghana, with a strong focus on assisting the diaspora in safely investing in Ghana, South Africa, and East Africa. Passionate about Africa’s potential, Anna is committed to creating opportunities for sustainable investment and empowering her clients to make informed decisions in some of the continent’s most dynamic markets. With deep knowledge of both international and African property markets, Anna delivers bespoke solutions tailored to her client’s needs, ensuring exceptional results and long-term value.",
    imageUrl: "/assets/advisors/anna.png",
    specialties: [
      "Extensive Real Estate Experience",
      "Private Client Specialist",
      "Diaspora Investment Expertise",
      "Passion for Sustainable Investment",
      "Tailored Property Solutions",
    ],
    googleCalendarUrl:
      "https://calendar.google.com/calendar/appointments/schedules/AcZssZ3OGJ0mxiGQbTj8Xn_TxlPUGW-EUQrF6IUY8VvvSCPrp8pKFJ1j9QeRLoTuzvRsWxJfQTX2XVrQ?gv=true",
  },
  {
    id: "christian-hamberger",
    name: "Christian-Hamberger",
    title: "Wealth Management Strategist",
    bio: "Christian is a highly accomplished banking professional with over 25 years of leadership experience across major financial hubs, including Frankfurt, London, Johannesburg, and Zurich. He began his career in investment banking at ABN Amro in London and has since held key roles at Merrill Lynch, Standard Chartered Bank, and Credit Suisse. Notably, Christian led Standard Chartered's Financial Institutions Capital Markets business across Sub-Saharan Africa and served as a senior banker managing European banking relationships at Credit Suisse. Now the COO and Senior Client Director at JA Group, Christian leverages his extensive expertise in strategic initiatives and wealth management, serving as a key advisor for Celerey.",
    imageUrl: "/assets/advisors/christian.png",
    specialties: [
      "Banking & Financial Leadership",
      "Investment Banking Expertise",
      "Capital Markets & Institutional Finance",
      "High-Net-Worth Client Advisory",
      "Global Experience Across Major Financial Hubs",
    ],
    googleCalendarUrl:
      "https://calendar.google.com/calendar/appointments/schedules/AcZssZ2v9lCl7pADeFvv_KNsVjAiAap2AS5pZtgnGlYSL9i77J3rPgvRTwewizpohdaGHifuTvdOW-f7?gv=true",
  },
  {
    id: "francis-gill",
    name: "Francis Gill",
    title: "Wealth Strategy Expert",
    bio: "Francis Gill is a seasoned financial adviser and CEO of Humboldt Financial, a leading financial advisory firm in London. With extensive expertise in tax planning—including income, capital gains, and inheritance—alongside retirement planning and tax-efficient investments, Francis is known for delivering tailored, practical solutions that help clients secure their financial futures. Renowned for his meticulous attention to detail and client-first approach, Francis has worked with a diverse range of professionals, including solicitors, banking executives, entrepreneurs, and business owners. He takes pride in simplifying complex financial matters, providing clear, actionable guidance that builds trust and delivers results. Whether navigating tax complexities or developing long-term wealth preservation strategies, Francis is deeply committed to understanding each client’s unique priorities and equipping them with the tools and insights needed to achieve financial clarity and peace of mind.",
    imageUrl: "/assets/advisors/francis.png",
    specialties: [
      "Expertise in Tax Planning & Wealth Preservation",
      "Proven Track Record in Financial Advisory Leadership",
      "Retirement & Investment Strategy Specialist",
      "Strong Analytical & Problem-Solving Skills",
      "Client-Centric & Detail-Oriented Approach",
    ],
    googleCalendarUrl:
      "https://calendar.google.com/calendar/appointments/schedules/AcZssZ2pLTROXYZVJ97v_hFME9FOTeBU7Ly1yiA4pk-T0JEYatthGRGVSX845sXuPRCgoijNvgr-zxGn?gv=true",
  },
  {
    id: "jerran-whyte",
    name: "Jerran Whyte",
    title: "Wealth Management Expert",
    bio: "Jerran Whyte is a highly accomplished wealth management expert with extensive experience in financial advisory, planning, and investment management. He is the Founder and Managing Director of Belvedere Wealth Management in London and Belvedere Group in Windhoek, Namibia. Both firms are fully regulated, providing bespoke wealth management solutions to clients worldwide. With a strong foundation in financial advisory and planning, Jerran specializes in pension advice, tax mitigation strategies, estate planning, and investment portfolio management. His expertise spans both personal and corporate finance, ensuring tailored solutions that align with each client’s unique needs.",
    imageUrl: "/assets/advisors/jerran.png",
    specialties: [
      "Wealth Management & Investment Expertise",
      "Pension Advice & Estate Planning",
      "Tax Mitigation Strategies",
      "Personal & Corporate Finance Solutions",
      "Global Wealth Management Experience",
    ],
    googleCalendarUrl:
      "https://calendar.google.com/calendar/appointments/schedules/AcZssZ2DaRiuCixhpBA6CvB5UZscDmuV4PqqevU4i2OlStZ3lXoZX3Nzz1Xd0KpOYrPhh0eGTEGL6DD2?gv=true",
  },
  {
    id: "chris-curtis",
    name: "Chris Curtis",
    title: "Wealth Consultant & Investment Specialist",
    bio: "Chris is a seasoned Wealth Consultant with over 30 years of experience in financial services, specializing in investments, high-value mortgages, pensions, and sustainable investments for private clients, corporations, and trustees. He has held senior roles at Kleinwort Benson, Close Asset Management, and Standard Chartered. Chris is a Chartered Member of the Chartered Institute for Securities & Investments and is accredited in both investment and mortgage advice. His career spans Jersey, Gibraltar, and Spain, where he successfully built a mortgage brokering business.",
    imageUrl: "/assets/advisors/chris.png",
    specialties: [
      "Extensive Financial Services Experience",
      "Expertise in Investments and High-Value Mortgages",
      "Chartered Member of the Chartered Institute for Securities & Investments",
      "Proven Leadership in Senior Roles at Top Financial Institutions",
      "International Experience in Jersey, Gibraltar, and Spain",
    ],
    googleCalendarUrl:
      "https://calendar.google.com/calendar/appointments/schedules/AcZssZ1cCBHGlK53J4evIpQBHyWn6YYfDuBU8_XwcaEY2PgBg5WDOxQsVrt_ub7yoeakzW-Te30_RD2W?gv=true",
  },
  {
    id: "william-takyi",
    name: "William Takyi",
    title: "Financial Strategist",
    bio: "William Takyi is a seasoned financial strategist with extensive experience in wealth management, financial planning, and investment analysis. He has held key roles at prestigious institutions, including NatWest and Coutts in the United Kingdom, where he specialized in portfolio management, tax-efficient investments, and comprehensive financial planning for high-net-worth clients. With deep expertise in investments, risk management, and strategic financial planning, William helps clients navigate complex financial landscapes to achieve their goals. At Celerey, he leverages his strategic insights and commitment to client success to provide tailored, actionable solutions. His dedication to safeguarding and growing wealth makes him an invaluable resource, ensuring Celerey users thrive in today’s dynamic financial environment.",
    imageUrl: "/assets/advisors/william.png",
    specialties: [
      "Wealth Management Expertise",
      "Investment & Risk Strategy",
      "High-Net-Worth Client Advisory",
      "Tax-Efficient Financial Plannings",
      "Strategic Portfolio Optimization",
    ],
    googleCalendarUrl:
      "https://calendar.google.com/calendar/appointments/schedules/AcZssZ3qL1AKAiTz1_OHBFYgn2Ijx0waFxyT9NI3wgl37xPlsTnog7wddYY-Bxg7cTjV7IWlZVoJB0AK?gv=true",
  },
  {
    id: "dele-adesani",
    name: "Dele Adesani",
    title: "Investment Strategist",
    bio: "Dele Adesina has spent over 20 years guiding High Net Worth Individuals (HNWIs) to financial success. As a Chartered Wealth Manager accredited by the UK’s Chartered Institute for Securities & Investment (CISI), he has held leadership roles at prestigious institutions like Coutts & Co, Royal Bank of Canada, and Standard Chartered Private Bank London.As the founder of Hekima International Private Office and co-founder of Carrick Wealth Nigeria, Dele specializes in investment strategy, estate planning, and corporate advisory, empowering African HNWIs with tailored financial solutions. A graduate of the London School of Economics (LSE) and an Old Alleynian, Dele combines deep expertise with a visionary approach to help clients achieve lasting financial security and freedom.",
    imageUrl: "/assets/advisors/dele.png",
    specialties: [
      "Wealth Management & Investment Strategy",
      "Estate Planning & Legacy Preservation",
      "Corporate Advisory & Financial Structuring",
      "Leadership in Global Financial Institutions",
      "African Market Expertise & Financial Empowerment",
    ],
    googleCalendarUrl:
      "https://calendar.google.com/calendar/appointments/schedules/AcZssZ3RKampOqYj57m0ZP0FWSMT32Gwci01PAgI8rA_ofE3UsAjHtAu27LyWK8ZuboUp3cVM6Cn7JmK?gv=true",
  },
];

export const riskCategories = {
  high: [
    "Public Shares Of listed Companies",
    "Private Equity (Growth Stage Businesses)",
    "Venture Capital (Early Stage Business)",
    "Alternative Assets Such As Crypto",
    "Hedge Funds",
  ],
  medium: [
    "Publicly Listed Large Companies",
    "Mutual Funds (Equity Or Bonds)",
    "Listed Collective Investment Schemes",
    "Low Volatility Commodities",
    "Structured Products",
  ],
  low: [
    "US Government Securities",
    "Other US Government Securities",
    "Investment Grade Corporate Bonds",
    "Listed Notes Such As S&P 500",
    "Developed Prime Real Estate",
    "Cash Equivalents",
  ],
};

export const subscriptionTiers: SubscriptionTier[] = [
  {
    id: "standard",
    name: "Standard",
    price: 299,
    pricePerMonth: Math.round(299 / 12),
    interval: "yearly",
    description:
      "Expert guidance and smart financial management for individuals starting their wealth journey.",
    idealCustomer:
      "Ideal for individuals who want expert guidance and smart, data-driven financial management with occasional expert check-ins.",
    intro: "Standard plan includes:",
    features: [
      "Celerey financial dashboard with personalized financial insights and goal tracking",
      "Two (2) private sessions per year with a Celerey wealth advisor",
      "Expert financial content on personal finance, market reports, research and other educational resources",
      "Discounted access to Celerey's community events, curated services and key offerings",
    ],
    buttonText: "Upgrade to Standard",
    isCurrentPlan: true,
  },
  {
    id: "pro",
    name: "Pro",
    price: 1499,
    pricePerMonth: Math.round(1499 / 12),
    interval: "yearly",
    description:
      "Advanced features and personalized guidance for active wealth builders.",
    idealCustomer:
      "Designed for wealth developers who are actively growing and refining their wealth strategy. Celerey Pro provides deeper expert engagement, proactive strategy sessions and goal execution support.",
    intro: "All Celerey Standard features plus:",
    features: [
      "Celerey financial dashboard with advanced investment analyses and insights tailored to specific financial profile",
      "Four (4) private advisory sessions per year with fully loaded flexibility",
      "Priority access to Celerey's community events, curated financial workshops, webinars and other services",
      "Complimentary admittance to Celerey's high-net-worth networking events",
      "Access to emerging investment opportunities across markets",
    ],
    buttonText: "Upgrade to Pro",
    isPopular: true,
  },
  {
    id: "elite",
    name: "Elite",
    price: 4999,
    pricePerMonth: Math.round(4999 / 12),
    interval: "yearly",
    description:
      "Premium service with exclusive benefits for high-net-worth individuals.",
    idealCustomer:
      "Perfect for high-net-worth individuals who require elite advisory, premium networking, and hands-on financial strategy services.",
    intro: "All Celerey Pro features plus:",
    features: [
      "Five (5) private fully loaded advisory sessions per year with top-tier financial experts with in-person optionality",
      "Exclusive invitations to Celerey's high-net-worth networking events with discounted matching services",
      "VIP insights into emerging investment opportunities and private markets",
      "Dedicated concierge financial advisory support",
    ],
    buttonText: "Upgrade to Elite",
  },
];

export const DUMMY_DASHBOARD_DATA: DashboardData = {
  netWorth: { value: 23765970, currency: "USD" },
  balance: { value: 3875524, currency: "USD" },
  income: { value: 4736559, currency: "USD" },
  expenses: { value: 925629, currency: "USD" },
  savings: { value: 16780273, currency: "USD" },
  financialPlans: [
    {
      id: "1",
      name: "Savings Plan",
      progress: 72,
      currentAmount: 21234.35,
      targetAmount: 30000,
      durationStart: "2024-04-01",
      durationEnd: "2025-04-01",
      goalDuration: 12,
      durationLeft: 3,
    },
    {
      id: "2",
      name: "Retirement Fund",
      progress: 18,
      currentAmount: 405253,
      targetAmount: 2435453,
      durationStart: "2024-07-01",
      durationEnd: "2025-03-01",
      goalDuration: 18,
      durationLeft: 13,
    },
  ],
  emergencyPlans: [
    {
      name: "Emergency Fund",
      progress: 40,
      durationStart: "2024-05-01",
      durationEnd: "2025-05-01",
      goalDuration: 14,
      durationLeft: 4,
      targetDuration: 10,
      duration: 5,
    },
  ],
  assetAllocation: [
    { category: "Real Estate", amount: 25363.94, percentage: 31.75 },
    { category: "Public Securities", amount: 23532.75, percentage: 29.45 },
    { category: "Private Securities", amount: 21556.32, percentage: 27 },
    { category: "Cash", amount: 9426.35, percentage: 11.8 },
  ],
  geographicalSpread: [
    {
      country: "United States",
      amount: 45000,
      coordinates: [-95.7129, 37.0902],
    },
    { country: "China", amount: 34963, coordinates: [104.1954, 35.8617] },
  ],
  expensesData: [
    {
      category: "Home",
      amount: 33472.81,
      percentage: 18,
      color: "#1B1856",
    },
    {
      category: "Healthcare",
      amount: 25353.94,
      percentage: 8,
      color: "#D3D3D3",
    },
    {
      category: "Education",
      amount: 14353.89,
      percentage: 23,
      color: "#FF69B4",
    },
    {
      category: "Travel",
      amount: 23253.43,
      percentage: 15,
      color: "#E15B2D",
    },
    {
      category: "Giving",
      amount: 19343.65,
      percentage: 13,
      color: "#383396",
    },
    {
      category: "Childcare",
      amount: 14353.89,
      percentage: 20,
      color: "#8BA78D",
    },
  ],
  riskProfile: {
    riskAttitude: "Somewhat Aggressive",
    investmentExperience: "Advanced",
    financialKnowledge: "Intermediate",
    description:
      "You are a somewhat aggressive risk taker with an advanced investment experience. Your financial knowledge is intermediate. This means you have a solid grasp of finance.",
  },
};
