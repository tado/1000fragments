uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 pk = p * 6.25;
    pk.x += step(0.5, fract(pk.y * 0.5)) * 0.5;
    vec2 pf = fract(pk) - 0.5;
    float rad = 0.29 + 0.08 * sin(t * 2.77 + floor(pk.y) * 1.7 + ph);
    v = (1.0 - smoothstep(rad - 0.1, rad, length(pf))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.99), cos(time * 0.88)) * 0.07;
	float an = atan(p.y, p.x) + time * -0.41;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.18 / 3.1415927, 0.71 / r + time * 0.63);
	tv.x += tv.y * 0.17;
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.07, 0.18, 0.23), vec3(0.98, 0.79, 0.57), cc);
	col *= clamp(r * 2.58, 0.0, 1.0);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.12;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
