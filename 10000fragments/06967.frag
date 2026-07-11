uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 3.60, t * 2.08 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 5.55) - 0.5;
    float rad = 0.43 + 0.12 * sin(t * 1.34 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.00);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.66 + time * 0.03, vec3(0.56, 0.43, 0.49), vec3(0.45, 0.36, 0.37), vec3(1.17, 1.18, 0.77), vec3(0.32, 0.03, 0.09));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
