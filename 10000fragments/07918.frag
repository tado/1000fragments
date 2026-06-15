uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 11.71 + vec2(t * 2.15, -t * 2.15) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.09;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.92 + time * 0.14, vec3(0.48, 0.55, 0.54), vec3(0.31, 0.47, 0.35), vec3(1.16, 1.09, 1.18), vec3(0.78, 0.21, 0.58));
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
