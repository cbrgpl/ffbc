import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import QIbutton from "../ui/q-ibutton.vue";

vi.mock("~uikit/libs/standard", async () => {
  const { computed, getCurrentInstance } = await import("vue");

  return {
    useUiContext: () => {
      const instance = getCurrentInstance();

      const context = computed(() => {
        const props = (instance?.proxy?.$props ?? {}) as Record<string, unknown>;

        return {
          disabled: Boolean(props.disabled),
          loading: Boolean(props.loading),
          readonly: Boolean(props.readonly),
          theme: props.theme as string | undefined,
        };
      });

      return { context };
    },
  };
});

vi.mock("~uikit/ui/q-icon", async () => {
  const { defineComponent, h } = await import("vue");

  return {
    QIcon: defineComponent({
      name: "QIconMock",
      inheritAttrs: false,
      setup(_, { attrs }) {
        return () => h("span", { ...(attrs as Record<string, unknown>) });
      },
    }),
  };
});

vi.mock("../composables/use-injection", async () => {
  const { computed, toValue } = await import("vue");

  return {
    useSize: (size: unknown, form: unknown, variant: unknown) => ({
      compSize: computed(() => toValue(size as never)),
      compForm: computed(() => toValue(form as never)),
      compVariant: computed(() => toValue(variant as never)),
    }),
  };
});

describe("render", () => {
  it("correctly renders with minimal setup", () => {
    expect(() =>
      mount(QIbutton, {
        props: {
          icon: "check",
        },
      }),
    ).not.toThrow();
  });

  describe("props", () => {
    it("variant mapping works", () => {
      const variants = [
        { input: "default", expected: "button-base_primary" },
        { input: "tonal", expected: "button-base_secondary-container" },
        { input: "outline", expected: "button-base_outline-variant" },
        { input: "standard", expected: "button-base_surface-variant-text" },
      ] as const;

      for (const variant of variants) {
        const wrapper = mount(QIbutton, {
          props: {
            icon: "check",
            variant: variant.input,
          },
        });

        const root = wrapper.get('[data-qt="q-button-base-root"]');

        expect(root.classes()).toContain(variant.expected);
      }
    });

    it("icon works", () => {
      const wrapper = mount(QIbutton, {
        props: {
          icon: "check",
        },
      });

      expect(() => wrapper.get('[data-qt="q-ibutton-icon"]')).not.toThrow();
    });

    it("type works", () => {
      const wrapper = mount(QIbutton, {
        props: {
          icon: "check",
          type: "submit",
        },
      });

      const root = wrapper.get('[data-qt="q-button-base-root"]');

      expect(root.attributes("type")).toBe("submit");
    });

    it("size works", () => {
      const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

      for (const size of sizes) {
        const wrapper = mount(QIbutton, {
          props: {
            icon: "check",
            size,
          },
        });

        const root = wrapper.get('[data-qt="q-button-base-root"]');

        expect(root.classes()).toContain(`ibutton_${size}`);
      }
    });
  });
});

describe("toggle", () => {
  it("not togglable if toggle=false explicitly", () => {
    const wrapper = mount(QIbutton, {
      props: {
        icon: "check",
        toggle: false,
        variant: "default",
      },
    });

    const root = wrapper.get('[data-qt="q-button-base-root"]');

    expect(root.classes()).toContain("button-base_primary");
    expect(root.classes()).not.toContain("button-base_surface-container");
  });

  it("togglable if toggle=true explicitly", () => {
    const wrapper = mount(QIbutton, {
      props: {
        icon: "check",
        toggle: true,
        variant: "default",
      },
    });

    const root = wrapper.get('[data-qt="q-button-base-root"]');

    expect(root.classes()).toContain("button-base_surface-container");
  });

  it("toggle state displayed if it it true by outer context", () => {
    const wrapper = mount(QIbutton, {
      props: {
        icon: "check",
        toggle: true,
        variant: "default",
        selected: true,
      },
    });

    const root = wrapper.get('[data-qt="q-button-base-root"]');

    expect(root.classes()).toContain("button-base_primary");
    expect(root.classes()).not.toContain("button-base_surface-container");
  });

  it("form is changed on toggle", () => {
    const notSelected = mount(QIbutton, {
      props: {
        icon: "check",
        toggle: true,
        form: "round",
      },
    });

    const selected = mount(QIbutton, {
      props: {
        icon: "check",
        toggle: true,
        form: "round",
        selected: true,
      },
    });

    const notSelectedRoot = notSelected.get('[data-qt="q-button-base-root"]');
    const selectedRoot = selected.get('[data-qt="q-button-base-root"]');

    expect(notSelectedRoot.classes()).toContain("ibutton_round");
    expect(selectedRoot.classes()).toContain("iibutton_square");
  });
});

describe("disabled", () => {
  it("not disabled by default", () => {
    const wrapper = mount(QIbutton, {
      props: {
        icon: "check",
      },
    });

    const root = wrapper.get('[data-qt="q-button-base-root"]');

    expect(root.attributes("disabled")).toBeUndefined();
  });

  it("disabled works", () => {
    const wrapper = mount(QIbutton, {
      props: {
        icon: "check",
        disabled: true,
      },
    });

    const root = wrapper.get('[data-qt="q-button-base-root"]');

    expect(root.attributes("disabled")).toBeDefined();
    expect((root.element as HTMLButtonElement).disabled).toBe(true);
  });
});
