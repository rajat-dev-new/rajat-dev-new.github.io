/**
 * Rajat Patle - Portfolio Application Engine
 * Interactive Architecture Canvas, Terminal CLI, and Telemetry Logic
 */

// ==========================================================================
// 1. Architecture Canvas Data & Interactive Engine
// ==========================================================================
const ARCHITECTURE_DATA = {
  langgraph: {
    title: "LangGraph Agentic SDLC & Requirements Engine",
    nodes: [
      {
        id: "node-rfp",
        category: "INGESTION",
        title: "RFP Parsing & Chunking",
        sub: "Semantic chunking & schema extraction",
        type: "DATA PIPELINE",
        desc: "Ingests semi-structured RFP documents, performing token-aware semantic chunking and extracting business entities into structured Pydantic schemas before routing.",
        tags: ["Python 3.12", "Pydantic", "Document Parsing", "Token Optimization"]
      },
      {
        id: "node-router",
        category: "AGENT ORCHESTRATION",
        title: "LangGraph Router Node",
        sub: "Conditional edge branching",
        type: "DECISION NODE",
        desc: "A conditional node within LangGraph that evaluates requirement complexity and routes tasks either to direct vector retrieval or multi-hop knowledge graph queries.",
        tags: ["LangGraph", "StateGraph", "Conditional Edges", "Routing"]
      },
      {
        id: "node-retrieval",
        category: "RETRIEVAL",
        title: "Hybrid Vector + Graph DB",
        sub: "FAISS embeddings + Knowledge Graph",
        type: "DATA RETRIEVAL",
        desc: "Combines dense semantic search via FAISS with relational entity queries in a Graph Database to ground generated specifications in existing enterprise architectures.",
        tags: ["FAISS", "Vector DB", "Knowledge Graph", "RAG"]
      },
      {
        id: "node-synthesis",
        category: "SYNTHESIS",
        title: "BRD Synthesis Agent",
        sub: "Tool calling & state checkpointer",
        type: "EXECUTION NODE",
        desc: "Executes tool calling for requirement cross-referencing. Uses LangGraph MemorySaver for deterministic state persistence, rollback, and multi-turn refinement.",
        tags: ["LangGraph", "Tool Calling", "MemorySaver", "Prompt Engineering"]
      },
      {
        id: "node-gate",
        category: "VERIFICATION",
        title: "Schema Guardrail Gate",
        sub: "Deterministic validation & export",
        type: "QUALITY GATE",
        desc: "Strict non-LLM validation gate ensuring all generated BRD fields match corporate compliance schemas, with multi-language encoding support (Japanese & Traditional Chinese).",
        tags: ["Pydantic v2", "Deterministic Rules", "Localization", "CloudWatch"]
      }
    ]
  },
  aws: {
    title: "AWS Enterprise Cloud Topology (DENSO Production Readiness)",
    nodes: [
      {
        id: "node-ingress",
        category: "INGRESS",
        title: "Edge & Traffic Routing",
        sub: "Route 53 + ALB + Security Groups",
        type: "NETWORK EDGE",
        desc: "Public-facing ingress layer terminating TLS at Application Load Balancer with strict security group rules permitting only whitelisted CIDRs.",
        tags: ["AWS ALB", "Route 53", "Security Groups", "TLS Termination"]
      },
      {
        id: "node-vpc",
        category: "TOPOLOGY",
        title: "VPC & Multi-AZ Subnets",
        sub: "Public, Private & Isolated Tiers",
        type: "INFRASTRUCTURE",
        desc: "Multi-Availability Zone VPC topology with NAT Gateways for outbound egress, keeping compute and database workloads completely isolated from public internet exposure.",
        tags: ["AWS VPC", "Multi-AZ", "NAT Gateway", "Subnet Routing"]
      },
      {
        id: "node-compute",
        category: "COMPUTE",
        title: "ECS Container Mesh",
        sub: "Trivy-scanned microservices",
        type: "CONTAINER RUNTIME",
        desc: "Dockerized Python microservices deployed on Amazon ECS. Every container image undergoes automated Trivy vulnerability scanning to eliminate critical/high CVEs before deployment.",
        tags: ["Amazon ECS", "Docker", "Trivy", "Vulnerability Remediation"]
      },
      {
        id: "node-data",
        category: "PERSISTENCE",
        title: "RDS PostgreSQL & Redis",
        sub: "Isolated data tier + ElastiCache",
        type: "STORAGE & CACHING",
        desc: "High-availability Amazon RDS PostgreSQL with automated snapshot schedules, coupled with AWS ElastiCache (Redis) for low-latency session and token caching.",
        tags: ["RDS PostgreSQL", "ElastiCache Redis", "EFS", "AWS Backup"]
      },
      {
        id: "node-observability",
        category: "GOVERNANCE",
        title: "Security & Observability",
        sub: "IAM, CloudWatch, SSM, Secrets",
        type: "PLATFORM OPS",
        desc: "Zero-bastion SSH access via AWS Systems Manager (SSM), least-privilege IAM roles, automated secret rotation via AWS Secrets Manager, and centralized CloudWatch metric alarms.",
        tags: ["AWS CloudWatch", "AWS SSM", "IAM Least-Privilege", "Secrets Manager"]
      }
    ]
  },
  rag: {
    title: "Deterministic Hybrid RAG Engine (Credit Analyst Architecture)",
    nodes: [
      {
        id: "node-ingest-rag",
        category: "API ENTRY",
        title: "FastAPI Ingestion Endpoint",
        sub: "Pydantic request contracts",
        type: "API SERVICE",
        desc: "FastAPI microservice endpoint receiving loan applicant financials and documents, enforcing strict Pydantic v2 type validation and sanitization.",
        tags: ["FastAPI", "Python 3.12", "Pydantic", "REST API"]
      },
      {
        id: "node-math-rag",
        category: "DETERMINISTIC",
        title: "Financial Rule Engine",
        sub: "Zero LLM arithmetic (100% deterministic)",
        type: "BUSINESS LOGIC",
        desc: "Pure Python calculation engine for EMI, Debt-to-Income (DTI), and credit capacity. LLMs are prohibited from performing arithmetic to eliminate hallucination risk.",
        tags: ["Python Math", "Deterministic Rules", "pytest", "Audit Trail"]
      },
      {
        id: "node-vector-rag",
        category: "RETRIEVAL",
        title: "FAISS + Local LLM (Ollama)",
        sub: "Vector similarity search",
        type: "SEMANTIC SEARCH",
        desc: "Extracts qualitative signals from uploaded employer letters and bank statements using FAISS vector search, with local model inference executed via Ollama.",
        tags: ["FAISS", "Ollama", "Embeddings", "Local LLM"]
      },
      {
        id: "node-synthesis-rag",
        category: "EXPLANATION",
        title: "Grounded Synthesis",
        sub: "Bounded prompt templates",
        type: "REASONING ENGINE",
        desc: "Combines the deterministic credit score with retrieved qualitative excerpts to generate natural-language loan recommendation briefs with citations.",
        tags: ["Prompt Engineering", "Hallucination Guardrails", "Explainable AI"]
      },
      {
        id: "node-ui-rag",
        category: "PRESENTATION",
        title: "Streamlit & Output API",
        sub: "Auditable credit dashboard",
        type: "USER INTERFACE",
        desc: "Interactive dashboard providing credit officers with a side-by-side view of deterministic math calculations, qualitative AI rationale, and verification confidence scores.",
        tags: ["Streamlit", "JSON API", "End-to-End Testing", "pytest"]
      }
    ]
  }
};

let currentArch = "langgraph";

function initArchitectureCanvas() {
  const container = document.getElementById("archFlowContainer");
  const titleEl = document.getElementById("archTitle");
  const tabBtns = document.querySelectorAll(".arch-tab-btn");

  if (!container || !titleEl) return;

  function renderArchitecture(archKey) {
    currentArch = archKey;
    const data = ARCHITECTURE_DATA[archKey];
    titleEl.textContent = data.title;

    container.innerHTML = "";

    data.nodes.forEach((node, index) => {
      const nodeEl = document.createElement("div");
      nodeEl.className = `arch-node ${index === 0 ? "active-node" : ""}`;
      nodeEl.setAttribute("data-node-id", node.id);
      nodeEl.innerHTML = `
        <div class="node-category">${node.category}</div>
        <div class="node-title">${node.title}</div>
        <div class="node-sub">${node.sub}</div>
      `;

      nodeEl.addEventListener("click", () => {
        document.querySelectorAll(".arch-node").forEach(n => n.classList.remove("active-node"));
        nodeEl.classList.add("active-node");
        updateInspector(node);
      });

      container.appendChild(nodeEl);

      // Add connector between nodes
      if (index < data.nodes.length - 1) {
        const connector = document.createElement("div");
        connector.className = "flow-connector";
        connector.innerHTML = "&rarr;";
        container.appendChild(connector);
      }
    });

    // Default inspector to first node
    updateInspector(data.nodes[0]);
  }

  function updateInspector(node) {
    const inspType = document.getElementById("inspType");
    const inspTitle = document.getElementById("inspTitle");
    const inspDesc = document.getElementById("inspDesc");
    const inspTags = document.getElementById("inspTags");

    if (!inspTitle) return;

    inspType.textContent = node.type;
    inspTitle.textContent = node.title;
    inspDesc.textContent = node.desc;

    inspTags.innerHTML = node.tags.map(t => `<span class="insp-tag">${t}</span>`).join("");
  }

  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      tabBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const archKey = btn.getAttribute("data-arch");
      renderArchitecture(archKey);
    });
  });

  // Initial render
  renderArchitecture("langgraph");
}

// ==========================================================================
// 2. Interactive Terminal CLI
// ==========================================================================
function initTerminal() {
  const terminalInput = document.getElementById("terminalInput");
  const terminalHistory = document.getElementById("terminalHistory");
  const terminalScreen = document.getElementById("terminalScreen");
  const quickCmds = document.querySelectorAll(".cmd-chip");

  if (!terminalInput || !terminalHistory) return;

  const COMMANDS = {
    help: `
<span class="text-cyan">Available commands:</span>
  <span class="text-green">bio</span>           : Professional background & systems focus
  <span class="text-green">skills</span>        : Technical stack breakdown
  <span class="text-green">langgraph</span>     : LangGraph agentic orchestration specifics
  <span class="text-green">projects</span>      : Selected enterprise case studies
  <span class="text-green">architecture</span>  : Core architectural design principles
  <span class="text-green">contact</span>       : Contact & direct inquiry links
  <span class="text-green">clear</span>         : Clear the terminal screen
`,
    bio: `
<span class="text-cyan">Rajat Patle &mdash; Software Development Senior Specialist @ NTT DATA</span>
- 6+ years of software engineering & platform architecture experience.
- Specializes in building reliable production systems around GenAI (LangGraph, RAG).
- Strong foundation in Python (FastAPI, Django), AWS cloud readiness, and CI/CD pipelines.
- Extensive experience delivering for international enterprise clients in finance, insurance, and automotive.
`,
    skills: `
<span class="text-cyan">[AI & Agents]</span>  LangGraph, RAG, FAISS, Graph DBs, Tool Calling, Ollama, Prompt Eng
<span class="text-cyan">[Backend]</span>      Python, FastAPI, Django/DRF, Flask, SQLAlchemy, Pydantic, PostgreSQL
<span class="text-cyan">[Cloud/DevOps]</span> AWS (VPC, RDS, Redis, CloudWatch, SSM, IAM), Azure DevOps, Docker, Trivy
<span class="text-cyan">[Security]</span>     OAuth 2.0, Okta OIDC + PKCE, Azure AD, Container Vulnerability Remediation
`,
    langgraph: `
<span class="text-cyan">LangGraph In Production (Tesseract Forge Project):</span>
- Engineered stateful agent graphs with cyclic validation checks and conditional edges.
- Implemented MemorySaver checkpointing for resumeable agent state across API restarts.
- Bound tools for automated RFP analysis and deterministic BRD synthesis.
- Replaced brittle zero-shot prompts with observable multi-step reasoning nodes.
`,
    projects: `
<span class="text-cyan">Selected Enterprise Case Studies:</span>
  1. <span class="text-yellow">Tesseract Forge</span>: LangGraph Agentic SDLC & Okta PKCE SSO
  2. <span class="text-yellow">DENSO / Hyper Int.</span>: AWS Production Infrastructure Readiness & Trivy Hardening
  3. <span class="text-yellow">Munich Re</span>: FastAPI IFRS 17 Calculation Microservices replacing legacy Java
  4. <span class="text-yellow">Credit Analyst POC</span>: Deterministic Financial Rule Engine + Local Ollama LLM
  5. <span class="text-yellow">TalkTrack</span>: Multimodal AI Camera/OCR Application Quality & Release Engineering
`,
    architecture: `
<span class="text-cyan">Core Architectural Principles:</span>
  1. <span class="text-green">Deterministic math over probabilistic hallucination:</span> zero LLM arithmetic for financials.
  2. <span class="text-green">Observability precedes production:</span> structured logs, CloudWatch metrics & SSM debugging.
  3. <span class="text-green">Security by topology:</span> isolated subnets, least-privilege IAM & Trivy CVE scanning.
  4. <span class="text-green">Schema integrity:</span> strict Pydantic contracts and database migrations across services.
`,
    contact: `
<span class="text-cyan">Get In Touch:</span>
- Email  : <a href="mailto:patlerajat94@gmail.com" class="text-green">patlerajat94@gmail.com</a>
- Phone  : <span class="text-green">+91 77097 46527</span>
- GitHub : <a href="https://github.com/rajat-dev-new" target="_blank" class="text-green">github.com/rajat-dev-new</a>
`
  };

  function executeCommand(rawCmd) {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === "clear") {
      terminalHistory.innerHTML = "";
      terminalInput.value = "";
      return;
    }

    // Append user input
    const userLine = document.createElement("div");
    userLine.className = "terminal-line";
    userLine.innerHTML = `<span class="terminal-prompt">guest@rajat-arch:~$</span> ${escapeHTML(rawCmd)}`;
    terminalHistory.appendChild(userLine);

    // Append response
    const respLine = document.createElement("div");
    respLine.className = "terminal-line";

    if (COMMANDS[cmd]) {
      respLine.innerHTML = COMMANDS[cmd].trim();
    } else {
      respLine.innerHTML = `<span class="text-muted">command not found: ${escapeHTML(cmd)}. Type <span class="text-cyan">help</span> for available commands.</span>`;
    }

    terminalHistory.appendChild(respLine);
    terminalInput.value = "";

    // Auto scroll to bottom
    terminalScreen.scrollTop = terminalScreen.scrollHeight;
  }

  terminalInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      executeCommand(terminalInput.value);
    }
  });

  quickCmds.forEach(btn => {
    btn.addEventListener("click", () => {
      const cmd = btn.getAttribute("data-cmd");
      executeCommand(cmd);
    });
  });

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag));
  }
}

// ==========================================================================
// 3. UI Utilities (Copy Email, Mobile Nav, Smooth Scroll)
// ==========================================================================
function initUtilities() {
  // Copy Email Button
  const copyBtn = document.getElementById("copyEmailBtn");
  const copyText = document.getElementById("copyEmailText");

  if (copyBtn && copyText) {
    copyBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText("patlerajat94@gmail.com");
        copyText.textContent = "Copied: patlerajat94@gmail.com";
        copyBtn.style.borderColor = "var(--accent-green)";
        setTimeout(() => {
          copyText.textContent = "Copy Email Address";
          copyBtn.style.borderColor = "var(--border-subtle)";
        }, 3000);
      } catch (err) {
        copyText.textContent = "patlerajat94@gmail.com";
      }
    });
  }

  // Mobile Toggle
  const toggle = document.getElementById("mobileToggle");
  const navLinks = document.getElementById("navLinks");

  if (toggle && navLinks) {
    toggle.addEventListener("click", () => {
      if (navLinks.style.display === "flex") {
        navLinks.style.display = "none";
      } else {
        navLinks.style.display = "flex";
        navLinks.style.flexDirection = "column";
        navLinks.style.position = "absolute";
        navLinks.style.top = "72px";
        navLinks.style.left = "0";
        navLinks.style.right = "0";
        navLinks.style.background = "#07090e";
        navLinks.style.padding = "24px";
        navLinks.style.borderBottom = "1px solid var(--border-subtle)";
      }
    });
  }
}

// ==========================================================================
// 4. Video Player & Interactive Chapter Synchronization
// ==========================================================================
function initVideoChapters() {
  const video = document.getElementById("architectureVideo");
  const chapterBtns = document.querySelectorAll(".chapter-btn");

  if (!video || chapterBtns.length === 0) return;

  chapterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const seekTime = parseFloat(btn.getAttribute("data-seek"));
      if (!isNaN(seekTime)) {
        video.currentTime = seekTime;
        video.play().catch(() => {});
        updateActiveChapter(seekTime);
      }
    });
  });

  video.addEventListener("timeupdate", () => {
    const curTime = video.currentTime;
    updateActiveChapter(curTime);
  });

  function updateActiveChapter(currentTime) {
    let currentActive = null;
    chapterBtns.forEach(btn => {
      const seekTime = parseFloat(btn.getAttribute("data-seek"));
      if (currentTime >= seekTime) {
        currentActive = btn;
      }
    });

    if (currentActive) {
      chapterBtns.forEach(btn => btn.classList.remove("active"));
      currentActive.classList.add("active");
    }
  }
}

// ==========================================================================
// App Initialization
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  initArchitectureCanvas();
  initTerminal();
  initUtilities();
  initVideoChapters();
});
