uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.83; vec2 jc = vec2(-0.78 + 0.3 * sin(t * 1.40 + ph), 0.71 + 0.3 * cos(t * 0.57 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 30; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 30.0 * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 10.59 + t * 3.27 + ph) + sin(p.y * 6.67 - t * 3.27 + ph)
        + sin((p.x + p.y) * 2.35 + t * 3.27 + ph) + sin(length(p) * 12.14 - t * 3.27 + ph));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 10; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.45 * sin(mf + 3.0) + ph), cos(t * 1.52 * cos(mf + 3.0) + ph));
        ms += 0.068 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.03;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ q2 = vec2(atan(q2.y, q2.x) * 1.20, length(q2) * 3.27 - time * 0.68); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.60);
	float d3 = fieldC(q3, time, 0.36);
	d2 = 0.5 * (d2 + d3);
	float d = 0.5 * (d1 + d2);
	vec3 col = palette(d * 1.48 + time * 0.35, vec3(0.43, 0.57, 0.49), vec3(0.40, 0.34, 0.45), vec3(1.32, 0.85, 1.35), vec3(0.08, 0.83, 0.52));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
