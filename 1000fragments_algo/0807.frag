uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x = abs(p.x);
	p.y += sin(p.x * 1.46 + (time * 0.74) * 0.54) * 0.15;
	p *= 0.95;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 9.0;
	float n1 = 0.55 + 0.67 * sin((time * 0.74) * 1.76);
	float n2 = 1.83 + 0.78 * cos((time * 0.74) * 0.67);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.85;
	float d = sr - rr;
	float v = d;
	vec3 col = palette((v) * 1.06 + (time * 0.74) * 0.09, vec3(0.38, 0.49, 0.38), vec3(0.11, 0.11, 0.14), vec3(0.74, 0.86, 0.84), vec3(0.71, 0.09, 0.78));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.61);
	col = clamp(col, 0.0, 1.0) * vec3(0.997, 1.019, 0.999) * 1.00 + 0.033;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
