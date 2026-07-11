uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.44 + 0.27 * pow(abs(cos(ra * 2.0 + t * 0.95)), 2.96);
    v = sin((rr - pet) * 17.60 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.37 / 3.1415927, 0.54 / r + time * 1.09);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.23, 0.29, 0.16) * (0.06 / (abs(d) + 0.05));
	col = col / (1.0 + col);
	col *= clamp(r * 1.98, 0.0, 1.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.76 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
