uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 6.65 + t * 2.66 + ph) + sin(p.y * 6.84 - t * 2.66 + ph)
        + sin((p.x + p.y) * 11.17 + t * 2.66 + ph) + sin(length(p) * 15.48 - t * 2.66 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.59;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.17 / 3.1415927, 0.42 / r + time * 1.29);
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.62 + time * 0.54);
	col *= clamp(r * 1.23, 0.0, 1.0);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.12;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
