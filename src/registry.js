import REGISTRY_DATA_SAMPLE from "./registry_data_sample.js";
import {interpretRegistry} from "./registry_algos.js";
import { application } from "express";

// COMPONENTS
const RegistryTextInput = () => {
  const getNumRows = (content) => content.val().split("\n").length;
  return $(`
    <h2>Input your registry data here</h2>
    <div id="text-input" class="flex-row">
      <ul id="lines"></ul>
      <div id="error"></div>
      <textarea
        id="content"
        placeholder="Enter registry content here"
      >${REGISTRY_DATA_SAMPLE}</textarea>
    </div>
  `).on("input", (e) => {
    const self = $(e.target);
    console.clear();
    $("#lines").html(
      Array.from({length: getNumRows(self)}).map(
        (_, i) => `<li>${i + 1}</li>`
      ).join("")
    );
    interpretRegistry();
  });
}
const RegistryFileInput = () => $(`
  <h2>Or import a file</h2>
  <input type="file" id="registry-file">
`)
  .change(
    (e) => e.target.files[0].text()
      .then(content => $("#content").val(content).trigger("input"))
  );
// MOUNT
$(document).ready(() => {
  $("#root").append(
    RegistryTextInput(),
    RegistryFileInput(),
    `
      <div id="output">
        <h1>Output</h1>
        <!-- Key: li.key ul -->
        <!-- Value: li.data -->
        <div id="registry-tree"></div>
      </div>
      <div id="context-menu-wrapper" tabindex="0"></div>
    `
  ).find("#context-menu-wrapper").hide().blur((e) => $(e.currentTarget).fadeOut("fast")).end();
  $("#content").trigger("input");
});