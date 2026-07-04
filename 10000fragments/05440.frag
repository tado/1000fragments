uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.15;
    for(int ki = 0; ki < 4; ki++){ kp = abs(kp) - 0.43; kp = rot2(2.58) * kp; kp *= 1.23; }
    v = sin(kp.x * 1.16 - t * 1.51 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.34, 0.0)) * 22.31 - t * 1.45 + ph);
    float mb = sin(length(p + vec2(0.34, 0.0)) * 17.96 - t * 2.55 + ph);
    v = ma * mb;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.42; vec2 jc = vec2(0.06 + 0.3 * sin(t * 1.52 + ph), -0.23 + 0.3 * cos(t * 1.65 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 26; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 26.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ float iv = dot(q1, q1) + 0.05; q1 = q1 / iv * 0.98; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.70);
	float d3 = fieldC(q3, time, 0.93);
	d2 = 0.5 * (d2 + d3);
	float d = 0.5 * (d1 + d2);
	vec3 col = palette(d * 0.54 + time * 0.34, vec3(0.46, 0.55, 0.47), vec3(0.39, 0.43, 0.32), vec3(0.84, 0.93, 0.79), vec3(0.20, 0.53, 0.33));
	col = fract(col * 2.25);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
