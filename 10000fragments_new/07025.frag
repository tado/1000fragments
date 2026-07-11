uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.31 + 0.33 * pow(abs(cos(ra * 2.0 + t * 0.97)), 1.17);
    v = sin((rr - pet) * 22.73 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.74;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.95 / 3.1415927, 0.64 / r + time * 1.50);
	tv.x += tv.y * 0.11;
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.63, 0.91, 1.24) + vec3(0.05, 0.06, 0.20);
	col *= clamp(r * 1.95, 0.0, 1.0);
	col *= 0.85 + 0.16 * sin(gl_FragCoord.y * 1.34 + time * 5.16);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
