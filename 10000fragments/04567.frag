uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.57, 0.0)) * 9.11 - t * 2.87 + ph);
    float mb = sin(length(p + vec2(0.57, 0.0)) * 18.86 - t * 2.87 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = fract(p * 1.51) - 0.5;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.93, lr * 1.16 + time * -0.75); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.43 + time * 0.05, vec3(0.50, 0.48, 0.58), vec3(0.39, 0.35, 0.44), vec3(1.05, 1.18, 0.97), vec3(0.46, 0.77, 0.99));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
