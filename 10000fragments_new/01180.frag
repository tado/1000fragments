uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 8.01) - 0.5;
    float rad = 0.26 + 0.12 * sin(t * 3.67 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.11 / 3.1415927, 0.43 / r - time * 1.90);
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 4.99 + time * 0.79);
	col *= clamp(r * 1.89, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
