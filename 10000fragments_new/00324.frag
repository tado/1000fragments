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
    v = sin(qa * 5.0 + qr * 6.68 * sin(t * 0.65) + t * 1.33 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 30.78 - t * 2.14 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p += vec2(-0.66, -0.40) * sin(length(p) * 3.51 - time * 1.23) * 0.15;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.80);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.65 + time * 0.20, vec3(0.51, 0.59, 0.42), vec3(0.50, 0.44, 0.37), vec3(1.08, 1.11, 1.19), vec3(0.39, 0.82, 0.53));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
