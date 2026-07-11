uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.37 + 0.22 * pow(abs(cos(ra * 2.0 + t * 1.68)), 1.75);
    v = sin((rr - pet) * 16.16 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.40;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.72 / 3.1415927, 1.19 / r + time * 1.49);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.23, 0.60, 0.51) * (0.10 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	col *= clamp(r * 2.66, 0.0, 1.0);
	col = fract(col * 1.29);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
