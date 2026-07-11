uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 4.49 + vec2(t * 2.56, -t * 2.56) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.68;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.74 + time * 0.01, vec3(0.46, 0.51, 0.44), vec3(0.34, 0.47, 0.45), vec3(0.70, 1.33, 0.73), vec3(0.82, 0.32, 0.11));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
