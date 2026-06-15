uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 7.32 + vec2(t * 2.06, -t * 2.06) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.59 + time * 0.11, vec3(0.45, 0.56, 0.50), vec3(0.48, 0.32, 0.44), vec3(1.24, 1.26, 0.90), vec3(0.68, 0.40, 0.98));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
