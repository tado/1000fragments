uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 4.35;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 23.54 - t * 5.78 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 7.84 + sr * 7.14 - t * 2.04 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.23;
	p *= 3.10;
	p.x += sin(p.y * 7.65 + time * 3.88) * 0.19;
	p = rot2(0.50) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.29);
	float d = d1 * d2;
	vec3 col = palette(d * 1.03 + time * 0.07, vec3(0.52, 0.60, 0.58), vec3(0.34, 0.38, 0.40), vec3(1.01, 1.06, 1.39), vec3(0.71, 0.96, 1.00));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
