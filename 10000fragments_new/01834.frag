uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.88) - 0.5;
    float rad = 0.30 + 0.12 * sin(t * 1.72 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.46 / 3.1415927, 0.69 / r + time * 2.41);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.05 + time * 0.03, vec3(0.54, 0.50, 0.42), vec3(0.37, 0.43, 0.41), vec3(1.25, 0.72, 1.08), vec3(0.83, 0.15, 0.75));
	col *= clamp(r * 2.64, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
