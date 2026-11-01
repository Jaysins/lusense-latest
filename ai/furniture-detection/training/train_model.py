from ultralytics import YOLO

# Load a pretrained YOLOv8 model
model = YOLO('yolov8n.pt')  # 'n' for nano (fastest for initial testing)

# Train the model using your downloaded dataset configuration
results = model.train(
    data='dataset-v2/data.yaml',
    epochs=50,
    imgsz=640,
    batch=16,
    project='models',
    name='furniture_yolov8_v2',
    exist_ok=True  # Overwrites 'furniture_yolov8_v2' instead of creating '-2'
)