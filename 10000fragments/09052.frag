uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 12.94 + t * 4.79 + ph) + sin(p.y * 5.00 - t * 4.79 + ph)
        + sin((p.x + p.y) * 8.05 + t * 4.79 + ph) + sin(length(p) * 4.32 - t * 4.79 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float fr = length(p); p *= 1.0 + 0.39 * fr * fr; }
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.40 / wf * sin(wf * 2.99 * p.y + time * 1.09); p.y += 0.41 / wf * cos(wf * 2.97 * p.x + time * 1.29); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.40, lr * 2.54 + time * -0.20); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.85 + time * 0.04, vec3(0.53, 0.41, 0.47), vec3(0.32, 0.34, 0.43), vec3(1.01, 0.78, 1.18), vec3(0.12, 0.74, 0.78));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
