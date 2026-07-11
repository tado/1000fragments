uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.16; vec2 jc = vec2(-0.18 + 0.3 * sin(t * 0.84 + ph), -0.13 + 0.3 * cos(t * 0.84 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 36; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(36) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.16;
	p = fract(p * 2.76) - 0.5;
	p = rot2(2.59) * p;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.50 / wf * sin(wf * 3.61 * p.y + time * 1.24); p.y += 0.25 / wf * cos(wf * 2.58 * p.x + time * 1.76); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.10), field(p, time, 2.21));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
