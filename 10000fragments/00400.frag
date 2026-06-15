uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 12.05 + vec2(t * 1.58, -t * 1.58) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.61;
	p = fract(p * 1.64) - 0.5;
	p += vec2(-0.37, -0.94) * sin(length(p) * 4.02 - time * 1.86) * 0.30;
	p = rot2(2.66) * p;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.48 + time * 0.15, vec3(0.52, 0.54, 0.57), vec3(0.47, 0.30, 0.30), vec3(1.34, 1.18, 0.89), vec3(0.40, 0.25, 0.98));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
