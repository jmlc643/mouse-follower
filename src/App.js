import {useEffect, useState} from "react";

const FollowMouse = () => {
    const [enabled, setEnabled] = useState(false)
    const [position, setPosition] = useState({x: 0, y: 0})

    useEffect(() => {
        console.log('efecto', {enabled})
        const handleMove = (event) => {
            const {clientX, clientY} = event
            console.log('handleMove', {clientX, clientY})
            setPosition({x: clientX, y: clientY})
        }
        if (enabled) {
            window.addEventListener('pointermove', handleMove)
        }

        return () => {
            window.removeEventListener('pointermove', handleMove)
        }
    }, [enabled]);

    useEffect(() => {
        document.body.classList.toggle('no-cursor', enabled)

        return () => {
            document.body.classList.remove('no-cursor')
        }
    }, [enabled]);

    return (
        <>
            <div style={{
                position: 'absolute',
                background: '#09f',
                borderRadius: '50%',
                opacity: 0.8,
                pointerEvents: 'none',
                left: -20,
                top: -20,
                width: 40,
                height: 40,
                transform: `translate(${position.x}px, ${position.y}px)`
            }}></div>
            <button onClick={() => setEnabled(!enabled)}>
                {enabled ? 'Desactivar' : 'Activar'} seguir puntero
            </button>
        </>
    )
}

function App() {
    const [mounted, setMounted] = useState(true)
    return (
        <main>
            {mounted && <FollowMouse />}
            <button onClick={() => setMounted(!mounted)}>
                Toggle mounted FollowMouse component
            </button>
        </main>
    )
}

export default App;
