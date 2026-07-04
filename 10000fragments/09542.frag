uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 13.66 + vec2(t * 1.38, -t * 1.67) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.20 + time * 0.29, vec3(0.47, 0.57, 0.44), vec3(0.47, 0.42, 0.34), vec3(0.89, 0.92, 0.89), vec3(0.31, 0.83, 0.78));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
