uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 2.05 + t * 3.96 + ph) + sin(p.y * 8.91 - t * 3.96 + ph)
        + sin((p.x + p.y) * 8.01 + t * 3.96 + ph) + sin(length(p) * 4.07 - t * 3.96 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.28;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.34, lr * 1.15 + time * 0.21); }
	p = rot2(p.y * -3.32 + time * 0.13) * p;
	p = fract(p * 1.20) - 0.5;
	{ float fr = length(p); p *= 1.0 + 0.24 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.30 + time * 0.26, vec3(0.58, 0.52, 0.47), vec3(0.33, 0.35, 0.35), vec3(0.85, 1.27, 0.82), vec3(0.05, 0.82, 0.28));
	col = fract(col * 1.75);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
