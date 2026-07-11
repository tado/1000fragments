uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 6.68) - 0.5;
    float rad = 0.24 + 0.12 * sin(t * 3.80 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.74), cos(time * 0.82)) * 0.24;
	float an = atan(p.y, p.x) + time * -0.74;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.61 / 3.1415927, 1.25 / r - time * 2.26);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.71, 0.76, 0.19) * (0.18 / (abs(d) + 0.07));
	col = col / (1.0 + col);
	col *= clamp(r * 2.19, 0.0, 1.0);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.10;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
