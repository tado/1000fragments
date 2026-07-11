uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float field(vec2 p, float t, float ph){
    float v;
    float ga = atan(p.y, p.x); float gr = length(p) + 0.001;
    float arm = sin(log(gr) * 7.18 + ga * 5.0 - t * 0.55 + ph);
    v = arm * exp(-gr * 0.53);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.45;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.54, lr * 2.27 + (time * 0.75) * -0.81); }
	{ p = vec2(atan(p.y, p.x) * 1.05, length(p) * 5.04 - (time * 0.75) * 0.54); }
	float d = field(p, (time * 0.75), 0.0);
	vec3 col = palette(d * 1.03 + (time * 0.75) * 0.05, vec3(0.33, 0.40, 0.37), vec3(0.24, 0.27, 0.22), vec3(0.89, 0.81, 0.42), vec3(0.85, 0.46, 0.65));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.43);
	col = clamp(col, 0.0, 1.0) * vec3(1.030, 1.002, 0.947) * 1.00 + 0.019;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
