uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 13.51 + t * 3.84 + ph) + sin(p.y * 4.12 - t * 3.84 + ph)
        + sin((p.x + p.y) * 9.81 + t * 3.84 + ph) + sin(length(p) * 12.87 - t * 3.84 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 7.51) - 0.5;
    float rad = 0.41 + 0.12 * sin(t * 2.66 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p += vec2(0.09, 0.19) * sin(length(p) * 4.36 - time * 1.95) * 0.16;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.10);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.77 + time * 0.21, vec3(0.53, 0.43, 0.40), vec3(0.36, 0.31, 0.49), vec3(0.90, 1.38, 1.30), vec3(0.43, 0.89, 0.42));
	col = mod(col * 1.89, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
