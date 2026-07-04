uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 4.96 + t * 3.81 + ph) + sin(p.y * 11.49 - t * 3.81 + ph)
        + sin((p.x + p.y) * 3.33 + t * 3.81 + ph) + sin(length(p) * 3.35 - t * 3.81 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 3.0 + t * 0.87 + ph), sin(lt * 5.0 + t * 1.48)) * 0.86;
        md = min(md, length(p - lp)); }
    v = exp(-md * 8.58) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	{ float fr = length(q1); q1 *= 1.0 + -0.51 * fr * fr; }
	q1 = abs(q1);
	for(int fo = 0; fo < 3; fo++){ q2 = abs(q2) - 0.52; q2 = rot2(2.38) * q2; }
	q2 = fract(q2 * 2.49) - 0.5;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.68);
	float d = min(d1, d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.00, 0.15, 0.15), vec3(0.79, 0.88, 0.45), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
