To run:

```npm start```

## Assumptions and considerations:
### Global:
- I'm hardcoding all strings initially, considering i18n was never mentioned in the task spec
- I'll take a shortcut and inline all SVGs as background images, since centralized styling was not mentioned as a requirement. A proper way would be to add svg components to enable interaction and styling.
### Search:
- Assuming there's no suggest/autocomplete for the search bar, since not mentioned in the spec
### Pagination:
- Current design is unclear to me - how is the '...' page button expected to behave? Does it expand inline or display a dropdown with more page buttons, or does the range shift? Since I'm unable to ask questions, I'll change it to the following: (first) (previous) (5 nearest page number buttons) (next) (last). I'll also use material font SVGs for the new buttons.
- Explicit navigation to a page would be nice to have but not specified.