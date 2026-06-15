uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 13.83 + vec2(t * 0.63, -t * 0.63) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.83;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.57 + time * 0.17, vec3(0.52, 0.56, 0.41), vec3(0.47, 0.39, 0.39), vec3(0.93, 1.25, 1.37), vec3(0.52, 0.85, 0.77));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.80));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
