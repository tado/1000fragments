uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 14; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.83 * sin(mf + 3.0) + ph), cos(t * 1.46 * cos(mf + 3.0) + ph));
        ms += 0.064 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.26; vec2 jc = vec2(-0.34 + 0.3 * sin(t * 1.25 + ph), -0.05 + 0.3 * cos(t * 1.53 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 32; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 32.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.69;
	vec2 q1 = p; vec2 q2 = p;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.15);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.26));
	vec3 col = palette(d * 1.02 + time * 0.22, vec3(0.49, 0.41, 0.49), vec3(0.45, 0.48, 0.39), vec3(1.34, 1.35, 1.02), vec3(0.53, 0.73, 0.92));
	col *= 0.89 + 0.14 * sin(gl_FragCoord.y * 1.04 + time * 16.44);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
