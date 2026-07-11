uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 5.91;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 20.87 - t * 3.70 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 2.0 + t * 1.32 + ph), sin(lt * 2.0 + t * 0.53)) * 0.51;
        md = min(md, length(p - lp)); }
    v = exp(-md * 5.41) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(length(q1) * 2.57 + time * 1.13) * q1;
	q2 *= 2.91;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.21);
	float d = 0.5 * (d1 + d2);
	vec3 col = palette(d * 1.32 + time * 0.31, vec3(0.43, 0.46, 0.50), vec3(0.35, 0.41, 0.44), vec3(1.20, 0.77, 0.90), vec3(0.99, 0.81, 0.81));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
