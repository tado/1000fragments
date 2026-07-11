uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.36) - 0.5;
    float rad = 0.25 + 0.12 * sin(t * 0.90 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 3.27;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 12.45 - t * 3.33 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.13;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(length(q1) * -1.38 + time * 0.71) * q1;
	q1 = fract(q1 * 1.36) - 0.5;
	q2.y += sin(q2.x * 3.25 + time * 2.19) * 0.28;
	q2 *= 2.41;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.90);
	float d = d1 * d2;
	vec3 col = vec3(0.73, 0.55, 0.50) * (0.07 / (abs(d) + 0.10));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
