uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 6.03) - 0.5;
    float rad = 0.43 + 0.12 * sin(t * 2.39 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float fr = length(p); p *= 1.0 + -0.57 * fr * fr; }
	p = abs(p);
	p += vec2(0.45, -0.21) * sin(length(p) * 5.57 - time * 1.88) * 0.35;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.82 + time * 0.29, vec3(0.48, 0.46, 0.53), vec3(0.49, 0.45, 0.41), vec3(1.22, 1.35, 1.21), vec3(0.91, 0.77, 0.89));
	col = fract(col * 2.08);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
