var main = document.querySelector('#main')
var window7 = document.querySelector('#seven')
let box;
var show = false;

// Declare these globally so they can be accessed in close button
let intervalId = null;
let timerIntervalId = null;

window7.addEventListener('click', function () {
    console.log('click')

    if (!show) {
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
                           <li id="my-projects">
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
                            <li id="snake-game">
                                <img src="icons/snake.png" alt="">
                                <span>Snake Game</span>
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
                            <a href="https://www.instagram.com/akhil_thakur.10/" target="_blank">
                            <img src="icons/instagram.webp" alt="">
                                <span>Instagram</span>
                                </a>
                            </li>
                            <li>
                            <a href="https://github.com/AkhilThakur008" target="_blank">
                                <img src="icons/github.webp" alt="">
                                <span>Github</span>
                                </a>
                            </li>
                            <li>
                            <a href="https://www.linkedin.com/in/akhil-thakur-3b8883369/" target="_blank">
                                <img src="icons/linkedin.webp" alt="">
                                <span>LinkedIn</span>
                                </a>
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

        // NOW attach the snake game event listener AFTER the element exists
        attachSnakeGameListener();
    } else {
        box.remove();
        show = false;
    }
});

// Context menu code
let contextMenu;
let showMenu = false;

main.addEventListener('contextmenu', function (e) {
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

document.addEventListener('click', function () {
    if (showMenu && contextMenu) {
        contextMenu.remove();
        showMenu = false;
    }
});

// Snake game variables
let gameWindow;
let gameWindowOpen = false;

// Function to attach snake game listener
function attachSnakeGameListener() {
    const snakeGameLi = document.getElementById('snake-game');

    if (snakeGameLi) {
        snakeGameLi.addEventListener('click', function (e) {
            e.stopPropagation(); // Prevent event bubbling

            if (!gameWindowOpen) {
                // Create game window
                gameWindow = document.createElement('div');
                gameWindow.classList.add('game-window');

                gameWindow.innerHTML = `
                    <div class="window-header">
                        <span class="window-title"> Snake Game</span>
                        <button class="close-btn">×</button>
                    </div>
                    <main>
                        <section>
                            <div class="infos">
                                <div class="info">Score: <span id="score">0</span></div>
                                <div class="info">Time: <span id="time">00-00</span></div>
                                <div class="info">High Score: <span id="high-score">0</span></div>
                            </div>
                            <div class="board"></div>
                        </section>
                    </main>
                    
                    <div class="modal">
                        <div class="start-game">
                            <h2>Snake Game</h2>
                            <p>Use Arrow Keys to control the snake</p>
                            <button class="btn btn-start">Start Game</button>
                        </div>
                        <div class="game-over">
                            <h2>Game Over!</h2>
                            <p>Your Score: <span id="final-score">0</span></p>
                            <button class="btn btn-restart">Restart</button>
                        </div>
                    </div>
                `;

                main.appendChild(gameWindow);
                gameWindowOpen = true;

                // Close button functionality
                gameWindow.querySelector('.close-btn').addEventListener('click', function () {
                    // Clear intervals if game is running
                    if (intervalId) clearInterval(intervalId);
                    if (timerIntervalId) clearInterval(timerIntervalId);
                    gameWindow.remove();
                    gameWindowOpen = false;
                    intervalId = null;
                    timerIntervalId = null;
                });

                // Initialize your existing game code
                initSnakeGame();
            }
        });
    }
}

// Your existing game code wrapped in a function
function initSnakeGame() {
    const board = gameWindow.querySelector('.board');
    const startButton = gameWindow.querySelector('.btn-start');
    const modal = gameWindow.querySelector('.modal');
    const startGameModal = gameWindow.querySelector('.start-game');
    const gameOverModal = gameWindow.querySelector('.game-over');
    const restartButton = gameWindow.querySelector('.btn-restart');

    const highScoreElement = gameWindow.querySelector('#high-score');
    const scoreElement = gameWindow.querySelector('#score');
    const timerElement = gameWindow.querySelector('#time');

    const blockHeight = 50;
    const blockWidth = 50;

    let highScore = localStorage.getItem("highScore") || 0;
    let score = 0;
    let time = `00-00`;

    highScoreElement.innerText = highScore;

    const cols = Math.floor(board.clientWidth / blockWidth);
    const rows = Math.floor(board.clientHeight / blockHeight);

    let food = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) };

    const blocks = [];
    let snake = [{ x: 1, y: 3 }];
    let direction = 'down';

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const block = document.createElement('div');
            block.classList.add('block');
            board.appendChild(block);
            blocks[`${row},${col}`] = block;
        }
    }

    function render() {
        let head = null;

        blocks[`${food.x},${food.y}`].classList.add('food');

        if (direction === 'left') {
            head = { x: snake[0].x, y: snake[0].y - 1 };
        } else if (direction === 'right') {
            head = { x: snake[0].x, y: snake[0].y + 1 };
        } else if (direction === 'up') {
            head = { x: snake[0].x - 1, y: snake[0].y };
        } else if (direction === 'down') {
            head = { x: snake[0].x + 1, y: snake[0].y };
        }

        if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols) {
            clearInterval(intervalId);
            clearInterval(timerIntervalId);
            modal.style.display = 'flex';
            startGameModal.style.display = 'none';
            gameOverModal.style.display = 'flex';
            gameWindow.querySelector('#final-score').innerText = score;
            return;
        }

        // Check self collision
        for (let segment of snake) {
            if (head.x === segment.x && head.y === segment.y) {
                clearInterval(intervalId);
                clearInterval(timerIntervalId);
                modal.style.display = 'flex';
                startGameModal.style.display = 'none';
                gameOverModal.style.display = 'flex';
                gameWindow.querySelector('#final-score').innerText = score;
                return;
            }
        }

        // Food logic
        if (head.x === food.x && head.y === food.y) {
            blocks[`${food.x},${food.y}`].classList.remove('food');
            food = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) };
            blocks[`${food.x},${food.y}`].classList.add('food');

            snake.unshift(head);
            score += 10;
            scoreElement.innerText = score;

            if (score > highScore) {
                highScore = score;
                localStorage.setItem('highScore', highScore.toString());
                highScoreElement.innerText = highScore;
            }
        } else {
            snake.forEach(segment => {
                blocks[`${segment.x},${segment.y}`].classList.remove('fill');
            });

            snake.unshift(head);
            snake.pop();
        }

        snake.forEach(segment => {
            blocks[`${segment.x},${segment.y}`].classList.add('fill');
        });
    }

    startButton.addEventListener('click', () => {
        modal.style.display = 'none';
        intervalId = setInterval(() => { render() }, 300);
        timerIntervalId = setInterval(() => {
            let [min, sec] = time.split('-').map(Number);
            if (sec === 59) {
                min += 1;
                sec = 0;
            } else {
                sec += 1;
            }
            time = `${min.toString().padStart(2, '0')}-${sec.toString().padStart(2, '0')}`;
            timerElement.innerText = time;
        }, 1000);
    });

    restartButton.addEventListener('click', restartGame);

    function restartGame() {
        blocks[`${food.x},${food.y}`].classList.remove('food');
        snake.forEach(segment => {
            blocks[`${segment.x},${segment.y}`].classList.remove('fill');
        });
        score = 0;
        time = `00-00`;
        scoreElement.innerText = score;
        timerElement.innerText = time;
        highScoreElement.innerText = highScore;

        modal.style.display = 'none';
        startGameModal.style.display = 'flex';
        gameOverModal.style.display = 'none';
        snake = [{ x: 1, y: 3 }];
        direction = 'down';
        food = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) };
        intervalId = setInterval(() => { render() }, 300);
        timerIntervalId = setInterval(() => {
            let [min, sec] = time.split('-').map(Number);
            if (sec === 59) {
                min += 1;
                sec = 0;
            } else {
                sec += 1;
            }
            time = `${min.toString().padStart(2, '0')}-${sec.toString().padStart(2, '0')}`;
            timerElement.innerText = time;
        }, 1000);
    }

    document.addEventListener("keydown", (event) => {
        if (event.key === 'ArrowUp' && direction !== 'down') {
            direction = 'up';
        } else if (event.key === 'ArrowDown' && direction !== 'up') {
            direction = 'down';
        } else if (event.key === 'ArrowLeft' && direction !== 'right') {
            direction = 'left';
        } else if (event.key === 'ArrowRight' && direction !== 'left') {
            direction = 'right';
        }
    });
}