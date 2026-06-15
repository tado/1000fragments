uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 6.19 + vec2(t * 1.31, -t * 1.31) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.06;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.88 + time * 0.02, vec3(0.46, 0.59, 0.58), vec3(0.32, 0.47, 0.34), vec3(0.81, 0.73, 1.00), vec3(0.90, 0.90, 0.45));
	col = mod(col * 2.15, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
