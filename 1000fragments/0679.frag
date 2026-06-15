uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 8.70 + t * 4.63 + ph) + sin(p.y * 17.13 - t * 3.90 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 3.24;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.24 + time * 0.00, vec3(0.51, 0.50, 0.47), vec3(0.39, 0.47, 0.35), vec3(1.20, 1.25, 1.07), vec3(0.08, 0.11, 0.02));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.62));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
