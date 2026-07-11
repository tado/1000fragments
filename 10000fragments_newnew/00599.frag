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
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 9.64 + sr * 10.75 - t * 2.64 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 3.50 + ph), vnoise2(p * 3.50 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 3.50 + 3.05 * wq + vec2(1.7, 9.2) + t * 0.46),
                   vnoise2(p * 3.50 + 2.76 * wq + vec2(8.3, 2.8) - t * 1.05));
    v = vnoise2(p * 3.50 + 3.34 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.43;
	vec2 q1 = p; vec2 q2 = p;
	{ float iv = dot(q1, q1) + 0.05; q1 = q1 / iv * 0.55; }
	q1 = sin(q1 * 2.55 + time * 2.44) * 1.31;
	q2 = (floor(q2 * 13.6) + 0.5) / 13.6;
	{ float iv = dot(q2, q2) + 0.05; q2 = q2 / iv * 0.97; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.89);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.25));
	vec3 col = hue(d * 0.69 + time * 0.27);
	col = mod(col * 1.29, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
