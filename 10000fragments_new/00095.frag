uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 2.26) - 0.5;
    float rad = 0.33 + 0.12 * sin(t * 2.39 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.74 / 3.1415927, 0.37 / r - time * 2.02);
	tv.x += tv.y * 0.40;
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.67, 0.27, 0.44) * (0.25 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	col *= clamp(r * 1.69, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
