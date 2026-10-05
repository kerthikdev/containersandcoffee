// ☕ Containers & Coffee — Interactive Roadmaps Data (Inspired by roadmap.sh)
// Defined as global window.ROADMAP_DATA

window.ROADMAP_DATA = {
  ccna: {
    id: "ccna",
    badge: "Networking Foundation",
    title: "Cisco CCNA & Enterprise Network Engineer",
    subtitle: "A comprehensive, packet-level engineering path from binary subnetting and OSI layers to enterprise VLAN switching, OSPF dynamic routing, and NetDevOps automation.",
    icon: "🌐",
    targetRole: "Network Engineer, NOC Analyst, Cloud NetOps Specialist",
    certification: "Cisco Certified Network Associate (CCNA 200-301)",
    duration: "8–10 Weeks",
    prerequisites: "Basic Computer Literacy & Command Line Interface",
    phases: [
      {
        id: "ccna-phase-1",
        number: "01",
        title: "Network Fundamentals & Physical Layer",
        desc: "Mastering the foundational physics and protocol handshakes of modern digital communication.",
        topics: [
          {
            name: "OSI 7-Layer Model",
            type: "core",
            desc: "Physical, Data Link, Network, Transport, Session, Presentation, Application. Understanding PDU headers at each stage (Frames, Packets, Segments).",
            command: "tcpdump -nnvv -i eth0"
          },
          {
            name: "TCP vs UDP Protocols",
            type: "core",
            desc: "Connection-oriented reliable delivery (SYN, SYN-ACK, ACK, windowing) vs connectionless low-latency datagrams (DNS, VoIP, DHCP).",
            command: "nc -zv 192.168.1.1 22 80 443"
          },
          {
            name: "IPv4 Addressing & VLSM",
            type: "core",
            desc: "Binary octet arithmetic, subnet masks, network vs host bits, Classless Inter-Domain Routing (CIDR /8 to /30), and zero IP wastage calculations.",
            command: "ipcalc 192.168.10.0/26"
          },
          {
            name: "IPv6 Global Unicast",
            type: "recommended",
            desc: "128-bit hexadecimal addressing, Link-Local (fe80::), SLAAC auto-configuration, Neighbor Discovery Protocol (NDP), replacing ARP.",
            command: "ping6 -I eth0 ff02::1"
          },
          {
            name: "Ethernet Framing & Cabling",
            type: "recommended",
            desc: "Cat5e/Cat6 UTP pinouts (T568A/B), Single-mode vs Multi-mode fiber optics, SFP+ transceivers, MTU (1500 bytes) and MSS negotiation.",
            command: "ip link show eth0"
          }
        ],
        lab: "Design a 4-subnet VLSM IP scheme for a company of 500 workstations in Cisco Packet Tracer. Inspect TCP 3-way handshakes and ARP exchanges using Wireshark packet capture."
      },
      {
        id: "ccna-phase-2",
        number: "02",
        title: "Layer 2 Campus Switching & VLANs",
        desc: "Architecting high-speed, loop-free campus local area networks across redundant hardware switches.",
        topics: [
          {
            name: "Switch MAC Forwarding",
            type: "core",
            desc: "How switches populate Content Addressable Memory (CAM) tables via source MAC addresses and forward or flood frames.",
            command: "show mac address-table dynamic"
          },
          {
            name: "VLANs & 802.1Q Trunking",
            type: "core",
            desc: "Segmenting broadcast domains logically. Configuring access ports, 802.1Q tagging on trunk uplinks, native VLAN security, and VTP modes.",
            command: "switchport mode trunk; switchport trunk allowed vlan 10,20,30"
          },
          {
            name: "Spanning Tree Protocol (STP)",
            type: "core",
            desc: "Preventing Layer 2 broadcast storms. Understanding Bridge IDs, Root Bridge election, PortFast, BPDU Guard, and Rapid-PVST+ convergence.",
            command: "show spanning-tree summary"
          },
          {
            name: "EtherChannel (LACP)",
            type: "recommended",
            desc: "Bundling multiple physical Ethernet links into a single logical channel for increased bandwidth and link-level failover.",
            command: "channel-group 1 mode active"
          },
          {
            name: "Switch Port Security",
            type: "recommended",
            desc: "Mitigating CAM table overflow and rogue devices using static MAC binding, sticky MACs, and violation shutdown modes.",
            command: "switchport port-security violation restrict"
          }
        ],
        lab: "Build a 3-switch redundant triangle topology in Packet Tracer. Configure LACP EtherChannel trunks, designate a deterministic Root Bridge, and verify sub-second convergence during link drops."
      },
      {
        id: "ccna-phase-3",
        number: "03",
        title: "Layer 3 Routing & IP Network Services",
        desc: "Interconnecting networks across dynamic routing protocols and high-availability enterprise services.",
        topics: [
          {
            name: "Inter-VLAN Routing",
            type: "core",
            desc: "Routing between VLANs using Router-on-a-Stick (sub-interfaces with encapsulation dot1Q) and Layer 3 Switch Switch Virtual Interfaces (SVIs).",
            command: "interface gigabitEthernet 0/0.10; encapsulation dot1Q 10"
          },
          {
            name: "OSPFv2 Dynamic Routing",
            type: "core",
            desc: "Open Shortest Path First: Link-state protocol using Dijkstra SPF algorithm, Area 0 backbone, router IDs, neighbor states, and cost metrics.",
            command: "router ospf 1; network 10.0.0.0 0.0.255.255 area 0"
          },
          {
            name: "Default & Floating Static Routes",
            type: "core",
            desc: "Configuring default gateway of last resort (0.0.0.0/0) and backup floating static routes using administrative distance tuning.",
            command: "ip route 0.0.0.0 0.0.0.0 192.168.1.1 10"
          },
          {
            name: "First Hop Redundancy (HSRP)",
            type: "recommended",
            desc: "Creating virtual gateway IP addresses shared across redundant routers with active/standby state machines and priority preemption.",
            command: "standby 1 ip 10.0.0.1; standby 1 priority 110; standby 1 preempt"
          },
          {
            name: "DHCP Snooping & DAI",
            type: "recommended",
            desc: "Hardening networks against rogue DHCP servers and ARP poisoning by maintaining trusted port tables and inspecting ARP packets.",
            command: "ip dhcp snooping; ip arp inspection vlan 10"
          }
        ],
        lab: "Deploy a multi-area OSPF backbone with 4 routers. Configure dual-router HSRP active/standby failover and verify seamless VoIP traffic forwarding when the primary router interface is shut down."
      },
      {
        id: "ccna-phase-4",
        number: "04",
        title: "Network Security, NAT & NetDevOps",
        desc: "Hardening infrastructure borders, conserving IP addresses, and introducing programmable network automation.",
        topics: [
          {
            name: "Extended Access Lists (ACLs)",
            type: "core",
            desc: "Stateful filtering based on source, destination, port numbers, and protocol types to isolate critical subnets.",
            command: "access-list 101 permit tcp 10.0.1.0 0.0.0.255 any eq 443"
          },
          {
            name: "NAT Overload / PAT",
            type: "core",
            desc: "Port Address Translation mapping thousands of private RFC 1918 addresses to a single public IP using ephemeral transport ports.",
            command: "ip nat inside source list 1 interface gig0/0 overload"
          },
          {
            name: "Site-to-Site IPsec VPN",
            type: "recommended",
            desc: "Building encrypted tunnels over the public internet: IKE Phase 1 ISAKMP SAs, Phase 2 IPsec transform sets, and crypto maps.",
            command: "show crypto session"
          },
          {
            name: "Python Netmiko Automation",
            type: "recommended",
            desc: "Automating repetitive network administrative tasks via SSH using Python scripts to execute commands and parse running configs.",
            command: "python3 -c \"import netmiko; print('Netmiko Ready')\""
          },
          {
            name: "REST APIs & JSON Serialization",
            type: "recommended",
            desc: "Transitioning from CLI scraping to RESTCONF and NETCONF using structured JSON and YAML data payloads.",
            command: "curl -k -u cisco:cisco -X GET https://router/restconf/data/"
          }
        ],
        lab: "Develop a Python Netmiko script that connects to 5 switches simultaneously, audits running configs for unauthorized VLANs, and deploys extended ACL hardening rules in under 10 seconds."
      }
    ]
  },

  cloud: {
    id: "cloud",
    badge: "Cloud Architecture",
    title: "AWS Cloud Solutions Architect & Systems Engineer",
    subtitle: "An enterprise roadmap for architecting resilient, secure, high-performing, and cost-optimized multi-region infrastructures on Amazon Web Services.",
    icon: "☁️",
    targetRole: "Cloud Architect, AWS Solutions Engineer, Cloud Infrastructure Lead",
    certification: "AWS Certified Solutions Architect Associate (SAA-C03) & Professional",
    duration: "10–12 Weeks",
    prerequisites: "Networking Foundations (VLANs, CIDR) & Linux Systems Administration",
    phases: [
      {
        id: "cloud-phase-1",
        number: "01",
        title: "Cloud Identity, Governance & Security",
        desc: "Establishing foundational multi-account boundaries, encryption keys, and least-privilege security posture.",
        topics: [
          {
            name: "AWS Organizations & SCPs",
            type: "core",
            desc: "Centralized account management, consolidated billing, and preventive guardrails using Service Control Policies across organizational units.",
            command: "aws organizations list-accounts"
          },
          {
            name: "IAM Least-Privilege & Roles",
            type: "core",
            desc: "User, Group, Role, and Policy definitions. AssumeRole with STS temporary credentials, MFA enforcement, and identity federation.",
            command: "aws sts get-caller-identity"
          },
          {
            name: "AWS KMS Encryption",
            type: "core",
            desc: "Customer Managed Keys (CMK), envelope encryption, automatic key rotation, and seamless integration with S3, EBS, and RDS.",
            command: "aws kms list-keys"
          },
          {
            name: "CloudTrail & AWS Config",
            type: "recommended",
            desc: "Continuous immutable API auditing with CloudTrail and automated compliance tracking and drift detection via AWS Config rules.",
            command: "aws cloudtrail describe-trails"
          },
          {
            name: "AWS Secrets Manager",
            type: "recommended",
            desc: "Secure storage, programmatic retrieval, and automatic rotation of database credentials, API keys, and certificates.",
            command: "aws secretsmanager get-secret-value --secret-id app/db"
          }
        ],
        lab: "Deploy an AWS Organizations landing zone with isolated Production, Development, and Security audit accounts guarded by strict preventative SCP policies."
      },
      {
        id: "cloud-phase-2",
        number: "02",
        title: "Enterprise Cloud Networking (VPC)",
        desc: "Designing highly available, multi-AZ virtual network topologies with private isolation and hybrid interconnects.",
        topics: [
          {
            name: "Custom Multi-Tier VPC",
            type: "core",
            desc: "Allocating non-overlapping CIDR blocks, creating Public Web, Private Application, and Isolated Database subnets across 3 Availability Zones.",
            command: "aws ec2 describe-vpcs"
          },
          {
            name: "Internet & NAT Gateways",
            type: "core",
            desc: "Attaching Internet Gateways for public egress and deploying redundant managed NAT Gateways per AZ to enable private instance updates.",
            command: "aws ec2 describe-nat-gateways"
          },
          {
            name: "Route Tables & Security Groups",
            type: "core",
            desc: "Defining subnet routing rules (0.0.0.0/0 to IGW/NAT) and configuring stateful Security Groups and stateless Network ACLs.",
            command: "aws ec2 describe-route-tables"
          },
          {
            name: "AWS Transit Gateway (TGW)",
            type: "recommended",
            desc: "Hub-and-spoke network transit hub simplifying connectivity between hundreds of VPCs and on-premises corporate datacenters.",
            command: "aws ec2 describe-transit-gateways"
          },
          {
            name: "VPC Endpoints & PrivateLink",
            type: "recommended",
            desc: "Accessing AWS services (S3, DynamoDB, ECR) over private AWS backbone fiber without traversing the public internet.",
            command: "aws ec2 describe-vpc-endpoints"
          }
        ],
        lab: "Build a 3-tier Multi-AZ VPC using Terraform. Verify that private application EC2 instances pull container images and S3 assets exclusively via PrivateLink VPC Endpoints."
      },
      {
        id: "cloud-phase-3",
        number: "03",
        title: "Scalable Compute, Storage & Load Balancing",
        desc: "Architecting self-healing, horizontally scalable application tiers with elastic compute and distributed storage.",
        topics: [
          {
            name: "Amazon EC2 & Launch Templates",
            type: "core",
            desc: "Instance sizing (Compute, Memory, Storage optimized), user-data bootstrap automation, and standardized Launch Templates.",
            command: "aws ec2 describe-instances --filters \"Name=instance-state-name,Values=running\""
          },
          {
            name: "Auto Scaling Groups (ASG)",
            type: "core",
            desc: "Dynamic scaling policies (Target Tracking, Step, Simple), self-healing unhealthy instance replacement, and multi-AZ instance distribution.",
            command: "aws autoscaling describe-auto-scaling-groups"
          },
          {
            name: "Elastic Load Balancers (ALB/NLB)",
            type: "core",
            desc: "Application Load Balancer (Layer 7 path-based routing, SSL offloading) vs Network Load Balancer (Layer 4 ultra-low latency TCP/UDP).",
            command: "aws elbv2 describe-load-balancers"
          },
          {
            name: "Amazon S3 Storage Tiers",
            type: "core",
            desc: "Standard, Infrequent Access, Intelligent-Tiering, and Glacier. Versioning, Object Lock compliance, and S3 Lifecycle transition rules.",
            command: "aws s3 ls"
          },
          {
            name: "Serverless EventBridge & Lambda",
            type: "recommended",
            desc: "Event-driven compute running code in response to system events, API Gateway invocations, and queue backlogs without server management.",
            command: "aws lambda list-functions"
          }
        ],
        lab: "Deploy a high-availability web cluster behind an Application Load Balancer with an Auto Scaling Group configured to automatically scale from 2 to 10 instances under load."
      },
      {
        id: "cloud-phase-4",
        number: "04",
        title: "Resilient Databases, Edge Delivery & Well-Architected",
        desc: "Achieving high availability, sub-second global edge latency, and applying the 6 Pillars of architectural excellence.",
        topics: [
          {
            name: "Amazon RDS Multi-AZ & Aurora",
            type: "core",
            desc: "Synchronous multi-AZ replication with automatic zero-data-loss failover, read replicas for scaling read queries, and Aurora auto-scaling storage.",
            command: "aws rds describe-db-instances"
          },
          {
            name: "Redis & In-Memory Caching (ElastiCache)",
            type: "core",
            desc: "Sub-millisecond query caching using Redis Cluster and AWS ElastiCache. Key eviction policies (LRU/LFU), replication groups, automated failover with Sentinel, and Redis persistence (RDB/AOF).",
            command: "redis-cli -h cluster.cache.amazonaws.com -p 6379 ping"
          },
          {
            name: "CloudFront Global CDN & WAF",
            type: "core",
            desc: "Global edge points of presence (PoPs), SSL termination at the edge, origin shield caching, and AWS WAF rules mitigating SQL injection and DDoS.",
            command: "aws cloudfront list-distributions"
          },
          {
            name: "Route 53 Advanced DNS",
            type: "core",
            desc: "Alias records, Latency-based routing, Geolocation routing, and health checks with automatic multi-region failover DNS records.",
            command: "aws route53 list-hosted-zones"
          },
          {
            name: "AWS Well-Architected Framework",
            type: "recommended",
            desc: "Auditing architecture against the 6 pillars: Operational Excellence, Security, Reliability, Performance Efficiency, Cost Optimization, and Sustainability.",
            command: "aws wellarchitected list-workloads"
          },
          {
            name: "Disaster Recovery Strategies",
            type: "recommended",
            desc: "Evaluating Recovery Time Objective (RTO) and Recovery Point Objective (RPO): Backup & Restore, Pilot Light, Warm Standby, Multi-Region Active-Active.",
            command: "aws backup list-backup-plans"
          }
        ],
        lab: "Perform a simulated disaster recovery failover on an Amazon Aurora global database cluster while measuring edge cache hit ratios through CloudFront and AWS WAF."
      }
    ]
  },

  devops: {
    id: "devops",
    badge: "DevOps & SRE Mastery",
    title: "DevOps Engineer & Site Reliability Architect",
    subtitle: "The complete roadmap from Linux internals and immutable containerization to modular Terraform, production Kubernetes orchestration, GitOps CI/CD, and full-stack SRE telemetry.",
    icon: "🚀",
    targetRole: "DevOps Engineer, Platform Engineer, Site Reliability Engineer (SRE)",
    certification: "CKA (Kubernetes Administrator) & HashiCorp Terraform Associate",
    duration: "12–16 Weeks",
    prerequisites: "Linux Administration, Networking Fundamentals & Basic Programming / Scripting",
    phases: [
      {
        id: "devops-phase-1",
        number: "01",
        title: "Linux Administration & Shell Automation",
        desc: "Mastering the host operating system that powers 95%+ of global cloud infrastructure.",
        topics: [
          {
            name: "Linux Kernel & Systemd",
            type: "core",
            desc: "Systemd service unit definitions, daemon management, boot targets, journalctl logs, and kernel process signals (SIGTERM, SIGKILL).",
            command: "systemctl status; journalctl -u nginx -f"
          },
          {
            name: "Bash Shell Automation",
            type: "core",
            desc: "Writing idempotent scripts: variables, arguments, loops, pipes, exit code handling (`set -euo pipefail`), and cron scheduling.",
            command: "bash -n script.sh"
          },
          {
            name: "Linux Permissions & Security",
            type: "core",
            desc: "Octal permissions (chmod 755), ownership (chown), sudoers privilege boundaries, and SSH key pairs with hardened sshd configurations.",
            command: "chmod 600 ~/.ssh/id_rsa"
          },
          {
            name: "Git Workflows & Rebasing",
            type: "core",
            desc: "Branching strategies (Trunk-Based Development), resolving merge conflicts, interactive rebasing (`git rebase -i`), and commit hygiene.",
            command: "git status -sb; git log --oneline -n 10"
          },
          {
            name: "Network & Performance Triage",
            type: "recommended",
            desc: "Diagnosing live bottlenecks using terminal utilities: `top`, `htop`, `vmstat`, `netstat`, `ss`, `tcpdump`, `dig`, and `mtr`.",
            command: "ss -tulpn; vmstat 1 5"
          }
        ],
        lab: "Write a production Bash script that continuously audits server memory, CPU pressure, and disk saturation, rotating compressed logs and dispatching webhook alerts on failure."
      },
      {
        id: "devops-phase-2",
        number: "02",
        title: "Containerization & Image Hardening",
        desc: "Packaging applications into secure, lightweight, and immutable container artifacts.",
        topics: [
          {
            name: "Docker Engine Architecture",
            type: "core",
            desc: "Linux kernel namespaces (isolation), cgroups (resource limits), union filesystems (Overlay2), and OCI specifications.",
            command: "docker system df; docker info"
          },
          {
            name: "Multi-Stage Dockerfiles",
            type: "core",
            desc: "Separating compile-time dependencies from runtime containers using builder stages and minimal runtime bases (Alpine / Distroless).",
            command: "docker build --no-cache -t app:v1 ."
          },
          {
            name: "Docker Compose",
            type: "core",
            desc: "Orchestrating multi-container local microservice stacks with custom bridge networks, volume mounts, and environment configuration.",
            command: "docker compose up -d --build"
          },
          {
            name: "Container Security & Rootless",
            type: "recommended",
            desc: "Running containers with non-root UID/GID, read-only root filesystems, drop capabilities, and scanning images using Trivy.",
            command: "trivy image --severity HIGH,CRITICAL app:v1"
          },
          {
            name: "OCI Artifact Registries",
            type: "recommended",
            desc: "Publishing semantic versioned container images to Amazon ECR, GitHub Container Registry (ghcr.io), and Docker Hub.",
            command: "docker tag app:v1 ghcr.io/org/app:v1; docker push ghcr.io/org/app:v1"
          }
        ],
        lab: "Take an unoptimized 1.2GB NodeJS monolithic container, refactor it into a 45MB multi-stage Alpine build, and audit it with Trivy to achieve zero vulnerabilities."
      },
      {
        id: "devops-phase-3",
        number: "03",
        title: "Infrastructure as Code with Terraform",
        desc: "Provisioning and managing cloud infrastructure declaratively with version-controlled code.",
        topics: [
          {
            name: "Terraform (HCL) Core Syntax",
            type: "core",
            desc: "Providers, Resources, Data Sources, Input Variables, Local Values, and Output definitions in declarative HashiCorp HCL.",
            command: "terraform init; terraform fmt; terraform validate"
          },
          {
            name: "Remote State & Locking",
            type: "core",
            desc: "Storing terraform.tfstate securely in Amazon S3 with server-side encryption and DynamoDB distributed state locking to prevent concurrency collisions.",
            command: "terraform plan -out=tfplan"
          },
          {
            name: "Modular Architecture",
            type: "core",
            desc: "Designing reusable, versioned modules for networking, compute, and databases across multiple deployment environments (Dev, Staging, Prod).",
            command: "terraform get -update"
          },
          {
            name: "Drift Detection & Refresh",
            type: "recommended",
            desc: "Detecting discrepancies between cloud reality and code state using `terraform refresh` and automated drift monitoring pipelines.",
            command: "terraform plan -detailed-exitcode"
          },
          {
            name: "Ansible Configuration Management",
            type: "recommended",
            desc: "Agentless configuration management using YAML playbooks, inventory files, and idempotent tasks to configure OS software packages.",
            command: "ansible-playbook -i inventory.ini site.yml"
          }
        ],
        lab: "Write a modular Terraform configuration that provisions a complete multi-AZ AWS VPC, public/private subnets, and RDS database with state locking in under 2 minutes."
      },
      {
        id: "devops-phase-4",
        number: "04",
        title: "Kubernetes (K8s) Cluster Architecture",
        desc: "Deploying, scaling, and managing containerized microservices across production distributed clusters.",
        topics: [
          {
            name: "K8s Control Plane & Nodes",
            type: "core",
            desc: "Kube-apiserver, etcd consensus datastore, kube-scheduler, kube-controller-manager, and worker node kubelet & kube-proxy components.",
            command: "kubectl get nodes -o wide; kubectl cluster-info"
          },
          {
            name: "Core Workloads (Pods, Deployments)",
            type: "core",
            desc: "Managing Pods, ReplicaSets, Deployments (rolling updates), StatefulSets (persistent databases), and DaemonSets (system logging).",
            command: "kubectl get pods,deployments,services -n production"
          },
          {
            name: "Services & Ingress Controllers",
            type: "core",
            desc: "Service abstraction (ClusterIP, NodePort, LoadBalancer) and Layer 7 HTTP routing with Ingress-Nginx and automated Let's Encrypt TLS certificates.",
            command: "kubectl describe ingress app-ingress"
          },
          {
            name: "ConfigMaps, Secrets & Volumes",
            type: "core",
            desc: "Injecting runtime environment variables and sensitive keys via Kubernetes Secrets, PersistentVolumeClaims (PVC), and CSI storage drivers.",
            command: "kubectl get pvc,pv"
          },
          {
            name: "Helm Chart Package Management",
            type: "recommended",
            desc: "Templating Kubernetes manifests into reproducible Helm packages, managing values.yaml overrides, and release lifecycle rollbacks.",
            command: "helm upgrade --install app ./chart -f values-prod.yaml"
          },
          {
            name: "Horizontal Pod Autoscaler (HPA)",
            type: "recommended",
            desc: "Automatically scaling pod replicas based on CPU, memory, and custom Prometheus metrics with resource requests and limits enforcement.",
            command: "kubectl autoscale deployment app --cpu-percent=70 --min=2 --max=10"
          }
        ],
        lab: "Deploy a microservice to an Amazon EKS or local Kubernetes cluster using Helm, complete with Ingress-Nginx routing, automated TLS certificates, and Horizontal Pod Autoscaling."
      },
      {
        id: "devops-phase-5",
        number: "05",
        title: "GitOps CI/CD Pipelines & Continuous Delivery",
        desc: "Automating the delivery lifecycle from developer commit to automated zero-downtime production deployment.",
        topics: [
          {
            name: "GitHub Actions Workflows",
            type: "core",
            desc: "Declarative CI workflows: triggers (push, pull_request), runner matrices, caching dependencies, and publishing build artifacts.",
            command: "cat .github/workflows/deploy.yml"
          },
          {
            name: "Automated Testing & SAST",
            type: "core",
            desc: "Integrating automated unit tests, linting, SonarQube static application security testing, and container vulnerability scans before build.",
            command: "npm test; trivy fs --exit-code 1 ."
          },
          {
            name: "ArgoCD GitOps Engine",
            type: "core",
            desc: "Declarative Kubernetes cluster synchronization where Git is the single source of truth. Automated self-healing and drift correction.",
            command: "argocd app sync production-app"
          },
          {
            name: "Deployment Strategies",
            type: "recommended",
            desc: "Implementing Blue-Green deployments and Canary rollouts with automated metric validation and instant zero-downtime rollbacks.",
            command: "kubectl rollout status deployment/app"
          },
          {
            name: "Jenkins Declarative Pipelines",
            type: "recommended",
            desc: "Enterprise CI/CD automation using Jenkinsfile pipeline-as-code, agent executors, credentials management, and stage parallelization.",
            command: "jenkins-cli build deploy-job -s"
          }
        ],
        lab: "Build a complete GitOps delivery pipeline where a GitHub Pull Request merge automatically triggers linting, Docker build, and triggers ArgoCD to perform a zero-downtime Canary deployment."
      },
      {
        id: "devops-phase-6",
        number: "06",
        title: "Observability, DevSecOps & SRE Practice",
        desc: "Monitoring, alerting, and maintaining 99.99% system reliability across distributed production infrastructure.",
        topics: [
          {
            name: "Prometheus Metric Collection",
            type: "core",
            desc: "Time-series database, PromQL queries, Node Exporter hardware metrics, and application instrumentation using Prometheus client libraries.",
            command: "curl -s http://localhost:9090/metrics | head -n 20"
          },
          {
            name: "Grafana Dashboards & Telemetry",
            type: "core",
            desc: "Visualizing system health, custom alerting rules, and tracking the 4 Golden Signals: Latency, Traffic, Errors, and Saturation.",
            command: "grafana-cli plugins list"
          },
          {
            name: "SRE Disciplines (SLI / SLO)",
            type: "core",
            desc: "Service Level Indicators, Service Level Objectives, Error Budgets, and blameless post-mortem incident review processes.",
            command: "cat postmortem-template.md"
          },
          {
            name: "Centralized Logging (EFK/Loki)",
            type: "recommended",
            desc: "Aggregating container stdout logs via Promtail or Fluentbit into Grafana Loki or Elasticsearch for instant distributed querying.",
            command: "logcli query '{app=\"production\"}'"
          },
          {
            name: "Alertmanager & Incident Ops",
            type: "recommended",
            desc: "Deduplication, grouping, and routing of alerts to Slack, PagerDuty, and webhooks with inhibition and silence rules.",
            command: "amtool alert --alertmanager.url=http://localhost:9093"
          }
        ],
        lab: "Construct a production Grafana dashboard measuring Kubernetes pod resource consumption, HTTP 5xx error spikes, and automated Alertmanager notifications sent to Slack."
      }
    ]
  }
};
