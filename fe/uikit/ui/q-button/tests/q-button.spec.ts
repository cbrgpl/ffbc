import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import QButton from "../ui/q-button.vue";

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
    useDimension: () => ({
      dimensionStyle: computed(() => ({})),
    }),
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
    expect(() => mount(QButton)).not.toThrow();
  });

  it("no icon by default", () => {
    const wrapper = mount(QButton);

    expect(wrapper.find('[data-qt="q-button-icon"]').exists()).toBe(false);
  });

  describe("props", () => {
    it("variant mapping works", () => {
      const variants = [
        { input: "default", expected: "button-base_primary" },
        { input: "tonal", expected: "button-base_secondary-container" },
        { input: "outline", expected: "button-base_outline-variant" },
        { input: "elevated", expected: "button-base_surface-container-low" },
        { input: "text", expected: "button-base_primary-text" },
      ] as const;

      for (const variant of variants) {
        const wrapper = mount(QButton, {
          props: {
            variant: variant.input,
          },
        });

        const root = wrapper.get('[data-qt="q-button-base-root"]');

        expect(root.classes()).toContain(variant.expected);
      }
    });

    it("icon works", () => {
      const wrapper = mount(QButton, {
        props: {
          icon: "check",
        },
      });

      expect(wrapper.find('[data-qt="q-button-icon"]').exists()).toBe(true);
    });

    it("form works", () => {
      const wrapper = mount(QButton, {
        props: {
          form: "round",
        },
      });

      const root = wrapper.get('[data-qt="q-button-base-root"]');

      expect(root.classes()).toContain("button_round");
      expect(root.classes()).not.toContain("button_square");
    });

    it("type works", () => {
      const wrapper = mount(QButton, {
        props: {
          type: "submit",
        },
      });

      const root = wrapper.get('[data-qt="q-button-base-root"]');

      expect(root.attributes("type")).toBe("submit");
    });

    it("text works", () => {
      const wrapper = mount(QButton, {
        props: {
          text: "Continue",
        },
      });

      const text = wrapper.get('[data-qt="q-button-content-text"]');

      expect(text.text()).toBe("Continue");
    });
  });
});

describe("toggle", () => {
  it("not togglable if toggle=false explicitly", () => {
    const wrapper = mount(QButton, {
      props: {
        toggle: false,
        variant: "default",
      },
    });

    const root = wrapper.get('[data-qt="q-button-base-root"]');

    expect(root.classes()).toContain("button-base_primary");
    expect(root.classes()).not.toContain("button-base_surface-container");
  });

  it("togglable if toggle=true explicitly", () => {
    const wrapper = mount(QButton, {
      props: {
        toggle: true,
        variant: "default",
      },
    });

    const root = wrapper.get('[data-qt="q-button-base-root"]');

    expect(root.classes()).toContain("button-base_surface-container");
  });

  it("toggle state displayed if it it true by outer context", () => {
    const wrapper = mount(QButton, {
      props: {
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
    const notSelected = mount(QButton, {
      props: {
        toggle: true,
        form: "round",
      },
    });

    const selected = mount(QButton, {
      props: {
        toggle: true,
        form: "round",
        selected: true,
      },
    });

    const notSelectedRoot = notSelected.get('[data-qt="q-button-base-root"]');
    const selectedRoot = selected.get('[data-qt="q-button-base-root"]');

    expect(notSelectedRoot.classes()).toContain("button_round");
    expect(selectedRoot.classes()).toContain("button_square");
  });
});

describe("disabled", () => {
  it("not disabled by default", () => {
    const wrapper = mount(QButton);

    const root = wrapper.get('[data-qt="q-button-base-root"]');

    expect(root.attributes("disabled")).toBeUndefined();
  });

  it("disabled works", () => {
    const wrapper = mount(QButton, {
      props: {
        disabled: true,
      },
    });

    const root = wrapper.get('[data-qt="q-button-base-root"]');

    expect(root.attributes("disabled")).toBeDefined();
    expect((root.element as HTMLButtonElement).disabled).toBe(true);
  });
});
