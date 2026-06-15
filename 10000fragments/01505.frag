uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 13.62 - t * 8.15 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.49;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.87 + time * 0.07, vec3(0.46, 0.59, 0.50), vec3(0.33, 0.45, 0.35), vec3(1.28, 0.91, 1.24), vec3(0.92, 0.93, 0.78));
	col = mod(col * 1.96, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
