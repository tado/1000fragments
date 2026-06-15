uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 18.00 + sin(p.y * 5.19 + t * 3.43) * 2.52 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.13;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.84, lr * 2.49 + time * -0.74); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.83 + time * 0.27, vec3(0.42, 0.57, 0.45), vec3(0.38, 0.48, 0.41), vec3(0.70, 1.33, 1.14), vec3(0.86, 0.37, 0.44));
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
