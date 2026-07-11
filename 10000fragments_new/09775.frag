uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 7.01) - 0.5;
    float rad = 0.31 + 0.12 * sin(t * 3.63 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.92), cos(time * 0.79)) * 0.17;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.22 / 3.1415927, 1.42 / r - time * 1.58);
	tv.x += tv.y * 0.32;
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 0.81 + time * 0.08);
	col *= clamp(r * 1.15, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
