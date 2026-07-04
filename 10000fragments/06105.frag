uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.58 + 0.19 * pow(abs(cos(ra * 3.0 + t * 1.78)), 0.55);
    v = sin((rr - pet) * 21.56 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.50), cos(time * 0.70)) * 0.15;
	float an = atan(p.y, p.x) + time * 0.14;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.38 / 3.1415927, 1.12 / r - time * 1.53);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.69, 0.50, 0.59) * (0.24 / (abs(d) + 0.10));
	col = col / (1.0 + col);
	col *= clamp(r * 2.64, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
