const canvas = document.getElementById('retro-grid');
const ctx = canvas.getContext('2d');

// Set canvas size to match window
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Grid properties
const GRID_SPACING = 50;
const GRID_COLOR = '#0f0';
const GRID_ALPHA_MAX = 0.5;

// Particles
class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.speed = 1 + Math.random() * 3;
        this.size = 2 + Math.random() * 3;
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    }

    update() {
        this.y += this.speed;
        if (this.y > canvas.height) {
            this.reset();
            this.y = 0;
        }
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Create particles
const particles = Array(50).fill().map(() => new Particle());

// Animation variables
let gridOffset = 0;
const gridSpeed = 1;

// Main animation loop
function animate() {
    // Clear canvas
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    gridOffset = (gridOffset + gridSpeed) % GRID_SPACING;
    
    // Vertical lines
    for (let x = gridOffset; x < canvas.width; x += GRID_SPACING) {
        const alpha = (x / canvas.width) * GRID_ALPHA_MAX;
        ctx.strokeStyle = `rgba(0, 255, 0, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }

    // Horizontal lines
    for (let y = gridOffset; y < canvas.height; y += GRID_SPACING) {
        const alpha = (y / canvas.height) * GRID_ALPHA_MAX;
        ctx.strokeStyle = `rgba(0, 255, 0, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }

    // Update and draw particles
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    // Add scan line effect
    const scanLineY = (Date.now() / 10) % canvas.height;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.fillRect(0, scanLineY, canvas.width, 2);

    requestAnimationFrame(animate);
}

// Start animation
animate();

// Add some interactivity
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('mouseover', () => {
        item.style.transform = 'scale(1.2) rotate(' + (Math.random() * 5 - 2.5) + 'deg)';
    });
    
    item.addEventListener('mouseout', () => {
        item.style.transform = 'scale(1) rotate(0deg)';
    });
}); 