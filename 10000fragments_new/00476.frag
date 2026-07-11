uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 9.75 + sr * 19.66 - t * 0.63 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 24.93 - t * 7.21 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.37;
	p.y += sin(p.x * 6.95 + time * 2.78) * 0.38;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.98);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.67 + time * 0.27, vec3(0.41, 0.44, 0.49), vec3(0.40, 0.48, 0.33), vec3(1.37, 0.71, 1.15), vec3(0.37, 0.97, 0.17));
	col = mod(col * 2.91, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
