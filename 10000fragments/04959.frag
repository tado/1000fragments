uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 6.48 + sr * 22.44 - t * 1.28 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.56 + 0.19 * cos(sa * 6 + t * 1.53 + ph);
    v = sin((sr - petal) * 15.22);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.85;
	p = rot2(length(p) * -3.05 + time * 0.42) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.86);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.64 + time * 0.09, vec3(0.44, 0.44, 0.44), vec3(0.31, 0.45, 0.42), vec3(1.15, 1.01, 1.05), vec3(0.51, 0.30, 0.75));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.87));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
