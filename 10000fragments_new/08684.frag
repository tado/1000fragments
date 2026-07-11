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
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 3.83 + ph), vnoise2(p * 3.83 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 3.83 + 3.32 * wq + vec2(1.7, 9.2) + t * 0.50),
                   vnoise2(p * 3.83 + 1.40 * wq + vec2(8.3, 2.8) - t * 0.61));
    v = vnoise2(p * 3.83 + 3.72 * wr) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 19.24);
    float gsh = hash21(vec2(grow, floor(t * 4.13))) - 0.5;
    float gx = p.x + gsh * 0.83;
    v = sin(gx * 11.44 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.46));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(q1.y * -2.82 + time * 0.40) * q1;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.19);
	float d = 0.5 * (d1 + d2);
	vec3 col = hue(d * 0.72 + time * 0.29);
	col = clamp((col - 0.5) * 1.29 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
