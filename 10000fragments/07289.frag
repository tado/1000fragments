uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.38 + 0.30 * pow(abs(cos(ra * 5.0 + t * 1.97)), 2.99);
    v = sin((rr - pet) * 19.98 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.55), cos(time * 1.09)) * 0.30;
	float an = atan(p.y, p.x) + time * -0.39;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.72 / 3.1415927, 1.12 / r - time * 0.58);
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 1.34 + time * 0.00);
	col *= clamp(r * 1.59, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
