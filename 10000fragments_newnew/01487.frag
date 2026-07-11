uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.57 + 0.16 * cos(sa * 5.0 + t * 2.72 + ph);
    v = sin((sr - petal) * 19.05);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 2.86;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 23.91 - t * 1.02 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.44;
	vec2 q1 = p; vec2 q2 = p;
	{ float iv = dot(q1, q1) + 0.05; q1 = q1 / iv * 0.35; }
	q1 = (floor(q1 * 26.8) + 0.5) / 26.8;
	q2 = vec2(q2.x * q2.x - q2.y * q2.y, 2.0 * q2.x * q2.y) * 0.82;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.07);
	float d = 0.5 * (d1 + d2);
	vec3 col = vec3(0.49, 0.49, 0.32) * (0.07 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	col = fract(col * 2.29);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
