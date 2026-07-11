uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 8; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.43 * sin(mf + 3.0) + ph), cos(t * 2.25 * cos(mf + 3.0) + ph));
        ms += 0.065 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 1.0 + t * 0.45 + ph), sin(lt * 3.0 + t * 1.11)) * 0.80;
        md = min(md, length(p - lp)); }
    v = exp(-md * 8.72) * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 7.01 + vec2(t * 2.22, -t * 0.36) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 *= 2.96;
	q3 = rot2(length(q3) * -3.08 + time * 0.34) * q3;
	q3 = (floor(q3 * 9.9) + 0.5) / 9.9;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.04);
	float d3 = fieldC(q3, time, 0.84);
	d2 = max(d2, d3);
	float d = 0.5 * (d1 + d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.97 + time * 0.21);
	col *= 0.81 + 0.18 * sin(gl_FragCoord.y * 1.01 + time * 8.86);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
