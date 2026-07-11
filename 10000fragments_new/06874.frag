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
        vec2 lp = vec2(sin(lt * 4.0 + t * 0.44 + ph), sin(lt * 5.0 + t * 0.80)) * 0.95;
        md = min(md, length(p - lp)); }
    v = exp(-md * 7.56) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 8.39 + sr * 22.95 - t * 3.20 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(length(q1) * 1.79 + time * 0.65) * q1;
	for(int fo = 0; fo < 2; fo++){ q1 = abs(q1) - 0.41; q1 = rot2(2.56) * q1; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.41);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.08 + time * 0.21, vec3(0.51, 0.58, 0.55), vec3(0.37, 0.41, 0.49), vec3(1.23, 0.80, 1.35), vec3(0.98, 0.32, 0.30));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.60));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
