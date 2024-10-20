To run:

```npm start```

## Assumptions and considerations:
### Global:
- I'm hardcoding all strings, considering i18n was never mentioned in the task spec, otherwise I'd use the angular i18n tool or write simple string lookup myself.
- I'll take a shortcut and inline most SVGs as background images, since centralized styling was not mentioned as a requirement. A proper way would be to add svg components to enable interaction and styling.
- The spec says `Table rows and columns should adapt to the input data provided in the
mock response.` but I will assume that column definitions are declared before the table is initialized, because there must be some kind of explicit contract in order to support template cells and action columns.
### Search:
- Assuming there's no suggest/autocomplete for the search bar, since not mentioned in the spec.
- I'm hardcoding 'name' as search property for simplicity, on a real project it would be likely connected to UI (selecting from one of value grid columns)
- A major decision here is whether the grid should do its own filtering. Based on my experience, it usually shouldn't - but in this case I felt like making more of a self-contained component, so that all data-related state handling stays internal.
### Pagination:
- Current design is unclear to me - how is the '...' page button expected to behave? Does it expand inline or display a dropdown with more page buttons, or does the range shift? Since I'm unable to ask questions, I'll change it to the following: (first) (previous) (5 nearest page number buttons) (next) (last). I'll also use material font SVGs for the new buttons.
- Explicit navigation to a page would be nice to have but not specified.