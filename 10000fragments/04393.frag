uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.28, 0.0)) * 26.06 - t * 4.00 + ph);
    float mb = sin(length(p + vec2(0.28, 0.0)) * 17.13 - t * 4.00 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 24.64 + sin(p.y * 4.47 + t * 5.98) * 4.81 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.06;
	p += vec2(0.88, -0.06) * sin(length(p) * 2.11 - time * 1.77) * 0.32;
	p *= 1.50;
	p = abs(p) - 0.21;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.09);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.71 + time * 0.00, vec3(0.49, 0.52, 0.49), vec3(0.42, 0.39, 0.44), vec3(1.33, 1.06, 0.73), vec3(0.59, 0.70, 0.26));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.58));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
