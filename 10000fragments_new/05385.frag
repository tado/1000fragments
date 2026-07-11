uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 17.55 + sin(p.y * 3.17 + t * 3.15) * 3.79 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.61; vec2 jc = vec2(0.22 + 0.3 * sin(t * 1.03 + ph), 0.05 + 0.3 * cos(t * 1.16 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 18; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 18.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; q1.x += 0.36 / wf * sin(wf * 1.93 * q1.y + time * 1.03); q1.y += 0.21 / wf * cos(wf * 2.94 * q1.x + time * 0.91); }
	q1 = (floor(q1 * 6.7) + 0.5) / 6.7;
	for(int fo = 0; fo < 4; fo++){ q2 = abs(q2) - 0.20; q2 = rot2(1.03) * q2; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.73);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.57));
	vec3 col = palette(d * 0.95 + time * 0.30, vec3(0.56, 0.42, 0.57), vec3(0.44, 0.45, 0.49), vec3(0.80, 0.71, 1.05), vec3(0.57, 0.44, 0.24));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
