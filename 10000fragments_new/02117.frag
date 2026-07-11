uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 9.0 + qr * 7.79 * sin(t * 0.55) + t * 4.84 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.85;
	p *= 2.15;
	p += vec2(0.86, -0.79) * sin(length(p) * 2.31 - time * 1.32) * 0.17;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.69 + time * 0.14, vec3(0.47, 0.48, 0.42), vec3(0.46, 0.48, 0.43), vec3(1.28, 0.81, 0.81), vec3(0.88, 0.05, 0.11));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
