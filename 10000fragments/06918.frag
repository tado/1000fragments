uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 6.92, t * 1.34 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = abs(p) - 0.49;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.70, lr * 2.43 + time * 0.79); }
	{ float fr = length(p); p *= 1.0 + -0.76 * fr * fr; }
	{ p = vec2(atan(p.y, p.x) * 1.74, length(p) * 4.83 - time * 0.18); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.35), field(p, time, 2.71));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
