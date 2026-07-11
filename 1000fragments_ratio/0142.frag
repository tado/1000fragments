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
    v = sin(qa * 7.0 + qr * 3.77 * sin(t * 1.15) + t * 2.37 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 2.49;
    v = 0.5 * (sin(4.0 * cp.x + t * 1.10) * sin(3.0 * cp.y + ph)
             + sin(3.0 * cp.x - t * 2.14) * sin(4.0 * cp.y + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x = abs(p.x);
	p.x *= resolution.x / resolution.y;
	p *= 0.97;
	p *= 1.59;
	{ float fr = length(p); p *= 1.0 + -0.52 * fr * fr; }
	float d1 = field(p, (time * 0.59), 0.0);
	float d2 = field2(p, (time * 0.59), 0.56);
	float d = mix(d1, d2, 0.5 + 0.5 * sin((time * 0.59) * 0.7));
	vec3 col = palette(d * 1.26 + (time * 0.59) * 0.12, vec3(0.36, 0.36, 0.42), vec3(0.26, 0.19, 0.27), vec3(0.62, 0.80, 0.54), vec3(0.22, 0.62, 0.60));
	col *= 0.81 + 0.10 * sin(gl_FragCoord.y * 1.62 + (time * 0.59) * 7.00);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.33);
	col = clamp(col, 0.0, 1.0) * vec3(0.929, 0.980, 1.020) * 1.00 + 0.017;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
