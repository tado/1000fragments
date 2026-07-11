uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 8.12, t * 0.76 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.92;
	{ float fr = length(p); p *= 1.0 + -0.53 * fr * fr; }
	p = rot2(time * 1.19) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.53, lr * 1.40 + time * 0.22); }
	p = rot2(length(p) * 1.08 + time * 0.54) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.29 + time * 0.07, vec3(0.43, 0.48, 0.57), vec3(0.47, 0.44, 0.44), vec3(0.87, 0.91, 1.31), vec3(0.94, 0.53, 0.87));
	col = clamp((col - 0.5) * 1.58 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
