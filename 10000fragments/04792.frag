uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 10.51 - t * 2.36 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.13;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.63 + time * 0.25, vec3(0.60, 0.54, 0.41), vec3(0.43, 0.32, 0.49), vec3(1.22, 0.87, 0.86), vec3(0.08, 0.13, 0.08));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.71));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
