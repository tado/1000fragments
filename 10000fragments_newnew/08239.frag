uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.34 + 0.16 * pow(abs(cos(ra * 4.0 + t * 0.85)), 1.32);
    v = sin((rr - pet) * 18.92 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.51 / 3.1415927, 0.49 / r + time * 1.93);
	tv.x += tv.y * 0.16;
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.13, 0.09, 0.27), vec3(0.98, 0.87, 0.75), cc);
	col *= clamp(r * 1.89, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
