uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 7.0 + qr * 5.62 * sin(t * 0.95) + t * 2.89 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 3.96 + t * 3.41 + ph) + sin(p.y * 9.45 - t * 3.41 + ph)
        + sin((p.x + p.y) * 8.16 + t * 3.41 + ph) + sin(length(p) * 12.52 - t * 3.41 + ph));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 18.81);
    float gsh = hash21(vec2(grow, floor(t * 4.37))) - 0.5;
    float gx = p.x + gsh * 0.56;
    v = sin(gx * 6.56 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.57));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.35;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q2 = rot2(2.10) * q2;
	q2 = (floor(q2 * 23.7) + 0.5) / 23.7;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.08);
	float d3 = fieldC(q3, time, 1.34);
	d2 = max(d2, d3);
	float d = 0.5 * (d1 + d2);
	vec3 col = vec3(0.95, 0.47, 0.72) * (0.07 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.36 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
