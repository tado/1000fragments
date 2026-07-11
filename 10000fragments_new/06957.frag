uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 10.83 + vec2(t * 1.56, -t * 0.72) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.33;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.99 / 3.1415927, 0.85 / r + time * 1.64);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.21, 0.90, 0.43) * (0.07 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	col *= clamp(r * 2.51, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
