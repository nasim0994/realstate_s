import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { URL } from "url";

const PORT = 3500;
const FRONTEND_URL = "https://realstate.devnasim.xyz";
const BACKEND_URL = "https://api.realstate.devnasim.xyz";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🔹 Detect all JS/CSS bundles from manifest.json
function getBundlesFromManifest() {
  const manifestPath = path.join(__dirname, "../dist/.vite/manifest.json");

  if (!fs.existsSync(manifestPath)) {
    console.warn("⚠️ manifest.json not found");
    return { js: [], css: [] };
  }

  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));

  const js = new Set();
  const css = new Set();

  // Find entry file (index.html or main entry)
  let entryKey =
    Object.keys(manifest).find((k) => k.includes("index.html")) ||
    Object.keys(manifest).find((k) => manifest[k].isEntry);

  if (!entryKey) {
    console.warn("⚠️ No entry found in manifest.json");
    return { js: [], css: [] };
  }

  function collect(key) {
    const entry = manifest[key];
    if (!entry) return;

    if (entry.file && entry.file.endsWith(".js")) {
      js.add("/" + entry.file);
    }

    if (entry.css) {
      entry.css.forEach((c) => css.add("/" + c));
    }

    if (entry.imports) {
      entry.imports.forEach((imp) => collect(imp));
    }
  }

  collect(entryKey);

  return {
    js: Array.from(js),
    css: Array.from(css),
  };
}

const bundles = getBundlesFromManifest();

// 🔹 Render HTML with full SEO/meta
function renderHTML({ meta }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${meta.title || ""}</title>
<meta name="description" content="${meta.description || ""}">
<meta name="keywords" content="${meta.keywords || ""}">
<meta name="author" content="${meta.author || ""}">
<meta name="designer" content="${meta.designer || ""}">
<meta name="subject" content="${meta.subject || ""}">
<meta name="copyright" content="${meta.copyright || ""}">
${meta.facebookDomainVerification ? `<meta name="facebook-domain-verification" content="${meta.facebookDomainVerification}">` : ""}
${meta.googleSiteVerification ? `<meta name="google-site-verification" content="${meta.googleSiteVerification}">` : ""}

<!-- Open Graph -->
<meta property="og:title" content="${meta.title || ""}">
<meta property="og:description" content="${meta.description || ""}">
<meta property="og:image" content="${meta.image || ""}">
<meta property="og:type" content="website">
<meta property="og:url" content="${meta.url || ""}">

<!-- Twitter -->
<meta name="twitter:title" content="${meta.title || ""}">
<meta name="twitter:description" content="${meta.description || ""}">
<meta name="twitter:image" content="${meta.image || ""}">
<meta name="twitter:card" content="summary_large_image">

${bundles.css.map((href) => `<link rel="stylesheet" href="${href}">`).join("\n")}

${bundles.js.map((src) => `<script type="module" src="${src}"></script>`).join("\n")}

${
  meta.googleTagManager
    ? `
<script>
(function(w,d,s,l,i){
  w[l]=w[l]||[];
  w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
  var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),
      dl=l!='dataLayer'?'&l='+l:'';
  j.async=true;
  j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
  f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${meta.googleTagManager}');
</script>
`
    : ""
}
</head>
<body>
${meta.googleTagManager ? `<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${meta.googleTagManager}" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>` : ""}
<div id="root"></div>
</body>
</html>`;
}

// 🔹 Serve static files
function serveStatic(filePath, res, contentType) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    res.writeHead(200, { "Content-Type": contentType || "text/html" });
    res.end(data);
  });
}

// 🔹 HTTP Server
const server = http.createServer(async (req, res) => {
  const protocol = req.headers["x-forwarded-proto"] || "http";
  const reqUrl = new URL(req.url, `${protocol}://${req.headers.host}`);
  const pathname = reqUrl.pathname;

  // 🔹 Serve assets
  if (pathname.startsWith("/assets/")) {
    const filePath = path.join(__dirname, "../dist", pathname);
    const ext = path.extname(filePath);
    let contentType = "text/plain";
    if (ext === ".js") contentType = "application/javascript";
    else if (ext === ".css") contentType = "text/css";
    serveStatic(filePath, res, contentType);
    return;
  }

  // 🔹 Serve images
  if (pathname.startsWith("/images/")) {
    const filePath = path.join(__dirname, "../dist", pathname);
    let contentType = "image/jpeg";
    if (filePath.endsWith(".png")) contentType = "image/png";
    else if (filePath.endsWith(".webp")) contentType = "image/webp";
    serveStatic(filePath, res, contentType);
    return;
  }

  // 🔹 Project OG Route
  if (pathname.startsWith("/project/")) {
    const slug = pathname.replace("/project/", "");
    let html;
    try {
      const apiRes = await fetch(`${BACKEND_URL}/api/project/slug/${slug}`);
      const productRes = await apiRes.json();
      const product = productRes.data;

      const plainDescription = product?.description
        ? product.description.replace(/<[^>]+>/g, "")
        : "";

      const metaDescription =
        plainDescription.length > 160
          ? plainDescription.slice(0, 157) + "..."
          : plainDescription;

      html = renderHTML({
        meta: {
          title: product?.title,
          description: metaDescription,
          image: product?.thumbnail
            ? `${BACKEND_URL}${product.thumbnail}`
            : "/images/logo.png",
          url: `${FRONTEND_URL}/project/${slug}`,
          keywords: product?.keywords,
          author: product?.author,
          designer: product?.designer,
          subject: product?.subject,
          copyright: product?.copyright,
          facebookDomainVerification: product?.facebook_domain_verification,
          googleSiteVerification: product?.google_site_verification,
          googleTagManager: product?.google_tag_manager,
        },
      });
    } catch (err) {
      console.error("Project API failed:", err);
      html = fs.readFileSync(
        path.join(__dirname, "../dist/index.html"),
        "utf-8",
      );
    }
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(html);
    return;
  }

  // 🔹 Blog OG Route
  if (pathname.startsWith("/blog/")) {
    const slug = pathname.replace("/blog/", "");
    let html;
    try {
      const apiRes = await fetch(`${BACKEND_URL}/api/blog/slug/${slug}`);
      const blogRes = await apiRes.json();
      const blog = blogRes.data;

      const plainDescription = blog?.description
        ? blog.description.replace(/<[^>]+>/g, "")
        : "";

      const metaDescription =
        plainDescription.length > 160
          ? plainDescription.slice(0, 157) + "..."
          : plainDescription;

      html = renderHTML({
        meta: {
          title: blog?.title,
          description: metaDescription,
          image: blog?.thumbnail ? `${BACKEND_URL}${blog.thumbnail}` : "",
          url: `${FRONTEND_URL}/blog/${slug}`,
          keywords: blog?.keywords,
          author: blog?.author,
          designer: blog?.designer,
          subject: blog?.subject,
          copyright: blog?.copyright,
          facebookDomainVerification: blog?.facebook_domain_verification,
          googleSiteVerification: blog?.google_site_verification,
          googleTagManager: blog?.google_tag_manager,
        },
      });
    } catch (err) {
      console.error("Blog API failed:", err);
      html = fs.readFileSync(
        path.join(__dirname, "../dist/index.html"),
        "utf-8",
      );
    }
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(html);
    return;
  }

  // 🔹 General SEO fallback
  let html;
  try {
    const seoRes = await fetch(`${BACKEND_URL}/api/seo`);
    const seoData = await seoRes.json();
    const seo = seoData.data;

    html = renderHTML({
      meta: {
        title: seo?.title,
        description: seo?.description,
        image: seo?.ogImage ? `${BACKEND_URL}${seo.ogImage}` : "",
        url: `${FRONTEND_URL}${pathname}`,
        keywords: seo?.keywords,
        author: seo?.author,
        designer: seo?.designer,
        subject: seo?.subject,
        copyright: seo?.copyright,
        facebookDomainVerification: seo?.facebook_domain_verification,
        googleSiteVerification: seo?.google_site_verification,
        googleTagManager: seo?.google_tag_manager,
      },
    });
  } catch (err) {
    console.error("SEO API failed:", err);
    html = fs.readFileSync(path.join(__dirname, "../dist/index.html"), "utf-8");
  }

  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(html);
});

// 🔹 Start server
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
