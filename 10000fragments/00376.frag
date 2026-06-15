uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 10.91 + vec2(t * 1.30, -t * 1.30) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.85;
	{ p = vec2(atan(p.y, p.x) * 1.12, length(p) * 2.80 - time * 0.14); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.62 + time * 0.12, vec3(0.52, 0.46, 0.54), vec3(0.45, 0.32, 0.40), vec3(1.05, 0.88, 1.26), vec3(0.41, 0.01, 0.58));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
