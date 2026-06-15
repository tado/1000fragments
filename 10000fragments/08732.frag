uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 4.96) - 0.5;
    float rad = 0.44 + 0.12 * sin(t * 0.78 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.38;
	p += vec2(-0.34, 0.86) * sin(length(p) * 3.54 - time * 0.84) * 0.18;
	p = abs(p);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.28 + time * 0.15, vec3(0.47, 0.41, 0.41), vec3(0.43, 0.47, 0.47), vec3(1.11, 0.75, 0.84), vec3(0.88, 0.11, 0.75));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
