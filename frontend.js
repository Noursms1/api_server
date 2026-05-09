async function switchTab(tab) {
    document.getElementById('autoTab').classList.toggle('active', tab === 'auto');
    document.getElementById('manualTab').classList.toggle('active', tab === 'manual');

    if (tab === 'manual') {
        const res = await fetch('/api/wallet/pi');
        const data = await res.json();

        if (data.success) {
            document.getElementById('walletDisplay').innerText = data.address;
        } else {
            document.getElementById('walletDisplay').innerText = "Wallet not available";
        }
    }
}
