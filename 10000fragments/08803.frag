uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 5.79 + vec2(t * 2.70, -t * 2.70) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 10.48 + t * 3.16 + ph) + sin(p.y * 12.57 - t * 3.16 + ph)
        + sin((p.x + p.y) * 6.17 + t * 3.16 + ph) + sin(length(p) * 13.61 - t * 3.16 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = abs(p);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.33, lr * 2.82 + time * 0.52); }
	p = rot2(3.08) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.12);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.52 + time * 0.28, vec3(0.50, 0.49, 0.43), vec3(0.36, 0.44, 0.41), vec3(1.24, 0.90, 0.92), vec3(0.08, 0.16, 0.66));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.57));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
