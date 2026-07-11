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
    float ma = sin(length(p - vec2(0.57, 0.0)) * 39.28 - t * 3.36 + ph);
    float mb = sin(length(p + vec2(0.57, 0.0)) * 33.65 - t * 6.13 + ph);
    v = ma * mb;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 4.06 + ph), vnoise2(p * 4.06 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 4.06 + 1.50 * wq + vec2(1.7, 9.2) + t * 1.19),
                   vnoise2(p * 4.06 + 3.10 * wq + vec2(8.3, 2.8) - t * 0.80));
    v = vnoise2(p * 4.06 + 2.62 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.40;
	vec2 q1 = p; vec2 q2 = p;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.88);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.86));
	vec3 col = hue(d * 1.42 + time * 0.30);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.20 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
