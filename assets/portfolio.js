(() => {
  const year = String(new Date().getFullYear());
  document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = year;
  });

  document.querySelectorAll(".mobile-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      const menu = link.closest("details");
      if (menu) menu.open = false;
    });
  });

  const isPortuguese = document.documentElement.lang.toLowerCase().startsWith("pt");
  const language = isPortuguese ? "pt" : "en";
  const assetBase = (document.body.dataset.assetBase || ".").replace(/\/$/, "");

  const copy = {
    en: {
      name: "Carlinhos · Portfolio guide",
      status: "Local knowledge base · no external API",
      tooltip: "Ask Carlinhos about Carlos",
      openLabel: "Open Carlinhos, Carlos's portfolio guide",
      closeLabel: "Close Carlinhos",
      inputLabel: "Question for Carlinhos",
      placeholder: "Ask about roles, results, or stack...",
      send: "Send",
      welcome: "Hi! I'm Carlinhos, Carlos's mascot. I can explain his experience, results, stack, education, and best-fit roles. What would you like to know?",
      fallback: "I don't have a verified answer for that yet. You can ask about Carlos's results, stack, experience, education, ProcessSurge, English, or contact him at carloshegomes@outlook.com.",
      suggestions: ["Best-fit roles", "Key results", "Core stack", "Education"]
    },
    pt: {
      name: "Carlinhos · Guia do portfólio",
      status: "Base local · sem API externa",
      tooltip: "Pergunte ao Carlinhos sobre o Carlos",
      openLabel: "Abrir o Carlinhos, guia do portfólio do Carlos",
      closeLabel: "Fechar o Carlinhos",
      inputLabel: "Pergunta para o Carlinhos",
      placeholder: "Pergunte sobre vagas, resultados ou stack...",
      send: "Enviar",
      welcome: "Oi! Eu sou o Carlinhos, mascote do Carlos. Posso explicar a experiência, os resultados, a stack, a formação e os cargos mais alinhados ao perfil dele. O que você quer saber?",
      fallback: "Ainda não tenho uma resposta verificada para isso. Você pode perguntar sobre resultados, stack, experiência, formação, ProcessSurge, inglês ou falar com o Carlos em carloshegomes@outlook.com.",
      suggestions: ["Cargos mais alinhados", "Principais resultados", "Stack principal", "Formação"]
    }
  };

  const knowledge = [
    {
      keywords: ["role", "roles", "job", "fit", "position", "cargo", "cargos", "vaga", "vagas", "perfil"],
      en: "Carlos is best aligned with AI Automation Engineer, Integration Engineer, Solutions Engineer, Implementation Engineer, and automation-focused Solutions Architecture roles. His strongest position is the bridge between operational context and hands-on technical delivery.",
      pt: "Carlos tem maior aderência a vagas de Engenheiro de Automação com IA, Engenheiro de Integrações, Solutions Engineer, Implementation Engineer e Arquitetura de Soluções com foco em automação. O diferencial dele é conectar o contexto operacional à execução técnica hands-on."
    },
    {
      keywords: ["result", "results", "impact", "outcome", "metric", "resultado", "resultados", "impacto", "métrica", "evidência"],
      en: "Selected production evidence: 30+ customers currently use the internal analytics platform; 100+ contract renewals are handled by automation each month in about 30 minutes; 40+ complex bot flows were converted into visual maps; and Carlos built roughly 35 internal APIs to reduce external dependencies.",
      pt: "Evidências selecionadas de produção: mais de 30 clientes usam atualmente a plataforma interna de analytics; mais de 100 renovações mensais são processadas por automação em cerca de 30 minutos; mais de 40 fluxos complexos de bots foram convertidos em mapas visuais; e Carlos construiu aproximadamente 35 APIs internas para reduzir dependências externas."
    },
    {
      keywords: ["stack", "technology", "technologies", "python", "n8n", "api", "backend", "data", "tecnologia", "ferramenta", "dados", "automação"],
      en: "Core stack: Python, FastAPI, Flask, REST APIs, Webhooks, SQLAlchemy, PostgreSQL, n8n, Celery, Redis, Docker, Linux, Apache Superset, Salesforce API, Meta/WhatsApp APIs, and structured workflows with OpenAI and Gemini APIs.",
      pt: "Stack principal: Python, FastAPI, Flask, APIs REST, Webhooks, SQLAlchemy, PostgreSQL, n8n, Celery, Redis, Docker, Linux, Apache Superset, API do Salesforce, APIs da Meta/WhatsApp e fluxos estruturados com as APIs da OpenAI e Gemini."
    },
    {
      keywords: ["experience", "career", "history", "hi platform", "customer care", "carreira", "experiência", "trajetória", "hi"],
      en: "At Hi Platform, Carlos currently works as an Automation & Integration Specialist within the RevOps/data context, building solution architecture, backend services, data pipelines, and enterprise integrations. He previously worked in Customer Care from 2021 to 2025 and brings an earlier foundation in retail IT, consulting, infrastructure, and ERP operations.",
      pt: "Na Hi Platform, Carlos atua hoje como Especialista em Automação e Integração no contexto de RevOps/dados, construindo arquitetura de soluções, serviços back-end, pipelines de dados e integrações enterprise. Antes disso, trabalhou em Customer Care de 2021 a 2025 e traz uma base anterior em TI para varejo, consultoria, infraestrutura e operação de ERPs."
    },
    {
      keywords: ["processsurge", "process surge", "cart recovery", "surge assist", "product", "products", "produto", "produtos", "founder", "fundador"],
      en: "Carlos founded ProcessSurge in 2025 and works there as an AI Automation Engineer. Cart Recovery applies event-driven communication rules to e-commerce operations, while Surge Assist applies structured LLM workflows to support triage, summarization, prioritization, and QA. The portfolio presents them as independent product work, separate from the anonymized enterprise cases.",
      pt: "Carlos fundou a ProcessSurge em 2025 e atua nela como Engenheiro de Automação com IA. O Cart Recovery aplica regras de comunicação orientadas a eventos em operações de e-commerce; o Surge Assist usa fluxos estruturados com LLMs para triagem, sumarização, priorização e QA de atendimento. O portfólio os apresenta como produtos independentes, separados dos cases enterprise anonimizados."
    },
    {
      keywords: ["education", "mba", "degree", "university", "formação", "educação", "faculdade", "graduação", "anhanguera", "unip"],
      en: "Carlos completed an MBA in Software Quality Management and an MBA in Artificial Intelligence and Big Data at Anhanguera University. He also holds a Technology Degree in IT Management from UNIP (2020–2023).",
      pt: "Carlos concluiu um MBA em Gestão da Qualidade de Software e um MBA em Inteligência Artificial e Big Data pela Universidade Anhanguera. Também é tecnólogo em Gestão da Tecnologia da Informação pela UNIP (2020–2023)."
    },
    {
      keywords: ["english", "language", "languages", "inglês", "idioma", "idiomas", "b2", "portuguese", "português"],
      en: "Portuguese is Carlos's native language. His English assessment is upper-intermediate (B2): he is comfortable with technical reading and written communication and is actively improving spontaneous speaking confidence. Spanish is basic.",
      pt: "Português é o idioma nativo do Carlos. A avaliação de inglês dele é intermediário-avançado (B2): tem boa desenvoltura com leitura técnica e comunicação escrita e está desenvolvendo mais confiança na fala espontânea. O espanhol é básico."
    },
    {
      keywords: ["contact", "email", "linkedin", "hire", "reach", "contato", "contratar", "falar", "conversar"],
      en: "You can reach Carlos at carloshegomes@outlook.com or through linkedin.com/in/carlos-he-gomes. He is based in Brazil and open to remote opportunities.",
      pt: "Você pode falar com o Carlos pelo e-mail carloshegomes@outlook.com ou pelo linkedin.com/in/carlos-he-gomes. Ele está no Brasil e aberto a oportunidades remotas."
    }
  ];

  const normalize = (value) => value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  const answerQuestion = (question) => {
    const normalized = normalize(question);
    let best = null;
    let bestScore = 0;
    knowledge.forEach((entry) => {
      const score = entry.keywords.reduce((total, keyword) => (
        normalized.includes(normalize(keyword)) ? total + 1 : total
      ), 0);
      if (score > bestScore) {
        best = entry;
        bestScore = score;
      }
    });
    return best ? best[language] : copy[language].fallback;
  };

  const createElement = (tag, className, text) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text) element.textContent = text;
    return element;
  };

  const launcher = createElement("button", "carlinhos-launcher");
  launcher.type = "button";
  launcher.setAttribute("aria-label", copy[language].openLabel);
  launcher.setAttribute("aria-expanded", "false");
  launcher.setAttribute("aria-controls", "carlinhos-panel");

  const launcherImage = createElement("img");
  launcherImage.src = `${assetBase}/carlinhos-head.png`;
  launcherImage.alt = "";
  launcherImage.width = 1024;
  launcherImage.height = 1024;
  launcher.append(launcherImage, createElement("span", "carlinhos-tooltip", copy[language].tooltip));

  const panel = createElement("section", "carlinhos-panel");
  panel.id = "carlinhos-panel";
  panel.hidden = true;
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-modal", "false");
  panel.setAttribute("aria-label", copy[language].name);

  const header = createElement("div", "carlinhos-header");
  const avatar = createElement("img", "carlinhos-avatar");
  avatar.src = `${assetBase}/carlinhos-head.png`;
  avatar.alt = "Carlinhos";
  avatar.width = 1024;
  avatar.height = 1024;
  const identity = createElement("div", "carlinhos-identity");
  identity.append(createElement("strong", "", copy[language].name), createElement("span", "", copy[language].status));
  const closeButton = createElement("button", "carlinhos-close", "×");
  closeButton.type = "button";
  closeButton.setAttribute("aria-label", copy[language].closeLabel);
  header.append(avatar, identity, closeButton);

  const messages = createElement("div", "carlinhos-messages");
  messages.setAttribute("aria-live", "polite");
  messages.setAttribute("aria-relevant", "additions");

  const suggestions = createElement("div", "carlinhos-suggestions");
  copy[language].suggestions.forEach((label) => {
    const button = createElement("button", "carlinhos-suggestion", label);
    button.type = "button";
    suggestions.append(button);
  });

  const form = createElement("form", "carlinhos-form");
  const input = createElement("textarea", "carlinhos-input");
  input.rows = 1;
  input.maxLength = 280;
  input.placeholder = copy[language].placeholder;
  input.setAttribute("aria-label", copy[language].inputLabel);
  const sendButton = createElement("button", "carlinhos-send", copy[language].send);
  sendButton.type = "submit";
  form.append(input, sendButton);
  panel.append(header, messages, suggestions, form);
  document.body.append(panel, launcher);

  let welcomed = false;
  const addMessage = (text, type) => {
    const message = createElement("p", `carlinhos-message carlinhos-message-${type}`);
    message.textContent = text;
    messages.append(message);
    messages.scrollTop = messages.scrollHeight;
  };

  const openPanel = () => {
    panel.hidden = false;
    launcher.setAttribute("aria-expanded", "true");
    if (!welcomed) {
      addMessage(copy[language].welcome, "bot");
      welcomed = true;
    }
    window.requestAnimationFrame(() => input.focus());
  };

  const closePanel = () => {
    panel.hidden = true;
    launcher.setAttribute("aria-expanded", "false");
    launcher.focus();
  };

  const submitQuestion = (question) => {
    const trimmed = question.trim();
    if (!trimmed) return;
    addMessage(trimmed, "user");
    addMessage(answerQuestion(trimmed), "bot");
    input.value = "";
    input.focus();
  };

  launcher.addEventListener("click", () => {
    if (panel.hidden) openPanel();
    else closePanel();
  });
  closeButton.addEventListener("click", closePanel);
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    submitQuestion(input.value);
  });
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submitQuestion(input.value);
    }
  });
  suggestions.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (button) submitQuestion(button.textContent || "");
  });
  panel.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closePanel();
  });
})();
