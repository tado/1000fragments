uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 34.37 - t * 6.59 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.38 + jf * 4.0), cos(t * 0.36 * jf)) * 0.53;
        xs += sin(length(p - im) * 191.85 - t * 8.22 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.89;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.08, lr * 2.63 + time * 0.28); }
	p = rot2(p.y * 1.71 + time * 0.19) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.20);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.83 + time * 0.02, vec3(0.49, 0.46, 0.41), vec3(0.32, 0.47, 0.37), vec3(0.73, 1.23, 1.01), vec3(1.00, 0.72, 0.94));
	col = clamp((col - 0.5) * 2.09 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
