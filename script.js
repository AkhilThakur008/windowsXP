var main = document.querySelector('#main')
var window7 = document.querySelector('#seven')
let box;
var show = false;

window7.addEventListener('click', function() {
    console.log('click')
    
    if(!show) {
        box = document.createElement('div');
        box.classList.add("windowBox");
        
        box.innerHTML = `
            <div class="start-menu">
                
                <div class="header">
                    <img src="icons/wow.webp" alt="User">
                    <h2>Akhil</h2>
                </div>
                
                <!-- Content Area -->
                <div class="content">
                    <!-- Left Sidebar -->
                    <div class="sidebar-left">
                        <ul>
                            <li>
                                <img src="icons/internet.webp" alt="">
                                <div class="menu-text">
                                    <strong>My Projects</strong>
                                    <span>View my work</span>
                                </div>
                            </li>
                            <li>
                                <img src="icons/contact.webp" alt="">
                                <div class="menu-text">
                                    <strong>Contact Me</strong>
                                    <span>Send me a message</span>
                                </div>
                            </li>
                            <li>
                                <img src="icons/about.webp" alt="">
                                <div class="menu-text">
                                    <strong>About Me</strong>
                                </div>
                            </li>
                            <li>
                                <img src="icons/doodledev.webp" alt="">
                                <span>DoodleDev</span>
                            </li>
                            <li>
                                <img src="icons/mediaPlayer.webp" alt="">
                                <span>Media Player</span>
                            </li>
                            <li>
                                <img src="icons/wow.webp" alt="">
                                <span>World of Warcraft</span>
                            </li>
                            <li>
                                <img src="icons/music.webp" alt="">
                                <span>Music Player</span>
                            </li>
                        </ul>
                        
                        <div class="all-programs">
                            <span>All Programs</span>
                            <span class="arrow">▶</span>
                        </div>
                    </div>
                    
                    <!-- Right Sidebar -->
                    <div class="sidebar-right">
                        <ul>
                            <li>
                                <img src="icons/instagram.webp" alt="">
                                <span>Instagram</span>
                            </li>
                            <li>
                                <img src="icons/github.webp" alt="">
                                <span>Github</span>
                            </li>
                            <li>
                                <img src="icons/linkedin.webp" alt="">
                                <span>LinkedIn</span>
                            </li>
                            <li>
                                <img src="icons/recently-used.webp" alt="">
                                <span>Recently Used</span>
                                <span class="arrow">▶</span>
                            </li>
                            <li>
                                <img src="icons/cmd.webp" alt="">
                                <span>Command Prompt</span>
                            </li>
                            <li>
                                <img src="icons/photos.webp" alt="">
                                <span>Image Viewer</span>
                            </li>
                            <li>
                                <img src="icons/resume.webp" alt="">
                                <span>My Resume</span>
                            </li>
                        </ul>
                    </div>
                </div>
                
                <!-- Footer -->
                <div class="footer">
                    <button class="btn-logoff">
                        <img src="icons/logoff.webp" alt="">
                        <span>Log Off</span>
                    </button>
                    <button class="btn-shutdown">
                        <img src="icons/shutdown.webp" alt="">
                        <span>Shut Down</span>
                    </button>
                </div>
            </div>
        `;
        
        main.append(box);
        show = true;
    } else {
        box.remove();
        show = false;
    }
});


var main = document.querySelector('#main');
let contextMenu;
let showMenu = false;


main.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    
    
    if (contextMenu) {
        contextMenu.remove();
    }
    
  
    contextMenu = document.createElement('div');
    contextMenu.classList.add('context-menu');
    
    contextMenu.innerHTML = `
        <ul>
            <li> View</li>
            <li> Sort by</li>
            <li> Refresh</li>
            <hr>
            <li> Paste</li>
            <li> New</li>
            <hr>
            <li> Properties</li>
        </ul>
    `;
    
    
    contextMenu.style.left = e.pageX + 'px';
    contextMenu.style.top = e.pageY + 'px';
    
    main.appendChild(contextMenu);
    showMenu = true;
});


document.addEventListener('click', function() {
    if (showMenu && contextMenu) {
        contextMenu.remove();
        showMenu = false;
    }
});