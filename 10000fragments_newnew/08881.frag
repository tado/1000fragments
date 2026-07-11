uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 4.0 + t * 1.24 + ph), sin(lt * 1.0 + t * 0.64)) * 0.78;
        md = min(md, length(p - lp)); }
    v = exp(-md * 3.60) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 1.0 + t * 0.62 + ph), sin(lt * 3.0 + t * 1.19)) * 0.64;
        md = min(md, length(p - lp)); }
    v = exp(-md * 9.85) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.54;
	vec2 q1 = p; vec2 q2 = p;
	for(int fo = 0; fo < 3; fo++){ q1 = abs(q1) - 0.12; q1 = rot2(0.97) * q1; }
	q1 = (floor(q1 * 29.9) + 0.5) / 29.9;
	q2 = rot2(length(q2) * -2.72 + time * 0.75) * q2;
	q2.y += sin(q2.x * 7.33 + time * 1.34) * 0.21;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.58);
	float d = 0.5 * (d1 + d2);
	vec3 col = palette(d * 0.92 + time * 0.19, vec3(0.54, 0.59, 0.51), vec3(0.34, 0.49, 0.44), vec3(0.80, 0.87, 1.30), vec3(0.46, 0.51, 0.45));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.80 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
