uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 18.77 - t * 4.70 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.66;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.66 + time * 0.25, vec3(0.59, 0.47, 0.55), vec3(0.35, 0.45, 0.33), vec3(1.23, 1.28, 0.73), vec3(0.01, 0.78, 0.90));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.62));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
