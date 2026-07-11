uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 8.50) - 0.5;
    float rad = 0.32 + 0.12 * sin(t * 2.09 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 2.45 + t * 4.92 + ph) + sin(p.y * 13.99 - t * 4.92 + ph)
        + sin((p.x + p.y) * 9.75 + t * 4.92 + ph) + sin(length(p) * 11.67 - t * 4.92 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.74;
	p = rot2(p.y * 3.08 + time * 0.50) * p;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p *= 1.35;
	p += vec2(-0.70, 0.68) * sin(length(p) * 3.42 - time * 1.96) * 0.17;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.62);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.50 + time * 0.22, vec3(0.54, 0.57, 0.42), vec3(0.34, 0.39, 0.33), vec3(1.19, 0.78, 1.06), vec3(0.23, 0.10, 0.81));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
