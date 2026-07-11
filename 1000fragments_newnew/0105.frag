uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float field(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 3.89 - t * 0.51;
    v = sin(floor(lv * 5.9) / 5.9 * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.68) * 0.89), cos((time * 0.68) * 0.47)) * 0.14;
	float an = atan(p.y, p.x) + (time * 0.68) * 0.17;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.01 / 3.1415927, 1.27 / r - (time * 0.68) * 2.12);
	float d = field(tv, (time * 0.68), 0.0);
	vec3 col = palette((d) * 1.09 + (time * 0.68) * 0.14, vec3(0.41, 0.49, 0.44), vec3(0.31, 0.25, 0.29), vec3(0.88, 0.44, 0.47), vec3(0.56, 0.65, 0.96));
	col *= clamp(r * 1.88, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.61);
	col = clamp(col, 0.0, 1.0) * vec3(1.011, 0.994, 1.004) * 1.00 + 0.011;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
