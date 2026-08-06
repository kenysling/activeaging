import React, { useState, useRef, useEffect } from 'react';
import { Camera, X, RefreshCw, Check, FlipHorizontal, AlertCircle, Sparkles } from 'lucide-react';

interface CameraModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (capturedDataUrl: string) => void;
}

export const CameraModal: React.FC<CameraModalProps> = ({ isOpen, onClose, onCapture }) => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isStartingCamera, setIsStartingCamera] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Start camera when modal opens or facing mode changes
  useEffect(() => {
    if (!isOpen) {
      stopCamera();
      setCapturedImage(null);
      setCameraError(null);
      return;
    }

    startCamera();

    return () => {
      stopCamera();
    };
  }, [isOpen, facingMode]);

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const startCamera = async () => {
    setIsStartingCamera(true);
    setCameraError(null);
    stopCamera();

    try {
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facingMode,
          width: { ideal: 1280 },
          height: { ideal: 1280 },
        },
        audio: false,
      });

      setStream(newStream);
      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
      }
    } catch (err: any) {
      console.error('Camera access error:', err);
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setCameraError('Camera permission was denied. Please allow camera access in your browser settings.');
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        setCameraError('No camera hardware device found on this system.');
      } else {
        setCameraError('Unable to start live camera feed. Please try again or use photo upload.');
      }
    } finally {
      setIsStartingCamera(false);
    }
  };

  const toggleFacingMode = () => {
    setFacingMode((prev) => (prev === 'user' ? 'environment' : 'user'));
  };

  const takeSnapshot = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;

    const width = video.videoWidth || 640;
    const height = video.videoHeight || 640;

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Flip horizontally if front camera for mirror feel
    if (facingMode === 'user') {
      ctx.translate(width, 0);
      ctx.scale(-1, 1);
    }

    ctx.drawImage(video, 0, 0, width, height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
    setCapturedImage(dataUrl);
  };

  const handleConfirmCaptured = () => {
    if (capturedImage) {
      onCapture(capturedImage);
      stopCamera();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="glass-card max-w-lg w-full rounded-3xl p-5 sm:p-6 space-y-4 border border-white/20 relative shadow-2xl overflow-hidden">
        {/* Top bar header */}
        <div className="flex justify-between items-center pb-1">
          <div className="flex items-center gap-2 text-sm font-bold text-[#e8dfee]">
            <Camera className="w-5 h-5 text-[#d2bbff]" />
            <span>Active Aging AI Camera</span>
          </div>
          <button
            onClick={() => {
              stopCamera();
              onClose();
            }}
            aria-label="Close camera modal"
            className="p-2 rounded-full glass-panel text-[#958da1] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Viewport Box */}
        <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-[#100d16] border border-white/10 flex items-center justify-center shadow-inner">
          {capturedImage ? (
            /* Snapshot Preview */
            <img src={capturedImage} alt="Captured portrait" className="w-full h-full object-cover" />
          ) : cameraError ? (
            /* Error state */
            <div className="p-6 text-center space-y-3">
              <AlertCircle className="w-12 h-12 text-[#ffb4ab] mx-auto" />
              <p className="text-sm text-[#ccc3d8] leading-relaxed max-w-xs mx-auto">
                {cameraError}
              </p>
              <button
                onClick={startCamera}
                className="px-4 py-2 rounded-full bg-[#7c3aed] text-white text-xs font-bold hover:opacity-90 cursor-pointer"
              >
                Retry Camera
              </button>
            </div>
          ) : (
            /* Live Camera Feed */
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={`w-full h-full object-cover ${facingMode === 'user' ? 'scale-x-[-1]' : ''}`}
              />

              {/* Face Guide Overlay */}
              <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
                <div className="w-2/3 h-3/4 border-2 border-dashed border-[#d2bbff]/60 rounded-[50%] shadow-[0_0_20px_rgba(210,187,255,0.2)] animate-pulse" />
                <span className="text-[11px] font-bold text-[#d2bbff] bg-black/60 backdrop-blur-md px-3 py-1 rounded-full mt-3 border border-white/10">
                  Align face within guide
                </span>
              </div>

              {/* Flip camera button */}
              <button
                onClick={toggleFacingMode}
                aria-label="Flip camera"
                className="absolute top-3 right-3 p-2.5 rounded-full bg-black/60 backdrop-blur-md text-[#d2bbff] hover:text-white border border-white/20 cursor-pointer transition-transform active:scale-90"
              >
                <FlipHorizontal className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Hidden Canvas for capture rendering */}
          <canvas ref={canvasRef} className="hidden" />
        </div>

        {/* Action Controls */}
        <div className="space-y-2 pt-1">
          {capturedImage ? (
            <div className="flex gap-3">
              <button
                onClick={() => setCapturedImage(null)}
                className="flex-1 py-3.5 rounded-full glass-panel text-[#ccc3d8] font-bold text-xs hover:bg-white/10 transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Retake Photo</span>
              </button>
              <button
                onClick={handleConfirmCaptured}
                className="flex-1 py-3.5 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#0566d9] text-white font-bold text-xs shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:opacity-90 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4 text-emerald-300" />
                <span>Use Photo for AI</span>
              </button>
            </div>
          ) : (
            <button
              onClick={takeSnapshot}
              disabled={Boolean(cameraError) || isStartingCamera}
              className="w-full py-4 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#0566d9] text-white font-extrabold text-sm shadow-[0_0_25px_rgba(124,58,237,0.4)] hover:opacity-90 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Camera className="w-5 h-5 text-white" />
              <span>Capture Photo</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
