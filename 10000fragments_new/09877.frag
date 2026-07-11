uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 15.35 + vec2(t * 1.02, -t * 1.12) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.61; vec2 jc = vec2(-0.36 + 0.3 * sin(t * 1.04 + ph), 0.27 + 0.3 * cos(t * 1.22 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 17; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 17.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.87;
	vec2 q1 = p; vec2 q2 = p;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.73);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.24));
	vec3 col = palette(d * 1.39 + time * 0.17, vec3(0.45, 0.41, 0.50), vec3(0.46, 0.47, 0.41), vec3(1.23, 1.05, 1.08), vec3(0.22, 0.37, 0.90));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.08 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
