# Bootstrap Corporate Theme app

This is an app for Enonic XP that lets you build your corporate website using a predefined set list of components. We give you a set of handy content types, staff list, contact form (using ajax), menus, customizable footer, a very nice slider for the frontpage, and many other nice features.

## Features

The Bootstrap Corporation Theme app is a responsive multi-purpose bootstrap theme website developed based on Twitter Bootstrap 3.3.7. It can be used for building a corporate, small business, or startup, website. It has different features and looks perfect on all devices. It is also customizable and you can change the content and design of the pages based on your needs by using reusable and configurable Enonic XP components like layouts and parts.

### Other features

Using the latest **Bootstrap 3** (3.3.7)
Using **Font Awesome** 3.2.1
Using **jquery SlitSlider** 1.2.0 from codrops (depends on modernizr 2.6.2 and ba-cond plugin)
Using **latest 1.x of jquery** - jQuery 1.12.1

### Based on Shapebootstrap Theme Nova

We’ve based the design on the theme called Nova from Shapebootstrap. However, we have upgraded it from Bootstrap 2 to 3, and from an old version of jQuery to the latest 1.12-version. Upgrading even further is currently not needed. We’ve then adapted the files to work as an Enonic XP app, with full configuration from our admin interface - the content studio.

Please check the original theme on Shapebootstrap. https://shapebootstrap.net/item/1524969-nova-multipurpose-site-template

## Demo website included

By installing the app in Enonic XP a demo site will be created automatically. It shows the use of all different parts and can work as an inspiration to how you can build your very own site, from scratch, if you like. But feel free to customize the demo site to your own liking.

### Generate new demo sites

Protip: If you happen to want to start over, just delete your site (or rename its `path`) and then go to the Application admin tool in Enonic XP and stop then start the app again. This will run the initialization script again and generate a new demo-site for you!

**TODO: Proof read from here:**

## Site configuration
Site configuration has a form including site logo and content for footer. Footer has fields for contact information and links to site pages. It also includes two optional free text field.

### Layout
App has two layouts. One column and two columns layouts. Two column layout has a setting that determine the width for left and right columns. It can be 30-70, 50-50 or 70-30 percent.

### Templates
There are two page templates for this app. One is used for pages and the other for making service.

### Content
Content can be created in different ways.

Mostly they come from Part’s setting. Some parts have setting that makes them configurable. What you fill in these forms are shown on website pages.

For creating portfolio, service and employee you need to create each type. These content types are predefined. You can create them by selecting the specific type and fill the form. These content will be later shown throw parts.

Contact information and footer texts are from site setting. In edit mode of your site (site content) click the pencil icon in the "Corporation theme" block under the "Applications" label and edit the form with related content.

You can also use Text component from “Show inspection panel” if the content is only text.

### Parts
There are various parts that can be used directly on pages. Each part serve a particular purpose. Here you can find list of all available parts in Corporation app:

About**: This part is used for “About us” page. It has a setting for introduction text and tile, in addition you can select employees content that you have already created and  want to show on this page.

**Button**: This part creates a button. Button text, background color and url to external source or link to a page can be specified in part setting.

**Contact**: The contact part includes a form so that user can send message. The values of receiver email address and the description text are set in the part setting. In addition to receiver email address, mail configuration should be updated with correct values. More detail about it are explained in Mail configuration section.

**Partner**: This part has a setting for title and short introduction about this section. You are allowed to select or upload up to 4 images/ logos of partners.

**Portfolio - List all**: Portfolio part is used in Portfolio page and shows the list of all portfolios content that already have been created. There is no setting for this part.

**Portfolio - List selected**:  This part shows a list of selected portfolios in front page. A title and introduction can be added to part setting as well.

**Service - List all**: Service part has no setting and fetches all service types and shows list of them.

**Service - List selected**: This part displays a list of selected services in front page. A title and introduction is also available for this part.

**Slider**: Shows slider images in home page. You can use the setting to select images, and specify titles, external url and background color for each image.

### Mail configuration
The mail server that is used for sending email messages needs to be configured. Find configuration file in `$XP_HOME/config/com.enonic.xp.mail.cfg` and configure it as so:

```
smtpHost=smtp.gmail.com
smtpPort=587
smtpAuth=true
smtpUser= xxxx@example.com
smtpPassword=xxxx
smtpTLS = true
```

This is if you want to use your own Gmail account for sending emails. When using this in production you would need to set up a dedicated SMTP server.

## Copyright
**TODO: Copyright stuff .. or info about the original theme source:**
**TODO: Used with approval from original author. Reference the email.**
https://shapebootstrap.net/item/1524969-nova-multipurpose-site-template

## Compatibility

| Version       | XP version |
| ------------- | ---------- |
| 1.0.0         | 6.10      |

## Changelog

### 1.0.0

* Initial release
