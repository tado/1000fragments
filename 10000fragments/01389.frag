uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 6.64 + sin(p.y * 4.61 + t * 2.44) * 1.50 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = (floor(p * 27.0) + 0.5) / 27.0;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.21, lr * 2.44 + time * 0.44); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.96), field(p, time, 1.92));
	col = 0.5 + 0.5 * col;
	col *= 0.81 + 0.12 * sin(gl_FragCoord.y * 2.37 + time * 5.39);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
