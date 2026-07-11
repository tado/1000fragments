uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 5; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.56 * sin(mf + 3.0) + ph), cos(t * 0.56 * cos(mf + 3.0) + ph));
        ms += 0.024 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.80; vec2 jc = vec2(0.07 + 0.3 * sin(t * 0.78 + ph), -0.68 + 0.3 * cos(t * 0.78 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 24; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(24) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.01;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.67, lr * 1.53 + time * -0.36); }
	{ p = vec2(atan(p.y, p.x) * 2.71, length(p) * 4.75 - time * 0.76); }
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.22 / wf * sin(wf * 2.43 * p.y + time * 1.85); p.y += 0.38 / wf * cos(wf * 1.74 * p.x + time * 1.06); }
	p = rot2(0.57) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.26);
	float d = d1 * d2;
	vec3 col = palette(d * 1.12 + time * 0.18, vec3(0.42, 0.54, 0.42), vec3(0.38, 0.41, 0.37), vec3(1.36, 0.85, 1.34), vec3(0.85, 0.42, 0.54));
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
