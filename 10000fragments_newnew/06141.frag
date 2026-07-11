uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 3.0 + t * 1.35 + ph), sin(lt * 1.0 + t * 0.60)) * 0.50;
        md = min(md, length(p - lp)); }
    v = exp(-md * 9.86) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 2.36 + t * 1.95 + ph) + sin(p.y * 5.69 - t * 4.84 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.26;
	vec2 q1 = p; vec2 q2 = p;
	q1 = fract(q1 * 2.02) - 0.5;
	q1 = vec2(q1.x * q1.x - q1.y * q1.y, 2.0 * q1.x * q1.y) * 0.56;
	q2 = sin(q2 * 2.83 + time * 1.98) * 1.29;
	q2 = rot2(length(q2) * 3.13 + time * 0.92) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.13);
	float d = 0.5 * (d1 + d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.36, 0.06, 0.54), vec3(0.72, 0.56, 0.47), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
