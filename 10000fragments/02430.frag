uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.60; vec2 jc = vec2(-0.65 + 0.3 * sin(t * 1.28 + ph), -0.67 + 0.3 * cos(t * 1.28 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 20; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(20) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.22;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.35 / wf * sin(wf * 2.02 * p.y + time * 1.42); p.y += 0.46 / wf * cos(wf * 2.88 * p.x + time * 1.45); }
	p = rot2(length(p) * 2.42 + time * 0.46) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.59 + time * 0.19, vec3(0.52, 0.54, 0.46), vec3(0.43, 0.37, 0.47), vec3(0.97, 0.92, 1.30), vec3(0.48, 0.98, 0.07));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
