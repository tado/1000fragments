uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 23.36 - t * 1.16 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.72;
	{ p = vec2(atan(p.y, p.x) * 2.15, length(p) * 2.18 - time * 0.70); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.56 + time * 0.11, vec3(0.52, 0.42, 0.50), vec3(0.44, 0.34, 0.33), vec3(1.13, 1.21, 1.13), vec3(0.82, 0.19, 0.75));
	col = mod(col * 1.61, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
