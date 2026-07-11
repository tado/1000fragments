uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 12.59 + vec2(t * 2.83, -t * 2.83) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.29;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.78 + time * 0.05, vec3(0.58, 0.47, 0.57), vec3(0.40, 0.49, 0.33), vec3(1.09, 1.06, 1.11), vec3(0.02, 0.90, 0.12));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
