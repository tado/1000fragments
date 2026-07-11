uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 13.95 + vec2(t * 1.52, -t * 1.52) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.03 + time * 0.24, vec3(0.48, 0.55, 0.41), vec3(0.36, 0.33, 0.30), vec3(1.32, 1.03, 1.23), vec3(0.17, 0.81, 0.10));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
