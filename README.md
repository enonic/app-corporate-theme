# The Corporate Theme app

This is an app for [Enonic XP](https://www.enonic.com/) that lets you build your corporate website using a predefined set of components. We give you some handy content types, staff list, contact form (using ajax), menus, customizable footer, a nice slider for the frontpage, and many other nice features.

For additional features, check out the [Enonic Market](https://market.enonic.com/) and try apps like [Favicon](https://market.enonic.com/vendors/selbekk/io.selbekk.favicon), [SEO Meta Fields](https://market.enonic.com/vendors/enonic/com.enonic.app.metafields) - and many more - that goes great with this theme.

## Features

The Corporate Theme app is a responsive website developed based on Twitter Bootstrap 3. It can be used for building a corporate, small business, or startup, website. It has different features and looks good on all devices. It is also customizable and you can change the content and design of the pages based on your needs by using reusable and configurable Enonic XP components like layouts and parts.

### Dependencies

* **Bootstrap 3** - 3.3.7
* **jQuery 1** - 1.12.4
* **Font Awesome 3** - 3.2.1
* **jquery SlitSlider** 1.2.0 from codrops (depends on *modernizr 2.6.2* and *ba-cond plugin*)

All dependencies are bundled with the project.

### Based on Shapebootstrap Theme Nova

We’ve based the design on the theme called [Nova from Shapebootstrap](https://shapebootstrap.net/item/1524969-nova-multipurpose-site-template). However, we have upgraded it from Bootstrap 2 to 3, and from an old version of jQuery to the latest 1.x-version. Upgrading even further is currently not needed. We’ve also adapted all the components to work with Enonic XP, with full configuration from the Content Studio admin interface. The rights to adapt this theme have been given by the friendly staff at Shapebootstrap.

Please check [the original theme on Shapebootstrap](https://shapebootstrap.net/item/1524969-nova-multipurpose-site-template).

## Demo website included

By installing the app in Enonic XP, a demo site will be created automatically. It shows the use of all the different components and can work as an inspiration for how you can build your very own site, from scratch. But feel free to customize the demo site to your own liking too.

### Generate new demo sites

Protip: If you happen to want to start over, just delete your site (or rename its `path`) and then go to the Application admin tool in Enonic XP and stop the app, then start the app again. This will run the initialization script once more and generate a new demo-site for you!

**TODO: Proof read from here:**

## Site configuration

The app is added to a site and gives you some settings from the edit screen of your site in Content Studio. These settings lets you set logo, footer text, social media links, company address, and many more things.

### Layout

The app has two layouts. A layout is used to split a page into structured columns. Without a layout component in place, any other component will fill the entire width of the page. We have a one column and a two column layout in this app. The two column layout has a setting for the width of left and right columns. It can be 30-70, 50-50 or 70-30 percent.

### Templates

Templates are already setup in the demo website. They are used to display the content you view and create. It has a preselected and preconfigured set of components. Find them in the site's "Templates" folder.

### Content

Content can be created in different ways.

Mostly they come from the Part’s settings. Some parts have setting that makes them configurable. What you fill in these forms are shown on website pages.

For creating portfolio, service and employee you need to create new content for each type. These content types are predefined. You can create them by selecting the specific type in the create new content wizard in Content Studio. Fill in the form and save draft to see a handy preview to the right.

Contact information and footer texts comes from the site configuration, described earlier.

You can also use the builtin Text Component in Content Studio edit mode to add free form HTML to any page.

### Parts

There are various parts that can be used directly on pages. Each part serve a particular purpose. Here's a list of all available parts in The Corporate Theme app:

**About**: This part is used for the "About us" page. It lets you select employee content that you have already created and  want to show on this page.

**Button**: This part creates a button. Button text, background color and url to external source or link to a page can be specified in part setting.

**Contact**: The contact part includes a form so that users can send an email to you. The values of receiver email address and the description text are set in the part settings. In addition to receiver email address, mail server configuration should be set up for Enonic XP. More detail about this are explained in Mail configuration section further down in this readme.

**Partner**: A simple part that has a setting for title and short introduction about the section. You are allowed to select or upload up to 4 images/logos of partners.

**Portfolio - List all**: Portfolio part is used in Portfolio page and shows the list of all portfolios content that's already been created. There are no settings for this part.

**Portfolio - List selected**: This part shows a list of selected portfolios on the front page. A title and introduction can be added to the part settings.

**Service - List all**: This part has no settings but fetches all content of type service and shows a list of them.

**Service - List selected**: This part displays a list of selected services on the front page. Setting a title and introduction is also available for this part.

**Slider**: Shows slider images on home page. You can use the setting to select images, and specify titles, link and background color for each image. If a link is added (as external URL or link to internal content) a button will be displayed. Best effect is given if you use transparent PNG-images with colorful backgrounds added with the part settings.

### Mail configuration

The mail server that is used for sending email messages needs to be configured. Enonic XP ships with mail capabilities, as long as you configure them first. Find the configuration file in `$XP_HOME/config/com.enonic.xp.mail.cfg` and configure it as so:

```
smtpHost=smtp.gmail.com
smtpPort=587
smtpAuth=true
smtpUser=xxxx@example.com
smtpPassword=xxxx
smtpTLS=true
```

This is if you want to use your own Gmail account for sending emails. Replace the example username and password with your own details. When using this in production you would need to set up a dedicated SMTP server.

## Copyright

[Shapebootstrap](https://shapebootstrap.net/) designed and developed this theme. We adapted its HTML and CSS to use Bootstrap 3. We also upgraded all the different modules to become Enonic XP components, configurable. For this all HTML was moved into self containing components, back-end JavaScript fetches the data while Thymeleaf is used to display it.

The theme was adapted and used with approval from the original author.

## Compatibility

| Version       | XP version |
| ------------- | ---------- |
| 1.0.0         | 6.11      |

## Changelog

### 1.0.0

* Initial release
