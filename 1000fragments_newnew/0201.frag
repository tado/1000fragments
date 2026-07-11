uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float pa = atan(p.y, p.x) + t * 0.59;
    float pk = 6.2831853 / 5.0;
    float pd = cos(floor(0.5 + pa / pk) * pk - pa) * length(p);
    v = sin(pd * 16.08 - t * 4.59 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 5.0 + qr * 7.17 * sin(t * 0.47) + t * 1.33 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	{ float fr = length(q1); q1 *= 1.0 + -0.55 * fr * fr; }
	q1 = abs(q1);
	q2 *= 1.0 + 0.28 * sin((time * 0.60) * 1.04);
	float d1 = fieldA(q1, (time * 0.60), 0.0);
	float d2 = fieldB(q2, (time * 0.60), 0.01);
	float d = abs(d1 - d2);
	vec3 col = palette((d) * 0.48 + (time * 0.60) * 0.15, vec3(0.30, 0.21, 0.29), vec3(0.22, 0.20, 0.28), vec3(0.44, 0.41, 0.82), vec3(0.32, 0.68, 0.09));
	col *= 0.82 + 0.18 * sin(gl_FragCoord.y * 1.60 + (time * 0.60) * 12.17);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.59);
	col = clamp(col, 0.0, 1.0) * vec3(1.048, 1.003, 0.914) * 1.00 + 0.040;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
