import { ref } from "vue";
import { describe, expect, it } from "vitest";

import { useToggleCore } from "../composables/use-toggle-core";

describe("useToggleCore", () => {
  it("enables interactions only for accessible and non-static cards", () => {
    const accessible = ref(true);
    const isStatic = ref(false);

    const { isInteractive } = useToggleCore({
      accessible,
      static: isStatic,
      state: ref("enabled"),
    });

    expect(isInteractive.value).toBe(true);

    isStatic.value = true;

    expect(isInteractive.value).toBe(false);
  });

  it("forces explicit state only in static mode", () => {
    const state = ref<"enabled" | "hovered">("hovered");

    const dynamic = useToggleCore({
      accessible: ref(true),
      static: ref(false),
      state,
    });

    const staticCard = useToggleCore({
      accessible: ref(true),
      static: ref(true),
      state,
    });

    expect(dynamic.forcedState.value).toBe("enabled");
    expect(staticCard.forcedState.value).toBe("hovered");
  });

  it("drops forced state when unavailable", () => {
    const unavailable = ref(true);

    const { forcedState } = useToggleCore({
      accessible: ref(true),
      static: ref(true),
      unavailable,
      state: ref("dragged"),
    });

    expect(forcedState.value).toBe("enabled");
  });
});
