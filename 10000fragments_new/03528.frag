uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 6.78 + t * 3.24 + ph) * 0.7;
    float wb = sin(p.y * 16.95 - t * 2.84 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.48;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.41;
	p = rot2(time * 1.58) * p;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(1.38) * p;
	p = rot2(length(p) * -2.28 + time * 0.96) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.06 + time * 0.19, vec3(0.59, 0.45, 0.49), vec3(0.35, 0.47, 0.38), vec3(1.18, 0.85, 1.18), vec3(0.42, 0.21, 0.16));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.59 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
