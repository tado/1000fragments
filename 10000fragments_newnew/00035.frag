uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.33 + 0.22 * pow(abs(cos(ra * 7.0 + t * 2.58)), 1.81);
    v = sin((rr - pet) * 17.53 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.21;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.46 / 3.1415927, 1.34 / r - time * 2.80);
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.80 + time * 0.34);
	col *= clamp(r * 1.80, 0.0, 1.0);
	col = mod(col * 1.89, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
