uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 8.04 + t * 4.50 + ph) + sin(p.y * 7.64 - t * 4.50 + ph)
        + sin((p.x + p.y) * 2.24 + t * 4.50 + ph) + sin(length(p) * 11.64 - t * 4.50 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 4.77 + t * 1.54 + ph) + sin(p.y * 15.31 - t * 2.46 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.79;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.03, lr * 1.74 + time * 0.72); }
	p = rot2(2.70) * p;
	p = abs(p) - 0.23;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.89);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.50 + time * 0.20, vec3(0.41, 0.58, 0.44), vec3(0.33, 0.37, 0.41), vec3(1.20, 0.75, 1.31), vec3(0.88, 0.77, 0.78));
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
