uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 15.33 + t * 5.28 + ph) + sin(p.y * 13.77 - t * 0.85 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.50, lr * 1.85 + time * 0.14); }
	{ float fr = length(p); p *= 1.0 + -0.71 * fr * fr; }
	p *= 2.65;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.08 + time * 0.14, vec3(0.47, 0.41, 0.45), vec3(0.44, 0.39, 0.41), vec3(0.88, 1.29, 1.25), vec3(0.52, 0.23, 0.84));
	col = clamp((col - 0.5) * 1.63 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
