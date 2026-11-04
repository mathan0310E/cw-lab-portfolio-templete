/*
 * CWLABS Portfolio Builder — shared data adapter.
 *
 * The editor stores a portfolio record. Different versions of the CWLABS
 * schema have used slightly different field names (e.g. `role` vs `title`,
 * `company` vs `organisation`). Rather than teach every template about those
 * variations, the whole builder funnels records through `CW.adapter.normalize`
 * and every template consumes the single normalised shape produced here.
 *
 * Templates must never read the raw record directly.
 */
(function () {
  "use strict";

  var CW = (window.CW = window.CW || {});
  var U = CW.util;

  function str(v) {
    return v === null || v === undefined ? "" : String(v).trim();
  }

  /** Return the first present value across a list of candidate keys. */
  function pick(obj, keys, fallback) {
    if (!obj) return fallback;
    for (var i = 0; i < keys.length; i++) {
      var v = obj[keys[i]];
      if (v !== null && v !== undefined && str(v) !== "") return v;
    }
    return fallback;
  }

  function arr(v) {
    if (Array.isArray(v)) return v;
    if (v && typeof v === "object") return Object.keys(v).map(function (k) { return v[k]; });
    return [];
  }

  function toStringList(v) {
    if (Array.isArray(v)) {
      return v.map(function (x) { return str(x); }).filter(Boolean);
    }
    if (typeof v === "string") {
      return v.split(",").map(function (x) { return str(x); }).filter(Boolean);
    }
    return [];
  }

  function normalizeBasics(raw) {
    var b = raw.basics || raw.profile || raw.personal || raw;
    return {
      fullName: str(pick(b, ["fullName", "full_name", "name", "displayName"], "")),
      role: str(pick(b, ["role", "title", "professionalRole", "headline", "position"], "")),
      tagline: str(pick(b, ["tagline", "subtitle", "slogan", "intro"], "")),
      bio: str(pick(b, ["bio", "biography", "about", "summary", "description"], "")),
      location: str(pick(b, ["location", "city", "address", "basedIn"], "")),
      email: str(pick(b, ["email", "contactEmail", "mail"], "")),
      phone: str(pick(b, ["phone", "mobile", "telephone"], "")),
      profileImage: str(pick(b, ["profileImage", "avatar", "photo", "profilePhoto", "image"], "")),
      coverImage: str(pick(b, ["coverImage", "cover", "banner", "coverPhoto"], ""))
    };
  }

  function normalizeLinks(raw) {
    var l = raw.links || raw.social || raw.socialLinks || {};
    var other = arr(pick(l, ["other", "others", "extra", "custom"], []))
      .map(function (item) {
        if (typeof item === "string") return { label: U.prettyUrl(item), url: str(item) };
        return {
          label: str(pick(item, ["label", "name", "title", "platform"], "Link")),
          url: str(pick(item, ["url", "href", "link"], ""))
        };
      })
      .filter(function (x) { return x.url; });

    // Also fold any flat network keys into the "other" list.
    var known = { github: 1, linkedin: 1, website: 1, twitter: 1, other: 1, others: 1, extra: 1, custom: 1 };
    Object.keys(l).forEach(function (k) {
      if (known[k]) return;
      var v = l[k];
      if (typeof v === "string" && /^https?:\/\//i.test(v)) {
        other.push({ label: k.charAt(0).toUpperCase() + k.slice(1), url: v });
      }
    });

    return {
      github: str(pick(l, ["github", "githubUrl", "gh"], "")),
      linkedin: str(pick(l, ["linkedin", "linkedinUrl"], "")),
      website: str(pick(l, ["website", "site", "portfolio", "personalWebsite"], "")),
      twitter: str(pick(l, ["twitter", "x", "twitterUrl"], "")),
      other: other
    };
  }

  function normalizeSkills(raw) {
    return arr(raw.skills || raw.technicalSkills || raw.capabilities)
      .map(function (s) {
        if (typeof s === "string") return { name: str(s), category: "", level: null };
        return {
          name: str(pick(s, ["name", "skill", "title", "label"], "")),
          category: str(pick(s, ["category", "group", "type", "area"], "")),
          level: U.skillLevel(pick(s, ["level", "proficiency", "value", "percent"], null))
        };
      })
      .filter(function (s) { return s.name; });
  }

  function normalizeProjects(raw) {
    return arr(raw.projects || raw.work || raw.selectedProjects)
      .map(function (p) {
        return {
          name: str(pick(p, ["name", "title", "project", "projectName"], "")),
          description: str(pick(p, ["description", "summary", "details", "about"], "")),
          technologies: toStringList(pick(p, ["technologies", "tech", "stack", "tags", "tools"], [])),
          image: str(pick(p, ["image", "imageUrl", "thumbnail", "cover", "screenshot"], "")),
          url: str(pick(p, ["url", "link", "liveUrl", "demo", "website"], "")),
          repo: str(pick(p, ["repo", "repository", "github", "source", "githubUrl"], "")),
          category: str(pick(p, ["category", "type", "researchCategory"], "")),
          severity: str(pick(p, ["severity", "risk", "riskLevel", "criticality"], "")),
          role: str(pick(p, ["role", "contribution"], "")),
          year: str(pick(p, ["year", "date"], "")),
          // Data-journal style optional narrative fields (only shown when supplied).
          problem: str(pick(p, ["problem", "problemStatement"], "")),
          dataset: str(pick(p, ["dataset", "data"], "")),
          methodology: str(pick(p, ["methodology", "method", "approach"], "")),
          results: str(pick(p, ["results", "outcome", "impact"], ""))
        };
      })
      .filter(function (p) { return p.name; });
  }

  function normalizeExperience(raw) {
    return arr(raw.experience || raw.workExperience || raw.jobs)
      .map(function (e) {
        return {
          role: str(pick(e, ["role", "position", "title", "jobTitle"], "")),
          company: str(pick(e, ["company", "organisation", "organization", "employer", "institution"], "")),
          description: str(pick(e, ["description", "summary", "details"], "")),
          startDate: str(pick(e, ["startDate", "start", "from", "start_date"], "")),
          endDate: str(pick(e, ["endDate", "end", "to", "end_date"], ""))
        };
      })
      .filter(function (e) { return e.role || e.company; });
  }

  function normalizeEducation(raw) {
    return arr(raw.education || raw.educationHistory)
      .map(function (e) {
        return {
          degree: str(pick(e, ["degree", "qualification", "course", "title", "field"], "")),
          institution: str(pick(e, ["institution", "school", "university", "college", "organisation", "organization"], "")),
          description: str(pick(e, ["description", "summary", "details"], "")),
          startDate: str(pick(e, ["startDate", "start", "from"], "")),
          endDate: str(pick(e, ["endDate", "end", "to"], ""))
        };
      })
      .filter(function (e) { return e.degree || e.institution; });
  }

  function normalizeCertificates(raw) {
    return arr(raw.certificates || raw.certifications || raw.certs)
      .map(function (c) {
        return {
          name: str(pick(c, ["name", "title", "certificate"], "")),
          issuer: str(pick(c, ["issuer", "organisation", "organization", "authority", "provider"], "")),
          date: str(pick(c, ["date", "issueDate", "issued", "year"], "")),
          image: str(pick(c, ["image", "imageUrl", "document", "file"], "")),
          verifyUrl: str(pick(c, ["verifyUrl", "verificationUrl", "url", "link", "credentialUrl"], ""))
        };
      })
      .filter(function (c) { return c.name; });
  }

  function normalizeAchievements(raw) {
    return arr(raw.achievements || raw.awards || raw.honours)
      .map(function (a) {
        if (typeof a === "string") return { title: str(a), description: "", date: "" };
        return {
          title: str(pick(a, ["title", "name", "award"], "")),
          description: str(pick(a, ["description", "summary", "details"], "")),
          date: str(pick(a, ["date", "year", "when"], ""))
        };
      })
      .filter(function (a) { return a.title; });
  }

  function normalizePublications(raw) {
    return arr(raw.publications || raw.papers || raw.articles)
      .map(function (p) {
        if (typeof p === "string") return { title: str(p), description: "", date: "", url: "" };
        return {
          title: str(pick(p, ["title", "name"], "")),
          description: str(pick(p, ["description", "summary", "abstract"], "")),
          date: str(pick(p, ["date", "year", "published"], "")),
          url: str(pick(p, ["url", "link", "doi"], ""))
        };
      })
      .filter(function (p) { return p.title; });
  }

  function normalizeCtf(raw) {
    return arr(raw.ctfAchievements || raw.ctf || raw.ctfs)
      .map(function (c) {
        if (typeof c === "string") return { event: str(c), placement: "", description: "", date: "", category: "" };
        return {
          event: str(pick(c, ["event", "name", "competition", "title"], "")),
          placement: str(pick(c, ["placement", "result", "rank", "position"], "")),
          description: str(pick(c, ["description", "summary", "details"], "")),
          date: str(pick(c, ["date", "year", "when"], "")),
          category: str(pick(c, ["category", "track", "type"], ""))
        };
      })
      .filter(function (c) { return c.event; });
  }

  function normalizeWriteups(raw) {
    return arr(raw.writeups || raw.writeUps || raw.posts || raw.research)
      .map(function (w) {
        if (typeof w === "string") return { title: str(w), description: "", date: "", url: "" };
        return {
          title: str(pick(w, ["title", "name"], "")),
          description: str(pick(w, ["description", "summary"], "")),
          date: str(pick(w, ["date", "year", "published"], "")),
          url: str(pick(w, ["url", "link"], ""))
        };
      })
      .filter(function (w) { return w.title; });
  }

  function normalizeMeta(raw, fallback) {
    var m = raw.meta || {};
    return {
      templateId: str(pick(m, ["templateId", "template", "theme"], "")) || fallback || "template-18",
      published: !!(m.published || raw.published),
      slug: str(pick(m, ["slug", "username", "handle"], ""))
    };
  }

  /**
   * Normalise any CWLABS portfolio record into the canonical template shape.
   * Every field is guaranteed to exist (empty string / empty array when the
   * user has not supplied it) so templates can render without null checks.
   */
  function normalize(raw, fallbackTemplateId) {
    var data = raw || {};
    var out = {
      basics: normalizeBasics(data),
      links: normalizeLinks(data),
      skills: normalizeSkills(data),
      projects: normalizeProjects(data),
      experience: normalizeExperience(data),
      education: normalizeEducation(data),
      certificates: normalizeCertificates(data),
      achievements: normalizeAchievements(data),
      publications: normalizePublications(data),
      writeups: normalizeWriteups(data),
      ctf: normalizeCtf(data),
      meta: normalizeMeta(data, fallbackTemplateId)
    };

    // Derived convenience collections used by several templates.
    var groups = [];
    var byCat = {};
    out.skills.forEach(function (s) {
      var key = s.category || "Other";
      if (!byCat[key]) {
        byCat[key] = [];
        groups.push(key);
      }
      byCat[key].push(s);
    });
    out.skillGroups = groups.map(function (g) { return { category: g, skills: byCat[g] }; });

    // Newest-first experience (used by timeline templates).
    out.experienceSorted = out.experience.slice().sort(function (a, b) {
      return U.sortKey(b.startDate) - U.sortKey(a.startDate);
    });

    out.has = {
      basics: !!(out.basics.fullName || out.basics.role),
      photo: !!out.basics.profileImage,
      cover: !!out.basics.coverImage,
      links: !!(out.links.github || out.links.linkedin || out.links.website || out.links.twitter || out.links.other.length),
      skills: out.skills.length > 0,
      projects: out.projects.length > 0,
      experience: out.experience.length > 0,
      education: out.education.length > 0,
      certificates: out.certificates.length > 0,
      achievements: out.achievements.length > 0,
      publications: out.publications.length > 0,
      writeups: out.writeups.length > 0,
      ctf: out.ctf.length > 0
    };

    return out;
  }

  CW.adapter = { normalize: normalize, toStringList: toStringList };
})();
