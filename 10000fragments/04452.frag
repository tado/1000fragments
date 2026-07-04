uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 2.80 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.64 + t * 3.99 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 20.39 - t * 8.92 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.43;
	vec2 q1 = p; vec2 q2 = p;
	{ float ka = atan(q1.y, q1.x); float kr = length(q1); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q1 = kr * vec2(cos(ka), sin(ka)); }
	q1 = rot2(length(q1) * 3.98 + time * 1.25) * q1;
	q2 = abs(q2);
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.80);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.53 + time * 0.36, vec3(0.60, 0.41, 0.43), vec3(0.45, 0.40, 0.39), vec3(0.74, 0.89, 1.39), vec3(0.76, 0.69, 0.72));
	col *= 0.85 + 0.19 * sin(gl_FragCoord.y * 1.33 + time * 12.70);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
