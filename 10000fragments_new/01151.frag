uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 7.40) - 0.5;
    float rad = 0.23 + 0.12 * sin(t * 2.40 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.29), cos(time * 0.79)) * 0.25;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.50 / 3.1415927, 0.56 / r - time * 1.53);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.82, 0.36, 0.55) * (0.22 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	col *= clamp(r * 2.42, 0.0, 1.0);
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
