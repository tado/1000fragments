uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 5.0 + qr * 7.90 * sin(t * 0.87) + t * 3.24 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 3.75;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 17.74 - t * 5.30 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.45;
	vec2 q1 = p; vec2 q2 = p;
	q2 = rot2(q2.y * 1.15 + (time * 0.52) * 1.09) * q2;
	float d1 = fieldA(q1, (time * 0.52), 0.0);
	float d2 = fieldB(q2, (time * 0.52), 1.26);
	float d = mix(d1, d2, 0.5 + 0.5 * sin((time * 0.52) * 0.46));
	vec3 col = vec3(0.73, 0.61, 0.67) * (0.10 / (abs((d)) + 0.05));
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.60);
	col = clamp(col, 0.0, 1.0) * vec3(0.989, 1.000, 0.950) * 1.00 + 0.013;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
