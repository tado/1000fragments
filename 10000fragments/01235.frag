uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 4.84;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 12.25 - t * 2.35 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 2.48 + t * 0.76) - 0.5) * 2.0;
    v = sin((p.y * 3.20 + zx * 0.85 + t * 1.85) * 3.1415927 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.91;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(time * -0.32) * q1;
	q1 *= 2.59;
	q2 = abs(q2);
	q2 = (floor(q2 * 8.8) + 0.5) / 8.8;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.99);
	float d = abs(d1 - d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.01 + time * 0.70);
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
