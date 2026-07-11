uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 6.15, t * 1.28 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.49; vec2 jc = vec2(-0.43 + 0.3 * sin(t * 1.28 + ph), 0.64 + 0.3 * cos(t * 1.28 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 30; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(30) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.92;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.39; p = rot2(0.72) * p; }
	p = abs(p);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.66);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.42 + time * 0.02, vec3(0.52, 0.51, 0.47), vec3(0.41, 0.36, 0.39), vec3(1.40, 1.34, 0.86), vec3(0.55, 0.44, 0.61));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
