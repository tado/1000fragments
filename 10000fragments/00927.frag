uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 2.07 + t * 3.03 + ph) + sin(p.y * 12.20 - t * 3.03 + ph)
        + sin((p.x + p.y) * 6.56 + t * 3.03 + ph) + sin(length(p) * 11.89 - t * 3.03 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 2.47 + t * 4.61 + ph) + sin(p.y * 3.01 - t * 5.81 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(-0.18, -0.14) * sin(length(p) * 5.66 - time * 0.50) * 0.36;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.35, lr * 1.75 + time * -0.42); }
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.47 / wf * sin(wf * 2.73 * p.y + time * 0.78); p.y += 0.40 / wf * cos(wf * 2.52 * p.x + time * 1.08); }
	p = rot2(1.54) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.03);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.42 + time * 0.13, vec3(0.40, 0.56, 0.50), vec3(0.40, 0.39, 0.40), vec3(1.40, 0.74, 1.37), vec3(0.10, 0.79, 0.25));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
