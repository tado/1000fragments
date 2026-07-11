uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 6.39 + t * 0.99 + ph) + sin(p.y * 4.23 - t * 0.99 + ph)
        + sin((p.x + p.y) * 9.19 + t * 0.99 + ph) + sin(length(p) * 6.64 - t * 0.99 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.80;
	p *= 2.20;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.44 / wf * sin(wf * 1.61 * p.y + time * 0.75); p.y += 0.24 / wf * cos(wf * 2.89 * p.x + time * 1.64); }
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.18; p = rot2(2.49) * p; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.24, lr * 2.96 + time * 0.14); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.95 + time * 0.10, vec3(0.50, 0.46, 0.59), vec3(0.41, 0.46, 0.42), vec3(1.28, 0.87, 1.01), vec3(0.84, 0.57, 0.55));
	col = clamp((col - 0.5) * 1.29 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
