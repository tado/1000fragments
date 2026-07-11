uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 11.23 + sr * 10.63 - t * 4.14 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 5.0 + t * 0.67 + ph), sin(lt * 5.0 + t * 0.95)) * 0.97;
        md = min(md, length(p - lp)); }
    v = exp(-md * 5.60) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.18;
	vec2 q1 = p; vec2 q2 = p;
	{ float fr = length(q1); q1 *= 1.0 + 0.61 * fr * fr; }
	q2 = rot2(time * 0.64) * q2;
	q2 = rot2(length(q2) * 1.86 + time * 1.48) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.55);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.32 + time * 0.38, vec3(0.42, 0.47, 0.45), vec3(0.36, 0.47, 0.43), vec3(1.33, 1.34, 0.94), vec3(0.63, 0.44, 0.19));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
