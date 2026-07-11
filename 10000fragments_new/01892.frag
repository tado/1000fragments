uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.09; vec2 jc = vec2(-0.54 + 0.3 * sin(t * 0.39 + ph), -0.33 + 0.3 * cos(t * 1.50 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 16; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 16.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.04;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.45 / wf * sin(wf * 3.76 * p.y + time * 0.97); p.y += 0.22 / wf * cos(wf * 1.57 * p.x + time * 1.48); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.69, 0.93, 0.54) * (0.24 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
