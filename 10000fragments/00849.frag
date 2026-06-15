uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 4.60 + vec2(t * 2.59, -t * 2.59) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.19;
	p *= 2.83;
	{ float fr = length(p); p *= 1.0 + -0.73 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.62 + time * 0.21, vec3(0.46, 0.55, 0.56), vec3(0.30, 0.33, 0.50), vec3(1.15, 0.78, 1.15), vec3(0.79, 0.60, 0.14));
	col = fract(col * 1.28);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
