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
    vec2 wq = vec2(vnoise2(p * 1.79 + ph), vnoise2(p * 1.79 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 1.79 + 2.88 * wq + vec2(1.7, 9.2) + t * 0.34),
                   vnoise2(p * 1.79 + 3.95 * wq + vec2(8.3, 2.8) - t * 0.67));
    v = vnoise2(p * 1.79 + 2.26 * wr) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.32; vec2 jc = vec2(-0.03 + 0.3 * sin(t * 1.52 + ph), 0.10 + 0.3 * cos(t * 0.96 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 40; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 40.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	{ float iv = dot(q2, q2) + 0.05; q2 = q2 / iv * 0.36; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.84);
	float d = abs(d1 - d2);
	vec3 col = vec3(0.94, 0.38, 0.87) * (0.06 / (abs(d) + 0.07));
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.69));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
