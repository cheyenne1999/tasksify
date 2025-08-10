# Laravel Setup Guide for Windows

This guide will help you set up Laravel for your Task Manager project on Windows.

## Step 1: Install PHP and Required Extensions

### Option A: Using XAMPP (Recommended)

1. **Download XAMPP**

   - Go to: https://www.apachefriends.org/download.html
   - Download the latest version for Windows
   - Choose the version with PHP 8.1 or higher

2. **Install XAMPP**

   - Run the installer as Administrator
   - Choose installation directory (default: `C:\xampp`)
   - Select components: Apache, MySQL, PHP, phpMyAdmin
   - Complete the installation

3. **Add PHP to PATH**

   - Open System Properties → Advanced → Environment Variables
   - Under "System Variables", find "Path" and click "Edit"
   - Click "New" and add: `C:\xampp\php`
   - Click "OK" to save

4. **Verify PHP Installation**
   - Open Command Prompt
   - Run: `php --version`
   - You should see PHP version information

### Option B: Using Chocolatey (Alternative)

1. **Install Chocolatey**

   - Open PowerShell as Administrator
   - Run: `Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))`

2. **Install PHP**
   - Run: `choco install php`
   - This will install PHP and add it to PATH

## Step 2: Install Composer

1. **Download Composer**

   - Go to: https://getcomposer.org/download/
   - Click "Composer-Setup.exe" to download the Windows installer

2. **Install Composer**

   - Run the installer as Administrator
   - Follow the installation wizard
   - Make sure to select the PHP executable from XAMPP if prompted

3. **Verify Composer Installation**
   - Open Command Prompt
   - Run: `composer --version`
   - You should see Composer version information

## Step 3: Install Laravel

Once PHP and Composer are installed:

```bash
# Navigate to your project directory
cd C:\Users\cheye\task-manager

# Remove old backend directory if it exists
rmdir /s /q backend

# Create Laravel project in a backend directory
composer create-project laravel/laravel backend

# Navigate to Laravel project
cd backend

# Install dependencies
composer install

# Copy environment file
copy .env.example .env

# Generate application key
php artisan key:generate
```

## Step 4: Configure Laravel

1. **Update .env file**

   - Open `backend\.env`
   - Update database settings:

   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=task_manager
   DB_USERNAME=root
   DB_PASSWORD=
   ```

2. **Create Database**
   - Start XAMPP Control Panel
   - Start Apache and MySQL services
   - Open phpMyAdmin: http://localhost/phpmyadmin
   - Create a new database named `task_manager`

## Step 5: Verify Installation

```bash
# Start Laravel development server
cd backend
php artisan serve
```

- Laravel should be available at: `http://localhost:8000`
- You should see the Laravel welcome page

## Project Structure After Setup

```
task-manager/
├── app/                    # Nuxt.js frontend
│   └── app.vue
├── pages/                  # Nuxt.js pages
├── layouts/                # Nuxt.js layouts
├── composables/            # Nuxt.js composables
├── backend/                # Laravel backend
│   ├── app/
│   │   ├── Http/
│   │   │   └── Controllers/
│   │   └── Models/
│   ├── config/
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
│   ├── routes/
│   │   └── api.php
│   ├── resources/
│   └── ...
├── package.json            # Frontend dependencies
└── composer.json           # Backend dependencies
```

## Troubleshooting

### Common Issues

1. **PHP not found**

   - Make sure PHP is added to PATH
   - Restart Command Prompt after adding to PATH

2. **Composer not found**

   - Reinstall Composer and make sure to select correct PHP path
   - Restart Command Prompt after installation

3. **Permission denied**

   - Run Command Prompt as Administrator
   - Check folder permissions

4. **Port already in use**
   - Change Laravel port: `php artisan serve --port=8001`
   - Or stop other services using the same port

## Next Steps

After completing the installation:

1. **Create Task Model and Migration**
2. **Set up API Controllers**
3. **Configure API Routes**
4. **Set up CORS for frontend communication**
5. **Update frontend composables to use Laravel API**

## Verification Commands

```bash
# Check PHP version
php --version

# Check Composer version
composer --version

# Check Laravel installation
cd backend
php artisan --version

# Start Laravel server
php artisan serve
```
