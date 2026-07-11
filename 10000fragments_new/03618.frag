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
    for(int mi = 0; mi < 7; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.14 * sin(mf + 3.0) + ph), cos(t * 0.75 * cos(mf + 3.0) + ph));
        ms += 0.087 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 2.22 + ph), vnoise2(p * 2.22 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 2.22 + 2.34 * wq + vec2(1.7, 9.2) + t * 0.98),
                   vnoise2(p * 2.22 + 2.22 * wq + vec2(8.3, 2.8) - t * 0.63));
    v = vnoise2(p * 2.22 + 1.18 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	{ q1 = vec2(atan(q1.y, q1.x) * 2.92, length(q1) * 2.40 - time * 0.71); }
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; q1.x += 0.48 / wf * sin(wf * 2.35 * q1.y + time * 1.05); q1.y += 0.39 / wf * cos(wf * 3.98 * q1.x + time * 1.10); }
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; q2.x += 0.39 / wf * sin(wf * 2.45 * q2.y + time * 1.77); q2.y += 0.44 / wf * cos(wf * 3.23 * q2.x + time * 1.05); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.24);
	float d = 0.5 * (d1 + d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 1.69 + time * 0.68);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
