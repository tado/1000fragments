uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 5.74 + sin(p.y * 1.14 + t * 3.67) * 2.24 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.84 + time * 0.16, vec3(0.46, 0.49, 0.54), vec3(0.32, 0.43, 0.40), vec3(1.34, 1.10, 1.19), vec3(0.83, 0.64, 0.47));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.50));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
