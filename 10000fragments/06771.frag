uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 3.58 + t * 1.11 + ph) + sin(p.y * 14.08 - t * 0.58 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 2.51) - 0.5;
    float rad = 0.40 + 0.12 * sin(t * 0.83 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p += vec2(0.13, 0.42) * sin(length(p) * 5.04 - time * 0.99) * 0.22;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.63);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.22 + time * 0.09, vec3(0.48, 0.59, 0.57), vec3(0.50, 0.44, 0.43), vec3(0.78, 1.31, 1.09), vec3(0.43, 0.86, 0.17));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.05));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
