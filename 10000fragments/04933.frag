uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 2.30;
    v = 0.5 * (sin(5.0 * cp.x + t * 2.35) * sin(3.0 * cp.y + ph)
             + sin(3.0 * cp.x - t * 0.54) * sin(5.0 * cp.y + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.69;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.90 / 3.1415927, 1.43 / r - time * 2.34);
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.24, 0.39, 0.39), vec3(0.77, 0.62, 0.95), cc);
	col *= clamp(r * 1.42, 0.0, 1.0);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.06;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
