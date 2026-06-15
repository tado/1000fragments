uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 8; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.41 * sin(mf + 3.0) + ph), cos(t * 2.41 * cos(mf + 3.0) + ph));
        ms += 0.037 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.52; vec2 jc = vec2(-0.02 + 0.3 * sin(t * 0.71 + ph), 0.52 + 0.3 * cos(t * 0.71 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 40; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(40) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.25;
	p = rot2(length(p) * 2.19 + time * 1.06) * p;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.43 / wf * sin(wf * 3.89 * p.y + time * 1.86); p.y += 0.49 / wf * cos(wf * 2.30 * p.x + time * 1.99); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.01);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.53 + time * 0.07, vec3(0.45, 0.42, 0.52), vec3(0.49, 0.32, 0.44), vec3(0.78, 1.26, 1.25), vec3(0.48, 0.66, 0.70));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
