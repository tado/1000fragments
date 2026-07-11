uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.35 + 0.24 * pow(abs(cos(ra * 2.0 + t * 0.55)), 0.59);
    v = sin((rr - pet) * 14.73 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.48), cos(time * 0.78)) * 0.26;
	float an = atan(p.y, p.x) + time * -0.50;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.70 / 3.1415927, 1.46 / r + time * 2.18);
	tv.x += tv.y * 0.36;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.07 + time * 0.07, vec3(0.57, 0.60, 0.56), vec3(0.49, 0.44, 0.40), vec3(1.14, 0.87, 0.97), vec3(0.66, 0.78, 0.61));
	col *= clamp(r * 1.56, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
