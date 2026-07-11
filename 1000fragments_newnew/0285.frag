uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 6.07 + vec2(t * 2.81, -t * 2.21) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.21 / 3.1415927, 1.32 / r - (time * 0.56) * 2.18);
	float d = field(tv, (time * 0.56), 0.0);
	vec3 col = vec3(0.47, 0.38, 0.49) * (0.05 / (abs((d)) + 0.09));
	col = col / (1.0 + col);
	col *= clamp(r * 1.74, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.63);
	col = clamp(col, 0.0, 1.0) * vec3(1.050, 0.979, 0.944) * 1.00 + 0.037;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
