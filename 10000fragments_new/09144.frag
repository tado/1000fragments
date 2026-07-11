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
        vec2 lp = vec2(sin(lt * 2.0 + t * 0.63 + ph), sin(lt * 2.0 + t * 1.46)) * 0.77;
        md = min(md, length(p - lp)); }
    v = exp(-md * 3.78) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 4.55 + t * 3.53 + ph) + sin(p.y * 12.74 - t * 3.53 + ph)
        + sin((p.x + p.y) * 11.67 + t * 3.53 + ph) + sin(length(p) * 10.52 - t * 3.53 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	for(int fo = 0; fo < 2; fo++){ q1 = abs(q1) - 0.13; q1 = rot2(2.29) * q1; }
	q2 += vec2(0.42, -0.61) * sin(length(q2) * 2.19 - time * 2.37) * 0.11;
	q2 *= 1.90;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.81);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.58 + time * 0.25, vec3(0.50, 0.47, 0.44), vec3(0.32, 0.45, 0.32), vec3(0.94, 0.91, 0.81), vec3(0.52, 0.86, 0.40));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
