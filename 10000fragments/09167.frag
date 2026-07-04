uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 19.19 + t * 2.36 + ph) * 0.7;
    float wb = sin(p.y * 12.70 - t * 2.35 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.44;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.77;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p *= 1.0 + 0.31 * sin(time * 4.76);
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 0.87;
	p = rot2(p.y * 2.31 + time * 0.48) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.90 + time * 0.02, vec3(0.46, 0.49, 0.53), vec3(0.45, 0.39, 0.49), vec3(1.02, 0.98, 0.83), vec3(0.23, 0.59, 0.30));
	col = mod(col * 1.75, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
