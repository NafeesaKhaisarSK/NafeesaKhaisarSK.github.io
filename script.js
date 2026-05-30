/**
 * Shaik Nafeesa - Premium AI & Embedded Systems R&D Portfolio JS
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. Sticky Navigation Header scroll action
       ========================================================================== */
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* ==========================================================================
       2. Mobile Navigation Hamburger Menu Toggle
       ========================================================================== */
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const drawer = document.querySelector('.mobile-nav-drawer');
    const drawerClose = document.querySelector('.mobile-drawer-close');
    const drawerLinks = document.querySelectorAll('.mobile-nav-link');

    const openDrawer = () => {
        drawer.classList.add('open');
        document.body.style.overflow = 'hidden'; // Prevent main body scrolling when open
    };

    const closeDrawer = () => {
        drawer.classList.remove('open');
        document.body.style.overflow = '';
    };

    mobileToggle.addEventListener('click', openDrawer);
    drawerClose.addEventListener('click', closeDrawer);

    drawerLinks.forEach(link => {
        link.addEventListener('click', closeDrawer);
    });

    /* ==========================================================================
       3. Scroll Reveal (Fade In & Slide Up elements)
       ========================================================================== */
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Reveal only once
            }
        });
    }, {
        threshold: 0.12, // Trigger when 12% is visible
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    /* ==========================================================================
       4. Auto-update Active Navigation Links on Scroll
       ========================================================================== */
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    const activeNavObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.35, // Trigger when 35% of the section is visible
        rootMargin: '-80px 0px -40% 0px' // Adjust for sticky header height
    });

    sections.forEach(section => {
        activeNavObserver.observe(section);
    });

    /* ==========================================================================
       5. 3D Holographic Perspective Tilt on Pixar Avatar
       ========================================================================== */
    const wrapper = document.querySelector('.avatar-interactive-wrapper');
    const box = document.querySelector('.avatar-perspective-box');
    
    if (wrapper && box) {
        wrapper.addEventListener('mousemove', (e) => {
            const rect = wrapper.getBoundingClientRect();
            
            // Mouse coordinates relative to the wrapper boundaries
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top; 
            
            // Normalize coordinates between -0.5 and 0.5
            const xNorm = (x / rect.width) - 0.5;
            const yNorm = (y / rect.height) - 0.5;
            
            // Calculate tilt degrees (max 15 degrees tilt)
            const tiltX = -yNorm * 22; // Up/down tilt
            const tiltY = xNorm * 22;  // Left/right tilt
            
            // Apply rotations with smooth perspective
            box.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.03)`;
        });
        
        wrapper.addEventListener('mouseleave', () => {
            // Smoothly snap back to origin
            box.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
        });
    }

    /* ==========================================================================
       6. Case Study Modals - Popup Manager
       ========================================================================== */
    const projectCards = document.querySelectorAll('.project-card');
    const modal = document.getElementById('project-modal');
    const modalCloseBtn = modal.querySelector('.modal-close');
    const modalTitle = document.getElementById('modal-title');
    const modalTags = document.getElementById('modal-tags');
    const caseStudies = document.querySelectorAll('.case-study-content');

    const openProjectModal = (card) => {
        const projectId = card.getAttribute('data-project-id');
        const title = card.querySelector('.project-title').textContent;
        const tags = card.querySelectorAll('.proj-tag');
        
        // Setup Modal title and headers
        modalTitle.textContent = title;
        modalTags.innerHTML = '';
        tags.forEach(tag => {
            const span = document.createElement('span');
            span.className = 'proj-tag';
            span.textContent = tag.textContent;
            modalTags.appendChild(span);
        });

        // Toggle visibility of specific case studies inside modal
        caseStudies.forEach(study => {
            if (study.getAttribute('id') === `case-study-${projectId}`) {
                study.classList.remove('hidden');
            } else {
                study.classList.add('hidden');
            }
        });

        // Open Overlay
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
    };

    const closeProjectModal = () => {
        modal.classList.remove('open');
        document.body.style.overflow = '';
    };

    projectCards.forEach(card => {
        // Trigger modal on clicking either card or card's detail button
        card.addEventListener('click', (e) => {
            // Prevent duplicate clicks or bubbles
            openProjectModal(card);
        });
    });

    modalCloseBtn.addEventListener('click', closeProjectModal);
    
    // Close modal on clicking backdrop
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeProjectModal();
        }
    });

    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
            closeProjectModal();
        }
    });

    /* ==========================================================================
       7. Publications & Achievements looping Carousel
       ========================================================================== */
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(document.querySelectorAll('.carousel-slide'));
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const dotsContainer = document.querySelector('.carousel-dots');
    
    let currentIndex = 0;
    const slideCount = slides.length;
    
    // Dynamic Dot generation
    slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = `carousel-dot ${i === 0 ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        dotsContainer.appendChild(dot);
    });
    
    const dots = Array.from(dotsContainer.querySelectorAll('.carousel-dot'));
    
    const updateCarousel = (index) => {
        // Shift track by percentage
        track.style.transform = `translateX(-${index * 100}%)`;
        
        // Toggle dot highlight state
        dots.forEach((dot, idx) => {
            if (idx === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
        
        currentIndex = index;
    };
    
    nextBtn.addEventListener('click', () => {
        let index = currentIndex + 1;
        if (index >= slideCount) index = 0; // Wrap around to start
        updateCarousel(index);
    });
    
    prevBtn.addEventListener('click', () => {
        let index = currentIndex - 1;
        if (index < 0) index = slideCount - 1; // Wrap around to end
        updateCarousel(index);
    });
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            updateCarousel(index);
        });
    });
    
    // Auto loop slide transition (every 8 seconds)
    let autoPlay = setInterval(() => {
        let index = currentIndex + 1;
        if (index >= slideCount) index = 0;
        updateCarousel(index);
    }, 8000);
    
    // Pause autoPlay when hovering or engaging with carousel
    const container = document.querySelector('.publications-carousel-container');
    container.addEventListener('mouseenter', () => clearInterval(autoPlay));
    container.addEventListener('mouseleave', () => {
        autoPlay = setInterval(() => {
            let index = currentIndex + 1;
            if (index >= slideCount) index = 0;
            updateCarousel(index);
        }, 8000);
    });



    /* ==========================================================================
       9. Dynamic College Credentials & Proof of Work Explorer
       ========================================================================== */
    const proofsFolder = "YPEA 20WH1A0236_Shaik Nafeesa Khaisar each category proof of documnets";
    
    const proofsList = [
        // Category 1: Academic Performance
        { cat: 'academic', folder: '1.Academic Performance', file: 'Annexure 1-8.pdf', title: 'Annexure 1-8: B.Tech Semesters 1-8 Consolidated Marksheets' },
        
        // Category 2: Leadership
        { cat: 'leadership', folder: '2.Leadership', file: 'Annexure 9-Robot Safar.pdf', title: 'Annexure 9: Robot Safar Event Coordinator' },
        { cat: 'leadership', folder: '2.Leadership', file: 'Annexure 10-Run for girl child.pdf', title: 'Annexure 10: Run for Girl Child Volunteer Lead' },
        { cat: 'leadership', folder: '2.Leadership', file: 'Annexure 11-Mock Interviews.pdf', title: 'Annexure 11: Mock Technical Interview Lead' },
        { cat: 'leadership', folder: '2.Leadership', file: 'Annexure 12- Mentored Classmates.pdf', title: 'Annexure 12: Classmates Peer Mentor & Tutor' },
        { cat: 'leadership', folder: '2.Leadership', file: 'Annexure 13(a)-Government school.pdf', title: 'Annexure 13(a): Govt School IoT Student Visit' },
        { cat: 'leadership', folder: '2.Leadership', file: 'Annexure 13(b)-Govt School.pdf', title: 'Annexure 13(b): Govt School IoT Outreach Coordinator' },
        { cat: 'leadership', folder: '2.Leadership', file: 'Annexure 14-Vedic Ardunio workshop.pdf', title: 'Annexure 14: Vedic Arduino Workshop Technical Trainer' },
        { cat: 'leadership', folder: '2.Leadership', file: 'Annexure 15-Team leader procreate.pdf', title: 'Annexure 15: Procreate Hackathon Team Leader' },
        { cat: 'leadership', folder: '2.Leadership', file: 'Annexure 16-Naveena coordinator.pdf', title: 'Annexure 16: Naveena Student Event Coordinator' },
        { cat: 'leadership', folder: '2.Leadership', file: 'Annexure 17-MSME Team Leader.pdf', title: 'Annexure 17: MSME Idea Hackathon Team Lead' },
        { cat: 'leadership', folder: '2.Leadership', file: 'Annexure 18-Innovathon Team leader.pdf', title: 'Annexure 18: Innovathon Hackathon Team Leader' },
        { cat: 'leadership', folder: '2.Leadership', file: 'Annexure 19-Python Wise Project.pdf', title: 'Annexure 19: Python Wise Project Team Coordinator' },
        
        // Category 3: Design & Innovation
        { cat: 'design', folder: '3.Design&Innovation', file: 'Annexure 20-Jal Ki Raani.pdf', title: 'Annexure 20: Jal Ki Raani Underwater Drone Project' },
        { cat: 'design', folder: '3.Design&Innovation', file: 'Annexure 21- Bharosa patent.pdf', title: 'Annexure 21: Bharosa Patent Application Filing' },
        { cat: 'design', folder: '3.Design&Innovation', file: 'Annexure 22-Chatgpt.pdf', title: 'Annexure 22: ChatGPT Integration & NLP Experiments' },
        { cat: 'design', folder: '3.Design&Innovation', file: 'Annexure 23-Plastic atm machine project.pdf', title: 'Annexure 23: Plastic Bottle ATM Machine Project' },
        { cat: 'design', folder: '3.Design&Innovation', file: 'Annexure 24-Safe drinking water indicator project.pdf', title: 'Annexure 24: Safe Drinking Water Quality Indicator' },
        { cat: 'design', folder: '3.Design&Innovation', file: 'Annexure 25.PLug load project.pdf', title: 'Annexure 25: IoT Plug Load Monitoring Project' },
        { cat: 'design', folder: '3.Design&Innovation', file: 'Annexure 26-IoT operated Temperature Controlled Devices Project.pdf', title: 'Annexure 26: IoT Temperature Controlled System' },
        { cat: 'design', folder: '3.Design&Innovation', file: 'Annexure 27-Stande Project.pdf', title: 'Annexure 27: Stande Smart Sanitizer Dispenser' },
        { cat: 'design', folder: '3.Design&Innovation', file: 'Annexure 28-Smart bridge Project.pdf', title: 'Annexure 28: Smart Infrastructure Bridge Monitoring' },
        { cat: 'design', folder: '3.Design&Innovation', file: 'Annexure 29-Need for speed.pdf', title: 'Annexure 29: Need For Speed Robot Leaping Module' },
        { cat: 'design', folder: '3.Design&Innovation', file: 'Annexure 30-Nvidia.pdf', title: 'Annexure 30: NVIDIA AI Edge Developer Training' },
        { cat: 'design', folder: '3.Design&Innovation', file: 'Annexure 31- Hero campus challenge Season.pdf', title: 'Annexure 31: Hero Campus Challenge Innovation' },
        { cat: 'design', folder: '3.Design&Innovation', file: 'Annexure 32-Tvs IT Coding round 2.pdf', title: 'Annexure 32: TVS IT Coding Round 2 Qualification' },
        { cat: 'design', folder: '3.Design&Innovation', file: 'Annexure 33-Tvs credit aalytics.pdf', title: 'Annexure 33: TVS Credit Analytics Challenge Project' },
        { cat: 'design', folder: '3.Design&Innovation', file: 'Annexure 34-Flipkart grid sde.pdf', title: 'Annexure 34: Flipkart GRiD SDE Challenge Rank' },
        
        // Category 4: Co-curricular
        { cat: 'cocurricular', folder: '4.Co-curricular', file: 'Annexure 35- Hero campus challenge.pdf', title: 'Annexure 35: Hero Campus Challenge Engineering Cert' },
        { cat: 'cocurricular', folder: '4.Co-curricular', file: 'Annexure 36- Kirit.pdf', title: 'Annexure 36: Kirit Tech Fest Event Credentials' },
        { cat: 'cocurricular', folder: '4.Co-curricular', file: 'Annexure 37-Tvs epic IT challenge Round 2.pdf', title: 'Annexure 37: TVS Epic IT Challenge Round 2 Qualifier' },
        { cat: 'cocurricular', folder: '4.Co-curricular', file: 'Annexure 38- Coca-cola.pdf', title: 'Annexure 38: Coca-Cola National Campus Challenge' },
        { cat: 'cocurricular', folder: '4.Co-curricular', file: 'Annexure 39-Tvs credit analytics.pdf', title: 'Annexure 39: TVS Credit Analytics National Finalist' },
        { cat: 'cocurricular', folder: '4.Co-curricular', file: 'Annexure 40-Flipkart grid sde.pdf', title: 'Annexure 40: Flipkart GRiD National SDE Round' },
        { cat: 'cocurricular', folder: '4.Co-curricular', file: 'Annexure 41-Flipkart grid health.pdf', title: 'Annexure 41: Flipkart GRiD Health-Tech Challenge' },
        { cat: 'cocurricular', folder: '4.Co-curricular', file: 'Annexure 42-Flipkart robotics.pdf', title: 'Annexure 42: Flipkart GRiD Robotics Engineering Round' },
        { cat: 'cocurricular', folder: '4.Co-curricular', file: 'Annexure 43-TSIC 2022-23 Certificate of appreciation.pdf', title: 'Annexure 43: TSIC Government Innovation Mentor appreciation' },
        { cat: 'cocurricular', folder: '4.Co-curricular', file: 'Annexure 44- IIITH Certifiacte of completion.pdf', title: 'Annexure 44: IIIT Hyderabad IoT Cohort Completion' },
        { cat: 'cocurricular', folder: '4.Co-curricular', file: 'Annexure 45-Procreate hackathon.pdf', title: 'Annexure 45: Procreate Hackathon Winner Credentials' },
        { cat: 'cocurricular', folder: '4.Co-curricular', file: 'Annexure 46-Smart idea challenge 2023.pdf', title: 'Annexure 46: Smart Idea Challenge 2023 Runner Up' },
        { cat: 'cocurricular', folder: '4.Co-curricular', file: 'Annexure 47-We hub.pdf', title: 'Annexure 47: WE HUB Government Incubation Hackathon' },
        { cat: 'cocurricular', folder: '4.Co-curricular', file: 'Annexure 48-Spectrum 2022.pdf', title: 'Annexure 48: Spectrum 2022 Technical Presentation' },
        { cat: 'cocurricular', folder: '4.Co-curricular', file: 'Annexure 49-Smart idea challenge 2021 2nd prize.pdf', title: 'Annexure 49: Smart Idea Challenge 2021 2nd Prize Winner' },
        { cat: 'cocurricular', folder: '4.Co-curricular', file: 'Annexure 50-INNOVATHON 2021.pdf', title: 'Annexure 50: Innovathon 2021 National Runner Up' },
        { cat: 'cocurricular', folder: '4.Co-curricular', file: 'Annexure 51-Electric vehicle workshop.pdf', title: 'Annexure 51: EV Powertrains & Battery Workshops' },
        { cat: 'cocurricular', folder: '4.Co-curricular', file: 'Annexure 52-Power BI Certificate workshop.pdf', title: 'Annexure 52: Data Analytics with Power BI Certificate' },
        { cat: 'cocurricular', folder: '4.Co-curricular', file: 'Annexure 53-IIITH Design Thinking Workshop.pdf', title: 'Annexure 53: IIIT Hyderabad Design Thinking Training' },
        { cat: 'cocurricular', folder: '4.Co-curricular', file: 'Annexure 54-Self driving car workshop.pdf', title: 'Annexure 54: Computer Vision for Self-Driving Cars' },
        { cat: 'cocurricular', folder: '4.Co-curricular', file: 'Annexure 55- Daksha 2022 Paper Presentation.pdf', title: 'Annexure 55: Daksha National Paper Presentation 1st Prize' },
        { cat: 'cocurricular', folder: '4.Co-curricular', file: 'Annexure 56-elocution Competition.pdf', title: 'Annexure 56: Technical Elocution Winner Certificate' },
        
        // Category 5: Extra-curricular
        { cat: 'extracurricular', folder: '5.Extra-cirricular', file: 'Annexure 57-Climate Clock.pdf', title: 'Annexure 57: Global Climate Clock Initiative Volunteer' },
        { cat: 'extracurricular', folder: '5.Extra-cirricular', file: 'Annexure 58-Energy literacy training.pdf', title: 'Annexure 58: Certified Energy Literacy Professional' },
        { cat: 'extracurricular', folder: '5.Extra-cirricular', file: 'Annexure 59-Independence day speech.pdf', title: 'Annexure 59: Independence Day Official Speech Representative' },
        { cat: 'extracurricular', folder: '5.Extra-cirricular', file: 'Annexure 60- Bsmart.pdf', title: 'Annexure 60: Bsmart Leadership Training Certification' },
        { cat: 'extracurricular', folder: '5.Extra-cirricular', file: 'Annexure 61-Msme.pdf', title: 'Annexure 61: MSME Innovation Hub Ambassador' },
        { cat: 'extracurricular', folder: '5.Extra-cirricular', file: 'Annexure 62-RJ Nafeesa.pdf', title: 'Annexure 62: Campus Radio Jockey "RJ Nafeesa" Host' },
        
        // Category 6: Achievements & Certifications
        { cat: 'achievements', folder: '6.Achievemnts', file: 'Annexure 63-Bharat Intern Web developer.pdf', title: 'Annexure 63: Bharat Intern Web Development Internship' },
        { cat: 'achievements', folder: '6.Achievemnts', file: 'Annexure 64-Pcb internship.pdf', title: 'Annexure 64: PCB Design & Fabrication Industry Internship' },
        { cat: 'achievements', folder: '6.Achievemnts', file: 'Annexure 65-Internship on Embedded System.pdf', title: 'Annexure 65: Advanced Embedded Systems Industrial Internship' },
        { cat: 'achievements', folder: '6.Achievemnts', file: 'Annexure 66- Inqui lab Internship.pdf', title: 'Annexure 66: Inqui Lab Education Innovation Internship' },
        { cat: 'achievements', folder: '6.Achievemnts', file: 'Annexure 67a-TVS MOTORS Provisional offer letter.pdf', title: 'Annexure 67a: TVS Motor Company Official Offer Letter' },
        { cat: 'achievements', folder: '6.Achievemnts', file: 'Annexure 67b-TVS Superset.pdf', title: 'Annexure 67b: TVS Campus Recruitment Selection Doc' },
        { cat: 'achievements', folder: '6.Achievemnts', file: 'Annexure 68-Genpact.pdf', title: 'Annexure 68: Genpact National Hackathon Candidate' },
        { cat: 'achievements', folder: '6.Achievemnts', file: 'Annexure 69-Accenture Data Analytics Programme.pdf', title: 'Annexure 69: Accenture Data Analytics Consulting Experience' },
        { cat: 'achievements', folder: '6.Achievemnts', file: 'Annexure 70-Qualcomm Programme.pdf', title: 'Annexure 70: Qualcomm Mentorship & Fast Track Program' },
        { cat: 'achievements', folder: '6.Achievemnts', file: 'Annexure 71a- IIITH Programme.pdf', title: 'Annexure 71a: IIIT Hyderabad Smart City Research Cohort' },
        { cat: 'achievements', folder: '6.Achievemnts', file: 'Annexure 71b-IIITH.pdf', title: 'Annexure 71b: IIIT Hyderabad IoT Lab Access Badge' },
        { cat: 'achievements', folder: '6.Achievemnts', file: 'Annexure 72 -Introduction To Internet Of Things.pdf', title: 'Annexure 72: NPTEL Introduction to IoT Elite Certificate' },
        { cat: 'achievements', folder: '6.Achievemnts', file: 'Annexure 73- Non Conventional.pdf', title: 'Annexure 73: Non-Conventional Energy Sources Certification' },
        { cat: 'achievements', folder: '6.Achievemnts', file: 'Annexure 74-Cybersecurity.pdf', title: 'Annexure 74: Cybersecurity Fundamentals Cisco Academy' },
        { cat: 'achievements', folder: '6.Achievemnts', file: 'Annexure 75-Project Mangement.pdf', title: 'Annexure 75: IBM Project Management Professional Certification' },
        { cat: 'achievements', folder: '6.Achievemnts', file: 'Annexure 76- Semiconductor-1.pdf', title: 'Annexure 76: Semiconductor Device Physics Workshop' },
        { cat: 'achievements', folder: '6.Achievemnts', file: 'Annexure 77- Linkdeln web development.pdf', title: 'Annexure 77: LinkedIn Web Development Full Stack Program' },
        { cat: 'achievements', folder: '6.Achievemnts', file: 'Annexure 78-Ai for everyone.pdf', title: 'Annexure 78: Coursera AI For Everyone (deeplearning.ai)' },
        { cat: 'achievements', folder: '6.Achievemnts', file: 'Annexure 79- data visulaization.pdf', title: 'Annexure 79: Data Visualization and Wrangling with Tableau' },
        { cat: 'achievements', folder: '6.Achievemnts', file: 'Annexure 80- IOT,wireless &cloud.pdf', title: 'Annexure 80: IoT Wireless Protocols and Cloud Computing' },
        { cat: 'achievements', folder: '6.Achievemnts', file: 'Annexure 81-matlab fundamentals.pdf', title: 'Annexure 81: MathWorks MATLAB Programming Fundamentals' },
        { cat: 'achievements', folder: '6.Achievemnts', file: 'Annexure 82-Springboard Learning PowerBi.pdf', title: 'Annexure 82: Springboard BI Dashboard Analysis' },
        { cat: 'achievements', folder: '6.Achievemnts', file: 'Annexure 83-Springboard Reactjs.pdf', title: 'Annexure 83: Springboard ReactJS Frontend Engineering' },
        { cat: 'achievements', folder: '6.Achievemnts', file: 'Annexure 84- Springboard SQL.pdf', title: 'Annexure 84: Springboard Relational Database SQL' },
        { cat: 'achievements', folder: '6.Achievemnts', file: 'Annexure 85- Springboard flutter.pdf', title: 'Annexure 85: Springboard Flutter Hybrid Mobile Apps' },
        { cat: 'achievements', folder: '6.Achievemnts', file: 'Annexure 86 (cntd)- Sidvi Proceedings.pdf', title: 'Annexure 86 (cntd): SIDVI International Conference Proceedings' },
        { cat: 'achievements', folder: '6.Achievemnts', file: 'Annexure 86-Sidvi.pdf', title: 'Annexure 86: SIDVI 2023 Battery Life Research presentation' },
        { cat: 'achievements', folder: '6.Achievemnts', file: 'Annexure 87- IEEE Conference.pdf', title: 'Annexure 87: IEEE International Conference Presentation Certificate' },
        { cat: 'achievements', folder: '6.Achievemnts', file: 'Annexure 88(cntd) - Gitam.pdf', title: 'Annexure 88 (cntd): GITAM Science & Tech Congress Proceedings' },
        { cat: 'achievements', folder: '6.Achievemnts', file: 'Annexure 88-Gitam.pdf', title: 'Annexure 88: GITAM Technical Symposium 1st Rank' },
        { cat: 'achievements', folder: '6.Achievemnts', file: 'Annexure 89(cntd) - Siddhartha College.pdf', title: 'Annexure 89 (cntd): Siddhartha Tech Fest Paper Proceedings' },
        { cat: 'achievements', folder: '6.Achievemnts', file: 'Annexure 89-Sidhartha college.pdf', title: 'Annexure 89: Siddhartha Technical Symposium Winner' },
        { cat: 'achievements', folder: '6.Achievemnts', file: 'Annexure 90 (cntd) - IGI Global.pdf', title: 'Annexure 90 (cntd): IGI Global Book Chapter Contract' },
        { cat: 'achievements', folder: '6.Achievemnts', file: 'Annexure 90-Chapter Submissions _ IGI Global Book chapter.pdf', title: 'Annexure 90: IGI Global Published Chapter Proof' }
    ];

    const proofsGrid = document.getElementById('proofs-grid');
    const searchInput = document.getElementById('proofs-search');
    const tabButtons = document.querySelectorAll('.proofs-tabs .tab-btn');

    // Render Function
    const renderProofs = (filterCategory = 'all', searchQuery = '') => {
        if (!proofsGrid) return;
        
        proofsGrid.innerHTML = '';
        
        // Filter Data
        const filtered = proofsList.filter(item => {
            const matchesCategory = filterCategory === 'all' || item.cat === filterCategory;
            const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                  item.file.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });

        // Toggle Grid visibility/layout empty state
        if (filtered.length === 0) {
            proofsGrid.style.display = 'block';
            proofsGrid.innerHTML = `
                <div class="glass-card" style="padding: 40px; text-align: center; color: var(--text-secondary); width: 100%;">
                    <i class="fa-solid fa-folder-open" style="font-size: 3rem; margin-bottom: 15px; color: var(--text-muted);"></i>
                    <h3>No matching credentials found</h3>
                    <p style="margin-top: 5px; font-size: 0.95rem; color: var(--text-muted);">Try broadening your keywords or checking other categories.</p>
                </div>
            `;
            return;
        } else {
            proofsGrid.style.display = 'grid';
        }

        // Generate Cards
        filtered.forEach(item => {
            const card = document.createElement('a');
            card.className = 'proof-card glass-card hover-glow';
            card.target = '_blank';
            
            // Build the absolute path and encode correctly
            const relativePath = `${proofsFolder}/${item.folder}/${item.file}`;
            card.href = encodeURI(relativePath);
            
            // Pick FontAwesome icon based on category/file keywords
            let iconClass = 'fa-regular fa-file-pdf';
            if (item.title.toLowerCase().includes('patent')) {
                iconClass = 'fa-solid fa-lightbulb';
            } else if (item.title.toLowerCase().includes('marksheet')) {
                iconClass = 'fa-solid fa-graduation-cap';
            } else if (item.title.toLowerCase().includes('offer')) {
                iconClass = 'fa-solid fa-briefcase';
            } else if (item.title.toLowerCase().includes('paper') || item.title.toLowerCase().includes('chapter') || item.title.toLowerCase().includes('proceedings')) {
                iconClass = 'fa-solid fa-file-signature';
            } else if (item.title.toLowerCase().includes('prize') || item.title.toLowerCase().includes('winner') || item.title.toLowerCase().includes('1st')) {
                iconClass = 'fa-solid fa-award';
            } else if (item.cat === 'leadership') {
                iconClass = 'fa-solid fa-users-gear';
            }

            card.innerHTML = `
                <div class="proof-icon-box" style="background: ${item.cat === 'design' ? 'rgba(0, 242, 254, 0.1)' : 'rgba(226, 26, 34, 0.08)'}; border-color: ${item.cat === 'design' ? 'rgba(0, 242, 254, 0.2)' : 'rgba(226, 26, 34, 0.2)'}; color: ${item.cat === 'design' ? 'var(--accent-cyan)' : '#e21a22'};">
                    <i class="${iconClass}"></i>
                </div>
                <div class="proof-details">
                    <span class="proof-card-title">${item.title}</span>
                    <span class="proof-card-meta">${item.cat}</span>
                </div>
            `;
            proofsGrid.appendChild(card);
        });
    };

    // Initialize rendering
    renderProofs();

    // Event Listeners for search & filters
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const activeTab = document.querySelector('.proofs-tabs .tab-btn.active');
            const category = activeTab ? activeTab.getAttribute('data-category') : 'all';
            renderProofs(category, e.target.value);
        });
    }

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Set active state
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Render filtered grid
            const category = btn.getAttribute('data-category');
            const query = searchInput ? searchInput.value : '';
            renderProofs(category, query);
        });
    });

    // Handle scroll reveal for newly added credentials section
    const credentialsSection = document.getElementById('proofs');
    if (credentialsSection && revealObserver) {
        revealObserver.observe(credentialsSection);
    }

    // Theme Toggle Logic (Light / Dark Mode)
    const themeToggleButtons = document.querySelectorAll('.theme-toggle-btn');
    const bodyElement = document.body;

    // Load saved preference
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        document.documentElement.classList.add('light-mode');
        bodyElement.classList.add('light-mode');
        themeToggleButtons.forEach(btn => {
            const icon = btn.querySelector('i');
            if (icon) {
                icon.className = 'fa-regular fa-sun'; // Sun icon for light mode
            }
        });
    }

    themeToggleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const isLight = bodyElement.classList.toggle('light-mode');
            document.documentElement.classList.toggle('light-mode', isLight);
            
            // Save preference
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
            
            // Update icons
            themeToggleButtons.forEach(b => {
                const icon = b.querySelector('i');
                if (icon) {
                    icon.className = isLight ? 'fa-regular fa-sun' : 'fa-regular fa-moon';
                }
            });
        });
    });
});
