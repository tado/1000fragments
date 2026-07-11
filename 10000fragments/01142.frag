uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 9.10 + t * 2.75 + ph) + sin(p.y * 5.86 - t * 2.75 + ph)
        + sin((p.x + p.y) * 5.36 + t * 2.75 + ph) + sin(length(p) * 11.83 - t * 2.75 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.09) - 0.5;
    float rad = 0.41 + 0.12 * sin(t * 3.38 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.77;
	p += vec2(-0.20, 0.24) * sin(length(p) * 3.37 - time * 1.26) * 0.29;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.75);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.92 + time * 0.16, vec3(0.47, 0.58, 0.46), vec3(0.50, 0.42, 0.48), vec3(1.10, 0.74, 1.15), vec3(0.83, 0.61, 0.34));
	col = clamp((col - 0.5) * 2.03 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
