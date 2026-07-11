uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 2.64) - 0.5;
    float rad = 0.30 + 0.12 * sin(t * 2.81 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.43), cos(time * 0.84)) * 0.06;
	float an = atan(p.y, p.x) + time * 0.48;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.69 / 3.1415927, 1.17 / r + time * 0.58);
	tv.x += tv.y * 0.31;
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 0.55 + time * 0.31);
	col *= clamp(r * 1.24, 0.0, 1.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.89 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
