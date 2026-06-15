uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.94; vec2 jc = vec2(-0.36 + 0.3 * sin(t * 0.82 + ph), 0.64 + 0.3 * cos(t * 0.82 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 33; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(33) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.85;
	{ p = vec2(atan(p.y, p.x) * 2.11, length(p) * 5.88 - time * 0.14); }
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.33 / wf * sin(wf * 3.53 * p.y + time * 0.66); p.y += 0.23 / wf * cos(wf * 1.63 * p.x + time * 1.75); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.29), field(p, time, 2.58));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
