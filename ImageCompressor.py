import os
from PIL import Image

def resize_and_convert_images(input_dir, output_dir):
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    for filename in os.listdir(input_dir):
        if filename.lower().endswith('.jpg'):
            img_path = os.path.join(input_dir, filename)
            img = Image.open(img_path)
            
            # Resize image by 50%
            img = img.resize((img.width // 2, img.height // 2), Image.ANTIALIAS)
            
            # Convert to WebP format
            output_path = os.path.join(output_dir, os.path.splitext(filename)[0] + '.webp')
            img.save(output_path, 'webp')
            print(f"Processed {filename} -> {output_path}")
            
            # Delete the original JPG file
            os.remove(img_path)
            print(f"Deleted original file {filename}")

input_directory = 'public\images'
output_directory = 'public\images'

resize_and_convert_images(input_directory, output_directory)