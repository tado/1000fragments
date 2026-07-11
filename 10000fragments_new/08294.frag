uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 4.75, t * 0.93 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 6.78) - 0.5;
    float rad = 0.44 + 0.12 * sin(t * 0.60 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.39;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.97);
	float d = d1 + d2;
	vec3 col = palette(d * 1.68 + time * 0.28, vec3(0.49, 0.52, 0.48), vec3(0.46, 0.47, 0.47), vec3(0.82, 1.24, 1.25), vec3(0.88, 0.51, 0.41));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
