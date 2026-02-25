Tuition App – Kubernetes Deployment (Java Full Stack)

This project demonstrates how a Java Full Stack Tuition Management Application is containerized and deployed using Kubernetes.

The application includes:

🖥️ Frontend – HTML/CSS/JS (or React/Angular)

⚙️ Backend – Java (Spring Boot)

🗄️ Database – MySQL

☸️ Container Orchestration – Kubernetes

🐳 Containerization – Docker

📌 Project Architecture
🏗️ High-Level Architecture
                   <img width="458" height="358" alt="image" src="https://github.com/user-attachments/assets/7f629836-f001-4809-a4f2-4e105bb48bca" />

📂 Project Structure
tuition-app-k8s/
│
├── frontend/
│   └── Dockerfile
│
├── backend/
│   └── Dockerfile
│
├── k8s/
│   ├── frontend-deployment.yaml
│   ├── backend-deployment.yaml
│   ├── mysql-deployment.yaml
│   ├── services.yaml
│   └── ingress.yaml
│
└── README.md
🐳 Step 1: Dockerization
Backend Dockerfile (Spring Boot)
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY target/tuition-app.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]
Frontend Dockerfile
FROM nginx:alpine
COPY build/ /usr/share/nginx/html
EXPOSE 80
☸️ Step 2: Kubernetes Components Used
Component	Purpose
Deployment	Manages pods
Service	Exposes pods internally/externally
ConfigMap	Stores configuration
Secret	Stores sensitive data
Ingress	External access routing
Persistent Volume	Database storage
📊 Kubernetes Architecture Diagram
                   <img width="590" height="469" alt="image" src="https://github.com/user-attachments/assets/5bd7c0b9-7d45-4a52-8d7e-26bc349a082f" />

🛠️ Deployment Steps
1️⃣ Build Docker Images
docker build -t tuition-frontend ./frontend
docker build -t tuition-backend ./backend

(Optional) Push to Docker Hub:

docker tag tuition-backend yourdockerhub/tuition-backend
docker push yourdockerhub/tuition-backend
2️⃣ Start Kubernetes Cluster

Using Minikube:

minikube start
3️⃣ Apply Kubernetes Manifests
kubectl apply -f k8s/

Check pods:

kubectl get pods

Check services:

kubectl get services
4️⃣ Access Application

If using Minikube:

minikube service frontend-service

Or via Ingress:

kubectl get ingress
🔐 Environment Configuration

Example backend environment variables:

env:
  - name: SPRING_DATASOURCE_URL
    value: jdbc:mysql://mysql-service:3306/tuitiondb
  - name: SPRING_DATASOURCE_USERNAME
    valueFrom:
      secretKeyRef:
        name: mysql-secret
        key: username
  - name: SPRING_DATASOURCE_PASSWORD
    valueFrom:
      secretKeyRef:
        name: mysql-secret
        key: password
🗄️ Database Persistence
PersistentVolume (PV)
        ↓
PersistentVolumeClaim (PVC)
        ↓
MySQL Pod

Ensures data is not lost when pod restarts.

🔄 Scaling Application

Scale backend pods:

kubectl scale deployment backend-deployment --replicas=3

Check scaling:

kubectl get pods
📈 Auto Scaling (Optional)

Horizontal Pod Autoscaler:

kubectl autoscale deployment backend-deployment --cpu-percent=50 --min=1 --max=5
🔍 Monitoring & Debugging

Check logs:

kubectl logs <pod-name>

Describe pod:

kubectl describe pod <pod-name>
🔒 Security Best Practices

Use Kubernetes Secrets for DB credentials

Use Resource limits (CPU & memory)

Enable RBAC

Use HTTPS via Ingress + TLS

Use Readiness & Liveness Probes

🚀 Future Improvements

CI/CD using GitHub Actions

Helm charts for deployment

Prometheus & Grafana monitoring

Service Mesh (Istio)

Cloud deployment (AWS EKS / GKE / AKS)

📌 Technologies Used

Java 17

Spring Boot

MySQL

Docker

Kubernetes

Minikube
