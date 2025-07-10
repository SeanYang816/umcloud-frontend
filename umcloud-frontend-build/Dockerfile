# Use Nginx as the base image
FROM nginx:alpine

# Copy the build output to Nginx’s public folder
COPY dist/ /usr/share/nginx/html

# Replace default nginx config if needed (optional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 to access the site
EXPOSE 80

# Run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
