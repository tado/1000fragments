uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float pa = atan(p.y, p.x) + t * 0.41;
    float pk = 6.2831853 / 8.0;
    float pd = cos(floor(0.5 + pa / pk) * pk - pa) * length(p);
    v = sin(pd * 12.93 - t * 1.60 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 4.0 + qr * 3.06 * sin(t * 0.78) + t * 1.36 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.44;
	vec2 q1 = p; vec2 q2 = p;
	{ float fr = length(q1); q1 *= 1.0 + -0.77 * fr * fr; }
	{ float iv = dot(q2, q2) + 0.05; q2 = q2 / iv * 0.46; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.08);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.41));
	vec3 col = palette(d * 0.58 + time * 0.26, vec3(0.49, 0.44, 0.44), vec3(0.46, 0.34, 0.33), vec3(0.83, 1.25, 1.23), vec3(0.17, 0.12, 0.27));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.70));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
