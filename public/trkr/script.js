// Global variables
let draggedElement = null;
let placeholder = null;
let taskIdCounter = 1;
let currentEditingTaskId = null;
let isViewMode = false;

// Initialize the board
document.addEventListener('DOMContentLoaded', function () {
  console.log('Board initialized');

  // Load tasks from localStorage or add sample tasks
  loadTasks();
});

// Save tasks to localStorage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll('.column').forEach((column) => {
    const columnId = column.getAttribute('data-column');
    column
      .querySelectorAll('.task-card:not(.placeholder)')
      .forEach((taskCard) => {
        const title = taskCard.querySelector('h4')?.textContent || '';
        const descElement = taskCard.querySelector('.task-desc');
        const description =
          descElement?.dataset.rawMarkdown || descElement?.textContent || '';
        const tagsContainer = taskCard.querySelector('.task-tags');
        const tags = tagsContainer
          ? [...tagsContainer.querySelectorAll('.tag')].map(
              (t) => t.textContent
            )
          : [];
        tasks.push({
          id: taskCard.id,
          title: title,
          description: description,
          tags: tags,
          columnId: columnId,
        });
      });
  });
  localStorage.setItem('boardTasks', JSON.stringify(tasks));
  console.log('Tasks saved to localStorage');
}

// Load tasks from localStorage
function loadTasks() {
  const savedTasks = localStorage.getItem('boardTasks');
  if (savedTasks) {
    try {
      const tasks = JSON.parse(savedTasks);
      tasks.forEach((task) => {
        addTaskToColumn(
          task.title,
          task.description,
          task.columnId,
          task.id,
          task.tags
        );
      });
      console.log('Tasks loaded from localStorage');
    } catch (e) {
      console.error('Error loading tasks:', e);
      addSampleTasks();
    }
  } else {
    addSampleTasks();
  }
}

// Add sample tasks for first-time users
function addSampleTasks() {
  addTaskToColumn(
    'Task 1: Review requirements',
    'Check the project specifications',
    'untouched',
    null,
    ['review']
  );
  addTaskToColumn(
    'Task 2: Fix bug',
    'Login issue needs fixing',
    'working',
    null,
    ['bug', 'urgent']
  );
  addTaskToColumn('Task 3: Deploy app', 'Production deployment', 'done', null, [
    'deploy',
  ]);
  saveTasks();
}

// Modal functions
function openModal() {
  console.log('Opening modal');
  currentEditingTaskId = null;
  isViewMode = false;
  document.getElementById('modalTitle').textContent = 'Create new task';
  document.getElementById('editBtn').style.display = 'none';
  document.getElementById('taskTitle').value = '';
  document.getElementById('taskDescription').value = '';
  document.getElementById('taskTags').value = '';
  document.getElementById('tagsPreview').innerHTML = '';
  document.getElementById('taskTitle').disabled = false;
  document.getElementById('taskDescription').disabled = false;
  document.getElementById('taskTags').disabled = false;
  document.getElementById('taskTags').style.display = 'block';
  document.getElementById('tagsPreview').style.display = 'none';
  document.querySelector('.modal-footer button').textContent = 'Create task';
  document.querySelector('.modal-footer button').onclick = createNewTask;
  document.getElementById('taskModal').classList.add('show');
  document.getElementById('taskTitle').focus();
}

function openTaskModal(taskId) {
  const taskCard = document.getElementById(taskId);
  if (!taskCard) return;

  currentEditingTaskId = taskId;
  isViewMode = true;

  const title = taskCard.querySelector('h4').textContent;
  const descElement = taskCard.querySelector('.task-desc');
  const description = descElement
    ? descElement.dataset.rawMarkdown || descElement.textContent
    : '';
  const tagsContainer = taskCard.querySelector('.task-tags');
  const tags = tagsContainer
    ? [...tagsContainer.querySelectorAll('.tag')].map((t) => t.textContent)
    : [];

  document.getElementById('modalTitle').textContent = title;
  document.getElementById('editBtn').style.display = 'inline';
  document.getElementById('taskTitle').value = title;
  document.getElementById('taskDescription').value = description;
  document.getElementById('taskTags').value = tags.join(', ');
  document.getElementById('taskTags').style.display = 'none';
  updateTagsPreview(tags);
  document.getElementById('tagsPreview').style.display = 'flex';
  document.getElementById('taskTitle').disabled = true;
  document.getElementById('taskDescription').disabled = true;
  document.querySelector('.modal-footer button').textContent = 'Close';
  document.querySelector('.modal-footer button').onclick = closeModal;
  document.getElementById('taskModal').classList.add('show');
}

function enableEditMode() {
  isViewMode = false;
  document.getElementById('modalTitle').textContent = 'Edit task';
  document.getElementById('editBtn').style.display = 'none';
  document.getElementById('taskTitle').disabled = false;
  document.getElementById('taskDescription').disabled = false;
  document.getElementById('taskTags').disabled = false;
  document.getElementById('taskTags').style.display = 'block';
  document.getElementById('tagsPreview').style.display = 'none';
  document.querySelector('.modal-footer button').textContent = 'Save changes';
  document.querySelector('.modal-footer button').onclick = saveTaskEdits;
  document.getElementById('taskTitle').focus();
}

function saveTaskEdits() {
  if (!currentEditingTaskId) return;

  const titleInput = document.getElementById('taskTitle');
  const descInput = document.getElementById('taskDescription');
  const tagsInput = document.getElementById('taskTags');

  const title = titleInput.value.trim();
  const description = descInput.value.trim();
  const tags = tagsInput.value
    .split(',')
    .map((t) => t.trim())
    .filter((t) => t);

  if (!title) {
    alert('Please enter a task title');
    return;
  }

  const taskCard = document.getElementById(currentEditingTaskId);
  if (taskCard) {
    taskCard.querySelector('h4').textContent = title;

    let descElement = taskCard.querySelector('.task-desc');
    if (description) {
      const parsedDesc = parseMarkdown(description);
      if (!descElement) {
        descElement = document.createElement('p');
        descElement.className = 'task-desc';
        taskCard.appendChild(descElement);
      }
      descElement.innerHTML = parsedDesc;
      descElement.dataset.rawMarkdown = description;
    } else if (descElement) {
      descElement.remove();
    }

    // Update tags
    let tagsContainer = taskCard.querySelector('.task-tags');
    if (tags.length > 0) {
      if (!tagsContainer) {
        tagsContainer = document.createElement('div');
        tagsContainer.className = 'task-tags';
        taskCard.appendChild(tagsContainer);
      }
      tagsContainer.innerHTML = tags
        .map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`)
        .join('');
    } else if (tagsContainer) {
      tagsContainer.remove();
    }

    saveTasks();
  }

  closeModal();
}

function closeModal() {
  console.log('Closing modal');
  document.getElementById('taskModal').classList.remove('show');
  currentEditingTaskId = null;
  isViewMode = false;
}

// Create new task
function createNewTask() {
  console.log('Creating new task');
  const titleInput = document.getElementById('taskTitle');
  const descInput = document.getElementById('taskDescription');
  const tagsInput = document.getElementById('taskTags');

  const title = titleInput.value.trim();
  const description = descInput.value.trim();
  const tags = tagsInput.value
    .split(',')
    .map((t) => t.trim())
    .filter((t) => t);

  if (!title) {
    alert('Please enter a task title');
    return;
  }

  addTaskToColumn(title, description, 'untouched', null, tags);
  saveTasks();
  closeModal();
}

// Update task counts
function updateTaskCounts() {
  document.querySelectorAll('.column').forEach((column) => {
    const count = column.querySelectorAll(
      '.task-card:not(.placeholder)'
    ).length;
    const countElement = column.querySelector('.count');
    if (countElement) {
      countElement.textContent = count;
    }
  });
}

// Add task card to column
function addTaskToColumn(
  title,
  description,
  columnId,
  existingId = null,
  tags = []
) {
  const columnContent = document.querySelector(
    `[data-column="${columnId}"] .column-content`
  );
  if (!columnContent) {
    console.error('Column not found:', columnId);
    return;
  }

  const taskId = existingId || 'task-' + Date.now() + '-' + taskIdCounter++;

  const taskCard = document.createElement('div');
  taskCard.className = 'task-card';
  taskCard.id = taskId;
  taskCard.draggable = true;

  const safeTitle = escapeHtml(title);
  const parsedDesc = description ? parseMarkdown(description) : '';
  const tagsHtml =
    tags.length > 0
      ? `<div class="task-tags">${tags.map((tag, i) => `<span class="tag" onclick="event.stopPropagation(); removeTaskTag('${taskId}', ${i})">${escapeHtml(tag)}</span>`).join('')}</div>`
      : '';

  taskCard.innerHTML = `
        <button class="delete-btn" onclick="event.stopPropagation(); deleteTaskCard('${taskId}')">×</button>
        <h4>${safeTitle}</h4>
        ${parsedDesc ? `<p class="task-desc" data-raw-markdown="${escapeHtml(description)}">${parsedDesc}</p>` : ''}
        ${tagsHtml}
    `;

  // Add click event to open modal
  taskCard.addEventListener('click', function (e) {
    if (!e.target.closest('.delete-btn') && !e.target.closest('.tag')) {
      openTaskModal(taskId);
    }
  });

  // Add drag event listeners
  taskCard.addEventListener('dragstart', handleDragStart);
  taskCard.addEventListener('dragend', handleDragEnd);

  columnContent.appendChild(taskCard);
  updateTaskCounts();
  console.log('Task added:', taskId, 'to column:', columnId);
}

// Delete task
function deleteTaskCard(taskId) {
  const taskCard = document.getElementById(taskId);
  if (taskCard) {
    taskCard.remove();
    updateTaskCounts();
    saveTasks();
    console.log('Task deleted:', taskId);
  }
}

// Remove a tag from a task card
function removeTaskTag(taskId, tagIndex) {
  const taskCard = document.getElementById(taskId);
  if (!taskCard) return;

  const tagsContainer = taskCard.querySelector('.task-tags');
  if (!tagsContainer) return;

  const tags = [...tagsContainer.querySelectorAll('.tag')];
  if (tags[tagIndex]) {
    tags[tagIndex].remove();

    // If no tags left, remove the container
    if (tagsContainer.querySelectorAll('.tag').length === 0) {
      tagsContainer.remove();
    }

    saveTasks();
  }
}

// Drag handlers
function handleDragStart(e) {
  console.log('Drag started');
  draggedElement = this;
  this.classList.add('dragging');

  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/plain', this.id);

  // Create placeholder
  placeholder = document.createElement('div');
  placeholder.className = 'task-card placeholder';
  placeholder.style.height = `${this.offsetHeight}px`;

  // Hide element after a brief delay to show it's being dragged
  setTimeout(() => {
    this.style.display = 'none';
  }, 0);
}

function handleDragEnd(e) {
  console.log('Drag ended');
  this.classList.remove('dragging');
  this.style.display = 'block';

  // Remove placeholder if it exists
  if (placeholder && placeholder.parentNode) {
    placeholder.parentNode.removeChild(placeholder);
  }

  // Clear drag-over styles from all columns
  document.querySelectorAll('.column-content').forEach((col) => {
    col.classList.remove('drag-over');
  });

  // Update counts in case of any changes
  updateTaskCounts();

  draggedElement = null;
  placeholder = null;
}

// Drop zone handlers
function allowDrop(e) {
  e.preventDefault();
}

function drop(e) {
  e.preventDefault();
  console.log('Drop event');

  const columnContent = e.currentTarget;
  columnContent.classList.remove('drag-over');

  if (!draggedElement) return;

  // Get drop position
  const afterElement = getDragAfterElement(columnContent, e.clientY);

  // Show the dragged element
  draggedElement.style.display = 'block';

  // Insert at the correct position
  if (afterElement == null) {
    columnContent.appendChild(draggedElement);
  } else {
    columnContent.insertBefore(draggedElement, afterElement);
  }

  // Remove placeholder
  if (placeholder && placeholder.parentNode) {
    placeholder.parentNode.removeChild(placeholder);
  }

  // Update counts after move
  updateTaskCounts();
  saveTasks();
}

// Calculate where to drop based on mouse position
function getDragAfterElement(container, y) {
  // Get all draggable elements except the one being dragged and the placeholder
  const draggableElements = [
    ...container.querySelectorAll('.task-card:not(.dragging)'),
  ].filter((el) => !el.classList.contains('placeholder'));

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;

      // We want the element where the mouse is above the center (negative offset)
      // and it's the closest one (largest offset that's still negative)
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}

// Add drag-over styling
function handleDragOver(e) {
  e.preventDefault();
  this.classList.add('drag-over');

  if (!draggedElement) return;

  const afterElement = getDragAfterElement(this, e.clientY);

  if (afterElement == null) {
    this.appendChild(placeholder);
  } else {
    this.insertBefore(placeholder, afterElement);
  }
}

function handleDragLeave(e) {
  this.classList.remove('drag-over');
}

// Update tags preview in modal
function updateTagsPreview(tags) {
  const previewContainer = document.getElementById('tagsPreview');
  if (!previewContainer) return;

  if (tags.length === 0) {
    previewContainer.innerHTML = '';
    return;
  }

  previewContainer.innerHTML = tags
    .map(
      (tag, index) =>
        `<span class="tag removable" onclick="removeTag(${index})">${escapeHtml(tag)}<span class="remove-x">×</span></span>`
    )
    .join('');
}

// Remove a tag from the preview
function removeTag(index) {
  const tagsInput = document.getElementById('taskTags');
  if (!tagsInput) return;

  let tags = tagsInput.value
    .split(',')
    .map((t) => t.trim())
    .filter((t) => t);
  tags.splice(index, 1);
  tagsInput.value = tags.join(', ');
  updateTagsPreview(tags);
}

// Attach event listeners to columns after DOM loads
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.column-content').forEach((column) => {
    column.addEventListener('dragover', handleDragOver);
    column.addEventListener('dragleave', handleDragLeave);
    column.addEventListener('drop', drop);
  });

  // Tags input listener for real-time preview
  const tagsInput = document.getElementById('taskTags');
  if (tagsInput) {
    tagsInput.addEventListener('input', function () {
      const tags = this.value
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t);
      updateTagsPreview(tags);
    });
  }
});

// Close modal when clicking outside
window.onclick = function (event) {
  const modal = document.getElementById('taskModal');
  if (event.target === modal) {
    closeModal();
  }
};

// Close modal on Escape key
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    closeModal();
  }
});

// Utility function
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Markdown parser using marked library
function parseMarkdown(text) {
  if (!text) return '';

  // Configure marked for full markdown support
  marked.setOptions({
    breaks: true,
    gfm: true,
  });

  return marked.parse(text);
}
