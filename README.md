# react-datagrid-example

Reusable React datagrid component supported by a lightweight Node.js server.

# Features

- Search bar with debounced text input
- Sorting when clicking on row headers
- Generic API with correct typings
- Auto-sized columns based on cell content
- Hovered row highlighting
- Odd/even row coloration
- Sticky header
- Customizable cell component per column
- Infinite scroll to avoid performance issues with large amount of rows
- Deletable rows (by using a custom component in the `renderCell` function)

# How to use?

A example of using the `DataGrid` component is available in the `frontend/src/components/UsersTable` component.

# How to contribute?

## Backend

```bash
cd backend
yarn # install the dependencies
yarn dev # start the development server
```

## Frontend

```bash
cd frontend
yarn # install the dependencies
yarn start # start the development server
```

More details are available in `frontend/README.md`.
