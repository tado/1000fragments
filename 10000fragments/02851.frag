uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 5.32 + vec2(t * 2.24, -t * 2.24) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.50;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.89 + time * 0.09, vec3(0.55, 0.54, 0.47), vec3(0.30, 0.30, 0.40), vec3(1.09, 0.76, 0.96), vec3(0.70, 0.10, 0.98));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
