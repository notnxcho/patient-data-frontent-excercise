## How to Run the App Locally

1. **Install Node.js:** This project uses Node.js version 18.19.0. You can
   manage and install different versions of Node.js using nvm (Node Version
   Manager). should be something along the lines of:

   ```bash
   nvm use 18.19.0
   ```

   For more information, refer to the
   [nvm documentation](https://github.com/nvm-sh/nvm).

2. **Install dependencies:** Run the following command to install all necessary
   dependencies:

   ```bash
   npm install
   ```

3. **Start the development server:** After the dependencies are installed, start
   the development server with:

   ```bash
   npm start
   ```

4. **Open the app in your browser:** Once the development server is running,
   open your browser and navigate to:
   ```
   http://localhost:3000
   ```

### Design Decisions

**General:** As this app is barely a CRUD (not even bc the only actual API call
is a fetch to retrieve the patients), and it doesn't have a need for SEO, nor
complex routing or heavy date fetching logics, SSR would be a total overkill.
It'd just make things more difficult to set up.

**Context API:** I used a provider for managing the state of the patients in the
app to keep things tidy and efficient. By using a provider, I can share the
patient-related data across different components without having to prop-drill.
This makes the code cleaner and more maintainable. Plus, it centralizes the
state management, making it easier to handle  
 updates and keep everything in sync also promoting better structure and
scalability for the app. Probably overkill for what it is but still.

### Libraries and Resources:

1. **Tailwind CSS:** Speeds up putting together the UI. I like a hybrid between
   tailwind and traditional classNames, for most wrappers and things of the sort
   that have light styling, I use the tailwind classes. Also for managing
   themes.

2. **React Hook Form:** Simple and performant, pretty standard as well. Has some
   built in accesibilty features that I appreciate having.

3. **Yup:** Used with react-hook-form providing robust input validation. I like
   the schema approach, even though the form in this exercise is fairly simple,
   it's always good to foresee scalability.

4. **FocusTrap:** I found the keyboard navigation within the modal frustrating,
   hence the focus trap and the keystrokes functions.

5. **React Toastify:** Plug and play toast notifications, easy to use and pretty
   light as well.

6. **React Intersection Observer:** Lightweight and easy to integrate within a
   component, as it does not need any code in the parent to support usage. Cool
   for animating stuff into the viewport and also helpful for performance
   concerns like lazy loading imgs.

7. **Prettier:** Just prettier so it keeps everything tidy (indent-wise).
