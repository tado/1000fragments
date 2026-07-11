uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 10.0 + qr * 5.70 * sin(t * 1.17) + t * 1.92 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 4.0 + t * 0.59 + ph), sin(lt * 1.0 + t * 0.44)) * 0.86;
        md = min(md, length(p - lp)); }
    v = exp(-md * 9.61) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.70;
	vec2 q1 = p; vec2 q2 = p;
	q2 = rot2(2.25) * q2;
	q2 += vec2(0.22, -0.12) * sin(length(q2) * 5.97 - time * 1.61) * 0.17;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.85);
	float d = abs(d1 - d2);
	vec3 col = vec3(0.68, 0.30, 0.42) * (0.06 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
