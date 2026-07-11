uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 7.84;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 2.83)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 24.64 - t * 4.42 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 11.0 + qr * 3.11 * sin(t * 0.93) + t * 3.14 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.25;
	vec2 q1 = p; vec2 q2 = p;
	q2 = abs(q2);
	{ float fr = length(q2); q2 *= 1.0 + -0.45 * fr * fr; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.84);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.38));
	vec3 col = palette(d * 1.03 + time * 0.03, vec3(0.47, 0.49, 0.55), vec3(0.42, 0.46, 0.41), vec3(0.84, 1.32, 1.19), vec3(0.27, 0.78, 0.41));
	col = mod(col * 2.03, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
