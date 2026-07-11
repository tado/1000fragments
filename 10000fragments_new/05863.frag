uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.08) - 0.5;
    float rad = 0.40 + 0.12 * sin(t * 2.94 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.68;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.83 / 3.1415927, 0.71 / r - time * 0.55);
	tv.x += tv.y * 0.48;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.40 + time * 0.09, vec3(0.48, 0.52, 0.56), vec3(0.35, 0.32, 0.35), vec3(1.27, 0.89, 1.38), vec3(0.62, 0.24, 0.04));
	col *= clamp(r * 1.33, 0.0, 1.0);
	col *= 0.83 + 0.11 * sin(gl_FragCoord.y * 2.58 + time * 5.68);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
