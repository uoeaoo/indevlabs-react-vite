import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { useTasks } from "../../../hooks/useTasks";
import Tasks from "./Tasks";

jest.mock("../../../hooks/useTasks");

const mockUseTasks = useTasks as jest.MockedFunction<typeof useTasks>;

describe("Tasks component", () => {
  // Создаём элемент для портала перед каждым тестом
  beforeEach(() => {
    const portalRoot = document.createElement("div");
    portalRoot.setAttribute("id", "portal-root");
    document.body.appendChild(portalRoot);

    mockUseTasks.mockReturnValue({
      tasks: [
        {
          id: 1,
          title: "Test task",
          description: "This is a test",
          fullInfo: "Full info",
          creationDate: "2025-11-12",
          deadline: "2025-11-20",
          completed: false,
        },
      ],
      loading: false,
      addTask: jest.fn(),
      toggleComplete: jest.fn(),
      removeTask: jest.fn(),
    });
  });

  // Удаляем портал после каждого теста
  afterEach(() => {
    const portalRoot = document.getElementById("portal-root");
    portalRoot?.remove();
  });

  test("renders task title", () => {
    render(
      <MemoryRouter>
        <Tasks />
      </MemoryRouter>
    );
    expect(screen.getByText("Test task")).toBeInTheDocument();
  });

  test("shows modal when clicking + Add Task", async () => {
    render(
      <MemoryRouter>
        <Tasks />
      </MemoryRouter>
    );

    const addButton = screen.getByRole("button", { name: /add new task/i });
    fireEvent.click(addButton);

    // Ждём появления заголовка модалки
    const modalTitle = await screen.findByText("Add new task");
    expect(modalTitle).toBeInTheDocument();
  });
});
