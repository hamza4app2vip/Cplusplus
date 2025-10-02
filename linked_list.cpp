// مشروع بسيط لتنفيذ بنية بيانات القائمة المرتبطة بلغة C++
// هذا الكود يوضح كيفية إنشاء قائمة مرتبطة وإضافة وحذف العناصر منها

#include <iostream>
using namespace std;

// تعريف عقدة القائمة المرتبطة
struct Node {
    int data;       // بيانات العقدة
    Node* next;     // مؤشر إلى العقدة التالية

    // دالة البناء لتهيئة العقدة
    Node(int val) {
        data = val;
        next = nullptr;
    }
};

// تعريف فئة القائمة المرتبطة
class LinkedList {
private:
    Node* head;     // مؤشر إلى رأس القائمة
    int size;       // حجم القائمة

public:
    // دالة البناء لتهيئة القائمة فارغة
    LinkedList() {
        head = nullptr;
        size = 0;
    }

    // دالة المدمر لإعادة الذاكرة
    ~LinkedList() {
        clear();
    }

    // دالة لإضافة عنصر في بداية القائمة
    void addFirst(int value) {
        Node* newNode = new Node(value);
        newNode->next = head;
        head = newNode;
        size++;
    }

    // دالة لإضافة عنصر في نهاية القائمة
    void addLast(int value) {
        Node* newNode = new Node(value);

        // إذا كانت القائمة فارغة
        if (head == nullptr) {
            head = newNode;
        } else {
            // الانتقال إلى آخر عقدة
            Node* current = head;
            while (current->next != nullptr) {
                current = current->next;
            }
            current->next = newNode;
        }
        size++;
    }

    // دالة لإضافة عنصر في موقع محدد
    bool addAt(int index, int value) {
        // التحقق من صحة الموقع
        if (index < 0 || index > size) {
            return false;
        }

        // إذا كان الموقع هو 0، أضيف في البداية
        if (index == 0) {
            addFirst(value);
            return true;
        }

        // إنشاء العقدة الجديدة
        Node* newNode = new Node(value);

        // الانتقال إلى العقدة قبل الموقع المطلوب
        Node* current = head;
        for (int i = 0; i < index - 1; i++) {
            current = current->next;
        }

        // ربط العقدة الجديدة
        newNode->next = current->next;
        current->next = newNode;
        size++;

        return true;
    }

    // دالة لحذف أول عنصر
    bool removeFirst() {
        if (head == nullptr) {
            return false; // القائمة فارغة
        }

        Node* temp = head;
        head = head->next;
        delete temp;
        size--;
        return true;
    }

    // دالة لحذف آخر عنصر
    bool removeLast() {
        if (head == nullptr) {
            return false; // القائمة فارغة
        }

        // إذا كانت القائمة تحتوي على عنصر واحد فقط
        if (head->next == nullptr) {
            delete head;
            head = nullptr;
        } else {
            // الانتقال إلى العقدة قبل الأخيرة
            Node* current = head;
            while (current->next->next != nullptr) {
                current = current->next;
            }

            // حذف العقدة الأخيرة
            delete current->next;
            current->next = nullptr;
        }
        size--;
        return true;
    }

    // دالة لحذف عنصر من موقع محدد
    bool removeAt(int index) {
        // التحقق من صحة الموقع
        if (index < 0 || index >= size) {
            return false;
        }

        // إذا كان الموقع هو 0، احذف من البداية
        if (index == 0) {
            return removeFirst();
        }

        // الانتقال إلى العقدة قبل الموقع المطلوب
        Node* current = head;
        for (int i = 0; i < index - 1; i++) {
            current = current->next;
        }

        // تخزين العقدة التي سيتم حذفها
        Node* temp = current->next;

        // تجاوز العقدة المراد حذفها
        current->next = temp->next;

        // حذف العقدة
        delete temp;
        size--;

        return true;
    }

    // دالة للحصول على قيمة عنصر من موقع محدد
    int getAt(int index) {
        // التحقق من صحة الموقع
        if (index < 0 || index >= size) {
            return -1; // قيمة غير صالحة
        }

        Node* current = head;
        for (int i = 0; i < index; i++) {
            current = current->next;
        }

        return current->data;
    }

    // دالة لعرض محتويات القائمة
    void display() {
        Node* current = head;
        cout << "القائمة المرتبكة الحالية: ";

        while (current != nullptr) {
            cout << current->data << " ";
            current = current->next;
        }

        cout << endl;
    }

    // دالة لتحديد حجم القائمة
    int getSize() {
        return size;
    }

    // دالة لفحص إذا كانت القائمة فارغة
    bool isEmpty() {
        return size == 0;
    }

    // دالة لمسح القائمة بالكامل
    void clear() {
        while (head != nullptr) {
            Node* temp = head;
            head = head->next;
            delete temp;
        }
        size = 0;
    }
};

// دالة رئيسية لاختبار القائمة المرتبطة
int main() {
    // إنشاء قائمة مرتبطة جديدة
    LinkedList list;

    // إضافة عناصر
    list.addFirst(10);
    list.addLast(20);
    list.addLast(30);
    list.addAt(1, 15);

    cout << "بعد إضافة العناصر:" << endl;
    list.display(); // القائمة: 10 15 20 30
    cout << "حجم القائمة: " << list.getSize() << endl << endl;

    // حذف عناصر
    list.removeFirst();
    list.removeAt(2);

    cout << "بعد حذف العناصر:" << endl;
    list.display(); // القائمة: 15 20
    cout << "حجم القائمة: " << list.getSize() << endl << endl;

    // الحصول على عنصر
    cout << "العنصر في الموقع 1: " << list.getAt(1) << endl; // 20

    // مسح القائمة
    list.clear();
    cout << "بعد مسح القائمة:" << endl;
    list.display(); // القائمة: (فارغة)
    cout << "هل القائمة فارغة؟ " << (list.isEmpty() ? "نعم" : "لا") << endl;

    return 0;
}