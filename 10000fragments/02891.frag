uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.52 + 0.28 * pow(abs(cos(ra * 7.0 + t * 0.65)), 0.56);
    v = sin((rr - pet) * 9.49 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.36), cos(time * 1.00)) * 0.10;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.56 / 3.1415927, 1.50 / r - time * 1.34);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.79 + time * 0.15, vec3(0.48, 0.41, 0.52), vec3(0.44, 0.36, 0.42), vec3(1.16, 1.02, 1.00), vec3(0.83, 0.53, 0.03));
	col *= clamp(r * 2.13, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
