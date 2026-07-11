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
    vec2 z = p * 1.50; vec2 jc = vec2(0.07 + 0.3 * sin(t * 0.94 + ph), -0.62 + 0.3 * cos(t * 0.99 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 34; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 34.0 * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 2.26 + ph), vnoise2(p * 2.26 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 2.26 + 2.52 * wq + vec2(1.7, 9.2) + t * 0.73),
                   vnoise2(p * 2.26 + 1.64 * wq + vec2(8.3, 2.8) - t * 1.00));
    v = vnoise2(p * 2.26 + 2.53 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.35);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.34));
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.51, 0.51, 1.12) + vec3(0.12, 0.21, 0.07);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.51 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
