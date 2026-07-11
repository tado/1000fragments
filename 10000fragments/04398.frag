uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.34, 0.0)) * 23.24 - t * 1.90 + ph);
    float mb = sin(length(p + vec2(0.34, 0.0)) * 25.13 - t * 1.90 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.96;
	p = abs(p) - 0.62;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.74 + time * 0.12, vec3(0.47, 0.43, 0.57), vec3(0.31, 0.34, 0.32), vec3(0.93, 1.39, 1.24), vec3(0.38, 0.74, 0.54));
	col = fract(col * 1.15);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
