# Task Manager - Project Structure

This is a Nuxt.js application that demonstrates how to organize a Vue.js project with multiple pages while using `app.vue` as the main control file.

## Project Organization

```
task-manager/
├── app/
│   └── app.vue                 # Main app component (layout wrapper)
├── pages/                      # File-based routing directory
│   ├── index.vue              # Home page (/)
│   ├── tasks.vue              # Tasks page (/tasks)
│   └── about.vue              # About page (/about)
├── layouts/                    # Layout components
│   └── default.vue            # Default layout
├── public/                     # Static assets
├── nuxt.config.ts             # Nuxt configuration
└── package.json               # Dependencies
```

## How It Works

### 1. App.vue as Main Control

- `app/app.vue` serves as the main application component
- It provides the overall layout structure (navigation, footer, etc.)
- Uses `<NuxtPage />` to render the current page content
- Acts as a wrapper for all pages

### 2. File-Based Routing

Nuxt.js automatically creates routes based on your file structure in the `pages/` directory:

- `pages/index.vue` → `/` (home page)
- `pages/tasks.vue` → `/tasks` (tasks page)
- `pages/about.vue` → `/about` (about page)

### 3. Navigation

- Navigation links use `<NuxtLink>` component for client-side routing
- No manual route configuration needed
- Automatic code-splitting and lazy loading

## Key Features

### App.vue Structure

```vue
<template>
  <div>
    <!-- Navigation header -->
    <nav>...</nav>

    <!-- Main content area -->
    <main>
      <NuxtPage />
      <!-- This renders the current page -->
    </main>

    <!-- Footer -->
    <footer>...</footer>
  </div>
</template>
```

### Page Components

Each page in the `pages/` directory:

- Is automatically routed
- Can use the layout from `app.vue`
- Has access to all Nuxt.js features (auto-imports, etc.)

### Benefits of This Structure

1. **Clean Separation**: App.vue handles layout, pages handle content
2. **Automatic Routing**: No manual route configuration
3. **Code Splitting**: Each page is loaded only when needed
4. **SEO Friendly**: Each page can have its own meta tags
5. **Easy Maintenance**: Clear file structure

## Adding New Pages

To add a new page:

1. Create a new `.vue` file in the `pages/` directory
2. The route will be automatically created based on the filename
3. Add a navigation link in `app.vue` if needed

Example:

```bash
# Create pages/contact.vue
# This automatically creates the /contact route
```

## Running the Project

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Next Steps

You can extend this structure by:

- Adding more pages to the `pages/` directory
- Creating nested routes with subdirectories
- Adding dynamic routes with parameters
- Implementing layouts for different page types
- Adding middleware for authentication
- Integrating with a backend API
