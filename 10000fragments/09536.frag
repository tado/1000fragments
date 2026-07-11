uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.08; vec2 jc = vec2(0.12 + 0.3 * sin(t * 1.47 + ph), 0.05 + 0.3 * cos(t * 1.47 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 18; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(18) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.70;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.31 / wf * sin(wf * 2.16 * p.y + time * 1.87); p.y += 0.34 / wf * cos(wf * 3.78 * p.x + time * 1.91); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.40), field(p, time, 2.79));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
