uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.38 + 0.20 * pow(abs(cos(ra * 4.0 + t * 1.47)), 0.86);
    v = sin((rr - pet) * 17.40 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.81 / 3.1415927, 0.99 / r + (time * 0.70) * 0.89);
	tv.x += tv.y * 0.23;
	float d = field(tv, (time * 0.70), 0.0);
	vec3 col = palette((d) * 0.69 + (time * 0.70) * 0.15, vec3(0.21, 0.34, 0.31), vec3(0.23, 0.29, 0.30), vec3(0.52, 0.73, 0.48), vec3(0.90, 0.28, 0.34));
	col *= clamp(r * 1.50, 0.0, 1.0);
	col = clamp((col - 0.5) * 1.87 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.55);
	col = clamp(col, 0.0, 1.0) * vec3(1.049, 1.009, 0.928) * 1.00 + 0.011;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
