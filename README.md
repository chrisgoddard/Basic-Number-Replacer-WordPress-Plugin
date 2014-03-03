Basic-Number-Replacer-WordPress-Plugin
======================================

Basic WordPress plugin for replacing all (or some) phone numbers on a page based on URL parameters.

This plugin uses Advanced Custom Fields (http://www.advancedcustomfields) with the Repeater and Options Page add on (both paid add-ons) for the plugin UI.

Plugin supports multiple numbers for campaigns based on source (Google, Bing, Twitter, Facebook). Could easily be extended to offer more.

The options are outputted into a <script> tag in the footer with a JSON object that is used as a reference, then, if a URL with the correct parameters (i.e. www.domain.com/landing-page/?source=google&campaign=campaign_name) is used, either all numbers on the page will be replaced, or, if a selector has been defined, all numbers that fall within an element with the declared class will be replaced.

User is cookied so all subsequent pages will have same replacement action occur.

Thanks to Scott Hamper for Cookies.js https://github.com/ScottHamper/Cookies (for cookie handling) and Websanova for js-url https://github.com/websanova/js-url (for URL parsing).
