uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 16.37 + t * 3.34 + ph) + sin(p.y * 7.30 - t * 1.92 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ p = vec2(atan(p.y, p.x) * 2.05, length(p) * 2.85 - time * 0.91); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.43 + time * 0.17, vec3(0.43, 0.41, 0.55), vec3(0.45, 0.36, 0.35), vec3(1.35, 0.99, 1.25), vec3(0.13, 0.65, 0.14));
	col = mod(col * 2.92, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
