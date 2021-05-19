declare var $:
  (<S extends string>(selector: S) => S extends `${string}[data-filter]` ? SearchElement : JQuery<HTMLElement>)
  & JQueryStatic
