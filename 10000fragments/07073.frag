uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.24, 0.0)) * 30.31 - t * 6.03 + ph);
    float mb = sin(length(p + vec2(0.24, 0.0)) * 38.62 - t * 6.03 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 5.23 + t * 4.43 + ph) + sin(p.y * 9.56 - t * 1.29 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(0.47, -0.58) * sin(length(p) * 2.05 - time * 1.10) * 0.21;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.57);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.07 + time * 0.13, vec3(0.44, 0.53, 0.45), vec3(0.35, 0.41, 0.49), vec3(0.72, 1.16, 0.73), vec3(0.87, 0.50, 0.09));
	col = clamp((col - 0.5) * 1.92 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
