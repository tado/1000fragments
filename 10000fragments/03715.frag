uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.32, 0.0)) * 17.01 - t * 4.03 + ph);
    float mb = sin(length(p + vec2(0.32, 0.0)) * 9.11 - t * 4.03 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.38;
	p = fract(p * 1.06) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.69 + time * 0.12, vec3(0.59, 0.41, 0.44), vec3(0.50, 0.45, 0.34), vec3(1.25, 1.23, 1.07), vec3(0.49, 0.70, 0.16));
	col = fract(col * 1.93);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
