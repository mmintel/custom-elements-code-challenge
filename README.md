# Custom-Elements Code Challenge

## Installation

- `yarn`

## Getting started

- `yarn dev` to start dev server
- `yarn build` to build production files

## Task

The goal is to write a series of Custom elements (HTML Standard) that can send user-entered data to a server.
This example HTML snippet should work as described after you implemented the task:

```
<app-form action="/script.php" method="POST">
  <app-textfield name="name" validation="[a-z]+" />
  <app-textfield name="phone" validation="[0-9]+" />
  <app-textfield name="subject" />
  <app-button> Send </app-button>
</app-form>
```

The `<app-form />` element encapsulates a form. It exposes a method submit to send the data programatically. Furthermore, when the child element `<app-button />` is clicked, the form will also be submitted. `<app-form />` always sends a json encoded request to the endpoint specified in the attribute action with the HTTP method specified in the attribute method. The values of all child elements `<app-textfield />` will be the form data. The json key of each textfield value is specified in the attribute name. Before sending, the element should also trigger an onSubmit event with the form data in the event payload before the data is sent to the target. Event listeners to onSubmit can edit the form data on their behalf. The submitting process will only take place when the validation of each `<app-textfield />` succeeds. The validation is specified as a regular expression in the attribute validation of `<real-digitaltextfield />`. In case of a validation error, the submit will be aborted and the errors are shown in a p tag below the `<real-digitaltextfield />`. When the server responds, the onResponse event, which has the HTTP response in the payload, is triggered.

_Hint: You can use http://httpbin.org to avoid writing a server._

## Solution

While there are already some frameworks like Stencil or Polymer out there, I decided to tackle this code challenge without using any render framework. That's why I went for the following tech stack:

- Yarn
- Typescript
- Webpack
- HTML Custom Elements

All elements inherit from `Element` which defines a common API: similar to React this component provides a `render` function which receives the elements attributes as `props`.

I decided to mount all components into the shadow DOM to encapsulate them from the rest. Although you might want to choose between shadow or real DOM on a per component basis I decided this feature is not necessary to complete the task.

## Caveats

- in contrast to the given code example I added a `type="submit"` to the `app-button` in order to decouple behaviour within the `react-digital-form` from the visual appearance of the button
- `Form` queries for `[name]` instead of `input` because you cannot simply access each input inside the shadow dom of children nor should you do it because this would break the encapsulation you wanted to achieve in the first place. Querying for `app-textfield` might be good enough to complete this task but would break as soon as there is another field type. However each element must simply have a `name` and a `value` to be appropriate for form data. To make sure this will be applied correctly I've added another abstraction of `Element` the `FormField`.
- Considering time I didn't touch any CSS.. and didn't write any tests :/
- I didn't add the `scripts.php`, because php...but on submit you will see the payload is passed to the action

## Summary

I was surprised how much work this is if you wanna do it right. I ended up with a solution that came pretty close to a class based mini alternative to React. This means:

- I added a `setState` function that triggers a rerender
- I added `mounted` and `unmounted` hooks
- I added a `render` function and passed props (and state)

Dealing with pure Custom Elements was a lot of fun, especially when combined with Typescript. However in the future I'd highly recommend going for something like Stencil.js so you don't reinvent the wheel.
