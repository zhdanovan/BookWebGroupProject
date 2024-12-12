
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById('book-container').appendChild(renderer.domElement);

   
        const bookWidth = 2.5;
        const bookHeight = 3.5;
        const bookThickness = 0.5;

     
        const textureLoader = new THREE.TextureLoader();
        const coverTexture = textureLoader.load('images/cover.jpg');
        const pageTexture = textureLoader.load('images/page.jpg');
        const cover2Texture = textureLoader.load('images/cv.png');

        function createBook(x, y, z) {
            const coverMaterial = new THREE.MeshBasicMaterial({ map: coverTexture });
            const pageMaterial = new THREE.MeshBasicMaterial({ map: pageTexture });
            const cover2Material = new THREE.MeshBasicMaterial({ map: cover2Texture });

            const bookGeometry = new THREE.BoxGeometry(bookWidth, bookHeight, bookThickness);
            const bookMesh = new THREE.Mesh(bookGeometry, [
                cover2Material,
                pageMaterial,
                pageMaterial,
                pageMaterial,
                coverMaterial,
                coverMaterial
            ]);
            bookMesh.position.set(x, y, z);
            scene.add(bookMesh);

            return bookMesh;
        }

        const bookCover = createBook(0, 2.0, 0);

        const dots = [];
        
        function createPulsatingDot(x, y, z, message) {
            const dotGeometry = new THREE.SphereGeometry(0.15, 16, 16);
            const dotMaterial = new THREE.MeshBasicMaterial({
                color: 0x888888,
                transparent: true,
                opacity: 0.7
            });
            
            const dotMesh = new THREE.Mesh(dotGeometry, dotMaterial);
            dotMesh.position.set(x, y, z);
            bookCover.add(dotMesh);
            dots.push({ mesh: dotMesh, message });
        }

        // Тут будут аннотации. В процессе исправления
        createPulsatingDot(-1, 1.4, bookThickness / 2, "АННОТАЦИЯ1"); 
        createPulsatingDot(-0.8, -1.2, bookThickness / 2, "АННОТАЦИЯ2");

        camera.position.z = 6;

        function animate() {
            requestAnimationFrame(animate);
            
            dots.forEach(dot => {
                dot.mesh.scale.set(1 + Math.sin(Date.now() * 0.005) * 0.2,
                                   1 + Math.sin(Date.now() * 0.005) * 0.2,
                                   1 + Math.sin(Date.now() * 0.005) * 0.2); 
            });

            renderer.render(scene, camera);
        }

        animate();

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

 
        const tooltip = document.getElementById('tooltip');
     
        const raycaster = new THREE.Raycaster();
        
      
        window.addEventListener('mousemove', (event) => {
            const mouse = new THREE.Vector2(
                (event.clientX / window.innerWidth) * 2 - 1,
                -(event.clientY / window.innerHeight) * 2 + 1
            );

            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(dots.map(dot => dot.mesh));

            if (intersects.length > 0) {
                const intersectedDot = intersects[0];
                
                tooltip.style.display = 'block';
                tooltip.style.left = `${event.clientX + 10}px`;
                tooltip.style.top = `${event.clientY + 10}px`;
                
                tooltip.innerHTML = intersectedDot.object.message;
                
                tooltip.style.opacity = '1';
                tooltip.style.transform = 'scale(1)';
            } else {
                tooltip.style.display = 'none';
                tooltip.style.opacity = '0';
                tooltip.style.transform = 'scale(0.8)';
            }
        });

        let isDragging = false;
        let previousMousePosition = { x: 0, y: 0 };

        window.addEventListener('mousedown', (event) => {
            isDragging = true;
            previousMousePosition = { x: event.clientX, y: event.clientY };
        });

        window.addEventListener('mouseup', () => {
            isDragging = false;
        });

        window.addEventListener('mousemove', (event) => {
            if (isDragging) {
                const deltaMove = {
                    x: event.clientX - previousMousePosition.x,
                    y: event.clientY - previousMousePosition.y,
                };

                bookCover.rotation.y += deltaMove.x * 0.01; 
                bookCover.rotation.x += deltaMove.y * 0.01; 

                previousMousePosition = { x: event.clientX, y: event.clientY };
                
                tooltip.style.display = 'none'; 
            }
        });