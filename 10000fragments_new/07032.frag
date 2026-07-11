uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 4.0 + t * 1.19 + ph), sin(lt * 4.0 + t * 0.99)) * 0.60;
        md = min(md, length(p - lp)); }
    v = exp(-md * 3.24) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 6.72 + sr * 5.44 - t * 0.77 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.20;
	vec2 q1 = p; vec2 q2 = p;
	q1.x += sin(q1.y * 3.07 + time * 3.87) * 0.33;
	q1 = abs(q1);
	q2 = rot2(1.01) * q2;
	q2 = abs(q2) - 0.21;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.10);
	float d = max(d1, d2);
	vec3 col = vec3(0.66, 0.96, 0.68) * (0.17 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
