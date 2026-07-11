uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 11.64 - t * 7.63 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 3.22 + vec2(t * 1.03, -t * 1.03) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.13;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.16);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.45 + time * 0.23, vec3(0.41, 0.56, 0.59), vec3(0.42, 0.32, 0.41), vec3(1.04, 1.03, 1.27), vec3(0.99, 0.88, 0.02));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
