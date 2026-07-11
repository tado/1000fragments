uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 2.14, t * 0.92 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.56; vec2 jc = vec2(0.24 + 0.3 * sin(t * 1.24 + ph), -0.49 + 0.3 * cos(t * 1.24 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 40; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(40) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.44;
	{ p = vec2(atan(p.y, p.x) * 1.74, length(p) * 5.48 - time * 0.69); }
	p = rot2(p.y * 2.29 + time * 0.84) * p;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.46 / wf * sin(wf * 3.65 * p.y + time * 0.82); p.y += 0.48 / wf * cos(wf * 3.01 * p.x + time * 0.63); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.68);
	float d = d1 * d2;
	vec3 col = palette(d * 0.95 + time * 0.05, vec3(0.52, 0.48, 0.42), vec3(0.32, 0.48, 0.35), vec3(0.91, 1.03, 0.83), vec3(0.76, 0.59, 0.18));
	col = mod(col * 1.20, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
