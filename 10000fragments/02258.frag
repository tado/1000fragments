uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 7.12) - 0.5;
    float rad = 0.32 + 0.12 * sin(t * 0.96 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.33;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.19 + time * 0.22, vec3(0.41, 0.58, 0.43), vec3(0.46, 0.43, 0.40), vec3(1.17, 0.76, 0.74), vec3(0.24, 0.29, 0.48));
	col = clamp((col - 0.5) * 1.85 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
