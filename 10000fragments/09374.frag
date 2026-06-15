uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 12.97 + vec2(t * 0.76, -t * 0.76) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.68;
	{ p = vec2(atan(p.y, p.x) * 2.96, length(p) * 5.13 - time * 0.18); }
	p = fract(p * 1.38) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.31 + time * 0.18, vec3(0.50, 0.46, 0.43), vec3(0.47, 0.48, 0.33), vec3(1.12, 0.97, 1.04), vec3(0.48, 0.88, 0.33));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.84));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
