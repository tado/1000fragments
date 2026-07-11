uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 25.71 - t * 8.03 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float fr = length(p); p *= 1.0 + -0.52 * fr * fr; }
	p = abs(p) - 0.67;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.24 + time * 0.09, vec3(0.45, 0.59, 0.46), vec3(0.48, 0.36, 0.49), vec3(1.18, 1.24, 0.85), vec3(0.44, 0.23, 0.60));
	col = mod(col * 1.21, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
