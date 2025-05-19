from PIL import Image, ImageDraw, ImageFont
import os
import random

def create_gradient_background(width, height, color1, color2):
    image = Image.new('RGB', (width, height))
    draw = ImageDraw.Draw(image)
    for y in range(height):
        r1, g1, b1 = color1
        r2, g2, b2 = color2
        r = r1 + (r2 - r1) * y // height
        g = g1 + (g2 - g1) * y // height
        b = b1 + (b2 - b1) * y // height
        draw.line([(0, y), (width, y)], fill=(r, g, b))
    return image

def create_bottle_image(width, height, text, filename):
    # Create gradient background
    image = create_gradient_background(width, height, (107, 91, 149), (70, 130, 180))
    draw = ImageDraw.Draw(image)
    
    # Draw bottle shape
    bottle_width = width // 3
    bottle_height = height // 2
    bottle_x = (width - bottle_width) // 2
    bottle_y = (height - bottle_height) // 2
    
    # Draw bottle outline
    draw.rectangle([bottle_x, bottle_y, bottle_x + bottle_width, bottle_y + bottle_height], 
                  outline=(255, 255, 255), width=3)
    
    # Draw bottle cap
    cap_width = bottle_width // 2
    cap_height = height // 8
    cap_x = bottle_x + (bottle_width - cap_width) // 2
    cap_y = bottle_y - cap_height
    draw.rectangle([cap_x, cap_y, cap_x + cap_width, cap_y + cap_height], 
                  fill=(255, 255, 255), outline=(255, 255, 255))
    
    # Add text
    try:
        font = ImageFont.truetype("arial.ttf", 40)
    except:
        font = ImageFont.load_default()
    
    text_width = draw.textlength(text, font=font)
    text_x = (width - text_width) // 2
    text_y = bottle_y + bottle_height + 20
    draw.text((text_x, text_y), text, fill=(255, 255, 255), font=font)
    
    # Save image
    image.save(f'images/{filename}')

def create_hero_background():
    image = create_gradient_background(1920, 1080, (107, 91, 149), (70, 130, 180))
    draw = ImageDraw.Draw(image)
    
    # Add water droplet effect
    for _ in range(50):
        x = random.randint(0, 1920)
        y = random.randint(0, 1080)
        size = random.randint(10, 30)
        draw.ellipse([x, y, x + size, y + size], 
                    fill=(255, 255, 255, 128), outline=(255, 255, 255))
    
    image.save('images/hero-bg.jpg')

def create_water_plant():
    image = create_gradient_background(800, 600, (107, 91, 149), (70, 130, 180))
    draw = ImageDraw.Draw(image)
    
    # Draw main building with more detail
    # Main structure
    draw.rectangle([200, 150, 600, 400], fill=(255, 255, 255), outline=(255, 255, 255))
    
    # Windows
    window_width = 40
    window_height = 60
    window_spacing = 60
    for i in range(3):
        x = 250 + (i * window_spacing)
        draw.rectangle([x, 200, x + window_width, 200 + window_height], 
                      fill=(200, 200, 255), outline=(255, 255, 255))
    
    # Door
    draw.rectangle([350, 300, 450, 400], fill=(200, 200, 255), outline=(255, 255, 255))
    
    # Water tanks with more detail
    # Left tank
    draw.ellipse([100, 250, 200, 400], fill=(255, 255, 255), outline=(255, 255, 255))
    draw.rectangle([120, 200, 180, 250], fill=(255, 255, 255), outline=(255, 255, 255))
    
    # Right tank
    draw.ellipse([600, 250, 700, 400], fill=(255, 255, 255), outline=(255, 255, 255))
    draw.rectangle([620, 200, 680, 250], fill=(255, 255, 255), outline=(255, 255, 255))
    
    # Pipes connecting tanks to building
    draw.line([(200, 325), (250, 325)], fill=(255, 255, 255), width=3)
    draw.line([(550, 325), (600, 325)], fill=(255, 255, 255), width=3)
    
    # Water treatment symbols
    # Filter symbol
    draw.rectangle([300, 100, 350, 150], fill=(255, 255, 255), outline=(255, 255, 255))
    draw.line([(325, 100), (325, 150)], fill=(200, 200, 255), width=2)
    draw.line([(300, 125), (350, 125)], fill=(200, 200, 255), width=2)
    
    # Add text with better styling
    try:
        font = ImageFont.truetype("arial.ttf", 40)
    except:
        font = ImageFont.load_default()
    
    text = "Bazeesh Water Treatment Plant"
    text_width = draw.textlength(text, font=font)
    text_x = (800 - text_width) // 2
    text_y = 450
    draw.text((text_x, text_y), text, fill=(255, 255, 255), font=font)
    
    # Add subtitle
    try:
        small_font = ImageFont.truetype("arial.ttf", 24)
    except:
        small_font = ImageFont.load_default()
    
    subtitle = "Pure Water, Pure Life"
    subtitle_width = draw.textlength(subtitle, font=small_font)
    subtitle_x = (800 - subtitle_width) // 2
    subtitle_y = 500
    draw.text((subtitle_x, subtitle_y), subtitle, fill=(255, 255, 255), font=small_font)
    
    image.save('images/water-plant.jpg')

# Create images directory if it doesn't exist
if not os.path.exists('images'):
    os.makedirs('images')

# Generate all images
create_bottle_image(600, 800, "500ml", "500ml.jpg")
create_bottle_image(600, 800, "1.5L", "1.5L.jpg")
create_bottle_image(600, 800, "19L", "19L.jpg")
create_water_plant()
create_hero_background()

print("All images have been generated successfully!") 