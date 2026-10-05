// ☕ Containers & Coffee — Interactive Roadmaps Data (Inspired by roadmap.sh)
// Defined as global window.ROADMAP_DATA

window.ROADMAP_DATA = {
  ccna: {
    id: "ccna",
    badge: "Official Cisco 200-301 Standard",
    title: "Cisco CCNA & Enterprise Network Engineer",
    subtitle: "A comprehensive, packet-level engineering path from binary subnetting and OSI layers to enterprise VLAN switching, OSPF dynamic routing, and NetDevOps automation — modeled after roadmap.sh standards.",
    icon: "🌐",
    targetRole: "Network Engineer, NOC Analyst, Cloud NetOps Specialist, Infrastructure Architect",
    certification: "Cisco Certified Network Associate (CCNA 200-301)",
    duration: "10–12 Weeks (Hands-on CLI & Packet Tracer Labs)",
    prerequisites: "Basic Computer Literacy & Terminal Navigation",
    phases: [
      {
        id: "ccna-phase-1",
        number: "01",
        title: "Network Fundamentals & Physical Layer",
        desc: "Mastering the foundational physics, protocol handshakes, and packet encapsulation of modern digital communications.",
        topics: [
          {
            name: "OSI 7-Layer & TCP/IP Model",
            type: "core",
            desc: "Physical, Data Link, Network, Transport, Session, Presentation, Application. Understanding Protocol Data Units (PDUs): Bits, Frames, Packets, Segments, and Data payloads.",
            command: "tcpdump -nnvv -i eth0",
            docUrl: "https://www.cisco.com/c/en/us/support/docs/ip/routing-information-protocol-rip/13769-39.html"
          },
          {
            name: "TCP vs UDP Protocols",
            type: "core",
            desc: "Connection-oriented reliable delivery (SYN, SYN-ACK, ACK, sequence numbers, sliding window, flow control) vs connectionless low-latency datagrams (DNS, VoIP, DHCP, TFTP).",
            command: "nc -zv 192.168.1.1 22 80 443",
            docUrl: "https://tools.ietf.org/html/rfc793"
          },
          {
            name: "IPv4 Addressing & VLSM Subnetting",
            type: "core",
            desc: "Binary octet arithmetic, subnet masks, network vs host bits, Classless Inter-Domain Routing (CIDR /8 to /30), and zero IP wastage calculations with Variable Length Subnet Masking (VLSM).",
            command: "ipcalc 192.168.10.0/26",
            docUrl: "https://tools.ietf.org/html/rfc1918"
          },
          {
            name: "IPv6 Global Unicast & SLAAC",
            type: "core",
            desc: "128-bit hexadecimal addressing, Link-Local (fe80::), SLAAC auto-configuration, Neighbor Discovery Protocol (NDP), replacing ARP with ICMPv6 neighbor solicitations.",
            command: "ping6 -I eth0 ff02::1",
            docUrl: "https://tools.ietf.org/html/rfc4291"
          },
          {
            name: "Ethernet Cabling & Interface Types",
            type: "recommended",
            desc: "Cat5e/Cat6 UTP pinouts (T568A/B), Single-mode vs Multi-mode fiber optics, SFP+ transceivers, MTU (1500 bytes), and interface issue triage (collisions, duplex mismatches).",
            command: "ip link show eth0",
            docUrl: "https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst3750/hardware/installation/guide/higcable.html"
          },
          {
            name: "Virtualization & Cloud Fundamentals",
            type: "recommended",
            desc: "Type-1 (Bare Metal ESXi/KVM) vs Type-2 hypervisors, virtual switches (vSwitch), containers vs VMs, and comparing on-premises private clouds with public cloud fabrics.",
            command: "virsh list --all",
            docUrl: "https://www.cisco.com/c/en/us/solutions/cloud/index.html"
          }
        ],
        lab: "Design a 5-subnet VLSM scheme for a 500-workstation enterprise in Cisco Packet Tracer. Capture and verify the TCP 3-way handshake and ARP resolution process using Wireshark packet analysis."
      },
      {
        id: "ccna-phase-2",
        number: "02",
        title: "Network Access, Switching & VLANs",
        desc: "Architecting high-speed, loop-free campus local area networks across redundant hardware switches and wireless access points.",
        topics: [
          {
            name: "Switch MAC Forwarding & CAM Tables",
            type: "core",
            desc: "How switches inspect source MAC addresses to populate the Content Addressable Memory (CAM) table and selectively forward, flood, or filter destination Ethernet frames.",
            command: "show mac address-table dynamic",
            docUrl: "https://www.cisco.com/c/en/us/support/docs/switches/catalyst-6500-series-switches/12048-cam-mac.html"
          },
          {
            name: "VLANs & 802.1Q Dot1q Trunking",
            type: "core",
            desc: "Segmenting broadcast domains logically. Configuring access ports, 802.1Q 4-byte tagging on trunk uplinks, native VLAN security, and voice/data VLAN separation.",
            command: "switchport mode trunk; switchport trunk allowed vlan 10,20,30",
            docUrl: "https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst2960/software/release/12-2_55_se/configuration/guide/scg_2960/swvlan.html"
          },
          {
            name: "Spanning Tree Protocol (Rapid PVST+)",
            type: "core",
            desc: "Preventing Layer 2 broadcast loops and MAC table instability. Bridge IDs, Root Bridge election, PortFast for edge access ports, BPDU Guard, and rapid convergence.",
            command: "show spanning-tree summary",
            docUrl: "https://www.cisco.com/c/en/us/support/docs/lan-switching/spanning-tree-protocol/24062-146.html"
          },
          {
            name: "EtherChannel Link Aggregation (LACP)",
            type: "core",
            desc: "Bundling multiple physical Ethernet links into a single logical channel (Port-Channel) for multiplied bandwidth and instant sub-second failover using IEEE 802.3ad LACP.",
            command: "channel-group 1 mode active",
            docUrl: "https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst3850/software/release/3se/consolidated_guide/b_consolidated_3850_3se_cg/b_consolidated_3850_3se_cg_chapter_01100010.html"
          },
          {
            name: "Layer 2 Security (Port Security & DAI)",
            type: "recommended",
            desc: "Hardening switch ports against CAM table overflow, rogue DHCP servers, and ARP spoofing via Sticky MACs, DHCP Snooping, and Dynamic ARP Inspection (DAI).",
            command: "switchport port-security violation restrict; ip dhcp snooping",
            docUrl: "https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst3750/software/release/12-2_55_se/configuration/guide/scg3750/swdhcp82.html"
          },
          {
            name: "Cisco Wireless Architectures (WLC & APs)",
            type: "recommended",
            desc: "Autonomous vs Lightweight Access Points (LAP), CAPWAP tunneling, Wireless LAN Controllers (WLC), SSID segmentation, and WPA2/WPA3 enterprise encryption.",
            command: "show wlan summary",
            docUrl: "https://www.cisco.com/c/en/us/td/docs/wireless/controller/8-5/config-guide/b_cg85/wlan_configuration.html"
          }
        ],
        lab: "Build a 3-switch redundant loop topology in Packet Tracer. Configure LACP EtherChannel trunks, designate a deterministic Root Bridge using priority manipulation, enable BPDU Guard, and verify zero broadcast storm loops."
      },
      {
        id: "ccna-phase-3",
        number: "03",
        title: "IP Connectivity & Dynamic Routing",
        desc: "Interconnecting disparate enterprise networks with deterministic routing decisions, multi-area OSPFv2, and high-availability default gateways.",
        topics: [
          {
            name: "Routing Forwarding Logic & Prefix Match",
            type: "core",
            desc: "How routers select the best forwarding path: Longest Prefix Match (most specific mask), Administrative Distance (AD), and routing protocol metric cost.",
            command: "show ip route; show ip route summary",
            docUrl: "https://www.cisco.com/c/en/us/support/docs/ip/enhanced-interior-gateway-routing-protocol-eigrp/8651-21.html"
          },
          {
            name: "Static & Floating Backup Routes",
            type: "core",
            desc: "Configuring default gateway routes of last resort (0.0.0.0/0), host-specific routes (/32), and floating static backup routes with customized administrative distances.",
            command: "ip route 0.0.0.0 0.0.0.0 192.168.1.1 10",
            docUrl: "https://www.cisco.com/c/en/us/support/docs/ip/border-gateway-protocol-bgp/200508-configure-floating-static-route.html"
          },
          {
            name: "Inter-VLAN Routing & Layer 3 SVIs",
            type: "core",
            desc: "Routing between isolated VLANs using Router-on-a-Stick (sub-interfaces with dot1q encapsulation) and Layer 3 Switch Virtual Interfaces (SVIs) with ip routing enabled.",
            command: "interface gigabitEthernet 0/0.10; encapsulation dot1Q 10",
            docUrl: "https://www.cisco.com/c/en/us/support/docs/lan-switching/inter-vlan-routing/41860-howto-L3-intervlanrouting.html"
          },
          {
            name: "OSPFv2 Dynamic Routing (Single & Multi-Area)",
            type: "core",
            desc: "Link-State routing protocol using Dijkstra SPF algorithm: Area 0 backbone, Router IDs, DR/BDR election on multi-access networks, passive interfaces, and metric costs.",
            command: "router ospf 1; network 10.0.0.0 0.0.255.255 area 0",
            docUrl: "https://www.cisco.com/c/en/us/support/docs/ip/open-shortest-path-first-ospf/7039-1.html"
          },
          {
            name: "First Hop Redundancy (HSRP & VRRP)",
            type: "recommended",
            desc: "Providing default gateway high availability by creating a shared virtual IP address across redundant physical routers with active/standby preemption.",
            command: "standby 1 ip 10.0.0.1; standby 1 priority 110; standby 1 preempt",
            docUrl: "https://www.cisco.com/c/en/us/support/docs/ip/hot-standby-router-protocol-hsrp/9264-faq.html"
          }
        ],
        lab: "Deploy a 4-router multi-area OSPF backbone with dual redundant gateways. Configure active/standby HSRP failover, initiate continuous ping traffic, and verify sub-second gateway failover during interface shutdown."
      },
      {
        id: "ccna-phase-4",
        number: "04",
        title: "IP Services, NAT & Edge Operations",
        desc: "Managing network border translations, critical infrastructure timekeeping, automated address distribution, and Quality of Service (QoS).",
        topics: [
          {
            name: "NAT Overload / Port Address Translation (PAT)",
            type: "core",
            desc: "Conserving IPv4 public address space by mapping thousands of private RFC 1918 host addresses to a single public IP using ephemeral transport-layer ports (1024–65535).",
            command: "ip nat inside source list 1 interface gig0/0 overload",
            docUrl: "https://www.cisco.com/c/en/us/support/docs/ip/network-address-translation-nat/13772-12.html"
          },
          {
            name: "DHCP Server & DHCP Relay Agent",
            type: "core",
            desc: "Automating host IP configuration with DHCP pools, excluded address ranges, DNS servers, and using `ip helper-address` to forward broadcast DORA requests across routers.",
            command: "interface gig0/1; ip helper-address 10.10.10.2",
            docUrl: "https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/ipaddr_dhcp/configuration/15-mt/dhcp-15-mt-book/config-dhcp-relay-agent.html"
          },
          {
            name: "NTP Time Synchronization",
            type: "core",
            desc: "Synchronizing router and switch internal clocks with Stratum-1/2 NTP servers to ensure correlated timestamps during distributed security log analysis.",
            command: "ntp server 216.239.35.0 prefer; show ntp status",
            docUrl: "https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/bsm/configuration/15-mt/bsm-15-mt-book/bsm-time-calendar.html"
          },
          {
            name: "DNS Resolution & Syslog Logging",
            type: "core",
            desc: "Configuring domain lookup resolvers and centralized Syslog logging (levels 0 Emergency through 7 Debugging) directed to central SIEM servers.",
            command: "logging host 192.168.1.50; logging trap informational",
            docUrl: "https://www.cisco.com/c/en/us/support/docs/dial-access/integrated-services-digital-network-isdn/10332-syslog.html"
          },
          {
            name: "SNMPv2c & SNMPv3 Management",
            type: "recommended",
            desc: "Monitoring interface bandwidth, CPU, and temperature using Management Information Bases (MIBs), Object Identifiers (OIDs), Traps, and SNMPv3 user authentication/encryption.",
            command: "snmp-server community public RO; snmp-server host 10.0.0.5 version 2c",
            docUrl: "https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/snmp/configuration/15-mt/snmp-15-mt-book/nm-snmp-snmpv3.html"
          },
          {
            name: "QoS Per-Hop Behaviors (PHB)",
            type: "recommended",
            desc: "Prioritizing latency-sensitive voice and video packets: Classification, Marking (DSCP / CoS), Queuing (Priority Queuing PQ, CBWFQ), and Traffic Policing vs Shaping.",
            command: "show policy-map interface gig0/0",
            docUrl: "https://www.cisco.com/c/en/us/support/docs/quality-of-service-qos/qos-packet-marking/10100-dscpvalues.html"
          }
        ],
        lab: "Configure a Cisco border router with NAT Overload, DHCP relay forwarding, authoritative NTP synchronization, and centralized Syslog aggregation to an external Linux logging host."
      },
      {
        id: "ccna-phase-5",
        number: "05",
        title: "Network Security & Threat Defense",
        desc: "Hardening device control planes, enforcing granular traffic packet filters, establishing encrypted VPN tunnels, and implementing Zero Trust.",
        topics: [
          {
            name: "Standard & Extended Access Lists (ACLs)",
            type: "core",
            desc: "Filtering packets based on source/destination IP, transport protocol, and port numbers. Understanding standard ACL placement (close to destination) vs extended ACL placement (close to source).",
            command: "access-list 101 permit tcp 10.0.1.0 0.0.0.255 any eq 443",
            docUrl: "https://www.cisco.com/c/en/us/support/docs/security/ios-firewall/23602-confaccesslists.html"
          },
          {
            name: "Device Access Security & Password Policies",
            type: "core",
            desc: "Hardening the router/switch CLI: `enable secret` with PBKDF2 hashing, service password-encryption, console and VTY line timeouts, login banners, and disabling insecure HTTP/Telnet.",
            command: "line vty 0 4; transport input ssh; exec-timeout 5 0",
            docUrl: "https://www.cisco.com/c/en/us/support/docs/ip/access-lists/13608-21.html"
          },
          {
            name: "Site-to-Site IPsec VPN Tunnels",
            type: "core",
            desc: "Creating encrypted tunnels across untrusted public networks: IKE Phase 1 ISAKMP security associations, Diffie-Hellman key exchange, Phase 2 IPsec transform sets (AES-256/SHA), and crypto maps.",
            command: "show crypto session; show crypto ipsec sa",
            docUrl: "https://www.cisco.com/c/en/us/support/docs/security-vpn/ipsec-negotiation-ike-protocols/14106-how-vpn-works.html"
          },
          {
            name: "AAA Framework (RADIUS & TACACS+)",
            type: "recommended",
            desc: "Centralizing Authentication, Authorization, and Accounting across enterprise network devices via Cisco ISE, Microsoft NPS, or FreeRADIUS servers.",
            command: "aaa new-model; aaa authentication login default group tacacs+ local",
            docUrl: "https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/sec_usr_aaa/configuration/15-mt/sec-usr-aaa-15-mt-book/sec-cfg-aaa.html"
          },
          {
            name: "Next-Gen Firewalls (NGFW) & Threat Defense",
            type: "recommended",
            desc: "Understanding stateful packet inspection vs deep packet inspection (DPI), Intrusion Prevention Systems (IPS), malware sandboxing, and mitigating DoS/DDoS attacks.",
            command: "show conn; show asp drop",
            docUrl: "https://www.cisco.com/c/en/us/products/security/firewalls/index.html"
          }
        ],
        lab: "Build a secure dual-site enterprise topology. Restrict unauthorized inter-department traffic using Extended ACLs, establish an AES-256 IPsec VPN tunnel between branches, and enforce SSHv2 with TACACS+ fallback."
      },
      {
        id: "ccna-phase-6",
        number: "06",
        title: "Network Automation & NetDevOps",
        desc: "Transitioning from manual CLI configurations to programmable Software-Defined Networking (SDN), structured data models, and Python automation.",
        topics: [
          {
            name: "Controller-Based Networking & Cisco Catalyst Center",
            type: "core",
            desc: "Decoupling Control Plane, Data Plane, and Management Plane. Underlay vs Overlay fabrics, VXLAN encapsulation, Cisco DNA / Catalyst Center, and Cisco SD-WAN controllers.",
            command: "curl -k -X POST https://dna-center/api/system/v1/auth/token",
            docUrl: "https://www.cisco.com/c/en/us/solutions/enterprise-networks/dna-center/index.html"
          },
          {
            name: "Data Serialization (JSON, YAML & XML)",
            type: "core",
            desc: "Parsing and generating structured machine-readable network state data: Key-value pairs, nested arrays, YAML syntax for Ansible, and JSON encoding for REST APIs.",
            command: "python3 -c \"import json; print(json.dumps({'vlan': 10, 'name': 'Engineering'}))\"",
            docUrl: "https://developer.cisco.com/docs/network-programmability-basics/"
          },
          {
            name: "RESTCONF & NETCONF Network APIs",
            type: "core",
            desc: "Managing network devices programmatically over HTTPS (RESTCONF with JSON) and SSH (NETCONF with XML) using standard RFC YANG data models.",
            command: "curl -k -u cisco:cisco -X GET https://192.168.1.1/restconf/data/Cisco-IOS-XE-native:native",
            docUrl: "https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/prog/configuration/1612/b_1612_programmability_cg/restconf_prog_int.html"
          },
          {
            name: "Python Network Automation (Netmiko & Scrapli)",
            type: "core",
            desc: "Automating repetitive network maintenance using Python: Opening concurrent SSH connections, parsing CLI output, deploying configuration templates, and handling timeouts.",
            command: "python3 -c \"import netmiko; print('Netmiko 4.x Engine Ready')\"",
            docUrl: "https://github.com/ktbyers/netmiko"
          },
          {
            name: "Ansible Network Configuration Management",
            type: "recommended",
            desc: "Agentless infrastructure-as-code for switches and routers using `cisco.ios` Ansible collections, inventory groups, and idempotent declarative playbooks.",
            command: "ansible-playbook -i hosts.ini configure-vlans.yml",
            docUrl: "https://docs.ansible.com/ansible/latest/collections/cisco/ios/index.html"
          }
        ],
        lab: "Write a Python script using Netmiko that connects to 6 simulated Cisco switches simultaneously, extracts running configurations, audits compliance for disallowed VLANs, and writes automated diff reports."
      }
    ]
  },

  cloud: {
    id: "cloud",
    badge: "Official AWS Solutions Architect SAA-C03 / SAP",
    title: "AWS Cloud Solutions Architect & Systems Engineer",
    subtitle: "An enterprise roadmap for architecting resilient, secure, high-performing, and cost-optimized multi-region infrastructures on Amazon Web Services — modeled after roadmap.sh standards.",
    icon: "☁️",
    targetRole: "AWS Cloud Architect, Solutions Engineer, Cloud Infrastructure Lead, Cloud Operations Engineer",
    certification: "AWS Certified Solutions Architect Associate (SAA-C03) & Professional",
    duration: "10–14 Weeks (Architectural Blueprints & IaC Labs)",
    prerequisites: "Networking Foundations (VLANs, CIDR) & Linux Administration",
    phases: [
      {
        id: "cloud-phase-1",
        number: "01",
        title: "Cloud Fundamentals, Governance & Well-Architected",
        desc: "Establishing organizational boundaries, multi-account guardrails, cost governance, and aligning with the 6 Pillars of the AWS Well-Architected Framework.",
        topics: [
          {
            name: "Cloud Models & Global Infrastructure",
            type: "core",
            desc: "IaaS vs PaaS vs SaaS, Shared Responsibility Model, AWS Regions, Multi-AZ fault isolation domains, Local Zones, Edge Locations, and SLA metrics (99.99%).",
            command: "aws ec2 describe-regions --output table",
            docUrl: "https://aws.amazon.com/about-aws/global-infrastructure/"
          },
          {
            name: "AWS Organizations & Service Control Policies (SCPs)",
            type: "core",
            desc: "Centralized account management, consolidated billing, and preventive guardrails using Service Control Policies across organizational units (Prod, Dev, Security).",
            command: "aws organizations list-accounts",
            docUrl: "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html"
          },
          {
            name: "AWS Well-Architected Framework (6 Pillars)",
            type: "core",
            desc: "Evaluating architectures against: Operational Excellence, Security, Reliability, Performance Efficiency, Cost Optimization, and Sustainability.",
            command: "aws wellarchitected list-workloads",
            docUrl: "https://aws.amazon.com/architecture/well-architected/"
          },
          {
            name: "AWS Control Tower & Landing Zones",
            type: "recommended",
            desc: "Automating multi-account governance, baseline IAM identity federation, continuous audit logging, and mandatory preventive/detective guardrails.",
            command: "aws controltower list-landing-zones",
            docUrl: "https://aws.amazon.com/controltower/"
          },
          {
            name: "FinOps & Cloud Cost Optimization",
            type: "recommended",
            desc: "Tracking expenditures with AWS Cost Explorer, Budgets, Cost Allocation Tags, Compute Optimizer, Savings Plans, and Reserved Instance strategy.",
            command: "aws budgets describe-budgets --account-id $(aws sts get-caller-identity --query Account --output text)",
            docUrl: "https://aws.amazon.com/aws-cost-management/"
          }
        ],
        lab: "Deploy a multi-account AWS Organizations structure with automated billing alerts, mandatory resource tagging policies, and strict SCP guardrails denying non-approved AWS regions."
      },
      {
        id: "cloud-phase-2",
        number: "02",
        title: "Identity, Zero-Trust Security & Compliance",
        desc: "Implementing least-privilege IAM policies, temporary credentials, envelope encryption, and real-time automated threat detection.",
        topics: [
          {
            name: "AWS IAM Deep Dive & Least-Privilege",
            type: "core",
            desc: "IAM Users, Groups, Roles, and JSON policy evaluation logic (Explicit Deny > Explicit Allow > Default Deny), condition keys (`aws:SourceIp`, `aws:PrincipalArn`), and MFA enforcement.",
            command: "aws sts get-caller-identity",
            docUrl: "https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html"
          },
          {
            name: "AWS STS & Cross-Account Role Assumption",
            type: "core",
            desc: "Eliminating static credentials using Secure Token Service (STS) `AssumeRole`, temporary credential tokens, external IDs, and session policies.",
            command: "aws sts assume-role --role-arn arn:aws:iam::123456789012:role/Deployer --role-session-name DeploySession",
            docUrl: "https://docs.aws.amazon.com/STS/latest/APIReference/API_AssumeRole.html"
          },
          {
            name: "AWS KMS Encryption & Envelope Encryption",
            type: "core",
            desc: "Customer Managed Keys (CMK), envelope encryption (Customer Master Key generates Data Keys), automatic annual key rotation, and native S3/EBS/RDS integration.",
            command: "aws kms list-keys",
            docUrl: "https://docs.aws.amazon.com/kms/latest/developerguide/overview.html"
          },
          {
            name: "AWS Secrets Manager & SSM Parameter Store",
            type: "core",
            desc: "Secure storage, programmatic retrieval, and automated Lambda rotation of database credentials, OAuth tokens, and TLS certificates without code changes.",
            command: "aws secretsmanager get-secret-value --secret-id prod/database/master",
            docUrl: "https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html"
          },
          {
            name: "CloudTrail, AWS Config & GuardDuty",
            type: "recommended",
            desc: "Immutable API governance with multi-region CloudTrail trails, drift detection with AWS Config managed compliance rules, and AI threat detection with Amazon GuardDuty.",
            command: "aws cloudtrail describe-trails; aws guardduty list-detectors",
            docUrl: "https://aws.amazon.com/guardduty/"
          },
          {
            name: "IAM Identity Center (AWS SSO) & Federation",
            type: "recommended",
            desc: "Centralized identity provider integration with Okta, Azure Active Directory, and Google Workspace using SAML 2.0 and SCIM automated user provisioning.",
            command: "aws sso list-instances",
            docUrl: "https://aws.amazon.com/iam/identity-center/"
          }
        ],
        lab: "Configure a secure multi-account IAM role assumption workflow where CI/CD runners receive temporary STS credentials to deploy resources without holding any static access keys."
      },
      {
        id: "cloud-phase-3",
        number: "03",
        title: "Enterprise Cloud Networking (VPC Deep Dive)",
        desc: "Designing resilient, multi-AZ virtual network fabrics with isolated subnets, hybrid VPN/Direct Connect interconnects, and private endpoint links.",
        topics: [
          {
            name: "Custom Multi-Tier Multi-AZ VPC",
            type: "core",
            desc: "Allocating non-overlapping CIDR blocks, creating Public Web, Private Application, and Isolated Database subnets across 3 distinct Availability Zones.",
            command: "aws ec2 describe-vpcs",
            docUrl: "https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html"
          },
          {
            name: "Gateways & Subnet Route Tables",
            type: "core",
            desc: "Attaching Internet Gateways (IGW) for public routing, deploying redundant NAT Gateways per AZ with Elastic IPs, and configuring explicit subnet Route Tables.",
            command: "aws ec2 describe-route-tables",
            docUrl: "https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Route_Tables.html"
          },
          {
            name: "Stateful Security Groups vs Stateless NACLs",
            type: "core",
            desc: "ENI-level stateful firewall rules (inbound allow automatically tracks outbound response) paired with subnet-boundary stateless Network ACLs (requiring ephemeral port rules).",
            command: "aws ec2 describe-security-groups",
            docUrl: "https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Security.html"
          },
          {
            name: "AWS Transit Gateway (TGW) Hub-and-Spoke",
            type: "core",
            desc: "Centralized network transit hub interconnecting hundreds of VPCs, AWS accounts, and on-premises corporate datacenters with route table domain segmentation.",
            command: "aws ec2 describe-transit-gateways",
            docUrl: "https://aws.amazon.com/transit-gateway/"
          },
          {
            name: "VPC Endpoints & AWS PrivateLink",
            type: "core",
            desc: "Accessing AWS services (S3, DynamoDB, ECR, Secrets Manager) over private AWS backbone fiber without traffic ever traversing the public internet.",
            command: "aws ec2 describe-vpc-endpoints",
            docUrl: "https://docs.aws.amazon.com/vpc/latest/privatelink/what-is-privatelink.html"
          },
          {
            name: "Route 53 DNS & CloudFront Global Edge",
            type: "recommended",
            desc: "Public/Private Hosted Zones, DNS routing policies (Latency, Geolocation, Failover), and global content caching via Amazon CloudFront with AWS WAF edge protection.",
            command: "aws route53 list-hosted-zones; aws cloudfront list-distributions",
            docUrl: "https://aws.amazon.com/route53/"
          }
        ],
        lab: "Build a production 3-tier Multi-AZ VPC using Terraform. Verify that private application EC2 instances pull container images and S3 assets exclusively via PrivateLink Interface Endpoints."
      },
      {
        id: "cloud-phase-4",
        number: "04",
        title: "Scalable Compute, Containers & Serverless",
        desc: "Architecting self-healing, horizontally scalable compute layers using EC2 Graviton instances, containerized microservices, and event-driven serverless.",
        topics: [
          {
            name: "Amazon EC2, Nitro Architecture & Graviton",
            type: "core",
            desc: "Instance sizing (Compute, Memory, Storage optimized), ARM64 Graviton price/performance, AWS Nitro hypervisor hardware offload, and standardized Launch Templates.",
            command: "aws ec2 describe-instances --filters \"Name=instance-state-name,Values=running\"",
            docUrl: "https://aws.amazon.com/ec2/"
          },
          {
            name: "Auto Scaling Groups (ASG) & Resiliency",
            type: "core",
            desc: "Target Tracking scaling policies (CPU/ALB request count), automatic self-healing of unhealthy instances, and Mixed Instances policies blending On-Demand and Spot instances.",
            command: "aws autoscaling describe-auto-scaling-groups",
            docUrl: "https://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html"
          },
          {
            name: "Application (ALB) vs Network (NLB) Load Balancers",
            type: "core",
            desc: "Layer 7 HTTP/HTTPS path-based and host-based routing with SSL termination (ALB) vs Layer 4 ultra-high throughput with static Anycast IP addresses (NLB).",
            command: "aws elbv2 describe-load-balancers",
            docUrl: "https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/what-is-load-balancing.html"
          },
          {
            name: "Amazon ECS & AWS Fargate Serverless Containers",
            type: "core",
            desc: "Task Definitions, Service auto-scaling, container logging with AWS for Fluent Bit, and eliminating EC2 host patching using serverless AWS Fargate.",
            command: "aws ecs list-clusters",
            docUrl: "https://aws.amazon.com/ecs/"
          },
          {
            name: "Amazon EKS (Managed Kubernetes)",
            type: "recommended",
            desc: "High-availability managed Kubernetes control plane, worker node groups, VPC CNI pod IP allocation, and just-in-time node provisioning with Karpenter.",
            command: "aws eks list-clusters; kubectl get nodes",
            docUrl: "https://aws.amazon.com/eks/"
          },
          {
            name: "AWS Lambda & Step Functions Serverless",
            type: "recommended",
            desc: "Event-driven compute triggered by S3, SQS, DynamoDB, or API Gateway. Provisioned Concurrency for zero cold starts, and Step Functions visual state machines.",
            command: "aws lambda list-functions",
            docUrl: "https://aws.amazon.com/lambda/"
          }
        ],
        lab: "Deploy a resilient web application behind an Application Load Balancer with an Auto Scaling Group configured to dynamically scale across 3 Availability Zones under load testing."
      },
      {
        id: "cloud-phase-5",
        number: "05",
        title: "Distributed Storage & Modern Cloud Databases",
        desc: "Selecting the right storage tiers and architecting high-throughput, low-latency relational, NoSQL, and in-memory caching systems.",
        topics: [
          {
            name: "Amazon S3 Lifecycle, Replication & Object Lock",
            type: "core",
            desc: "Object storage classes (Standard, Intelligent-Tiering, Glacier Flexible/Deep), automatic tier transitions, Cross-Region Replication (CRR), and WORM Object Lock compliance.",
            command: "aws s3 ls; aws s3api get-bucket-versioning --bucket my-bucket",
            docUrl: "https://aws.amazon.com/s3/"
          },
          {
            name: "Amazon EBS gp3, io2 & Elastic File System (EFS)",
            type: "core",
            desc: "Configuring EBS gp3 independent IOPS and throughput, sub-millisecond NVMe io2 Block Express, and multi-AZ shared POSIX network file systems with Amazon EFS.",
            command: "aws ec2 describe-volumes",
            docUrl: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AmazonEBS.html"
          },
          {
            name: "Amazon RDS Multi-AZ & Read Replicas",
            type: "core",
            desc: "Synchronous standby replication across Availability Zones with automatic zero-data-loss DNS failover, and asynchronous cross-region Read Replicas for read-heavy workloads.",
            command: "aws rds describe-db-instances",
            docUrl: "https://aws.amazon.com/rds/"
          },
          {
            name: "Amazon Aurora Cloud-Native Engine",
            type: "core",
            desc: "Distributed 6-way storage replication across 3 AZs, storage auto-healing, Aurora Global Database for multi-region sub-second replication, and Aurora Serverless v2.",
            command: "aws rds describe-db-clusters",
            docUrl: "https://aws.amazon.com/rds/aurora/"
          },
          {
            name: "Amazon DynamoDB (Single-Digit Millisecond NoSQL)",
            type: "core",
            desc: "Partition and Sort keys, Global Secondary Indexes (GSIs), DynamoDB Streams, On-Demand vs Provisioned throughput, and Global Tables active-active multi-region replication.",
            command: "aws dynamodb list-tables",
            docUrl: "https://aws.amazon.com/dynamodb/"
          },
          {
            name: "Redis & In-Memory Caching (AWS ElastiCache / MemoryDB)",
            type: "core",
            desc: "Sub-millisecond query caching using Redis Cluster and AWS ElastiCache. Key eviction policies (LRU/LFU), replication groups, automated failover with Sentinel, and Redis persistence (RDB/AOF).",
            command: "redis-cli -h cluster.cache.amazonaws.com -p 6379 ping",
            docUrl: "https://aws.amazon.com/elasticache/redis/"
          }
        ],
        lab: "Perform an automated disaster recovery failover on an Amazon Aurora global database cluster while measuring edge cache hit ratios through CloudFront and ElastiCache Redis query acceleration."
      },
      {
        id: "cloud-phase-6",
        number: "06",
        title: "Infrastructure as Code (IaC), GitOps & Observability",
        desc: "Codifying production cloud topologies with Terraform, establishing continuous delivery pipelines, and maintaining end-to-end full-stack observability.",
        topics: [
          {
            name: "HashiCorp Terraform with S3 & DynamoDB Locks",
            type: "core",
            desc: "Declarative infrastructure as code: Providers, Resources, Variables, remote S3 state storage, and DynamoDB distributed mutex locks preventing race conditions.",
            command: "terraform init; terraform plan -out=tfplan; terraform apply tfplan",
            docUrl: "https://developer.hashicorp.com/terraform"
          },
          {
            name: "Modular Terraform & Environment Parity",
            type: "core",
            desc: "Designing parameterized, version-controlled modules for VPCs, compute, and databases across Dev, Staging, and Production environments without code duplication.",
            command: "terraform fmt -check; terraform validate",
            docUrl: "https://developer.hashicorp.com/terraform/language/modules"
          },
          {
            name: "AWS CloudFormation & AWS CDK",
            type: "recommended",
            desc: "Native AWS infrastructure templating in JSON/YAML (CloudFormation) and defining cloud resources using familiar programming languages with the AWS Cloud Development Kit (CDK).",
            command: "cdk diff; cdk deploy",
            docUrl: "https://aws.amazon.com/cdk/"
          },
          {
            name: "CI/CD Cloud Automation & Blue-Green Deployments",
            type: "core",
            desc: "Automating releases via GitHub Actions and AWS CodePipeline: Linting, validation, security scanning, and automated zero-downtime Blue-Green traffic shifting.",
            command: "aws codepipeline get-pipeline-state --name production-pipeline",
            docUrl: "https://aws.amazon.com/codepipeline/"
          },
          {
            name: "Amazon CloudWatch Metrics, Logs & Alarms",
            type: "core",
            desc: "Monitoring system metrics, streaming container logs via CloudWatch Agent, running CloudWatch Logs Insights queries, and configuring composite alarm notifications.",
            command: "aws cloudwatch describe-alarms --state-value ALARM",
            docUrl: "https://aws.amazon.com/cloudwatch/"
          },
          {
            name: "Disaster Recovery (RTO / RPO Strategies)",
            type: "recommended",
            desc: "Architecting for business continuity: Backup & Restore, Pilot Light, Warm Standby, and Multi-Region Active-Active failover architectures with automated DNS failover.",
            command: "aws backup list-backup-plans",
            docUrl: "https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-workloads-on-aws.html"
          }
        ],
        lab: "Write a modular Terraform configuration that provisions a complete multi-AZ AWS VPC, public/private subnets, and RDS database with state locking in under 2 minutes."
      }
    ]
  },

  devops: {
    id: "devops",
    badge: "Official CNCF CKA & HashiCorp Standard",
    title: "DevOps Engineer & Site Reliability Architect",
    subtitle: "The complete roadmap from Linux internals and immutable containerization to modular Terraform, production Kubernetes orchestration, GitOps CI/CD, and full-stack SRE telemetry — modeled after roadmap.sh standards.",
    icon: "🚀",
    targetRole: "DevOps Engineer, Platform Engineer, Site Reliability Engineer (SRE), Cloud Operations Specialist",
    certification: "CKA (Certified Kubernetes Administrator) & HashiCorp Terraform Associate",
    duration: "12–16 Weeks (Production Pipelines & Cluster Labs)",
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
            command: "systemctl status; journalctl -u nginx -f",
            docUrl: "https://systemd.io/"
          },
          {
            name: "Bash Shell Automation",
            type: "core",
            desc: "Writing idempotent scripts: variables, arguments, loops, pipes, exit code handling (`set -euo pipefail`), and cron scheduling.",
            command: "bash -n script.sh",
            docUrl: "https://www.gnu.org/software/bash/manual/"
          },
          {
            name: "Linux Permissions & Security",
            type: "core",
            desc: "Octal permissions (chmod 755), ownership (chown), sudoers privilege boundaries, and SSH key pairs with hardened sshd configurations.",
            command: "chmod 600 ~/.ssh/id_rsa",
            docUrl: "https://wiki.archlinux.org/title/File_permissions_and_attributes"
          },
          {
            name: "Git Workflows & Rebasing",
            type: "core",
            desc: "Branching strategies (Trunk-Based Development), resolving merge conflicts, interactive rebasing (`git rebase -i`), and commit hygiene.",
            command: "git status -sb; git log --oneline -n 10",
            docUrl: "https://git-scm.com/doc"
          },
          {
            name: "Network & Performance Triage",
            type: "recommended",
            desc: "Diagnosing live bottlenecks using terminal utilities: `top`, `htop`, `vmstat`, `netstat`, `ss`, `tcpdump`, `dig`, and `mtr`.",
            command: "ss -tulpn; vmstat 1 5",
            docUrl: "https://brendangregg.com/linuxperf.html"
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
            command: "docker system df; docker info",
            docUrl: "https://docs.docker.com/get-started/overview/"
          },
          {
            name: "Multi-Stage Dockerfiles",
            type: "core",
            desc: "Separating compile-time dependencies from runtime containers using builder stages and minimal runtime bases (Alpine / Distroless).",
            command: "docker build --no-cache -t app:v1 .",
            docUrl: "https://docs.docker.com/build/building/multi-stage/"
          },
          {
            name: "Docker Compose",
            type: "core",
            desc: "Orchestrating multi-container local microservice stacks with custom bridge networks, volume mounts, and environment configuration.",
            command: "docker compose up -d --build",
            docUrl: "https://docs.docker.com/compose/"
          },
          {
            name: "Container Security & Rootless",
            type: "recommended",
            desc: "Running containers with non-root UID/GID, read-only root filesystems, drop capabilities, and scanning images using Trivy.",
            command: "trivy image --severity HIGH,CRITICAL app:v1",
            docUrl: "https://aquasecurity.github.io/trivy/"
          },
          {
            name: "OCI Artifact Registries",
            type: "recommended",
            desc: "Publishing semantic versioned container images to Amazon ECR, GitHub Container Registry (ghcr.io), and Docker Hub.",
            command: "docker tag app:v1 ghcr.io/org/app:v1; docker push ghcr.io/org/app:v1",
            docUrl: "https://opencontainers.org/"
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
            command: "terraform init; terraform fmt; terraform validate",
            docUrl: "https://developer.hashicorp.com/terraform/language"
          },
          {
            name: "Remote State & Locking",
            type: "core",
            desc: "Storing terraform.tfstate securely in Amazon S3 with server-side encryption and DynamoDB distributed state locking to prevent concurrency collisions.",
            command: "terraform plan -out=tfplan",
            docUrl: "https://developer.hashicorp.com/terraform/language/state/backends"
          },
          {
            name: "Modular Architecture",
            type: "core",
            desc: "Designing reusable, versioned modules for networking, compute, and databases across multiple deployment environments (Dev, Staging, Prod).",
            command: "terraform get -update",
            docUrl: "https://developer.hashicorp.com/terraform/language/modules"
          },
          {
            name: "Drift Detection & Refresh",
            type: "recommended",
            desc: "Detecting discrepancies between cloud reality and code state using `terraform refresh` and automated drift monitoring pipelines.",
            command: "terraform plan -detailed-exitcode",
            docUrl: "https://developer.hashicorp.com/terraform/cli/commands/refresh"
          },
          {
            name: "Ansible Configuration Management",
            type: "recommended",
            desc: "Agentless configuration management using YAML playbooks, inventory files, and idempotent tasks to configure OS software packages.",
            command: "ansible-playbook -i inventory.ini site.yml",
            docUrl: "https://docs.ansible.com/"
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
            command: "kubectl get nodes -o wide; kubectl cluster-info",
            docUrl: "https://kubernetes.io/docs/concepts/overview/components/"
          },
          {
            name: "Core Workloads (Pods, Deployments)",
            type: "core",
            desc: "Managing Pods, ReplicaSets, Deployments (rolling updates), StatefulSets (persistent databases), and DaemonSets (system logging).",
            command: "kubectl get pods,deployments,services -n production",
            docUrl: "https://kubernetes.io/docs/concepts/workloads/"
          },
          {
            name: "Services & Ingress Controllers",
            type: "core",
            desc: "Service abstraction (ClusterIP, NodePort, LoadBalancer) and Layer 7 HTTP routing with Ingress-Nginx and automated Let's Encrypt TLS certificates.",
            command: "kubectl describe ingress app-ingress",
            docUrl: "https://kubernetes.io/docs/concepts/services-networking/"
          },
          {
            name: "ConfigMaps, Secrets & Volumes",
            type: "core",
            desc: "Injecting runtime environment variables and sensitive keys via Kubernetes Secrets, PersistentVolumeClaims (PVC), and CSI storage drivers.",
            command: "kubectl get pvc,pv",
            docUrl: "https://kubernetes.io/docs/concepts/configuration/"
          },
          {
            name: "Helm Chart Package Management",
            type: "recommended",
            desc: "Templating Kubernetes manifests into reproducible Helm packages, managing values.yaml overrides, and release lifecycle rollbacks.",
            command: "helm upgrade --install app ./chart -f values-prod.yaml",
            docUrl: "https://helm.sh/docs/"
          },
          {
            name: "Horizontal Pod Autoscaler (HPA)",
            type: "recommended",
            desc: "Automatically scaling pod replicas based on CPU, memory, and custom Prometheus metrics with resource requests and limits enforcement.",
            command: "kubectl autoscale deployment app --cpu-percent=70 --min=2 --max=10",
            docUrl: "https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/"
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
            command: "cat .github/workflows/deploy.yml",
            docUrl: "https://docs.github.com/en/actions"
          },
          {
            name: "Automated Testing & SAST",
            type: "core",
            desc: "Integrating automated unit tests, linting, SonarQube static application security testing, and container vulnerability scans before build.",
            command: "npm test; trivy fs --exit-code 1 .",
            docUrl: "https://owasp.org/www-community/Source_Code_Analysis_Tools"
          },
          {
            name: "ArgoCD GitOps Engine",
            type: "core",
            desc: "Declarative Kubernetes cluster synchronization where Git is the single source of truth. Automated self-healing and drift correction.",
            command: "argocd app sync production-app",
            docUrl: "https://argo-cd.readthedocs.io/"
          },
          {
            name: "Deployment Strategies",
            type: "recommended",
            desc: "Implementing Blue-Green deployments and Canary rollouts with automated metric validation and instant zero-downtime rollbacks.",
            command: "kubectl rollout status deployment/app",
            docUrl: "https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#strategy"
          },
          {
            name: "Jenkins Declarative Pipelines",
            type: "recommended",
            desc: "Enterprise CI/CD automation using Jenkinsfile pipeline-as-code, agent executors, credentials management, and stage parallelization.",
            command: "jenkins-cli build deploy-job -s",
            docUrl: "https://www.jenkins.io/doc/book/pipeline/"
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
            command: "curl -s http://localhost:9090/metrics | head -n 20",
            docUrl: "https://prometheus.io/docs/introduction/overview/"
          },
          {
            name: "Grafana Dashboards & Telemetry",
            type: "core",
            desc: "Visualizing system health, custom alerting rules, and tracking the 4 Golden Signals: Latency, Traffic, Errors, and Saturation.",
            command: "grafana-cli plugins list",
            docUrl: "https://grafana.com/docs/"
          },
          {
            name: "SRE Disciplines (SLI / SLO)",
            type: "core",
            desc: "Service Level Indicators, Service Level Objectives, Error Budgets, and blameless post-mortem incident review processes.",
            command: "cat postmortem-template.md",
            docUrl: "https://sre.google/sre-book/table-of-contents/"
          },
          {
            name: "Centralized Logging (EFK/Loki)",
            type: "recommended",
            desc: "Aggregating container stdout logs via Promtail or Fluentbit into Grafana Loki or Elasticsearch for instant distributed querying.",
            command: "logcli query '{app=\"production\"}'",
            docUrl: "https://grafana.com/oss/loki/"
          },
          {
            name: "Alertmanager & Incident Ops",
            type: "recommended",
            desc: "Deduplication, grouping, and routing of alerts to Slack, PagerDuty, and webhooks with inhibition and silence rules.",
            command: "amtool alert --alertmanager.url=http://localhost:9093",
            docUrl: "https://prometheus.io/docs/alerting/latest/alertmanager/"
          }
        ],
        lab: "Construct a production Grafana dashboard measuring Kubernetes pod resource consumption, HTTP 5xx error spikes, and automated Alertmanager notifications sent to Slack."
      }
    ]
  }
};
