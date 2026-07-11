uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 3.65;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 9.73 - t * 5.01 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 6.48);
    float gsh = hash21(vec2(grow, floor(t * 3.23))) - 0.5;
    float gx = p.x + gsh * 0.97;
    v = sin(gx * 7.00 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 4.52));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.77;
	vec2 q1 = p; vec2 q2 = p;
	q1 = fract(q1 * 1.29) - 0.5;
	q1 = abs(q1) - 0.23;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.48);
	float d = d1 * d2;
	vec3 col = palette(d * 1.34 + time * 0.32, vec3(0.50, 0.57, 0.50), vec3(0.46, 0.35, 0.31), vec3(0.76, 1.14, 0.97), vec3(0.93, 0.89, 0.01));
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.11;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
