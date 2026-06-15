uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 10.71 + vec2(t * 1.62, -t * 1.62) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.43;
	{ p = vec2(atan(p.y, p.x) * 1.63, length(p) * 3.18 - time * 0.63); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.65 + time * 0.09, vec3(0.53, 0.53, 0.44), vec3(0.47, 0.33, 0.35), vec3(0.83, 1.14, 1.20), vec3(0.57, 0.37, 0.61));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
