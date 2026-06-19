/* ============================================================
   Custom JavaScript — vanilla (no jQuery / Bootstrap / Select2)
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

    /* ---------- Navbar: transparent over hero, solid after ---------- */
    (function navOverHero() {
        var navbar = document.querySelector('.navbar');
        var hero = document.querySelector('.hero-section');
        if (!navbar) return;

        function update() {
            var scroll = window.pageYOffset + 200;
            if (hero && scroll <= hero.offsetHeight) {
                navbar.classList.add('overHero');
            } else {
                navbar.classList.remove('overHero');
            }
        }

        update();
        window.addEventListener('scroll', update, { passive: true });
    })();

    /* ---------- Navbar toggle (mobile menu) ---------- */
    (function navbarToggle() {
        var toggle = document.querySelector('.navbar-toggle');
        var collapse = document.getElementById('navbar-collapse');
        if (!toggle || !collapse) return;

        toggle.addEventListener('click', function () {
            collapse.classList.toggle('is-open');
        });

        // Close the menu after a link is tapped (mobile)
        collapse.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                collapse.classList.remove('is-open');
            });
        });
    })();

    /* ---------- Modals (open / close / backdrop / Esc) ---------- */
    (function modals() {
        function openModal(modal) {
            if (!modal) return;
            modal.classList.add('is-open');
            document.body.classList.add('modal-open');
        }

        function closeModal(modal) {
            if (!modal) return;
            modal.classList.remove('is-open');
            if (!document.querySelector('.modal.is-open')) {
                document.body.classList.remove('modal-open');
            }
        }

        // Open triggers: [data-toggle="modal"][data-target="#id"]
        document.querySelectorAll('[data-toggle="modal"]').forEach(function (trigger) {
            trigger.addEventListener('click', function (e) {
                e.preventDefault();
                openModal(document.querySelector(trigger.getAttribute('data-target')));
            });
        });

        // Close triggers: [data-dismiss="modal"]
        document.querySelectorAll('[data-dismiss="modal"]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                closeModal(btn.closest('.modal'));
            });
        });

        // Click on the backdrop (the .modal itself) closes
        document.querySelectorAll('.modal').forEach(function (modal) {
            modal.addEventListener('click', function (e) {
                if (e.target === modal) closeModal(modal);
            });
        });

        // Escape closes the open modal
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') closeModal(document.querySelector('.modal.is-open'));
        });
    })();

    /* ---------- Tabs ([data-toggle="tab"]) ---------- */
    (function tabs() {
        document.querySelectorAll('[data-toggle="tab"]').forEach(function (tab) {
            tab.addEventListener('click', function (e) {
                e.preventDefault();

                var pane = document.querySelector(tab.getAttribute('href'));
                if (!pane) return;

                // Activate the target pane within its .tab-content
                var content = pane.parentElement;
                content.querySelectorAll('.tab-pane').forEach(function (p) {
                    p.classList.remove('active');
                });
                pane.classList.add('active');

                // Highlight the tab in its <ul class="nav-tabs"> (inline
                // "forgot password" links live in a form, so they're skipped)
                var list = tab.closest('ul.nav-tabs');
                if (list) {
                    list.querySelectorAll('li').forEach(function (li) {
                        li.classList.remove('active');
                    });
                    var li = tab.closest('li');
                    if (li) li.classList.add('active');
                }
            });
        });
    })();

    /* ---------- Hero video: reduced-motion + sound toggle ---------- */
    (function heroVideo() {
        var video = document.getElementById('hero-video');
        if (!video) return;

        // Skip the autoplay loop for users who prefer reduced motion or are on
        // a Save-Data connection — show the poster instead of streaming ~8MB.
        var reduce = window.matchMedia &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        var conn = navigator.connection || navigator.webkitConnection;
        var saveData = !!(conn && conn.saveData);
        if (reduce || saveData) {
            video.removeAttribute('autoplay');
            video.preload = 'none';
            video.pause();
        }

        var btn = document.getElementById('sound-toggle');
        if (!btn) return;

        function syncButton() {
            // icon is decorative (aria-hidden); the button's accessible name
            // comes from aria-label and reflects the action the user can take.
            btn.innerHTML = video.muted
                ? '<i class="fa fa-volume-off" aria-hidden="true"></i>'
                : '<i class="fa fa-volume-up" aria-hidden="true"></i>';
            btn.setAttribute('aria-label', video.muted ? 'تشغيل صوت الفيديو' : 'كتم صوت الفيديو');
        }

        video.muted = true; // start muted (required for autoplay)
        syncButton();

        btn.addEventListener('click', function () {
            video.muted = !video.muted;
            syncButton();
        });
    })();

    /* ---------- Smooth scroll ---------- */
    (function smoothScroll() {
        function scrollToEl(el) {
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }

        var admissionBtn = document.getElementById('scroll-to-admission');
        if (admissionBtn) {
            admissionBtn.addEventListener('click', function () {
                scrollToEl(document.getElementById('admission-form'));
            });
        }

        document.querySelectorAll('a.page-scroll').forEach(function (link) {
            link.addEventListener('click', function (e) {
                var target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    e.preventDefault();
                    scrollToEl(target);
                }
            });
        });
    })();

    /* ---------- Admission form: branches depend on gender ---------- */
    (function branchesByGender() {
        var branches = {
            'ذكر': [
                { id: '4', text: 'مجمع عتبة بن غزوان ( حي الريَّان )' },
                { id: '5', text: 'مجمع عمر بن الخطاب ( حي الملك خالد )' },
                { id: '6', text: 'مجمع سعيد بن زيد ( حي الفيحاء )' },
                { id: '7', text: 'مجمع مصعب بن عمير ( حي العليا )' },
                { id: '8', text: 'مجمع الزبير بن العوام ( حي الفهد )' },
                { id: '10', text: 'مجمع زيد بن ثابت ( حي الفاخرية )' },
                { id: '11', text: 'مجمع أسامة بن زيد ( حي السليمانية )' },
                { id: '12', text: 'مجمع عثمان بن عفان ( حي الأشرفية )' },
                { id: '45', text: 'مجمع جامع المصيريعي ( شرق الأشرفية )' },
                { id: '51', text: 'مجمع أبي بن كعب ( المحمدية )' }
            ],
            'أنثى': [
                { id: '15', text: 'دار تراتيل الصباحية ( حي الشفاء )' },
                { id: '16', text: 'دار ابن عيد المسائية ( ابن عيد )' },
                { id: '17', text: 'دار البديعة المسائية ( حي البديعة )' },
                { id: '18', text: 'دار الحركان المسائية ( حي الأشرفية )' },
                { id: '19', text: 'دار الحميضي المسائية ( حي السلام )' },
                { id: '20', text: 'دار العضيب المسائية ( حي الزاهر )' },
                { id: '21', text: 'دار موضي الخنيني المسائية ( حي العليا )' },
                { id: '22', text: 'دار غراس المسائية ( حى الأشرفية )' },
                { id: '23', text: 'دار الفهد المسائية ( حى الفهد )' },
                { id: '24', text: 'دار الفيحاء المسائية ( حي الفيحاء )' },
                { id: '25', text: 'دار مشرفة المسائية ( حي مشرفة )' },
                { id: '26', text: 'دار المطار المسائية ( حي المطار )' },
                { id: '27', text: 'دار الملك خالد المسائية ( حي الملك خالد )' },
                { id: '28', text: 'دار الودي المسائية ( حي الودي )' },
                { id: '29', text: 'دار نورة الشبل المسائية ( حي الروابي )' },
                { id: '30', text: 'دار الحركان الصباحية ( حي الأشرفية )' },
                { id: '31', text: 'دار العضيب الصباحية ( حي الزاهر )' },
                { id: '39', text: 'حلقات جمعية بيوت ( جمعية بيوت )' },
                { id: '40', text: 'دار تراتيل المسائية ( حي الشفاء )' },
                { id: '42', text: 'دار البويطن ( )' },
                { id: '44', text: 'دار المقرأة الالكترونية ( دار المقرأة الالكترونية )' },
                { id: '47', text: 'دار الفهد الصباحية ( حي الفهد )' },
                { id: '48', text: 'دار موضي الفريهيدي المسائية ( الفاخرية )' },
                { id: '50', text: 'دار نورة الشبل الصباحية ( مركز حسن النعيم )' },
                { id: '52', text: 'دار الملك خالد الصباحية ( حي الملك خالد )' }
            ],
            'طفل': [
                { id: '33', text: 'روضة البراعم الأولى ( حي السليمانية )' },
                { id: '34', text: 'روضة البراعم الثانية ( حي الهدا )' },
                { id: '35', text: 'روضة الأثير ( حي الفاخرية )' }
            ]
        };

        var gender = document.getElementById('gender');
        var list = document.getElementById('branchesList');
        if (!gender || !list) return;

        gender.addEventListener('change', function () {
            list.innerHTML = '';
            list.appendChild(new Option('اختر فرع', ''));
            (branches[gender.value] || []).forEach(function (b) {
                list.appendChild(new Option(b.text, b.id));
            });
        });
    })();

    /* ---------- Map: click-to-load facade (no Google code until asked) ---------- */
    (function mapFacade() {
        var el = document.getElementById('map');
        if (!el || !el.dataset.src) return;
        var btn = el.querySelector('.map-load-btn');
        if (!btn) return;

        btn.addEventListener('click', function () {
            var iframe = document.createElement('iframe');
            iframe.src = el.dataset.src;
            iframe.title = 'خريطة الفروع';
            iframe.width = '100%';
            iframe.height = '300';
            iframe.loading = 'lazy';
            iframe.allowFullscreen = true;
            iframe.style.border = '0';
            el.innerHTML = '';
            el.appendChild(iframe);
        });
    })();

    /* ---------- Statistics counters (animate when in view) ---------- */
    (function counters() {
        var counters = document.querySelectorAll('.counter');
        if (!counters.length || !('IntersectionObserver' in window)) {
            // Fallback: show final values immediately
            counters.forEach(function (c) { c.innerText = c.getAttribute('data-target'); });
            return;
        }

        var speed = 200;

        function format(n) {
            return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }

        function run(counter) {
            var target = +counter.getAttribute('data-target');
            var count = +counter.innerText.replace(/,/g, '');
            var increment = target / speed;
            if (count < target) {
                counter.innerText = format(Math.ceil(count + increment));
                setTimeout(function () { run(counter); }, 20);
            } else {
                counter.innerText = format(target);
            }
        }

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    counters.forEach(run);
                    observer.disconnect();
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(function (c) { observer.observe(c); });
    })();

});
