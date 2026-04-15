# cpp-hpp-generator

A simple Visual Studio Code extension that automatically generates matching `.hpp` and `.cpp` files with basic boilerplate code for C++ classes.

---

## ✨ Features

* Automatically creates a corresponding `.hpp` or `.cpp` file when one is created
* Generates basic C++ class boilerplate
* Includes:

  * Include guards
  * Canonical form (constructor, copy constructor, assignment operator, destructor)
* Fills empty files with template content

---

## 📦 How It Works

### When you create a `.hpp` file:

* If the file is empty → boilerplate class code is generated
* A matching `.cpp` file is automatically created

### When you create a `.cpp` file:

* If the file is empty → basic implementation is generated
* A matching `.hpp` file is automatically created

---

## 🧩 Generated Example

### `MyClass.hpp`

```cpp
#ifndef MYCLASS_HPP
#define MYCLASS_HPP

class MyClass
{
	private :

	public :
		MyClass(void);
		MyClass(const MyClass &other);
		MyClass &operator = (const MyClass &other);
		~MyClass(void);
};

#endif
```

### `MyClass.cpp`

```cpp
#include "MyClass.hpp"

MyClass::MyClass(void)
{
}

MyClass::MyClass(const MyClass &other)
{
}

MyClass &MyClass::operator = (const MyClass &other)
{
	return (*this);
}

MyClass::~MyClass(void)
{
}
```

---

## 🚀 Usage

1. Create a `.hpp` or `.cpp` file in your workspace
2. The extension will automatically:

   * Fill the file if it's empty
   * Generate the matching pair file

No commands needed — it works automatically in the background.

---

## 📌 Notes

* Existing files will NOT be overwritten
* Only empty files are populated with boilerplate code
* File names are used as class names

---

## 🛠️ Future Improvements

* Custom templates
