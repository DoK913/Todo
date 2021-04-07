const path = "../data/todos.json";

const file = require("./dataStorageAPI.js");

async function createNew(req, res) {
  try {
    const data = await file.readFile();

    data.push(req.body);
    await file.rewriteFile(data);

    res.status(200).end();
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getAllTodos(req, res) {
  res.json(await file.readFile());
}

async function deleteByIds(req, res) {
  try {
    const idsToDelete = req.body.ids;
    const deleteAll = req.body.deleteAll;

    if (deleteAll) {
      await file.rewriteFile([]);
    } else {
      let data = await file.readFile();

      data = data.filter(function (item) {
        const isIncluded = idsToDelete.includes(String(item.id));
        return !isIncluded;
      });

      await file.rewriteFile(data);
    }

    res.status(200).end();
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function update(req, res) {
  try {
    const data = await file.readFile();
    const newData = req.body;

    const todoIndex = data.findIndex((todo) => todo.id == req.params.todoId);
    if (todoIndex >= 0) {
      data[todoIndex] = {
        ...data[todoIndex],
        ...newData,
      };
    }

    await file.rewriteFile(data);

    res.status(200).end();
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function saveAll(req, res) {
  try {
    const newTodos = req.body;

    await file.rewriteFile(newTodos);
    res.status(200).end();
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = {
  createNew: createNew,
  getAllTodos: getAllTodos,
  deleteByIds: deleteByIds,
  update: update,
  saveAll: saveAll,
};
