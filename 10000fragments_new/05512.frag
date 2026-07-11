uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 5.71;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 13.71 - t * 5.57 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 4.0 + qr * 3.48 * sin(t * 0.95) + t * 1.90 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.91;
	vec2 q1 = p; vec2 q2 = p;
	for(int fo = 0; fo < 2; fo++){ q1 = abs(q1) - 0.15; q1 = rot2(0.52) * q1; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 2.00);
	float d = min(d1, d2);
	vec3 col = vec3(0.38, 0.77, 0.85) * (0.13 / (abs(d) + 0.07));
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.40 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
