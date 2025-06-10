document.addEventListener('DOMContentLoaded', function() {
    // Get username from URL
    const pathSegments = window.location.pathname.split('/');
    let username = pathSegments.pop() || pathSegments.pop(); // Handle cases with trailing slash
    
    // If no username specified, use the first profile
    if (!username || username === 'index.html') {
        username = '';
    }

    // Fetch profile data
    fetch('profile.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            let profile;
            
            if (username) {
                // Find profile by username
                profile = data.profiles.find(p => p.username === username);
                if (!profile) {
                    throw new Error('Profile not found');
                }
            } else {
                // Use first profile if no username specified
                profile = data.profiles[0];
            }

            // Populate profile data
            document.getElementById('profile-pic').src = profile.pic;
            document.getElementById('profile-name').textContent = profile.name;
            document.getElementById('profile-bio').textContent = profile.bio;
            
            // Set social links
            const facebookLink = document.getElementById('facebook-link');
            const telegramLink = document.getElementById('telegram-link');
            const viberLink = document.getElementById('viber-link');
            
            if (profile.facebook) {
                facebookLink.href = `https://facebook.com/${profile.facebook}`;
            } else {
                facebookLink.style.display = 'none';
            }
            
            if (profile.telegram) {
                telegramLink.href = `https://t.me/${profile.telegram.replace('@', '')}`;
            } else {
                telegramLink.style.display = 'none';
            }
            
            if (profile.viber) {
                viberLink.href = `viber://add?number=${profile.viber}`;
            } else {
                viberLink.style.display = 'none';
            }

            // Update page title
            document.title = `${profile.name} | Bio Profile`;
        })
        .catch(error => {
            console.error('Error:', error);
            document.body.innerHTML = `
                <div class="error-container">
                    <h1>Profile Not Found</h1>
                    <p>The requested profile does not exist.</p>
                    <a href="/">Return to Home</a>
                </div>
            `;
        });
});
