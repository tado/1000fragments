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
    vec2 wq = vec2(vnoise2(p * 4.19 + ph), vnoise2(p * 4.19 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 4.19 + 1.49 * wq + vec2(1.7, 9.2) + t * 0.51),
                   vnoise2(p * 4.19 + 3.29 * wq + vec2(8.3, 2.8) - t * 0.91));
    v = vnoise2(p * 4.19 + 3.89 * wr) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 11.15 + t * 2.82 + ph) + sin(p.y * 3.64 - t * 2.82 + ph)
        + sin((p.x + p.y) * 10.89 + t * 2.82 + ph) + sin(length(p) * 5.01 - t * 2.82 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.40;
	vec2 q1 = p; vec2 q2 = p;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; q1.x += 0.40 / wf * sin(wf * 3.26 * q1.y + time * 1.24); q1.y += 0.23 / wf * cos(wf * 1.53 * q1.x + time * 0.82); }
	{ float lr = log(length(q2) + 0.001); float la = atan(q2.y, q2.x); q2 = vec2(la * 1.51, lr * 1.32 + time * 0.56); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.56);
	float d = abs(d1 - d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.20, 0.29, 0.38), vec3(0.67, 0.75, 0.74), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
