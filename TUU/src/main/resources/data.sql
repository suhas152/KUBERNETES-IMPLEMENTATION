-- Seed default admin user (upsert to ensure credentials)
INSERT INTO admin_table (username, password)
VALUES ('admin1', 'admin123')
ON DUPLICATE KEY UPDATE password = VALUES(password);

