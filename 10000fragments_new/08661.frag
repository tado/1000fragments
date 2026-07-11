uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 30.42 - t * 4.49 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.38 + 0.18 * pow(abs(cos(ra * 5.0 + t * 1.18)), 1.06);
    v = sin((rr - pet) * 23.14 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.84;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.16);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.67 + time * 0.06, vec3(0.53, 0.42, 0.42), vec3(0.41, 0.40, 0.47), vec3(0.80, 1.40, 0.81), vec3(0.64, 0.58, 0.82));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
