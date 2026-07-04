uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.73; vec2 jc = vec2(-0.06 + 0.3 * sin(t * 1.74 + ph), 0.49 + 0.3 * cos(t * 0.37 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 26; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 26.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.79;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.24 / wf * sin(wf * 2.17 * p.y + time * 2.09); p.y += 0.21 / wf * cos(wf * 3.99 * p.x + time * 1.51); }
	p.x += sin(p.y * 6.13 + time * 3.15) * 0.24;
	p = (floor(p * 16.4) + 0.5) / 16.4;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.81), field(p, time, 1.62));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
