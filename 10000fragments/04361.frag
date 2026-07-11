uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.56, 0.0)) * 24.57 - t * 7.70 + ph);
    float mb = sin(length(p + vec2(0.56, 0.0)) * 20.72 - t * 7.70 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 11.77 + t * 5.40 + ph) + sin(p.y * 8.96 - t * 5.01 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.79;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.19, lr * 1.48 + time * -0.32); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.61);
	float d = d1 * d2;
	vec3 col = palette(d * 0.87 + time * 0.17, vec3(0.57, 0.54, 0.54), vec3(0.46, 0.42, 0.34), vec3(0.79, 0.91, 1.13), vec3(0.37, 0.08, 0.10));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.96));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
