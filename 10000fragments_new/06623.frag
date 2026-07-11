uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 11.0 + qr * 7.13 * sin(t * 1.43) + t * 2.83 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.05), cos(time * 0.51)) * 0.23;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.34 / 3.1415927, 1.39 / r - time * 2.55);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.65 + time * 0.29, vec3(0.49, 0.58, 0.45), vec3(0.33, 0.44, 0.33), vec3(1.24, 1.22, 0.88), vec3(0.87, 0.47, 0.78));
	col *= clamp(r * 2.31, 0.0, 1.0);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.07;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
