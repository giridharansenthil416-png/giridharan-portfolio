/**
 * ---------------------------------------------------------------------------
 * SITE CONTENT — GIRIDHARAN S (VLSI & SEMICONDUCTOR ENGINEERING)
 * ---------------------------------------------------------------------------
 * All copy and structured data for the portfolio.
 * ---------------------------------------------------------------------------
 */

export const site = {
  /** Shown letter-by-letter in the hero. */
  displayWord: 'PORTFOLIO',
  /** Index of the character in `displayWord` that the face/chip illustration replaces. */
  faceLetterIndex: 5, // P-O-R-T-F-[O]-L-I-O

  eyebrow: 'VLSI / SEMICONDUCTOR ENGINEERING',
  year: '2026',

  firstName: 'GIRIDHARAN',
  lastName: 'S',
  /**
   * The signature form the hero reveals as the visitor starts scrolling.
   */
  signatureName: 'GIRIDHARAN S',

  /**
   * Status and quick CTA.
   */
  connect: {
    status: 'is available for VLSI & Semiconductor design opportunities',
    cta: "Let's connect",
    href: '#contact',
  },

  intro: {
    heading: 'ABOUT ME',
    lede: "Hi, I'm GIRIDHARAN S.",
    paragraphs: [
      'I am a 3rd-year B.E. student in Electronic Engineering (VLSI Design and Technology) at Rajalakshmi Institute of Technology, building practical skills across RTL design, synthesis, physical design, verification and semiconductor implementation flows.',
      'My strongest project experience includes Verilog RTL and Synopsys Fusion Compiler based implementation work, supported by VCS/Verdi simulation and SDC timing constraints.',
      'Focused on hardware architecture, digital design, and taking complex circuits from RTL to silicon.',
    ],
    terminal: {
      identity: 'GIRIDHARAN S',
      domain: 'VLSI / SEMICONDUCTOR',
      year: '3rd Year (B.E. VLSI Design)',
      location: 'Chennai, Tamil Nadu, India',
      goal: 'VLSI / Semiconductor Engineering Career',
    },
    stats: [
      { value: '8.00', label: 'CGPA' },
      { value: '2028', label: 'GRADUATION' },
      { value: '2', label: 'FEATURED PROJECTS' },
    ],
  },

  education: {
    heading: 'EDUCATION',
    items: [
      {
        degree: 'B.E. Electronic Engineering',
        specialization: 'VLSI Design and Technology',
        detail: 'Rajalakshmi Institute of Technology • Autonomous',
        grade: 'CGPA: 8.00',
        period: '2024 – 2028',
      },
      {
        degree: 'Higher Secondary — 12th',
        specialization: '',
        detail: 'Bhagavan Hr. Sec. School',
        grade: '85%',
        period: '2024',
      },
      {
        degree: 'Secondary — 10th',
        specialization: '',
        detail: 'Bhagavan Hr. Sec. School',
        grade: '90%',
        period: '2022',
      },
    ],
  },

  techStack: {
    heading: 'TECHNICAL STACK',
    categories: [
      {
        title: 'HDL & DIGITAL',
        skills: ['Verilog', 'SystemVerilog (Learning)', 'RTL Design', 'Digital Electronics', 'Computer Architecture (Learning)'],
      },
      {
        title: 'VLSI & PHYSICAL DESIGN',
        skills: ['Synthesis', 'Physical Design (Intermediate)', 'DFT (Learning)', 'STA (Learning)', 'Design Verification (Learning)'],
      },
      {
        title: 'EDA TOOLS',
        skills: ['Synopsys Fusion Compiler', 'Cadence', 'Vivado', 'Microwind', 'Tessent (Learning)'],
      },
      {
        title: 'WORKFLOW & PROGRAMMING',
        skills: ['VCS', 'Verdi', 'SDC Constraints', 'Linux', 'VS Code', 'Python'],
      },
    ],
  },

  skills: {
    heading: 'KEY TOOLS & TECHNOLOGIES',
    items: [
      { label: 'Synopsys', short: 'Syn', src: '/assets/skills/synopsys.png', scale: 1 },
      { label: 'Cadence', short: 'Cad', src: '/assets/skills/cadence.png', scale: 1 },
      { label: 'Fusion Compiler', short: 'FC', src: '/assets/skills/fusion-compiler.png', scale: 1 },
      { label: 'AMD Vivado', short: 'Viv', src: '/assets/skills/vivado.png', scale: 1 },
      { label: 'Verilog HDL', short: 'Ver', src: '/assets/skills/verilog.png', scale: 1 },
      { label: 'Linux / EDA', short: 'Lin', src: '/assets/skills/linux.png', scale: 1 },
      { label: 'Python', short: 'Py', src: '/assets/skills/python.png', scale: 1 },
    ] as { label: string; short: string; src: string | null; scale: number }[],
  },

  projects: {
    heading: 'FEATURED PROJECTS',
    items: [
      {
        num: 'PROJECT / 01',
        title: '8-BIT ALU',
        subtitle: 'Arithmetic & Logic Unit Implementation',
        description:
          'Verilog RTL implementation of an 8-bit arithmetic and logic unit, followed by simulation/debug and physical implementation using Synopsys Fusion Compiler.',
        flow: ['VERILOG', 'VCS', 'VERDI', 'SDC', 'FUSION COMPILER'],
        evidence: '/assets/alu/01_alu_schematic.jpg',
        evidenceLabel: 'OPEN SCHEMATIC EVIDENCE ↗',
        preview: '/assets/alu/01_alu_schematic.jpg',
        gallery: [
          '/assets/alu/01_alu_schematic.jpg',
          '/assets/alu/02_fc_layout_view.jpg',
          '/assets/alu/06_fc_layout_optimized.jpg',
        ],
        tags: ['Verilog', 'RTL Design', 'Fusion Compiler', 'VCS/Verdi', 'ASIC'],
      },
      {
        num: 'PROJECT / 02',
        title: '8-BIT CPU',
        subtitle: 'Single-Core Architecture & Layout',
        description:
          'Verilog CPU design taken through simulation/debug and Synopsys Fusion Compiler physical implementation. The project includes physical-design evidence and an OASIS layout artifact.',
        flow: ['VERILOG', 'VCS', 'VERDI', 'SDC', 'FUSION COMPILER'],
        evidence: '/assets/cpu/01_cpu_schematic.jpg',
        evidenceLabel: 'OPEN SCHEMATIC EVIDENCE ↗',
        preview: '/assets/cpu/02_fc_cpu_layout.jpg',
        oasis: '/assets/cpu/simple_single_core_cpu.oasis',
        gallery: [
          '/assets/cpu/01_cpu_schematic.jpg',
          '/assets/cpu/02_fc_cpu_layout.jpg',
          '/assets/cpu/07_fc_cpu_routing_view.jpg',
          '/assets/cpu/08_fc_cpu_final_view.jpg',
        ],
        tags: ['CPU Architecture', 'Verilog', 'Physical Design', 'OASIS Layout', 'SDC'],
      },
    ],
  },

  experience: {
    heading: 'INTERNSHIP EXPERIENCE',
    items: [
      {
        period: 'Virtual Internship',
        role: 'Python & Programming Track',
        company: 'Infosys Springboard',
        badge: 'PYTHON',
        description:
          'Completed a virtual internship through Infosys Springboard with a focus on Python and programming-oriented learning.',
        tags: ['Python', 'Programming', 'Virtual Internship', 'Infosys Springboard'],
      },
    ],
  },

  activities: {
    heading: 'WORKSHOPS & HACKATHONS',
    items: [
      {
        num: '01',
        type: 'WORKSHOP / SEMICONDUCTOR',
        title: 'Synopsys VLSI Workshop',
        organization: 'Chennai Institute of Technology',
        description:
          'Participated in a Synopsys-focused technical workshop at Chennai Institute of Technology, gaining exposure to semiconductor EDA and VLSI implementation concepts.',
      },
      {
        num: '02',
        type: 'WORKSHOP / PHYSICAL DESIGN',
        title: 'Physical Design Workshop',
        organization: 'Prov Logic',
        description:
          'Participated in a physical design workshop conducted by Prov Logic, strengthening practical understanding of ASIC implementation and physical-design concepts.',
      },
      {
        num: '03',
        type: 'HACKATHON',
        title: 'Smart India Hackathon (SIH)',
        organization: 'National Level',
        description:
          'Participated in Smart India Hackathon activities as part of the engineering and problem-solving journey.',
      },
      {
        num: '04',
        type: 'HACKATHON',
        title: 'InnovaClash',
        organization: 'Competitive Innovation',
        description:
          'Participated in InnovaClash, working in a competitive innovation environment focused on technical problem solving and project development.',
      },
    ],
  },

  studio: {
    heading: 'ENGINEERING PRINCIPLES',
    items: [
      {
        quote: 'Simplicity is prerequisite for reliability.',
        author: 'Edsger W. Dijkstra',
        rotation: -4,
        drop: 0,
        shade: 0.2,
        skew: -0.9,
        indent: 1,
        objectPosition: '50% 50%',
        href: null as string | null,
      },
      {
        quote: 'Designing hardware from RTL to silicon.',
        author: 'Giridharan S',
        rotation: 1.2,
        drop: 11,
        shade: 0.6,
        skew: 0.7,
        indent: 0,
        objectPosition: '56% 38%',
        href: null as string | null,
      },
      {
        quote: 'In digital hardware design, timing and architecture dictate all.',
        author: 'Semiconductor Axiom',
        rotation: 3.5,
        drop: 3,
        shade: 0.35,
        skew: -0.5,
        indent: 2,
        objectPosition: '50% 50%',
        href: null as string | null,
      },
    ],
  },

  footer: {
    heading: "Let's connect",
    acknowledged: 'Message Sent',
    sub: 'Looking for an opportunity to build real hardware. Interested in VLSI, semiconductor design, physical design, DFT and implementation opportunities.',
    location: 'Chennai, Tamil Nadu, India',
    phone: '+91 9884778461',
    href: 'mailto:GIRIDHARAN.240034@VLSI.RICHENNAI.EDU.IN',
    marquee: ['GIRIDHARAN S', 'VLSI DESIGN', 'SEMICONDUCTOR', 'RTL TO SILICON'],
    links: [
      { label: 'LinkedIn ↗', href: 'https://www.linkedin.com/in/giridharan-s-13672932b/' as string | null },
      { label: 'Email', href: 'mailto:GIRIDHARAN.240034@VLSI.RICHENNAI.EDU.IN' as string | null },
      { label: 'Call (+91 9884778461)', href: 'tel:+919884778461' as string | null },
    ],
  },
} as const

export type Site = typeof site

