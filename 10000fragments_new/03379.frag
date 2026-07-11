uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 12.0 + qr * 4.58 * sin(t * 0.76) + t * 1.39 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 5.0 + t * 0.52 + ph), sin(lt * 4.0 + t * 1.27)) * 0.92;
        md = min(md, length(p - lp)); }
    v = exp(-md * 5.23) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.48;
	vec2 q1 = p; vec2 q2 = p;
	q1 += vec2(-0.44, -0.84) * sin(length(q1) * 2.29 - time * 0.82) * 0.31;
	{ float ka = atan(q1.y, q1.x); float kr = length(q1); float kn = 9.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q1 = kr * vec2(cos(ka), sin(ka)); }
	q2 *= 2.38;
	{ q2 = vec2(atan(q2.y, q2.x) * 1.45, length(q2) * 4.70 - time * 0.42); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.93);
	float d = min(d1, d2);
	vec3 col = vec3(0.71, 0.18, 0.41) * (0.21 / (abs(d) + 0.07));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
