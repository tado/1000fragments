uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 28.53 - t * 5.28 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 10.51 + t * 2.79 + ph) + sin(p.y * 15.87 - t * 0.81 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.78;
	p *= 2.03;
	p = rot2(p.y * 3.48 + time * 0.34) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.25, lr * 2.31 + time * 0.39); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.92);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.56 + time * 0.30, vec3(0.55, 0.46, 0.53), vec3(0.49, 0.39, 0.48), vec3(1.08, 1.24, 1.21), vec3(0.15, 0.90, 0.64));
	col = mod(col * 1.82, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
