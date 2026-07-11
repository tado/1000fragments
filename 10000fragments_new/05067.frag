uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 9.35 + vec2(t * 0.70, -t * 2.81) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.48), cos(time * 1.19)) * 0.15;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.77 / 3.1415927, 1.46 / r - time * 0.83);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.61, 0.64, 0.54) * (0.21 / (abs(d) + 0.05));
	col = col / (1.0 + col);
	col *= clamp(r * 1.09, 0.0, 1.0);
	col = fract(col * 2.47);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
