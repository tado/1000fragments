uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 4.78 + t * 3.44 + ph) + sin(p.y * 8.27 - t * 3.44 + ph)
        + sin((p.x + p.y) * 2.41 + t * 3.44 + ph) + sin(length(p) * 16.72 - t * 3.44 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 2.83 + sr * 12.83 - t * 4.55 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.56;
	p = rot2(time * -0.28) * p;
	p = rot2(2.16) * p;
	p = rot2(length(p) * 2.19 + time * 1.20) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.93);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.84 + time * 0.21, vec3(0.52, 0.41, 0.42), vec3(0.35, 0.47, 0.45), vec3(0.79, 0.94, 0.87), vec3(0.94, 0.00, 0.38));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
