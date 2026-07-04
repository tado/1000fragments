uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 pk = p * 3.53;
    pk.x += step(0.5, fract(pk.y * 0.5)) * 0.5;
    vec2 pf = fract(pk) - 0.5;
    float rad = 0.27 + 0.10 * sin(t * 4.41 + floor(pk.y) * 1.7 + ph);
    v = (1.0 - smoothstep(rad - 0.1, rad, length(pf))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.76;
	{ float fr = length(p); p *= 1.0 + -0.48 * fr * fr; }
	{ p = vec2(atan(p.y, p.x) * 1.76, length(p) * 4.61 - time * 0.80); }
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 1.03;
	p = rot2(length(p) * 1.34 + time * 0.48) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.72 + time * 0.03, vec3(0.41, 0.52, 0.47), vec3(0.45, 0.33, 0.32), vec3(1.04, 0.99, 1.21), vec3(0.59, 0.44, 0.83));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.54));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
