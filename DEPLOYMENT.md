# 🚀 Prompt Shirts Deployment Guide

This guide will help you deploy your Prompt Shirts app to your EC2 instance at `promptshirts.mercerwest.com`.

## 📋 Prerequisites

- EC2 instance with Docker and Docker Compose installed
- Domain configured to point to your EC2 instance
- Stripe account (for payments)
- Optional: Printful account (for dropshipping)

## 🛠️ Setup Steps

### 1. Prepare Your EC2 Instance

SSH into your EC2 instance and ensure Docker is installed:

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker (if not already installed)
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Add your user to docker group
sudo usermod -aG docker $USER
```

### 2. Clone and Deploy the App

```bash
# Navigate to your web directory
cd /var/www

# Clone your repository (replace with your actual repo URL)
git clone <your-repo-url> prompt-shirts
cd prompt-shirts

# Copy environment file
cp .env.production.example .env.production

# Edit environment variables
nano .env.production
```

### 3. Configure Environment Variables

Edit `.env.production` with your actual values:

```env
# Stripe Configuration (Required)
STRIPE_SECRET_KEY=sk_live_your_actual_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_live_your_actual_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_actual_webhook_secret

# App Configuration
NEXT_PUBLIC_APP_URL=https://promptshirts.mercerwest.com
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_actual_stripe_publishable_key

# Production Settings
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

### 4. Deploy the Application

```bash
# Make deployment script executable
chmod +x deploy.sh

# Run deployment
./deploy.sh
```

### 5. Configure Nginx (Reverse Proxy)

Create an Nginx configuration file:

```bash
sudo nano /etc/nginx/sites-available/promptshirts.mercerwest.com
```

Add this configuration:

```nginx
server {
    listen 80;
    server_name promptshirts.mercerwest.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/promptshirts.mercerwest.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 6. Configure SSL with Let's Encrypt

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d promptshirts.mercerwest.com

# Test auto-renewal
sudo certbot renew --dry-run
```

### 7. Upload T-Shirt Images

Upload your t-shirt images to the server:

```bash
# Create images directory if it doesn't exist
mkdir -p public/images

# Upload your images (use scp or your preferred method)
scp white-tshirt-realistic.png user@your-ec2-ip:/var/www/prompt-shirts/public/images/
scp black-tshirt-realistic.png user@your-ec2-ip:/var/www/prompt-shirts/public/images/
```

## 🔄 Updating the App

To update your app after making changes:

```bash
# Pull latest changes
git pull

# Rebuild and redeploy
./deploy.sh
```

## 📊 Monitoring

Check app status:

```bash
# View running containers
docker-compose ps

# View logs
docker-compose logs -f

# Check app health
curl http://localhost:3000
```

## 🔧 Troubleshooting

### Common Issues:

1. **Port 3000 already in use:**
   ```bash
   sudo lsof -i :3000
   docker-compose down
   ```

2. **Permission issues:**
   ```bash
   sudo chown -R $USER:$USER /var/www/prompt-shirts
   ```

3. **Docker build fails:**
   ```bash
   docker system prune -a
   docker-compose build --no-cache
   ```

4. **Nginx issues:**
   ```bash
   sudo nginx -t
   sudo systemctl status nginx
   ```

## 🎯 Final Steps

1. Test your app at `https://promptshirts.mercerwest.com`
2. Configure Stripe webhooks to point to your domain
3. Test the payment flow with Stripe test keys first
4. Monitor logs for any issues

## 📞 Support

If you encounter issues:
- Check Docker logs: `docker-compose logs`
- Check Nginx logs: `sudo tail -f /var/log/nginx/error.log`
- Verify environment variables are set correctly
- Ensure all required images are uploaded to `/public/images/`

Your Prompt Shirts app should now be live at `https://promptshirts.mercerwest.com`! 🎉 