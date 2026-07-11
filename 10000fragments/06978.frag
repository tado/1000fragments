uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 8.94) - 0.5;
    float rad = 0.36 + 0.12 * sin(t * 1.78 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 7.64, t * 0.31 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = fract(p * 1.07) - 0.5;
	p *= 1.65;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.41);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.09 + time * 0.22, vec3(0.44, 0.50, 0.40), vec3(0.46, 0.44, 0.43), vec3(0.86, 0.79, 0.86), vec3(0.02, 0.78, 0.09));
	col = mod(col * 2.09, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
