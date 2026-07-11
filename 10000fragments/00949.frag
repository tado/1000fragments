uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 13.50 + t * 4.28 + ph) + sin(p.y * 6.06 - t * 4.28 + ph)
        + sin((p.x + p.y) * 2.55 + t * 4.28 + ph) + sin(length(p) * 6.12 - t * 4.28 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.64 + 0.23 * cos(sa * 8 + t * 2.94 + ph);
    v = sin((sr - petal) * 16.64);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p += vec2(-0.33, -0.69) * sin(length(p) * 2.30 - time * 0.88) * 0.38;
	p = rot2(p.y * 3.65 + time * 0.77) * p;
	p = rot2(time * -1.30) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.84);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.01 + time * 0.24, vec3(0.57, 0.48, 0.41), vec3(0.46, 0.32, 0.41), vec3(1.23, 0.75, 1.30), vec3(0.89, 0.50, 0.67));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
