uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 15.46 + t * 1.11 + ph) + sin(p.y * 17.23 - t * 0.73 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.21;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.25 / 3.1415927, 0.86 / r + time * 2.53);
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.24, 0.34, 0.13), vec3(0.91, 0.66, 0.81), cc);
	col *= clamp(r * 1.40, 0.0, 1.0);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.05;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
