uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 4.74 + t * 1.28 + ph) + sin(p.y * 6.21 - t * 1.28 + ph)
        + sin((p.x + p.y) * 4.69 + t * 1.28 + ph) + sin(length(p) * 3.07 - t * 1.28 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 11.0 + qr * 5.79 * sin(t * 1.21) + t * 2.04 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.19);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.65 + time * 0.10, vec3(0.40, 0.44, 0.42), vec3(0.41, 0.46, 0.37), vec3(0.85, 0.96, 0.97), vec3(0.50, 0.94, 0.75));
	col = fract(col * 2.01);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
