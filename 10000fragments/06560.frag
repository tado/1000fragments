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
    v = sin(qa * 4.0 + qr * 3.08 * sin(t * 1.40) + t * 4.35 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 6.60 + sr * 15.24 - t * 2.21 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.65;
	p *= 1.85;
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 1.14;
	p *= 1.0 + 0.25 * sin(time * 4.16);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.07);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.75 + time * 0.13, vec3(0.51, 0.53, 0.55), vec3(0.46, 0.48, 0.39), vec3(0.92, 0.85, 1.31), vec3(0.58, 0.60, 0.25));
	col *= 0.83 + 0.18 * sin(gl_FragCoord.y * 1.13 + time * 5.85);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
