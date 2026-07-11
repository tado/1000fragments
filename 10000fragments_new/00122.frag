uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 8.30 + t * 1.89 + ph) + sin(p.y * 11.80 - t * 1.89 + ph)
        + sin((p.x + p.y) * 7.48 + t * 1.89 + ph) + sin(length(p) * 13.23 - t * 1.89 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 6.13;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 12.54 - t * 3.79 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.87;
	vec2 q1 = p; vec2 q2 = p;
	q2 = fract(q2 * 2.75) - 0.5;
	q2 *= 2.04;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.30);
	float d = max(d1, d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.17, 0.01, 0.23), vec3(0.81, 0.74, 0.90), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
