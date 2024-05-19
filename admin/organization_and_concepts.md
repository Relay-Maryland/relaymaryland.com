# Organization and concepts

# Regarding the /src/ directory

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
