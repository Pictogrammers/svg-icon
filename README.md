# SVG Icon WebComponent

A basic webcomponent for rendering a single path SVG icon. This component makes it easy to use SVG path based icon packs such as [MaterialDesignIcons](https://materialdesignicons.com/) and [SimpleIcons](https://simpleicons.org/).

# Usage

1. Install the package from NPM

    ```
    npm install @jamescoyle/svg-icon
    ```

2. Import the component into your application

    ```
    import 'svg-icon'
    ```

3. Use the icon in your markup
    ```
    <svg-icon size="24" path="M...z"></svg-icon>
    ```

# Attributes

| Name    | Default     | Description                                                                                                                          |
| ------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| type    | null        | This sets the size and viewbox to match the recommended size for the icon pack specified.                                            |
| path    | null        | Required. An SVG path to render as an icon                                                                                           |
| size    | 24          | The width and height of the SVG element                                                                                              |
| viewbox | "0 0 24 24" | The `viewBox` of the SVG element                                                                                                     |
| flip    | null        | One of "horizontal", "vertical", or "both". Flips the icon in the specified direction(s).                                            |
| rotate  | 0deg        | Rotates the icon by the specified value. Can be any valid [CSS angle](https://developer.mozilla.org/en-US/docs/Web/CSS/angle) value. |

# Styling

By default the icon will inherit the current font color of the container it is placed within. You can easily provide a specific color using an inline style on the element (`style="color: red"`) or can target the tag as normal with CSS rules.

# Accessibility

You should make use of aria attributes to improve accessibility for users that use screen reading technology. You can use `aria-labelledby` to create a link between an icon and its label. A descriptive `aria-label` can be used to allow screen readers to announce an icon if there is no visual label to accompany it.
