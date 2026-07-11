uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float field(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 4.38 - t * 0.70;
    v = sin(floor(lv * 4.9) / 4.9 * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.68) * 0.55), cos((time * 0.68) * 0.45)) * 0.28;
	float an = atan(p.y, p.x) + (time * 0.68) * -0.54;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.44 / 3.1415927, 1.00 / r + (time * 0.68) * 2.57);
	float d = field(tv, (time * 0.68), 0.0);
	vec3 col = palette((d) * 0.74 + (time * 0.68) * 0.14, vec3(0.37, 0.41, 0.47), vec3(0.23, 0.21, 0.24), vec3(0.42, 0.72, 0.75), vec3(0.74, 0.45, 0.01));
	col *= clamp(r * 1.92, 0.0, 1.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.63));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.43);
	col = clamp(col, 0.0, 1.0) * vec3(0.982, 1.021, 0.946) * 1.00 + 0.021;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
