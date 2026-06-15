uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 11.21 + t * 4.71 + ph) + sin(p.y * 12.62 - t * 4.71 + ph)
        + sin((p.x + p.y) * 7.80 + t * 4.71 + ph) + sin(length(p) * 14.68 - t * 4.71 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 9.61 + sr * 18.13 - t * 4.12 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = abs(p);
	p = rot2(length(p) * 2.24 + time * 0.76) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.54);
	float d = d1 + d2;
	vec3 col = palette(d * 1.38 + time * 0.26, vec3(0.55, 0.42, 0.45), vec3(0.32, 0.33, 0.36), vec3(1.29, 1.23, 1.26), vec3(0.72, 0.82, 0.43));
	col = mod(col * 1.41, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
