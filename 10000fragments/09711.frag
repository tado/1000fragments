uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.57; vec2 jc = vec2(-0.79 + 0.3 * sin(t * 1.22 + ph), -0.33 + 0.3 * cos(t * 1.22 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 19; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(19) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.38 / wf * sin(wf * 2.30 * p.y + time * 1.86); p.y += 0.30 / wf * cos(wf * 1.66 * p.x + time * 1.91); }
	p = abs(p);
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.51), field(p, time, 1.03));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.17));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
