uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.27, 0.0)) * 11.38 - t * 4.29 + ph);
    float mb = sin(length(p + vec2(0.27, 0.0)) * 14.61 - t * 2.24 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.15, lr * 1.63 + time * 0.79); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.93 + time * 0.28, vec3(0.53, 0.44, 0.60), vec3(0.37, 0.46, 0.44), vec3(1.35, 1.39, 0.97), vec3(0.08, 0.67, 0.06));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
