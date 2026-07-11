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
    float grow = floor(p.y * 18.04);
    float gsh = hash21(vec2(grow, floor(t * 9.24))) - 0.5;
    float gx = p.x + gsh * 1.02;
    v = sin(gx * 10.23 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.50));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 1.76 + ph), vnoise2(p * 1.76 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 1.76 + 2.87 * wq + vec2(1.7, 9.2) + t * 0.94),
                   vnoise2(p * 1.76 + 2.75 * wq + vec2(8.3, 2.8) - t * 0.70));
    v = vnoise2(p * 1.76 + 3.32 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.48);
	float d = 0.5 * (d1 + d2);
	vec3 col = vec3(0.27, 0.88, 0.83) * (0.07 / (abs(d) + 0.08));
	col = col / (1.0 + col);
	col = mod(col * 1.23, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
