uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 5.0 + t * 1.28 + ph), sin(lt * 5.0 + t * 1.41)) * 0.88;
        md = min(md, length(p - lp)); }
    v = exp(-md * 5.05) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.50, 0.0)) * 37.93 - t * 1.51 + ph);
    float mb = sin(length(p + vec2(0.50, 0.0)) * 12.33 - t * 5.29 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	q1 += vec2(0.54, -0.54) * sin(length(q1) * 5.69 - time * 1.25) * 0.20;
	q1 *= 2.85;
	q2 = rot2(time * 1.01) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.45);
	float d = abs(d1 - d2);
	vec3 col = vec3(0.99, 0.70, 0.75) * (0.09 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
