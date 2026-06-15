uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 6.24) - 0.5;
    float rad = 0.35 + 0.12 * sin(t * 2.02 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 2.84) - 0.5;
    float rad = 0.37 + 0.12 * sin(t * 2.28 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.02;
	p = abs(p) - 0.36;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.24);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.02 + time * 0.28, vec3(0.43, 0.58, 0.54), vec3(0.49, 0.31, 0.45), vec3(0.74, 0.88, 1.03), vec3(0.54, 0.54, 0.32));
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
