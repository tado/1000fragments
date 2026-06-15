uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 14.33 - t * 6.79 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.31;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.24 + time * 0.24, vec3(0.53, 0.50, 0.55), vec3(0.31, 0.47, 0.34), vec3(1.26, 1.26, 1.37), vec3(0.48, 0.80, 0.35));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.48));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
