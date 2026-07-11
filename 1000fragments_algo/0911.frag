uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 16.00);
    float gsh = hash21(vec2(grow, floor(t * 7.46))) - 0.5;
    float gx = p.x + gsh * 0.75;
    v = sin(gx * 19.52 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.48));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = p.yx;
	p += vec2(sin((time * 0.58) * 0.61), cos((time * 0.58) * 0.95)) * 0.13;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.21 / 3.1415927, 1.04 / r - (time * 0.58) * 0.67);
	float d = field(tv, (time * 0.58), 0.0);
	vec3 col = palette((d) * 0.99 + (time * 0.58) * 0.13, vec3(0.38, 0.36, 0.29), vec3(0.28, 0.25, 0.21), vec3(0.55, 0.44, 0.86), vec3(0.50, 0.44, 0.99));
	col *= clamp(r * 2.62, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.54);
	col = clamp(col, 0.0, 1.0) * vec3(1.040, 0.982, 0.914) * 1.00 + 0.033;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
