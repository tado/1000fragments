uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 11.74 + vec2(t * 0.37, -t * 0.37) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 7.17 + t * 4.77 + ph) + sin(p.y * 12.33 - t * 4.77 + ph)
        + sin((p.x + p.y) * 3.38 + t * 4.77 + ph) + sin(length(p) * 11.37 - t * 4.77 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.46, lr * 1.40 + time * 0.76); }
	{ p = vec2(atan(p.y, p.x) * 2.91, length(p) * 3.70 - time * 0.71); }
	p = rot2(1.30) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.37);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.78 + time * 0.14, vec3(0.59, 0.52, 0.45), vec3(0.37, 0.36, 0.48), vec3(1.16, 1.13, 1.18), vec3(0.87, 0.77, 0.57));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
