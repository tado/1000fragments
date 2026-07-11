uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 20.17 + sin(p.y * 1.77 + t * 5.72) * 2.33 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + (time * 0.79) * -0.75;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.57 / 3.1415927, 0.68 / r + (time * 0.79) * 1.39);
	float d = field(tv, (time * 0.79), 0.0);
	vec3 col = palette((d) * 0.90 + (time * 0.79) * 0.20, vec3(0.30, 0.25, 0.22), vec3(0.30, 0.27, 0.31), vec3(0.50, 0.41, 0.69), vec3(0.13, 0.43, 0.32));
	col *= clamp(r * 2.29, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.54);
	col = clamp(col, 0.0, 1.0) * vec3(0.968, 1.005, 0.948) * 1.00 + 0.021;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
