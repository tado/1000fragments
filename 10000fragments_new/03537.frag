uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 8.80) - 0.5;
    float rad = 0.35 + 0.12 * sin(t * 0.52 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.56), cos(time * 1.16)) * 0.11;
	float an = atan(p.y, p.x) + time * -0.61;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.56 / 3.1415927, 0.39 / r + time * 1.26);
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 1.42 + time * 0.36);
	col *= clamp(r * 2.30, 0.0, 1.0);
	col = fract(col * 1.36);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
