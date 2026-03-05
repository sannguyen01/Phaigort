import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import NotFound from "@/app/not-found";
import Loading from "@/app/loading";

// Mock next/link
vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

afterEach(cleanup);

describe("NotFound page", () => {
  it("renders 404 caption and heading", () => {
    render(<NotFound />);
    expect(screen.getAllByText("404").length).toBeGreaterThanOrEqual(1);
    const headings = screen.getAllByRole("heading", { level: 1 });
    expect(headings[0]).toHaveTextContent("This voyage has no destination.");
  });

  it("has link back to homepage", () => {
    render(<NotFound />);
    const links = screen.getAllByText("Return to the Wonderhouse");
    const anchor = links[0].closest("a");
    expect(anchor).toHaveAttribute("href", "/");
  });
});

describe("Loading page", () => {
  it("renders loading indicator with platinum background", () => {
    const { container } = render(<Loading />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("bg-platinum");
  });
});
