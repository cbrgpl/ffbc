import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import QCardBase from "../ui/q-card-base.vue";

describe("q-card-base", () => {
  it("renders without error", () => {
    expect(() => mount(QCardBase)).not.toThrow();
  });

  it("supports card variants", () => {
    const outlined = mount(QCardBase, {
      props: {
        variant: "outlined",
      },
    });

    const elevated = mount(QCardBase, {
      props: {
        variant: "elevated",
      },
    });

    const filled = mount(QCardBase, {
      props: {
        variant: "filled",
      },
    });

    expect(outlined.get('[data-qt="q-card-base-root"]').classes()).toContain("card-base_variant-outlined");
    expect(elevated.get('[data-qt="q-card-base-root"]').classes()).toContain("card-base_variant-elevated");
    expect(filled.get('[data-qt="q-card-base-root"]').classes()).toContain("card-base_variant-filled");
  });

  it("forces state classes only in static mode", () => {
    const dynamic = mount(QCardBase, {
      props: {
        state: "hovered",
      },
    });

    const staticCard = mount(QCardBase, {
      props: {
        static: true,
        state: "hovered",
      },
    });

    expect(dynamic.get('[data-qt="q-card-base-root"]').classes()).not.toContain("card-base_state-hovered");
    expect(staticCard.get('[data-qt="q-card-base-root"]').classes()).toContain("card-base_state-hovered");
  });

  it("applies accessibility attributes when interactive", () => {
    const wrapper = mount(QCardBase, {
      props: {
        accessible: true,
      },
    });

    const root = wrapper.get('[data-qt="q-card-base-root"]');

    expect(root.attributes("role")).toBe("button");
    expect(root.attributes("tabindex")).toBe("0");
  });

  it("removes accessibility attributes when static", () => {
    const wrapper = mount(QCardBase, {
      props: {
        accessible: true,
        static: true,
      },
    });

    const root = wrapper.get('[data-qt="q-card-base-root"]');

    expect(root.attributes("role")).toBeUndefined();
    expect(root.attributes("tabindex")).toBeUndefined();
  });

  it("marks card as unavailable when disabled", () => {
    const wrapper = mount(QCardBase, {
      props: {
        disabled: true,
      },
    });

    const root = wrapper.get('[data-qt="q-card-base-root"]');

    expect(root.classes()).toContain("card-base_unavailable");
    expect(root.attributes("aria-disabled")).toBe("true");
  });
});
