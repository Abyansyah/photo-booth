'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Camera, RefreshCw, Settings, Eye, Sliders, StopCircle, ArrowRight, AlertTriangle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger, DrawerClose } from '@/components/ui/drawer';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useMediaQuery } from '@/hooks/use-media-query';
import { toast } from 'sonner';
import Image from 'next/image';
type FilterType = 'none' | 'grayscale' | 'sepia' | 'vintage' | 'blur' | 'saturate' | 'invert';

export default function PhotoBoothPage() {
  const router = useRouter();
  const [cameraActive, setCameraActive] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [photos, setPhotos] = useState<(string | null)[]>([]);
  const [previewPhoto, setPreviewPhoto] = useState<string | null>(null);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [targetPhotoIndex, setTargetPhotoIndex] = useState<number | null>(null);
  const [cameraPermissionGranted, setCameraPermissionGranted] = useState<boolean | null>(null);
  const [cameraPermissionChecking, setCameraPermissionChecking] = useState(true);

  const [availableCameras, setAvailableCameras] = useState<MediaDeviceInfo[]>([]);
  const [selectedCamera, setSelectedCamera] = useState<string>('');
  const [timerDuration, setTimerDuration] = useState<number>(3);
  const [photoCount, setPhotoCount] = useState<number>(4);
  const [isCapturing, setIsCapturing] = useState(false);

  const [selectedFilter, setSelectedFilter] = useState<FilterType>('none');

  const isMobile = useMediaQuery('(max-width: 768px)');

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const checkCameraPermission = async () => {
    setCameraPermissionChecking(true);
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const cameras = devices.filter((device) => device.kind === 'videoinput');

      if (cameras.length > 0 && cameras.some((camera) => camera.label)) {
        console.log('Camera permission already granted');
        setCameraPermissionGranted(true);
        await getAvailableCameras();
      } else {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });

          setCameraPermissionGranted(true);

          stream.getTracks().forEach((track) => track.stop());

          await getAvailableCameras();
        } catch (err) {
          console.error('Camera permission denied:', err);
          setCameraPermissionGranted(false);
        }
      }
    } catch (error) {
      console.error('Error checking camera permission:', error);
      setCameraPermissionGranted(false);
    } finally {
      setCameraPermissionChecking(false);
    }
  };

  const requestCameraPermission = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraPermissionGranted(true);
      await getAvailableCameras();
    } catch {
      toast.error(
        <div className="flex flex-col gap-2">
          <div className="font-bold flex items-center gap-2">
            <span className="text-xl">📸</span> Camera Access Needed
          </div>
          <p>
            Our photo booth can&apos;t play peek-a-boo without your camera! 🙈
            <br />
            Please allow camera access so we can capture your fabulous self. Without it, we&apos;re just a booth with no photo... and that&apos;s just sad.
          </p>
        </div>
      );

      setCameraPermissionGranted(false);
    }
  };

  const getAvailableCameras = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const cameras = devices.filter((device) => device.kind === 'videoinput').filter((device) => device.deviceId && device.deviceId !== '');

      console.log('Available cameras:', cameras);
      setAvailableCameras(cameras);

      if (cameras.length > 0) {
        const frontCamera = cameras.find((camera) => camera.label.toLowerCase().includes('front') || camera.label.toLowerCase().includes('user') || camera.label.toLowerCase().includes('selfie'));

        const cameraToUse = frontCamera ? frontCamera.deviceId : cameras[0].deviceId;
        console.log('Setting default camera:', cameraToUse);
        setSelectedCamera(cameraToUse);
      }
    } catch (error) {
      console.error('Error getting cameras:', error);
    }
  };

  const startCamera = async (deviceId?: string) => {
    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }

      const deviceIdToUse = deviceId || selectedCamera;

      const constraints = {
        video: {
          deviceId: deviceIdToUse ? { exact: deviceIdToUse } : undefined,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play().catch((e) => console.error('Error playing video:', e));
      }

      setCameraActive(true);
      // setSessionComplete(false);
    } catch (error) {
      console.error('Error starting camera:', error);

      toast.error(
        <div className="flex flex-col gap-2">
          <div className="font-bold flex items-center gap-2">
            <span className="text-xl">📸</span> Camera Shy Alert!
          </div>
          <p>
            Our photo booth can&apos;t see your beautiful face! This could be because:
            <br />• Your camera is playing hide and seek
            <br />• Another app is using your camera
            <br />• Your browser needs camera permissions
            <br />
            <br />
            Please check your camera settings and try again. We can&apos;t wait to capture your awesome self!
          </p>
        </div>
      );
    }
  };

  const switchCamera = async (deviceId: string) => {
    setSelectedCamera(deviceId);
    if (cameraActive) {
      await startCamera(deviceId);
    }
  };

  const applyFilter = (context: CanvasRenderingContext2D, canvas: HTMLCanvasElement, filter: FilterType) => {
    if (filter === 'none') return;

    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    switch (filter) {
      case 'grayscale':
        for (let i = 0; i < data.length; i += 4) {
          const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
          data[i] = avg;
          data[i + 1] = avg;
          data[i + 2] = avg;
        }
        break;
      case 'sepia':
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          data[i] = Math.min(255, r * 0.393 + g * 0.769 + b * 0.189);
          data[i + 1] = Math.min(255, r * 0.349 + g * 0.686 + b * 0.168);
          data[i + 2] = Math.min(255, r * 0.272 + g * 0.534 + b * 0.131);
        }
        break;
      case 'vintage':
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          data[i] = Math.min(255, r * 0.62 + g * 0.32 + b * 0.25);
          data[i + 1] = Math.min(255, r * 0.22 + g * 0.57 + b * 0.25);
          data[i + 2] = Math.min(255, r * 0.18 + g * 0.21 + b * 0.55);
        }
        break;
      case 'saturate':
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          const max = Math.max(r, g, b);
          const min = Math.min(r, g, b);
          const delta = max - min;
          const saturation = 1.5;

          if (delta === 0) continue;

          if (r === max) {
            data[i] = r;
            data[i + 1] = g + (g - min) * (saturation - 1);
            data[i + 2] = b + (b - min) * (saturation - 1);
          } else if (g === max) {
            data[i] = r + (r - min) * (saturation - 1);
            data[i + 1] = g;
            data[i + 2] = b + (b - min) * (saturation - 1);
          } else if (b === max) {
            data[i] = r + (r - min) * (saturation - 1);
            data[i + 1] = g + (g - min) * (saturation - 1);
            data[i + 2] = b;
          }
        }
        break;
      case 'invert':
        for (let i = 0; i < data.length; i += 4) {
          data[i] = 255 - data[i];
          data[i + 1] = 255 - data[i + 1];
          data[i + 2] = 255 - data[i + 2];
        }
        break;
      case 'blur':
        context.putImageData(imageData, 0, 0);
        context.filter = 'blur(4px)';
        context.drawImage(canvas, 0, 0);
        context.filter = 'none';
        return;
    }

    context.putImageData(imageData, 0, 0);
  };

  const capturePhoto = (specificIndex?: number) => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context) return;

    const size = Math.min(video.videoWidth, video.videoHeight);
    canvas.width = size;
    canvas.height = size;

    const offsetX = (video.videoWidth - size) / 2;
    const offsetY = (video.videoHeight - size) / 2;

    context.drawImage(video, offsetX, offsetY, size, size, 0, 0, size, size);
    applyFilter(context, canvas, selectedFilter);

    const imageData = canvas.toDataURL('image/jpeg');

    if (specificIndex !== undefined) {
      setPhotos((prev) => {
        const newPhotos = [...prev];
        newPhotos[specificIndex] = imageData;
        return newPhotos;
      });
      setTargetPhotoIndex(null);
    } else {
      setPhotos((prev) => {
        const newPhotos = [...prev];
        const nextEmptyIndex = newPhotos.findIndex((p) => p === null);

        if (nextEmptyIndex !== -1) {
          newPhotos[nextEmptyIndex] = imageData;
        } else {
          newPhotos.push(imageData);
        }

        return newPhotos;
      });
    }
  };

  const startCapture = () => {
    if (isCapturing) return;

    setPhotos(Array(photoCount).fill(null));

    if (photos.length === 0 || (targetPhotoIndex === null && !photos.some((p) => p !== null))) {
      setPhotos(Array(photoCount).fill(null));
    }

    setIsCapturing(true);
    setSessionComplete(false);

    if (targetPhotoIndex !== null) {
      captureWithCountdown(targetPhotoIndex, true);
    } else {
      captureWithCountdown(0);
    }
  };

  const stopCapture = () => {
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
    setIsCapturing(false);
    setCountdown(0);
  };

  const captureWithCountdown = (index: number, isSingleCapture = false) => {
    if (!isSingleCapture && index >= photoCount) {
      setIsCapturing(false);
      setCountdown(0);
      setSessionComplete(true);

      return;
    }

    setCountdown(timerDuration);

    countdownIntervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          if (countdownIntervalRef.current) {
            clearInterval(countdownIntervalRef.current);
            countdownIntervalRef.current = null;
          }

          setTimeout(() => {
            if (isSingleCapture) {
              capturePhoto(index);
              setIsCapturing(false);
              setSessionComplete(true);
            } else {
              capturePhoto();
              setTimeout(() => {
                captureWithCountdown(index + 1);
              }, 500);
            }
          }, 100);

          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const resetPhotos = () => {
    setPhotos(Array(photoCount).fill(null));
    setSessionComplete(false);
  };
  const goToPhotoStripEditor = () => {
    const validPhotos = photos.filter((photo) => photo !== null) as string[];

    sessionStorage.setItem('photoStripImages', JSON.stringify(validPhotos));

    router.push('/photo-strip-editor');
  };

  useEffect(() => {
    checkCameraPermission();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (cameraPermissionGranted && selectedCamera && !cameraActive) {
      startCamera();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cameraPermissionGranted, selectedCamera]);

  useEffect(() => {
    if (cameraPermissionGranted && availableCameras.length > 0 && selectedCamera && !cameraActive) {
      startCamera();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cameraPermissionGranted, availableCameras, selectedCamera]);

  const getFilterClass = (filter: FilterType): string => {
    switch (filter) {
      case 'grayscale':
        return 'grayscale';
      case 'sepia':
        return 'sepia';
      case 'vintage':
        return 'vintage';
      case 'blur':
        return 'blur';
      case 'saturate':
        return 'saturate';
      case 'invert':
        return 'invert';
      default:
        return '';
    }
  };
  const SettingsContent = () => (
    <div className="space-y-4 p-1">
      {availableCameras.length > 0 && (
        <div>
          <Label htmlFor="camera-select-active" className="mb-2 block text-sm">
            Camera
          </Label>
          <Select value={selectedCamera} onValueChange={(value) => switchCamera(value)}>
            <SelectTrigger id="camera-select-active" className="text-sm">
              <SelectValue placeholder="Select a camera" />
            </SelectTrigger>
            <SelectContent>
              {availableCameras.map((camera) =>
                camera.deviceId ? (
                  <SelectItem key={camera.deviceId} value={camera.deviceId}>
                    {camera.label || `Camera ${availableCameras.indexOf(camera) + 1}`}
                  </SelectItem>
                ) : null
              )}
            </SelectContent>
          </Select>
        </div>
      )}

      <div>
        <Label className="mb-2 block text-sm">Timer (seconds): {timerDuration}</Label>
        <Tabs defaultValue={timerDuration.toString()} onValueChange={(v) => setTimerDuration(Number.parseInt(v))}>
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="1">1s</TabsTrigger>
            <TabsTrigger value="3">3s</TabsTrigger>
            <TabsTrigger value="5">5s</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div>
        <Label className="mb-2 block text-sm">Number of Photos: {photoCount}</Label>
        <Tabs
          defaultValue={photoCount.toString()}
          onValueChange={(v) => {
            const newCount = Number.parseInt(v);
            setPhotoCount(newCount);

            // if (!photos.some((p) => p !== null)) {
            //   setPhotos(Array(newCount).fill(null));
            // }
          }}
        >
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="1">1</TabsTrigger>
            <TabsTrigger value="2">2</TabsTrigger>
            <TabsTrigger value="3">3</TabsTrigger>
            <TabsTrigger value="4">4</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );

  const FilterContent = () => (
    <RadioGroup value={selectedFilter} onValueChange={(value) => setSelectedFilter(value as FilterType)} className="space-y-2 p-1">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="none" id="filter-none" />
        <Label htmlFor="filter-none">No Filter</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="grayscale" id="filter-grayscale" />
        <Label htmlFor="filter-grayscale">Grayscale</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="sepia" id="filter-sepia" />
        <Label htmlFor="filter-sepia">Sepia</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="vintage" id="filter-vintage" />
        <Label htmlFor="filter-vintage">Vintage</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="saturate" id="filter-saturate" />
        <Label htmlFor="filter-saturate">Vibrant</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="invert" id="filter-invert" />
        <Label htmlFor="filter-invert">Invert</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="blur" id="filter-blur" />
        <Label htmlFor="filter-blur">Blur</Label>
      </div>
    </RadioGroup>
  );

  const hasEnoughPhotos = photos.filter((p) => p !== null).length > 0;

  useEffect(() => {
    if (cameraActive) {
      const wasComplete = sessionComplete;
      startCamera().then(() => {
        if (wasComplete) {
          setSessionComplete(true);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCamera]);

  return (
    <div className="container py-8 px-4 md:py-12 md:px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8">Digital Photo Booth</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          <div className="md:col-span-2 flex flex-col">
            <div className="bg-gray-100 rounded-xl overflow-hidden relative  md:aspect-video sm:aspect-square">
              {!cameraActive ? (
                <div className="flex flex-col items-center justify-center h-full p-4 md:p-6">
                  <Camera className="h-12 w-12 md:h-16 md:w-16 text-primary mb-3 md:mb-4" />
                  <h2 className="text-lg md:text-xl font-medium mb-2">Ready to take photos?</h2>
                  <p className="text-gray-500 text-center text-sm md:text-base mb-4 md:mb-6">Take photos to create your photo strip. Make sure your camera is enabled.</p>

                  {cameraPermissionChecking ? (
                    <div className="flex flex-col items-center">
                      <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mb-4"></div>
                      <p className="text-sm text-gray-500">Checking camera permissions...</p>
                    </div>
                  ) : cameraPermissionGranted === false ? (
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4 flex items-start">
                      <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-amber-800 mb-1">Camera permission required</h3>
                        <p className="text-sm text-amber-700 mb-3">We need access to your camera to take photos. Please grant camera permission.</p>
                        <Button onClick={requestCameraPermission} size="sm">
                          Grant Camera Access
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {availableCameras.length > 0 && (
                        <div className="w-full max-w-xs mb-4">
                          <Label htmlFor="camera-select" className="mb-2 block text-sm">
                            Select Camera
                          </Label>
                          <Select value={selectedCamera} onValueChange={(value) => setSelectedCamera(value)}>
                            <SelectTrigger id="camera-select">
                              <SelectValue placeholder="Select a camera" />
                            </SelectTrigger>
                            <SelectContent>
                              {availableCameras.map((camera) =>
                                camera.deviceId ? (
                                  <SelectItem key={camera.deviceId} value={camera.deviceId}>
                                    {camera.label || `Camera ${availableCameras.indexOf(camera) + 1}`}
                                  </SelectItem>
                                ) : null
                              )}
                            </SelectContent>
                          </Select>
                        </div>
                      )}

                      <Button onClick={() => startCamera()} size="lg" disabled={!cameraPermissionGranted || availableCameras.length === 0}>
                        Start Camera
                      </Button>
                    </>
                  )}
                </div>
              ) : (
                <div className="relative h-full bg-gray-900 flex items-center justify-center">
                  <video ref={videoRef} className={`h-full w-full object-contain ${getFilterClass(selectedFilter)}`} autoPlay playsInline muted />

                  <canvas ref={canvasRef} className="hidden" />

                  {countdown > 0 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="text-6xl font-bold text-white animate-pulse">{countdown}</div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {cameraActive && (
              <div className="flex justify-center items-center gap-4 mt-4">
                {isMobile ? (
                  <Drawer>
                    <DrawerTrigger asChild>
                      <Button variant="outline" size="icon" className="h-10 w-10" disabled={isCapturing}>
                        <Settings className="h-5 w-5" />
                      </Button>
                    </DrawerTrigger>
                    <DrawerContent>
                      <DrawerHeader>
                        <DrawerTitle>Camera Settings</DrawerTitle>
                      </DrawerHeader>
                      <div className="px-4 pb-4">
                        <SettingsContent />
                      </div>
                      <div className="px-4 pb-6 flex justify-end">
                        <DrawerClose asChild>
                          <Button variant="outline">Close</Button>
                        </DrawerClose>
                      </div>
                    </DrawerContent>
                  </Drawer>
                ) : (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="icon" className="h-10 w-10" disabled={isCapturing}>
                        <Settings className="h-5 w-5" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Camera Settings</DialogTitle>
                      </DialogHeader>
                      <SettingsContent />
                    </DialogContent>
                  </Dialog>
                )}
                {isMobile ? (
                  <Drawer>
                    <DrawerTrigger asChild>
                      <Button variant="outline" size="icon" className="h-10 w-10" disabled={isCapturing}>
                        <Sliders className="h-5 w-5" />
                      </Button>
                    </DrawerTrigger>
                    <DrawerContent>
                      <DrawerHeader>
                        <DrawerTitle>Photo Filters</DrawerTitle>
                      </DrawerHeader>
                      <div className="px-4 pb-4">
                        <FilterContent />
                      </div>
                      <div className="px-4 pb-6 flex justify-end">
                        <DrawerClose asChild>
                          <Button variant="outline">Close</Button>
                        </DrawerClose>
                      </div>
                    </DrawerContent>
                  </Drawer>
                ) : (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="icon" className="h-10 w-10" disabled={isCapturing}>
                        <Sliders className="h-5 w-5" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Photo Filters</DialogTitle>
                      </DialogHeader>
                      <FilterContent />
                    </DialogContent>
                  </Dialog>
                )}

                <Button onClick={sessionComplete ? resetPhotos : startCapture} size="lg" className="rounded-full w-16 h-16 p-0" disabled={isCapturing}>
                  {sessionComplete ? <RefreshCw className="h-8 w-8" /> : <Camera className="h-8 w-8" />}
                </Button>

                {isCapturing && (
                  <Button onClick={stopCapture} variant="destructive" size="icon" className="h-10 w-10">
                    <StopCircle className="h-5 w-5" />
                  </Button>
                )}
              </div>
            )}

            {sessionComplete && hasEnoughPhotos && (
              <div className="flex justify-center mt-6">
                <Button onClick={goToPhotoStripEditor} size="lg" className="gap-2">
                  Next <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <div className="bg-white rounded-xl border shadow-md p-4 mb-4">
              <h3 className="font-medium mb-2 text-sm md:text-base">
                Your Photos ({photos.filter((p) => p !== null).length}/{photoCount})
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {Array.from({ length: photoCount }).map((_, index) => (
                  <div key={index} className="aspect-square bg-gray-100 rounded overflow-hidden flex flex-col">
                    <div className="flex-1 relative">
                      {photos[index] ? (
                        <>
                          <Image width={600} height={600} src={photos[index] || '/placeholder.svg'} alt={`Photo ${index + 1}`} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 opacity-0 hover:opacity-100 bg-black/40 transition-opacity flex items-center justify-center">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="secondary" size="icon" className="h-8 w-8 transform transition-transform hover:scale-110 active:scale-95" onClick={() => setPreviewPhoto(photos[index] || null)}>
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-md">
                                <DialogHeader>
                                  <DialogTitle>Photo Preview</DialogTitle>
                                </DialogHeader>
                                {previewPhoto && (
                                  <div className="mt-4 rounded-lg overflow-hidden flex justify-center">
                                    <Image width={600} height={600} src={previewPhoto || '/placeholder.svg'} alt="Preview" className="max-w-full max-h-[70vh] object-contain" />
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>
                          </div>
                        </>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-xs text-gray-400">Photo {index + 1}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
