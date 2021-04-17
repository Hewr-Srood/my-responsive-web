(() => {
    const mobileWidth = 701;

    const addMenuBackground = () => {
        const pageWidth = window.innerWidth;
        const boddyOffset = document.body.scrollTop || document.documentElement.scrollTop;
        const navigation = document.querySelector("header nav");

        if(pageWidth > mobileWidth) {
            boddyOffset > 0 ? navigation.classList.add("rw-nav-fixed") : navigation.classList.remove("rw-nav-fixed");
        }
    }

    const reorderResponsiveMenu = () => {
        const pageWidth = window.innerWidth;
        const navContainer = document.querySelector("header nav .rw-container");
        const navigation = document.querySelector("header nav .rw-navigation");
        const mobileNavigation = document.querySelector("body > .rw-navigation");

        if (pageWidth <= mobileWidth && navigation) {
            document.body.insertAdjacentElement("afterbegin", navigation);
        } else if (pageWidth > mobileWidth && mobileNavigation) {
            navContainer.insertAdjacentElement("beforeend", mobileNavigation);
        }

    }

    const mobileMenuToggle = () => {
        const menuToggle = document.querySelector(".rw-nav-toggle");

        menuToggle.addEventListener("click", () =>{
            const mobileNavigation = document.querySelector("body > .rw-navigation");

            mobileNavigation.classList.toggle("rw-navigation-opened");
            menuToggle.classList.toggle("rw-nav-toggle-tapped");

        })
    }

    const onNavItemClick = () => {
        const navItemList = document.querySelectorAll(".rw-section-link");
        const navItems = [...navItemList];

        navItems.forEach(item => {
            item.addEventListener("click", event => {
                event.preventDefault();

                const sectionId = event.target.getAttribute("href") || event.target.dataset.href;

                scrollToSection(sectionId);
            })
        })
    }

    const scrollToSection = sectionId => {
        let sectionPosition, sectionOffset;
        const navigationHeight = document.querySelector("header nav").offsetHeight;
        const pageWidth = window.innerWidth;

        if(sectionId !== "#") {
            sectionOffset = document.querySelector(sectionId).offsetTop;
            sectionPosition = pageWidth > mobileWidth ? sectionOffset - navigationHeight : sectionOffset;
        } else {
            sectionPosition = 0;
        }

        window.scrollTo({
            'behavior': 'smooth',
            'left': 0,
            'top': sectionPosition
        })
    }

    const onTestimonialChange = () => {
        let firstChild, lastChild;
        const prevArrow = document.querySelector("#rw-testimonials-prev");
        const nextArrow = document.querySelector("#rw-testimonials-next");
        const testimonials = document.querySelector(".rw-testimonials ul");

        document.addEventListener("click", () => {
            if(event.target === prevArrow) {
                lastChild = testimonials.lastElementChild;
                testimonials.insertAdjacentElement("afterbegin", lastChild);
            } else if (event.target === nextArrow) {
                firstChild = testimonials.firstElementChild;
                testimonials.insertAdjacentElement("beforeend", firstChild);
            }
        })
    }


    window.addEventListener("scroll", () => {
        addMenuBackground();
    })

    window.addEventListener("resize", () => {
        reorderResponsiveMenu();
    })

    reorderResponsiveMenu();
    mobileMenuToggle();
    onNavItemClick();
    onTestimonialChange();
    

})();