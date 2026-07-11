uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 7.99 + sr * 23.07 - t * 2.65 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 2.26 + sr * 8.33 - t * 4.58 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.43;
	p *= 2.15;
	p = abs(p);
	p = (floor(p * 19.0) + 0.5) / 19.0;
	{ p = vec2(atan(p.y, p.x) * 1.17, length(p) * 5.76 - time * 0.34); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.52);
	float d = d1 * d2;
	vec3 col = palette(d * 1.12 + time * 0.07, vec3(0.41, 0.52, 0.55), vec3(0.45, 0.49, 0.43), vec3(1.15, 1.23, 1.30), vec3(0.92, 0.21, 0.06));
	col *= 0.81 + 0.18 * sin(gl_FragCoord.y * 1.64 + time * 17.92);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
