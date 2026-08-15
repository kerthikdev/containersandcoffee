// ☕ Containers & Coffee — Blog Post Data
// All blog content is defined here as a global JS variable.
// To add a new post, push a new object into the posts array.

window.BLOG_DATA = {
  site: {
    name: "Containers & Coffee",
    tagline: "DevOps thoughts, brewed fresh daily.",
    author: "Kerthik",
    authorBio: "DevOps engineer by day, coffee enthusiast by morning. I write about containers, cloud infrastructure, and the rituals that keep us sane.",
    authorInitials: "KA",
    social: {
      github: "https://github.com",
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com"
    }
  },
  posts: [
    {
      id: "brewing-perfect-docker-container",
      title: "Brewing the Perfect Docker Container: A Coffee Lover's Guide",
      slug: "brewing-perfect-docker-container",
      excerpt: "From Dockerfile recipes to multi-stage builds, learn how containerization mirrors the art of brewing the perfect espresso shot — layers, precision, and a touch of craft.",
      category: "Docker",
      tags: ["docker", "containers", "devops", "best-practices"],
      author: "K. Arthi",
      authorInitials: "KA",
      date: "2026-08-15",
      readTime: 7,
      featured: true,
      coverGradient: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
      coverIcon: "🐳",
      content: `
        <p>There's a ritual to making the perfect cup of coffee. You start with quality beans, grind them to the right consistency, control the water temperature, and time the extraction precisely. Any deviation, and you have a mediocre cup. Sound familiar?</p>

        <p>Building Docker containers is remarkably similar. You start with a base image (your beans), layer your dependencies (the grind), configure your environment (water temperature), and optimize your build process (the extraction). Get any of these wrong, and you ship a bloated, insecure, or broken container.</p>

        <h2>The Recipe: Your Dockerfile</h2>

        <p>Just as a barista follows a recipe, every Docker container starts with a <strong>Dockerfile</strong> — a precise set of instructions that defines your container's environment. The order matters. The precision matters.</p>

        <pre><code class="language-dockerfile"># Start with a quality base (your beans)
FROM node:18-alpine

# Set your working environment
WORKDIR /app

# Install dependencies first — crucial for layer caching
COPY package*.json ./
RUN npm ci --only=production

# Copy your application code
COPY . .

# Expose the port
EXPOSE 3000

# The final extraction
CMD ["node", "server.js"]</code></pre>

        <p>Notice how we copy <code>package*.json</code> before the rest of the source code. This is intentional — it exploits Docker's layer caching, just like a barista who pre-measures portions before the morning rush.</p>

        <h2>Layer Caching: The Art of the Pre-Grind</h2>

        <p>Experienced baristas pre-grind their coffee for rush hour. Docker's layer caching works the same way — frequently unchanged layers are cached, so you're not rebuilding from scratch every time you change a single line of code.</p>

        <p>The golden rule: <strong>put the things that change least at the top of your Dockerfile</strong>. System dependencies before application dependencies. Dependencies before source code. Configuration before logic.</p>

        <blockquote>
          "A well-layered Dockerfile is like a well-layered latte — each part knows its place, and none of them mix unless you want them to."
        </blockquote>

        <h2>Multi-Stage Builds: The Double Shot Technique</h2>

        <p>A double shot isn't just twice the coffee — it's a more concentrated, refined extraction. Multi-stage builds give you the same principle: a builder stage that compiles everything, and a final stage that only ships what you need to run.</p>

        <pre><code class="language-dockerfile"># Stage 1: The builder (your grinder)
FROM node:18 AS builder
WORKDIR /app
COPY . .
RUN npm ci && npm run build

# Stage 2: Production (the extraction)
FROM node:18-alpine AS production
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
RUN npm ci --only=production
EXPOSE 3000
CMD ["node", "dist/server.js"]</code></pre>

        <p>The result? Images that can be <strong>10x smaller</strong>. The difference between a watery Americano and a tight, rich doppio. You're shipping exactly what's needed — nothing more.</p>

        <h2>The .dockerignore: Don't Put the Grounds in Your Cup</h2>

        <p>No one wants coffee grounds in their espresso. Similarly, you don't want your <code>node_modules</code>, <code>.git</code> folder, or local environment files bleeding into your container image.</p>

        <pre><code class="language-plaintext">node_modules
.git
.env.local
.env.*.local
*.log
coverage/
.DS_Store
README.md</code></pre>

        <p>Think of <code>.dockerignore</code> as your coffee filter — it keeps the build context clean and ensures only the good stuff makes it through.</p>

        <h2>Health Checks: Is the Coffee Still Hot?</h2>

        <p>A great barista checks if a drink is still at the right temperature before handing it over. Docker's <code>HEALTHCHECK</code> instruction does the same for your containers:</p>

        <pre><code class="language-dockerfile">HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1</code></pre>

        <p>This tells Docker (and orchestrators like Kubernetes) whether your container is actually serving traffic or just pretending to be alive. The difference between a running container and a <em>healthy</em> container matters enormously in production.</p>

        <h2>The Final Pour</h2>

        <p>Whether you're pulling espresso shots or pulling Docker images, the principles are strikingly similar: quality inputs, a precise and repeatable process, layered execution, and continuous refinement. The best baristas and the best DevOps engineers share an obsession with craft.</p>

        <p>Start with a solid base. Layer thoughtfully. Eliminate waste. And never stop optimizing.</p>

        <p>Now go brew something great. ☕</p>
      `
    },
    {
      id: "kubernetes-morning-ritual",
      title: "Kubernetes in the Morning: Managing Pods Like a Master Barista",
      slug: "kubernetes-morning-ritual",
      excerpt: "What if I told you that orchestrating a Kubernetes cluster and running a busy coffee shop have more in common than you'd think? Pull up a stool.",
      category: "Kubernetes",
      tags: ["kubernetes", "k8s", "orchestration", "devops"],
      author: "K. Arthi",
      authorInitials: "KA",
      date: "2026-08-10",
      readTime: 9,
      featured: false,
      coverGradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
      coverIcon: "⚙️",
      content: `
        <p>It's 7:45 AM. The coffee shop doors open in 15 minutes. The head barista — let's call her the <strong>Scheduler</strong> — is assessing the morning. Three staff members (Nodes) are ready. A line of orders (Pods) is about to come in. Some orders need dairy alternatives (resource constraints). Some need to be ready in under 3 minutes (QoS requirements). Some need to be re-made if they go wrong (restartPolicy: Always).</p>

        <p>Welcome to Kubernetes.</p>

        <h2>Nodes: Your Barista Team</h2>

        <p>In Kubernetes, <strong>Nodes</strong> are the worker machines that run your workloads. Think of them as individual baristas — each with a fixed capacity (CPU and memory) and specific skills (labels and taints).</p>

        <pre><code class="language-bash">kubectl get nodes
# NAME           STATUS   ROLES    AGE   VERSION
# barista-01     Ready    worker   10d   v1.28.0
# barista-02     Ready    worker   10d   v1.28.0
# barista-03     Ready    worker   10d   v1.28.0</code></pre>

        <p>Just like a coffee shop wouldn't put a trainee barista on the espresso machine during morning rush, Kubernetes uses <strong>node selectors</strong> and <strong>taints</strong> to ensure the right workloads run on the right nodes.</p>

        <h2>Pods: Individual Coffee Orders</h2>

        <p>A <strong>Pod</strong> is the smallest deployable unit in Kubernetes — like a single coffee order ticket. It can contain one container (a single cappuccino) or multiple containers that work together (a tray with coffee, a pastry, and a cup of water).</p>

        <pre><code class="language-yaml">apiVersion: v1
kind: Pod
metadata:
  name: cappuccino-order
  labels:
    drink: cappuccino
    customer: table-7
spec:
  containers:
  - name: espresso
    image: coffee-app:v2.1
    resources:
      requests:
        memory: "64Mi"
        cpu: "250m"
      limits:
        memory: "128Mi"
        cpu: "500m"</code></pre>

        <h2>Deployments: The Standing Menu</h2>

        <p>You don't make each menu item from scratch every morning — you have a recipe (Deployment spec) that defines exactly what each item should look like, and how many you want available at any time (replicas).</p>

        <pre><code class="language-yaml">apiVersion: apps/v1
kind: Deployment
metadata:
  name: latte-service
spec:
  replicas: 3          # Always have 3 lattes ready
  selector:
    matchLabels:
      drink: latte
  template:
    spec:
      containers:
      - name: latte-app
        image: latte-service:v1.4
        ports:
        - containerPort: 8080</code></pre>

        <p>If a Pod dies (someone drops an order), the Deployment controller automatically spins up a replacement — just like a good barista immediately starts remaking a dropped drink without being asked.</p>

        <h2>Horizontal Pod Autoscaler: Rush Hour Mode</h2>

        <p>Monday morning hits. The queue is out the door. Your head barista calls in two more staff from the back. This is exactly what the <strong>Horizontal Pod Autoscaler (HPA)</strong> does for your Kubernetes workloads:</p>

        <pre><code class="language-yaml">apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: coffee-service-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: coffee-service
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70</code></pre>

        <p>When CPU usage crosses 70%, Kubernetes scales up. When the queue dies down after the morning rush, it scales back. Efficient. Automatic. Caffeinated.</p>

        <h2>Services: The Counter</h2>

        <p>Pods come and go — they're ephemeral. Customers don't order from an individual barista; they order at <em>the counter</em>. In Kubernetes, a <strong>Service</strong> is that stable counter. It load-balances traffic across your pods regardless of which ones are running.</p>

        <pre><code class="language-yaml">apiVersion: v1
kind: Service
metadata:
  name: coffee-counter
spec:
  selector:
    app: coffee-service
  ports:
  - protocol: TCP
    port: 80
    targetPort: 8080
  type: LoadBalancer</code></pre>

        <h2>The Philosophy</h2>

        <p>What makes both a great coffee shop and a great Kubernetes cluster work isn't any single component — it's the <em>orchestration</em>. The awareness of capacity, the graceful handling of failures, the ability to scale with demand, and the consistent delivery of quality under pressure.</p>

        <p>Next time you're waiting for your morning coffee, take a moment to appreciate the invisible choreography happening behind the counter. Then go check your cluster. ☕</p>
      `
    },
    {
      id: "cicd-espresso-machine",
      title: "CI/CD Pipelines: The Espresso Machine of Modern DevOps",
      slug: "cicd-espresso-machine",
      excerpt: "A CI/CD pipeline is the espresso machine of your development workflow — complex under the hood, but once it's dialed in, it produces consistent, high-quality output every time.",
      category: "DevOps",
      tags: ["cicd", "devops", "automation", "github-actions"],
      author: "K. Arthi",
      authorInitials: "KA",
      date: "2026-08-05",
      readTime: 6,
      featured: false,
      coverGradient: "linear-gradient(135deg, #1a0533 0%, #2d1b69 60%, #11998e 100%)",
      coverIcon: "🔁",
      content: `
        <p>The first time I used a proper espresso machine, I was overwhelmed. The pressure gauge, the temperature dial, the grind size, the tamping pressure, the extraction time — there were a dozen variables that all had to be right simultaneously. I produced four terrible shots before my first drinkable one.</p>

        <p>Setting up a CI/CD pipeline felt exactly the same.</p>

        <p>But here's the thing about both: once they're dialed in, they are <em>magic</em>. Every shot comes out perfect. Every deployment is clean, tested, and automated. The investment in setup pays dividends for every pull request thereafter.</p>

        <h2>The Grind: Continuous Integration</h2>

        <p>The grind is where everything begins. Too coarse and the extraction is weak. Too fine and it's over-extracted and bitter. <strong>Continuous Integration</strong> is your grind — it's the process that ensures every code change is properly prepared before it goes anywhere near production.</p>

        <p>Here's a GitHub Actions CI workflow that validates code on every push:</p>

        <pre><code class="language-yaml">name: CI — Build & Test

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
      
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run linter
      run: npm run lint
      
    - name: Run tests
      run: npm test -- --coverage
      
    - name: Build application
      run: npm run build</code></pre>

        <p>Every push triggers this workflow. If the grind is wrong — if tests fail, if linting breaks, if the build errors — you know immediately, before it ever touches a deployment environment.</p>

        <h2>The Extraction: Continuous Delivery</h2>

        <p>The extraction is the moment of truth. The water passes through the grounds under precise pressure, and in 25–30 seconds, you either get a perfect shot or you don't. <strong>Continuous Delivery</strong> is your extraction — it's the automated process of taking validated code and delivering it to an environment.</p>

        <pre><code class="language-yaml">  deploy-staging:
    needs: build-and-test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/develop'
    
    steps:
    - name: Deploy to staging
      run: |
        docker build -t my-app:\${{ github.sha }} .
        docker push registry.example.com/my-app:\${{ github.sha }}
        kubectl set image deployment/my-app \\
          my-app=registry.example.com/my-app:\${{ github.sha }} \\
          --namespace=staging
          
  deploy-production:
    needs: deploy-staging
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    environment: production  # Requires manual approval
    
    steps:
    - name: Deploy to production
      run: |
        kubectl set image deployment/my-app \\
          my-app=registry.example.com/my-app:\${{ github.sha }} \\
          --namespace=production</code></pre>

        <h2>Dialing In: The Art of Pipeline Tuning</h2>

        <p>The first espresso machine I properly learned on had a quirk — the extraction pressure ran slightly high, so I had to grind coarser than the recipe said. Every machine has its quirks. Every codebase has its quirks.</p>

        <p>Dialing in your pipeline means:</p>

        <ul>
          <li><strong>Parallelizing jobs</strong> that don't depend on each other</li>
          <li><strong>Caching dependencies</strong> between runs (your pre-ground beans)</li>
          <li><strong>Setting meaningful timeouts</strong> so a hung job doesn't block your whole team</li>
          <li><strong>Using environment-specific secrets</strong> properly</li>
          <li><strong>Sending notifications</strong> when things go wrong — to Slack, email, wherever your team lives</li>
        </ul>

        <h2>The First Shot Always Tastes Different</h2>

        <p>Your first CI/CD pipeline won't be perfect. Neither was your first espresso. But the beauty of automation is iteration — each refinement persists. Each improvement compounds. Once it works, it works every time, for every developer on your team, at any hour of the day.</p>

        <p>Set it up once. Dial it in. Then never push code manually again. ☕</p>
      `
    },
    {
      id: "morning-ritual-coffee-code",
      title: "The Morning Ritual: Coffee, Code, and the Philosophy of Simplicity",
      slug: "morning-ritual-coffee-code",
      excerpt: "There's something meditative about a quiet morning, a fresh cup, and a clean terminal. Here's why I believe the principles of great coffee and great code are one and the same.",
      category: "Coffee Life",
      tags: ["coffee", "productivity", "lifestyle", "developer-life"],
      author: "K. Arthi",
      authorInitials: "KA",
      date: "2026-07-28",
      readTime: 5,
      featured: false,
      coverGradient: "linear-gradient(135deg, #3D2314 0%, #6B3A1F 60%, #C68642 100%)",
      coverIcon: "☕",
      content: `
        <p>6:15 AM. The house is quiet. The sky is that particular shade of blue that exists for maybe twenty minutes before the sun fully commits. I fill the kettle to exactly 600ml, set it to 93°C, and weigh out 18 grams of beans from a single-origin Ethiopian natural I've been working through this week.</p>

        <p>Then I open my terminal.</p>

        <p>For the past several years, this has been my ritual. Coffee and code, before the world wakes up. And the longer I've done it, the more I've noticed that the things that make a great cup of coffee and the things that make great software are, at their core, the same things.</p>

        <h2>Simplicity Is Not Simple</h2>

        <p>A pour-over coffee, made well, involves exactly four ingredients: water, beans, a filter, and time. The simplicity is deceptive. Within those four variables are thousands of micro-decisions — grind size, water temperature, pour rate, bloom time, total extraction time — each of which affects the final cup in measurable ways.</p>

        <p>Good software is the same. The best codebases I've worked in look simple from the outside — clean APIs, obvious abstractions, clear names. But the simplicity is the result of countless deliberate decisions, each one choosing clarity over cleverness, doing one thing over doing everything.</p>

        <blockquote>
          "Simplicity is the ultimate sophistication." — Leonardo da Vinci (and also, essentially, every good software architect.)
        </blockquote>

        <h2>Freshness Matters</h2>

        <p>Coffee starts losing complexity within weeks of roasting. Dependencies start accumulating CVEs within months of release. Both need regular attention — not obsessive churn, but mindful maintenance. The barista who orders beans weekly, and the engineer who runs <code>npm audit</code> regularly, share the same instinct: freshness has quality implications.</p>

        <h2>The Ritual Protects the Work</h2>

        <p>Here's something I didn't expect when I started this morning ritual: the coffee doesn't just caffeinate me. The <em>process</em> of making it — the weighing, the bloom, the slow pour — creates a cognitive transition. It's a separator between sleep-brain and work-brain. By the time the cup is done, I'm in a different mental state than when I started.</p>

        <p>Great engineers have their own versions of this. The commit message that forces you to articulate what you actually changed. The code review that makes you look at your own work with a stranger's eyes. The post-mortem that turns a failure into institutional knowledge. Rituals create consistency. Consistency creates quality.</p>

        <h2>You Can't Rush the Bloom</h2>

        <p>When you first pour hot water on fresh coffee grounds, you have to wait 30–45 seconds for the CO₂ to bloom out. If you rush it, the gas blocks even extraction and you get a flat, sour cup. There's no shortcut. The chemistry needs its time.</p>

        <p>Neither can you rush a well-designed system. A proper database schema, a well-considered API design, a carefully planned migration — these need their bloom time too. The technical debt from rushing that phase compounds in ways that make every subsequent cup taste a little worse.</p>

        <h2>It's Not About the Coffee</h2>

        <p>I've told colleagues I'm a coffee person, and they nod and point me toward the office machine. They miss the point. It's not about the caffeine. It's about the attention. The care. The practice of making one small thing, deliberately and well, before you try to make anything larger.</p>

        <p>That's the ritual. That's what this blog is about. The intersection of careful craft and complex systems — whether you're dialing in a grind or debugging a distributed trace.</p>

        <p>Welcome. The kettle's on. ☕</p>
      `
    }
  ]
};
