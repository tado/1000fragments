uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 4.27) - 0.5;
    float rad = 0.36 + 0.12 * sin(t * 1.42 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.24 / 3.1415927, 0.86 / r - time * 2.15);
	tv.x += tv.y * 0.13;
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 0.58 + time * 0.17);
	col *= clamp(r * 1.07, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
