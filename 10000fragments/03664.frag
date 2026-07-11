uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 6.18) - 0.5;
    float rad = 0.44 + 0.12 * sin(t * 2.79 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 5.10 + sin(p.y * 5.20 + t * 4.29) * 4.97 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.35);
	float d = d1 * d2;
	vec3 col = palette(d * 0.93 + time * 0.17, vec3(0.51, 0.52, 0.47), vec3(0.34, 0.39, 0.36), vec3(0.79, 0.79, 1.15), vec3(0.73, 0.72, 0.32));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.61));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
