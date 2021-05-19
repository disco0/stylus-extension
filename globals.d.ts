//#region Typed Query Selector

declare type ParseSelector<Selector extends string> = import('typed-query-selector/parser').ParseSelector<Selector>;

declare type QuerySelector =
    <S extends string, P extends ParentNode['querySelector'], PRT extends ReturnType<P>>(selector: S) =>
        // Check for non-literal and handle as default querySelector
        string extends S
            ? PRT
            : S extends `${string}${'input' | ' '}}[data-filter]`
                ? SearchElement
                : ParseSelector<S>;

declare type QuerySelectorAll = Document['querySelectorAll']

declare interface CustomQuerySelector extends QuerySelector
{
    (selector: '#search'): SearchElement;
}

declare interface CustomQuerySelectorAll // extends QuerySelectorAll
{
    (selector: '#search'): NodeListOf<SearchElement>;
    <S extends string>(selector: S):
        S extends `${string}[data-filter]` | `[data-filter]`
            ? SearchElement[]
            : ParseSelector<S>[]
            // ? NodeListOf<SearchElement>
            // : ParseSelector<S>;
}

//#endregion Typed Query Selector

declare type WithLastValue<T extends Record<PropertyKey, any>> =
    & T
    & { lastValue: string | boolean };


declare const $$: CustomQuerySelectorAll;

declare const $: JQueryStaticWrapper
/** {@see dom.js} */
declare var $create:
{
  (): HTMLDivElement;
  <S extends string>(selector: S, children?: JQuery.TypeOrArray<Node | string>): ParseSelector<S>;
  <S extends string>(
      selector: S,
      properties: {
          appendChild?: JQuery.TypeOrArray<Node | string> ,
          tag?: `${'' | `${`SVG` | `svg`}:`}${keyof (HTMLElementTagNameMap & SVGElementTagNameMap)}`
      },
      dataset?: DOMStringMap,
      attributes?: NamedNodeMap,
      children?: JQuery.TypeOrArray<Node | string>
  ): ParseSelector<S>;
}
/** {@see dom.js} */
declare const messageBoxProxy

declare const API
/** {@see toolbox.js} */
declare const debounce
/** {@see manage.js} */
declare const installed
/** {@see manage.js} */
declare const prefs
/** {@see manage.js} */
declare const router
/** {@see manage.js} */
declare const sorter
/** {@see localization.js} */
declare const t

declare const chromeLocal: typeof browser.storage.local
declare const StorageExtras:
{
    getValue(key: string): Promise<any>;
    setValue(key: string): Promise<void>;
    getLZValue(key: string): Promise<string>;
    getLZValues<S extends readonly string[]>(keys?: S): Promise<Record<S, string>>;
    setLZValue(key: string): Promise<void>;
}
declare const StorageExtrasSync:
{
    LZ_KEY: {
        csslint: string;
        stylelint: string;
        usercssTemplate: string;
    };
}
declare interface Window
{
    chromeLocal: typeof browser.storage.local
    chromeSync: typeof browser.storage.sync & StorageExtras & StorageExtrasSync

    LZStringUnsafe
}
type StylusRenderer = ReturnType<typeof import('stylus')>;
interface StylusRenderBuilder
{
  new (source?: string): StylusRenderer
}

declare const StylusRenderer: StylusRenderBuilder;

declare function waitForSelector(selector: string, { recur, stopOnDomReady }?: {
    recur?: (arg0: HTMLElement, arg1: HTMLElement[]) => boolean;
    stopOnDomReady?: boolean;
}): Promise<HTMLElement>

declare type SearchElement = WithLastValue<HTMLInputElement>

declare interface StyleSearchOptions
{
  immediately?: boolean;
  container?:   ParentNode;
}

declare interface JQueryStaticWrapper
{
    <S extends string, E extends HTMLElement & ParseSelector<S>>(selector: S): JQuery<E> & E

    // tslint:disable-next-line:no-unnecessary-generics
    <S extends string, TElement extends ParseString<S> = HTMLElement>(html: S, ownerDocument_attributes?: Document | JQuery.PlainObject): JQuery<TElement>;
    /**
     * Accepts a string containing a CSS selector which is then used to match a set of elements.
     * @param selector A string containing a selector expression
     * @param context A DOM Element, Document, Selector or jQuery to use as context
     * @see \`{@link https://api.jquery.com/jQuery/ }\`
     * @since 1.0
     * @example ​ ````Find all p elements that are children of a div element and apply a border to them.
```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>jQuery demo</title>
  <script src="https://code.jquery.com/jquery-3.3.1.js"></script>
</head>
<body>
​
<p>one</p>
<div><p>two</p></div>
<p>three</p>
​
<script>
$( "div > p" ).css( "border", "1px solid gray" );
</script>
</body>
</html>
```
     * @example ​ ````Find all inputs of type radio within the first form in the document.
```javascript
$( "input:radio", document.forms[ 0 ] );
```
     * @example ​ ````Find all div elements within an XML document from an Ajax response.
```javascript
$( "div", xml.responseXML );
```
​
     */
    // tslint:disable-next-line:no-unnecessary-generics
    <S extends string, TElement extends ParseString<S> = HTMLElement>(html: S, context?: Element | Document | JQuery | JQuery.Selector): JQuery<TElement>;
    /**
     * Return a collection of matched elements either found in the DOM based on passed argument(s) or created by passing an HTML string.
     * @param element A DOM element to wrap in a jQuery object.
     * @see \`{@link https://api.jquery.com/jQuery/ }\`
     * @since 1.0
     * @example ​ ````Set the background color of the page to black.
```javascript
$( document.body ).css( "background", "black" );
```
     */
    // NOTE: `HTMLSelectElement` is both an Element and an Array-Like Object but jQuery treats it as an Element.
    (element: HTMLSelectElement): JQuery<HTMLSelectElement>;
    /**
     * Return a collection of matched elements either found in the DOM based on passed argument(s) or created by passing an HTML string.
     * @param element_elementArray _&#x40;param_ `element_elementArray`
     * <br>
     * * `element` — A DOM element to wrap in a jQuery object. <br>
     * * `elementArray` — An array containing a set of DOM elements to wrap in a jQuery object.
     * @see \`{@link https://api.jquery.com/jQuery/ }\`
     * @since 1.0
     * @example ​ ````Set the background color of the page to black.
```javascript
$( document.body ).css( "background", "black" );
```
     * @example ​ ````Hide all the input elements within a form.
```javascript
$( myForm.elements ).hide();
```
     */
    <T extends Element>(element_elementArray: T | ArrayLike<T>): JQuery<T>;
    /**
     * Return a collection of matched elements either found in the DOM based on passed argument(s) or created by passing an HTML string.
     * @param selection An existing jQuery object to clone.
     * @see \`{@link https://api.jquery.com/jQuery/ }\`
     * @since 1.0
     */
    <T>(selection: JQuery<T>): JQuery<T>;
    /**
     * Binds a function to be executed when the DOM has finished loading.
     * @param callback The function to execute when the DOM is ready.
     * @see \`{@link https://api.jquery.com/jQuery/ }\`
     * @since 1.0
     * @example ​ ````Execute the function when the DOM is ready to be used.
```javascript
$(function() {
  // Document is ready
});
```
     * @example ​ ````Use both the shortcut for $(document).ready() and the argument to write failsafe jQuery code using the $ alias, without relying on the global alias.
```javascript
jQuery(function( $ ) {
  // Your code using failsafe $ alias here...
});
```
     */
    // tslint:disable-next-line:no-unnecessary-generics unified-signatures
    <TElement = HTMLElement>(callback: ((this: Document, $: JQueryStatic) => void)): JQuery<TElement>;
    /**
     * Return a collection of matched elements either found in the DOM based on passed argument(s) or created by passing an HTML string.
     * @param object A plain object to wrap in a jQuery object.
     * @see \`{@link https://api.jquery.com/jQuery/ }\`
     * @since 1.0
     */
    <T extends JQuery.PlainObject>(object: T): JQuery<T>;
    /**
     * Returns an empty jQuery set.
     * @see \`{@link https://api.jquery.com/jQuery/ }\`
     * @since 1.4
     */
    // tslint:disable-next-line:no-unnecessary-generics
    <TElement = HTMLElement>(): JQuery<TElement>;
}
