import { Advisor } from "./types";
import { SubscriptionTier } from "./types";

export const DUMMY_ADVISORS: Advisor[] = [
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
      "https://calendar.google.com/calendar/appointments/schedules/AcZssZ2E115m22eq7KUe2jqI0kHzqhmMH0anRW5DBjOAnz6xQ7CRQr7VoAKYFr4bDZ-X4E-G5wxCba1U?gv=true",
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
      "https://calendar.google.com/calendar/appointments/schedules/AcZssZ2E115m22eq7KUe2jqI0kHzqhmMH0anRW5DBjOAnz6xQ7CRQr7VoAKYFr4bDZ-X4E-G5wxCba1U?gv=true",
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
      "https://calendar.google.com/calendar/appointments/schedules/AcZssZ2E115m22eq7KUe2jqI0kHzqhmMH0anRW5DBjOAnz6xQ7CRQr7VoAKYFr4bDZ-X4E-G5wxCba1U?gv=true",
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
      "https://calendar.google.com/calendar/appointments/schedules/AcZssZ2E115m22eq7KUe2jqI0kHzqhmMH0anRW5DBjOAnz6xQ7CRQr7VoAKYFr4bDZ-X4E-G5wxCba1U?gv=true",
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
      "https://calendar.google.com/calendar/appointments/schedules/AcZssZ2E115m22eq7KUe2jqI0kHzqhmMH0anRW5DBjOAnz6xQ7CRQr7VoAKYFr4bDZ-X4E-G5wxCba1U?gv=true",
  },
  {
    id: "william-takyi",
    name: "William Takyi",
    title: "Financial Strategist",
    bio: "William Takyi is a seasoned financial strategist with extensive experience in wealth management, financial planning, and investment analysis. He has held key roles at prestigious institutions, including NatWest and Coutts in the United Kingdom, where he specialized in portfolio management, tax-efficient investments, and comprehensive financial planning for high-net-worth clients. With deep expertise in investments, risk management, and strategic financial planning, William helps clients navigate complex financial landscapes to achieve their goals. At Celerey, he leverages his strategic insights and commitment to client success to provide tailored, actionable solutions. His dedication to safeguarding and growing wealth makes him an invaluable resource, ensuring Celerey users thrive in today’s dynamic financial environment.",
    imageUrl: "/assets/advisors/william.png",
    specialties: [
      "Wealth Management & Investment Strategy",
      "Estate Planning & Legacy Preservation",
      "Corporate Advisory & Financial Structuring",
      "Leadership in Global Financial Institutions",
      "African Market Expertise & Financial Empowerment",
    ],
    googleCalendarUrl:
      "https://calendar.google.com/calendar/appointments/schedules/AcZssZ2E115m22eq7KUe2jqI0kHzqhmMH0anRW5DBjOAnz6xQ7CRQr7VoAKYFr4bDZ-X4E-G5wxCba1U?gv=true",
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
