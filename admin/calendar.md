# Calendar notes

I started out thinking each cal entry is a markdown page with frontmatter and content.

Now I'm thinking about streamlining the data from files to a Yaml file, with more restrictions around the cal entries, namely there is less room for arbitrary amounts of text, and instead the calendar feed looks more like the prior art image that includes a time, a location, and a title next to the date, everything but title and date would be optional.

This data would have a smaller footprint, from a file per event, to a single yaml file.

A cli tool could be built to auto add cal entries to the yaml file for easy cli adding by JP.

This approach seems the best route at the current time.

Actually...the 1event:1file approach was from expecting to lean into Astro's Content Collections. To switch to a data type collection would still require 1 file per event, it would just be a yaml file instead.

So I think the approach is to go with JSON data in src/data. Astro supports importing json but not yaml in Astro components, so we will go with json even though I'd prefer to go with yaml for this case of human interaction. However, the cli tool can assit in this manner, providing a yaml-like authoring experience.

OK, going to go with Content Collections, but going to change the calendar collection type from 'content' to 'data' and have a yaml file per event. The reason is there is already zod validation built-in to Astro Content Collections. Zod requires TypeScript, and since I'm not using it, it would take a lot more rabbit holes for me to figure out TS to figure out Zod in order to have a src/data/calendar.json. Instead at this moment, I'm going to split the diff, use data Content Collection with a yaml file per event, and use Zod for validation.
