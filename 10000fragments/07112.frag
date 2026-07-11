uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 9.36, t * 1.43 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 10.88 + t * 3.67 + ph) + sin(p.y * 11.15 - t * 4.44 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.08;
	{ float fr = length(p); p *= 1.0 + 0.55 * fr * fr; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.32, lr * 2.85 + time * 0.27); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.21);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.99 + time * 0.09, vec3(0.51, 0.48, 0.59), vec3(0.41, 0.47, 0.31), vec3(1.32, 1.35, 0.75), vec3(0.47, 0.85, 0.66));
	col = fract(col * 1.95);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
