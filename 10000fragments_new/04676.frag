uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 8.97) - 0.5;
    float rad = 0.44 + 0.12 * sin(t * 3.46 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.14;
	p = fract(p * 1.60) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.14 + time * 0.19, vec3(0.42, 0.43, 0.52), vec3(0.37, 0.33, 0.39), vec3(1.39, 1.01, 1.11), vec3(0.78, 0.90, 0.64));
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.09;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
