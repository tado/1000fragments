uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 6.64 + t * 1.28 + ph) * 0.7;
    float wb = sin(p.y * 18.41 - t * 3.87 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.35;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.20;
	p = abs(p) - 0.72;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.96 + time * 0.15, vec3(0.43, 0.46, 0.60), vec3(0.47, 0.37, 0.36), vec3(1.07, 1.03, 1.31), vec3(0.96, 0.80, 0.01));
	col *= 0.90 + 0.14 * sin(gl_FragCoord.y * 1.23 + time * 15.38);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
