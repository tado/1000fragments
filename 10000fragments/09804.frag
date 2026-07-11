uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.51; vec2 jc = vec2(-0.09 + 0.3 * sin(t * 1.08 + ph), -0.65 + 0.3 * cos(t * 1.08 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 33; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(33) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.14;
	p += vec2(-0.17, 0.95) * sin(length(p) * 2.46 - time * 1.51) * 0.29;
	p = rot2(length(p) * -1.89 + time * 0.76) * p;
	{ float fr = length(p); p *= 1.0 + -0.44 * fr * fr; }
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.31 / wf * sin(wf * 3.65 * p.y + time * 0.79); p.y += 0.33 / wf * cos(wf * 3.15 * p.x + time * 0.66); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.80 + time * 0.10, vec3(0.58, 0.60, 0.43), vec3(0.48, 0.46, 0.49), vec3(1.01, 1.13, 1.22), vec3(0.16, 0.91, 0.52));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
