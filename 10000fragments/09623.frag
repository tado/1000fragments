uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.84; vec2 jc = vec2(0.11 + 0.3 * sin(t * 1.18 + ph), 0.39 + 0.3 * cos(t * 1.18 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 19; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(19) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 31.77 - t * 1.41 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.28;
	p = fract(p * 1.30) - 0.5;
	p *= 1.89;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.47 / wf * sin(wf * 1.87 * p.y + time * 1.37); p.y += 0.37 / wf * cos(wf * 3.65 * p.x + time * 1.37); }
	p = rot2(time * -1.20) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.63);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 0.59 + time * 0.17, vec3(0.44, 0.59, 0.45), vec3(0.32, 0.41, 0.36), vec3(1.13, 1.30, 1.34), vec3(0.08, 0.20, 0.07));
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
