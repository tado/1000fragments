uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 13.33 + vec2(t * 1.56, -t * 1.56) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.28;
	p = abs(p);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.43 + time * 0.24, vec3(0.43, 0.56, 0.60), vec3(0.42, 0.34, 0.41), vec3(1.03, 1.35, 0.88), vec3(1.00, 0.33, 0.14));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.01));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
