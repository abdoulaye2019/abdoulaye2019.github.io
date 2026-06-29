/* =============================================================
   i18n — bilingual FR/EN engine
   Markup: data-i18n="key" (textContent) · data-i18n-html="key" (innerHTML)
   Dictionary below is the single source of truth; FR is the default.
   ============================================================= */
(function () {
    "use strict";

    const STRINGS = {
        fr: {
            "doc.title": "Abdoulaye Leye — Senior Information Management Associate, UNHCR RBWCA",
            "a11y.skip": "Aller au contenu principal",

            "nav.projects": "Projets",
            "nav.expertise": "Expertise",
            "nav.about": "À propos",
            "nav.publications": "Publications",
            "nav.contact": "Contact",

            "hero.eyebrow": "UNHCR · Bureau régional · Dakar",
            "hero.role": "Senior Information Management Associate — Bureau régional UNHCR pour l'Afrique de l'Ouest et Centrale (RBWCA).",
            "hero.lead": "Je conçois des plateformes data, des systèmes d'information géographique et des assistants IA pour la réponse humanitaire — à l'échelle régionale, sur 23 pays d'Afrique de l'Ouest et Centrale.",
            "hero.cta_projects": "Voir mes projets",
            "hero.cta_cv": "Télécharger le CV",
            "hero.available": "Disponible pour des missions de conseil",

            "ctx.scope_label": "Couverture régionale",
            "ctx.scope_val": "opérations pays · Afrique de l'Ouest & Centrale",
            "ctx.bureau_label": "Affiliation",
            "ctx.bureau_val": "UNHCR Regional Bureau — Section DIMA",
            "ctx.base_label": "Base",
            "ctx.base_val": "Dakar, Sénégal · Master 2 Géographie (UCAD)",

            "sec.projects.title": "Projets phares",
            "sec.projects.sub": "Réalisations opérationnelles : plateformes en production, analyse spatiale avancée et assistants IA pour la décision humanitaire.",
            "sec.expertise.title": "Expertise",
            "sec.expertise.sub": "Compétences organisées par niveau de maîtrise affirmé, des plateformes en production à l'outillage complémentaire.",
            "sec.about.title": "À propos",
            "sec.about.sub": "Spécialiste de la gestion de l'information humanitaire, à l'intersection des SIG, de la science des données et de l'IA appliquée.",
            "sec.publications.title": "Publications & présentations",
            "sec.publications.sub": "Interventions, facilitations et présentations institutionnelles au sein du réseau UNHCR.",
            "sec.certifications.title": "Certifications",
            "sec.certifications.sub": "Certifications distinctives en data science, télédétection et plateformes data modernes.",
            "sec.collaborations.title": "Collaborations institutionnelles",
            "sec.collaborations.sub": "Collaboration et appui aux opérations pays de la région.",
            "sec.contact.title": "Travaillons ensemble",
            "sec.contact.sub": "Disponible pour des missions de conseil, des collaborations et des opportunités internationales.",

            "proj.internal": "Interne · UNHCR",
            "proj.concept": "Concept · R&D",
            "proj.impact_label": "Impact",
            "proj.more": "Autres réalisations",
            "proj.archive": "Projets d'apprentissage certifiés (Google, FreeCodeCamp) —",
            "proj.archive_link": "voir les archives",
            "proj.rbwca.cat": "Plateforme · En production",
            "proj.rbwca.title": "Plateforme RBWCA Data Compilation",
            "proj.rbwca.body": "Application R Shiny (bslib) déployée sur Posit Connect, qui centralise les données opérationnelles de 23 pays d'Afrique de l'Ouest et Centrale. Un assistant IA intégré permet d'interroger les données en langage naturel.",
            "proj.rbwca.impact": "Repérée par trois Senior Managers d'UNHCR HQ Genève, qui ont proposé d'en faire un projet régional officiel. Migration en cours vers SQL Server + ActivityInfo.",
            "proj.ews.cat": "Alerte précoce · Concept COP30",
            "proj.ews.title": "Alerte précoce — climat & déplacements",
            "proj.ews.body": "Architecture combinant Google Earth Engine, l'imagerie satellitaire (Sentinel-1/2, MODIS, CHIRPS, SMAP) et les jeux de données opérationnels UNHCR pour anticiper les risques de déplacement induits par le climat dans la région WCA.",
            "proj.ews.impact": "Concept de recherche appliquée développé dans la perspective de la COP30 — méthodes de ML pour la télédétection au service de l'anticipation humanitaire.",
            "proj.mali.cat": "Cartographie · Multi-pays",
            "proj.mali.title": "Cartographie des services de protection — Mali",
            "proj.mali.body": "Exercice de cartographie régionale : nettoyage d'un jeu de données de 514 entrées sous Jupyter, géocodage et traduction FR/EN, puis production de cartes opérationnelles pour les briefings managériaux.",
            "proj.mali.impact": "Cartes opérationnelles utilisées en briefings de direction pour la planification de la protection.",
            "proj.s1.title": "Cartographie des inondations — Touba",
            "proj.s1.desc": "Détection des zones inondées autour de la Grande Mosquée par radar Sentinel-1 sur Google Earth Engine.",
            "proj.s2.title": "Pyramides démographiques — réfugiés congolais",
            "proj.s2.desc": "Visualisations démographiques par âge et sexe en Python pour l'analyse de population déplacée.",
            "proj.s3.title": "Tableaux de bord workforce & démographie",
            "proj.s3.desc": "Analyses Power BI / DAX avec cartes Azure pour le suivi des effectifs et de la population.",
            "proj.s4.title": "Choroplèthes — jeunes déplacés (JOJ Dakar 2026)",
            "proj.s4.desc": "Cartes choroplèthes sur la jeunesse déplacée dans le contexte des Jeux Olympiques de la Jeunesse.",
            "proj.s5.title": "Intégration SICAP SA ↔ GEOPLANPLUS",
            "proj.s5.desc": "Pont de données entre Oracle (SICAP SA) et PostGIS (GEOPLANPLUS) via Foreign Data Wrapper.",
            "proj.s6.title": "OCR de registres de sécurité manuscrits",
            "proj.s6.desc": "Numérisation de registres manuscrits vers des fichiers Excel structurés et exploitables.",
            "proj.s7.title": "AURA — assistant IA analytics réfugiés",
            "proj.s7.desc": "« AI for Understanding Refugee Analytics » : assistant IA pour le RBWCA sur la plateforme SHAPE.",

            "exp.t1": "Expertise principale",
            "exp.t1.desc": "Au cœur de mes livrables quotidiens, en production.",
            "exp.t2": "Maîtrise solide",
            "exp.t2.desc": "Mobilisée régulièrement sur les projets régionaux.",
            "exp.t3": "Outils complémentaires",
            "exp.t3.desc": "Maîtrisés et mobilisables selon les besoins.",

            "about.p1": "Spécialiste de la gestion de l'information humanitaire, à l'intersection des SIG, de la science des données et de l'IA appliquée. Au sein du Bureau régional UNHCR pour l'Afrique de l'Ouest et Centrale (section DIMA), je conçois et déploie des plateformes data utilisées dans 23 opérations pays.",
            "about.p2": "Mon travail couvre le développement de plateformes R Shiny en production, les analyses spatiales avancées (Google Earth Engine, télédétection radar), l'intégration de bases de données opérationnelles et l'application de modèles de machine learning à des problématiques humanitaires concrètes : déplacements forcés, climat, protection.",
            "about.p3": "J'attache une importance particulière à l'intégrité des données et à la reproductibilité — des plateformes pensées pour être maintenues, vérifiées et adoptées par les équipes pays.",
            "about.f.role": "Poste",
            "about.f.role_v": "Senior Information Management Associate — promu en avril 2026",
            "about.f.org": "Organisation",
            "about.f.edu": "Formation",
            "about.f.edu_v": "Master 2 — Géographie, Aménagement du Territoire (UCAD, Dakar)",
            "about.f.lang": "Langues",
            "about.f.lang_v": "Français (courant) · Anglais (professionnel) · Wolof (courant)",

            "cert.gada.meta": "Certificat professionnel · 2025",
            "cert.verify": "Vérifier sur Credly",
            "cert.verify_short": "Vérifier",
            "cert.meal": "MEAL — Suivi & Évaluation",

            "pub.k1": "Présentation",
            "pub.t1": "Plateforme RBWCA Data Compilation",
            "pub.m1": "Meeting général des IM officers · UNHCR",
            "pub.d1": "Présentation de la plateforme régionale aux Information Management officers du réseau UNHCR.",
            "pub.k2": "Facilitation",
            "pub.t2": "Souveraineté des données",
            "pub.d2": "Animation d'une session sur la souveraineté des données lors du retreat régional de la section DIMA.",
            "pub.k3": "Mission",
            "pub.t3": "Facilitation & appui — Niger",
            "pub.d3": "Missions de facilitation et d'appui auprès de l'opération pays au Niger.",

            "collab.1.name": "UNHCR HQ Genève",
            "collab.1.desc": "Intérêt de Senior Managers pour la plateforme RBWCA ; projet régional officiel en discussion.",
            "collab.2.name": "OIM — Missing Migrants Project",
            "collab.2.desc": "Échanges et collaboration data sur les migrations dans la région.",
            "collab.3.name": "Bureaux pays WCA",
            "collab.3.desc": "Appui aux 23 opérations pays et adoption des outils data régionaux.",

            "contact.email_label": "E-mail",
            "contact.loc_label": "Localisation",
            "contact.loc_val": "Dakar, Sénégal",
            "contact.avail_label": "Disponibilité",
            "contact.avail_val": "Missions de conseil & opportunités internationales",
            "contact.form_name": "Nom",
            "contact.form_email": "E-mail",
            "contact.form_subject": "Sujet",
            "contact.form_message": "Message",
            "contact.form_send": "Envoyer le message",

            "placeholder": "Section en cours de construction — prochaine étape.",

            "footer.tag": "Senior Information Management Associate — UNHCR RBWCA. Data, SIG et IA appliquée pour la réponse humanitaire.",
            "footer.nav": "Navigation",
            "footer.connect": "Réseaux",
            "footer.cv": "Curriculum Vitæ (PDF)"
        },

        en: {
            "doc.title": "Abdoulaye Leye — Senior Information Management Associate, UNHCR RBWCA",
            "a11y.skip": "Skip to main content",

            "nav.projects": "Work",
            "nav.expertise": "Expertise",
            "nav.about": "About",
            "nav.publications": "Publications",
            "nav.contact": "Contact",

            "hero.eyebrow": "UNHCR · Regional Bureau · Dakar",
            "hero.role": "Senior Information Management Associate — UNHCR Regional Bureau for West & Central Africa (RBWCA).",
            "hero.lead": "I build data platforms, geographic information systems and AI assistants for humanitarian response — at regional scale, across 23 countries in West and Central Africa.",
            "hero.cta_projects": "View my work",
            "hero.cta_cv": "Download CV",
            "hero.available": "Available for consulting engagements",

            "ctx.scope_label": "Regional coverage",
            "ctx.scope_val": "country operations · West & Central Africa",
            "ctx.bureau_label": "Affiliation",
            "ctx.bureau_val": "UNHCR Regional Bureau — DIMA section",
            "ctx.base_label": "Based in",
            "ctx.base_val": "Dakar, Senegal · MSc Geography (UCAD)",

            "sec.projects.title": "Selected work",
            "sec.projects.sub": "Operational delivery: production platforms, advanced spatial analysis and AI assistants for humanitarian decision-making.",
            "sec.expertise.title": "Expertise",
            "sec.expertise.sub": "Skills organised by demonstrated proficiency — from production platforms to complementary tooling.",
            "sec.about.title": "About",
            "sec.about.sub": "Humanitarian information management specialist at the intersection of GIS, data science and applied AI.",
            "sec.publications.title": "Publications & talks",
            "sec.publications.sub": "Institutional talks, facilitations and presentations across the UNHCR network.",
            "sec.certifications.title": "Certifications",
            "sec.certifications.sub": "Distinctive certifications in data science, remote sensing and modern data platforms.",
            "sec.collaborations.title": "Institutional collaborations",
            "sec.collaborations.sub": "Collaboration and support with country operations across the region.",
            "sec.contact.title": "Let's work together",
            "sec.contact.sub": "Available for consulting engagements, collaborations and international opportunities.",

            "proj.internal": "Internal · UNHCR",
            "proj.concept": "Concept · R&D",
            "proj.impact_label": "Impact",
            "proj.more": "More work",
            "proj.archive": "Certified learning projects (Google, FreeCodeCamp) —",
            "proj.archive_link": "view archive",
            "proj.rbwca.cat": "Platform · In production",
            "proj.rbwca.title": "RBWCA Data Compilation platform",
            "proj.rbwca.body": "An R Shiny (bslib) application deployed on Posit Connect, centralising operational data from 23 countries across West and Central Africa. An embedded AI assistant lets users query the data in natural language.",
            "proj.rbwca.impact": "Spotted by three UNHCR HQ Geneva Senior Managers, who proposed turning it into an official regional project. Migration to SQL Server + ActivityInfo under way.",
            "proj.ews.cat": "Early warning · COP30 concept",
            "proj.ews.title": "Early warning — climate & displacement",
            "proj.ews.body": "An architecture combining Google Earth Engine, satellite imagery (Sentinel-1/2, MODIS, CHIRPS, SMAP) and UNHCR operational datasets to anticipate climate-driven displacement risk across the WCA region.",
            "proj.ews.impact": "An applied-research concept developed toward COP30 — remote-sensing ML methods in service of humanitarian anticipation.",
            "proj.mali.cat": "Mapping · Multi-country",
            "proj.mali.title": "Protection services mapping — Mali",
            "proj.mali.body": "A regional mapping exercise: cleaning a 514-record dataset in Jupyter, geocoding and FR/EN translation, then producing operational maps for managerial briefings.",
            "proj.mali.impact": "Operational maps used in management briefings for protection planning.",
            "proj.s1.title": "Flood mapping — Touba",
            "proj.s1.desc": "Flood extent around the Great Mosque detected with Sentinel-1 radar on Google Earth Engine.",
            "proj.s2.title": "Population pyramids — Congolese refugees",
            "proj.s2.desc": "Age–sex demographic visualisations in Python for displaced-population analysis.",
            "proj.s3.title": "Workforce & demographics dashboards",
            "proj.s3.desc": "Power BI / DAX analytics with Azure Maps for workforce and population monitoring.",
            "proj.s4.title": "Choropleths — displaced youth (Dakar 2026 YOG)",
            "proj.s4.desc": "Choropleth maps on displaced youth in the context of the Youth Olympic Games.",
            "proj.s5.title": "SICAP SA ↔ GEOPLANPLUS integration",
            "proj.s5.desc": "Data bridge between Oracle (SICAP SA) and PostGIS (GEOPLANPLUS) via Foreign Data Wrapper.",
            "proj.s6.title": "OCR of handwritten security registers",
            "proj.s6.desc": "Digitising handwritten registers into structured, usable Excel files.",
            "proj.s7.title": "AURA — refugee-analytics AI assistant",
            "proj.s7.desc": "\"AI for Understanding Refugee Analytics\": an AI assistant for RBWCA on the SHAPE platform.",

            "exp.t1": "Core expertise",
            "exp.t1.desc": "At the core of my daily, in-production delivery.",
            "exp.t2": "Strong proficiency",
            "exp.t2.desc": "Used regularly across regional projects.",
            "exp.t3": "Complementary tools",
            "exp.t3.desc": "Confident and available as needed.",

            "about.p1": "A humanitarian information management specialist working at the intersection of GIS, data science and applied AI. Within the UNHCR Regional Bureau for West and Central Africa (DIMA section), I design and deploy data platforms used across 23 country operations.",
            "about.p2": "My work spans production R Shiny platforms, advanced spatial analysis (Google Earth Engine, radar remote sensing), operational database integration and the application of machine learning to concrete humanitarian problems: forced displacement, climate, protection.",
            "about.p3": "I place particular emphasis on data integrity and reproducibility — platforms built to be maintained, verified and adopted by country teams.",
            "about.f.role": "Role",
            "about.f.role_v": "Senior Information Management Associate — promoted April 2026",
            "about.f.org": "Organisation",
            "about.f.edu": "Education",
            "about.f.edu_v": "MSc — Geography, Territorial Planning (UCAD, Dakar)",
            "about.f.lang": "Languages",
            "about.f.lang_v": "French (native) · English (professional) · Wolof (native)",

            "cert.gada.meta": "Professional Certificate · 2025",
            "cert.verify": "Verify on Credly",
            "cert.verify_short": "Verify",
            "cert.meal": "MEAL — Monitoring & Evaluation",

            "pub.k1": "Talk",
            "pub.t1": "RBWCA Data Compilation platform",
            "pub.m1": "IM officers general meeting · UNHCR",
            "pub.d1": "Presentation of the regional platform to UNHCR Information Management officers.",
            "pub.k2": "Facilitation",
            "pub.t2": "Data sovereignty",
            "pub.d2": "Facilitated a session on data sovereignty at the DIMA section regional retreat.",
            "pub.k3": "Mission",
            "pub.t3": "Facilitation & support — Niger",
            "pub.d3": "Facilitation and support missions for the Niger country operation.",

            "collab.1.name": "UNHCR HQ Geneva",
            "collab.1.desc": "Senior Managers' interest in the RBWCA platform; an official regional project under discussion.",
            "collab.2.name": "IOM — Missing Migrants Project",
            "collab.2.desc": "Data exchange and collaboration on migration across the region.",
            "collab.3.name": "WCA country offices",
            "collab.3.desc": "Support to the 23 country operations and adoption of regional data tools.",

            "contact.email_label": "Email",
            "contact.loc_label": "Location",
            "contact.loc_val": "Dakar, Senegal",
            "contact.avail_label": "Availability",
            "contact.avail_val": "Consulting engagements & international opportunities",
            "contact.form_name": "Name",
            "contact.form_email": "Email",
            "contact.form_subject": "Subject",
            "contact.form_message": "Message",
            "contact.form_send": "Send message",

            "placeholder": "Section under construction — coming next.",

            "footer.tag": "Senior Information Management Associate — UNHCR RBWCA. Data, GIS and applied AI for humanitarian response.",
            "footer.nav": "Navigation",
            "footer.connect": "Connect",
            "footer.cv": "Curriculum Vitæ (PDF)"
        }
    };

    const STORE_KEY = "al-lang";
    const SUPPORTED = ["fr", "en"];

    function apply(lang) {
        if (!SUPPORTED.includes(lang)) lang = "fr";
        const dict = STRINGS[lang];

        document.documentElement.setAttribute("lang", lang);
        if (dict["doc.title"]) document.title = dict["doc.title"];

        document.querySelectorAll("[data-i18n]").forEach(function (el) {
            const v = dict[el.getAttribute("data-i18n")];
            if (v != null) el.textContent = v;
        });
        document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
            const v = dict[el.getAttribute("data-i18n-html")];
            if (v != null) el.innerHTML = v;
        });

        document.querySelectorAll(".lang__btn").forEach(function (btn) {
            const active = btn.getAttribute("data-lang") === lang;
            btn.classList.toggle("is-active", active);
            btn.setAttribute("aria-pressed", active ? "true" : "false");
        });

        try { localStorage.setItem(STORE_KEY, lang); } catch (e) {}
    }

    function init() {
        let saved = "fr";
        try { saved = localStorage.getItem(STORE_KEY) || "fr"; } catch (e) {}
        apply(saved);

        document.querySelectorAll(".lang__btn").forEach(function (btn) {
            btn.addEventListener("click", function () {
                apply(btn.getAttribute("data-lang"));
            });
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
