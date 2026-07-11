uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 13.23 + vec2(t * 1.75, -t * 1.75) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.53;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.52 + time * 0.26, vec3(0.41, 0.48, 0.47), vec3(0.30, 0.33, 0.38), vec3(0.89, 1.23, 0.75), vec3(0.44, 0.24, 0.57));
	col = clamp((col - 0.5) * 1.31 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
