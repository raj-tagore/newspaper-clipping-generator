document.getElementById('newspaperForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const title = document.getElementById('articleTitle').value;
    const content = document.getElementById('articleContent').value;
    const imageFile = document.getElementById('articleImage').files[0];
    
    // Create canvas
    const canvas = document.getElementById('newspaperCanvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = 800;
    canvas.height = 1000;
    
    // Draw background keep it white
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw title with wrapping
    ctx.font = 'bold 32px "Times New Roman"';
    ctx.fillStyle = '#000';
    ctx.textAlign = 'center';
    const titleWords = title.split(' ');
    let titleLine = '';
    let titleY = 50;
    const titleMaxWidth = 700;
    const titleLineHeight = 40;

    for (let word of titleWords) {
        const testLine = titleLine + word + ' ';
        const metrics = ctx.measureText(testLine);
        
        if (metrics.width > titleMaxWidth) {
            ctx.fillText(titleLine, canvas.width / 2, titleY);
            titleLine = word + ' ';
            titleY += titleLineHeight;
        } else {
            titleLine = testLine;
        }
    }
    ctx.fillText(titleLine, canvas.width / 2, titleY);
    
    // Draw content (adjust starting Y position based on title height)
    ctx.font = '16px "Hind"';
    ctx.textAlign = 'left';
    const words = content.split(' ');
    let line = '';
    let y = titleY + 50; // Increased spacing after title
    const maxWidth = 700;
    const lineHeight = 20;
    
    for (let word of words) {
        const testLine = line + word + ' ';
        const metrics = ctx.measureText(testLine);
        
        if (metrics.width > maxWidth) {
            ctx.fillText(line, 50, y);
            line = word + ' ';
            y += lineHeight;
        } else {
            line = testLine;
        }
    }
    ctx.fillText(line, 50, y);
    
    // If there's an image, draw it
    if (imageFile) {
        const img = new Image();
        img.onload = function() {
            // Calculate scaled dimensions while maintaining aspect ratio
            const maxImgWidth = 400;
            const maxImgHeight = 300;
            let imgWidth = img.width;
            let imgHeight = img.height;
            
            if (imgWidth > maxImgWidth) {
                imgHeight = (maxImgWidth * imgHeight) / imgWidth;
                imgWidth = maxImgWidth;
            }
            if (imgHeight > maxImgHeight) {
                imgWidth = (maxImgHeight * imgWidth) / imgHeight;
                imgHeight = maxImgHeight;
            }
            
            // Draw image centered below text
            const imgX = (canvas.width - imgWidth) / 2;
            ctx.drawImage(img, imgX, y + 30, imgWidth, imgHeight);
            
            // Display the result
            displayResult();
        };
        img.src = URL.createObjectURL(imageFile);
    } else {
        displayResult();
    }
});

function displayResult() {
    const canvas = document.getElementById('newspaperCanvas');
    const previewArea = document.getElementById('previewArea');
    
    // Create preview image
    const img = document.createElement('img');
    img.src = canvas.toDataURL('image/jpeg');
    img.className = 'img-fluid';
    
    // Create download button
    const downloadBtn = document.createElement('a');
    downloadBtn.href = canvas.toDataURL('image/jpeg');
    downloadBtn.download = 'newspaper-clip.jpg';
    downloadBtn.className = 'btn btn-success mt-3 d-block';
    downloadBtn.textContent = 'Download Newspaper Clip';
    
    // Clear previous preview and add new elements
    previewArea.innerHTML = '';
    previewArea.appendChild(img);
    previewArea.appendChild(downloadBtn);
}
