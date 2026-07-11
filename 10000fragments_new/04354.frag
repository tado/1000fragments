uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 2.58) - 0.5;
    float rad = 0.26 + 0.12 * sin(t * 2.90 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.12 / 3.1415927, 1.10 / r + time * 2.92);
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.28, 0.36, 0.01), vec3(0.82, 0.84, 0.78), cc);
	col *= clamp(r * 2.20, 0.0, 1.0);
	col *= 0.83 + 0.11 * sin(gl_FragCoord.y * 2.67 + time * 5.69);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
