uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.70) - 0.5;
    float rad = 0.23 + 0.12 * sin(t * 1.02 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(0.04, -0.66) * sin(length(p) * 5.00 - time * 1.40) * 0.25;
	{ p = vec2(atan(p.y, p.x) * 1.20, length(p) * 2.80 - time * 0.18); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.95 + time * 0.28, vec3(0.44, 0.47, 0.41), vec3(0.49, 0.39, 0.33), vec3(0.72, 1.22, 0.91), vec3(0.73, 0.58, 0.24));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.74));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
