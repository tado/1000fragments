uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 12.72 + vec2(t * 2.20, -t * 2.20) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.92;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.02 + time * 0.12, vec3(0.52, 0.59, 0.40), vec3(0.46, 0.36, 0.41), vec3(1.36, 1.31, 0.95), vec3(0.79, 0.64, 0.11));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.78));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
