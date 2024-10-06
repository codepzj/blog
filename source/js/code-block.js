const openText = '<i class="fa-solid fa-angles-down fa-beat-fade"></i> 展开';
const closeText = '<i class="fa-solid fa-angles-up fa-beat-fade"></i> 收起';


const codeElements = document.querySelectorAll('td.code');

codeElements.forEach(async (code, index) => {
  const figure = code.closest('figure');
  const preCode = code.querySelector('pre').firstElementChild;
  const preGutter = code.parentElement.firstElementChild;
  let codeCopyOver = null

  preCode.id = `CodeBlock${index + 1}`;
  preCode.classList.add('code-collapsed');
  preGutter.classList.add('pre-gutter-collapsed');


  // Check code block height
  if (preCode.scrollHeight > 500) {
    preGutter.classList.add('pre-gutter-collapsed');

    const codeCopyDiv = document.createElement('div');
    codeCopyDiv.classList.add('CodeCloseDiv');
    figure.appendChild(codeCopyDiv);

    codeCopyOver = document.createElement('button');
    codeCopyOver.classList.add('CodeClose');
    codeCopyOver.innerHTML = openText;
    const description = figure.querySelector('figcaption') || figure.children[1];
    description.appendChild(codeCopyOver);

    codeCopyOver.addEventListener('click', () => {
      if (preCode.classList.contains('code-collapsed')) {
        preCode.classList.replace('code-collapsed', 'code-expanded');
        preGutter.classList.replace('pre-gutter-collapsed', 'pre-gutter-expanded');
        codeCopyOver.innerHTML = closeText;
      } else {
        preCode.classList.replace('code-expanded', 'code-collapsed');
        preGutter.classList.replace('pre-gutter-expanded', 'pre-gutter-collapsed');
        codeCopyOver.innerHTML = openText;
        figure.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
})

  

  
