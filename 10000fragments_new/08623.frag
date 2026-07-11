uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 36.01 - t * 5.76 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 32.94 - t * 4.25 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ p = vec2(atan(p.y, p.x) * 1.39, length(p) * 2.63 - time * 0.63); }
	p *= 1.52;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.71);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.7));
	vec3 col = palette(d * 1.64 + time * 0.03, vec3(0.57, 0.57, 0.46), vec3(0.38, 0.48, 0.30), vec3(1.18, 0.99, 1.31), vec3(0.36, 0.18, 0.79));
	col *= 0.88 + 0.11 * sin(gl_FragCoord.y * 2.70 + time * 17.26);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
