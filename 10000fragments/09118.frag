uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 4; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.42 + jf * 4.0), cos(t * 0.57 * jf)) * 0.75;
        xs += sin(length(p - im) * 129.58 - t * 4.11 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.38 + 0.17 * cos(sa * 8 + t * 0.75 + ph);
    v = sin((sr - petal) * 10.43);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.74, lr * 2.91 + time * 0.11); }
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.27 / wf * sin(wf * 2.19 * p.y + time * 1.66); p.y += 0.32 / wf * cos(wf * 2.38 * p.x + time * 1.72); }
	p = rot2(p.y * 1.64 + time * 0.76) * p;
	{ p = vec2(atan(p.y, p.x) * 2.33, length(p) * 2.40 - time * 0.72); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.88);
	float d = d1 + d2;
	vec3 col = palette(d * 1.66 + time * 0.21, vec3(0.51, 0.56, 0.41), vec3(0.39, 0.31, 0.46), vec3(0.74, 1.25, 1.34), vec3(0.87, 0.58, 0.28));
	col = mod(col * 1.54, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
