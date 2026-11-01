
from ultralytics import YOLO

# Load your trained model
model = YOLO("models/furniture_v2_best.pt")

# Run prediction and save annotated images
# "Here are my test images. Look at them and tell me what furniture you see."
results = model(
    "test-images/",
    save=True,
    project="runs/detect",
    name="predict"
)

# Print the detections
# This first for loop says: "Take one result out at a time."
for result in results:
    # gives you the path to that image.
    print(f"\nImage: {result.path}")

    # The second loop goes through objects detected inside that image.
    for box in result.boxes:
        # "What class did YOLO think this object is?"
        class_id = int(box.cls[0])
        # "How confident is YOLO about this detection?"
        confidence = float(box.conf[0])
        # "Where exactly is this object in the image?"
        coordinates = box.xyxy[0].tolist()
        # converts something like: class_id = 2 into something like: class_name = "chair"

        class_name = model.names[class_id]

        print(f"Object: {class_name}")
        print(f"Confidence: {confidence:.2f}")
        print(f"Box: {coordinates}")
        print("---")

print("\nDone!")
print("Check: runs/detect/predict/")
