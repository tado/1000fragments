uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 2.70) - 0.5;
    float rad = 0.21 + 0.12 * sin(t * 1.55 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.59), cos(time * 1.16)) * 0.19;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.38 / 3.1415927, 0.55 / r - time * 2.44);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.65 + time * 0.10, vec3(0.47, 0.53, 0.52), vec3(0.46, 0.49, 0.34), vec3(0.72, 1.31, 1.25), vec3(0.69, 0.50, 0.78));
	col *= clamp(r * 2.07, 0.0, 1.0);
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
