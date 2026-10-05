// ☕ Containers & Coffee — Blog Post Data
// All blog content is defined here as a global JS variable.

window.BLOG_DATA = {
  site: {
    name: "Containers & Coffee",
    tagline: "DevOps thoughts, brewed fresh daily.",
    author: "Aajera Banu",
    authorBio: "DevOps engineer, cloud architect, and coffee enthusiast. I write about Docker, Kubernetes, CI/CD pipelines, cloud infrastructure, and the daily rituals that keep engineering reliable.",
    authorInitials: "AB",
    social: {
      github: "https://github.com",
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com"
    }
  },
  posts: [
    {
      id: "ccna-to-cloud",
      title: "From CCNA to Cloud: Why Networking is the Unsung Secret of Every Elite DevOps Engineer",
      slug: "ccna-to-cloud",
      excerpt: "They told you the cloud abstracts away networking. They were wrong. Here is how mastering packet flow, CIDR blocks, and routing tables transforms you from a script runner into an unstoppable Cloud & DevOps Architect.",
      category: "Networking",
      tags: ["networking", "ccna", "aws", "cloud", "devops", "vpc", "terraform"],
      author: "Aajera Banu",
      authorInitials: "AB",
      date: "2026-10-05",
      readTime: 8,
      featured: true,
      coverGradient: "linear-gradient(135deg, #091e3a 0%, #10375c 50%, #1a508b 100%)",
      coverIcon: "🌐",
      content: `
        <p>When you sit down with a fresh pour-over coffee, you notice the bright berry aromas, the silky body, and the clean finish. But beneath that cup lies fluid dynamics, hydraulic resistance, water temperature curves, and hydrostatic pressure. If the water cannot penetrate the coffee bed evenly, you get harsh channeling and a ruined brew.</p>

        <p>In modern cloud engineering, microservices and Kubernetes pods are the coffee beans. <strong>Networking is the water pressure.</strong> You can write the cleanest Go service or configure the prettiest Helm chart in the universe, but if the packets cannot traverse the network topology, your entire production stack is dead in the water.</p>

        <h2>The Modern Myth: "The Cloud Abstracted Away Networking"</h2>

        <p>Over the last decade, junior developers and bootcamps popularized a dangerous myth: <em>"We have serverless and Kubernetes now. Physical cables are gone. We don't need to know networking anymore."</em></p>

        <p>Then, the inevitable happens in production:</p>
        <ul>
          <li>An EC2 worker in a private subnet can't pull an image from Docker Hub.</li>
          <li>A backend container can't connect to Amazon Aurora RDS, and the engineer spends four hours toggling IAM permissions before realizing there's no Security Group egress rule.</li>
          <li>A Kubernetes cluster exhausts its VPC IP space because the team chose a naive <code>/24</code> CIDR block for a cluster scheduled to scale to 500 pods.</li>
        </ul>

        <p>The cloud didn't eliminate networking — <strong>it virtualized it, made it programmable, and made mistakes infinitely more expensive</strong>. The engineers who navigate these crises effortlessly almost always share one credential: a foundation in Cisco CCNA.</p>

        <blockquote>
          "A developer looks at the cloud as a collection of APIs. A network engineer looks at the cloud as a vast fabric of routing tables, encapsulated frames, and packet state machines. Guess who solves production outages first?"
        </blockquote>

        <h2>The Rosetta Stone: Translating CCNA to AWS Cloud</h2>

        <p>The beauty of learning Cisco CCNA (Routing and Switching) is that networking fundamentals are eternal. RFC 1918, the OSI 7-layer model, and TCP/IP three-way handshakes apply just as rigorously to an Amazon VPC in <code>us-east-1</code> as they do to a physical Catalyst switch sitting in an on-premises rack.</p>

        <p>Here is the mental translation every network engineer uses when stepping into AWS Cloud architecture:</p>

        <div class="table-responsive">
          <table class="cc-table">
            <thead>
              <tr>
                <th>Physical / Cisco World</th>
                <th>AWS Cloud Architecture</th>
                <th>Operational Behavior</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Switch VLANs &amp; 802.1Q Trunks</strong></td>
                <td><strong>Subnets &amp; Virtual Private Clouds (VPC)</strong></td>
                <td>Logical isolation within shared compute fabric; broadcast domains.</td>
              </tr>
              <tr>
                <td><strong>Hardware Router &amp; Default Gateway</strong></td>
                <td><strong>Internet Gateway (IGW) &amp; Route Tables</strong></td>
                <td>Horizontally scaled, redundant software router managed by AWS.</td>
              </tr>
              <tr>
                <td><strong>NAT Overload / PAT</strong></td>
                <td><strong>AWS NAT Gateway</strong></td>
                <td>Translates private IPs to public elastic IP for outbound requests.</td>
              </tr>
              <tr>
                <td><strong>Stateless Router ACLs</strong></td>
                <td><strong>Network ACLs (NACLs)</strong></td>
                <td>Subnet-level boundary filtering; requires explicit return port rules.</td>
              </tr>
              <tr>
                <td><strong>Stateful Firewalls (Cisco ASA)</strong></td>
                <td><strong>Security Groups (SG)</strong></td>
                <td>Instance/ENI-level firewall; automatically tracks stateful connections.</td>
              </tr>
              <tr>
                <td><strong>Leased Lines &amp; MPLS</strong></td>
                <td><strong>AWS Direct Connect (DX) &amp; Site-to-Site VPN</strong></td>
                <td>Dedicated physical fiber interconnect with BGP dynamic route exchange.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Deep Dive: Bulletproof VPC Subnetting with VLSM</h2>

        <p>One of the earliest skills you drill in CCNA is <strong>VLSM (Variable Length Subnet Masking)</strong> and CIDR calculation. In AWS, IP address design is irreversible without rebuilding your VPC from scratch.</p>

        <p>Remember: <strong>AWS always reserves 5 IP addresses in every subnet</strong>:</p>
        <ul>
          <li><code>.0</code>: Network address</li>
          <li><code>.1</code>: VPC router (default gateway)</li>
          <li><code>.2</code>: Amazon-provided DNS mapping</li>
          <li><code>.3</code>: Future AWS reservation</li>
          <li><code>.255</code>: Network broadcast address</li>
        </ul>

        <p>If you create a <code>/28</code> subnet (16 theoretical IPs), you only get <strong>11 usable IP addresses</strong>! Spin up an Application Load Balancer and two RDS replicas, and your subnet is completely exhausted.</p>

        <p>Here is the production blueprint I teach at LIVEWIRE for a rock-solid, multi-AZ cloud architecture starting from a <code>10.0.0.0/16</code> block:</p>

        <pre><code class="language-plaintext">VPC CIDR Block: 10.0.0.0/16 (65,536 total IP addresses)
├── Public Tier (Web / ALBs / NAT Gateways):
│   ├── Subnet Public-1A: 10.0.1.0/24  (251 usable IPs in AZ-1)
│   └── Subnet Public-1B: 10.0.2.0/24  (251 usable IPs in AZ-2)
├── Private Application Tier (EC2 / ECS / EKS Pods):
│   ├── Subnet App-1A:    10.0.10.0/24 (251 usable IPs in AZ-1)
│   └── Subnet App-1B:    10.0.20.0/24 (251 usable IPs in AZ-2)
├── Isolated Database Tier (RDS / Elasticache / DocumentDB):
│   ├── Subnet DB-1A:     10.0.30.0/24 (251 usable IPs in AZ-1)
│   └── Subnet DB-1B:     10.0.40.0/24 (251 usable IPs in AZ-2)
└── Spare Capacity for EKS Expansion:
    └── 10.0.128.0/18 (16,384 IPs reserved for microservice pods)</code></pre>

        <h2>Turning Packets into Code: Terraform VPC Blueprint</h2>

        <p>In the on-premises world, we configured interfaces with IOS commands (<code>conf t</code>, <code>interface GigabitEthernet0/1</code>). In the DevOps world, we declare our network topology as immutable code using Terraform.</p>

        <p>Notice how our CCNA knowledge of route propagation directly dictates our Terraform resource graph:</p>

        <pre><code class="language-hcl"># Define our foundational VPC
resource "aws_vpc" "containers_coffee_vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    Name        = "containers-and-coffee-production-vpc"
    Environment = "production"
    ManagedBy   = "Terraform"
  }
}

# Public Subnet with Internet Gateway Routing
resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.containers_coffee_vpc.id
}

resource "aws_subnet" "public_1a" {
  vpc_id                  = aws_vpc.containers_coffee_vpc.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "us-east-1a"
  map_public_ip_on_launch = true

  tags = { Name = "public-subnet-1a" }
}

resource "aws_route_table" "public_rt" {
  vpc_id = aws_vpc.containers_coffee_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }

  tags = { Name = "public-route-table" }
}

resource "aws_route_table_association" "public_assoc" {
  subnet_id      = aws_subnet.public_1a.id
  route_table_id = aws_route_table.public_rt.id
}</code></pre>

        <h2>The 5-Minute Network Triage Protocol</h2>

        <p>When an incident fires at 2:00 AM, inexperienced developers reboot instances or blindly fiddle with environment variables. A CCNA-trained cloud engineer traces the packet flow layer-by-layer:</p>

        <ol>
          <li><strong>Layer 1–3: Route Table Inspection</strong> — Does the subnet route table have a default route (<code>0.0.0.0/0</code>) pointing to an <code>igw-xxxx</code> (if public) or a healthy <code>nat-xxxx</code> (if private)?</li>
          <li><strong>Layer 4: Security Group Evaluation</strong> — Security Groups are <em>stateful</em>. If inbound port 443 is permitted, return outbound traffic is automatically tracked and allowed. Did you check if the target port is listening on the ENI?</li>
          <li><strong>Layer 4: Stateless NACL Boundaries</strong> — Network ACLs are <em>stateless</em>. If you allow inbound traffic on port 443, you <strong>must explicitly allow outbound ephemeral ports (1024–65535)</strong>, otherwise the response packet is silently dropped at the subnet wire!</li>
          <li><strong>Layer 3: IP Address &amp; DNS Resolution</strong> — Is the target host trying to reach a public hostname without an attached Elastic IP or DNS resolver? Check <code>/etc/resolv.conf</code> and the AWS VPC <code>.2</code> resolver.</li>
          <li><strong>Layer 7: Application &amp; Reverse Proxy Binding</strong> — Is your Nginx or container application bound to <code>127.0.0.1</code> (loopback only) instead of <code>0.0.0.0</code> (all interfaces)? This is the single most common container networking trap.</li>
        </ol>

        <h2>The Final Cup: Why Network Engineers Rule the Cloud</h2>

        <p>Containers come and go. Frameworks rise and fall. Today it's Kubernetes; tomorrow it's ambient service meshes. But <strong>packets never lie</strong>. The physics of latency, the mathematics of subnetting, and the logic of routing tables remain the bedrock of computing.</p>

        <p>If you're studying for your CCNA or already managing switches, don't let anyone tell you your skills are legacy. You are already holding the keys to the kingdom. Layer on Terraform, Docker, and AWS, and you won't just be another DevOps engineer — you will be the architect everyone turns to when production is on the line.</p>

        <p>Pour yourself another cup, open your terminal, and keep your packets flowing.</p>
      `
    }
  ]
};
