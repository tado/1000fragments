uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 1.0 + t * 0.45 + ph), sin(lt * 5.0 + t * 1.25)) * 0.51;
        md = min(md, length(p - lp)); }
    v = exp(-md * 6.89) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 10.77 + sr * 12.91 - t * 5.00 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.35;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(time * 1.23) * q1;
	for(int fo = 0; fo < 5; fo++){ q1 = abs(q1) - 0.30; q1 = rot2(0.48) * q1; }
	q2.x += sin(q2.y * 3.76 + time * 2.96) * 0.29;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.82);
	float d = max(d1, d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 4.59 + time * 0.97);
	col = clamp((col - 0.5) * 1.34 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
