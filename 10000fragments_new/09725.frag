uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.44; vec2 jc = vec2(0.24 + 0.3 * sin(t * 1.36 + ph), 0.31 + 0.3 * cos(t * 0.36 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 39; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 39.0 * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 3.13 + ph), vnoise2(p * 3.13 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 3.13 + 2.62 * wq + vec2(1.7, 9.2) + t * 0.97),
                   vnoise2(p * 3.13 + 3.38 * wq + vec2(8.3, 2.8) - t * 0.79));
    v = vnoise2(p * 3.13 + 2.09 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.02;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(q1.y * -3.85 + time * 0.87) * q1;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; q1.x += 0.45 / wf * sin(wf * 2.59 * q1.y + time * 1.60); q1.y += 0.33 / wf * cos(wf * 3.26 * q1.x + time * 1.05); }
	q2 = rot2(2.52) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.59);
	float d = 0.5 * (d1 + d2);
	vec3 col = vec3(0.63, 0.60, 0.70) * (0.15 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
