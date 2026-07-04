uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 8.09 + t * 3.82 + ph) * 0.7;
    float wb = sin(p.y * 17.23 - t * 1.35 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.74;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 13.43 + sin(p.y * 3.71 + t * 5.96) * 2.97 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.43;
	p *= 1.74;
	{ p = vec2(atan(p.y, p.x) * 2.93, length(p) * 5.82 - time * 0.95); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.01);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.7));
	vec3 col = palette(d * 0.93 + time * 0.26, vec3(0.46, 0.54, 0.43), vec3(0.33, 0.41, 0.47), vec3(1.19, 0.94, 1.16), vec3(0.75, 0.17, 0.24));
	col = clamp((col - 0.5) * 1.27 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
