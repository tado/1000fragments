uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 7.36 + t * 1.16 + ph) + sin(p.y * 4.36 - t * 1.16 + ph)
        + sin((p.x + p.y) * 10.61 + t * 1.16 + ph) + sin(length(p) * 13.37 - t * 1.16 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.40; vec2 jc = vec2(-0.02 + 0.3 * sin(t * 1.48 + ph), 0.34 + 0.3 * cos(t * 0.91 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 31; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 31.0 * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.93; vec2 jc = vec2(-0.18 + 0.3 * sin(t * 0.92 + ph), 0.31 + 0.3 * cos(t * 1.62 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 22; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 22.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.91);
	float d3 = fieldC(q3, time, 0.68);
	d2 = max(d2, d3);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.57 + time * 0.11, vec3(0.55, 0.45, 0.52), vec3(0.45, 0.33, 0.32), vec3(1.18, 0.99, 0.84), vec3(0.55, 0.21, 0.39));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
