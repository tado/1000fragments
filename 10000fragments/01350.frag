uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 2.41 + t * 2.69 + ph) + sin(p.y * 10.13 - t * 2.69 + ph)
        + sin((p.x + p.y) * 9.40 + t * 2.69 + ph) + sin(length(p) * 6.15 - t * 2.69 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.80;
	p = fract(p * 2.11) - 0.5;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.12, lr * 2.52 + time * 0.51); }
	p = rot2(1.33) * p;
	p = rot2(length(p) * -2.24 + time * 0.69) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.88 + time * 0.14, vec3(0.54, 0.59, 0.58), vec3(0.40, 0.36, 0.34), vec3(1.07, 1.29, 0.92), vec3(0.59, 0.88, 0.22));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
