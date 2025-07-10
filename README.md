# siteify ✨

> Siteify HTML content

[Check out this `README` siteified](https://nirmal.meka.la/siteify)

## wtf

I’m constantly creating microsites. Leveraging the browser is my favorite
way to stand up quick utilities and the like. I wanted an easy way to
incorporate some basic navigation and themes across various microsites—to
be able to take some HTML content and _siteify_ it.

To that end, `siteify` uses Vite to create JS and CSS bundles that sites
can pull in to siteify their HTML content. The CSS contains four (!) base
themes—two dark and two light—which can easily be overridden to your
liking. The JS bundle (a modest 15kb at time of writing) contains a Preact
applet that injects itself as the header, providing a basic nav and theme
toggles.

## usage

### configure layout

Siteify expects the following page layout.

```
<body class="hidden">
  <div id="page">
    <main>
      <!-- CONTENT -->
    </main>
  </div>
</body>
```

The `hidden` class will be removed on page load (see below). The script
injects a `header` tag within `#page` above `main`. Consider `main` or its
direct descendent as the root if using a framework.

### add `script` and `style` tags

#### siteify css + js

Grab the siteify styles and Preact header applet via CDN:

```
<script
  type="module"
  crossorigin
  src="https://cdn.jsdelivr.net/gh/nirmal-mekala/siteify@cdn/siteify.js"
></script>
<link
  rel="stylesheet"
  crossorigin
  href="https://cdn.jsdelivr.net/gh/nirmal-mekala/siteify@cdn/assets/siteify.css"
/>
```

#### fonts

The theme uses the _Recursive_ font, available from Google fonts:

```
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Recursive:slnt,wght,CASL,CRSV,MONO@-15..0,300..1000,0..1,0..1,0..1&display=swap"
  rel="stylesheet"
/>
```

#### inline styles to aid initial load

To avoid a flash of unstyled content, create a `hidden` class inline and
apply it to the body (see above). `siteify.js` will remove it on page
load.

```
<style>
  body.hidden {
    visibility: hidden;
  }
</style>
```

#### optional: `highlight.js`

Code themes are designed to work with `highlight.js`. Grab the JS and CSS
for syntax highlighting. The link tag should go in the `head`, but the
script tags can go at the end of your `body` tag.

```
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/default.min.css"
/>
```

```
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/highlight.min.js"></script>
<script>
  hljs.highlightAll();
</script>
```

## todo

- [ ] `window.SITEIFY_CONFIG` !! - make header link text, hover text, URL,
      mode toggles, alt style class all configurable. keep defaults to make
      quickly standing up a site with defaults easy.
- [ ] breadcrumb support in header link?
- [ ] app (full) width for `#page` - adapt this layout to uses
      beyond just blog-like content
