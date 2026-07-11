uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ga = atan(p.y, p.x); float gr = length(p) + 0.001;
    float arm = sin(log(gr) * 3.53 + ga * 5.0 - t * 0.81 + ph);
    v = arm * exp(-gr * 1.16);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.31 + 0.22 * cos(sa * 5.0 + t * 1.35 + ph);
    v = sin((sr - petal) * 9.33);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.41;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.02);
	float d = d1 + d2;
	vec3 col = palette(d * 0.73 + time * 0.04, vec3(0.55, 0.45, 0.51), vec3(0.39, 0.37, 0.49), vec3(0.98, 0.79, 1.07), vec3(0.71, 0.67, 0.21));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
