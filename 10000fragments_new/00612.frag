uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.52; vec2 jc = vec2(-0.75 + 0.3 * sin(t * 1.33 + ph), -0.57 + 0.3 * cos(t * 0.74 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 37; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 37.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.84;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.46 / wf * sin(wf * 1.89 * p.y + time * 0.82); p.y += 0.47 / wf * cos(wf * 2.29 * p.x + time * 1.52); }
	{ p = vec2(atan(p.y, p.x) * 1.36, length(p) * 2.09 - time * 0.29); }
	p *= 1.56;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.72, 0.81, 0.35) * (0.08 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
