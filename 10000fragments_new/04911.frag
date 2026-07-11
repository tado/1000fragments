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
    float grow = floor(p.y * 13.06);
    float gsh = hash21(vec2(grow, floor(t * 5.87))) - 0.5;
    float gx = p.x + gsh * 0.97;
    v = sin(gx * 19.08 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.59));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 4.10 + ph), vnoise2(p * 4.10 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 4.10 + 2.82 * wq + vec2(1.7, 9.2) + t * 1.14),
                   vnoise2(p * 4.10 + 3.27 * wq + vec2(8.3, 2.8) - t * 0.98));
    v = vnoise2(p * 4.10 + 1.14 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.68;
	vec2 q1 = p; vec2 q2 = p;
	q2 = rot2(length(q2) * -3.37 + time * 1.05) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.20);
	float d = 0.5 * (d1 + d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 4.69 + time * 0.10);
	col = mod(col * 2.02, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
