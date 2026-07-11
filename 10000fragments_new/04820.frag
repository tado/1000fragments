uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 8.85 + vec2(t * 0.87, -t * 2.04) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.54 / 3.1415927, 0.31 / r - time * 2.27);
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.62 + time * 0.71);
	col *= clamp(r * 2.85, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
