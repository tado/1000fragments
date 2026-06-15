uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 13.98 + vec2(t * 2.16, -t * 2.16) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.50;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.74 + time * 0.04, vec3(0.53, 0.59, 0.58), vec3(0.44, 0.47, 0.31), vec3(0.82, 1.08, 0.87), vec3(0.65, 0.61, 0.57));
	col = mod(col * 2.36, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
