uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.85);
}

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 11.0 + qr * 4.98 * sin(t * 0.89) + t * 5.63 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.35 + 0.30 * cos(sa * 7.0 + t * 2.57 + ph);
    v = sin((sr - petal) * 14.69);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 2.88 + (time * 0.84) * 1.05) * 0.09;
	p *= 0.88;
	p = abs(p) - 0.58;
	float d1 = field(p, (time * 0.84), 0.0);
	float d2 = field2(p, (time * 0.84), 1.87);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.79 + (time * 0.84) * 0.07, vec3(0.36, 0.28, 0.38), vec3(0.11, 0.13, 0.17), vec3(0.46, 0.51, 0.86), vec3(0.99, 0.15, 0.67));
	col *= 0.81 + 0.20 * sin(gl_FragCoord.y * 1.02 + (time * 0.84) * 13.33);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.22);
	col = clamp(col, 0.0, 1.0) * vec3(1.039, 1.002, 0.943) * 1.00 + 0.048;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
