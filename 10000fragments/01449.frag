uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 10.20 + vec2(t * 2.20, -t * 2.20) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.56;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.56 + time * 0.09, vec3(0.42, 0.53, 0.51), vec3(0.31, 0.36, 0.30), vec3(0.74, 0.80, 0.87), vec3(0.08, 0.52, 0.38));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
