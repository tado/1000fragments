uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 16.22 - t * 6.89 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = fract(p * 1.83) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.47 + time * 0.17, vec3(0.60, 0.60, 0.46), vec3(0.32, 0.41, 0.31), vec3(1.30, 0.73, 0.85), vec3(0.35, 0.99, 0.88));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
