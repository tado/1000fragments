uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.58 + 0.27 * pow(abs(cos(ra * 7.0 + t * 1.95)), 1.23);
    v = sin((rr - pet) * 13.96 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.58, lr * 2.19 + time * 0.68); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.61 + time * 0.25, vec3(0.55, 0.57, 0.58), vec3(0.37, 0.46, 0.48), vec3(1.10, 0.73, 1.02), vec3(0.29, 0.52, 0.96));
	col = mod(col * 2.58, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
