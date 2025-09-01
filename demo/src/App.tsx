import KeyboardVisualizer from '../../src/KeyboardVisualizer.tsx'
import './App.css'

function App() {
    const handleKeyPress = (key: string) => {
        console.log('Key pressed:', key)
    }

    const handleKeyRelease = (key: string) => {
        console.log('Key released:', key)
    }

    return (
        <div className={`app`}>
            <header className="header">
                <h1>React Keyboard Visualizer</h1>
            </header>

            <div className='link-section'>

                <a href="https://github.com/nuskey8/react-keyboard-visualizer">
                    GitHub
                </a>
                <span>
                    /
                </span>
                <a href="https://www.npmjs.com/package/react-keyboard-visualizer">
                    npm
                </a>

            </div>

            <div className="keyboard-container">
                <KeyboardVisualizer
                    onKeyPress={handleKeyPress}
                    onKeyRelease={handleKeyRelease}
                    listenToKeyboard={true}
                />
            </div>
        </div>
    )
}

export default App
