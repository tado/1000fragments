uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 9.14 + sr * 4.43 - t * 3.58 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.40;
	p = abs(p) - 0.27;
	p *= 2.53;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.92, lr * 2.51 + time * 0.43); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.46 + time * 0.13, vec3(0.53, 0.56, 0.42), vec3(0.49, 0.30, 0.38), vec3(1.39, 1.22, 0.99), vec3(0.88, 0.77, 0.39));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.75));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
