uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.69; vec2 jc = vec2(-0.76 + 0.3 * sin(t * 1.43 + ph), -0.80 + 0.3 * cos(t * 1.43 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 28; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(28) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.56; p = rot2(1.53) * p; }
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.42 / wf * sin(wf * 2.28 * p.y + time * 1.04); p.y += 0.45 / wf * cos(wf * 2.71 * p.x + time * 1.86); }
	p = rot2(1.12) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.04, 1.43, 0.77) + vec3(0.11, 0.15, 0.22);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
