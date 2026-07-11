uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.24, 0.0)) * 30.45 - t * 4.19 + ph);
    float mb = sin(length(p + vec2(0.24, 0.0)) * 33.11 - t * 3.84 + ph);
    v = ma * mb;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 5.39;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 12.96 - t * 3.64 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.53;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(time * -0.93) * q1;
	{ q2 = vec2(atan(q2.y, q2.x) * 2.00, length(q2) * 4.04 - time * 0.34); }
	q2 = rot2(q2.y * -3.08 + time * 0.34) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.09);
	float d = abs(d1 - d2);
	vec3 col = hue(d * 0.84 + time * 0.31);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
