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

## Getting Started

If you never used CrossPost before, you'll need to configure it first:

```bash
crosspost configure
```

There will be a little interview to set up the connection to the different APIs.
Visit our step by step tutorials to set yourself up.

Navigate to the directory of your markdown article.

```bash
cd article/folder
```

## Need help

If you ever get stuck do this to get an overview over crosspost's capabilities:

```bash
crosspost help
```

Or do this to get details about a certain command:

```bash
crosspost article help
```

If you really really get stuck, reach out to us on twitter: @fullstackcoach

## Development setup

...

## Release History

- 1.0.0
  - Work in progress

## Contributing

...

## Caveats

- when you post an article with CrossPost, a configuration file gets created in
the same directory as your article. You'll need to store this file together with
your posts in order to keep using CrossPost.
- the integration relies on you keeping to make update to your posts via
CrossPost. If you make changes to your article content inside webflow, CrossPost
will overwrite them with the contents of your markdown file.
- your post has to start with a h1 title ('#'). It's a useful markdownlint
convention and CrossPost also relies on it to set the title of the posts correctly.
  - titles on webflow and dev.to will be automatically removed from the article
  body and will be set via the API.

### webflow

After publishing on webflow for the first time your article will be in Staged
mode. You will still need to make adjustments like setting your custom fields
images (integration for that is in the making) and a post summary.

When you update your posts, CrossPost will only update your article body and
your title (if you changed any of them).

Once your article is on webflow, you might encounter weird behavior inside the
webflow editor. For example, I can't see the ordered list and unordered list items
inside the editor, but it displays correctly in the published version. Since you
want to keep your article writing outside of webflow anyway, it shouldn't be too
big of a deal.

You will need to add something like prism to enable syntax highlighting (This
should not take more than a pomodoro to set up. Step by step tutorial is in the
making)

You may also want to add some extra CSS to your blog posts collection, e.g. to
add some extra top margin on headings (h1, h2, etc.).

### dev.to

As of now, with CrossPost your article will be published as a Draft. You will
still need to log in and perform some additional configurations, like:

- adding tags
- adding a header image
- switching the article from Draft to Published

Please let me know if you'd like us to add more configurations inside CrossPost
or feel free to issue a Pull Request ;)
