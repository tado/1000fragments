uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.38, 0.0)) * 16.61 - t * 3.33 + ph);
    float mb = sin(length(p + vec2(0.38, 0.0)) * 36.08 - t * 7.51 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.73;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.84 + time * 0.18, vec3(0.48, 0.59, 0.58), vec3(0.30, 0.40, 0.40), vec3(0.78, 1.15, 0.70), vec3(0.62, 0.65, 0.68));
	col = fract(col * 1.63);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
