// Real-time Countdown Timer - Updates every second
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Dynamic countdown started!');
    
    // Set tournament date to 51 days from now
    const tournamentDate = new Date();
    tournamentDate.setDate(tournamentDate.getDate() + 51);
    tournamentDate.setHours(20, 0, 0, 0); // Set to 8:00 PM for drama
    
    console.log('Tournament date:', tournamentDate.toString());
    
    function updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = tournamentDate - now;
        
        if (timeLeft < 0) {
            // Tournament has started!
            document.getElementById('countdown-timer').innerHTML = `
                <div class="text-center">
                    <h3 class="text-success mb-2">🎉 Tournament Started! 🎉</h3>
                    <p class="text-muted">The African Nations League is underway!</p>
                </div>
            `;
            clearInterval(interval);
            return;
        }
        
        // Calculate time units
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        // Update display - LIVE UPDATING!
        document.getElementById('countdown-days').textContent = days.toString().padStart(2, '0');
        document.getElementById('countdown-hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('countdown-minutes').textContent = minutes.toString().padStart(2, '0');
        
        // Optional: Log to see it's working (remove this in production)
        console.log(`⏰ Countdown: ${days}d ${hours}h ${minutes}m ${seconds}s`);
    }
    
    // Start immediately and update every second
    updateCountdown(); // First update
    const interval = setInterval(updateCountdown, 1000); // Update every second
    
    console.log('✅ Countdown timer running - updates every second');
});