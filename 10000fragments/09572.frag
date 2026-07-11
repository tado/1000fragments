uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.28; vec2 jc = vec2(-0.49 + 0.3 * sin(t * 0.29 + ph), 0.22 + 0.3 * cos(t * 0.29 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 24; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(24) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.23; p = rot2(2.16) * p; }
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.41 / wf * sin(wf * 1.89 * p.y + time * 1.62); p.y += 0.34 / wf * cos(wf * 2.32 * p.x + time * 1.27); }
	{ p = vec2(atan(p.y, p.x) * 1.19, length(p) * 5.94 - time * 0.42); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.20), field(p, time, 0.41));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.10));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
