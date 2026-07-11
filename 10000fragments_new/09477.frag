uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 2.87 + t * 0.68 + ph) + sin(p.y * 4.40 - t * 0.89 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.63 / 3.1415927, 0.60 / r - time * 2.03);
	tv.x += tv.y * 0.43;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.53 + time * 0.02, vec3(0.60, 0.58, 0.59), vec3(0.42, 0.33, 0.42), vec3(0.87, 1.31, 1.20), vec3(0.49, 0.04, 0.27));
	col *= clamp(r * 2.12, 0.0, 1.0);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.12;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
