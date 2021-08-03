# Leadout Capital Website

## Table of Contents

- [Contentful](#contentful)
  - [How to make changes](#how-to-make-changes)
  - [Publishing changes](#publishing-changes)
- [Netlify](#netlify)
  - [Updating API keys and other environment variables](#updating-api-keys-and-other-environment-variables)
  - [Building your site from Netlify](#building-your-site-from-netlify)
  - [Setting up a custom domain](#setting-up-a-custom-domain)

## Contentful

### How to make changes

Use [Contentful](https://app.contentful.com) to update text and image content on the website. The `Content Models` page
is preset &mdash; you probably won't need to change this unless you're making significant changes to the site. Most of
the content you'll be updating is under the `Content` page. You can filter your view by `Content type`, or simply
search for the field you're trying to update. Descriptions of each content model and how to use them is detailed under
`Content Models`.
To update a field, simply select it from the table in the center of the page. This will open a view where you can edit
any of the sections. Make sure to read field descriptions before updating content, since editing certain fields may cause
breaking changes in the site.

When updating longer text fields, you can apply formatting using **Markdown**. Contentful provides a cheatsheet for
Markdown, but you can also find one [here](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet).

### Publishing changes

To publish your changes, select the green `Publish` button on the right side of the page, under the `Status` section.
Once you've edited as many fields as you like, you can preview your changes in the site by selecting `Preview` from the
dropdown under `Netlify`, then selecting the blue `Build website` button. Wait for the site to build, then view it at
https://leadout-capital-preview.netlify.app. If you're satisfied with the changes, you can then publish your changes to
the production website by selecting `Production` from the dropdown and clicking `Build website`.

You can also trigger deploys straight from Netlify (see below), but this is not recommended unless you are altering the
website code or environment.

## Netlify

We are using [Netlify](https://app.netlify.com/teams/leadout-capital/overview) to stage and host the website. On the
dashboard for Leadout Capital, there should be two sites: `leadout-capital-production` and `leadout-capital-preview`.
As the names suggest, `leadout-capital-production` is used for the actual production site, while
`leadout-capital-preview` is used to preview changes before deploying to production.

*Note: You probably won't need to make changes on Netlify very often, since content changes are done on Contentful.
However, some potential use cases are listed below.*

### Updating API keys and other environment variables

The site uses environment variables to keep sensitive information, such as API keys, from being exposed to the public.
This includes API keys and tokens from Airtable and Contentful.

1. **Find your API key**: The site uses the following tokens:
   - `SPACE_ID`: This is the space ID for your workspace in Contentful. It is located in Settings > API keys,
     underneath the `Space ID` field.
   - `CONTENTFUL_ACCESS_TOKEN`: This is your private API token for accessing and delivering content to Contentful. It's
     also on Settings > API keys, under `Content Delivery API - access token`.
   - `AIRTABLE_API_KEY`: This is your personal Airtable API key, which is used to add content to tables in Airtable.
     It's located at https://airtable.com/account under the `API` section.
   - `AIRTABLE_BASE_ID`: The base ID is a unique identifier for your Airtable base. To find it, go to
     https://airtable.com/api and select your base (probably `Leadout Capital I - DEAL FLOW`) from the list of bases.
     The base ID is located in the third paragraph of the `Introduction`.
   - `DEAL_FLOW_TITLE` and `CATEGORY_TITLE`: The titles for your Deal Flow and Deal Flow Category tables. They should
     match exactly to the table titles that are displayed in Airtable (so make sure you change them if you've edited
     the table titles). As of writing, they should be `Deal Flow` and `Deal Flow Category` respectively.

2. **Edit the key in Netlify**:
   - Select a site (`leadout-capital-preview` or `leadout-capital-production`) to edit. This should bring you to the
     `Site overview` page for that website.
   - From the top menu, navigate to `Site settings`, then from the sidebar go to Build & deploy > Environment.
   - Select `Edit variables` and update your variables accordingly. ***Important: Do not change the variable keys. This
     will prevent the site from recognizing them.***

3. **Re-build the site**: You can either build the site from Contentful (see above) or directly from Netlify
   (see below).

*Note: The environment variables for the preview and production sites are managed separately.
While most of the variables should be same between the two sites, I'd recommend setting up a copy of the Deal Flow
base and providing the preview site with the ID of the new base. That way, you can edit and test the contact form
without adding to or otherwise altering the official deal flow data.*

### Building your site from Netlify

While you can build and deploy both sites from Contentful, there may be cases where you want to build it from Netlify
instead. Both methods of building are effectively the same.

- First, from the [Leadout Capital `Team overview` page](https://app.netlify.com/teams/leadout-capital/overview), select
  which site you want to build. This will bring you to the `Site overview` page for that website.
- Navigate to the `Deploys` page in the top menu. You should see a table with a list of previous deploys for the site.
- Select the `Trigger deploys` dropdown at the top of the table, then `Deploy site`.

### Setting up a custom domain

Don't set up your domain until you're ready to deploy your site to the [leadoutcapital.com](https://leadoutcapital.com)
domain.

- Go to your [domain management page](https://arugula-carrot-24ch.squarespace.com/config/settings/domains/leadoutcapital.com/managed-dns-settings)
  on SquareSpace.
- Under `Custom Records`, replace the rightmost column of the `www / CNAME` row (which currently reads
  `ext-sq.squarespace.com`) with your Netlify subdomain, `leadout-capital-production.netlify.app` (this can also be
  found under your Netlify site's
  [domain settings](https://app.netlify.com/sites/leadout-capital-production/settings/domain)).
- That's all! Once you update your CNAME record, it may take up to 24 hours for changes to propagate.

See the [Netlify documentation](https://docs.netlify.com/domains-https/custom-domains/configure-external-dns/) for more
detailed instructions. 

*If anything isn't working like it's supposed to, feel free to contact me at
[emily@sturman.org](mailto:emily@sturman.org).*