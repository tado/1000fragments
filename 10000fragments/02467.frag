uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 16.05 + t * 4.21 + ph) + sin(p.y * 3.71 - t * 4.62 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.10; vec2 jc = vec2(0.20 + 0.3 * sin(t * 0.46 + ph), -0.10 + 0.3 * cos(t * 0.46 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 18; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(18) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float fr = length(p); p *= 1.0 + -0.72 * fr * fr; }
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.48 / wf * sin(wf * 3.85 * p.y + time * 0.92); p.y += 0.48 / wf * cos(wf * 2.71 * p.x + time * 1.64); }
	p = rot2(0.44) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.59);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.20 + time * 0.20, vec3(0.59, 0.41, 0.47), vec3(0.36, 0.41, 0.38), vec3(1.25, 1.22, 1.39), vec3(0.08, 0.88, 0.27));
	col = fract(col * 1.91);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
