uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 6.70) - 0.5;
    float rad = 0.37 + 0.12 * sin(t * 1.60 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = fract(p * 2.03) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.03 + time * 0.14, vec3(0.59, 0.50, 0.51), vec3(0.30, 0.45, 0.41), vec3(0.81, 0.92, 0.80), vec3(0.54, 0.54, 0.69));
	col = fract(col * 2.10);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
