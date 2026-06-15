uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 5.88 + vec2(t * 2.59, -t * 2.59) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.85;
	p += vec2(-0.71, -0.75) * sin(length(p) * 5.71 - time * 1.11) * 0.40;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.05 + time * 0.20, vec3(0.42, 0.44, 0.47), vec3(0.50, 0.33, 0.48), vec3(1.15, 1.38, 1.05), vec3(0.85, 0.41, 0.37));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
