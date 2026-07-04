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
    float wa = sin(p.x * 5.90 + t * 0.69 + ph) * 0.7;
    float wb = sin(p.y * 11.46 - t * 1.24 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.27;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 4.43 + ph), vnoise2(p * 4.43 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 4.43 + 2.54 * wq + vec2(1.7, 9.2) + t * 0.50),
                   vnoise2(p * 4.43 + 2.58 * wq + vec2(8.3, 2.8) - t * 0.95));
    v = vnoise2(p * 4.43 + 3.11 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.89;
	vec2 q1 = p; vec2 q2 = p;
	q1 = sin(q1 * 2.99 + time * 0.91) * 1.14;
	{ q2 = vec2(atan(q2.y, q2.x) * 2.04, length(q2) * 5.76 - time * 0.61); }
	q2 = mix(q2, q2.yx, 0.5 + 0.5 * sin(time * 0.76));
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.11);
	float d = max(d1, d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.26 + time * 0.68);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
