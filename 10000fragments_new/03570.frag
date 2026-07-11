uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 7; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.49 * sin(mf + 3.0) + ph), cos(t * 0.93 * cos(mf + 3.0) + ph));
        ms += 0.020 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 9.22);
    float gsh = hash21(vec2(grow, floor(t * 3.83))) - 0.5;
    float gx = p.x + gsh * 0.61;
    v = sin(gx * 15.42 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 4.92));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 4.23;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 18.53 - t * 1.20 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.73;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ q1 = vec2(atan(q1.y, q1.x) * 1.63, length(q1) * 2.11 - time * 0.68); }
	q2 *= 2.67;
	q3 *= 1.47;
	q3 = fract(q3 * 2.40) - 0.5;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.73);
	float d3 = fieldC(q3, time, 0.47);
	d2 = max(d2, d3);
	float d = d1 * d2;
	vec3 col = palette(d * 0.57 + time * 0.28, vec3(0.47, 0.44, 0.53), vec3(0.49, 0.47, 0.46), vec3(0.92, 0.74, 0.76), vec3(0.75, 0.48, 0.66));
	col = clamp((col - 0.5) * 1.91 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
