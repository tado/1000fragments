uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.92; vec2 jc = vec2(0.28 + 0.3 * sin(t * 1.33 + ph), 0.59 + 0.3 * cos(t * 1.33 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 32; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(32) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(time * 0.42) * p;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.48 / wf * sin(wf * 3.24 * p.y + time * 0.77); p.y += 0.29 / wf * cos(wf * 1.74 * p.x + time * 1.44); }
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.38; p = rot2(2.28) * p; }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.80 + time * 0.09);
	col = mod(col * 1.40, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
