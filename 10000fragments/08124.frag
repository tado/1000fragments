uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 8.21 + vec2(t * 2.48, -t * 2.48) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.79;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.56 + time * 0.28, vec3(0.43, 0.49, 0.46), vec3(0.38, 0.43, 0.48), vec3(1.21, 1.38, 1.06), vec3(0.07, 0.58, 0.19));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
