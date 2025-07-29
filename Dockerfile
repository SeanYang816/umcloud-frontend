# Use Nginx as the base image
FROM nginx:alpine

# Copy built frontend files (your Vite build output)
COPY dist/ /usr/share/nginx/html

# Replace default nginx config (optional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy entrypoint script
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Expose port 80 for HTTP traffic
EXPOSE 80

# Run entrypoint script instead of nginx directly
CMD ["/entrypoint.sh"]
