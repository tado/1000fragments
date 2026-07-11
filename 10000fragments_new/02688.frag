uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.42 + 0.26 * pow(abs(cos(ra * 2.0 + t * 2.68)), 1.65);
    v = sin((rr - pet) * 15.52 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 3.17;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 9.14 - t * 3.52 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.70;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(time * 0.39) * q1;
	q1 = rot2(q1.y * -1.18 + time * 0.39) * q1;
	{ float fr = length(q2); q2 *= 1.0 + -0.66 * fr * fr; }
	q2 = fract(q2 * 2.04) - 0.5;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.10);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.18));
	vec3 col = hue(d * 0.67 + time * 0.21);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
