uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.41 + 0.28 * pow(abs(cos(ra * 7.0 + t * 1.86)), 0.84);
    v = sin((rr - pet) * 23.83 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.52;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.36 / 3.1415927, 0.85 / r + time * 2.15);
	tv.x += tv.y * 0.44;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.38 + time * 0.23, vec3(0.52, 0.59, 0.41), vec3(0.40, 0.48, 0.47), vec3(1.02, 0.76, 0.74), vec3(0.62, 1.00, 0.48));
	col *= clamp(r * 2.44, 0.0, 1.0);
	col = mod(col * 2.43, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
