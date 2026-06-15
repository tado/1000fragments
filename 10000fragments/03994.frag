uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 2.24) - 0.5;
    float rad = 0.29 + 0.12 * sin(t * 3.12 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.69;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.40 + time * 0.03, vec3(0.44, 0.50, 0.55), vec3(0.40, 0.31, 0.40), vec3(0.89, 1.24, 0.98), vec3(0.42, 0.91, 0.85));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.04));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
