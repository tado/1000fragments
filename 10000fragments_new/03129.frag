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
    v = 0.25 * (sin(p.x * 10.48 + t * 2.81 + ph) + sin(p.y * 5.29 - t * 2.81 + ph)
        + sin((p.x + p.y) * 10.39 + t * 2.81 + ph) + sin(length(p) * 17.08 - t * 2.81 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 2.38 + ph), vnoise2(p * 2.38 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 2.38 + 1.21 * wq + vec2(1.7, 9.2) + t * 0.50),
                   vnoise2(p * 2.38 + 3.28 * wq + vec2(8.3, 2.8) - t * 0.78));
    v = vnoise2(p * 2.38 + 3.91 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.57;
	vec2 q1 = p; vec2 q2 = p;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; q2.x += 0.39 / wf * sin(wf * 3.38 * q2.y + time * 2.01); q2.y += 0.39 / wf * cos(wf * 3.76 * q2.x + time * 0.86); }
	{ float fr = length(q2); q2 *= 1.0 + -0.39 * fr * fr; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.48);
	float d = min(d1, d2);
	vec3 col = vec3(0.81, 0.23, 0.51) * (0.19 / (abs(d) + 0.09));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
