uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 10.86 + vec2(t * 2.08, -t * 2.08) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.67 + time * 0.09, vec3(0.57, 0.58, 0.50), vec3(0.50, 0.40, 0.36), vec3(1.10, 1.01, 0.70), vec3(0.93, 0.70, 0.17));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
