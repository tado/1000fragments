uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 9.39 + t * 2.34 + ph) + sin(p.y * 3.91 - t * 4.04 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.17, lr * 1.21 + time * -0.25); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.28), field(p, time, 0.57));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.52 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
