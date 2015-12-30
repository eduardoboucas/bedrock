# Bedrock

> An opinionated foundation for front-end projects

## Table of contents

- 1. [Introduction](#1-introduction)
- 2. [Core principles](#2-core-principles)
- 3. [Atomic design](#3-atomic-design)
- 4. [HTML](#4-html)
- 5. [CSS](#5-css)
    - 5.1. [General principles](#51-general-principles)
    - 5.2. [Sass](#52-sass)
    - 5.3. [PostCSS](#53-postcss)
    - 5.4. [Responsive web design](#54-responsive-web-design)
- 6. [JavaScript](#6-javascript)
- 7. [Other guidelines](#7-other-guidelines)
- 8. [Build tools](#8-build-tools)

---

## 1. Introduction

**Bedrock is** a lightweight skeleton of SCSS and JavaScript files that give developers a basic set of functionality to bootstrap a front-end project

**Bedrock is** also a compendium of development guidelines that promote development best practices, standards and maintainability principles, with a focus on code quality and consistency.

**Bedrock is not** comprehensive. It does not attempt to replace documents like [CSS Guidelines](http://cssguidelin.es/) or [Sass Guidelines](http://sass-guidelin.es/). Its development standards and best practices are heavily inspired on those and other referenced sites in the industry, but Bedrock is ultimately tailored to the business needs and the nature of the engineering team at DADI+.

## 2. Core principles

1. **Documentation**: The codebase must be accessible and understandable to all developers, regardless of their familiarity with the project. The documentation is the first point of contact to any new developer, so ensuring it includes all the information necessary (e.g. dependencies, installation and deployment instructions) is crucial.

1. **Searchability and visibility**: It's important that any developer can quickly find the code — all instances of it — that generates or affects a particular element in the project. This allows for quicker and more effective debugging.

    For example, declaring a selector like `.block__element` is search-friendly, while nesting `&__element` inside `.block` is not. When using a pre-processor like Sass, including a source map file is also a massive help for debugging.
    
1. **Modularity**: Developers should try as hard possible to think of modular, reusable and interoperable components rather than pages. This philosophy can be reflected in all phases of the project lifecycle and deliverables, from API designs to HTML markup and CSS.    
    
1. **Best practices and standards**: A constant effort should be made to enforce development best practices, especially as they almost always generate gains in areas like quality, performance and accessibility.
    
    In an industry that is constantly changing and where new platforms and paradigms tempt developers with exciting cutting-edge features, following the standards seems like the most reasonable approach to reduce technical debt and to ensure the code we ship has a healthy lifecycle.

1. **Automation**: Humans are very good at abandoning implemented processes if they require too much laborious or repetitive interaction. Plus, they make mistakes. To mitigate that, processes and tools should be automated whenever possible, from documentation generation, to front-end build tools or integration and deployment.

## 3. Atomic design

The term Atomic Design, coined by [Brad Frost](http://bradfrost.com/blog/post/atomic-web-design/), is a methodology for creating design systems and defines five levels of abstraction:

1. **Atoms**: Atoms are the basic building blocks of matter. Applied to web interfaces, atoms are our HTML tags, such as a form label, an input or a button;
2. **Molecules**: Molecules are groups of atoms bonded together and are the smallest fundamental units of a compound;
3. **Organisms**: Organisms are groups of molecules joined together to form a relatively complex, distinct section of an interface;
4. **Templates**: Templates consist mostly of groups of organisms stitched together to form pages;
5. **Pages**: Pages are specific instances of templates.

While it's not always possible to use these terms when communicating with clients (they typically want to see pages, not buttons or headings), it's always possible for a team of developers and designers to use this methodology internally. When coupled with BEM, it promotes the creation of individual, modular and extensible components rather than monolithic pages.

## 4. HTML

> HTML is the interface, CSS is just the branding. "Semantic classes" are for developers, semantic HTML is for users — [Heydon Pickering](https://fronteers.nl/congres/2014/sessions/heydon-pickering-getting-nowhere-with-css-best-practices)

HTML must be written independently of any styling or scripting language that may interact with it. The markup must make sense semantically and should generate a page that respects the structure and nature of the information it conveys, even without any style sheet applied.

To ensure the styling is truly decoupled from the markup, you should be able to replace an element's tag with an equivalent without it affecting the way it looks on the page.

HTML5 elements such as `<main>`, `<nav>`, `<aside>` or `<article>` are a great way to describe the structure of a page in a semantic way. To make the interfaces accessible, these should be paired with ARIA features like the `role` attribute whenever applicable. [This page](https://developer.mozilla.org/en-US/docs/Web/HTML/Element) is a good reference for all the existing HTML elements.

## 5. Style sheets

### 5.1. General principles

To enforce principles of modularity and scope in the otherwise *unnamespaced* CSS, Bedrock uses [BEM](https://en.bem.info/). BEM is simply a naming convention for CSS classes, implementing the following three concepts:

- **Block**: A logically and functionally independent page component, the equivalent of a component in Web Components;
- **Element**: A constituent part of a block that can't be used outside of it;
- **Modifier**: A BEM entity that defines the appearance and behavior of a block or an element (optional).

To enforce this philosophy and to ensure it properly protects elements against unwanted side effects, Bedrock promotes the following practices.

#### 5.1.1. CSS selectors must contain only classes

> Strict BEM conventions require the sole use of class selectors. You start with a global reset, and then you use blocks to style everything on the page. In other words, adding a class to an element is the only way to style it, which means all styling is opt-in rather than de facto — [Phil Walton](http://philipwalton.com/articles/side-effects-in-css/)

HTML tags should be chosen based on the role that an element plays in the content structure and hierarchy within a document — styling should have nothing to do with that. 

To assess whether your markup is truly decoupled from the styling, you should be able to take any element and replace its tag with another one without it affecting the styling in any way. As a result, all selectors should target elements by class name (with the exception of CSS resets).
    
***Bad:***

```css
.nav {
    background-color: tomato;
}

/*  I want to target all nav items.
    This works, but what if I want to add another link to .nav
    that isn't a nav item element? */
nav a {
    display: inline-block;
    font-weight: bold;
}
```

***Good:***

```css
.nav {
    background-color: tomato;
}

.nav__item {
    display: inline-block;
    font-weight: bold;
}     
```
    
#### 5.1.2. All blocks live in their own separate files

This ensures that any developer not familiar with the codebase can instantly find all the styling related to a given element. By enforcing this naming convention for the files and keeping them all in the same directory, the operating system helps enforcing that no two blocks will have the same name, avoiding unwanted collisions of styling. The file should be named after the block (e.g. `_my-block.scss`).

### 5.2. Sass

Sass is used exclusively with its SCSS syntax (`*.scss`), a superset of CSS3.

#### 5.2.1. Don't nest selectors deeper than two levels

Nesting on its own is enough to generate subject for a big debate, but the idea is that even though less experienced developers might be tempted to mimic the structure of the markup in the style sheets by nesting selectors accordingly, this breaks the principle of keeping concerns separate. Because nesting will generate increased specificity, it becomes really difficult to extend or override elements.

#### 5.2.2. Avoid using `@extend`

Extending selectors in Sass sounds good on paper, but the reality is that it's far from ideal and it can cause some problems. These two articles by [Hugo Giraudel](http://www.sitepoint.com/avoid-sass-extend/) and [Harry Roberts](http://csswizardry.com/2014/11/when-to-use-extend-when-to-use-a-mixin/) explain them in detail, but the general idea is that they:

- **Group selectors**: When multiple selectors extend the same object, Sass will output its rules under a single grouped selector. This is beneficial on paper because the output CSS will be smaller in size, but the fact is that when factoring in GZIP compression on the style sheet, the performance benefits are insignificant. On the flip side, it creates relationships between elements that have no business being together — the CSS resulting from this is unnatural and does not reflect the structure and relationship of the entities.

- **Don't work inside media queries**: Extending something inside a media query won't work. On the contrary, including a mixin is perfectly fine.

- **Make debugging more difficult**: Browsers are now pretty good at telling developers a lot about how their style sheets are affecting DOM elements, and it's fairly simple to see what rules and selectors are doing what. That becomes less transparent when using `@extend`, because the browser will tell developers that a certain rule comes from `.web-developer`, while in fact it comes from the extended `.developer` which in its turn extends `.person`. 

An alternative to extending is almost always using an argument-less mixin.

```scss
@mixin foo {
    text-decoration: underline;
}

.bar {
    @include foo;
}

@media (min-width: 1000px) {
    .baz {
        @include foo;
    }
}
```

### 5.3. PostCSS

Sass is great for enhancing CSS with powerful features that allow developers to write DRYer code and thus improving maintainability. But with power comes responsibility, and it's a common pitfall for developers to forget that Sass is supposed to extend CSS, not replace it.

If you find yourself writing things like `@include box-shadow(inset 0, 1px, 1px, rgba(0, 0, 0, 0.5));` or `@include px-to-rem(font-size, 20px);` you should stop to assess whether you're solving a problem by creating another one. The instructions above are trying to generate simple CSS rules, and yet they don't look anything like CSS. What sort of technical debt will this bring? Who maintains these mixins?

PostCSS is very good at taking a style sheet and applying automated rules, like adding  browser vendor prefixes or fallbacks for legacy browsers. Developers can then write regular CSS, with or without the help of a pre-processor, knowing that PostCSS will add all those fallbacks based on a list of requirements that might even change over time (e.g. one could drop support for `-ms` prefixes just by changing the requirements, without having to touch the code).

```
########      ############      ###########      #############
# Sass #  =>  # Temp CSS #  =>  # PostCSS #  =>  # Final CSS #
########      ############      ###########      #############
```

### 5.4. Responsive web design

Bedrock uses [include-media](http://include-media.com), a Sass library to manage responsive breakpoints and to write media queries in a simple and maintainable way. It uses a Sass Map called `$breakpoints` to declare the global breakpoints used throughout the project, and allows developers to easily generate any type of media query declaration from them.

```scss
$breakpoints: (
    'small': 400px,
    'medium': 900px,
    'large': 1280px
);

.foo {
    display: none;
    
    @include media('>medium', '<=large') {
        display: block;
    }
}
```

This isolates the definition of the breakpoints to a centralised place in the codebase, making it easy to change values at any point. The library comes with additional features such as [component-specific breakpoints](http://include-media.com/documentation/#mixin-media-context), the ability to [reference the breakpoints in JavaScript](https://github.com/eduardoboucas/include-media-export) and a [CSS column system](https://github.com/eduardoboucas/include-media-columns). The API is fully documented [here](http://include-media.com/documentation).

The following principles should also be considered.

#### 5.4.1. Media queries inside blocks

When approaching front-end design with concepts like BEM and Atomic Design, where components are described as modular and self-contained entities, it makes sense to describe the responsive behaviour within the component definition rather than within a wider rule somewhere else.

***Bad:***

```scss
.foo {
    color: black;
}

.bar {
    color: blue;
}

@include media('>=medium') {
    .foo {
        color: blue;
    }
    
    .bar {
        color: red;
    }
}
```


***Good:***

```scss
.foo {
    color: black;
    
    @include media('>=medium') {
        color: blue;
    }
}

.bar {
    color: blue;
    
    @include media('>=medium') {
        color: red;
    }
}
```

This approach promotes visibility, as a developer can instantly see all the states of an element on the various breakpoints, rather than having to search different parts of the file (or potentially different files) to see if other media queries are being triggered.

Conceptually, it also makes more sense to include the responsive behaviour inside the block declaration — it translates to creating a responsive component, rather than a component that may or may not receive changes at different viewport dimensions.

#### 5.4.2. Component-specific breakpoints are not global

Sometimes components will need to morph at intermediate viewport dimensions that don't correspond to any of the global breakpoints. Simply adding that value to the breakpoints map is an ugly option, because that means polluting a global list of breakpoints with something only applies to a specific component. include-media offers an alternative for that, allowing developers to declare a breakpoint that will only live within the scope of a component.

```scss
// Wrapping the whole declaration of the block with media-context
@include media-context(('custom-bp': 678px)) {
    .foo {
        color: blue;
        
        // It can be used as normal and can be mixed with
        // global breakpoints
        @include media('>custom-bp', '<=large') {
            color: tomato;
        }
    }
}
```

## 6. JavaScript (to do)

- IIFE/Revealing module pattern
- ES6? Webpack?
- When to use and not use jQuery
- Separation of concerns (DOM manipulation, business logic, Ajax, etc.)

## 7. Other guidelines

- Feature detection (Modernizr)
- Progressive enhancement
    - Flexbox

## 8. Build tools

- Grunt
