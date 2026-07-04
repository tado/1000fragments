uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.47 + 0.22 * pow(abs(cos(ra * 4.0 + t * 1.63)), 1.52);
    v = sin((rr - pet) * 21.27 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.25;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.56 / 3.1415927, 0.81 / r + time * 1.17);
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.62 + time * 0.03);
	col *= clamp(r * 2.64, 0.0, 1.0);
	col *= 0.88 + 0.12 * sin(gl_FragCoord.y * 0.93 + time * 12.75);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
