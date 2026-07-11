uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 4.40 + vec2(t * 1.19, -t * 1.19) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.41;
	p = fract(p * 1.17) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.96 + time * 0.16, vec3(0.50, 0.40, 0.51), vec3(0.36, 0.41, 0.43), vec3(1.26, 0.70, 1.31), vec3(0.73, 0.52, 0.80));
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
