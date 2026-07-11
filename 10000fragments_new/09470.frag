uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 5; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.21 * sin(mf + 3.0) + ph), cos(t * 0.83 * cos(mf + 3.0) + ph));
        ms += 0.072 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.16; vec2 jc = vec2(-0.57 + 0.3 * sin(t * 0.49 + ph), -0.09 + 0.3 * cos(t * 1.77 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 32; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 32.0 * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 3.09 + ph), vnoise2(p * 3.09 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 3.09 + 2.25 * wq + vec2(1.7, 9.2) + t * 0.85),
                   vnoise2(p * 3.09 + 2.85 * wq + vec2(8.3, 2.8) - t * 0.74));
    v = vnoise2(p * 3.09 + 2.16 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.08;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q2 += vec2(0.08, -0.51) * sin(length(q2) * 3.59 - time * 1.16) * 0.20;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.19);
	float d3 = fieldC(q3, time, 0.56);
	d2 = 0.5 * (d2 + d3);
	float d = abs(d1 - d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.01, 0.00, 0.31), vec3(0.89, 0.68, 0.54), cc);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.21));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
