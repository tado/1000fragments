uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 6.13) - 0.5;
    float rad = 0.26 + 0.12 * sin(t * 1.42 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.56;
	p = abs(p);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.23 + time * 0.09, vec3(0.52, 0.42, 0.52), vec3(0.45, 0.43, 0.46), vec3(1.40, 0.76, 1.31), vec3(0.33, 0.96, 0.80));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.49));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
