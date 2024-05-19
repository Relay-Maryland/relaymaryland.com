# RelayMaryland.com

## Local development

### System dependencies

1. Node.js
2. npm (Node package manager - comes bundled with Node.js)

#### Install Node.js

There are multiple ways to install Node.js. Homebrew is nice and easy, and allows you to update over time. There is also an official installer provided from the Node.js website.

##### Via Homebrew

```sh
# Install the latest version of Node.js
brew install node
```

##### Via official installer

1. Go to https://nodejs.org/ and click the 'Download Node.js' button
2. Double-click the downloaded file and follow the installer instructions

#### Verify Node.js is in the environment

```sh
# Verify Node.js
node -v

# Verify npm
npm -v
```

### Install project dependencies

Use npm to install the dependencies listed in ./package.json.

This step is only needed when spinning up the project for the first time and when dependencies change.

```sh
# Install dependencies
# Ran from project root
npm install
```

### Run the development server

Use npm to run the site locally in development mode, so that changes to the code are reflected immediately in the browser.

```sh
# Run the development server at http://localhost:4321/
# Ran from project root
npm run start
```

The `start` script is defined in the `scripts` section of ./package.json.

### Build the website for production

Build the site into a set of static files that can be easily hosted on any server.

Cloudflare is the current host for relaymaryland.com, and is configured to run the following command on every push to the `main` branch. As such there's not very much need to run this command locally, but it's good to know about it.

```sh
# Build the site which is written to ./dist/
# Ran from project root
npm run build
```

The `build` script is defined in the `scripts` section of ./package.json.

## Organization and concepts

### Regarding the /src/ directory

- every page is represented by a file in src/pages/
- these files should be readable, and editable to some extent, by JP
- src/components are where the complexity should lie; so that when a page is complex, the file in src/pages points to complexity elsewhere (so in the case of the news/index.html, it points to a layout which points to components)
- the home page is different from the rest of the system in that the home page is a multi-section page and has more fancy stuff going on given the various sections.
  - the way i'm leaving
- The src/components/ structure should look like:
  - SVG/ (maybe not)
  - Nav/
  - Homepage/
  - SiteHeader
  - SiteFooter
    - svgs
    -
  - RIAPage/
  - NewsPage/
  - Media/
    - Youtube
    - GDrivePDFEmbed
  - CalendarFeed
  - NewsFeed
    - separate out the components from the current src/components/NewsPage/
- Clean up color
- Add frontmatter to calendar yaml:
  - change date to publish_date
