uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 25.35 - t * 2.67 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 9.28 + sr * 14.76 - t * 0.91 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.79;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.42);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.79 + time * 0.17, vec3(0.44, 0.42, 0.56), vec3(0.36, 0.34, 0.35), vec3(1.16, 1.33, 1.03), vec3(0.48, 0.91, 0.31));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.63));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
