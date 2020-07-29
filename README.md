# Webflow Blog Integration for Developers

> Write your developer article once, distribute everywhere

Using this tool you will be able to write your developer article in markdown
using your favorite editor and automatically push it to webflow and dev.to.

So far codementor.io and Medium don't offer an API to create articles, so that
you'll need to follow a few more manual steps to import your articles there
(see the complete [fullstack.coach](https://fullstack.coach) blog writing
tutorial for the necessary steps).

## Use Cases

- Host your blog in webflow, dev.to and GitHub: write markdown once, push to all
platforms with a single command! 🚀
- Want to write your blog in markdown but host in on Webflow? One command! 🚀
- Want to keep your blog on dev.to, but version control at GitHub? Yeah, you've
guessed it, it's 1 command!

## Installation

...

## Usage example

...

## Development setup

...

## Release History

* 1.0.0
  * Work in progress

## Contributing

...

## Caveats

- the integration relies on you keeping to make update to your posts via
CrossPost. If you start making the changes on your posts directly on the platforms
(e.g. changes on the contents, slugs etc.) you will most probably encounter inconsistencies.
- your post has to start with a h1 title ('#'). It's a useful markdownlint convention and CrossPost also relies on it to set the title of the posts correctly.

### webflow

Once your article is on webflow, you might encounter weird behavior inside the
webflow editor. For example, I can't see the ordered list and unordered list items
inside the editor, but it displays correctly in the published version. Since you
want to keep your article writing outside of webflow anyway, it shouldn't be too
big of a deal.

You will need to add something like prism to enable syntax highlighting.

You may also want to add some extra CSS to your blog posts collection, e.g. to
add some extra top margin on headings (h1, h2, etc.).
