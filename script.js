document.addEventListener('DOMContentLoaded', function() {
    // Get username from URL
    const pathSegments = window.location.pathname.split('/');
    const username = pathSegments[pathSegments.length - 1] || pathSegments[pathSegments.length - 2];
    
    // Fetch profile data
    fetch('profiles.json')
        .then(response => response.json())
        .then(data => {
            const profile = data.profiles.find(p => p.username === username);
            
            if (profile) {
                // Populate profile data
                document.getElementById('profile-pic').src = profile.pic;
                document.getElementById('profile-name').textContent = profile.name;
                document.getElementById('profile-bio').textContent = profile.bio;
                
                // Set social links
                document.getElementById('facebook-link').href = `https://facebook.com/${profile.facebook}`;
                document.getElementById('telegram-link').href = `https://t.me/${profile.telegram.replace('@', '')}`;
                document.getElementById('viber-link').href = `viber://add?number=${profile.viber}`;
                
                // Update page title
                document.title = `${profile.name} | Bio Profile`;
            } else {
                // Profile not found
                document.body.innerHTML = '<h1>Profile not found</h1>';
            }
        })
        .catch(error => {
            console.error('Error loading profile data:', error);
            document.body.innerHTML = '<h1>Error loading profile</h1>';
        });
});
