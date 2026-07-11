uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 14.82 + vec2(t * 0.75, -t * 0.87) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.12 / 3.1415927, 1.38 / r - time * 1.82);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.68, 0.87, 0.34) * (0.09 / (abs(d) + 0.05));
	col = col / (1.0 + col);
	col *= clamp(r * 2.43, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
