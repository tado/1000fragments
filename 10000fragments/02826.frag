uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 13.85 + vec2(t * 0.69, -t * 0.69) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.11 + time * 0.12, vec3(0.48, 0.48, 0.49), vec3(0.39, 0.35, 0.46), vec3(0.97, 1.16, 1.04), vec3(0.27, 0.82, 0.04));
	col = mod(col * 1.40, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
