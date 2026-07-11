uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.41; vec2 jc = vec2(-0.29 + 0.3 * sin(t * 0.42 + ph), 0.27 + 0.3 * cos(t * 0.42 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 39; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(39) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.81;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.54, lr * 1.60 + time * -0.19); }
	p += vec2(-0.19, 0.04) * sin(length(p) * 4.11 - time * 0.69) * 0.24;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.27 / wf * sin(wf * 2.11 * p.y + time * 1.48); p.y += 0.26 / wf * cos(wf * 2.69 * p.x + time * 1.26); }
	p = abs(p);
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.01), field(p, time, 2.02));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
