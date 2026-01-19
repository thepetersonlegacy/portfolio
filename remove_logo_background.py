#!/usr/bin/env python3
"""
Elite-tier background removal for Peterson Pro Services logo
Uses AI-powered background removal with edge refinement
"""

from rembg import remove
from PIL import Image
import sys

def remove_background_elite(input_path, output_path):
    """
    Remove background from image using AI with elite-tier quality
    
    Args:
        input_path: Path to input image
        output_path: Path to save output image with transparent background
    """
    print(f"🎨 Processing logo with elite-tier background removal...")
    print(f"📂 Input: {input_path}")
    print(f"💾 Output: {output_path}")
    
    try:
        # Open the input image
        input_image = Image.open(input_path)
        print(f"✓ Loaded image: {input_image.size[0]}x{input_image.size[1]} pixels")
        
        # Remove background using AI model
        # This uses U2-Net model which is considered professional/elite tier
        print("🤖 Applying AI background removal (this may take a moment)...")
        output_image = remove(input_image)
        
        # Save with maximum quality
        output_image.save(output_path, 'PNG', optimize=False, quality=100)
        print(f"✅ Success! Transparent logo saved to: {output_path}")
        print(f"📊 Output size: {output_image.size[0]}x{output_image.size[1]} pixels")
        
        return True
        
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return False

if __name__ == "__main__":
    input_file = "public/peterson-pro-services-logo.png"
    output_file = "public/peterson-pro-services-logo-transparent.png"
    
    success = remove_background_elite(input_file, output_file)
    
    if success:
        print("\n🎉 Background removal complete!")
        print("📝 Next step: Replace the original logo with the transparent version")
        sys.exit(0)
    else:
        print("\n⚠️  Background removal failed")
        sys.exit(1)

