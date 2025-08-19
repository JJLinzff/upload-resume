document.addEventListener('DOMContentLoaded', function() {
  const uploadArea = document.getElementById('uploadArea');
  const fileInput = document.getElementById('fileInput');
  const fileInfo = document.getElementById('fileInfo');
  const fileName = document.getElementById('fileName');
  const fileSize = document.getElementById('fileSize');
  const removeBtn = document.getElementById('removeBtn');
  const finishBtn = document.getElementById('finishBtn');
  const lastStepBtn = document.getElementById('lastStepBtn');

  let selectedFile = null;

  // 点击上传区域触发文件选择
  uploadArea.addEventListener('click', function() {
    fileInput.click();
  });

  // 文件选择处理
  fileInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
      handleFileSelect(file);
    }
  });

  // 拖拽事件处理
  uploadArea.addEventListener('dragover', function(e) {
    e.preventDefault();
    uploadArea.classList.add('dragover');
  });

  uploadArea.addEventListener('dragleave', function(e) {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
  });

  uploadArea.addEventListener('drop', function(e) {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  });

  // 处理文件选择
  function handleFileSelect(file) {
    // 检查文件类型
    const allowedTypes = ['.pdf', '.doc', '.docx', '.txt'];
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    
    if (!allowedTypes.includes(fileExtension)) {
      alert('Unsupported file format! Please select a PDF, Word, or TXT file.');
      return;
    }

    // 检查文件大小（限制为10MB）
    if (file.size > 10 * 1024 * 1024) {
      alert('File size cannot exceed 10MB!');
      return;
    }

    selectedFile = file;
    displayFileInfo(file);
    finishBtn.disabled = false;
  }

  // 显示文件信息
  function displayFileInfo(file) {
    fileName.textContent = file.name;
    fileSize.textContent = formatFileSize(file.size);
    fileInfo.style.display = 'block';
    uploadArea.style.display = 'none';
  }

  // 格式化文件大小
  function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // 移除文件
  removeBtn.addEventListener('click', function() {
    selectedFile = null;
    fileInfo.style.display = 'none';
    uploadArea.style.display = 'block';
    finishBtn.disabled = true;
    fileInput.value = '';
  });

  // 完成上传
  finishBtn.addEventListener('click', function() {
    if (selectedFile) {
      // 这里可以添加实际的上传逻辑
      console.log('Uploading file:', selectedFile);
      alert('File uploaded successfully!');
      
      // 重置状态
      selectedFile = null;
      fileInfo.style.display = 'none';
      uploadArea.style.display = 'block';
      finishBtn.disabled = true;
      fileInput.value = '';
    }
  });

  // 上一步
  lastStepBtn.addEventListener('click', function() {
    // 这里可以添加返回上一步的逻辑
    console.log('Going to last step');
    // 可以添加页面跳转或状态重置逻辑
  });

  // 键盘快捷键支持
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !finishBtn.disabled) {
      finishBtn.click();
    } else if (e.key === 'Escape') {
      lastStepBtn.click();
    }
  });
});
