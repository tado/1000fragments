uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.47, 0.0)) * 38.71 - t * 6.27 + ph);
    float mb = sin(length(p + vec2(0.47, 0.0)) * 19.76 - t * 6.08 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.52;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.98 + time * 0.24, vec3(0.41, 0.45, 0.45), vec3(0.47, 0.38, 0.34), vec3(0.78, 0.79, 1.34), vec3(0.97, 0.25, 0.82));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
