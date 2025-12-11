// No require needed for Node 18+
async function send() {
    try {
        const res = await fetch('http://localhost:3000/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'Test', email: 'test@example.com', message: 'Hello' })
        });
        console.log('Status:', res.status);
        const text = await res.text();
        console.log('Raw Body:', text);
        try {
            const data = JSON.parse(text);
            console.log('JSON Body:', JSON.stringify(data, null, 2));
        } catch (e) {
            console.log('Body is not JSON');
        }
    } catch (e) {
        console.error('Script Error:', e);
    }
}

send();
