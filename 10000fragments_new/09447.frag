uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.27) - 0.5;
    float rad = 0.35 + 0.12 * sin(t * 2.82 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.37 / 3.1415927, 1.38 / r + time * 2.50);
	tv.x += tv.y * 0.34;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.13 + time * 0.37, vec3(0.40, 0.48, 0.44), vec3(0.31, 0.41, 0.40), vec3(0.98, 1.03, 0.71), vec3(0.53, 0.16, 0.41));
	col *= clamp(r * 1.90, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
