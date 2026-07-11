uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.29, 0.0)) * 15.91 - t * 4.70 + ph);
    float mb = sin(length(p + vec2(0.29, 0.0)) * 24.02 - t * 1.56 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.87), cos(time * 1.04)) * 0.21;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.07 / 3.1415927, 1.43 / r - time * 2.61);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.61, 0.61, 0.66) * (0.16 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	col *= clamp(r * 1.28, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
