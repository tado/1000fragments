uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 4.65) - 0.5;
    float rad = 0.38 + 0.12 * sin(t * 3.82 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 4.13) - 0.5;
    float rad = 0.32 + 0.12 * sin(t * 3.78 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.54;
	{ float fr = length(p); p *= 1.0 + -0.65 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.53);
	float d = d1 + d2;
	vec3 col = palette(d * 1.29 + time * 0.26, vec3(0.46, 0.58, 0.51), vec3(0.43, 0.39, 0.42), vec3(1.21, 0.78, 0.92), vec3(0.61, 0.79, 0.99));
	col = fract(col * 1.40);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
