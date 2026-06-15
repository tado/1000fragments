uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.24; vec2 jc = vec2(-0.36 + 0.3 * sin(t * 0.25 + ph), -0.03 + 0.3 * cos(t * 0.25 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 32; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(32) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.22 / wf * sin(wf * 2.03 * p.y + time * 0.66); p.y += 0.40 / wf * cos(wf * 3.87 * p.x + time * 0.88); }
	p *= 1.73;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.30; p = rot2(0.64) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.74 + time * 0.20, vec3(0.55, 0.58, 0.48), vec3(0.47, 0.34, 0.36), vec3(0.87, 1.06, 1.04), vec3(0.10, 0.22, 0.03));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
