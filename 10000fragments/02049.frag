uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 3.39 + sr * 22.70 - t * 0.98 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.88;
	{ p = vec2(atan(p.y, p.x) * 1.54, length(p) * 3.44 - time * 0.27); }
	p = abs(p) - 0.55;
	p *= 2.87;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.41 + time * 0.14, vec3(0.41, 0.49, 0.60), vec3(0.44, 0.38, 0.44), vec3(1.22, 1.16, 1.12), vec3(0.47, 0.66, 0.54));
	col = fract(col * 2.19);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
