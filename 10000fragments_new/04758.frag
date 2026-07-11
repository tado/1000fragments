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
    v = sin(p.x * 9.68 + sin(p.y * 5.82 + t * 4.45) * 2.48 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 4.36 + ph), vnoise2(p * 4.36 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 4.36 + 2.61 * wq + vec2(1.7, 9.2) + t * 0.86),
                   vnoise2(p * 4.36 + 1.96 * wq + vec2(8.3, 2.8) - t * 0.67));
    v = vnoise2(p * 4.36 + 1.39 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.87;
	vec2 q1 = p; vec2 q2 = p;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; q1.x += 0.33 / wf * sin(wf * 2.97 * q1.y + time * 0.76); q1.y += 0.32 / wf * cos(wf * 3.58 * q1.x + time * 1.75); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.57);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.57 + time * 0.17, vec3(0.51, 0.52, 0.55), vec3(0.47, 0.32, 0.39), vec3(1.18, 0.79, 1.14), vec3(0.75, 0.11, 0.22));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
