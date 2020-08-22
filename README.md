# Markdown Blog Integration for Developers

> Write your developer article once in markdown, distribute on webflow, dev.to,
GitHub, Medium & codementor.

At the moment, with CrossPost you will be able to write your developer article in markdown
using your favorite editor and automatically push it to webflow and dev.to.

Check out the full tutorial [fullstack.coach](https://fullstack.coach) to get yourself started to write your content in markdown and to configure your top notch
IWE (Integrated Developer Environment)

So far codementor.io and Medium don't offer an API to create articles, so that
you'll need to follow a few more manual steps to import your articles there
(see the complete [fullstack.coach](https://fullstack.coach) blog writing
tutorial for the necessary steps).

## Use Cases

- Host your blog in webflow, dev.to and GitHub: write markdown once, push to all
platforms with a single command! 🚀
- Want to write your blog in markdown but host in on Webflow? One command! 🚀
- Keep your markdown between webflow and dev.to in sync. 1 cmd.
- Want to keep your blog on dev.to, but version control and open source it in GitHub? 
Yeah, you've guessed it, 1 command!

## Installation

```bash
~ npm install -g crosspost
```

## Getting Started

If you never used CrossPost before, you'll need to configure it first:

```bash
~ crosspost configure
```

There will be a little interview to set up the connection to the different APIs.
Visit our step by step tutorial at [fullstack.coach](fullstack.coach) to set yourself up.

Navigate to the directory of your markdown article.

```bash
~ cd articles/folder
```

Push an article to webflow and dev.to in one go:

```bash
~ crosspost article your-article.md
```

## Need help

If you ever get stuck do this to get an overview over crosspost's capabilities:

```bash
~ crosspost --help
```

Or do this to get details about a certain command:

```bash
~ crosspost article help
```

If you really really get stuck, create an Issue on GitHub or reach out to me :)

## Contributing

That's the brute force way, I've just come up with. 
There is certainly a more elegant way to do that 🙈.

1. Fork this repo
1. Clone to your local machine
1. If you have CrossPost already installed from remote NPM
run `npm uninstall crosspost -g`
1. `cd into/cloned/repo`
1. `npm install -g` (will install the local version globally)
  Now you can do your changes on the source code and see their
  impact when running `~ crosspost`
1. Push your changes to your remote repository
1. Issue a PR towards this repo

Thank you!

## Release History

- 1.0.0
  - Work in progress
- 1.1.0
  - First version: granularly configurable and with Webflow & dev.to integrated
- 1.1.1
  Updated the README.md to a workable state

## Caveats

- When you post an article with CrossPost, a configuration file gets created in
the same directory as your article. You'll need to store this file together with
your posts in order to keep using CrossPost because consistency can only be achieved
if CrossPost knows about the article IDs on the different platforms.
- The integration relies on you keeping to make update to your posts via
CrossPost. If you make changes to your article content inside webflow, CrossPost
will overwrite them with the contents of your markdown file on the next publish.
- Your post has to start with a h1 markdown title ('#'). It's a useful markdownlint
convention and CrossPost also relies on it to set the title of the posts correctly.
  - Titles on webflow and dev.to will be automatically removed from the article
  body and will be set via the API.

### webflow

You will need to perform a few small setup steps described over at
[fullstack.coach](fullstack.coach) to configure webflow to accept your
markdown articles (webflow does not work with markdown out of the box).

Carefully read the Webflow configurations and Caveats sections from [this instructional
blog post](https://fullstack.coach).

### dev.to

As of now, with CrossPost your article will be published as a Draft. You will
still need to log in and perform some additional configurations, like:

- adding tags
- adding a header image
- switching the article from Draft to Published

Please let me know if you'd like us to add more configurations inside CrossPost
or feel free to issue a Pull Request ;)
