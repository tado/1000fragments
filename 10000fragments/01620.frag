uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.27, 0.0)) * 12.53 - t * 4.88 + ph);
    float mb = sin(length(p + vec2(0.27, 0.0)) * 8.96 - t * 4.88 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.57, 0.0)) * 33.49 - t * 2.92 + ph);
    float mb = sin(length(p + vec2(0.57, 0.0)) * 31.53 - t * 2.92 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.24;
	p += vec2(0.08, 0.45) * sin(length(p) * 5.18 - time * 0.69) * 0.21;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.30);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.16 + time * 0.12, vec3(0.43, 0.52, 0.47), vec3(0.44, 0.31, 0.40), vec3(1.38, 1.32, 1.09), vec3(0.34, 0.19, 0.18));
	col = mod(col * 2.60, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
