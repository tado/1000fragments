uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 6.43;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 13.29 - t * 2.55 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float pa = atan(p.y, p.x) + t * 0.44;
    float pk = 6.2831853 / 3.0;
    float pd = cos(floor(0.5 + pa / pk) * pk - pa) * length(p);
    v = sin(pd * 23.83 - t * 1.62 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	{ q1 = vec2(atan(q1.y, q1.x) * 2.83, length(q1) * 2.54 - time * 0.46); }
	q1.x += sin(q1.y * 4.57 + time * 1.43) * 0.38;
	q2 = rot2(q2.y * -3.37 + time * 0.48) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.67);
	float d = min(d1, d2);
	vec3 col = vec3(0.57, 0.95, 0.30) * (0.22 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
