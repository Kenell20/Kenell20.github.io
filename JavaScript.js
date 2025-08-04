document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.login-form');
    const fingerprintButton = document.getElementById('fingerprint-login');

    // Función que simula la autenticación con huella digital (WebAuthn)
    async function handleFingerprintLogin() {
        if (!window.PublicKeyCredential) {
            alert('WebAuthn no es compatible con este navegador.');
            return;
        }

        try {
            // Aquí se simularía una llamada a tu servidor para obtener la "challenge"
            // const challenge = await fetch('/api/webauthn/login_challenge');
            // ...
            
            // Esta parte solicita al navegador que active el sensor de huella
            // La información enviada es un objeto de credencial de prueba
            const options = {
                publicKey: {
                    challenge: new Uint8Array([/* un valor aleatorio del servidor */]),
                    allowCredentials: [
                        {
                            type: 'public-key',
                            id: new Uint8Array([/* el ID de credencial registrado previamente */]),
                            transports: ['internal']
                        }
                    ],
                    userVerification: 'required'
                }
            };
            
            const credential = await navigator.credentials.get(options);
            
            // Si llega hasta aquí, significa que la huella fue verificada localmente
            // Ahora se envía el resultado al servidor para su validación final
            // const verificationResult = await fetch('/api/webauthn/verify', {
            //     method: 'POST',
            //     body: JSON.stringify(credential)
            // });

            alert('¡Huella verificada! Acceso concedido.');
            // window.location.href = "/dashboard";
        } catch (error) {
            console.error('Error al autenticar con huella:', error);
            alert('No se pudo verificar la huella. Inténtelo de nuevo.');
            
            const container = document.querySelector('.login-container');
            container.classList.add('shake');
            setTimeout(() => {
                container.classList.remove('shake');
            }, 500); 
        }
    }

    // Escucha el clic del botón de huella
    fingerprintButton.addEventListener('click', handleFingerprintLogin);
    
    // ... (El resto del código JavaScript anterior se mantiene, por ejemplo, el de validar usuario/contraseña)
});