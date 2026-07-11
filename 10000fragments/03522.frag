uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 6.37) - 0.5;
    float rad = 0.29 + 0.12 * sin(t * 1.39 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.92;
	p = fract(p * 1.99) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.33 + time * 0.11, vec3(0.60, 0.54, 0.43), vec3(0.39, 0.36, 0.39), vec3(1.09, 1.14, 1.31), vec3(0.96, 0.73, 0.69));
	col = clamp((col - 0.5) * 1.98 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
