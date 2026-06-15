uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 5.95) - 0.5;
    float rad = 0.21 + 0.12 * sin(t * 1.68 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(-0.32, -0.45) * sin(length(p) * 5.01 - time * 1.95) * 0.19;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.93 + time * 0.06, vec3(0.41, 0.41, 0.58), vec3(0.35, 0.30, 0.42), vec3(1.20, 0.90, 1.24), vec3(0.73, 0.61, 0.63));
	col = clamp((col - 0.5) * 1.42 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
