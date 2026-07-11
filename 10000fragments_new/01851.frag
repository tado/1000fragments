uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.52, 0.0)) * 30.80 - t * 4.29 + ph);
    float mb = sin(length(p + vec2(0.52, 0.0)) * 16.79 - t * 3.64 + ph);
    v = ma * mb;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 1.0 + t * 1.09 + ph), sin(lt * 1.0 + t * 0.38)) * 0.69;
        md = min(md, length(p - lp)); }
    v = exp(-md * 7.17) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.70;
	vec2 q1 = p; vec2 q2 = p;
	{ float lr = log(length(q1) + 0.001); float la = atan(q1.y, q1.x); q1 = vec2(la * 2.34, lr * 1.93 + time * -0.31); }
	q2 *= 2.58;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.18);
	float d = d1 * d2;
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.19, 0.18, 0.28), vec3(0.96, 0.71, 0.84), cc);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.93 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
