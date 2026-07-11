uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 34.87 - t * 3.40 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 21.37 - t * 6.12 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ p = vec2(atan(p.y, p.x) * 2.92, length(p) * 5.65 - time * 0.64); }
	p += vec2(0.69, -0.97) * sin(length(p) * 4.80 - time * 0.60) * 0.15;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.41);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.83 + time * 0.14, vec3(0.48, 0.41, 0.57), vec3(0.41, 0.41, 0.37), vec3(1.21, 1.04, 1.30), vec3(0.45, 0.58, 0.05));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.63));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
