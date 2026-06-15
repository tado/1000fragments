uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.49; vec2 jc = vec2(-0.57 + 0.3 * sin(t * 1.03 + ph), 0.04 + 0.3 * cos(t * 1.03 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 29; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(29) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.31;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.46 / wf * sin(wf * 3.65 * p.y + time * 0.85); p.y += 0.22 / wf * cos(wf * 3.52 * p.x + time * 0.97); }
	p = abs(p);
	p += vec2(0.08, -0.94) * sin(length(p) * 4.22 - time * 1.80) * 0.16;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.31 + time * 0.10, vec3(0.56, 0.53, 0.45), vec3(0.46, 0.38, 0.42), vec3(0.71, 1.03, 1.04), vec3(0.57, 0.59, 0.56));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
