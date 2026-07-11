uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 8.53) - 0.5;
    float rad = 0.34 + 0.12 * sin(t * 1.98 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.41 / 3.1415927, 1.27 / r - time * 1.23);
	tv.x += tv.y * 0.15;
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.84, 1.48, 1.05) + vec3(0.16, 0.15, 0.08);
	col *= clamp(r * 1.06, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
