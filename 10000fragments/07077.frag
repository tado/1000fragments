uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 1.97;
    v = 0.5 * (sin(4.0 * cp.x + t * 1.43) * sin(2.0 * cp.y + ph)
             + sin(2.0 * cp.x - t * 0.86) * sin(4.0 * cp.y + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 7.0 + qr * 4.77 * sin(t * 0.58) + t * 1.93 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.75;
	p += vec2(-0.80, -0.46) * sin(length(p) * 5.61 - time * 1.90) * 0.11;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.79);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.7));
	vec3 col = palette(d * 0.51 + time * 0.09, vec3(0.57, 0.45, 0.49), vec3(0.34, 0.37, 0.32), vec3(0.76, 1.35, 0.72), vec3(0.79, 0.41, 0.01));
	col = fract(col * 2.20);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
