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
    vec2 wq = vec2(vnoise2(p * 4.34 + ph), vnoise2(p * 4.34 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 4.34 + 2.58 * wq + vec2(1.7, 9.2) + t * 0.94),
                   vnoise2(p * 4.34 + 1.68 * wq + vec2(8.3, 2.8) - t * 0.85));
    v = vnoise2(p * 4.34 + 1.75 * wr) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 19.93);
    float gsh = hash21(vec2(grow, floor(t * 4.49))) - 0.5;
    float gx = p.x + gsh * 0.39;
    v = sin(gx * 15.45 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 4.89));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.87;
	vec2 q1 = p; vec2 q2 = p;
	q1 *= 2.74;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.72);
	float d = d1 * d2;
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.64 + time * 0.23);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
