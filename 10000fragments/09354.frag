uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.55, 0.0)) * 36.83 - t * 2.00 + ph);
    float mb = sin(length(p + vec2(0.55, 0.0)) * 18.55 - t * 2.00 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 12.90 + vec2(t * 1.13, -t * 1.13) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	{ p = vec2(atan(p.y, p.x) * 2.32, length(p) * 2.18 - time * 0.65); }
	p = rot2(time * -1.15) * p;
	p += vec2(-0.90, 0.68) * sin(length(p) * 5.72 - time * 1.07) * 0.30;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.94);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.70 + time * 0.22, vec3(0.49, 0.57, 0.59), vec3(0.32, 0.46, 0.49), vec3(0.71, 1.23, 1.04), vec3(0.26, 0.53, 0.48));
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
