uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 12.43 + vec2(t * 1.51, -t * 1.51) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.72;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.88 + time * 0.07, vec3(0.43, 0.47, 0.42), vec3(0.41, 0.31, 0.32), vec3(1.07, 0.85, 1.28), vec3(0.50, 0.29, 0.62));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
