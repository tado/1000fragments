uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 33.07 - t * 7.04 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.90;
	{ p = vec2(atan(p.y, p.x) * 2.43, length(p) * 5.09 - time * 0.67); }
	p = fract(p * 2.28) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.27 + time * 0.21, vec3(0.46, 0.46, 0.46), vec3(0.35, 0.47, 0.34), vec3(1.14, 1.17, 0.93), vec3(0.30, 0.14, 0.89));
	col = mod(col * 2.95, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
