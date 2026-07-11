uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.43; vec2 jc = vec2(-0.34 + 0.3 * sin(t * 1.76 + ph), 0.44 + 0.3 * cos(t * 1.35 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 16; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 16.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.98;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.27; p = rot2(0.94) * p; }
	p = (floor(p * 22.9) + 0.5) / 22.9;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.45 / wf * sin(wf * 2.08 * p.y + time * 0.91); p.y += 0.26 / wf * cos(wf * 2.25 * p.x + time * 1.87); }
	p = rot2(time * -0.54) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.61, 0.83, 0.74) * (0.23 / (abs(d) + 0.08));
	col = col / (1.0 + col);
	col = fract(col * 1.38);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
