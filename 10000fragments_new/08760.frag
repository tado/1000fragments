uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 8.28) - 0.5;
    float rad = 0.27 + 0.12 * sin(t * 1.53 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.45;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.76 / 3.1415927, 1.46 / r + time * 1.43);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.90 + time * 0.00, vec3(0.43, 0.50, 0.60), vec3(0.37, 0.48, 0.36), vec3(0.92, 1.21, 1.10), vec3(0.92, 0.73, 0.95));
	col *= clamp(r * 1.90, 0.0, 1.0);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.06;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
