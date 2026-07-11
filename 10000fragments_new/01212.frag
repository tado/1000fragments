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
    vec2 wq = vec2(vnoise2(p * 2.27 + ph), vnoise2(p * 2.27 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 2.27 + 3.43 * wq + vec2(1.7, 9.2) + t * 0.63),
                   vnoise2(p * 2.27 + 2.85 * wq + vec2(8.3, 2.8) - t * 1.20));
    v = vnoise2(p * 2.27 + 3.90 * wr) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.85; vec2 jc = vec2(-0.59 + 0.3 * sin(t * 1.40 + ph), 0.73 + 0.3 * cos(t * 1.45 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 30; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 30.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.59;
	vec2 q1 = p; vec2 q2 = p;
	q1 = (floor(q1 * 16.6) + 0.5) / 16.6;
	q1 = fract(q1 * 2.37) - 0.5;
	q2 = fract(q2 * 1.67) - 0.5;
	q2 = abs(q2) - 0.48;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.56);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.91));
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.79 + time * 0.14);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.44));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
