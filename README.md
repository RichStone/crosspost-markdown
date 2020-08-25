# Markdown Blog Integration for Developers

> Write your developer article once in markdown, distribute on webflow, dev.to,
GitHub, Medium & codementor.

At the moment, with CrossPost you will be able to write your developer article
in markdown using your favorite editor and automatically push it to webflow and
dev.to.

Check out the full tutorial
[fullstack.coach](https://fullstack.coach/post/how-to-write-and-cross-post-your-markdown-content)
to get yourself started to write your content in markdown and to configure your
top notch IWE (Integrated Developer Environment)

So far codementor.io and Medium don't offer an API to create articles, so that
you'll need to follow a few more manual steps to import your articles there (see
the complete [fullstack.coach](https://fullstack.coach) blog writing tutorial
for the necessary steps).

## Use Cases

- Host your blog in webflow, dev.to and GitHub: write markdown once, push to all
  platforms with a single command! 🚀
- Want to write your blog in markdown but host in on Webflow? One command! 🚀
- Keep your markdown between webflow and dev.to in sync. 1 cmd.
- Want to keep your blog on dev.to, but version control and open source it in
  GitHub? Yeah, you've guessed it, 1 command!

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
Visit our step by step tutorial at [fullstack.coach](fullstack.coach) to set
yourself up in more detail.

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

That's the brute force way, I've just come up with. There is certainly a more
elegant way to do that 🙈.

1. Fork this repo
1. Clone to your local machine
1. If you have CrossPost already installed from remote NPM run `npm uninstall
   crosspost -g`
1. `cd into/cloned/repo`
1. `npm install -g` (will install the local version globally) Now you can do
   your changes on the source code and see their impact when running `~
   crosspost`
1. Push your changes to your remote repository
1. Issue a PR towards this repo

Thank you!

## Release History

- 1.0.0
  - Work in progress
- 1.1.0
  - First version: granularly configurable and with Webflow & dev.to integrated
- 1.1.1 Updated the README.md to a workable state
- 1.1.2 Fixed bug that articles are always created even when they should just be
  updated
- 1.1.3 Adjusted README & added reference to the full documentation guide

## CrossPost Caveats & Configurations

Please keep in mind that it's an early version of CrossPost, so that bugs might
not be ruled out and some stuff might still not be documented.

Speaking of documentation, you will also need to perform some setup steps
described over at
[fullstack.coach](https://fullstack.coach/post/how-to-write-and-cross-post-your-markdown-content),
especially when it comes to configuring webflow to accept and display your
markdown articles (webflow does not work with markdown out of the box).

Carefully read the webflow/dev.to configurations and caveats sections from [this
comprehensive documentation
post](https://fullstack.coach/post/how-to-write-and-cross-post-your-markdown-content).
You may also find other cool technical blogging stuff there, by the way.
