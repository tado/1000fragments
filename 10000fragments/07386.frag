uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 5.0 + t * 1.01 + ph), sin(lt * 3.0 + t * 0.66)) * 0.83;
        md = min(md, length(p - lp)); }
    v = exp(-md * 3.44) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 2.13 - t * 1.61;
    v = sin(floor(lv * 4.6) / 4.6 * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	{ float fr = length(q1); q1 *= 1.0 + -0.37 * fr * fr; }
	q1 = rot2(q1.y * -3.67 + time * 0.95) * q1;
	{ float fr = length(q2); q2 *= 1.0 + -0.33 * fr * fr; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.45);
	float d = min(d1, d2);
	vec3 col = vec3(0.83, 0.27, 0.71) * (0.22 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	col = mod(col * 1.92, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
