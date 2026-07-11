uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.97; vec2 jc = vec2(-0.41 + 0.3 * sin(t * 1.47 + ph), -0.28 + 0.3 * cos(t * 1.41 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 17; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 17.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.03;
	{ p = vec2(atan(p.y, p.x) * 1.55, length(p) * 2.12 - time * 0.86); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.84, lr * 2.62 + time * -0.36); }
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.32 / wf * sin(wf * 2.95 * p.y + time * 1.20); p.y += 0.29 / wf * cos(wf * 2.46 * p.x + time * 1.15); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.71 + time * 0.13, vec3(0.41, 0.51, 0.52), vec3(0.42, 0.47, 0.50), vec3(1.38, 1.36, 1.13), vec3(0.11, 0.11, 0.39));
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.07;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
