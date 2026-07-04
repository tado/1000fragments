uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 22.08 - t * 3.26 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 1.43 + t * 1.49) - 0.5) * 2.0;
    v = sin((p.y * 2.12 + zx * 0.96 + t * 1.75) * 3.1415927 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.25;
	{ p = vec2(atan(p.y, p.x) * 2.25, length(p) * 3.96 - time * 0.91); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.11);
	float d = d1 + d2;
	vec3 col = palette(d * 1.13 + time * 0.21, vec3(0.55, 0.49, 0.55), vec3(0.37, 0.31, 0.37), vec3(1.05, 1.17, 1.17), vec3(0.85, 0.62, 0.48));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
