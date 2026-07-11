uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 11.24 + vec2(t * 2.42, -t * 1.12) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.34 / 3.1415927, 1.26 / r + time * 2.06);
	tv.x += tv.y * 0.19;
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 4.04 + time * 0.12);
	col *= clamp(r * 2.66, 0.0, 1.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.56));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
