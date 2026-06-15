uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 7.40 + t * 4.47 + ph) + sin(p.y * 8.36 - t * 4.47 + ph)
        + sin((p.x + p.y) * 7.14 + t * 4.47 + ph) + sin(length(p) * 15.37 - t * 4.47 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.62;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.32, lr * 2.22 + time * 0.59); }
	{ p = vec2(atan(p.y, p.x) * 2.98, length(p) * 5.41 - time * 0.44); }
	{ float fr = length(p); p *= 1.0 + -0.31 * fr * fr; }
	p = rot2(length(p) * -2.43 + time * 0.84) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.51 + time * 0.07, vec3(0.47, 0.53, 0.52), vec3(0.35, 0.39, 0.49), vec3(0.85, 0.83, 1.00), vec3(0.91, 0.37, 0.94));
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
