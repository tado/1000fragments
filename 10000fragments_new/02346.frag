uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 7.34) - 0.5;
    float rad = 0.32 + 0.12 * sin(t * 3.91 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.57;
	p = abs(p);
	{ float fr = length(p); p *= 1.0 + -0.39 * fr * fr; }
	p += vec2(0.24, 0.25) * sin(length(p) * 2.31 - time * 1.43) * 0.37;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.88 + time * 0.25, vec3(0.55, 0.53, 0.51), vec3(0.44, 0.38, 0.45), vec3(0.75, 0.81, 1.22), vec3(0.27, 0.39, 0.67));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
