uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 6.65 + sin(p.y * 2.97 + t * 3.28) * 3.37 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 7.0 + qr * 4.17 * sin(t * 1.48) + t * 4.78 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.23;
	p = abs(p);
	p *= 1.0 + 0.25 * sin((time * 0.67) * 2.10);
	p.y += sin(p.x * 5.32 + (time * 0.67) * 3.84) * 0.24;
	float d1 = field(p, (time * 0.67), 0.0);
	float d2 = field2(p, (time * 0.67), 0.78);
	float d = d1 * d2;
	vec3 col = palette(d * 0.95 + (time * 0.67) * 0.08, vec3(0.49, 0.47, 0.45), vec3(0.19, 0.19, 0.15), vec3(0.43, 0.75, 0.60), vec3(0.23, 0.10, 0.58));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.50));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.37);
	col = clamp(col, 0.0, 1.0) * vec3(1.022, 0.950, 1.011) * 1.00 + 0.044;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
