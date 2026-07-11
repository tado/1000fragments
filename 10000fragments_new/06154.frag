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
    vec2 wq = vec2(vnoise2(p * 3.12 + ph), vnoise2(p * 3.12 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 3.12 + 3.80 * wq + vec2(1.7, 9.2) + t * 0.63),
                   vnoise2(p * 3.12 + 2.62 * wq + vec2(8.3, 2.8) - t * 1.14));
    v = vnoise2(p * 3.12 + 2.06 * wr) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 13.46 + t * 3.61 + ph) + sin(p.y * 7.94 - t * 3.61 + ph)
        + sin((p.x + p.y) * 6.84 + t * 3.61 + ph) + sin(length(p) * 17.02 - t * 3.61 + ph));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 13.67);
    float gsh = hash21(vec2(grow, floor(t * 4.47))) - 0.5;
    float gx = p.x + gsh * 0.91;
    v = sin(gx * 7.56 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 4.80));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.54);
	float d3 = fieldC(q3, time, 0.14);
	d2 = min(d2, d3);
	float d = d1 * d2;
	vec3 col = vec3(0.74, 0.53, 0.58) * (0.21 / (abs(d) + 0.09));
	col = col / (1.0 + col);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.10;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
