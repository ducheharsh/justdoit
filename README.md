# JustDoIt

JustDoIt is a project aimed at helping you manage tasks efficiently and effectively. This project allows you to create, edit, delete, and organize your tasks to improve productivity.
<p align="center">
  <img width="full" height="300" src="https://github.com/user-attachments/assets/5e145213-9d4d-4ba9-bd36-782081232137">
</p>

## Features

- **Task Management:** Create, update, and delete tasks.
- **Task Organization:** Organize tasks based on priority, categories like Work and Lifestyle.
- **User Authentication:** Secure user login and registration.
- **Notifications:** Get notifications for upcoming or overdue tasks.
- **Project Progress:** Track progress of your projects.
- **FAQs:** Fun and informative FAQs section.

## Installation

To install and run this project locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/ducheharsh/justdoit.git
    ```
2. Navigate to the project directory:
    ```bash
    cd justdoit
    ```
3. Install the dependencies for frontend:
    ```bash
    cd justdoit-frontend
    pnpm install
    ```
4. Install the dependencies for backend:
    ```bash
    cd justdoit-api
    bun install
    ```


## Usage

To use this project:

1. Sign up or log in to your account.
2. Create a new task by clicking the "Add Task" button.
3. Edit or delete tasks by clicking on the task and selecting the appropriate option.
4. Assign categories like Work or Lifestyle to your tasks.
5. Mark tasks as completed or overdue to update progress.
6. View project progress and deadlines.
7. Check the FAQ section for more information.
8. Log out from your account when done.

## Code Walkthrough

### Frontend

- **Architecture:** Uses a standard architecture with separate files for APIs.
- **Validation:** Zod-validation for data validation.
- **React Hooks:** Used for updating, creating, and querying tasks efficiently.
- **Text Editor:** Utilizes an external library called Norbin.
- **Package Manager:** Preferred pnpm over npm.
- **State Management:** Uses Zustand for the project store.
- **Caching:** Efficiently handles caching using local storage.
- **Custom Components:** Includes custom components like the task table and forms.

### Backend

- **Framework:** Uses Holo for quick deployment with software workers.
- **Runtime:** Employs a faster runtime environment.
- **Architecture:** Maintains a standard architecture with separate utilities for hashing and other functions.
- **Authentication:** Uses JWT for user authentication.
- **Routing:** Defines routes in separate files with controllers for each entity.
- **Database:** Uses a cloud-based serverless architecture with Drizzle ORM and Non-DB.
- **Connection Pooling:** Efficient connection handling.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch:
    ```bash
    git checkout -b feature-name
    ```
3. Make your changes and commit them:
    ```bash
    git commit -m 'Add some feature'
    ```
4. Push to the branch:
    ```bash
    git push origin feature-name
    ```
5. Create a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions or suggestions, please open an issue or contact [Harsh Duche](mailto:ducheharsh@gmail.com).

