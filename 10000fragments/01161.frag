uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 4.46) - 0.5;
    float rad = 0.23 + 0.12 * sin(t * 1.36 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.70;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.64 + time * 0.17, vec3(0.41, 0.41, 0.52), vec3(0.39, 0.34, 0.35), vec3(0.79, 1.08, 1.35), vec3(0.82, 0.30, 0.06));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.58));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
