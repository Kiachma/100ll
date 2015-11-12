package main

import (
	"bufio"
	"flag"
	"fmt"
	"log"
	"os"
	"path/filepath"
	"strings"
)

var TaskList []Task

type Task struct {
	Dependencies []Task
	Name         string
}

func readFile(path string) {
	file, err := os.Open(path)
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()
	if err != nil {
		fmt.Println(err)
		return
	}
	fi, err := file.Stat()
	switch mode := fi.Mode(); {
	case mode.IsDir():

	case mode.IsRegular():
		scanner := bufio.NewScanner(file)
		for scanner.Scan() {
			parseLine(scanner.Text())
		}
		if err := scanner.Err(); err != nil {
			log.Fatal(err)
		}
	}

}
func parseLine(line string) {
	if strings.Contains(line, "gulp.task") {
		taskName := strings.Split(line, "',")[0]
		taskName = strings.SplitAfter(taskName, "gulp.task('")[1]
		task := Task{Name: taskName}
		if strings.Contains(line, "[") {
			dependencyString := strings.Split(line, "]")[0]
			dependencyString = strings.SplitAfter(dependencyString, "[")[1]
			dependenices := strings.Split(dependencyString, ",")
			for _, dependenicyString := range dependenices {
				dependency := Task{Name: strings.Replace(dependenicyString, "'", "", -1)}
				task.Dependencies = append(task.Dependencies, dependency)
			}
		}
		TaskList = append(TaskList, task)
	}

}
func visitFile(path string, f os.FileInfo, err error) error {
	readFile(path)
	return nil
}
func addDependencies(tasks []Task) {
	for _, task := range tasks {
		if len(task.Dependencies) > 0 {
			for i, dependency := range task.Dependencies {
				for _, tmp := range TaskList {
					if dependency.Name == tmp.Name {
						task.Dependencies[i] = tmp
					}
				}
			}
			addDependencies(task.Dependencies)

		}
	}

}
func printTask(task Task, indent string) {
	fmt.Println(indent + "" + task.Name)
	if len(task.Dependencies) > 0 {
		indent = indent + "-"
		for _, dependency := range task.Dependencies {
			printTask(dependency, indent)
		}
	}
}

func printTree(tasks []Task) {

	for _, task := range tasks {
		fmt.Println("------------------------------")
		printTask(task, "")

	}
}

func main() {
	log.SetFlags(log.LstdFlags | log.Lshortfile)
	flag.Parse()
	root := flag.Arg(0)
	err := filepath.Walk(root, visitFile)
	addDependencies(TaskList)
	printTree(TaskList)
	log.Fatal(err)
}
