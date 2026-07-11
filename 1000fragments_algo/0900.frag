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
    float pet = 0.39 + 0.20 * pow(abs(cos(ra * 7.0 + t * 1.90)), 1.86);
    v = sin((rr - pet) * 17.56 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y = abs(p.y) - 0.41;
	p.x = abs(p.x);
	p += vec2(sin((time * 0.56) * 1.34), cos((time * 0.56) * 0.74)) * 0.16;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.43 / 3.1415927, 1.44 / r - (time * 0.56) * 2.95);
	float d = field(tv, (time * 0.56), 0.0);
	vec3 col = palette((d) * 1.01 + (time * 0.56) * 0.19, vec3(0.35, 0.40, 0.34), vec3(0.25, 0.26, 0.30), vec3(0.51, 0.41, 0.71), vec3(0.94, 0.69, 0.37));
	col *= clamp(r * 1.42, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.44);
	col = clamp(col, 0.0, 1.0) * vec3(1.021, 0.978, 1.011) * 1.00 + 0.048;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
