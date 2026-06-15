uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 6.36 + vec2(t * 0.82, -t * 0.82) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.29;
	p = abs(p);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.96 + time * 0.28, vec3(0.52, 0.47, 0.44), vec3(0.32, 0.39, 0.37), vec3(0.71, 1.14, 1.19), vec3(0.74, 0.49, 0.09));
	col = mod(col * 1.31, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
