'use client';

/**
 * CameraFeed — Dark theme.
 */
import { useRef, useEffect, useState, useCallback } from 'react';

export default function CameraFeed({ onVideoReady, canvasRef, children }) {
    const videoRef = useRef(null);
    const streamRef = useRef(null);
    const [cameraError, setCameraError] = useState(null);
    const [isCameraReady, setIsCameraReady] = useState(false);

    const startCamera = useCallback(async () => {
        try {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
            }

            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    width: { ideal: 1280 },
                    height: { ideal: 720 },
                    facingMode: 'user',
                    frameRate: { ideal: 30 },
                },
                audio: false,
            });

            streamRef.current = stream;

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.onloadeddata = () => {
                    setIsCameraReady(true);
                    onVideoReady?.(videoRef.current);
                };
            }
        } catch (err) {
            console.error('Camera access error:', err);
            if (err.name === 'NotAllowedError') {
                setCameraError('Camera access denied. Please allow camera permission and reload.');
            } else if (err.name === 'NotFoundError') {
                setCameraError('No camera found. Please connect a webcam.');
            } else {
                setCameraError(`Camera error: ${err.message}`);
            }
        }
    }, [onVideoReady]);

    useEffect(() => {
        startCamera();
        return () => {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
                streamRef.current = null;
            }
        };
    }, [startCamera]);

    if (cameraError) {
        return (
            <div className="flex items-center justify-center w-full h-full" style={{ background: '#1d1815' }}>
                <div className="glass-card p-10 max-w-sm text-center rounded-2xl shadow-xl">
                    <div className="text-4xl mb-4">📷</div>
                    <h2 className="font-serif text-xl font-semibold text-white mb-3">
                        Camera unavailable
                    </h2>
                    <p className="text-gray-500 text-sm mb-5 leading-relaxed">{cameraError}</p>
                    <button
                        onClick={() => { setCameraError(null); startCamera(); }}
                        className="px-6 py-2.5 rounded-full text-sm font-medium cursor-pointer transition-all text-white bg-primary hover:bg-primary-dark"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="relative w-full h-full overflow-hidden" style={{ background: '#1d1815' }}>
            <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="absolute inset-0 w-full h-full object-cover"
                style={{ transform: 'scaleX(-1)' }}
            />
            <canvas
                ref={canvasRef}
                className="skeleton-canvas"
            />
            {isCameraReady && children}
        </div>
    );
}
