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
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 4.74 + ph), vnoise2(p * 4.74 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 4.74 + 3.32 * wq + vec2(1.7, 9.2) + t * 1.11),
                   vnoise2(p * 4.74 + 1.84 * wq + vec2(8.3, 2.8) - t * 0.99));
    v = vnoise2(p * 4.74 + 2.54 * wr) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 15.30 + sin(p.y * 5.55 + t * 5.37) * 1.14 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	q1 = fract(q1 * 1.02) - 0.5;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; q2.x += 0.38 / wf * sin(wf * 3.54 * q2.y + time * 1.86); q2.y += 0.45 / wf * cos(wf * 1.54 * q2.x + time * 0.99); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.94);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.85 + time * 0.31, vec3(0.42, 0.51, 0.48), vec3(0.41, 0.33, 0.47), vec3(0.71, 0.93, 1.26), vec3(0.88, 0.99, 0.51));
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
