uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 8.26 + sr * 23.50 - t * 3.09 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 8.29 + sin(p.y * 2.42 + t * 1.20) * 1.49 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.82;
	p = abs(p) - 0.78;
	p *= 3.43;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.50);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.58 + time * 0.10, vec3(0.43, 0.51, 0.44), vec3(0.36, 0.47, 0.45), vec3(0.87, 1.36, 0.88), vec3(0.50, 0.19, 0.52));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.79));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
