'use client';

import { Button } from '@/components/ui/button';
import { getImages, saveImage } from '@/lib/storage/storage';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

const ExpensesScanPage = () => {
  const [images, setImages] = useState<string[]>([]);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const mediaStreamRef = useRef<MediaStream | null>();

  useEffect(() => {
    async function loadData() {
      const urls = await getImages();
      console.log(urls);

      setImages(urls);
    }

    loadData();
  }, [setImages]);

  const openCamera = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: 'environment' } })
      .then((stream) => {
        if (!videoRef?.current) return;

        mediaStreamRef.current = stream;
        videoRef.current.srcObject = stream;
      });
  };

  const captureImage = () => {
    const canvasElement = canvasRef.current!;
    const cameraElement = videoRef.current!;
    const imgElement = imageRef.current!;
    const context = canvasElement.getContext('2d')!;
    // Set canvas size to match the video feed
    canvasElement.width = cameraElement.videoWidth;
    canvasElement.height = cameraElement.videoHeight;

    // Draw the current frame from the video onto the canvas
    context.drawImage(
      cameraElement,
      0,
      0,
      canvasElement.width,
      canvasElement.height
    );

    // Convert the canvas content to a data URL (base64-encoded image)
    const imageData = canvasElement.toDataURL('image/png');

    // Display the captured image
    imgElement.src = imageData;
    imgElement.style.display = 'block';

    closeCamera();
  };

  const closeCamera = () => {
    mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
    mediaStreamRef.current = null;
    videoRef.current!.srcObject = null;
  };

  const downloadImage = () => {
    const a = document.createElement('a');
    a.href = imageRef.current!.src;
    a.download = 'myImage.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const captureMobileImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target?.files?.[0];
    if (file) {
      await saveImage(file);
      // Create a URL for the captured file and display it
      const imageURL = URL.createObjectURL(file);
      imageRef.current!.src = imageURL;
      imageRef.current!.style.display = 'block';
    }
  };

  console.log(images);

  return (
    <>
      <input
        type="file"
        id="cameraInput"
        accept="image/*"
        capture="environment"
        onChange={captureMobileImage}
      />
      <br />

      {/* <video id="camera" ref={videoRef} autoPlay playsInline></video> */}

      <div className="flex flex-col gap-2">
        <Button id="capture" onClick={openCamera}>
          Open Camera
        </Button>

        <Button id="capture" onClick={captureImage}>
          Capture Image
        </Button>

        <Button id="capture" onClick={closeCamera}>
          Close Camera
        </Button>

        <Button onClick={downloadImage}>Download Image</Button>
      </div>
      {/* <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
      <img
        ref={imageRef}
        id="capturedImage"
        alt="Captured Image"
        style={{ marginTop: '20px', border: '1px solid #ddd', display: 'none' }}
      /> */}

      {images.map((imageUrl) => (
        // <Image
        //   src={imageUrl}
        //   alt="image"
        //   key={imageUrl}
        //   width={80}
        //   height={80}
        // />

        <img
          src={imageUrl}
          key={imageUrl}
          width={80}
          height={80}
          alt={imageUrl}
          loading="lazy"
        />
      ))}
    </>
  );
};

export default ExpensesScanPage;
