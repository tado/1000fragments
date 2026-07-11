uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 23.76 + sin(p.y * 2.88 + t * 2.80) * 1.18 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ga = atan(p.y, p.x); float gr = length(p) + 0.001;
    float arm = sin(log(gr) * 6.63 + ga * 3.0 - t * 2.54 + ph);
    v = arm * exp(-gr * 1.20);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.45;
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 1.08;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.24);
	float d = d1 + d2;
	vec3 col = palette(d * 0.81 + time * 0.04, vec3(0.43, 0.49, 0.54), vec3(0.32, 0.37, 0.40), vec3(1.12, 1.24, 1.11), vec3(0.35, 0.68, 0.19));
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
