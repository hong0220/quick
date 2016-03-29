var nodes = [], clinks = [], linkedByIndex = {};
var node_drag = d3.behavior.drag().on("dragstart", dragstart).on("drag", dragmove).on("dragend", dragend);
function dragstart(b, a) {
    force.stop();
    event.stopPropagation()
}
function dragmove(b, a) {
    b.px += d3.event.dx;
    b.py -= d3.event.dy;
    b.x += d3.event.dx;
    b.y -= d3.event.dy;
    tick()
}
function dragend(b, a) {
    b.fixed = true;
    tick();
    force.resume()
}
var width = document.documentElement.clientWidth, height = document.documentElement.clientHeight;
var x = d3.scale.linear().domain([0, width]).range([0, width]);
var y = d3.scale.linear().domain([0, height]).range([height, 0]);
var svg = d3.select("body").append("svg").attr("width", width).attr("height", height).append("g").call(d3.behavior.zoom().x(x).y(y).scaleExtent([1, 10]).on("zoom", zoom)).on("dblclick.zoom", null);
var link = svg.selectAll(".link"), node = svg.selectAll(".node");
svg.append("rect").attr("class", "overlay").attr("width", width).attr("height", height);
function zoom() {
    force.resume();
    node.attr("transform", function (a) {
        return "translate(" + x(a.x) + "," + y(a.y) + ")"
    });
    link.attr("x1", function (a) {
        return x(a.source.x)
    }).attr("y1", function (a) {
        return y(a.source.y)
    }).attr("x2", function (a) {
        return x(a.target.x)
    }).attr("y2", function (a) {
        return y(a.target.y)
    })
}
function tick() {
    node.attr("transform", function (a) {
        return "translate(" + x(a.x) + "," + y(a.y) + ")"
    });
    link.attr("x1", function (a) {
        return x(a.source.x)
    }).attr("y1", function (a) {
        return y(a.source.y)
    }).attr("x2", function (a) {
        return x(a.target.x)
    }).attr("y2", function (a) {
        return y(a.target.y)
    })
}
var force = d3.layout.force().linkDistance(function (b) {
    var a = 150;
    if (nodes[b.source.index].children == null || nodes[b.target.index].children == null) {
        return a * (1 + Math.log(b.auth) * 0.4)
    }
    a = (nodes[b.target.index].children.length + nodes[b.source.index].children.length) * 5;
    if (a < 150) {
        a = 150
    }
    if (a > 500) {
        a = 500
    }
    return a
}).charge(-120).gravity(0.01).friction(0.8).linkStrength(1).size([width, height]).on("tick", tick);
var div = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);
function isConnected(d, c) {
    return linkedByIndex[d.num + "," + c.num] || linkedByIndex[c.num + "," + d.num] || d.num == c.num
}
function fade(b, a) {
    node.style("opacity", function (c) {
        thisOpacity = isConnected(b, c) ? 1 : a;
        this.setAttribute("fill-opacity", thisOpacity);
        return thisOpacity
    });
    link.style("stroke-opacity", function (c) {
        return c.source === b || c.target === b ? 1 : a
    })
}
function mouseout() {
    div.transition().duration(500).style("opacity", 0);
    div.html("")
}
function restart() {
    force.nodes(nodes).links(clinks).start();
    svg.selectAll(".link").remove();
    svg.selectAll(".node").remove();
    link = svg.selectAll(".link").data(clinks).enter().append("line").attr("class", "link").on("mouseover", function (a) {
        div.transition().duration(0).style("opacity", 0.8);
        div.html("QQ号:" + a.target.num + "<br/>群内昵称: " + a.nick).style("left", (d3.event.pageX + 10) + "px").style("top", (d3.event.pageY + 5) + "px")
    }).on("mouseout", mouseout).style("stroke", function (a) {
        if (a.auth == 4) {
            return "#FFD700"
        } else {
            if (a.auth == 2) {
                return "#00AE6C"
            }
        }
    });
    node = svg.selectAll(".node").data(nodes).enter().append("g").attr("class", "node").on("mouseover", function (a) {
        if (a.type == "qun" && a.name != null) {
            div.transition().duration(500).style("opacity", 0.9);
            div.html("群号: " + a.num + "<br/>群名: " + a.name + "<br/>创建时间: " + a.cdate + "<br/>群介绍: " + a.desc).style("left", (d3.event.pageX + 5) + "px").style("top", (d3.event.pageY + 5) + "px")
        }
        fade(a, 0.1)
    }).on("mouseout", function (a) {
        div.transition().duration(500).style("opacity", 0);
        div.html("");
        link.style({
            stroke: function (b) {
                if (b.auth == 4) {
                    return "#FFD700"
                } else {
                    if (b.auth == 2) {
                        return "#00AE6C"
                    }
                }
            }
        });
        fade(a, 1)
    }).on("dblclick", function (a) {
        force.stop();
        a.fixed = false;
        tick();
        force.resume()
    }).call(node_drag);
    node.append("image").attr("xlink:href", function (a) {
        return a.type == "qun" ? "qun.png" : "qq.png"
    }).attr("x", -8).attr("y", -8).attr("width", 16).attr("height", 16);
    node.append("text").attr("dx", 12).attr("dy", ".35em").text(function (b) {
        if (b.num == qstr) {
            b.fixed = true;
            b.px = width / 2;
            b.py = height / 2
        }
        if (b.type == "qq") {
            var a = clinks.filter(function (c) {
                return c.target == b
            });
            if (a.length == 1) {
                return a[0].nick + " " + b.num
            }
            return b.num
        } else {
            return b.name != null ? b.num + " " + b.name : b.num
        }
    });
    force.on("tick", function () {
        node.attr("transform", function (a) {
            return "translate(" + x(a.x) + "," + y(a.y) + ")"
        });
        link.attr("x1", function (a) {
            return x(a.source.x)
        }).attr("y1", function (a) {
            return y(a.source.y)
        }).attr("x2", function (a) {
            return x(a.target.x)
        }).attr("y2", function (a) {
            return y(a.target.y)
        })
    })
}
function removesingle() {
    var c = [];
    var b = svg.selectAll(".node").filter(function (f) {
        var e = clinks.filter(function (d) {
            return d.target == f
        });
        if (e.length == 1) {
            c.push(e[0]);
            return true
        } else {
            if (e.length == 2 && e[0].source == e[1].source) {
                c.push(e[0]);
                c.push(e[1]);
                return true
            }
        }
    });
    var a = svg.selectAll(".link").data(clinks).filter(function (d) {
        return c.indexOf(d) != -1
    });
    b.remove();
    a.remove();
    force.start()
}
function shownick() {
    nodea = svg.selectAll(".node").filter(function (a) {
        return a.type == "qq"
    });
    nodea.append("foreignObject").attr("width", "25%").attr("height", "50%").attr("x", -10).attr("y", 10).append("xhtml:div").html(function (f) {
        if (f.type == "qq") {
            var e = clinks.filter(function (d) {
                return d.target == f
            });
            var c = [];
            e.forEach(function (d) {
                c.push(d.nick)
            });
            var b = d3.set(c);
            var a = "";
            b.forEach(function (d) {
                a += d + "<br/>"
            });
            return a
        }
    });
    force.start()
}
function removenick() {
    txtnode = svg.selectAll(function () {
        return this.getElementsByTagName("foreignObject")
    });
    txtnode.remove();
    force.start()
};
