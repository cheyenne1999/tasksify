# Task Manager

A modern task management application built with Nuxt.js and Tailwind CSS.

## 🚀 Features

- ✅ **Task Management**: Create, edit, delete, and toggle tasks
- ✅ **Priority Levels**: Low, Medium, High priorities
- ✅ **Due Dates**: Set and track task deadlines
- ✅ **Filtering**: Filter tasks by status (All, Active, Completed)
- ✅ **Real-time Updates**: Instant updates with local data
- ✅ **Responsive Design**: Works on desktop and mobile
- ✅ **Modern UI**: Clean, intuitive interface with Tailwind CSS

## 🏗️ Architecture

- **Framework**: Nuxt.js 4 (Vue.js 3)
- **Styling**: Tailwind CSS
- **Data**: Local mock data (in-memory storage)
- **Routing**: File-based routing
- **TypeScript**: Full TypeScript support

## 📁 Project Structure

```
task-manager/
├── app/
│   └── app.vue                 # Main app component
├── pages/                      # File-based routing
│   ├── index.vue              # Home page with stats
│   ├── tasks.vue              # Tasks page with CRUD operations
│   └── about.vue              # About page
├── layouts/
│   └── default.vue            # Default layout with navigation
├── composables/
│   └── useTasks.ts            # Local data management
├── nuxt.config.ts             # Nuxt configuration
└── package.json               # Dependencies
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm, yarn, or bun

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd task-manager
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🎯 Usage

### Creating Tasks

1. Navigate to the Tasks page
2. Click "Add New Task"
3. Fill in the task details (title, description, priority, due date)
4. Click "Create"

### Managing Tasks

- **Toggle completion**: Click the checkbox next to a task
- **Edit task**: Click the "Edit" button
- **Delete task**: Click the "Delete" button
- **Filter tasks**: Use the filter buttons (All, Active, Completed)

### Dashboard

The home page shows:

- Task statistics (total, completed, pending)
- Quick actions (view all tasks, add new task)
- Recent activity

## 🛠️ Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Adding New Features

1. **New Pages**: Create `.vue` files in the `pages/` directory
2. **New Components**: Create components in the `components/` directory
3. **New Composables**: Create composables in the `composables/` directory
4. **Styling**: Use Tailwind CSS classes for styling

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory if needed:

```env
NUXT_PUBLIC_APP_TITLE=Task Manager
```

### Nuxt Configuration

The application uses the following Nuxt modules:

- `@nuxtjs/tailwindcss`: For Tailwind CSS integration

## 📝 Data Structure

### Task Interface

```typescript
interface Task {
  id?: number;
  title: string;
  description?: string;
  completed: boolean;
  priority: "Low" | "Medium" | "High";
  dueDate?: string;
  createdAt?: string;
  updatedAt?: string;
}
```

## 🚀 Deployment

### Production Build

1. **Build the application**

   ```bash
   npm run build
   ```

2. **Deploy the output**
   - The built application is in the `.output` directory
   - Deploy this directory to your hosting provider

### Supported Platforms

- Vercel
- Netlify
- AWS S3 + CloudFront
- Any static hosting service

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:

1. Check the browser console for error messages
2. Ensure all dependencies are installed
3. Verify that the development server is running
4. Check the troubleshooting section in `SETUP_GUIDE.md`

## 🔮 Future Enhancements

- [ ] Add local storage for data persistence
- [ ] Implement user authentication
- [ ] Add task categories/tags
- [ ] Add file attachments
- [ ] Implement task search and filtering
- [ ] Add task comments
- [ ] Implement task sharing
- [ ] Add task templates
- [ ] Implement task dependencies
- [ ] Add dark mode
- [ ] Implement task export/import
