uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.21, 0.0)) * 37.64 - t * 3.71 + ph);
    float mb = sin(length(p + vec2(0.21, 0.0)) * 38.25 - t * 3.71 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.68;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.87 + time * 0.01, vec3(0.51, 0.50, 0.55), vec3(0.41, 0.38, 0.47), vec3(1.09, 1.13, 0.97), vec3(0.38, 0.32, 0.15));
	col = clamp((col - 0.5) * 1.79 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
