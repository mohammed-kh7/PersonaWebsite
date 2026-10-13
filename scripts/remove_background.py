import os
from PIL import Image, ImageFilter
import numpy as np

def remove_blue_background():
    img_path = 'public/images/profile.jpg'
    img = Image.open(img_path).convert('RGBA')
    arr = np.array(img, dtype=np.float32)

    r = arr[:, :, 0]
    g = arr[:, :, 1]
    b = arr[:, :, 2]

    # Target background color is around (1, 80, 185)
    # The background is characterized by: high Blue, low Red, moderate Green, and B > G > R significantly.
    # In person:
    # Skin has R > G > B (Red is highest)
    # Hair has R, G, B all low, with B <= R
    # White shirt has R, G, B all high, close to each other (neutral or warm white)
    
    # Calculate blue dominance
    blue_excess = b - np.maximum(r, g)
    
    # Also euclidean distance to typical background color
    bg_ref = np.array([1.0, 80.0, 185.0])
    color_diff = np.sqrt((r - bg_ref[0])**2 + (g - bg_ref[1])**2 + (b - bg_ref[2])**2)
    
    # Blue background mask
    # Background has color_diff < 50 and blue_excess > 40
    # Let's create a smooth alpha mask
    # For pixels definitely background: alpha = 0
    # For pixels definitely foreground: alpha = 255
    # Smooth transition around edges for antialiasing
    
    # Strong bg criteria:
    is_bg = (b > 120) & (b > r * 2.2) & (b > g + 40) & (r < 55)
    
    # Distance to bg condition:
    is_bg = is_bg | ((color_diff < 45) & (b > r + 60))
    
    # Let's refine alpha:
    alpha = np.ones_like(b) * 255.0
    
    # Where is_bg is true, alpha is 0
    alpha[is_bg] = 0.0
    
    # Find transition pixels for soft edge (anti-aliasing)
    # Transition where blue excess is between 20 and 50 and r < 80
    transition = (~is_bg) & (b > r + 30) & (b > g + 15) & (r < 90)
    # Map transition linearly
    t_factor = np.clip((b[transition] - (r[transition] + 30)) / 50.0, 0, 1)
    alpha[transition] = 255.0 * (1.0 - t_factor * 0.9)

    # Clean spill: on foreground pixels near edges, blue reflection can tint hair or shirt
    # De-spill: if b > (r + g)/2 on semi-transparent or edge pixels, reduce blue to average of r & g
    spill = (b > np.maximum(r, g)) & (alpha > 0)
    arr[spill, 2] = np.maximum(arr[spill, 0], arr[spill, 1])

    # Convert alpha to PIL Image and smooth slightly with a small Gaussian blur to avoid jagged pixel edges
    alpha_img = Image.fromarray(alpha.astype(np.uint8))
    # Slight edge feather
    alpha_img = alpha_img.filter(ImageFilter.GaussianBlur(radius=0.7))
    
    # Set alpha back
    arr[:, :, 3] = np.array(alpha_img)
    
    result = Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8), mode='RGBA')
    
    # Save transparent PNG
    result.save('public/images/profile-transparent.png', 'PNG')
    # Save transparent WebP (lossless or high quality with alpha)
    result.save('public/images/profile-transparent.webp', 'WEBP', quality=95, method=6)
    
    print('Saved public/images/profile-transparent.png and profile-transparent.webp')
    print('PNG size:', os.path.getsize('public/images/profile-transparent.png'))
    print('WebP size:', os.path.getsize('public/images/profile-transparent.webp'))

if __name__ == '__main__':
    remove_blue_background()
