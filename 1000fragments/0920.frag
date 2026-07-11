uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 14.18 + vec2(t * 0.36, -t * 0.36) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p += vec2(-0.26, 0.09) * sin(length(p) * 2.61 - time * 1.02) * 0.35;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.26 + time * 0.14, vec3(0.40, 0.47, 0.60), vec3(0.38, 0.39, 0.38), vec3(1.06, 0.80, 0.97), vec3(0.01, 0.52, 0.58));
	col = fract(col * 1.27);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
