uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 6.25 - t * 4.13 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.69;
	{ p = vec2(atan(p.y, p.x) * 2.62, length(p) * 2.36 - time * 0.61); }
	p = abs(p);
	p = fract(p * 1.72) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.16 + time * 0.27, vec3(0.58, 0.44, 0.49), vec3(0.35, 0.31, 0.46), vec3(1.37, 0.94, 1.19), vec3(0.18, 0.73, 0.34));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
