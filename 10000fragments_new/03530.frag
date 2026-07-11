uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.48 + 0.29 * pow(abs(cos(ra * 7.0 + t * 2.70)), 1.53);
    v = sin((rr - pet) * 11.33 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.31), cos(time * 0.45)) * 0.26;
	float an = atan(p.y, p.x) + time * -0.21;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.30 / 3.1415927, 1.29 / r + time * 0.92);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.85 + time * 0.30, vec3(0.41, 0.57, 0.55), vec3(0.46, 0.36, 0.38), vec3(1.18, 1.09, 0.71), vec3(0.81, 0.11, 0.57));
	col *= clamp(r * 2.03, 0.0, 1.0);
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
