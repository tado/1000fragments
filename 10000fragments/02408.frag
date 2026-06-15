uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 13.81 + t * 2.03 + ph) + sin(p.y * 10.72 - t * 2.03 + ph)
        + sin((p.x + p.y) * 8.68 + t * 2.03 + ph) + sin(length(p) * 16.87 - t * 2.03 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * -1.15) * p;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p *= 2.91;
	{ float fr = length(p); p *= 1.0 + 0.27 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.82 + time * 0.25, vec3(0.47, 0.45, 0.51), vec3(0.44, 0.49, 0.48), vec3(1.00, 0.73, 1.12), vec3(0.26, 0.57, 0.20));
	col = clamp((col - 0.5) * 2.13 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
