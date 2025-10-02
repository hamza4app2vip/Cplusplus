// متغيرات عامة
let linkedList = [];
let listSize = 0;
let maxId = 0;

// عناصر DOM
const listContainer = document.getElementById('list-container');
const listInfo = document.getElementById('list-info');
const addBtn = document.getElementById('add-btn');
const removeBtn = document.getElementById('remove-btn');
const clearBtn = document.getElementById('clear-btn');
const tabButtons = document.querySelectorAll('.tab-btn');
const codeBlocks = document.querySelectorAll('.code-block');

// إضافة مستمعي الأحداث
addBtn.addEventListener('click', addItem);
removeBtn.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearList);

// إضافة مستمعي الأحداث لأزرار التبويب
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tabId = button.getAttribute('data-tab');

        // تحديث حالة أزرار التبويب
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // تحديث محتوى الكود
        codeBlocks.forEach(block => {
            if (block.id === tabId) {
                block.classList.add('active');
            } else {
                block.classList.remove('active');
            }
        });
    });
});

// دالة لإضافة عنصر جديد
function addItem() {
    const value = prompt('أدخل قيمة العنصر الجديد:');
    if (value === null || value.trim() === '') {
        showAlert('الرجاء إدخال قيمة صحيحة', 'error');
        return;
    }

    // إضافة العنصر إلى مصفوفة القائمة المرتبطة
    linkedList.push({
        id: ++maxId,
        value: value
    });

    listSize++;
    updateVisualization();
    updateInfo();
    showAlert(`تمت إضافة العنصر "${value}" بنجاح`, 'success');

    // إضافة تأثير حركي
    animateElement('.list-item:last-child');
}

// دالة لحذف عنصر
function removeItem() {
    if (listSize === 0) {
        showAlert('القائمة فارغة، لا يمكن حذف أي عنصر', 'error');
        return;
    }

    const index = prompt(`أدخل موضع العنصر الذي تريد حذفه (0 إلى ${listSize - 1}):`);

    if (index === null) return;

    const idx = parseInt(index);

    if (isNaN(idx) || idx < 0 || idx >= listSize) {
        showAlert('الموضع غير صحيح', 'error');
        return;
    }

    const removedItem = linkedList.splice(idx, 1)[0];
    listSize--;
    updateVisualization();
    updateInfo();
    showAlert(`تم حذف العنصر "${removedItem.value}" بنجاح`, 'success');
}

// دالة لمسح القائمة
function clearList() {
    if (listSize === 0) {
        showAlert('القائمة بالفارغة', 'error');
        return;
    }

    if (confirm('هل أنت متأكد من أنك تريد مسح القائمة بالكامل؟')) {
        linkedList = [];
        listSize = 0;
        maxId = 0;
        updateVisualization();
        updateInfo();
        showAlert('تم مسح القائمة بنجاح', 'success');
    }
}

// دالة لتحديث التصور المرئي للقائمة
function updateVisualization() {
    listContainer.innerHTML = '';

    if (listSize === 0) {
        listContainer.innerHTML = '<p class="empty-message">القائمة فارغة</p>';
        return;
    }

    // إضافة العقدة الأولى
    let firstItem = createNode(linkedList[0].value, 0, true);
    listContainer.appendChild(firstItem);

    // إضافة المؤشر والعقد المتبقية
    for (let i = 0; i < listSize - 1; i++) {
        let pointer = document.createElement('div');
        pointer.className = 'pointer';
        pointer.innerHTML = '→';
        listContainer.appendChild(pointer);

        let node = createNode(linkedList[i + 1].value, i + 1, false);
        listContainer.appendChild(node);
    }

    // إضافة مؤشر NULL في النهاية
    let nullIndicator = document.createElement('div');
    nullIndicator.className = 'null-indicator';
    nullIndicator.innerHTML = 'NULL';
    listContainer.appendChild(nullIndicator);
}

// دالة لإنشاء عقدة
function createNode(value, index, isFirst) {
    const node = document.createElement('div');
    node.className = 'list-item';
    node.textContent = value;

    // إضافة ترقيم للعنصر
    const indexBadge = document.createElement('div');
    indexBadge.className = 'index-badge';
    indexBadge.textContent = index;
    node.appendChild(indexBadge);

    // إضافة مؤشر البداية إذا كانت العقدة الأولى
    if (isFirst) {
        const startIndicator = document.createElement('div');
        startIndicator.className = 'start-indicator';
        startIndicator.textContent = 'البداية';
        node.appendChild(startIndicator);
    }

    // إضافة مؤشر النهاية إذا كانت العقدة الأخيرة
    if (index === listSize - 1) {
        const endIndicator = document.createElement('div');
        endIndicator.className = 'end-indicator';
        endIndicator.textContent = 'النهاية';
        node.appendChild(endIndicator);
    }

    // إضافة مؤشر الاتجاه (سهم يشير للعقدة التالية)
    if (index < listSize - 1) {
        const directionArrow = document.createElement('div');
        directionArrow.className = 'direction-arrow';
        directionArrow.innerHTML = '→';
        node.appendChild(directionArrow);
    }

    // إضافة تأثير عند النقر على العقدة
    node.addEventListener('click', () => {
        showNodeDetails(value, index);
    });

    return node;
}

// دالة لعرض تفاصيل العقدة
function showNodeDetails(value, index) {
    // تحديد معلومات العقدة التالية والسابقة
    let nextValue = "NULL";
    let prevValue = "NULL";

    if (index < listSize - 1) {
        nextValue = linkedList[index + 1].value;
    }

    if (index > 0) {
        prevValue = linkedList[index - 1].value;
    }

    const details = `
        <div class="node-details">
            <h3>تفاصيل العقدة</h3>
            <div class="detail-item">
                <span class="detail-label">الموقع:</span>
                <span class="detail-value">${index}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">القيمة:</span>
                <span class="detail-value">${value}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">العقدة السابقة:</span>
                <span class="detail-value">${prevValue}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">العقدة التالية:</span>
                <span class="detail-value">${nextValue}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">نوع القائمة:</span>
                <span class="detail-value">قائمة مرتبطة بسيطة</span>
            </div>
            <button class="close-details">إغلاق</button>
        </div>
    `;

    // إنشاء نافذة منبثقة
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = details;

    // إغلاق النافذة
    modal.querySelector('.close-details').addEventListener('click', () => {
        modal.remove();
    });

    // إضافة النافذة إلى الصفحة
    document.body.appendChild(modal);
}

// دالة لتحديث معلومات القائمة
function updateInfo() {
    if (listSize === 0) {
        listInfo.innerHTML = `
            <div class="info-item">
                <i class="fas fa-info-circle"></i>
                <div class="info-content">
                    <h3>حالة القائمة</h3>
                    <p>القائمة فارغة</p>
                </div>
            </div>
            <div class="info-item">
                <i class="fas fa-chart-bar"></i>
                <div class="info-content">
                    <h3>إحصائيات</h3>
                    <p>عدد العناصر: 0</p>
                </div>
            </div>
        `;
    } else {
        const elementsList = linkedList.map((item, index) => {
            return `<span class="element-tag">${index}: ${item.value}</span>`;
        }).join('');

        listInfo.innerHTML = `
            <div class="info-item">
                <i class="fas fa-info-circle"></i>
                <div class="info-content">
                    <h3>حالة القائمة</h3>
                    <p>القائمة تحتوي على ${listSize} عنصر</p>
                </div>
            </div>
            <div class="info-item">
                <i class="fas fa-list"></i>
                <div class="info-content">
                    <h3>العناصر</h3>
                    <div class="elements-list">${elementsList}</div>
                </div>
            </div>
            <div class="info-item">
                <i class="fas fa-chart-bar"></i>
                <div class="info-content">
                    <h3>إحصائيات</h3>
                    <p>الحجم الإجمالي: ${listSize} عناصر</p>
                    <p>استهلاك الذاكرة: ${listSize * 16} بايت (تقديري)</p>
                </div>
            </div>
        `;
    }
}

// دالة لإظهار رسائل تنبيه
function showAlert(message, type) {
    // إزالة أي تنبيهات موجودة
    const existingAlert = document.querySelector('.alert');
    if (existingAlert) {
        existingAlert.remove();
    }

    const alert = document.createElement('div');
    alert.className = `alert ${type}`;
    alert.innerHTML = `
        <div class="alert-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <p>${message}</p>
        </div>
        <button class="close-alert"><i class="fas fa-times"></i></button>
    `;
    alert.style.display = 'block';

    // إغلاق التنبيه
    alert.querySelector('.close-alert').addEventListener('click', () => {
        alert.style.display = 'none';
    });

    document.querySelector('.container').insertBefore(alert, document.querySelector('.visualization-section'));

    // إخفاء الرسالة بعد 4 ثوانٍ
    setTimeout(() => {
        alert.style.display = 'none';
    }, 4000);
}

// دالة لإضافة تأثير حركي
function animateElement(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.style.transform = 'scale(0)';
        element.style.opacity = '0';

        setTimeout(() => {
            element.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            element.style.transform = 'scale(1)';
            element.style.opacity = '1';
        }, 10);
    }
}

// تحديث التصور عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    updateVisualization();
    updateInfo();

    // إضافة تأثيرات دخول للعناصر
    const sections = document.querySelectorAll('.visualization-section, .controls-section, .info-section, .theory-section, .code-section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';

        setTimeout(() => {
            section.style.transition = 'all 0.6s ease';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, 200 * index);
    });

    // التحقق من حجم الشاشة وتطبيق وضع الهاتف إذا لزم الأمر
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    // تنسيق الأكواد البرمجية
    formatCodeBlocks();
});

// دالة لتنسيق الأكواد البرمجية
function formatCodeBlocks() {
    const codeBlocks = document.querySelectorAll('.code-block');

    codeBlocks.forEach(block => {
        const code = block.querySelector('code') || block.querySelector('pre');
        if (!code) return;

        let content = code.textContent;

        // إضافة ألوان للكلمات المفتاحية
        const keywords = ['struct', 'class', 'public', 'private', 'void', 'int', 'bool', 'Node', 'LinkedList', 'return', 'delete', 'new', 'if', 'else', 'for', 'while', 'do'];
        keywords.forEach(keyword => {
            const regex = new RegExp(`\b${keyword}\b`, 'g');
            content = content.replace(regex, `<span class="keyword">${keyword}</span>`);
        });

        // إضافة ألوان للسلاسل النصية
        content = content.replace(/"[^"]*"/g, '<span class="string">$&</span>');

        // إضافة ألوان للتعليقات
        content = content.replace(/\/\/.*$/gm, '<span class="comment">$&</span>');
        content = content.replace(/\/\*[\s\S]*?\*\//g, '<span class="comment">$&</span>');

        // إضافة ألوان لأسماء الدوال
        content = content.replace(/([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g, '<span class="function">$1</span>(');

        // تحديث المحتوى
        code.innerHTML = content;
    });
}

// دالة للتحقق من حجم الشاشة وتطبيق وضع الهاتف
function checkScreenSize() {
    const isPhone = window.innerWidth <= 480;
    const phoneContainer = document.querySelector('.phone-container');

    if (isPhone && phoneContainer) {
        // تطبيق وضع الهاتف
        document.body.style.background = 'transparent';
        document.querySelector('.container').style.maxWidth = '100%';
        document.querySelector('.container').style.padding = '0';
        document.querySelector('.container').style.margin = '0';
        document.querySelector('.container').style.borderRadius = '0';
        document.querySelector('.container').style.boxShadow = 'none';

        // تعديل حجم الخط للشاشات الصغيرة
        if (window.innerWidth <= 360) {
            document.body.style.fontSize = '14px';
        }
    } else if (!isPhone && phoneContainer) {
        // العودة للوضع العادي
        document.body.style.background = 'linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)';
        document.querySelector('.container').style.maxWidth = '1200px';
        document.querySelector('.container').style.padding = '30px 20px';
        document.querySelector('.container').style.margin = '0 auto';
        document.querySelector('.container').style.borderRadius = '0';
        document.querySelector('.container').style.boxShadow = 'none';

        // استعادة حجم الخط
        document.body.style.fontSize = '';
    }
}