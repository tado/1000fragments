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
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 2.67 + ph), vnoise2(p * 2.67 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 2.67 + 2.96 * wq + vec2(1.7, 9.2) + t * 0.83),
                   vnoise2(p * 2.67 + 2.95 * wq + vec2(8.3, 2.8) - t * 0.30));
    v = vnoise2(p * 2.67 + 3.45 * wr) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 23.42);
    float gsh = hash21(vec2(grow, floor(t * 8.89))) - 0.5;
    float gx = p.x + gsh * 0.61;
    v = sin(gx * 15.00 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.88));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.94;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(time * 0.41) * q1;
	q2.x += sin(q2.y * 7.42 + time * 1.21) * 0.15;
	q2 = fract(q2 * 1.90) - 0.5;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.91);
	float d = 0.5 * (d1 + d2);
	vec3 col = palette(d * 1.15 + time * 0.00, vec3(0.56, 0.44, 0.43), vec3(0.47, 0.43, 0.38), vec3(1.13, 1.32, 0.98), vec3(0.99, 0.47, 0.64));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.97));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
