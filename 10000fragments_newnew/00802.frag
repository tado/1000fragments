uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float ga = atan(p.y, p.x); float gr = length(p) + 0.001;
    float arm = sin(log(gr) * 7.77 + ga * 4.0 - t * 1.78 + ph);
    v = arm * exp(-gr * 1.19);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 1.74 + t * 0.72) - 0.5) * 2.0;
    v = sin((p.y * 3.38 + zx * 1.88 + t * 2.74) * 3.1415927 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.26;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(q1.y * 1.46 + time * 0.75) * q1;
	q1 = sin(q1 * 2.15 + time * 2.13) * 1.48;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.06);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.53 + time * 0.09, vec3(0.58, 0.47, 0.43), vec3(0.40, 0.34, 0.42), vec3(0.86, 1.36, 1.30), vec3(0.68, 0.31, 0.88));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
