# WordPress Installation Guide for Gaming Accessories Store

## Overview
This guide provides step-by-step instructions for installing WordPress, the foundation for your WooCommerce gaming accessories store. Choose the method that best fits your technical comfort level and hosting environment.

## Prerequisites
Before beginning the installation, ensure you have:
1. A domain name pointing to your hosting account
2. Access to your hosting control panel (cPanel, Plesk, or custom interface)
3. FTP/SFTP credentials (for manual installation method)
4. A text editor (like Notepad++, VS Code, or Sublime Text)
5. Basic understanding of file management

## Method 1: One-Click Install via Hosting Control Panel (Recommended for Beginners)

Many hosting providers offer one-click WordPress installation through their control panel. This is the easiest method and recommended for those new to website management.

### Step-by-Step Instructions:

1. **Log in to your hosting control panel**
   - Use the credentials provided by your hosting provider
   - Common panels: cPanel, Plesk, or custom hosting dashboard

2. **Locate the WordPress installer**
   - Look for sections like: "Web Applications", "Softaculous", "QuickInstall", "WordPress Tools", or "Site Software"
   - In cPanel, it's often under "Softaculous Apps Installer" or "WordPress Tools"

3. **Start the WordPress installation**
   - Click on the WordPress icon or link
   - Click "Install Now" or similar button

4. **Configure the installation settings**
   - **Choose Protocol**: Select `https://` (if SSL is installed) or `http://`
   - **Choose Domain**: Select your domain from the dropdown
   - **In Directory**: Leave blank for root domain (e.g., `yourstore.com`) or enter a subdirectory (e.g., `blog`)
   - **Site Name**: Enter your store name (e.g., "GameGear Hub")
   - **Site Description**: Brief tagline or description
   - **Enable Multisite**: Leave unchecked (unless you specifically need multiple sites)
   - **Admin Account**: 
     - Username: Choose a secure username (avoid "admin")
     - Password: Generate a strong password (store this securely)
     - Email: Enter your email address
   - **Select Language**: Choose English or your preferred language
   - **Select Plugins**: You can leave these unchecked for now (we'll install WooCommerce separately)
   - **Advanced Options**: 
     - Database Name: Usually auto-generated
     - Table Prefix: Keep default `wp_` or change for security
     - Disable Update Emails: Optional (recommended to keep updates notifications)

5. **Complete the installation**
   - Review all settings
   - Click "Install" or "Complete Installation"
   - Wait for the process to finish (usually 30-60 seconds)

6. **Access your new WordPress site**
   - Installation complete message will show:
     - Administrative URL: `https://yourstore.com/wp-admin`
     - Site URL: `https://yourstore.com`
   - Save these links and your login credentials securely

## Method 2: Manual Installation via FTP

Use this method if your hosting provider doesn't offer one-click installation or if you prefer more control.

### Step-by-Step Instructions:

1. **Download WordPress**
   - Go to https://wordpress.org/download/
   - Click "Download WordPress X.X.X"
   - Extract the ZIP file to a folder on your computer

2. **Prepare for upload**
   - You should now have a folder named `wordpress` containing all the WordPress files
   - Rename `wp-config-sample.php` to `wp-config.php` (we'll edit this next)

3. **Create MySQL Database and User**
   - Log in to your hosting control panel
   - Find "MySQL Databases" or "Database" section
   - Create a new database (e.g., `wordpress_store`)
   - Create a new MySQL user and assign a strong password
   - Add the user to the database with all privileges
   - Save the database name, username, and password

4. **Configure wp-config.php**
   - Open `wp-config.php` in your text editor
   - Find the database settings section and replace:
     ```php
     define( 'DB_NAME', 'database_name_here' );
     define( 'DB_USER', 'username_here' );
     define( 'DB_PASSWORD', 'password_here' );
     define( 'DB_HOST', 'localhost' );
     ```
   - With your actual database details:
     ```php
     define( 'DB_NAME', 'your_database_name' );
     define( 'DB_USER', 'your_username' );
     define( 'DB_PASSWORD', 'your_password' );
     define( 'DB_HOST', 'localhost' );
     ```
   - **Security Keys**: Scroll down to the authentication unique keys section
     - Visit https://api.wordpress.org/secret-key/1.1/salt/
     - Copy the generated keys and replace the placeholder lines in wp-config.php
   - Save the file

5. **Upload WordPress to your hosting account**
   - Connect to your hosting via FTP/SFTP using:
     - Host: Your domain or FTP host (provided by hosting company)
     - Username: Your FTP username
     - Password: Your FTP password
     - Port: 21 (FTP) or 22 (SFTP)
   - Navigate to the root directory (usually `public_html` or `www`)
   - Upload all contents of the `wordpress` folder (not the folder itself) to the root directory
   - Wait for upload to complete (may take several minutes)

6. **Run the WordPress installation script**
   - Open a web browser and go to: `http://yourstore.com/wp-admin/install.php`
   - (Replace `yourstore.com` with your actual domain)
   - You should see the WordPress installation screen

7. **Complete the installation**
   - Site Title: Your store name
   - Username: Choose secure username (not "admin")
   - Password: Strong password (WordPress will suggest a strong one)
   - Your Email: Your email address
   - Search Engine Visibility: Uncheck if you want search engines to index your site immediately
   - Click "Install WordPress"

8. **Log in to your new WordPress site**
   - Go to `https://yourstore.com/wp-admin`
   - Enter your username and password
   - You're now in the WordPress dashboard!

## Method 3: Command-Line Installation using WP-CLI

For those comfortable with command line interfaces, WP-CLI provides a fast, efficient way to install WordPress.

### Prerequisites:
- SSH access to your hosting account
- WP-CLI installed on your hosting server (many providers have it pre-installed)
- MySQL database created (see Method 2, Step 3)

### Step-by-Step Instructions:

1. **Connect via SSH**
   - Use your SSH client (Terminal on Mac/Linux, PuTTY on Windows)
   - Connect: `ssh username@yourhostingprovider.com`
   - Enter your password when prompted

2. **Navigate to your web root directory**
   - Usually: `cd public_html` or `cd www`
   - Confirm location: `ls -la` (should see index.html or similar default files)

3. **Download WordPress core**
   ```bash
   wp core download
   ```

4. **Create wp-config.php**
   ```bash
   wp core config --dbname="your_database_name" --dbuser="your_username" --dbpass="your_password" --dbhost="localhost"
   ```
   - Replace the values with your actual database credentials

5. **Generate security keys** (WP-CLI does this automatically in the config step)

6. **Install WordPress**
   ```bash
   wp core install --url="https://yourstore.com" --title="GameGear Hub" --admin_user="youradmin" --admin_password="strongpassword" --admin_email="you@example.com"
   ```
   - Replace all values with your actual information
   - Consider using a password generator for the admin password

7. **Verify installation**
   - Visit `https://yourstore.com` to see your new WordPress site
   - Visit `https://yourstore.com/wp-admin` to log in to the dashboard

## Post-Installation Verification

Regardless of which method you used, verify your WordPress installation:

1. **Check the frontend**
   - Visit your domain in a browser
   - You should see the default WordPress theme (Twenty Twenty-Four as of 2026)
   - Look for the "Hello world!" post (sample content)

2. **Check the backend (dashboard)**
   - Log in at `https://yourstore.com/wp-admin`
   - Verify you can see the WordPress dashboard menu:
     - Dashboard, Posts, Media, Pages, Comments, Appearance, Plugins, Users, Tools, Settings

3. **Check basic functionality**
   - Go to Posts > Add New and try creating a test post
   - Go to Pages > Add New and try creating a test page
   - Visit Appearance > Themes to see available themes
   - Visit Plugins > Add New to browse available plugins

4. **Check PHP and MySQL versions** (Optional)
   - Install a plugin like "WP Server Stats" or use built-in Site Health tool:
   - Go to Tools > Site Health > Info tab
   - Verify PHP version is 7.4+ and MySQL is 5.6+

## Next Steps After WordPress Installation

Once WordPress is successfully installed:

1. **Update WordPress, Themes, and Plugins**
   - Go to Dashboard > Updates
   - Apply any available updates

2. **Install Essential Plugins** (refer to the Essential Plugins guide)
   - WooCommerce (for e-commerce functionality)
   - PayPal for WooCommerce (payment processing)
   - SEO plugin (Yoast SEO or Rank Math)
   - Security plugin (Wordfence or iThemes Security)
   - Contact form plugin (Contact Form 7 or WPForms Lite)
   - Backup plugin (UpdraftPlus or BlogVault)

3. **Choose and Install a Theme**
   - For this store, we'll use the Storefront theme by WooCommerce
   - Go to Appearance > Themes > Add New
   - Search for "Storefront" and install/activate

4. **Begin WooCommerce Setup**
   - Run the WooCommerce setup wizard (appears automatically after activation)
   - Configure store details, payment, shipping, taxes, etc.

## Troubleshooting Common Installation Issues

### Issue: "Error establishing a database connection"
- **Cause**: Incorrect database credentials in wp-config.php
- **Solution**: Double-check database name, username, password, and host in wp-config.php

### Issue: "Headers already sent" warning
- **Cause**: Extra whitespace or characters in wp-config.php
- **Solution**: Ensure there are no spaces or lines before the opening `<?php` tag

### Issue: Installation page shows blank or PHP code
- **Cause**: PHP not properly configured on hosting server
- **Solution**: Contact hosting support to ensure PHP 7.4+ is enabled

### Issue: Cannot upload files or install plugins
- **Cause**: Incorrect file permissions
- **Solution**: 
  - Directories: 755
  - Files: 644
  - wp-config.php: 640 or 600 (more secure)
  - Use FTP client to change permissions or contact hosting support

### Issue: White Screen of Death (WSOD)
- **Cause**: PHP memory limit exceeded or plugin/theme conflict
- **Solution**:
  - Increase PHP memory limit (add to wp-config.php: `define('WP_MEMORY_LIMIT', '256M');`)
  - Disable all plugins by renaming the plugins folder via FTP
  - Reactivate one by one to identify culprit

## Security Best Practices for Your Store

1. **Keep everything updated**
   - WordPress core, themes, and plugins regularly
   - Enable automatic minor updates if possible

2. **Use strong passwords**
   - For WordPress admin, FTP, database, and hosting accounts
   - Consider using a password manager

3. **Limit login attempts**
   - Install a plugin like "Limit Login Attempts Reloaded" or use Wordfence

4. **Change the default "admin" username**
   - Never use "admin" as your username

5. **Regular backups**
   - Set up automated backups (daily recommended for stores)
   - Store backups off-site or in cloud storage

6. **Use HTTPS/SSL**
   - Essential for protecting customer data and building trust
   - Most hosts offer free Let's Encrypt SSL certificates

7. **Remove unused themes and plugins**
   - Reduces attack surface and potential vulnerabilities

## Resources for Further Learning

- **WordPress Codex**: https://wordpress.org/support/article/wordpress-lessons/
- **WPBeginner**: https://www.wpbeginner.com/ (excellent for beginners)
- **WooCommerce Docs**: https://docs.woocommerce.com/
- **WordPress TV**: https://wordpress.tv/ (video tutorials)
- **Hosting Provider Knowledge Base**: Check your host's specific guides

## Notes for Teen Manager (with Parental Guidance)

- Involve a parent/guardian in the installation process, especially when dealing with databases and FTP credentials.
- Keep all login credentials (WordPress, FTP, hosting, database) secure and consider using a password manager.
- As you become more comfortable, explore WordPress customization options.
- Regularly ask for parental review of your store settings, especially payment and security configurations.
- Remember that you're building a real business - treat it with care and professionalism.

---
*Guide created: 2026-05-17*
*For: Online Gaming Accessories Store using WordPress/WooCommerce*