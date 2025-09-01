import React, { useState, useEffect, useCallback } from 'react';
import './KeyboardVisualizer.css';

export interface KeyboardVisualizerProps {
    pressedKeys?: Set<string>;
    onKeyPress?: (key: string) => void;
    onKeyRelease?: (key: string) => void;
    keySize?: number,
    gap?: number,
    style?: React.CSSProperties;
    className?: string;
    listenToKeyboard?: boolean;
}

interface KeyDefinition {
    key: string;
    label: string;
    width: number;
    height: number;
    x: number;
    y: number;
    shape?: 'rect' | 'enter' | 'space';
}

const KeyboardVisualizer: React.FC<KeyboardVisualizerProps> = ({
    pressedKeys: externalPressedKeys,
    onKeyPress,
    onKeyRelease,
    keySize = 40,
    gap = 3,
    style,
    className = '',
    listenToKeyboard = true,
}) => {
    const [internalPressedKeys, setInternalPressedKeys] = useState<Set<string>>(new Set());

    const pressedKeys = externalPressedKeys || internalPressedKeys;

    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        if (!listenToKeyboard) return;

        const key = event.code || event.key;
        if (!pressedKeys.has(key)) {
            const newPressedKeys = new Set(pressedKeys);
            newPressedKeys.add(key);
            setInternalPressedKeys(newPressedKeys);
            onKeyPress?.(key);
        }
    }, [pressedKeys, onKeyPress, listenToKeyboard]);

    const handleKeyUp = useCallback((event: KeyboardEvent) => {
        if (!listenToKeyboard) return;

        const key = event.code || event.key;
        if (pressedKeys.has(key)) {
            const newPressedKeys = new Set(pressedKeys);
            newPressedKeys.delete(key);
            setInternalPressedKeys(newPressedKeys);
            onKeyRelease?.(key);
        }
    }, [pressedKeys, onKeyRelease, listenToKeyboard]);

    useEffect(() => {
        if (!listenToKeyboard) return;

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [handleKeyDown, handleKeyUp, listenToKeyboard]);

    const keyLayout: KeyDefinition[] = [
        { key: 'Escape', label: 'Esc', width: 1, height: 1, x: 0, y: 0 },
        { key: 'F1', label: 'F1', width: 1, height: 1, x: 2, y: 0 },
        { key: 'F2', label: 'F2', width: 1, height: 1, x: 3, y: 0 },
        { key: 'F3', label: 'F3', width: 1, height: 1, x: 4, y: 0 },
        { key: 'F4', label: 'F4', width: 1, height: 1, x: 5, y: 0 },
        { key: 'F5', label: 'F5', width: 1, height: 1, x: 6.5, y: 0 },
        { key: 'F6', label: 'F6', width: 1, height: 1, x: 7.5, y: 0 },
        { key: 'F7', label: 'F7', width: 1, height: 1, x: 8.5, y: 0 },
        { key: 'F8', label: 'F8', width: 1, height: 1, x: 9.5, y: 0 },
        { key: 'F9', label: 'F9', width: 1, height: 1, x: 11, y: 0 },
        { key: 'F10', label: 'F10', width: 1, height: 1, x: 12, y: 0 },
        { key: 'F11', label: 'F11', width: 1, height: 1, x: 13, y: 0 },
        { key: 'F12', label: 'F12', width: 1, height: 1, x: 14, y: 0 },
        { key: 'PrintScreen', label: 'PrtSc', width: 1, height: 1, x: 15.25, y: 0 },
        { key: 'ScrollLock', label: 'ScrLk', width: 1, height: 1, x: 16.25, y: 0 },
        { key: 'Pause', label: 'Pause', width: 1, height: 1, x: 17.25, y: 0 },

        { key: 'Backquote', label: '`', width: 1, height: 1, x: 0, y: 1.5 },
        { key: 'Digit1', label: '1', width: 1, height: 1, x: 1, y: 1.5 },
        { key: 'Digit2', label: '2', width: 1, height: 1, x: 2, y: 1.5 },
        { key: 'Digit3', label: '3', width: 1, height: 1, x: 3, y: 1.5 },
        { key: 'Digit4', label: '4', width: 1, height: 1, x: 4, y: 1.5 },
        { key: 'Digit5', label: '5', width: 1, height: 1, x: 5, y: 1.5 },
        { key: 'Digit6', label: '6', width: 1, height: 1, x: 6, y: 1.5 },
        { key: 'Digit7', label: '7', width: 1, height: 1, x: 7, y: 1.5 },
        { key: 'Digit8', label: '8', width: 1, height: 1, x: 8, y: 1.5 },
        { key: 'Digit9', label: '9', width: 1, height: 1, x: 9, y: 1.5 },
        { key: 'Digit0', label: '0', width: 1, height: 1, x: 10, y: 1.5 },
        { key: 'Minus', label: '-', width: 1, height: 1, x: 11, y: 1.5 },
        { key: 'Equal', label: '=', width: 1, height: 1, x: 12, y: 1.5 },
        { key: 'Backspace', label: '⌫', width: 2, height: 1, x: 13, y: 1.5 },
        { key: 'Insert', label: 'Ins', width: 1, height: 1, x: 15.25, y: 1.5 },
        { key: 'Home', label: 'Home', width: 1, height: 1, x: 16.25, y: 1.5 },
        { key: 'PageUp', label: 'PgUp', width: 1, height: 1, x: 17.25, y: 1.5 },

        { key: 'Tab', label: 'Tab', width: 1.5, height: 1, x: 0, y: 2.5 },
        { key: 'KeyQ', label: 'Q', width: 1, height: 1, x: 1.5, y: 2.5 },
        { key: 'KeyW', label: 'W', width: 1, height: 1, x: 2.5, y: 2.5 },
        { key: 'KeyE', label: 'E', width: 1, height: 1, x: 3.5, y: 2.5 },
        { key: 'KeyR', label: 'R', width: 1, height: 1, x: 4.5, y: 2.5 },
        { key: 'KeyT', label: 'T', width: 1, height: 1, x: 5.5, y: 2.5 },
        { key: 'KeyY', label: 'Y', width: 1, height: 1, x: 6.5, y: 2.5 },
        { key: 'KeyU', label: 'U', width: 1, height: 1, x: 7.5, y: 2.5 },
        { key: 'KeyI', label: 'I', width: 1, height: 1, x: 8.5, y: 2.5 },
        { key: 'KeyO', label: 'O', width: 1, height: 1, x: 9.5, y: 2.5 },
        { key: 'KeyP', label: 'P', width: 1, height: 1, x: 10.5, y: 2.5 },
        { key: 'BracketLeft', label: '[', width: 1, height: 1, x: 11.5, y: 2.5 },
        { key: 'BracketRight', label: ']', width: 1, height: 1, x: 12.5, y: 2.5 },
        { key: 'Backslash', label: '\\', width: 1.5, height: 1, x: 13.5, y: 2.5 },
        { key: 'Delete', label: 'Del', width: 1, height: 1, x: 15.25, y: 2.5 },
        { key: 'End', label: 'End', width: 1, height: 1, x: 16.25, y: 2.5 },
        { key: 'PageDown', label: 'PgDn', width: 1, height: 1, x: 17.25, y: 2.5 },

        { key: 'CapsLock', label: 'Caps', width: 1.75, height: 1, x: 0, y: 3.5 },
        { key: 'KeyA', label: 'A', width: 1, height: 1, x: 1.75, y: 3.5 },
        { key: 'KeyS', label: 'S', width: 1, height: 1, x: 2.75, y: 3.5 },
        { key: 'KeyD', label: 'D', width: 1, height: 1, x: 3.75, y: 3.5 },
        { key: 'KeyF', label: 'F', width: 1, height: 1, x: 4.75, y: 3.5 },
        { key: 'KeyG', label: 'G', width: 1, height: 1, x: 5.75, y: 3.5 },
        { key: 'KeyH', label: 'H', width: 1, height: 1, x: 6.75, y: 3.5 },
        { key: 'KeyJ', label: 'J', width: 1, height: 1, x: 7.75, y: 3.5 },
        { key: 'KeyK', label: 'K', width: 1, height: 1, x: 8.75, y: 3.5 },
        { key: 'KeyL', label: 'L', width: 1, height: 1, x: 9.75, y: 3.5 },
        { key: 'Semicolon', label: ';', width: 1, height: 1, x: 10.75, y: 3.5 },
        { key: 'Quote', label: "'", width: 1, height: 1, x: 11.75, y: 3.5 },
        { key: 'Enter', label: 'Enter', width: 2.25, height: 1, x: 12.75, y: 3.5, shape: 'enter' },

        { key: 'ShiftLeft', label: 'Shift', width: 2.25, height: 1, x: 0, y: 4.5 },
        { key: 'KeyZ', label: 'Z', width: 1, height: 1, x: 2.25, y: 4.5 },
        { key: 'KeyX', label: 'X', width: 1, height: 1, x: 3.25, y: 4.5 },
        { key: 'KeyC', label: 'C', width: 1, height: 1, x: 4.25, y: 4.5 },
        { key: 'KeyV', label: 'V', width: 1, height: 1, x: 5.25, y: 4.5 },
        { key: 'KeyB', label: 'B', width: 1, height: 1, x: 6.25, y: 4.5 },
        { key: 'KeyN', label: 'N', width: 1, height: 1, x: 7.25, y: 4.5 },
        { key: 'KeyM', label: 'M', width: 1, height: 1, x: 8.25, y: 4.5 },
        { key: 'Comma', label: ',', width: 1, height: 1, x: 9.25, y: 4.5 },
        { key: 'Period', label: '.', width: 1, height: 1, x: 10.25, y: 4.5 },
        { key: 'Slash', label: '/', width: 1, height: 1, x: 11.25, y: 4.5 },
        { key: 'ShiftRight', label: 'Shift', width: 2.75, height: 1, x: 12.25, y: 4.5 },
        { key: 'ArrowUp', label: '↑', width: 1, height: 1, x: 16.25, y: 4.5 },

        { key: 'ControlLeft', label: 'Ctrl', width: 1.25, height: 1, x: 0, y: 5.5 },
        { key: 'MetaLeft', label: '⌘', width: 1.25, height: 1, x: 1.25, y: 5.5 },
        { key: 'AltLeft', label: 'Alt', width: 1.25, height: 1, x: 2.5, y: 5.5 },
        { key: 'Space', label: '', width: 6.25, height: 1, x: 3.75, y: 5.5, shape: 'space' },
        { key: 'AltRight', label: 'Alt', width: 1.25, height: 1, x: 10, y: 5.5 },
        { key: 'MetaRight', label: '⌘', width: 1.25, height: 1, x: 11.25, y: 5.5 },
        { key: 'ContextMenu', label: '☰', width: 1.25, height: 1, x: 12.5, y: 5.5 },
        { key: 'ControlRight', label: 'Ctrl', width: 1.25, height: 1, x: 13.75, y: 5.5 },
        { key: 'ArrowLeft', label: '←', width: 1, height: 1, x: 15.25, y: 5.5 },
        { key: 'ArrowDown', label: '↓', width: 1, height: 1, x: 16.25, y: 5.5 },
        { key: 'ArrowRight', label: '→', width: 1, height: 1, x: 17.25, y: 5.5 },
    ];

    const renderKey = (keyDef: KeyDefinition) => {
        const isPressed = pressedKeys.has(keyDef.key);

        const x = keyDef.x * (keySize + gap);
        const y = keyDef.y * (keySize + gap);
        const width = keyDef.width * keySize + (keyDef.width - 1) * gap;
        const height = keyDef.height * keySize + (keyDef.height - 1) * gap;

        return (
            <div
                key={keyDef.key}
                className={`keyboard-visualizer-key ${isPressed ? 'pressed' : ''}`}
                data-key={keyDef.key}
                data-shape={keyDef.shape}
                style={{
                    left: x,
                    top: y,
                    width: width,
                    height: height,
                }}
            >
                <span className="keyboard-visualizer-label">{keyDef.label}</span>
            </div>
        );
    };

    const totalWidth = 18.25 * (keySize + gap);
    const totalHeight = 6.5 * (keySize + gap);

    return (
        <div
            className={`keyboard-visualizer ${className}`}
            style={{
                width: totalWidth,
                height: totalHeight,
                ...style,
            }}
        >
            {keyLayout.map(renderKey)}
        </div>
    );
};

export default KeyboardVisualizer;
