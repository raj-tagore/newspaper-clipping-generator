document.getElementById('newspaperForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const title = document.getElementById('articleTitle').value;
    const content = document.getElementById('articleContent').value;
    const imageFile = document.getElementById('articleImage').files[0];
    const layoutStyle = document.getElementById('layoutStyle').value;
    
    // Create the newspaper preview
    const previewArea = document.getElementById('previewArea');
    const newspaperDiv = document.createElement('div');
    newspaperDiv.className = `newspaper-clip ${layoutStyle}`;
    
    // Add title
    const titleDiv = document.createElement('div');
    titleDiv.className = 'newspaper-title';
    titleDiv.textContent = title;
    newspaperDiv.appendChild(titleDiv);
    
    // Add image if provided
    if (imageFile) {
        const img = document.createElement('img');
        img.className = 'newspaper-image';
        img.src = URL.createObjectURL(imageFile);
        newspaperDiv.appendChild(img);
    }
    
    // Add content
    const contentDiv = document.createElement('div');
    contentDiv.className = 'newspaper-content';
    contentDiv.textContent = content;
    newspaperDiv.appendChild(contentDiv);
    
    // Clear previous preview and add new one
    previewArea.innerHTML = '';
    previewArea.appendChild(newspaperDiv);
    
    // Add download button
    const downloadBtn = document.createElement('button');
    downloadBtn.className = 'btn btn-success mt-3';
    downloadBtn.textContent = 'Download as Image';
    downloadBtn.onclick = async function() {
        const canvas = await html2canvas(newspaperDiv);
        const link = document.createElement('a');
        link.download = 'newspaper-clip.jpg';
        link.href = canvas.toDataURL('image/jpeg', 0.9);
        link.click();
    };
    previewArea.appendChild(downloadBtn);
});
