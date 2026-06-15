uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 10.53 + vec2(t * 2.85, -t * 2.85) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.91;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.62 + time * 0.21, vec3(0.46, 0.49, 0.55), vec3(0.36, 0.43, 0.36), vec3(1.20, 1.09, 1.36), vec3(0.55, 0.98, 0.33));
	col = clamp((col - 0.5) * 1.33 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
