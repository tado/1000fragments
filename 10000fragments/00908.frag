uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.30; vec2 jc = vec2(0.35 + 0.3 * sin(t * 0.43 + ph), 0.46 + 0.3 * cos(t * 0.43 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 37; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(37) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.61;
	p *= 1.67;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.44 / wf * sin(wf * 2.36 * p.y + time * 1.92); p.y += 0.44 / wf * cos(wf * 2.02 * p.x + time * 1.54); }
	p = abs(p) - 0.33;
	p = rot2(length(p) * 1.25 + time * 0.72) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.89 + time * 0.11, vec3(0.54, 0.56, 0.47), vec3(0.33, 0.45, 0.35), vec3(1.04, 0.97, 1.09), vec3(0.86, 0.20, 0.83));
	col = fract(col * 1.84);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
