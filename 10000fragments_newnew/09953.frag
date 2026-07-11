uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.10; vec2 jc = vec2(-0.74 + 0.3 * sin(t * 1.48 + ph), -0.08 + 0.3 * cos(t * 0.37 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 40; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 40.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.26;
	{ p = vec2(atan(p.y, p.x) * 2.68, length(p) * 3.21 - time * 0.56); }
	p *= 2.80;
	p = rot2(length(p) * -1.24 + time * 0.71) * p;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.47 / wf * sin(wf * 3.57 * p.y + time * 1.53); p.y += 0.44 / wf * cos(wf * 2.03 * p.x + time * 1.99); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.21, 0.98, 1.27) + vec3(0.01, 0.07, 0.03);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.03 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
