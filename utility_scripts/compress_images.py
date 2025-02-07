import os
from PIL import Image
import sys
from pathlib import Path

def compress_images(input_dir, output_dir=None, max_size=1080, quality=75):
    """
    Compress and resize images in the input directory and its subdirectories.
    max_size: maximum width or height
    quality: compression quality (1-100)
    """
    if output_dir is None:
        output_dir = input_dir

    Path(output_dir).mkdir(parents=True, exist_ok=True)
    formats = ('.jpg', '.jpeg')
    
    # Traverse subdirectories using os.walk
    for root, _, files in os.walk(input_dir):
        for filename in files:
            if filename.lower().endswith(formats):
                input_path = os.path.join(root, filename)
                # Compute relative path from input_dir and replicate structure in output_dir
                rel_dir = os.path.relpath(root, input_dir)
                target_dir = os.path.join(output_dir, rel_dir)
                Path(target_dir).mkdir(parents=True, exist_ok=True)
                output_path = os.path.join(target_dir, os.path.splitext(filename)[0] + '.webp')
                try:
                    with Image.open(input_path) as img:
                        if img.mode in ('RGBA', 'P'):
                            img = img.convert('RGB')
                        ratio = min(max_size/max(img.size[0], img.size[1]), 1.0)
                        new_size = tuple(int(dim * ratio) for dim in img.size)
                        if ratio < 1.0:
                            img = img.resize(new_size, Image.Resampling.LANCZOS)
                        img.save(output_path, 'WEBP', quality=quality, optimize=True)
                        original_size = os.path.getsize(input_path)
                        compressed_size = os.path.getsize(output_path)
                        savings = (original_size - compressed_size) / original_size * 100
                        print(f"Processed {input_path}:")
                        print(f"Original size: {original_size/1024:.1f}KB")
                        print(f"Compressed size: {compressed_size/1024:.1f}KB")
                        print(f"Savings: {savings:.1f}%\n")
                except Exception as e:
                    print(f"Error processing {input_path}: {str(e)}")

if __name__ == "__main__":
    # Get the absolute path to the src/images directory
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(script_dir)
    input_dir = os.path.join(project_root, 'src', 'images')
    if not os.path.exists(input_dir):
        print(f"Error: Input directory not found: {input_dir}")
        sys.exit(1)
    compress_images(input_dir)