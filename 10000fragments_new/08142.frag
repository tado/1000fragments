uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 19.28 + t * 1.69 + ph) * 0.7;
    float wb = sin(p.y * 11.20 - t * 3.09 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.70;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.45;
	p = rot2(time * 1.34) * p;
	{ p = vec2(atan(p.y, p.x) * 2.94, length(p) * 4.53 - time * 0.57); }
	p = fract(p * 1.96) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.87 + time * 0.15, vec3(0.50, 0.41, 0.50), vec3(0.30, 0.44, 0.44), vec3(1.32, 1.01, 1.33), vec3(0.68, 0.98, 0.25));
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
