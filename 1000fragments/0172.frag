uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 7.37 + vec2(t * 1.82, -t * 1.82) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.32;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.60 + time * 0.03, vec3(0.59, 0.58, 0.57), vec3(0.39, 0.49, 0.35), vec3(0.75, 1.19, 0.75), vec3(0.57, 0.05, 0.18));
	col = fract(col * 1.18);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
