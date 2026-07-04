uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float pa = atan(p.y, p.x) + t * 0.73;
    float pk = 6.2831853 / 5.0;
    float pd = cos(floor(0.5 + pa / pk) * pk - pa) * length(p);
    v = sin(pd * 17.69 - t * 4.11 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 3.0 + qr * 7.80 * sin(t * 1.29) + t * 4.95 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.16);
	float d = 0.5 * (d1 + d2);
	vec3 col = palette(d * 0.58 + time * 0.30, vec3(0.55, 0.44, 0.57), vec3(0.32, 0.43, 0.31), vec3(0.71, 1.23, 0.90), vec3(0.35, 0.84, 0.06));
	col = mod(col * 1.73, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
